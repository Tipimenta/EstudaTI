import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { api, fmtDate, fmtMinutes, go, pct, plural, setToken, useApi } from '../lib'
import { Empty, ErrorBox, Icon, Markdown, Meter, PageLoading, Spinner, useToast } from '../components/ui'
import { Options, QuestionMeta, type Question } from '../components/Practice'
import type { Me } from '../App'

type PriorExam = { id: number; title: string; banca: string; year: number | null; duration_min: number; n_questions: number; role: string | null; org: string | null; mine?: boolean; overlap?: number; style: string }
type Result = { total: number; correct: number; wrong: number; blank: number; net: number; percent: number; minutes: number; subjects: { name: string; total: number; correct: number; wrong: number; blank: number; percent: number }[] }
type AttemptRow = { id: number; title: string; started_at: string; finished_at: string | null; duration_min: number; result: Result | null }

// ---------------------------------------------------------------------------
// Lista de simulados
// ---------------------------------------------------------------------------
export function Simulados({ me }: { me: Me }) {
  const { data, error, loading, reload } = useApi<{ exams: PriorExam[]; attempts: AttemptRow[] }>('/simulados')
  const [n, setN] = useState(40)
  const [busy, setBusy] = useState(false)
  const toast = useToast()
  async function start(body: object) {
    setBusy(true)
    try { const r = await api<{ id: number }>('/simulados/start', { body }); go(`/simulado/${r.id}`) }
    catch (e) { toast((e as Error).message, true) } finally { setBusy(false) }
  }
  if (loading && !data) return <PageLoading />
  if (error) return <div className="page"><ErrorBox message={error} onRetry={reload} /></div>
  if (!data) return null
  const open = data.attempts.filter(a => !a.finished_at)
  const done = data.attempts.filter(a => a.finished_at)
  return (
    <div className="page">
      <div className="page-head"><div><h1>Simulados</h1><p>Treine no ritmo da prova: tempo cronometrado, cartão-resposta e nota por matéria.</p></div></div>
      {open.length > 0 && (
        <div className="notice row spread wrap" style={{ marginBottom: 20 }}>
          <span>Você tem {plural(open.length, 'simulado em andamento', 'simulados em andamento')}.</span>
          <a className="btn btn-sm" href={`#/simulado/${open[0].id}`}>Continuar</a>
        </div>
      )}
      <div className="grid-2">
        <div className="stack-lg">
          <section className="panel pad-lg stack">
            <h2>Simulado do seu edital</h2>
            <p className="muted">Questões sorteadas com o peso de cada matéria de {me.active?.role || 'seu cargo'}, priorizando as que você ainda não fez.</p>
            <div className="seg" role="group" aria-label="Número de questões">{[20, 40, 60, 80, 100].map(v => <button key={v} aria-pressed={n === v} onClick={() => setN(v)}>{v}</button>)}</div>
            <p className="tiny muted">Tempo: {fmtMinutes(Math.round(n * (me.active?.question_style === 'certo_errado' ? 2 : 3)))}</p>
            <button className="btn btn-primary btn-lg" disabled={busy || !me.active} onClick={() => start({ n })}>Começar simulado</button>
          </section>
          <section>
            <h2 style={{ marginBottom: 12 }}>Provas anteriores</h2>
            <div className="panel">
              {data.exams.length ? data.exams.map(p => (
                <div key={p.id} className="list-row">
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <strong style={{ display: 'block' }}>{p.title}</strong>
                    <span className="tiny muted">{[p.banca, p.year, plural(p.n_questions, 'questão', 'questões'), fmtMinutes(p.duration_min)].filter(Boolean).join(', ')}</span>
                  </span>
                  {p.mine ? <span className="chip ink">Seu cargo</span> : p.overlap ? <span className="chip">{pct(p.overlap)} do seu edital</span> : null}
                  <button className="btn btn-sm" disabled={busy} onClick={() => start({ prior_exam_id: p.id })}>Fazer</button>
                </div>
              )) : <Empty title="Nenhuma prova anterior ainda">{me.user.is_admin ? <>Importe o PDF da prova e do gabarito em <a href="#/admin/prova">Importar prova</a> e ela vira simulado digital.</> : 'Quando o administrador importar provas anteriores, elas aparecem aqui.'}</Empty>}
            </div>
          </section>
        </div>
        <aside>
          <h3 style={{ marginBottom: 12 }}>Seu histórico</h3>
          <div className="panel">
            {done.length ? done.map(a => (
              <a key={a.id} className="list-row" href={`#/simulado/${a.id}`}>
                <span style={{ flex: 1, minWidth: 0 }}><span className="small" style={{ display: 'block', fontWeight: 650 }}>{a.title}</span><span className="tiny muted">{fmtDate(a.finished_at)}</span></span>
                <strong>{pct(a.result?.percent)}</strong>
              </a>
            )) : <p className="pad muted small">Seus resultados aparecem aqui.</p>}
          </div>
        </aside>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Fazer o simulado (modo prova) e ver o resultado
// ---------------------------------------------------------------------------
type Attempt = { id: number; title: string; style: string; questions: (Question & { answer?: string; explanation?: string; rationales?: string[] })[]; responses: Record<string, string>; duration_min: number; started_at: string; finished_at: string | null; remaining_seconds: number; result: Result | null }

export function ExamRun({ id }: { id: number }) {
  const { data, error, loading, reload } = useApi<Attempt>(`/attempts/${id}`)
  if (loading && !data) return <PageLoading />
  if (error) return <div className="page"><ErrorBox message={error} onRetry={reload} /></div>
  if (!data) return null
  return data.finished_at ? <ExamResult at={data} /> : <ExamLive at={data} onFinish={reload} />
}

function ExamLive({ at, onFinish }: { at: Attempt; onFinish: () => void }) {
  const [resp, setResp] = useState<Record<string, string>>(at.responses || {})
  const [i, setI] = useState(() => Math.max(0, at.questions.findIndex(q => !at.responses?.[q.id])))
  const [left, setLeft] = useState(at.remaining_seconds)
  const [confirm, setConfirm] = useState(false)
  const [busy, setBusy] = useState(false)
  const toast = useToast()
  const saveTimer = useRef<number | undefined>(undefined)
  const q = at.questions[i]
  const answered = Object.keys(resp).length

  const finish = useCallback(async (auto = false) => {
    setBusy(true)
    try {
      await api(`/attempts/${at.id}/finish`, { body: { responses: resp } })
      toast(auto ? 'Tempo esgotado. Simulado entregue.' : 'Simulado entregue.')
      onFinish()
    } catch (e) { toast((e as Error).message, true); setBusy(false) }
  }, [at.id, resp, onFinish, toast])

  useEffect(() => {
    const t = window.setInterval(() => setLeft(s => s - 1), 1000)
    return () => window.clearInterval(t)
  }, [])
  useEffect(() => { if (left <= 0 && !busy) finish(true) }, [left]) // eslint-disable-line react-hooks/exhaustive-deps

  function choose(letter: string) {
    const next = { ...resp }
    if (letter) next[q.id] = letter; else delete next[q.id]
    setResp(next)
    window.clearTimeout(saveTimer.current)
    saveTimer.current = window.setTimeout(() => { api(`/attempts/${at.id}`, { method: 'PATCH', body: { responses: next } }).catch(() => {}) }, 600)
  }
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (confirm) return
      if (e.key === 'ArrowRight' && i < at.questions.length - 1) setI(i + 1)
      if (e.key === 'ArrowLeft' && i > 0) setI(i - 1)
      const key = e.key.toUpperCase()
      const allowed = q.kind === 'certo_errado' ? ['C', 'E'] : ['A', 'B', 'C', 'D', 'E'].slice(0, q.options.length)
      if (allowed.includes(key)) choose(resp[q.id] === key ? '' : key)
    }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  })

  const mm = Math.max(0, Math.floor(left / 60)), ss = Math.max(0, left % 60)
  const clock = `${mm >= 60 ? `${Math.floor(mm / 60)}:${String(mm % 60).padStart(2, '0')}` : mm}:${String(ss).padStart(2, '0')}`
  return (
    <div className="page">
      <div className="exam-bar">
        <span className={`timer ${left < 300 ? 'low' : ''}`} aria-label="Tempo restante">{clock}</span>
        <span className="muted small" style={{ flex: 1 }}>{answered} de {at.questions.length} respondidas</span>
        <button className="btn btn-primary btn-sm" onClick={() => setConfirm(true)} disabled={busy}>Entregar</button>
      </div>
      <div className="grid-2">
        <div className="panel pad-lg">
          <p className="tiny muted" style={{ marginBottom: 8 }}>Questão {i + 1} de {at.questions.length}</p>
          <QuestionMeta q={q} />
          <p className="q-statement">{q.statement}</p>
          <Options q={q} chosen={resp[q.id] || ''} onChoose={choose} />
          <div className="row spread" style={{ marginTop: 18 }}>
            <button className="btn" disabled={i === 0} onClick={() => setI(i - 1)}><Icon name="back" /> Anterior</button>
            {i < at.questions.length - 1 ? <button className="btn btn-primary" onClick={() => setI(i + 1)}>Próxima <Icon name="chevron" /></button>
              : <button className="btn btn-primary" onClick={() => setConfirm(true)}>Entregar</button>}
          </div>
        </div>
        <aside className="panel pad stack">
          <h3>Cartão-resposta</h3>
          <div className="answer-sheet">
            {at.questions.map((x, k) => (
              <button key={x.id} className={`${resp[x.id] ? 'filled' : ''} ${k === i ? 'current' : ''}`} onClick={() => setI(k)} aria-label={`Questão ${k + 1}${resp[x.id] ? `, marcada ${resp[x.id]}` : ''}`}>
                {resp[x.id] || k + 1}
              </button>
            ))}
          </div>
          <p className="tiny muted">Suas marcações são salvas sozinhas. Pode fechar e voltar depois; o tempo continua correndo.</p>
        </aside>
      </div>
      {confirm && (
        <div className="drawer-back" style={{ display: 'grid', placeItems: 'center', padding: 16 }} onClick={() => setConfirm(false)}>
          <div className="panel pad-lg stack" style={{ maxWidth: 420 }} onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
            <h2>Entregar o simulado?</h2>
            <p className="muted">{at.questions.length - answered > 0 ? `Ainda há ${plural(at.questions.length - answered, 'questão em branco', 'questões em branco')}.` : 'Todas as questões foram marcadas.'} Depois de entregar não dá para mudar as respostas.</p>
            <div className="row" style={{ justifyContent: 'flex-end' }}>
              <button className="btn" onClick={() => setConfirm(false)}>Continuar fazendo</button>
              <button className="btn btn-primary" disabled={busy} onClick={() => finish()}>{busy ? 'Corrigindo…' : 'Entregar'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ExamResult({ at }: { at: Attempt }) {
  const r = at.result!
  const [filter, setFilter] = useState<'todas' | 'erradas'>('erradas')
  const [i, setI] = useState(0)
  const list = useMemo(() => at.questions.filter(q => filter === 'todas' || at.responses[q.id] !== q.answer), [at, filter])
  const q = list[Math.min(i, list.length - 1)]
  return (
    <div className="page">
      <div className="page-head">
        <div><p className="muted">{at.title}</p><h1 style={{ marginTop: 4 }}>{pct(r.percent)} de aproveitamento</h1>
          <p>{r.correct} certas, {r.wrong} erradas, {r.blank} em branco{at.style === 'certo_errado' ? `. Nota líquida (certas menos erradas): ${r.net}` : ''}. Tempo: {fmtMinutes(r.minutes)}.</p></div>
        <a className="btn" href="#/simulados">Voltar aos simulados</a>
      </div>
      <div className="grid-2">
        <div className="stack-lg">
          <section className="panel pad-lg">
            <div className="row spread wrap" style={{ marginBottom: 16 }}>
              <h2>Correção</h2>
              <div className="seg" role="group" aria-label="Filtro">{([['erradas', 'Erradas e em branco'], ['todas', 'Todas']] as const).map(([v, l]) => <button key={v} aria-pressed={filter === v} onClick={() => { setFilter(v); setI(0) }}>{l}</button>)}</div>
            </div>
            {q ? (
              <>
                <p className="tiny muted" style={{ marginBottom: 8 }}>Questão {at.questions.indexOf(q) + 1}</p>
                <QuestionMeta q={q} />
                <p className="q-statement">{q.statement}</p>
                <Options q={q} chosen={at.responses[q.id] || ''} reveal={{ answer: q.answer || '', rationales: q.rationales }} />
                {!at.responses[q.id] && <p className="small muted" style={{ marginTop: 8 }}>Você deixou em branco.</p>}
                {q.explanation && <div className="feedback"><Markdown text={q.explanation} className="small" /></div>}
                <div className="row spread" style={{ marginTop: 16 }}>
                  <button className="btn" disabled={i === 0} onClick={() => setI(i - 1)}><Icon name="back" /> Anterior</button>
                  <span className="tiny muted">{i + 1} de {list.length}</span>
                  <button className="btn" disabled={i >= list.length - 1} onClick={() => setI(i + 1)}>Próxima <Icon name="chevron" /></button>
                </div>
              </>
            ) : <Empty title="Nenhum erro">Você acertou todas.</Empty>}
          </section>
        </div>
        <aside className="panel pad stack">
          <h3>Por matéria</h3>
          {r.subjects.map(s => (
            <div key={s.name} className="stack" style={{ gap: 4 }}>
              <div className="row spread small"><span>{s.name}</span><strong>{s.correct}/{s.total}</strong></div>
              <Meter value={s.percent} tone={s.percent >= .7 ? 'ok' : s.percent < .5 ? 'bad' : undefined} />
            </div>
          ))}
          <div className="answer-sheet" style={{ marginTop: 12 }}>
            {at.questions.map((x, k) => {
              const ch = at.responses[x.id]
              const cls = !ch ? '' : ch === x.answer || x.answer === 'X' ? 'ok' : 'bad'
              return <button key={x.id} className={cls} onClick={() => { setFilter('todas'); setI(k) }} aria-label={`Questão ${k + 1}`}>{k + 1}</button>
            })}
          </div>
        </aside>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Desempenho
// ---------------------------------------------------------------------------
type Stats = { answered: number; accuracy: number | null; total_answers: number; minutes: number; streak: number; progress: number; counts: Record<string, number> | null
  by_subject: { id: number; name: string; weight: number; answered: number; correct: number; accuracy: number | null }[]
  days: { day: string; minutes: number; items: number }[]; attempts: { id: number; title: string; finished_at: string; result: Result }[] }

export function StatsPage() {
  const { data, error, loading, reload } = useApi<Stats>('/stats')
  if (loading && !data) return <PageLoading />
  if (error) return <div className="page"><ErrorBox message={error} onRetry={reload} /></div>
  if (!data) return null
  const maxMin = Math.max(30, ...data.days.map(d => d.minutes))
  const weak = data.by_subject.filter(s => s.answered >= 5).sort((a, b) => (a.accuracy ?? 1) - (b.accuracy ?? 1))[0]
  return (
    <div className="page">
      <div className="page-head"><div><h1>Desempenho</h1><p>Onde você está forte e onde vale investir tempo.</p></div></div>
      <div className="row wrap" style={{ gap: 32, marginBottom: 28 }}>
        {[['Edital dominado', pct(data.progress)], ['Acerto atual', pct(data.accuracy)], ['Questões feitas', String(data.answered)], ['Tempo de estudo', fmtMinutes(data.minutes)], ['Dias seguidos', String(data.streak)]].map(([l, v]) => (
          <div key={l}><div className="big-num">{v}</div><div className="small muted">{l}</div></div>
        ))}
      </div>
      {weak && weak.accuracy !== null && weak.accuracy < .7 && (
        <div className="notice" style={{ marginBottom: 24 }}>Seu ponto mais fraco agora é <strong>{weak.name}</strong> ({pct(weak.accuracy)} de acerto). <a href="#/questoes">Treinar questões</a></div>
      )}
      <div className="grid-2">
        <section className="panel pad-lg stack">
          <h2>Por matéria</h2>
          <p className="tiny muted">Acerto considera a última resposta de cada questão.</p>
          {data.by_subject.map(s => (
            <div key={s.id} className="stack" style={{ gap: 4 }}>
              <div className="row spread small"><span>{s.name}</span><span>{s.answered ? <><strong>{pct(s.accuracy)}</strong> <span className="muted">em {s.answered}</span></> : <span className="muted">sem questões ainda</span>}</span></div>
              <Meter value={s.accuracy ?? 0} tone={s.accuracy === null ? undefined : s.accuracy >= .7 ? 'ok' : s.accuracy < .5 ? 'bad' : undefined} />
            </div>
          ))}
        </section>
        <aside className="stack-lg">
          <section className="panel pad stack">
            <h3>Últimas 4 semanas</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(28, 1fr)', alignItems: 'end', gap: 3, height: 90 }} aria-label="Minutos estudados por dia">
              {data.days.map(d => <div key={d.day} title={`${fmtDate(d.day)}: ${fmtMinutes(d.minutes)}`} style={{ height: `${Math.max(4, (d.minutes / maxMin) * 100)}%`, background: d.minutes ? 'var(--ink)' : 'var(--sunken)', borderRadius: 3 }} />)}
            </div>
            <div className="row spread tiny muted"><span>{fmtDate(data.days[0]?.day)}</span><span>hoje</span></div>
          </section>
          <section className="panel pad stack">
            <h3>Simulados</h3>
            {data.attempts.length ? data.attempts.map(a => (
              <a key={a.id} href={`#/simulado/${a.id}`} className="row spread small" style={{ textDecoration: 'none', color: 'inherit' }}>
                <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{fmtDate(a.finished_at)}</span>
                <span style={{ flex: 1, margin: '0 10px' }}><Meter value={a.result.percent} /></span><strong>{pct(a.result.percent)}</strong>
              </a>
            )) : <p className="small muted">Faça um simulado para acompanhar sua evolução.</p>}
          </section>
        </aside>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Discursivas
// ---------------------------------------------------------------------------
export function Discursivas() {
  const { data, error, loading, reload } = useApi<{ items: { id: number; title: string; subject: string; mine: boolean; attempts: number }[]; ai: boolean }>('/discursivas')
  if (loading && !data) return <PageLoading />
  if (error) return <div className="page"><ErrorBox message={error} onRetry={reload} /></div>
  if (!data) return null
  return (
    <div className="page narrow">
      <div className="page-head"><div><h1>Discursivas</h1><p>Escreva como na prova{data.ai ? ' e receba correção por critério, de conteúdo e de linguagem.' : ' e compare com o padrão de resposta.'}</p></div></div>
      <div className="panel">
        {data.items.length ? data.items.map(d => (
          <a key={d.id} className="list-row" href={`#/discursiva/${d.id}`}>
            <span style={{ flex: 1, minWidth: 0 }}><span className="tiny muted" style={{ display: 'block' }}>{d.subject}</span><strong>{d.title}</strong></span>
            {d.attempts > 0 && <span className="chip ok">{plural(d.attempts, 'tentativa', 'tentativas')}</span>}
            <Icon name="chevron" size={20} />
          </a>
        )) : <Empty title="Nenhuma discursiva cadastrada" />}
      </div>
    </div>
  )
}

type Feedback = { score: number; content: string; language: string; criteria: { name: string; score: number; comment: string }[]; rewrite_tips: string[] }

export function DiscursivaPage({ id }: { id: number }) {
  const { data, error, loading, reload } = useApi<{ id: number; title: string; subject: string; prompt: string; model_answer: string; rubric: unknown[]; max_lines: number; ai: boolean; history: { id: number; text: string; feedback: Feedback | null; score: number | null; created_at: string }[] }>(`/discursivas/${id}`)
  const [text, setText] = useState('')
  const [busy, setBusy] = useState(false)
  const [res, setRes] = useState<{ feedback: Feedback | null; model_answer: string } | null>(null)
  const toast = useToast()
  if (loading && !data) return <PageLoading />
  if (error) return <div className="page"><ErrorBox message={error} onRetry={reload} /></div>
  if (!data) return null
  const lines = Math.ceil(text.length / 75)
  async function send() {
    setBusy(true)
    try { const r = await api<{ feedback: Feedback | null; model_answer: string }>(`/discursivas/${id}/answer`, { body: { text } }); setRes(r); reload() }
    catch (e) { toast((e as Error).message, true) } finally { setBusy(false) }
  }
  return (
    <div className="page narrow stack-lg">
      <a href="#/discursivas" className="small">{data.subject}</a>
      <h1>{data.title}</h1>
      <div className="panel pad-lg"><Markdown text={data.prompt} /></div>
      {!res ? (
        <div className="stack">
          <textarea className="textarea" style={{ minHeight: 360, fontSize: '1.05rem' }} value={text} onChange={e => setText(e.target.value)} placeholder="Escreva sua resposta aqui, em texto corrido." aria-label="Sua resposta" />
          <div className="row spread wrap"><span className={`tiny ${lines > data.max_lines ? '' : 'muted'}`} style={lines > data.max_lines ? { color: 'var(--bad)' } : undefined}>Cerca de {lines} de {data.max_lines} linhas</span>
            <button className="btn btn-primary" disabled={busy || text.trim().length < 40} onClick={send}>{busy ? <Spinner label="Corrigindo…" /> : data.ai ? 'Enviar para correção' : 'Enviar e ver padrão de resposta'}</button></div>
        </div>
      ) : (
        <div className="stack-lg">
          {res.feedback && (
            <section className="panel pad-lg stack">
              <div className="row spread"><h2>Correção</h2><span className="big-num">{res.feedback.score}<span className="muted small">/10</span></span></div>
              <p><strong>Conteúdo.</strong> {res.feedback.content}</p>
              <p><strong>Linguagem.</strong> {res.feedback.language}</p>
              {res.feedback.criteria?.map(c => <div key={c.name} className="small"><strong>{c.name}: {c.score}</strong> <span className="muted">{c.comment}</span></div>)}
              {res.feedback.rewrite_tips?.length > 0 && <ul className="small">{res.feedback.rewrite_tips.map((t, k) => <li key={k}>{t}</li>)}</ul>}
              <p className="tiny muted">Nota orientativa feita por IA. A banca pode avaliar de outro jeito.</p>
            </section>
          )}
          {res.model_answer && <section className="panel pad-lg"><h2 style={{ marginBottom: 12 }}>Padrão de resposta</h2><Markdown text={res.model_answer} /></section>}
          <button className="btn" onClick={() => { setRes(null); setText('') }}>Escrever de novo</button>
        </div>
      )}
      {data.history.length > 0 && !res && <p className="tiny muted">Você já enviou {plural(data.history.length, 'resposta', 'respostas')}. Última nota: {data.history[0].score ?? 'sem nota'}.</p>}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Conta e concurso
// ---------------------------------------------------------------------------
export function Account({ me, onChange }: { me: Me; onChange: () => void }) {
  const toast = useToast()
  const a = me.active
  const [date, setDate] = useState(a?.exam_date || '')
  const [minutes, setMinutes] = useState(a?.minutes_per_day || 90)
  const [theme, setTheme] = useState(() => { try { return localStorage.getItem('estuda.theme') || 'auto' } catch { return 'auto' } })
  function applyTheme(t: string) {
    setTheme(t)
    try { localStorage.setItem('estuda.theme', t) } catch { /* */ }
    if (t === 'auto') document.documentElement.removeAttribute('data-theme'); else document.documentElement.setAttribute('data-theme', t)
  }
  async function save() {
    if (!a) return
    try { await api(`/enrollments/${a.id}`, { method: 'PATCH', body: { exam_date: date || null, minutes_per_day: minutes } }); toast('Plano atualizado.'); onChange() }
    catch (e) { toast((e as Error).message, true) }
  }
  async function activate(id: number) {
    try { await api(`/enrollments/${id}`, { method: 'PATCH', body: { active: true } }); toast('Concurso trocado.'); onChange(); go('/hoje') }
    catch (e) { toast((e as Error).message, true) }
  }
  return (
    <div className="page narrow stack-lg">
      <h1>Conta</h1>
      {a && (
        <section className="panel pad-lg stack-lg">
          <div><p className="muted small">Estudando para</p><h2>{a.role}</h2><p className="muted">{a.org}</p></div>
          <label className="field"><span>Data da prova</span><input className="input" type="date" value={date} onChange={e => setDate(e.target.value)} style={{ maxWidth: 220 }} /></label>
          <div className="field"><span>Tempo por dia</span>
            <div className="seg" role="group" aria-label="Tempo por dia">{[30, 60, 90, 120, 180, 240].map(m => <button key={m} aria-pressed={minutes === m} onClick={() => setMinutes(m)}>{fmtMinutes(m)}</button>)}</div>
          </div>
          <div className="row wrap"><button className="btn btn-primary" onClick={save}>Salvar plano</button><a className="btn" href="#/concurso">Trocar de concurso</a></div>
        </section>
      )}
      {me.enrollments.length > 1 && (
        <section className="panel">
          <h3 className="pad" style={{ paddingBottom: 0 }}>Seus concursos</h3>
          {me.enrollments.map(e => (
            <div key={e.id} className="list-row"><span style={{ flex: 1 }}><strong>{e.role}</strong><br /><span className="tiny muted">{e.org}</span></span>
              {e.active ? <span className="chip ink">Atual</span> : <button className="btn btn-sm" onClick={() => activate(e.id)}>Estudar este</button>}</div>
          ))}
        </section>
      )}
      <section className="panel pad-lg stack">
        <h3>Aparência</h3>
        <div className="seg" role="group" aria-label="Tema">{[['auto', 'Automático'], ['light', 'Claro'], ['dark', 'Escuro']].map(([v, l]) => <button key={v} aria-pressed={theme === v} onClick={() => applyTheme(v)}>{l}</button>)}</div>
      </section>
      <section className="row spread wrap">
        <span className="muted small">{me.user.name}, {me.user.email}</span>
        <button className="btn btn-danger" onClick={() => { setToken(''); window.location.hash = '/'; window.location.reload() }}>Sair</button>
      </section>
    </div>
  )
}
