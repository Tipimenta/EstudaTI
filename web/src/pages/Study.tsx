import { useEffect, useRef, useState } from 'react'
import { api, go, pct, plural, queryParam, STATUS_LABEL, useApi } from '../lib'
import { Drawer, Empty, ErrorBox, Icon, Markdown, PageLoading, Spinner, useToast } from '../components/ui'
import { FlashcardSession, PracticeSession, QuestionCard, type Card, type Question } from '../components/Practice'

type TopicData = {
  id: number; name: string; subject: string; subject_id: number; done: boolean; notes: string; ai: boolean
  lesson: { body: string; summary: string; minutes: number; origin: string; editorial_revision?: string } | null
  stats: { status: string; accuracy: number | null; answered: number }
  n_questions: number; n_cards: number
  nav: { prev: { id: number; name: string } | null; next: { id: number; name: string } | null; index?: number; total?: number }
}

// ---------------------------------------------------------------------------
// Tópico: aula, questões, flashcards e anotações
// ---------------------------------------------------------------------------
export function TopicPage({ id }: { id: number }) {
  const { data, error, loading, reload } = useApi<TopicData>(`/topics/${id}`)
  const [tab, setTab] = useState(queryParam('aba') || 'aula')
  const [tutor, setTutor] = useState(false)
  const [progress, setProgress] = useState(0)
  useEffect(() => { setTab(queryParam('aba') || 'aula') }, [id])
  useEffect(() => {
    if (tab !== 'aula') return
    const on = () => {
      const h = document.documentElement
      setProgress(Math.min(1, h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)))
    }
    window.addEventListener('scroll', on, { passive: true })
    on()
    return () => window.removeEventListener('scroll', on)
  }, [tab, data])

  if (loading && !data) return <PageLoading />
  if (error) return <div className="page"><ErrorBox message={error} onRetry={reload} /></div>
  if (!data) return null
  const tabs: [string, string][] = [['aula', 'Aula'], ['questoes', `Questões${data.n_questions ? ` (${data.n_questions})` : ''}`], ['flashcards', `Flashcards${data.n_cards ? ` (${data.n_cards})` : ''}`], ['notas', 'Anotações']]
  return (
    <div className="page narrow">
      {tab === 'aula' && data.lesson && <div className="reading-progress" style={{ width: `${progress * 100}%` }} />}
      <a href="#/trilha" className="small" style={{ textDecoration: 'none' }}>{data.subject}{data.nav.index ? `, tópico ${data.nav.index} de ${data.nav.total}` : ''}</a>
      <h1 style={{ marginTop: 6 }}>{data.name}</h1>
      <div className="row wrap" style={{ marginTop: 10, gap: 8 }}>
        <span className={`chip ${data.stats.status === 'dominado' ? 'ok' : data.stats.status === 'reforco' ? 'bad' : data.stats.status === 'estudando' ? 'ink' : ''}`}>{STATUS_LABEL[data.stats.status]}</span>
        {data.stats.answered > 0 && <span className="chip">{pct(data.stats.accuracy)} de acerto em {data.stats.answered}</span>}
        {data.lesson?.origin === 'ia' && <span className="chip mark">Aula gerada por IA</span>}
        {data.lesson?.editorial_revision && <span className="chip ok" title="Explicação específica acrescentada sem alterar seu progresso">Aprofundamento 2.2</span>}
        {data.ai && data.lesson && <button className="btn btn-sm" style={{ marginLeft: 'auto' }} onClick={() => setTutor(true)}><Icon name="chat" /> Tirar dúvida</button>}
      </div>
      {data.stats.status === 'reforco' && (
        <div className="notice bad" style={{ marginTop: 16, marginBottom: 12 }}>
          <strong>Este assunto pede reforço.</strong> Seu histórico de questões indica dificuldade.
          Releia o mecanismo passo a passo e depois refaça questões diferentes para comprovar compreensão.
          <div className="row wrap" style={{ marginTop: 10 }}>
            <button className="btn btn-sm" onClick={() => setTab('aula')}>Reestudar a aula</button>
            <button className="btn btn-sm" onClick={() => setTab('questoes')}>Praticar novamente</button>
          </div>
        </div>
      )}
      <div className="topic-tabs" role="tablist">
        {tabs.map(([k, l]) => <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)}>{l}</button>)}
      </div>

      {tab === 'aula' && (data.lesson ? (
        <>
          {data.lesson.summary && !data.lesson.body.slice(0, 600).includes(data.lesson.summary.slice(0, 60)) && <p className="notice" style={{ marginBottom: 28 }}>{data.lesson.summary}</p>}
          <Markdown text={data.lesson.body} />
          <hr className="divider" />
          <div className="row wrap spread">
            {data.done ? <span className="chip ok"><Icon name="check" size={14} /> Aula concluída</span> : <span className="muted small">Terminou? Marque e vá para a prática.</span>}
            <DoneButton topic={data} onDone={() => { reload(); setTab('questoes'); window.scrollTo({ top: 0 }) }} />
          </div>
        </>
      ) : <GeneratePanel topic={data} onDone={reload} />)}

      {tab === 'questoes' && (data.n_questions ? (
        <PracticeSession key={`q${id}`} aiEnabled={data.ai} load={() => api(`/practice?topic_id=${id}&limit=10`)}
          onExit={() => setTab('aula')} />
      ) : <GeneratePanel topic={data} onDone={reload} only="questions" />)}

      {tab === 'flashcards' && (data.n_cards ? <TopicCards id={id} /> : <GeneratePanel topic={data} onDone={reload} only="flashcards" />)}

      {tab === 'notas' && <Notes topic={data} />}

      <hr className="divider" />
      <nav className="row spread wrap" aria-label="Navegação entre tópicos">
        {data.nav.prev ? <a className="btn btn-ghost" href={`#/topico/${data.nav.prev.id}`}><Icon name="back" /> Anterior</a> : <span />}
        {data.nav.next && <a className="btn" href={`#/topico/${data.nav.next.id}`}>{data.nav.next.name.length > 40 ? 'Próximo tópico' : data.nav.next.name} <Icon name="chevron" /></a>}
      </nav>
      {tutor && data.lesson && <Tutor topic={data} onClose={() => setTutor(false)} />}
    </div>
  )
}

