"""Backup/restore SQLite com validação e parada do aplicativo para restauração.

Uso: python tools/backup_restore.py backup <banco> <destino>
     python tools/backup_restore.py inspect <backup>
     python tools/backup_restore.py restore <backup> <banco> --confirm
IMPORTANTE: pare containers API/web antes de restore.
"""
import argparse
import shutil
import sqlite3
import sys
from pathlib import Path


def check_db(path):
    if not Path(path).is_file(): raise ValueError('Arquivo não encontrado')
    with sqlite3.connect(f'file:{Path(path).resolve()}?mode=ro',uri=True) as c:
        integrity=c.execute('PRAGMA integrity_check').fetchone()[0]
        if integrity!='ok':raise ValueError('Banco com falhas de integridade: '+integrity)
        tables={r[0] for r in c.execute("SELECT name FROM sqlite_master WHERE type='table'")}
        if not {'subjects','topics','questions','flashcards','quiz_attempts','settings'}.issubset(tables):
            raise ValueError('Arquivo não contém as tabelas fundamentais do EstudaTI')
        return {t:c.execute(f'SELECT COUNT(*) FROM {t}').fetchone()[0] for t in ('topics','questions','flashcards','quiz_attempts')}


def cli():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('action',choices=['backup','inspect','restore'])
    p.add_argument('source')
    p.add_argument('destination',nargs='?')
    p.add_argument('--confirm',action='store_true')
    a=p.parse_args()
    if a.action=='inspect':print(check_db(a.source));return
    if not a.destination:p.error('É necessário informar destino')
    source=Path(a.source);dest=Path(a.destination)
    if a.action=='backup':
        if not source.exists():raise ValueError('Banco de origem não encontrado')
        dest.parent.mkdir(parents=True,exist_ok=True)
        if dest.exists():raise ValueError('Destino já existe; escolha nome novo')
        with sqlite3.connect(source) as origin, sqlite3.connect(dest) as out:
            origin.backup(out)
        print('Backup verificado:',check_db(dest))
    else:
        if not a.confirm:raise ValueError('Restore exige --confirm; pare o EstudaTI antes!')
        print('Backup de entrada:',check_db(source))
        if dest.exists():raise ValueError('Banco destino já existe. Renomeie-o antes de restaurar; não sobrescrevo dados.')
        dest.parent.mkdir(parents=True,exist_ok=True)
        shutil.copy2(source,dest)
        print('Restaurado:',check_db(dest))

if __name__=='__main__':
    try:cli()
    except (ValueError,sqlite3.Error) as exc:print('ERRO:',exc,file=sys.stderr);sys.exit(2)
