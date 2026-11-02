# Como alimentar o Banco de Questões com provas antigas

## Fontes oficiais que encontramos em 01/11/2026

- **FGV / Dataprev 2024:** https://conhecimento.fgv.br/concursos/dataprev24
- **FGV / Dataprev 2026:** https://conhecimento.fgv.br/concursos/dataprev26
- **Governo federal / CNU:** https://www.gov.br/gestao/pt-br/concursonacional/caderno-de-provas-e-gabaritos

As páginas oferecem cadernos ou orientam o acesso a arquivos oficiais. A **disponibilidade pública não significa licença para redistribuir integralmente** questões em um serviço público/comercial. Respeite condições da banca e direitos aplicáveis. O EstudaTI não contém questões oficiais pré-carregadas, nem faz scraping automático de sites de terceiros.

## Passo a passo: uma prova anterior

1. Acesse a página da banca do concurso; escolha a prova do **cargo, especialidade e tipo de caderno corretos** (ex.: Dataprev 2024 — Segurança Cibernética e Proteção de Dados — Tipo 1).
2. Baixe o **caderno** e o **gabarito definitivo**, não somente o preliminar. Verifique recursos, anuladas e eventuais alterações.
3. Abra **Fontes e provas PDF → Assistente de importação** e envie o caderno digital. Ele tentará localizar questões em layouts compatíveis; em outros casos, extraia texto com `python tools/extrair_texto_pdf.py prova.pdf prova.txt` e faça importação por CSV.
4. Preencha `examples/questoes_modelo.csv` em Excel, LibreOffice ou Google Sheets, uma questão por linha. Use os cabeçalhos sem modificá-los. Para modelos de 2 ou 5 opções consulte `examples/questoes_formatos.csv`. No CSV, **salve em UTF-8 e com vírgulas como separador**; se seu programa exportar com ponto e vírgula, converta para CSV com vírgulas ou use o modelo JSON.
5. Preencha `origin=oficial`, `board=FGV`, `exam=Dataprev — Analista de TI (especialidade)`, `year=2024`, `question_number=12`, `source_url=https://...` e registre informações sobre permissões em `license_note`.
6. Marque a resposta A/B/C/D de acordo com o **gabarito definitivo**. Não importe anuladas como válidas. Se usar questões anuladas como estudo, marque-as depois como **anuladas**.
7. Abra **Banco de questões → Escolher CSV/JSON → Importar como rascunho**.
8. Verifique enunciado, duas, quatro ou cinco alternativas, gabarito e referência. Se estiver tudo correto, clique **Marcar revisada**. Somente assim entrará nos simulados.
9. Entre em **Simulados**, filtre `Oficial` e, se necessário, a banca. Após responder, use **Criar flashcard** nas questões erradas.

## Regras e limites

- 500 questões por lote, máximo de 2 MB por arquivo no navegador.
- Enunciado de 12 a 6.000 caracteres; duas, quatro ou cinco alternativas distintas; comentário explicativo obrigatório.
- Duplicadas (mesmo enunciado + alternativas) são ignoradas.
- Questões oficiais exigem banca, prova/concurso, ano e URL de fonte.
- Aceita 2 alternativas (por exemplo, Certo/Errado), 4 ou 5 alternativas. **Pontuação ainda é simples (+1 acerto, +0 erro)**: não reproduz automaticamente penalidades Cebraspe ou critérios de um edital. Imagens, fórmulas complexas e questões discursivas exigem evolução posterior.
- Não forneça dados pessoais ou informações privadas de terceiros no banco de questões.
- O cadastro é pessoal e não modifica nenhuma página da banca.

## Formato do CSV

Campos: `subject_code`, `topic_id` (opcional), `question`, `option_a`, `option_b`, `option_c`, `option_d`, `option_e` (opcional), `correct`, `explanation`, `origin`, `board`, `exam`, `year`, `question_number`, `source_url`, `license_note`.

Códigos: `RED` redes; `SEG` segurança; `SO` sistemas operacionais; `POR` português; `GOV` governança; `BD` banco de dados; `ENG` engenharia de software; `LOG` lógica; `LEG` legislação. Com `topic_id` ausente a questão entra provisoriamente no primeiro tópico da disciplina; mapeamento por subtópico será melhorado.

## O que falta automatizar

- A importação assistida de caderno já está implementada em V0.3, mas **NÃO lê gabaritos automaticamente**: exige conferência manual da resposta e explicação. Precisamos melhorar detecção de layouts variados, páginas e imagens.
- Revisão automatizada de gabaritos retificados/anulados.
- Tipos adicionais: A–E e certo/errado com regra de pontuação por edital.
- Filtros por caderno original, número, dificuldade, respondida/inédita, desempenho e banca.
- Atualizações periódicas através de APIs/RSS oficiais disponíveis ou de URLs cadastradas, com revisão manual obrigatória de mudanças que afetam prazos.