function DoneButton({ topic, onDone }: { topic: TopicData; onDone: () => void }) {
  const [busy, setBusy] = useState(false)
  const toast = useToast()
  async function go_() {
    setBusy(true)
    try { await api(`/topics/${topic.id}/done`, { body: {} }); toast('Aula concluída. Hora de praticar.'); onDone() }
    catch (e) { toast((e as Error).message, true) } finally { setBusy(false) }
  }
  return <button className="btn btn-primary" onClick={go_} disabled={busy}>{topic.n_questions ? 'Concluir e praticar' : 'Concluir aula'}</button>
}

function GeneratePanel({ topic, onDone, only }: { topic: TopicData; onDone: () => void; only?: 'questions' | 'flashcards' }) {
  const [busy, setBusy] = useState('')
  const toast = useToast()
  const parts = only ? [only] : ['lesson', 'questions', 'flashcards']
  async function generate() {
    try {
      if (parts.includes('lesson')) { setBusy('Escrevendo a aula…'); await api(`/topics/${topic.id}/generate`, { body: { parts: ['lesson'] } }) }
      if (parts.includes('questions')) { setBusy('Criando questões no estilo da banca…'); await api(`/topics/${topic.id}/generate`, { body: { parts: ['questions'] } }) }
      if (parts.includes('flashcards')) { setBusy('Montando flashcards…'); await api(`/topics/${topic.id}/generate`, { body: { parts: ['flashcards'] } }) }
      toast('Conteúdo pronto.')
      onDone()
    } catch (e) { toast((e as Error).message, true) } finally { setBusy('') }
  }
  const what = only === 'questions' ? 'questões' : only === 'flashcards' ? 'flashcards' : 'a aula'
  if (!topic.ai) {
    return <div className="panel"><Empty title={`Ainda não há ${what} deste tópico`}>Quando a IA estiver configurada no servidor, o conteúdo é gerado aqui com um clique. Enquanto isso, o administrador pode escrever ou importar.</Empty></div>
  }
  return (
    <div className="panel pad-lg stack">
      <h2>{only ? `Este tópico ainda não tem ${what}` : 'Esta aula ainda não foi escrita'}</h2>
      <p className="muted">{only ? `A IA cria ${what} a partir da aula, no estilo da banca do seu concurso.` : 'A IA escreve uma aula didática deste tópico do edital, com exemplos, pegadinhas da banca, questões e flashcards. Leva cerca de um minuto.'}</p>
      {busy ? <Spinner label={busy} /> : <button className="btn btn-primary btn-lg" onClick={generate}><Icon name="spark" /> Gerar {only ? what : 'aula, questões e flashcards'}</button>}
      <p className="tiny muted">Conteúdo gerado por IA pode conter erros. Na dúvida, confira na lei ou no material oficial.</p>
    </div>
  )
}

function TopicCards({ id }: { id: number }) {
  const { data, error, reload } = useApi<{ cards: Card[] }>(`/topics/${id}/flashcards`)
  if (error) return <ErrorBox message={error} onRetry={reload} />
  if (!data) return <Spinner />
  return <FlashcardSession cards={data.cards} />
}

