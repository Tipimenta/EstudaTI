# EstudaTI V1.1 — Questões dissertativas, linguagem formal e correção fundamentada

## Objetivo

Módulo **separado** de questões objetivas e simulados, opcional para quem estuda para provas sem redação. Exercita explicação técnica, argumentação, clareza e escrita formal. Todas as **27 questões iniciais são autorais** (3 por disciplina, 9 disciplinas), com espelho editorial e quatro critérios de conteúdo de 25 pontos.

## Fluxo para quem estuda

1. Abra **Discursivas com correção** no menu lateral.
2. Selecione uma matéria e uma questão.
3. Leia o enunciado e a rubrica, mas não consulte materiais para a primeira tentativa.
4. Responda por escrito (mínimo 80 caracteres; máximo 8.000), usando conceito → fundamento → aplicação → conclusão quando isso se adequar ao enunciado.
5. Escolha **Diagnóstico local** (sem IA) ou **IA + consulta às aulas** (necessita chave de API).
6. Veja a devolutiva: critérios técnicos, linguagem, pontos fortes, erros e omissões, espelho editorial e trechos de aulas relevantes.
7. Reescreva com suas próprias palavras; o histórico de tentativas é preservado.

## Modos e limites

### Local (sem chave de API)

- Identifica apenas **expressões ou palavras** associadas a critérios da rubrica.
- Aponta alguns coloquialismos e frases muito extensas com regras simples.
- Apresenta espelho editorial após envio e trechos de aulas locais recuperados por busca lexical.
- **Não atribui nota** e não verifica veracidade, semântica, normas gramaticais completas nem qualidade argumentativa.
- Não envia texto a serviços externos.

### IA com recuperação de trechos das aulas (RAG lexical)

- O backend seleciona parágrafos da **mesma disciplina** por coincidência de termos e os envia junto com questão, rubrica, espelho editorial e sua resposta.
- Essa recuperação é **lexical, sem embeddings, índice vetorial, pesquisa semântica avançada ou consulta automática à internet**. A relevância dos trechos é limitada à qualidade dos materiais locais.
- A IA produz **nota estimada de conteúdo /100** (quatro critérios de 0 a 25) e **nota estimada independente de linguagem /100** (clareza, coesão, formalidade, gramática e terminologia).
- Mostra índice ilustrativo de **80% conteúdo + 20% linguagem**; **não** representa os critérios reais de uma banca.
- Oferece: comentários por critério, falhas de argumentação, sugestões pontuais de reescrita, revisão de linguagem preservando as ideias originais, e resposta técnica ampliada para comparar.
- Apenas cita identificadores de aulas realmente selecionadas; não supõe referências oficiais.
- Uso de IA é **opcional**, depende de `OPENAI_API_KEY` no `.env`, de conectividade e pode ser cobrado à parte pela provedora. A chave fica no backend. A solicitação de IA envia a resposta e os trechos recuperados ao provedor da API. O parâmetro `store: false` é enviado para a API.
- **A IA pode errar.** Sua nota e suas sugestões não substituem professores, normas ou gabaritos de banca.

## Configurar o modo com IA

Na instalação local `C:\Projetos\EstudaTI`, edite `.env`:

```dotenv
OPENAI_API_KEY=sua_chave_pessoal
OPENAI_MODEL=gpt-5-mini
```

Depois execute `ATUALIZAR_ESTUDATI_WINDOWS.bat` para recriar o backend com as variáveis. A assinatura do ChatGPT não inclui automaticamente créditos da API. **Não publique nem compartilhe o `.env`**.

## Exemplo de melhoria na linguagem

**Resposta informal:** “O backup é tipo uma cópia e se der ruim dá pra voltar tudo.”

**Resposta mais adequada:** “Backup é uma cópia de segurança de dados ou sistemas, mantida para subsidiar a recuperação após falhas. Sua eficácia depende de cópias íntegras, política de retenção e testes periódicos de restauração.”

A melhoria não se limita à troca de palavras. A resposta formal restringe afirmações absolutas, inclui condições técnicas e conecta definição, finalidade e limites. O modo IA tenta **separar** o aprimoramento de linguagem da complementação técnica, para não confundir “saber escrever” com “já dominar o conceito”.

## Manutenção de dados na atualização

- Execute `BACKUP_DADOS_WINDOWS.bat` antes de substituir o código.
- Preserve o `.env`, a pasta `backups` e os volumes Docker. A tabela de questões e a tabela de tentativas são criadas por migração **aditiva**.
- Não execute `docker compose down -v`, pois `-v` remove os volumes.
- Execute `ATUALIZAR_ESTUDATI_WINDOWS.bat` depois de copiar os novos arquivos.
- Abra `http://localhost:8088`, faça login e selecione **Discursivas com correção**.

## Testes e limites de validação

A suíte de testes da API inclui persistência das respostas, prevenção de duplicações de perguntas, recuperação textual restrita à disciplina, validação da rubrica, ausência de falsa nota no modo local e simulação controlada da resposta da IA com esquema JSON. A integração de cobrança/API **não foi testada com chave real**. O build final com npm e a execução do Docker devem ser validados no Windows.
