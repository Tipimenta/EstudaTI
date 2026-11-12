"""Agregador de disciplinas gerais. Cada tema possui explicações e caso real.
Os textos são originais e alinhados a ementas públicas, não cópias comerciais."""
from .matriz_geral_a import CURRICULUM as A
from .matriz_geral_b import CURRICULUM as B
from .matriz_geral_c import CURRICULUM as C
from .matriz_geral_d import CURRICULUM as D
parts = (A, B, C, D)
if sum(len(x) for x in parts) != len({k for x in parts for k in x}):
    raise ValueError("Matéria duplicada entre módulos gerais")
CURRICULUM = {k: v for part in parts for k, v in part.items()}
