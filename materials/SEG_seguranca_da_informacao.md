# Segurança da informação

10 aulas • conteúdo autoral • EstudaTI v0.3

> Material de treinamento. Consulte legislação e normas vigentes nas fontes oficiais.

---

## CIA, controle de acesso e autenticação

**Objetivo:** Aplicar princípios básicos de segurança.

A tríade da segurança é confidencialidade, integridade e disponibilidade. Princípio do menor privilégio significa dar apenas os acessos necessários. MFA combina dois ou mais fatores independentes de autenticação.

**Treino:** Qual propriedade protege contra alterações não autorizadas dos dados?

- A. Confidencialidade
- B. Disponibilidade
- C. Integridade
- D. Não repúdio

**Gabarito comentado:** C — Integridade garante que dados não sejam alterados indevidamente.

**Treino:** Qual controle reduz danos de credenciais com permissões excessivas?

- A. Menor privilégio
- B. Conta compartilhada
- C. Senha padrão
- D. Desabilitar logs

**Gabarito comentado:** A — Menor privilégio limita permissões ao necessário.

---

## Criptografia, backup e incidentes

**Objetivo:** Diferenciar criptografia e recuperação.

Criptografia simétrica utiliza a mesma chave para cifrar e decifrar. Criptografia assimétrica usa par de chaves. Cópias de segurança requerem testes de restauração, segregação e retenção. Um plano de resposta a incidentes define papéis e procedimentos.

**Treino:** Qual prática ajuda a confirmar se uma cópia de segurança é recuperável?

- A. Apagar os logs
- B. Testar a restauração
- C. Manter uma só mídia
- D. Desativar versionamento

**Gabarito comentado:** B — Um teste de restauração valida a possibilidade de recuperar os dados.

**Treino:** Qual tipo de criptografia usa par de chaves pública e privada?

- A. Simétrica
- B. Assimétrica
- C. Hash
- D. Compressão

**Gabarito comentado:** B — Criptografia assimétrica usa duas chaves matematicamente relacionadas.

---

## Gestão de riscos e tratamento

**Objetivo:** Explicar e aplicar: Gestão de riscos e tratamento.

### Conceito e teoria
Risco combina incerteza e consequências para objetivos; em segurança é útil analisar cenário, probabilidade e impacto. Respostas comuns: reduzir, aceitar, evitar e compartilhar/transferir. O risco residual permanece após controles.

### Exemplo
Manter backups imutáveis reduz impactos de ransomware, mas não zera risco de indisponibilidade.

### Armadilha de prova
Vulnerabilidade isolada não descreve todo o risco; contexto, ameaça, exposição e impacto importam.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Como se denomina o risco remanescente após controles?

- A. Risco residual
- B. Risco inerente
- C. Risco nulo
- D. Risco de controle

**Gabarito comentado:** A — Risco residual persiste após medidas de tratamento.

**Treino:** Comprar seguro para compartilhar parte das consequências financeiras é exemplo de:

- A. Controle de versão
- B. Compartilhamento ou transferência de risco
- C. Eliminação absoluta de todas as ameaças
- D. Criptografia de arquivos

**Gabarito comentado:** B — Seguro transfere ou compartilha consequências, sem eliminar o evento.

---

## Autenticação multifator e acesso

**Objetivo:** Explicar e aplicar: Autenticação multifator e acesso.

### Conceito e teoria
MFA combina fatores de categorias distintas, como algo que você sabe, possui ou é. Dois segredos do mesmo tipo não constituem necessariamente MFA. Privilégio mínimo concede apenas permissões necessárias; revisões periódicas reduzem acessos excessivos.

### Exemplo
Conta administrativa separada para tarefas elevadas reduz exposição do privilégio em navegação cotidiana.

### Armadilha de prova
Senha + PIN são ambos fatores de conhecimento; podem não representar dois fatores independentes.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Qual combinação tipicamente constitui autenticação multifator?

- A. Duas senhas diferentes
- B. Senha e token físico
- C. Senha e PIN
- D. Duas perguntas secretas

