"""Agregador TI por mecanismos, aplicação e armadilhas de prova."""
from .matriz_ti_infra import CURRICULUM as A
from .matriz_ti_codigo import CURRICULUM as B
from .matriz_ti_gestao import CURRICULUM as C
parts = (A, B, C)
if sum(len(x) for x in parts) != len({k for x in parts for k in x}):
    raise ValueError("Matéria duplicada entre módulos TI")
CURRICULUM = {k: v for part in parts for k, v in part.items()}