function Notes({ topic }: { topic: TopicData }) {
  const [text, setText] = useState(topic.notes)
  const [state, setState] = useState<'idle' | 'saving' | 'saved'>('idle')
  const timer = useRef<number | undefined>(undefined)
  function change(v: string) {
    setText(v); setState('saving')
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(async () => {
      try { await api(`/topics/${topic.id}/notes`, { body: { notes: v } }); setState('saved') } catch { setState('idle') }
    }, 700)
  }
  return (
    <div className="stack">
      <p className="muted small">Explique com suas palavras, anote dúvidas e o que errou. Salva sozinho.</p>
      <textarea className="textarea" style={{ minHeight: 320 }} value={text} onChange={e => change(e.target.value)} placeholder="O que é mais importante neste tópico?" aria-label="Anotações" />
      <p className="tiny muted">{state === 'saving' ? 'Salvando…' : state === 'saved' ? 'Salvo.' : ''}</p>
    </div>
  )
}

function Tutor({ topic, onClose }: { topic: TopicData; onClose: () => void }) {
  const [msgs, setMsgs] = useState<{ me: boolean; text: string }[]>([])
  const [q, setQ] = useState('')
  const [busy, setBusy] = useState(false)
  const end = useRef<HTMLDivElement>(null)
  useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, busy])
  async function send() {
    const text = q.trim()
    if (!text || busy) return
    setMsgs(m => [...m, { me: true, text }]); setQ(''); setBusy(true)
    try {
      const r = await api<{ answer: string }>('/tutor', { body: { topic_id: topic.id, question: text } })
      setMsgs(m => [...m, { me: false, text: r.answer }])
    } catch (e) { setMsgs(m => [...m, { me: false, text: (e as Error).message }]) } finally { setBusy(false) }
  }
  return (
    <Drawer title="Tirar dúvida" onClose={onClose} footer={
      <form className="row" onSubmit={e => { e.preventDefault(); send() }}>
        <input className="input" autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Ex.: qual a diferença entre dolo eventual e culpa consciente?" aria-label="Sua dúvida" />
        <button className="btn btn-primary" disabled={busy || !q.trim()}>Enviar</button>
      </form>}>
      <div className="stack">
        {!msgs.length && <p className="muted small">Pergunte qualquer coisa sobre <strong>{topic.name}</strong>. O professor responde com base na aula.</p>}
        {msgs.map((m, i) => <div key={i} className={`bubble-chat ${m.me ? 'me' : ''}`}>{m.me ? m.text : <Markdown text={m.text} className="lesson small" />}</div>)}
        {busy && <Spinner label="Pensando…" />}
        <div ref={end} />
      </div>
    </Drawer>
  )
}

// ---------------------------------------------------------------------------
// Banco de questões
// ---------------------------------------------------------------------------
type Filters = { subjects: { id: number; name: string; topics: { id: number; name: string }[] }[]; bancas: string[] }

