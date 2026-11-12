"""Migração única dos 169 guias editoriais para lessons.body.

Execução após seed. Transacional, idempotente, sem modificações em public.
O payload Python permanece apenas como fonte para instalações novas; a API
consulta exclusivamente a coluna editável em Administração.
"""
from __future__ import annotations

from db import now, tx

EDITORIAL_MIGRATION = "content_estuda_editorial_into_lessons_v1"


def migrate_editorial_once() -> dict:
    from .aprofundamentos import SUPPLEMENTS
    if len(SUPPLEMENTS) != 169:
        raise ValueError("A migração exige todos os 169 complementos originais.")

    with tx() as db:
        if db.one("SELECT version FROM schema_migrations WHERE version=?", (EDITORIAL_MIGRATION,)):
            return {"installed": False, "reason": "already_installed"}

        rows = db.q("""
            SELECT l.id AS lesson_id, l.body, s.name AS subject_name, t.name AS topic_name
            FROM lessons l
            JOIN topics t ON t.id=l.topic_id
            JOIN subjects s ON s.id=t.subject_id
        """)
        indexed = {(r["subject_name"], r["topic_name"]): r for r in rows}
        missing = [key for key in SUPPLEMENTS if key not in indexed or not indexed[key]["body"]]
        if missing:
            # Reverte a transação inteira: nunca marcar como concluída pela metade.
            raise ValueError(f"A migração editorial encontrou aulas ausentes: {missing[:5]}")

        updates, already = [], 0
        timestamp = now()
        for key, material in SUPPLEMENTS.items():
            row = indexed[key]
            text = row["body"]
            extra = material.strip()
            marker = extra.splitlines()[0]
            if marker in text:
                already += 1
                continue
            new_text = text.rstrip() + "\n\n---\n\n" + extra
            updates.append((new_text, timestamp, row["lesson_id"]))

        db.many("UPDATE lessons SET body=?, updated_at=? WHERE id=?", updates)
        # Registro é parte da MESMA transação; segunda execução não altera edição.
        db.x("INSERT INTO schema_migrations(version, applied_at) VALUES (?,?)",
             (EDITORIAL_MIGRATION, timestamp))
        return {"installed": True, "updated": len(updates), "already_present": already,
                "total": len(SUPPLEMENTS)}
