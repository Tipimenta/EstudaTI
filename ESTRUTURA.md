# Estrutura atual do EstudaTI V1.2

```text
EstudaTI/
├── COMECE_AQUI.md                 # Orientações principais
├── COMECE_AQUI_V12.md             # Atualização da versão anterior
├── compose.yaml                   # Docker Compose: web + api + volume persistente
├── .env.example                   # Modelo de configurações (nunca é a senha real)
├── INSTALAR_E_ABRIR_WINDOWS.bat   # Primeira instalação
├── BACKUP_DADOS_WINDOWS.bat       # Backup antes de migrar
├── ATUALIZAR_ESTUDATI_WINDOWS.bat # Backup e reconstrução sem -v
├── web/
│   ├── package.json              # React 19, TypeScript, Vite, Tailwind 4
│   ├── Dockerfile
│   ├── nginx.conf
│   └── src/
│       ├── App.tsx                # Navegação, dashboard e relógio global
│       ├── StudyCourse.tsx        # Cursos, oficinas, prática e notas
│       ├── DiscursivePage.tsx     # Produção escrita com correção assistida
│       ├── QuestionBank.tsx       # Banco de questões
│       ├── StudyLibrary.tsx       # Biblioteca e materiais
│       └── ...                    # Demais módulos
├── api/
│   ├── main.py                    # Endpoints, dados e migrações
│   ├── pedagogical_workshops.py   # 18 oficinas e 36 questões autorais (V1.2)
│   ├── deep_course.json          # Aprofundamentos originais
│   ├── expert_seed.py            # Aulas adicionais anteriores
│   ├── discursive_api.py         # Avaliação escrita com IA opcional
│   └── ...
├── materials/                     # Apostilas e catálogos
├── docs/
│   ├── REVISAO_PEDAGOGICA_V12.md # Matriz editorial e limitações
│   └── ...
├── tools/                         # Ferramentas auxiliares
└── tests/                         # Testes de API, migração, regressão e oficinas
```

O projeto do Docker mantém o banco em um volume nomeado. Substituir apenas arquivos de código **não** deve apagar o volume. Nunca execute `docker compose down -v` em uma instalação com dados de estudo.
