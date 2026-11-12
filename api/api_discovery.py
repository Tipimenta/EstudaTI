"""Pesquisa online de notícias de concursos com RSS, sem chave e sem scraping frágil.

Os itens são PUBLICAÇÕES, não concursos com inscrições verificadas.
Nunca grava concursos/edital automaticamente nem abre URLs do usuário.
"""
from __future__ import annotations

import re
import time
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime
from threading import Lock
from urllib.parse import urlparse
from xml.etree import ElementTree

import requests
from flask import Blueprint, request

from auth import login_required

bp = Blueprint("discovery", __name__, url_prefix="/api")
_FEED = "https://news.google.com/rss/search"
_UF = {
    "SP": "São Paulo", "MS": "Mato Grosso do Sul", "MG": "Minas Gerais",
    "PR": "Paraná", "RJ": "Rio de Janeiro", "GO": "Goiás",
    "DF": "Distrito Federal", "SC": "Santa Catarina", "RS": "Rio Grande do Sul",
    "ES": "Espírito Santo", "BA": "Bahia", "PE": "Pernambuco",
    "CE": "Ceará", "RN": "Rio Grande do Norte", "PB": "Paraíba",
    "AM": "Amazonas", "PA": "Pará", "MT": "Mato Grosso",
}
_OFFICIAL = [
    {
        "label": "Portal federal de concursos (MGI)",
        "url": "https://www.gov.br/servidor/pt-br/acesso-a-informacao/gestao-de-pessoas/concursos-publicos-e-provimento-de-pessoal/concursos-publicos",
        "detail": "Autorizações, provimentos e notícias oficiais do Executivo federal",
    },
    {
        "label": "Diário Oficial da União",
        "url": "https://www.in.gov.br/",
        "detail": "Publicações e editais federais; confirme sempre a data",
    },
    {
        "label": "Concursos da Dataprev",
        "url": "https://www.dataprev.gov.br/conheca-dataprev-faca-parte-da-dataprev/concursos",
        "detail": "Editais e comunicados no portal da instituição",
    },
]
_cache: dict[tuple[str, str, int], tuple[float, list[dict]]] = {}
_lock = Lock()


def _as_date(value: str) -> str:
    try:
        dt = parsedate_to_datetime(value)
        return dt.astimezone(timezone.utc).isoformat() if dt.tzinfo else dt.replace(tzinfo=timezone.utc).isoformat()
    except (ValueError, TypeError, OverflowError):
        return ""


def _read_feed(xml: str, days: int) -> list[dict]:
    root = ElementTree.fromstring(xml)
    oldest = datetime.now(timezone.utc) - timedelta(days=days + 1)
    found, ids = [], set()
    for item in root.findall("./channel/item")[:80]:
        title = (item.findtext("title") or "").strip()
        link = (item.findtext("link") or "").strip()
        if not title or not re.search(r"concurso|edital|inscri|sele[cç][aã]o|vagas", title, re.I):
            continue
        parsed = urlparse(link)
        if parsed.scheme != "https" or parsed.hostname != "news.google.com":
            continue
        if link in ids:
            continue
        published = _as_date(item.findtext("pubDate") or "")
        if published and datetime.fromisoformat(published) < oldest:
            continue
        source = item.find("source")
        agency = (source.text or "").strip() if source is not None else ""
        if not agency and " - " in title:
            agency = title.rsplit(" - ", 1)[-1][:100]
        ids.add(link)
        found.append({
            "title": title[:280], "url": link, "source": agency[:100],
            "published_at": published, "verified": False,
            "status": "Notícia localizada — situação e edital NÃO verificados",
        })
        if len(found) == 24:
            break
    return found


def _search_online(term: str, uf: str, days: int) -> list[dict]:
    query = '("concurso público" OR "edital de concurso")'
    query += " " + term
    if uf:
        query += ' "' + _UF[uf] + '"'
    query += f" when:{days}d"
    r = requests.get(
        _FEED,
        params={"q": query, "hl": "pt-BR", "gl": "BR", "ceid": "BR:pt-419"},
        headers={"User-Agent": "Estuda/2.2 (consulta de publicações RSS)"},
        timeout=8,
    )
    r.raise_for_status()
    if len(r.content) > 1_500_000:
        raise ValueError("Feed maior que o limite.")
    return _read_feed(r.text, days)


@bp.get("/discover")
@login_required
def discover():
    term = re.sub(r"\s+", " ", request.args.get("q", "tecnologia da informação")).strip()[:90]
    if not term:
        term = "tecnologia da informação"
    # Permite linguagem comum; não interpreta expressões do usuário como URLs.
    term = re.sub(r"[\x00-\x1f\x7f]", "", term)
    uf = request.args.get("uf", "SP").upper()
    if uf not in _UF:
        uf = ""
    try:
        days = int(request.args.get("days", "30"))
    except ValueError:
        days = 30
    days = days if days in (7, 30, 90) else 30
    key = (term.casefold(), uf, days)

    with _lock:
        cached = _cache.get(key)
        if cached and time.monotonic() - cached[0] < 900:
            items = cached[1]
        else:
            items = None

    error = ""
    if items is None:
        try:
            items = _search_online(term, uf, days)
            with _lock:
                if len(_cache) > 60:
                    _cache.clear()
                _cache[key] = (time.monotonic(), items)
        except (requests.RequestException, ElementTree.ParseError, ValueError) as exc:
            items = []
            error = "A consulta ao agregador está indisponível. Use os portais oficiais abaixo e tente novamente."
    return {
        "query": term, "uf": uf, "days": days, "items": items,
        "online": not bool(error), "error": error,
        "provider": "Google Notícias (RSS público; fonte agregadora, não oficial)",
        "official_sources": _OFFICIAL,
        "notice": "Resultados são PUBLICAÇÕES jornalísticas, não editais validados. "
                  "Uma notícia pode ser antiga, repetir anúncio ou tratar de concurso já encerrado. "
                  "Confirme sempre edital, inscrição, cargo e prazo diretamente no órgão/banca.",
    }
