"""Repetição espaçada no estilo SM-2 (o mesmo princípio do Anki clássico).

Notas: 0 = errei, 1 = difícil, 2 = bom, 3 = fácil.
Questões entram automaticamente: acerto = 2, erro = 0.
"""
from __future__ import annotations

from datetime import datetime, timedelta, timezone

from db import DB, now


def _due_in(days: float) -> str:
    return (datetime.now(timezone.utc) + timedelta(days=days)).date().isoformat()


def schedule(db: DB, user_id: int, item_type: str, item_id: int, grade: int) -> dict:
    row = db.one("SELECT * FROM reviews WHERE user_id=? AND item_type=? AND item_id=?", (user_id, item_type, item_id))
    ease = row["ease"] if row else 2.5
    interval = row["interval_days"] if row else 0
    reps = row["reps"] if row else 0
    lapses = row["lapses"] if row else 0

    if grade == 0:
        lapses += 1
        reps = 0
        interval = 1
        ease = max(1.3, ease - 0.2)
    else:
        reps += 1
        if reps == 1:
            interval = {1: 1, 2: 2, 3: 4}[grade]
        elif reps == 2:
            interval = {1: 3, 2: 6, 3: 9}[grade]
        else:
            factor = {1: 1.2, 2: ease, 3: ease * 1.3}[grade]
            interval = max(interval + 1, round(interval * factor))
        ease = max(1.3, ease + {1: -0.15, 2: 0.0, 3: 0.15}[grade])
    interval = min(interval, 180)
    due = _due_in(interval)
    db.x(
        """INSERT INTO reviews(user_id,item_type,item_id,due,interval_days,ease,reps,lapses,last_at)
           VALUES (?,?,?,?,?,?,?,?,?)
           ON CONFLICT(user_id,item_type,item_id) DO UPDATE SET due=excluded.due,
           interval_days=excluded.interval_days, ease=excluded.ease, reps=excluded.reps,
           lapses=excluded.lapses, last_at=excluded.last_at""",
        (user_id, item_type, item_id, due, interval, ease, reps, lapses, now()),
    )
    return {"due": due, "interval_days": interval}
