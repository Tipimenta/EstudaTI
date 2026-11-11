import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { api, fmtDate, fmtMinutes, go, pct, plural, setToken, STATUS_LABEL, useApi } from '../lib'
import { Empty, ErrorBox, Icon, Meter, PageLoading, Spinner, useToast } from '../components/ui'
import type { Me } from '../App'

// ---------------------------------------------------------------------------
// Entrar / criar conta
// ---------------------------------------------------------------------------
export function AuthPage({ onLogin, config }: { onLogin: () => void; config: { has_users: boolean; signup: boolean } | null }) {
  const [mode, setMode] = useState<'login' | 'signup'>(config && !config.has_users ? 'signup' : 'login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  useEffect(() => { if (config && !config.has_users) setMode('signup') }, [config])

  async function submit(e: FormEvent) {
    e.preventDefault()
    setBusy(true); setError('')
    try {
      const r = await api<{ token: string }>(mode === 'login' ? '/auth/login' : '/auth/register', { body: form })
      setToken(r.token)
      onLogin()
    } catch (err) { setError((err as Error).message) } finally { setBusy(false) }
  }
  const first = config && !config.has_users
  return (
    <div className="auth">
      <section className="auth-art">
        <div className="brand" style={{ color: '#fff', padding: 0 }}><span className="brand-mark" style={{ borderColor: '#fff' }} />Estuda</div>
        <div>
          <h1>Do edital à aprovação, um dia de cada vez.</h1>
          <p style={{ marginTop: 16, maxWidth: '44ch', opacity: .85, fontSize: '1.05rem' }}>
            Escolha o concurso e receba a trilha pronta: aulas, questões, flashcards e simulados com provas anteriores.
          </p>
          <div className="sheet-art" aria-hidden="true">
            {'f.m...f.f...m.f.f.....f.m.f'.split('').map((c, i) => <i key={i} className={c === '.' ? '' : c} />)}
          </div>
        </div>
        <p className="small" style={{ opacity: .7 }}>Seu progresso fica salvo na sua conta.</p>
      </section>
      <section className="auth-form">
        <form onSubmit={submit} className="stack">
          <h2>{first ? 'Crie a conta de administrador' : mode === 'login' ? 'Entrar' : 'Criar conta'}</h2>
          {first && <p className="muted small">É o primeiro acesso: esta conta poderá cadastrar concursos, importar editais e provas.</p>}
          {mode === 'signup' && (
            <label className="field"><span>Seu nome</span><input className="input" required autoComplete="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></label>
          )}
          <label className="field"><span>E-mail</span><input className="input" type="email" required autoComplete="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></label>
          <label className="field"><span>Senha</span><input className="input" type="password" required minLength={mode === 'signup' ? 8 : 1} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />{mode === 'signup' && <small>Pelo menos 8 caracteres.</small>}</label>
          {error && <ErrorBox message={error} />}
          <button className="btn btn-primary btn-lg btn-block" disabled={busy}>{busy ? 'Aguarde…' : mode === 'login' ? 'Entrar' : 'Criar conta'}</button>
          {!first && (config?.signup ?? true) && (
            <p className="small muted" style={{ textAlign: 'center' }}>
              {mode === 'login' ? 'Ainda não tem conta? ' : 'Já tem conta? '}
              <button type="button" className="link-btn" onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError('') }}>
                {mode === 'login' ? 'Criar conta' : 'Entrar'}
              </button>
            </p>
          )}
        </form>
      </section>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Escolher concurso e cargo
// ---------------------------------------------------------------------------
type Role = { id: number; name: string; level: string; exam_date: string | null; org: string; exam: string; banca: string; year: number | null; n_topics: number; n_lessons: number; subjects: string[]; description: string }

export function ChooseExam({ me, onDone }: { me: Me; onDone: () => void }) {
  const [q, setQ] = useState('')
  const [term, setTerm] = useState('')
  const { data, error, loading, reload } = useApi<{ roles: Role[] }>(`/catalog?q=${encodeURIComponent(term)}`)
  const [picked, setPicked] = useState<Role | null>(null)
  const [date, setDate] = useState('')
  const [minutes, setMinutes] = useState(90)
  const [busy, setBusy] = useState(false)
  const toast = useToast()
  useEffect(() => { const t = setTimeout(() => setTerm(q), 250); return () => clearTimeout(t) }, [q])

  async function confirm() {
    if (!picked) return
    setBusy(true)
    try {
      await api('/enrollments', { body: { role_id: picked.id, exam_date: date || null, minutes_per_day: minutes } })
      toast(`Trilha de ${picked.name} pronta.`)
      onDone()
      go('/hoje')
    } catch (e) { toast((e as Error).message, true) } finally { setBusy(false) }
  }

  if (picked) {
    return (
      <div className="page narrow stack-lg">
        <button className="btn btn-ghost btn-sm" onClick={() => setPicked(null)}><Icon name="back" /> Trocar cargo</button>
        <div>
          <p className="muted">{picked.org}{picked.banca ? `, banca ${picked.banca}` : ''}</p>
          <h1 style={{ marginTop: 6 }}>{picked.name}</h1>
        </div>
        <div className="panel pad-lg stack-lg">
          <label className="field"><span>Quando é a prova?</span>
            <input className="input" type="date" value={date} onChange={e => setDate(e.target.value)} style={{ maxWidth: 220 }} />
            <small>Se ainda não tem data, deixe em branco. Dá para mudar depois.</small>
          </label>
          <div className="field"><span>Quanto tempo por dia você consegue estudar?</span>
            <div className="seg" role="group" aria-label="Tempo por dia">
              {[30, 60, 90, 120, 180, 240].map(m => <button key={m} type="button" aria-pressed={minutes === m} onClick={() => setMinutes(m)}>{fmtMinutes(m)}</button>)}
            </div>
            <small>O plano do dia cabe nesse tempo.</small>
          </div>
          <div>
            <p className="small" style={{ fontWeight: 650, marginBottom: 8 }}>O que vai cair</p>
            <div className="row wrap" style={{ gap: 6 }}>{picked.subjects.map(s => <span key={s} className="chip">{s}</span>)}</div>
          </div>
          <button className="btn btn-primary btn-lg" onClick={confirm} disabled={busy}>{busy ? 'Montando sua trilha…' : 'Começar a estudar'}</button>
        </div>
      </div>
    )
  }

  return (
    <div className="page narrow">
      <div className="page-head">
        <div>
          <h1>{me.enrollments.length ? 'Trocar de concurso' : 'Para qual concurso você estuda?'}</h1>
          <p>Escolha o cargo e a plataforma monta a trilha com todas as matérias do edital.</p>
        </div>
      </div>
      <input className="input" placeholder="Busque por órgão, cargo ou banca" value={q} onChange={e => setQ(e.target.value)} aria-label="Buscar concurso" style={{ marginBottom: 16 }} />
      {error && <ErrorBox message={error} onRetry={reload} />}
      {loading && !data ? <div className="skeleton" style={{ height: 200 }} /> : (
        <div className="panel">
          {data?.roles.length ? data.roles.map(r => {
            const coverage = r.n_topics ? r.n_lessons / r.n_topics : 0
            const mine = me.enrollments.find(e => e.role_id === r.id)
            return (
              <button key={r.id} className="list-row" onClick={() => { setPicked(r); setDate(r.exam_date || mine?.exam_date || '') }}>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span className="muted small" style={{ display: 'block' }}>{r.org}{r.banca ? `, ${r.banca}` : ''}{r.year ? ` (${r.year})` : ''}</span>
                  <strong style={{ display: 'block', fontSize: '1.08rem' }}>{r.name}</strong>
                  <span className="tiny muted">{plural(r.subjects.length, 'matéria', 'matérias')}, {plural(r.n_topics, 'tópico', 'tópicos')}, {coverage >= .99 ? 'todas as aulas prontas' : `${pct(coverage)} das aulas prontas`}</span>
                </span>
                {mine && <span className="chip ink">Já inscrito</span>}
                <Icon name="chevron" size={20} />
              </button>
            )
          }) : <Empty title="Nenhum concurso encontrado">{me.user.is_admin ? 'Cadastre um concurso importando o edital.' : 'Peça ao administrador para cadastrar o seu concurso.'}</Empty>}
        </div>
      )}
      {me.user.is_admin && <p className="small" style={{ marginTop: 16 }}>Não achou? <a href="#/admin/edital">Importe o edital em PDF</a> e a IA monta a estrutura.</p>}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Hoje
// ---------------------------------------------------------------------------
type Task = { type: string; title: string; detail: string; minutes: number; topic_id?: number; count?: number; accuracy?: number | null }
type Plan = { tasks: Task[]; reviews: { total: number; questions: number; cards: number }; progress: number; counts: Record<string, number>; total_topics: number; streak: number; days_left: number | null; today: { minutes: number; items: number }; minutes_per_day: number; needs_onboarding?: boolean }

const TASK: Record<string, { kind: string; cta: string; href: (t: Task) => string }> = {
  revisao: { kind: 'Revisão', cta: 'Revisar agora', href: () => '/revisao' },
  reforco: { kind: 'Reforço', cta: 'Refazer questões', href: t => `/topico/${t.topic_id}?aba=questoes` },
  aula: { kind: 'Aula', cta: 'Começar a aula', href: t => `/topico/${t.topic_id}` },
  questoes: { kind: 'Questões', cta: 'Resolver questões', href: t => `/topico/${t.topic_id}?aba=questoes` },
  gerar: { kind: 'Aula nova', cta: 'Abrir tópico', href: t => `/topico/${t.topic_id}` },
  simulado: { kind: 'Simulado', cta: 'Escolher simulado', href: () => '/simulados' },
}

export function Today({ me }: { me: Me }) {
  const { data, error, loading, reload } = useApi<Plan>('/today')
  const trail = useApi<{ subjects: { topics: { id: number; status: string; name: string }[] }[] }>('/trail')
  if (loading && !data) return <PageLoading />
  if (error) return <div className="page"><ErrorBox message={error} onRetry={reload} /></div>
  if (!data) return null
  const [next, ...rest] = data.tasks
  const first = me.user.name.split(' ')[0]
  const goal = Math.min(1, data.today.minutes / (data.minutes_per_day || 90))
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>Bom estudo, {first}.</h1>
          <p>{data.days_left !== null && data.days_left >= 0 ? `Faltam ${plural(data.days_left, 'dia', 'dias')} para a prova. ` : ''}Seu plano de hoje cabe em {fmtMinutes(data.minutes_per_day)}.</p>
        </div>
      </div>
      <div className="grid-2">
        <div className="stack-lg">
          {next ? (
            <section className="next-task" aria-label="Próxima tarefa">
              <span className="task-kind">{TASK[next.type]?.kind}, cerca de {fmtMinutes(next.minutes)}</span>
              <h2>{next.title}</h2>
              <p className="muted">{next.detail}{next.type === 'reforco' && next.accuracy != null ? `: você está acertando ${pct(next.accuracy)}` : ''}</p>
              <a className="btn btn-primary btn-lg" style={{ marginTop: 20 }} href={`#${TASK[next.type]?.href(next)}`}>{TASK[next.type]?.cta}</a>
            </section>
          ) : (
            <section className="next-task"><h2>Tudo em dia.</h2><p className="muted">Você cumpriu o plano. Que tal um simulado ou questões extras?</p>
              <div className="row wrap" style={{ marginTop: 16 }}><a className="btn btn-primary" href="#/questoes">Resolver questões</a><a className="btn" href="#/simulados">Fazer simulado</a></div></section>
          )}
          {rest.length > 0 && (
            <section>
              <h3 style={{ marginBottom: 6 }}>Depois</h3>
              <ul className="task-list panel" style={{ padding: '0 16px' }}>
                {rest.map((t, i) => (
                  <li key={i}>
                    <a className="task-row" href={`#${TASK[t.type]?.href(t)}`}>
                      <span className="bubble">{i + 2}</span>
                      <span style={{ minWidth: 0 }}><span className="task-title" style={{ display: 'block' }}>{t.title}</span><span className="tiny muted">{TASK[t.type]?.kind}, {t.detail}</span></span>
                      <span className="task-min">{fmtMinutes(t.minutes)}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
        <aside className="stack">
          <div className="panel pad stack">
            <div className="row spread"><h3>Hoje</h3><span className="muted small">{fmtMinutes(data.today.minutes)} de {fmtMinutes(data.minutes_per_day)}</span></div>
            <Meter value={goal} tone={goal >= 1 ? 'ok' : undefined} />
            <div className="row spread small">
              <span><strong>{data.streak}</strong> <span className="muted">{data.streak === 1 ? 'dia seguido' : 'dias seguidos'}</span></span>
              <a href="#/revisao"><strong>{data.reviews.total}</strong> para revisar</a>
            </div>
          </div>
          <div className="panel pad stack">
            <div className="row spread"><h3>Seu edital</h3><span className="big-num" style={{ fontSize: '1.5rem' }}>{pct(data.progress)}</span></div>
            <div className="sheet" aria-label="Mapa dos tópicos">
              {trail.data?.subjects.flatMap(s => s.topics).map(t => <a key={t.id} className={`sheet-dot ${t.status}`} href={`#/topico/${t.id}`} title={`${t.name}: ${STATUS_LABEL[t.status]}`} />)}
            </div>
            <div className="legend"><span><i className="sheet-dot" /> {data.counts.novo} a estudar</span><span><i className="sheet-dot estudando" /> {data.counts.estudando} estudando</span><span><i className="sheet-dot dominado" /> {data.counts.dominado} dominados</span>{data.counts.reforco > 0 && <span><i className="sheet-dot reforco" /> {data.counts.reforco} reforço</span>}</div>
            <a className="small" href="#/trilha">Abrir a trilha completa</a>
          </div>
          {me.active && <p className="tiny muted" style={{ padding: '0 4px' }}>{me.active.role}, {me.active.org}{me.active.exam_date ? `. Prova em ${fmtDate(me.active.exam_date)}` : ''}. <a href="#/conta">Ajustar</a></p>}
        </aside>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Trilha
// ---------------------------------------------------------------------------
type TrailTopic = { id: number; name: string; status: string; accuracy: number | null; answered: number; has_lesson: number; n_questions: number; read: boolean }
type TrailSubject = { id: number; name: string; weight: number; progress: number; mastered: number; topics: TrailTopic[] }

export function Trail() {
  const { data, error, loading, reload } = useApi<{ subjects: TrailSubject[]; progress: number; counts: Record<string, number> }>('/trail')
  const [open, setOpen] = useState<Record<number, boolean>>({})
  const [filter, setFilter] = useState<'todos' | 'pendentes' | 'reforco'>('todos')
  const firstOpen = useMemo(() => data?.subjects.find(s => s.progress < 1)?.id, [data])
  if (loading && !data) return <PageLoading />
  if (error) return <div className="page"><ErrorBox message={error} onRetry={reload} /></div>
  if (!data) return null
  const isOpen = (id: number) => open[id] ?? id === firstOpen
  return (
    <div className="page">
      <div className="page-head">
        <div><h1>Trilha</h1><p>Todas as matérias do edital, na ordem em que vale a pena estudar.</p></div>
        <div className="seg" role="group" aria-label="Filtro">
          {([['todos', 'Tudo'], ['pendentes', 'A estudar'], ['reforco', 'Reforço']] as const).map(([v, l]) => <button key={v} aria-pressed={filter === v} onClick={() => setFilter(v)}>{l}</button>)}
        </div>
      </div>
      <div className="panel" style={{ overflow: 'hidden' }}>
        {data.subjects.map(s => {
          const topics = s.topics.filter(t => filter === 'todos' || (filter === 'pendentes' ? t.status !== 'dominado' : t.status === 'reforco'))
          if (filter !== 'todos' && !topics.length) return null
          return (
            <section key={s.id} className={`subject ${isOpen(s.id) ? 'open' : ''}`}>
              <button className="subject-head" onClick={() => setOpen({ ...open, [s.id]: !isOpen(s.id) })} aria-expanded={isOpen(s.id)}>
                <span className="chev"><Icon name="chevron" /></span>
                <h3>{s.name}</h3>
                <span className="tiny muted nowrap">{s.mastered}/{s.topics.length}</span>
                <span className="subject-meter"><Meter value={s.progress} /></span>
              </button>
              {isOpen(s.id) && topics.map(t => (
                <a key={t.id} className="topic-row" href={`#/topico/${t.id}`}>
                  <span className={`sheet-dot ${t.status}`} aria-hidden="true" />
                  <span className="name">{t.name}</span>
                  {!t.has_lesson && <span className="chip mark">Aula a gerar</span>}
                  {t.answered > 0 && <span className={`tiny nowrap ${t.status === 'reforco' ? '' : 'muted'}`} style={t.status === 'reforco' ? { color: 'var(--bad)' } : undefined}>{pct(t.accuracy)} em {t.answered}</span>}
                  <span className="sr">{STATUS_LABEL[t.status]}</span>
                </a>
              ))}
            </section>
          )
        })}
      </div>
    </div>
  )
}

export function Loading() { return <div className="page"><Spinner label="Carregando…" /></div> }
