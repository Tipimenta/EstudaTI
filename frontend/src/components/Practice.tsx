import { useEffect, useRef, useState, type ReactNode } from 'react'
import { api, LETTERS, pct, plural } from '../lib'
import { Empty, ErrorBox, Icon, Markdown, Spinner, useToast } from './ui'

export type Question = {
  id: number; kind: 'multipla' | 'certo_errado'; statement: string; options: string[]; banca: string; year: number | null
  origin: string; source: string; subject: string; topic: string; topic_id: number | null
  answer?: string; explanation?: string; rationales?: string[]
}
type Reveal = Question & { correct: boolean; chosen: string; answer: string; explanation: string; rationales: string[]; crowd?: { answered: number; accuracy: number | null } }

const ORIGIN: Record<string, string> = { autoral: 'Autoral', ia: 'Gerada por IA', oficial: 'Prova oficial', adaptada: 'Adaptada' }

export function QuestionMeta({ q }: { q: Question }) {
  return (
    <div className="q-meta">
      {q.subject && <span className="chip ink">{q.subject}</span>}
      {q.banca && <span className="chip">{q.banca}{q.year ? ` ${q.year}` : ''}</span>}
      <span className="chip">{ORIGIN[q.origin] || q.origin}</span>
      {q.topic && <span className="tiny muted">{q.topic}</span>}
    </div>
  )
}

export function Options({ q, chosen, onChoose, reveal }: { q: Question; chosen: string; onChoose?: (l: string) => void; reveal?: { answer: string; rationales?: string[] } }) {
  if (q.kind === 'certo_errado') {
    return (
      <div className="ce-row">
        {[['C', 'Certo'], ['E', 'Errado']].map(([l, label]) => {
          const cls = reveal ? (l === reveal.answer ? 'is-right' : l === chosen ? 'is-wrong' : '') : ''
          return (
            <button key={l} className={`option ${cls}`} aria-pressed={!reveal && chosen === l} disabled={!!reveal || !onChoose}
              onClick={() => onChoose?.(chosen === l ? '' : l)}>
              <span className="bubble">{l}</span><span className="opt-text">{label}</span>
            </button>
          )
        })}
      </div>
    )
  }
  return (
    <div role="group" aria-label="Alternativas">
      {q.options.map((text, i) => {
        const l = LETTERS[i]
        const cls = reveal ? (l === reveal.answer ? 'is-right' : l === chosen ? 'is-wrong' : '') : ''
        const why = reveal?.rationales?.[i]
        return (
          <button key={l} className={`option ${cls}`} aria-pressed={!reveal && chosen === l} disabled={!!reveal || !onChoose}
            onClick={() => onChoose?.(chosen === l ? '' : l)}>
            <span className="bubble">{l}</span>
            <span className="opt-text">{text}{why && <span className="why">{why}</span>}</span>
          </button>
        )
      })}
    </div>
  )
}

