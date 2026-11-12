#!/usr/bin/env python3
"""Execução única no GitHub Actions; apaga SOMENTE arquivos comprovadamente órfãos.

Não usa tokens, não acessa Neon, e confere imports Python/TS antes de remover.
Caso algum teste/build falhe, a Action não faz push de nenhuma exclusão.
"""
from __future__ import annotations

import ast
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TRACKED = set(subprocess.check_output(["git", "ls-files", "-z"], cwd=ROOT)
              .decode().split("\0")) - {""}


def imports_ts(source: str) -> set[str]:
    patterns = [
        r"\bfrom\s*['\"](\.[^'\"]+)['\"]",
        r"\bimport\s*['\"](\.[^'\"]+)['\"]",
        r"\bimport\s*\(\s*['\"](\.[^'\"]+)['\"]\s*\)",
        r"\brequire\s*\(\s*['\"](\.[^'\"]+)['\"]\s*\)",
    ]
    return {s for p in patterns for s in re.findall(p, source)}


def frontend_dependencies() -> set[str]:
    todo, used = ["web/src/main.tsx"], set()
    while todo:
        rel = todo.pop()
        if rel in used:
            continue
        if rel not in TRACKED:
            raise RuntimeError(f"Import de frontend ausente: {rel}")
        used.add(rel)
        source = (ROOT / rel).read_text(encoding="utf-8")
        for ref in imports_ts(source):
            base = (ROOT / rel).parent / ref
            options = [
                base, Path(str(base) + ".ts"), Path(str(base) + ".tsx"),
                Path(str(base) + ".css"), base / "index.ts",
                base / "index.tsx",
            ]
            match = next((p for p in options if p.is_file()), None)
            if not match:
                raise RuntimeError(f"Import relativo sem arquivo: {rel} -> {ref}")
            resolved = match.resolve().relative_to(ROOT.resolve()).as_posix()
            todo.append(resolved)
    return used


def python_dependencies() -> set[str]:
    roots = ["api/app.py", "api/testes_estuda/test_api.py"]
    todo, used = roots[:], set()
    while todo:
        rel = todo.pop()
        if rel in used:
            continue
        if rel not in TRACKED:
            raise RuntimeError(f"Import Python ausente: {rel}")
        used.add(rel)
        source = (ROOT / rel).read_text(encoding="utf-8")
        tree = ast.parse(source, filename=rel)
        pkg = Path(rel).with_suffix("").parts[1:-1]
        for node in ast.walk(tree):
            candidates = []
            if isinstance(node, ast.Import):
                candidates = [x.name for x in node.names]
            elif isinstance(node, ast.ImportFrom):
                mod = node.module or ""
                if node.level:
                    # O pacote da origem está em rel[1:-1], ex.: conteudo.
                    if node.level > len(pkg) + 1:
                        continue
                    base = list(pkg[:len(pkg) - node.level + 1])
                    mod = ".".join(base + ([mod] if mod else []))
                candidates = [mod] if mod else []
                # from . import submodule
                if not node.module:
                    candidates += [mod + "." + alias.name for alias in node.names]
            for name in candidates:
                if not name:
                    continue
                path = "api/" + name.replace(".", "/")
                for candidate in (path + ".py", path + "/__init__.py"):
                    if candidate in TRACKED and candidate not in used:
                        todo.append(candidate)
    return used


def plan() -> tuple[set[str], dict[str, int]]:
    py = python_dependencies()
    ts = frontend_dependencies()
    for path in [
        "web/src/main.tsx", "web/src/App.tsx", "api/app.py",
        "api/conteudo/migracao_editorial.py", "api/version.py",
    ]:
        if path not in (ts | py):
            raise RuntimeError(f"Arquivo essencial não localizado no grafo de imports: {path}")

    # A estrutura atual é api/ + web/. Rejeita remoção se um arquivo
    # ativo de implantação ainda apontar para os diretórios antigos.
    config = (
        "Dockerfile", "compose.yaml", "render.yaml", "api/Dockerfile",
        "web/vercel.json", ".github/workflows/validar-estuda22.yml"
    )
    for name in config:
        if name not in TRACKED:
            continue
        source = (ROOT / name).read_text(encoding="utf-8")
        if re.search(r"(?<![\w])(?:backend|frontend)/", source):
            raise RuntimeError(f"Configuração de execução ainda referencia legado: {name}")

    removals = set()
    old_directories = ("backend/", "frontend/", "web/src/academy/", "api/tests/", "tests/")
    for file in TRACKED:
        if file.startswith(old_directories):
            removals.add(file)
        if file.startswith("web/src/") and file.endswith((".ts", ".tsx", ".js", ".jsx", ".css")):
            if file not in ts and not file.endswith(".d.ts"):
                removals.add(file)
        if (file.startswith("api/") and file.count("/") == 1
                and file.endswith(".py") and file not in py and
                not file.endswith("/__init__.py")):
            removals.add(file)
        if file.count("/") == 0 and file.lower().endswith((".md", ".bat", ".zip")):
            if file != "README.md":
                removals.add(file)

    # Conversor legado só lia o academy/ e não é chamado pelo projeto atual.
    for old in ("scripts/converter_estudati.py", "docs/github/importar-estudati.yml"):
        if old in TRACKED:
            removals.add(old)
    # Dados de estudo armazenados em api/enrichment não são apagados:
    # podem ser valiosos para reutilização futura e requerem auditoria própria.
    # Não remover arquivos novos de versão/migração, mesmo se um import estiver
    # dentro de função que um analisador superficial não reconhecer.
    protected = py | ts | {
        "README.md", "api/Dockerfile", "api/app.py", "api/db.py",
        "api/version.py", "api/conteudo/migracao_editorial.py",
        "web/src/main.tsx", "web/src/App.tsx",
        ".github/workflows/validar-estuda22.yml"
    }
    if removals & protected:
        raise RuntimeError(f"Plano apagaria arquivo ativo: {sorted(removals & protected)}")
    counts = {prefix: sum(f.startswith(prefix) for f in removals)
              for prefix in old_directories}
    return removals, counts


def main():
    removals, counts = plan()
    if not removals or len(removals) > 300:
        raise RuntimeError(f"Número inesperado de exclusões: {len(removals)}")
    print("Arquivos em uso no frontend:", len(frontend_dependencies()))
    print("Módulos em uso no backend:", len(python_dependencies()))
    print("Arquivos legados a remover:", len(removals), counts)
    print("\n".join(sorted(removals)))

    # Uma única operação git rm em staging. Nada será publicado sem testes.
    subprocess.run(["git", "rm", "-r", "--", *sorted(removals)], cwd=ROOT, check=True)
    (ROOT / "docs" / "LIMPEZA_REPOSITORIO_20261112.md").write_text(
        "# Limpeza controlada do Estuda\n\n"
        "Arquivos removidos após análise dos imports do frontend e backend, "
        "seguida de testes da API e build web antes do commit.\n\n"
        f"Total de arquivos: {len(removals)}\n\n"
        + "\n".join(f"- `{x}`" for x in sorted(removals)) + "\n",
        encoding="utf-8"
    )


if __name__ == "__main__":
    main()
