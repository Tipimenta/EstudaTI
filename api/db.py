"""Acesso ao banco: SQLite (padrão, local) ou PostgreSQL (nuvem) via DATABASE_URL.

Todo SQL do projeto é escrito com placeholders `?` e sintaxe comum aos dois bancos
(`RETURNING id`, `ON CONFLICT`). Para PostgreSQL os placeholders viram `%s`.
Datas são guardadas como texto ISO (UTC), calculadas no Python.
"""
from __future__ import annotations

import json
import os
import re
import sqlite3
import threading
import time
import unicodedata
from contextlib import contextmanager
from datetime import datetime, timezone


def database_url() -> str:
    return os.getenv("DATABASE_URL", "").strip()


def is_postgres() -> bool:
    url = database_url()
    return url.startswith("postgres://") or url.startswith("postgresql://")


def sqlite_path() -> str:
    url = database_url()
    if url.startswith("sqlite:///"):
        return url[len("sqlite:///"):]
    return os.getenv("DATABASE_PATH", os.path.join(os.path.dirname(__file__), "data", "estuda.sqlite3"))


def now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


def today() -> str:
    return datetime.now(timezone.utc).date().isoformat()


class DB:
    """Envoltório pequeno: q() devolve lista de dicts, one() um dict, x() executa."""

    def __init__(self, conn, pg: bool):
        self.conn = conn
        self.pg = pg

    def _sql(self, sql: str) -> str:
        return sql.replace("?", "%s") if self.pg else sql

    def _cur(self, sql, params=()):
        cur = self.conn.cursor()
        cur.execute(self._sql(sql), tuple(params))
        return cur

    def q(self, sql, params=()):
        cur = self._cur(sql, params)
        if cur.description is None:
            return []
        cols = [c[0] for c in cur.description]
        return [dict(zip(cols, row)) for row in cur.fetchall()]

    def one(self, sql, params=()):
        rows = self.q(sql, params)
        return rows[0] if rows else None

    def val(self, sql, params=(), default=None):
        row = self.one(sql, params)
        if not row:
            return default
        v = next(iter(row.values()))
        return default if v is None else v

    def x(self, sql, params=()):
        self._cur(sql, params)

    def many(self, sql, rows):
        """Executa o mesmo comando para várias linhas de uma vez (bem mais rápido em banco remoto)."""
        rows = [tuple(r) for r in rows]
        if rows:
            self.conn.cursor().executemany(self._sql(sql), rows)

    def insert(self, table: str, data: dict) -> int:
        cols = list(data.keys())
        sql = f"INSERT INTO {table} ({','.join(cols)}) VALUES ({','.join('?' for _ in cols)}) RETURNING id"
        cur = self._cur(sql, [data[c] for c in cols])
        return cur.fetchone()[0]

    def update(self, table: str, row_id: int, data: dict):
        if not data:
            return
        sets = ",".join(f"{k}=?" for k in data)
        self.x(f"UPDATE {table} SET {sets} WHERE id=?", [*data.values(), row_id])

    def commit(self):
        self.conn.commit()

    def rollback(self):
        self.conn.rollback()


_local = threading.local()


def _pg_conn():
    """Reaproveita uma conexão por thread: abrir conexão TLS a cada pedido é lento em banco na nuvem.
    Bancos como o Neon encerram conexões ociosas, então testamos antes de reutilizar."""
    import psycopg  # type: ignore

    conn = getattr(_local, "pg", None)
    if conn is not None and not conn.closed and not getattr(conn, "broken", False):
        if time.time() - getattr(_local, "last", 0) < 60:
            return conn
        try:
            conn.execute("SELECT 1")
            conn.rollback()
            return conn
        except Exception:
            try:
                conn.close()
            except Exception:
                pass
    conn = psycopg.connect(database_url(), connect_timeout=15, prepare_threshold=None)  # compatível com pooler (PgBouncer)
    # Tabelas num esquema próprio: convive com as tabelas antigas do EstudaTI no mesmo banco sem conflito.
    schema = re.sub(r"[^a-z0-9_]", "", os.getenv("PG_SCHEMA", "estuda").lower()) or "estuda"
    conn.execute(f"CREATE SCHEMA IF NOT EXISTS {schema}")
    conn.execute(f"SET search_path TO {schema}")
    conn.commit()
    _local.pg = conn
    return conn


def close_cached():
    conn = getattr(_local, "pg", None)
    if conn is not None:
        try:
            conn.close()
        except Exception:
            pass
        _local.pg = None


def _connect() -> DB:
    if is_postgres():
        return DB(_pg_conn(), True)
    path = sqlite_path()
    os.makedirs(os.path.dirname(os.path.abspath(path)), exist_ok=True)
    conn = sqlite3.connect(path, timeout=30, check_same_thread=False)
    conn.execute("PRAGMA foreign_keys=ON")
    conn.execute("PRAGMA journal_mode=WAL")
    return DB(conn, False)


@contextmanager
def tx():
    """Uma transação por bloco: commit no fim, rollback em caso de erro."""
    db = _connect()
    try:
        yield db
        db.commit()
    except Exception:
        try:
            db.rollback()
        except Exception:
            if db.pg:
                close_cached()
        raise
    finally:
        if db.pg:
            _local.last = time.time()
        else:
            db.conn.close()


def dumps(v) -> str:
    return json.dumps(v, ensure_ascii=False)


def loads(v, default=None):
    if v in (None, ""):
        return default
    if isinstance(v, (list, dict)):
        return v
    try:
        return json.loads(v)
    except (ValueError, TypeError):
        return default


def slugify(text: str) -> str:
    t = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", "-", t).strip("-")[:80] or "item"


def fingerprint(statement: str, options=None) -> str:
    """Impressão digital para detectar duplicatas: ignora acentos, pontuação e ordem das alternativas."""
    import hashlib

    def norm(s: str) -> str:
        s = unicodedata.normalize("NFKD", s or "").encode("ascii", "ignore").decode().lower()
        return " ".join(re.sub(r"[^a-z0-9 ]+", " ", s).split())

    parts = [norm(statement)] + sorted(norm(o) for o in (options or []))
    return hashlib.sha1("|".join(parts).encode()).hexdigest()[:20]
