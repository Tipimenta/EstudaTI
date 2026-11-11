# Migração do EstudaTI (V1.3) para o Estuda 2.0

## O que mudou

O EstudaTI era um app pessoal, para uma pessoa e um concurso de TI, instalado com Docker no Windows. O Estuda 2.0 é multiusuário, pronto para a nuvem e organizado em torno de concurso e cargo. As principais diferenças:

- **Conteúdo no banco de dados.** As aulas deixaram de ficar espalhadas em 57 arquivos TypeScript, Markdown, JSON e seeds Python. Agora tudo vive no banco e é editado pela tela de Administração.
- **Concurso → cargo → matérias → tópicos.** Matérias são compartilhadas entre concursos. O antigo cadastro de "concursos monitorados" deu lugar a cargos com edital completo.
- **Contas de usuário** com login próprio, em vez de uma senha única.
- **IA como motor**: gera aulas, questões e flashcards, lê editais e provas. Vários provedores, não só OpenAI.
- **Interface com 5 telas principais** (Hoje, Trilha, Questões, Simulados, Desempenho), mais Revisão, Discursivas e Administração.

## O que foi trazido

Todo o conteúdo autoral do EstudaTI está no pacote `backend/seed/packs/ti_birigui.json` e entra automaticamente no primeiro início:

- 169 aulas nas versões pedagógicas completas (as da pasta `web/src/academy`), na ordem do currículo;
- 321 questões revisadas, com as justificativas por alternativa quando existiam;
- 604 flashcards;
- 27 discursivas com padrão de resposta e rubrica;
- o cargo Analista de TI da Prefeitura de Birigui (edital 220/2026) com as 9 matérias.

As matérias Língua Portuguesa e Raciocínio Lógico já são reaproveitadas pelo Escrivão da PC-SP.

## O que não foi trazido

O histórico pessoal de estudo do EstudaTI (respostas, revisões, anotações) não é migrado, porque o modelo de dados mudou e agora cada usuário tem sua conta. O monitor de páginas de concursos e o laboratório de IPv4 ficaram de fora desta versão.

## Recriar o pacote a partir do repositório antigo

Só é necessário se você alterar o conteúdo no EstudaTI antigo. O script `scripts/converter_estudati.py` lê o banco SQLite do EstudaTI já semeado e as aulas exportadas da pasta `academy`, e grava o pacote. Veja as instruções no topo do script.

## Formato dos pacotes de conteúdo

Pacotes são arquivos JSON em `backend/seed/packs/`, carregados quando o banco está vazio (lista em `SEED_PACKS`). Estrutura:

```json
{
  "subjects": [
    {"name": "Direito Penal", "topics": [
      {"name": "Legítima defesa",
       "lesson": {"body": "## Para que serve\n...", "summary": "...", "minutes": 20},
       "questions": [{"kind": "multipla", "statement": "...", "options": ["...", "..."], "answer": "B", "explanation": "..."}],
       "flashcards": [{"front": "...", "back": "..."}]}
    ]}
  ],
  "exams": [
    {"org": "Órgão", "banca": "Banca", "year": 2026, "roles": [
      {"name": "Cargo", "question_style": "multipla",
       "subjects": [{"name": "Direito Penal", "weight": 1.5, "questions": 20, "topics": "*"}]}
    ]}
  ]
}
```

Em `topics` do cargo, use `"*"` para todos os tópicos da matéria, `"general"` para todos menos as oficinas, ou uma lista de nomes.