/** Uma questão com resposta imediata, explicação e "Não entendi" (IA). */
export function QuestionCard({ q, onAnswered, context = 'treino', aiEnabled }: { q: Question; onAnswered?: (r: Reveal) => void; context?: string; aiEnabled?: boolean }) {
  const [chosen, setChosen] = useState('')
  const [reveal, setReveal] = useState<Reveal | null>(null)
  const [busy, setBusy] = useState(false)
  const [explain, setExplain] = useState<{ loading: boolean; text: string }>({ loading: false, text: '' })
  const started = useRef(Date.now())
  const toast = useToast()

  useEffect(() => { setChosen(''); setReveal(null); setExplain({ loading: false, text: '' }); started.current = Date.now() }, [q.id])

  async function submit() {
    if (!chosen || busy) return
    setBusy(true)
    try {
      const r = await api<Reveal>(`/questions/${q.id}/answer`, { body: { chosen, seconds: Math.round((Date.now() - started.current) / 1000), context } })
      setReveal(r)
      onAnswered?.(r)
    } catch (e) { toast((e as Error).message, true) } finally { setBusy(false) }
  }

  async function askWhy() {
    setExplain({ loading: true, text: '' })
    try {
      const r = await api<{ explanation: string }>(`/questions/${q.id}/explain`, { body: { chosen } })
      setExplain({ loading: false, text: r.explanation })
    } catch (e) { setExplain({ loading: false, text: '' }); toast((e as Error).message, true) }
  }

  // atalhos: letras para escolher, Enter para responder
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT')) return
      if (reveal) return
      const key = e.key.toUpperCase()
      if (q.kind === 'certo_errado' && (key === 'C' || key === 'E')) setChosen(key)
      else if (q.kind === 'multipla' && LETTERS.slice(0, q.options.length).includes(key)) setChosen(key)
      else if (e.key === 'Enter' && chosen) submit()
    }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  })

  return (
    <article>
      <QuestionMeta q={q} />
      <p className="q-statement">{q.statement}</p>
      <Options q={q} chosen={reveal ? reveal.chosen : chosen} onChoose={setChosen} reveal={reveal || undefined} />
      {!reveal && (
        <div className="row spread wrap" style={{ marginTop: 16 }}>
          <span className="tiny muted">Dica: use as teclas {q.kind === 'certo_errado' ? 'C/E' : 'A–E'} e Enter.</span>
          <button className="btn btn-primary" disabled={!chosen || busy} onClick={submit}>{busy ? 'Conferindo…' : 'Responder'}</button>
        </div>
      )}
      {reveal && (
        <div className={`feedback ${reveal.correct ? 'ok' : 'bad'}`} aria-live="polite">
          <h3>{reveal.correct ? 'Você acertou.' : `Resposta certa: ${reveal.answer === 'X' ? 'questão anulada' : reveal.answer}`}</h3>
          {reveal.explanation && <Markdown text={reveal.explanation} className="small" />}
          {reveal.crowd?.answered && reveal.crowd.answered > 3 ? <p className="tiny muted" style={{ marginTop: 8 }}>{pct(reveal.crowd.accuracy)} de acerto entre {reveal.crowd.answered} respostas na plataforma.</p> : null}
          {aiEnabled && !explain.text && (
            <button className="btn btn-sm" style={{ marginTop: 12 }} onClick={askWhy} disabled={explain.loading}>
              {explain.loading ? <Spinner label="Explicando…" /> : <><Icon name="chat" /> Não entendi, explica?</>}
            </button>
          )}
          {explain.text && <div className="panel pad" style={{ marginTop: 12 }}><Markdown text={explain.text} className="lesson small" /></div>}
        </div>
      )}
    </article>
  )
}

