"""Esquema do banco. Executado no boot; cada versão é registrada em schema_migrations."""
from db import DB, now

PK_SQLITE = "INTEGER PRIMARY KEY AUTOINCREMENT"
PK_PG = "SERIAL PRIMARY KEY"

# Hierarquia: concurso (exams) -> cargo (roles) -> matérias com peso (role_subjects)
# -> tópicos do edital (role_topics). Matérias e tópicos são compartilhados entre cargos.
V1 = """
CREATE TABLE IF NOT EXISTS users (
  id {pk}, email TEXT NOT NULL UNIQUE, name TEXT NOT NULL, password_hash TEXT NOT NULL,
  is_admin INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS exams (
  id {pk}, org TEXT NOT NULL, name TEXT NOT NULL, banca TEXT NOT NULL DEFAULT '',
  year INTEGER, edital_url TEXT NOT NULL DEFAULT '', notes TEXT NOT NULL DEFAULT '',
  published INTEGER NOT NULL DEFAULT 1, created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS roles (
  id {pk}, exam_id INTEGER NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
  name TEXT NOT NULL, level TEXT NOT NULL DEFAULT '', exam_date TEXT,
  question_style TEXT NOT NULL DEFAULT 'multipla', description TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS subjects (
  id {pk}, name TEXT NOT NULL UNIQUE, slug TEXT NOT NULL UNIQUE, area TEXT NOT NULL DEFAULT ''
);
CREATE TABLE IF NOT EXISTS role_subjects (
  role_id INTEGER NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  subject_id INTEGER NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  weight REAL NOT NULL DEFAULT 1, questions INTEGER NOT NULL DEFAULT 0, position INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY(role_id, subject_id)
);
CREATE TABLE IF NOT EXISTS topics (
  id {pk}, subject_id INTEGER NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  name TEXT NOT NULL, position INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS ix_topics_subject ON topics(subject_id, position);
CREATE TABLE IF NOT EXISTS role_topics (
  role_id INTEGER NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  topic_id INTEGER NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  PRIMARY KEY(role_id, topic_id)
);
CREATE TABLE IF NOT EXISTS lessons (
  id {pk}, topic_id INTEGER NOT NULL UNIQUE REFERENCES topics(id) ON DELETE CASCADE,
  body TEXT NOT NULL, summary TEXT NOT NULL DEFAULT '', minutes INTEGER NOT NULL DEFAULT 15,
  origin TEXT NOT NULL DEFAULT 'autoral', status TEXT NOT NULL DEFAULT 'publicado',
  updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS prior_exams (
  id {pk}, exam_id INTEGER REFERENCES exams(id) ON DELETE SET NULL,
  role_id INTEGER REFERENCES roles(id) ON DELETE SET NULL,
  title TEXT NOT NULL, banca TEXT NOT NULL DEFAULT '', year INTEGER,
  style TEXT NOT NULL DEFAULT 'multipla', duration_min INTEGER NOT NULL DEFAULT 240,
  status TEXT NOT NULL DEFAULT 'rascunho', source_note TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS questions (
  id {pk}, subject_id INTEGER NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  topic_id INTEGER REFERENCES topics(id) ON DELETE SET NULL,
  kind TEXT NOT NULL DEFAULT 'multipla', statement TEXT NOT NULL, options TEXT NOT NULL DEFAULT '[]',
  answer TEXT NOT NULL, explanation TEXT NOT NULL DEFAULT '', rationales TEXT NOT NULL DEFAULT '[]',
  origin TEXT NOT NULL DEFAULT 'autoral', status TEXT NOT NULL DEFAULT 'publicada',
  banca TEXT NOT NULL DEFAULT '', year INTEGER, source TEXT NOT NULL DEFAULT '',
  prior_exam_id INTEGER REFERENCES prior_exams(id) ON DELETE CASCADE, number INTEGER,
  fingerprint TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS ix_questions_topic ON questions(topic_id, status);
CREATE INDEX IF NOT EXISTS ix_questions_subject ON questions(subject_id, status);
CREATE INDEX IF NOT EXISTS ix_questions_exam ON questions(prior_exam_id, number);
CREATE INDEX IF NOT EXISTS ix_questions_fp ON questions(fingerprint);
CREATE TABLE IF NOT EXISTS flashcards (
  id {pk}, topic_id INTEGER NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  front TEXT NOT NULL, back TEXT NOT NULL, origin TEXT NOT NULL DEFAULT 'autoral',
  status TEXT NOT NULL DEFAULT 'publicada', created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS ix_flash_topic ON flashcards(topic_id);
CREATE TABLE IF NOT EXISTS discursives (
  id {pk}, subject_id INTEGER NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  title TEXT NOT NULL, prompt TEXT NOT NULL, model_answer TEXT NOT NULL DEFAULT '',
  rubric TEXT NOT NULL DEFAULT '[]', max_lines INTEGER NOT NULL DEFAULT 30,
  origin TEXT NOT NULL DEFAULT 'autoral', created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS enrollments (
  id {pk}, user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role_id INTEGER NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  exam_date TEXT, minutes_per_day INTEGER NOT NULL DEFAULT 90, active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS ix_enroll_user ON enrollments(user_id, active);
CREATE TABLE IF NOT EXISTS answers (
  id {pk}, user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  question_id INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  chosen TEXT NOT NULL, correct INTEGER NOT NULL, seconds INTEGER NOT NULL DEFAULT 0,
  context TEXT NOT NULL DEFAULT 'treino', created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS ix_answers_user ON answers(user_id, question_id);
CREATE INDEX IF NOT EXISTS ix_answers_date ON answers(user_id, created_at);
CREATE TABLE IF NOT EXISTS reviews (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL, item_id INTEGER NOT NULL,
  due TEXT NOT NULL, interval_days REAL NOT NULL DEFAULT 0, ease REAL NOT NULL DEFAULT 2.5,
  reps INTEGER NOT NULL DEFAULT 0, lapses INTEGER NOT NULL DEFAULT 0, last_at TEXT,
  PRIMARY KEY(user_id, item_type, item_id)
);
CREATE INDEX IF NOT EXISTS ix_reviews_due ON reviews(user_id, due);
CREATE TABLE IF NOT EXISTS lesson_progress (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  topic_id INTEGER NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  done_at TEXT NOT NULL, notes TEXT NOT NULL DEFAULT '',
  PRIMARY KEY(user_id, topic_id)
);
CREATE TABLE IF NOT EXISTS attempts (
  id {pk}, user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role_id INTEGER REFERENCES roles(id) ON DELETE SET NULL,
  prior_exam_id INTEGER REFERENCES prior_exams(id) ON DELETE SET NULL,
  title TEXT NOT NULL, style TEXT NOT NULL DEFAULT 'multipla', question_ids TEXT NOT NULL,
  responses TEXT NOT NULL DEFAULT '{{}}', duration_min INTEGER NOT NULL,
  started_at TEXT NOT NULL, finished_at TEXT, result TEXT
);
CREATE INDEX IF NOT EXISTS ix_attempts_user ON attempts(user_id, started_at);
CREATE TABLE IF NOT EXISTS discursive_answers (
  id {pk}, user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  discursive_id INTEGER NOT NULL REFERENCES discursives(id) ON DELETE CASCADE,
  text TEXT NOT NULL, feedback TEXT, score REAL, created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS study_log (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  day TEXT NOT NULL, minutes INTEGER NOT NULL DEFAULT 0, items INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY(user_id, day)
);
"""

MIGRATIONS = [("v1", V1)]


def migrate(db: DB):
    pk = PK_PG if db.pg else PK_SQLITE
    db.x("CREATE TABLE IF NOT EXISTS schema_migrations (version TEXT PRIMARY KEY, applied_at TEXT NOT NULL)")
    done = {r["version"] for r in db.q("SELECT version FROM schema_migrations")}
    for version, script in MIGRATIONS:
        if version in done:
            continue
        for stmt in script.format(pk=pk).split(";"):
            if stmt.strip():
                db.x(stmt)
        db.x("INSERT INTO schema_migrations(version, applied_at) VALUES (?, ?)", (version, now()))