**Gabarito comentado:** B — Senha é conhecimento; token é posse.

**Treino:** Qual princípio recomenda conceder apenas permissões indispensáveis?

- A. Privilégio mínimo
- B. Alta disponibilidade
- C. Replicação síncrona
- D. Não repúdio

**Gabarito comentado:** A — Least privilege limita acessos ao estritamente necessário.

---

## Criptografia simétrica, assimétrica e hash

**Objetivo:** Explicar e aplicar: Criptografia simétrica, assimétrica e hash.

### Conceito e teoria
Algoritmos simétricos usam chave compartilhada. Assimétricos utilizam par pública/privada e suportam operações como assinatura e troca de chaves. Hash criptográfico produz resumo para integridade; sem segredo não equivale à criptografia reversível.

### Exemplo
TLS combina mecanismos criptográficos: negociação/autenticação, segredos de sessão e criptografia simétrica do tráfego.

### Armadilha de prova
Não use hash simples como substituto de armazenamento robusto de senhas; são necessários derivadores adequados e salt.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Qual técnica utiliza uma mesma chave secreta para cifrar e decifrar?

- A. DNSSEC em si
- B. Criptografia simétrica
- C. Assinatura digital
- D. Hash sem chave

**Gabarito comentado:** B — Algoritmos simétricos operam com segredo compartilhado.

**Treino:** Qual característica é esperada de um hash criptográfico seguro?

- A. Reversão direta sem chave
- B. Mesmo resumo para quaisquer entradas
- C. Preservação do texto original
- D. Resistência à colisão

**Gabarito comentado:** D — Hashes robustos dificultam encontrar entradas distintas com mesma saída.

---

## PKI, certificados e TLS

**Objetivo:** Explicar e aplicar: PKI, certificados e TLS.

### Conceito e teoria
Certificados digitais vinculam uma chave pública a uma identidade, conforme confiança em uma autoridade certificadora. Um cliente valida cadeia de confiança, nome e validade. TLS protege confidencialidade e integridade em trânsito.

### Exemplo
Erro de hostname em HTTPS ocorre quando o certificado não corresponde ao nome acessado; simplesmente ignorar o alerta é inseguro.

### Armadilha de prova
Certificado válido não torna automaticamente a aplicação livre de vulnerabilidades.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Qual informação central é vinculada à identidade em um certificado digital?

- A. Uma chave pública
- B. A senha do usuário
- C. Um backup completo
- D. Um token de sessão eterno

**Gabarito comentado:** A — O certificado associa identidade e chave pública.

**Treino:** Na verificação de TLS, incompatibilidade entre domínio acessado e certificado aponta para:

- A. Falha obrigatória no DHCP
- B. Erro de integridade do disco
- C. Ausência de IPv6
- D. Falha na validação de identidade

**Gabarito comentado:** D — A validação confere se o nome do certificado corresponde ao host.

---

## Resposta a incidentes e evidências

**Objetivo:** Explicar e aplicar: Resposta a incidentes e evidências.

### Conceito e teoria
Resposta a incidentes envolve preparação, detecção/análise, contenção, erradicação, recuperação e lições aprendidas, com variantes conforme o referencial. Registre horário, origem, ações e evidências para investigar e comunicar adequadamente.

### Exemplo
Ao identificar conta comprometida: acione o plano, preserve logs, isole acesso conforme análise e recupere serviço com segurança.

### Armadilha de prova
Não altere máquinas indiscriminadamente antes de avaliar necessidade de preservação de evidências.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Qual é um dos objetivos da etapa de contenção de incidentes?

- A. Apagar todos os logs
- B. Publicar credenciais
- C. Ignorar alerta até o próximo mês
- D. Limitar propagação e danos

**Gabarito comentado:** D — Contenção busca reduzir impacto enquanto a investigação continua.

**Treino:** Por que registrar cadeia de custódia de evidências?

- A. Substituir todas as medidas preventivas
- B. Evitar a necessidade de backups
- C. Garantir que não haverá incidente
- D. Preservar rastreabilidade de coleta e manuseio