export function QuestionsPage({ aiEnabled }: { aiEnabled: boolean }) {
  const { data: f } = useApi<Filters>('/filters')
  const [mode, setMode] = useState('inteligente')
  const [subject, setSubject] = useState('')
  const [topic, setTopic] = useState('')
  const [banca, setBanca] = useState('')
  const [origin, setOrigin] = useState('')
  const [n, setN] = useState(10)
  const [run, setRun] = useState(0)
  const topics = f?.subjects.find(s => String(s.id) === subject)?.topics || []
  const params = new URLSearchParams({ mode, limit: String(n) })
  if (topic) params.set('topic_id', topic)
  else if (subject) params.set('subject_id', subject)
  if (banca) params.set('banca', banca)
  if (origin) params.set('origin', origin)
  return (
    <div className="page narrow">
      <div className="page-head"><div><h1>Questões</h1><p>Monte uma lista e resolva com correção na hora.</p></div></div>
      {!run ? (
        <div className="panel pad-lg stack-lg">
          <div className="field"><span>Quais questões?</span>
            <div className="seg" role="group" aria-label="Modo">
              {[['inteligente', 'Prioridade'], ['novas', 'Inéditas'], ['erradas', 'Que errei'], ['todas', 'Qualquer']].map(([v, l]) => <button key={v} aria-pressed={mode === v} onClick={() => setMode(v)}>{l}</button>)}
            </div>
            <small>{mode === 'inteligente' ? 'Primeiro as que você nunca fez, depois as que errou.' : mode === 'erradas' ? 'Só as questões cuja última resposta foi errada.' : mode === 'novas' ? 'Só questões que você nunca respondeu.' : 'Sorteio entre todas.'}</small>
          </div>
          <div className="grid-2" style={{ gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <label className="field"><span>Matéria</span>
              <select className="select" value={subject} onChange={e => { setSubject(e.target.value); setTopic('') }}>
                <option value="">Todas do meu edital</option>
                {f?.subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </label>
            <label className="field"><span>Tópico</span>
              <select className="select" value={topic} onChange={e => setTopic(e.target.value)} disabled={!subject}>
                <option value="">Todos</option>
                {topics.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </label>
            <label className="field"><span>Banca</span>
              <select className="select" value={banca} onChange={e => setBanca(e.target.value)}>
                <option value="">Qualquer</option>
                {f?.bancas.map(b => <option key={b}>{b}</option>)}
              </select>
            </label>
            <label className="field"><span>Origem</span>
              <select className="select" value={origin} onChange={e => setOrigin(e.target.value)}>
                <option value="">Qualquer</option><option value="oficial">Provas oficiais</option><option value="autoral">Autorais</option><option value="ia">Geradas por IA</option>
              </select>
            </label>
          </div>
          <div className="field"><span>Quantidade</span>
            <div className="seg" role="group" aria-label="Quantidade">{[5, 10, 20, 30].map(v => <button key={v} aria-pressed={n === v} onClick={() => setN(v)}>{v}</button>)}</div>
          </div>
          <button className="btn btn-primary btn-lg" onClick={() => setRun(Date.now())}>Começar</button>
        </div>
      ) : (
        <PracticeSession key={run} aiEnabled={aiEnabled} load={() => api(`/practice?${params}`)} onExit={() => setRun(0)} />
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Revisão espaçada do dia
// ---------------------------------------------------------------------------
type ReviewItem = { type: 'q'; question: Question } | { type: 'f'; card: Card }

export function ReviewPage({ aiEnabled }: { aiEnabled: boolean }) {
  const { data, error, loading, reload } = useApi<{ items: ReviewItem[] }>('/review')
  const [i, setI] = useState(0)
  const [show, setShow] = useState(false)
  const [answered, setAnswered] = useState(false)
  const toast = useToast()
  if (loading && !data) return <PageLoading />
  if (error) return <div className="page"><ErrorBox message={error} onRetry={reload} /></div>
  const items = data?.items || []
  if (!items.length || i >= items.length) {
    return (
      <div className="page narrow">
        <div className="panel"><Empty title={items.length ? 'Revisão concluída' : 'Nada para revisar hoje'} action={<a className="btn btn-primary" href="#/hoje">Voltar para Hoje</a>}>
          {items.length ? `Você revisou ${plural(items.length, 'item', 'itens')}. Eles voltam na hora certa.` : 'Questões que você responde e aulas que conclui entram aqui nos dias certos para fixar o conteúdo.'}
        </Empty></div>
      </div>
    )
  }
  const it = items[i]
  const next = () => { setI(i + 1); setShow(false); setAnswered(false) }
  async function grade(g: number, id: number) {
    try { await api(`/flashcards/${id}/grade`, { body: { grade: g } }) } catch (e) { toast((e as Error).message, true) }
    next()
  }
  return (
    <div className="page narrow">
      <div className="page-head"><div><h1>Revisão</h1><p>{i + 1} de {items.length}</p></div></div>
      <div className="progress-steps">{items.map((_, k) => <i key={k} className={k < i ? 'ok' : k === i ? 'now' : ''} />)}</div>
      {it.type === 'q' ? (
        <div className="panel pad-lg">
          <QuestionCard q={it.question} aiEnabled={aiEnabled} context="revisao" onAnswered={() => setAnswered(true)} />
          {answered && <div className="row" style={{ justifyContent: 'flex-end', marginTop: 16 }}><button className="btn btn-primary" autoFocus onClick={next}>Continuar</button></div>}
        </div>
      ) : (
        <div className="stack">
          <div className="panel flash">
            {it.card.subject && <p className="tiny muted" style={{ marginBottom: 12 }}>{it.card.subject}</p>}
            <p className="front">{it.card.front}</p>
            {show && <p className="back">{it.card.back}</p>}
          </div>
          {!show ? <button className="btn btn-primary btn-lg btn-block" onClick={() => setShow(true)}>Mostrar resposta</button> : (
            <div className="grade-row">
              {[['Errei', 'amanhã'], ['Difícil', 'em breve'], ['Bom', 'alguns dias'], ['Fácil', 'mais tarde']].map(([l, s], g) =>
                <button key={g} className="btn" onClick={() => grade(g, it.card.id)}>{l}<small>{s}</small></button>)}
            </div>
          )}
        </div>
      )}
      <p style={{ marginTop: 16 }}><button className="link-btn small" onClick={() => go('/hoje')}>Parar por aqui</button></p>
    </div>
  )
}