/** Sequência de questões com barra de progresso e resumo no fim. */
export function PracticeSession({ load, title, onExit, aiEnabled, context = 'treino', emptyAction }: {
  load: () => Promise<{ questions: Question[]; available?: number }>; title?: string; onExit?: () => void; aiEnabled?: boolean; context?: string; emptyAction?: ReactNode
}) {
  const [qs, setQs] = useState<Question[] | null>(null)
  const [error, setError] = useState('')
  const [i, setI] = useState(0)
  const [results, setResults] = useState<boolean[]>([])
  const [answered, setAnswered] = useState(false)

  async function start() {
    setQs(null); setError(''); setI(0); setResults([]); setAnswered(false)
    try { setQs((await load()).questions) } catch (e) { setError((e as Error).message) }
  }
  useEffect(() => { start() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (error) return <ErrorBox message={error} onRetry={start} />
  if (!qs) return <div className="panel pad-lg"><Spinner label="Separando as questões…" /></div>
  if (!qs.length) return <div className="panel"><Empty title="Nenhuma questão por aqui" action={emptyAction}>Não há questões com esse filtro. Tente outro modo ou outra matéria.</Empty></div>

  const done = i >= qs.length
  if (done) {
    const ok = results.filter(Boolean).length
    return (
      <div className="panel pad-lg stack">
        <h2>{ok === qs.length ? 'Gabaritou!' : `${ok} de ${qs.length} certas`}</h2>
        <p className="muted">{pct(ok / qs.length)} de acerto. As que você errou voltam na revisão de amanhã.</p>
        <div className="progress-steps">{results.map((r, k) => <i key={k} className={r ? 'ok' : 'bad'} />)}</div>
        <div className="row wrap">
          <button className="btn btn-primary" onClick={start}>Fazer mais {plural(Math.min(qs.length, 10), 'questão', 'questões')}</button>
          {onExit && <button className="btn" onClick={onExit}>Voltar</button>}
        </div>
      </div>
    )
  }
  return (
    <div>
      {title && <h2 style={{ marginBottom: 12 }}>{title}</h2>}
      <div className="progress-steps" aria-label={`Questão ${i + 1} de ${qs.length}`}>
        {qs.map((_, k) => <i key={k} className={k < results.length ? (results[k] ? 'ok' : 'bad') : k === i ? 'now' : ''} />)}
      </div>
      <div className="panel pad-lg">
        <p className="tiny muted" style={{ marginBottom: 8 }}>Questão {i + 1} de {qs.length}</p>
        <QuestionCard q={qs[i]} aiEnabled={aiEnabled} context={context} onAnswered={r => { setResults(x => [...x, r.correct]); setAnswered(true) }} />
        {answered && (
          <div className="row" style={{ justifyContent: 'flex-end', marginTop: 16 }}>
            <button className="btn btn-primary" autoFocus onClick={() => { setI(i + 1); setAnswered(false) }}>
              {i + 1 < qs.length ? 'Próxima questão' : 'Ver resultado'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export type Card = { id: number; front: string; back: string; topic?: string; subject?: string }

/** Flashcards com nota de 0 a 3 (repetição espaçada). */
export function FlashcardSession({ cards, onDone }: { cards: Card[]; onDone?: () => void }) {
  const [i, setI] = useState(0)
  const [show, setShow] = useState(false)
  const toast = useToast()
  useEffect(() => { setI(0); setShow(false) }, [cards])
  if (!cards.length) return <div className="panel"><Empty title="Sem flashcards">Este tópico ainda não tem cartões.</Empty></div>
  if (i >= cards.length) {
    return (
      <div className="panel pad-lg stack">
        <h2>Cartões revisados</h2>
        <p className="muted">Cada cartão volta na data certa para você não esquecer.</p>
        <div className="row wrap"><button className="btn" onClick={() => { setI(0); setShow(false) }}>Revisar de novo</button>{onDone && <button className="btn btn-primary" onClick={onDone}>Continuar</button>}</div>
      </div>
    )
  }
  const c = cards[i]
  async function grade(g: number) {
    try { await api(`/flashcards/${c.id}/grade`, { body: { grade: g } }) } catch (e) { toast((e as Error).message, true) }
    setShow(false); setI(i + 1)
  }
  return (
    <div className="stack">
      <div className="row spread"><p className="tiny muted">Cartão {i + 1} de {cards.length}</p>{c.subject && <span className="chip ink">{c.subject}</span>}</div>
      <div className="panel flash">
        <p className="front">{c.front}</p>
        {show && <p className="back">{c.back}</p>}
      </div>
      {!show ? (
        <button className="btn btn-primary btn-lg btn-block" onClick={() => setShow(true)} autoFocus>Mostrar resposta</button>
      ) : (
        <div className="grade-row">
          <button className="btn" onClick={() => grade(0)}>Errei<small>amanhã</small></button>
          <button className="btn" onClick={() => grade(1)}>Difícil<small>em breve</small></button>
          <button className="btn" onClick={() => grade(2)}>Bom<small>alguns dias</small></button>
          <button className="btn" onClick={() => grade(3)}>Fácil<small>mais tarde</small></button>
        </div>
      )}
    </div>
  )
}