**Gabarito comentado:** D — Rastreabilidade ajuda a demonstrar integridade e origem da evidência.

---

## Cópias de segurança e ransomware

**Objetivo:** Explicar e aplicar: Cópias de segurança e ransomware.

### Conceito e teoria
A estratégia 3-2-1 é uma heurística: múltiplas cópias, mídias/tipos diferentes e ao menos uma cópia separada; variantes incluem backup offline/imutável. RPO mede perda máxima de dados tolerável; RTO mede tempo de recuperação desejado.

### Exemplo
RPO de 1 hora pede estratégia que limite a perda de alterações a aproximadamente uma hora; RTO de 4 horas orienta capacidade de restaurar dentro desse prazo.

### Armadilha de prova
Backup que nunca foi restaurado em teste não comprova recuperação.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Qual indicador mede perda de dados aceitável em janela de tempo?

- A. MTBF
- B. CPU
- C. RPO
- D. RTO

**Gabarito comentado:** C — Recovery Point Objective relaciona-se ao ponto até o qual recuperar dados.

**Treino:** Qual prática aumenta confiança na estratégia de backup?

- A. Excluir logs depois de cada cópia
- B. Teste periódico de restauração
- C. Guardar todas as cópias no mesmo volume
- D. Desabilitar alertas

**Gabarito comentado:** B — Testes de restauração validam recuperabilidade, não apenas existência de cópias.

---

## NIST CSF 2.0 e governança

**Objetivo:** Explicar e aplicar: NIST CSF 2.0 e governança.

### Conceito e teoria
O NIST CSF 2.0 organiza resultados em seis funções: Govern, Identify, Protect, Detect, Respond e Recover. Govern foi enfatizada como função de governança, supervisão de riscos e responsabilidades. O framework descreve resultados, não uma lista única de ferramentas obrigatórias.

### Exemplo
Uma política de risco aprovada se relaciona à função Govern; inventário de ativos se alinha a Identify.

### Armadilha de prova
CSF 2.0 não é uma certificação automática, nem uma lei brasileira.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Qual função foi explicitamente incorporada ao núcleo do NIST CSF 2.0?

- A. Govern
- B. Encrypt
- C. Purchase
- D. Audit only

**Gabarito comentado:** A — Govern explicita governança no núcleo do CSF 2.0.

**Treino:** Em qual função do NIST CSF 2.0 se encaixa a gestão de inventário e identificação de ativos?

- A. Recover
- B. Respond
- C. Govern exclusivamente
- D. Identify

**Gabarito comentado:** D — Identify aborda entendimento de ativos e contexto de riscos.

---

## OWASP Top 10 e aplicações

**Objetivo:** Explicar e aplicar: OWASP Top 10 e aplicações.

### Conceito e teoria
Segurança de aplicações envolve controles no projeto, na implementação e na operação. Controle de acesso quebrado permite agir fora das permissões; injection ocorre quando dados não confiáveis interferem na interpretação de comandos ou consultas. Parametrização previne classes importantes de SQL Injection.

### Exemplo
Em vez de montar SELECT concatenando texto de formulário, utilize parâmetros vinculados pelo driver do banco.

### Armadilha de prova
Validar entrada só no navegador não dispensa validação e autorização no servidor.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Qual técnica é prioritária para reduzir risco de SQL Injection?

- A. Consultas parametrizadas
- B. Concatenar entrada diretamente no SQL
- C. Ocultar o campo HTML
- D. Aumentar tamanho da senha do banco apenas

**Gabarito comentado:** A — Parâmetros evitam interpretar valores externos como parte da sintaxe SQL.

**Treino:** Qual falha permite que usuário comum acesse recurso restrito a administradores?

- A. Controle de acesso quebrado
- B. Erro de resolução de nomes
- C. Fragmentação IPv4
- D. Alta latência DNS

**Gabarito comentado:** A — A autorização incorreta é uma falha de controle de acesso.
