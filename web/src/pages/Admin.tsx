import { useEffect, useRef, useState } from 'react'
import { api, go, LETTERS, plural, useApi } from '../lib'
import { Empty, ErrorBox, Icon, Markdown, Meter, PageLoading, Spinner, useToast } from '../components/ui'

const AdminNav = ({ here }: { here: string }) => (
  <div className="seg" role="navigation" aria-label="Administração" style={{ marginBottom: 24 }}>
    {[['/admin', 'Visão geral'], ['/admin/edital', 'Importar edital'], ['/admin/prova', 'Importar prova'], ['/admin/questoes', 'Questões'], ['/admin/qualidade', 'Qualidade']].map(([h, l]) =>
      <button key={h} aria-pressed={here === h} onClick={() => go(h)}>{l}</button>)}
  </div>
)

// ---------------------------------------------------------------------------
// Visão geral
// ---------------------------------------------------------------------------
type Overview = { exams: number; roles: number; topics: number; lessons: number; questions: number; drafts: number; flashcards: number; prior_exams: number; users: number; ai_questions: number; ai_lessons: number
  ai: { enabled: boolean; provider: string | null; model: string | null }
  roles_list: { id: number; name: string; org: string; banca: string; exam_id: number; published: number; n_topics: number; n_lessons: number; n_with_questions: number }[] }

export function AdminHome() {
  const { data, error, loading, reload } = useApi<Overview>('/admin/overview')
  const users = useApi<{ users: { id: number; name: string; email: string; is_admin: number; answers: number }[] }>('/admin/users')
  const toast = useToast()
  if (loading && !data) return <PageLoading />
  if (error) return <div className="page"><ErrorBox message={error} onRetry={reload} /></div>
  if (!data) return null
  async function togglePublished(examId: number, published: number) {
    try { await api(`/admin/exams/${examId}`, { method: 'PATCH', body: { published: !published } }); reload() } catch (e) { toast((e as Error).message, true) }
  }
  async function removeRole(id: number, name: string) {
    if (!confirm(`Excluir o cargo "${name}"? O conteúdo das matérias continua disponível para outros cargos.`)) return
    try { await api(`/admin/roles/${id}`, { method: 'DELETE' }); toast('Cargo excluído.'); reload() } catch (e) { toast((e as Error).message, true) }
  }
  async function setAdmin(id: number, v: boolean) {
    try { await api(`/admin/users/${id}`, { method: 'PATCH', body: { is_admin: v } }); users.reload() } catch (e) { toast((e as Error).message, true) }
  }
  return (
    <div className="page">
      <div className="page-head"><div><h1>Administração</h1><p>Cadastre concursos, alimente o conteúdo e acompanhe o que falta.</p></div></div>
      <AdminNav here="/admin" />
      {!data.ai.enabled && (
        <div className="notice" style={{ marginBottom: 20 }}>
          A IA está desligada. Para gerar aulas e ler editais e provas, defina <code>AI_PROVIDER</code> e <code>AI_API_KEY</code> no servidor (veja o README).
        </div>
      )}
      <div className="row wrap" style={{ gap: 32, marginBottom: 28 }}>
        {[['Cargos', data.roles], ['Tópicos', data.topics], ['Aulas', data.lessons], ['Questões', data.questions], ['Rascunhos', data.drafts], ['Provas', data.prior_exams], ['Usuários', data.users]].map(([l, v]) =>
          <div key={l as string}><div className="big-num" style={{ fontSize: '1.7rem' }}>{v}</div><div className="small muted">{l}</div></div>)}
      </div>
      <section className="panel" style={{ marginBottom: 28 }}>
        <div className="pad row spread wrap"><h2>Cargos e cobertura</h2>{data.ai.enabled && <span className="chip ok">IA: {data.ai.provider}, {data.ai.model}</span>}</div>
        <div className="scroll-x">
          <table className="table">
            <thead><tr><th>Cargo</th><th>Aulas prontas</th><th>Tópicos com questões</th><th>Visível</th><th /></tr></thead>
            <tbody>
              {data.roles_list.map(r => (
                <tr key={r.id}>
                  <td><strong>{r.name}</strong><br /><span className="tiny muted">{r.org}{r.banca ? `, ${r.banca}` : ''}</span></td>
                  <td style={{ minWidth: 140 }}><span className="small">{r.n_lessons}/{r.n_topics}</span><Meter value={r.n_topics ? r.n_lessons / r.n_topics : 0} /></td>
                  <td style={{ minWidth: 140 }}><span className="small">{r.n_with_questions}/{r.n_topics}</span><Meter value={r.n_topics ? r.n_with_questions / r.n_topics : 0} /></td>
                  <td><button className="btn btn-sm" onClick={() => togglePublished(r.exam_id, r.published)}>{r.published ? 'Visível' : 'Oculto'}</button></td>
                  <td className="nowrap"><a className="btn btn-sm btn-primary" href={`#/admin/cargo/${r.id}`}>Editar</a> <button className="btn btn-sm btn-ghost btn-danger" onClick={() => removeRole(r.id, r.name)} aria-label="Excluir"><Icon name="trash" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!data.roles_list.length && <Empty title="Nenhum cargo ainda" action={<a className="btn btn-primary" href="#/admin/edital">Importar edital</a>} />}
      </section>
      <section className="panel">
        <h2 className="pad" style={{ paddingBottom: 0 }}>Usuários</h2>
        <div className="scroll-x"><table className="table">
          <thead><tr><th>Nome</th><th>E-mail</th><th>Respostas</th><th>Administrador</th></tr></thead>
          <tbody>{users.data?.users.map(u => (
            <tr key={u.id}><td>{u.name}</td><td className="small">{u.email}</td><td>{u.answers}</td>
              <td><input type="checkbox" checked={!!u.is_admin} onChange={e => setAdmin(u.id, e.target.checked)} aria-label={`Administrador: ${u.name}`} /></td></tr>
          ))}</tbody>
        </table></div>
      </section>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Estrutura do cargo: matérias, pesos, tópicos e geração em lote
// ---------------------------------------------------------------------------
type RoleTopic = { id: number; name: string; lesson_origin: string | null; n_questions: number; n_cards: number }
type Structure = { role: { id: number; name: string; org: string; exam: string; banca: string; exam_date: string | null; question_style: string; level: string; exam_id: number }
  subjects: { id: number; name: string; weight: number; questions: number; topics: RoleTopic[] }[] }

export function AdminRole({ id }: { id: number }) {
  const { data, error, loading, reload } = useApi<Structure>(`/admin/roles/${id}/structure`)
  const toast = useToast()
  const [newSubject, setNewSubject] = useState('')
  const [addTo, setAddTo] = useState<number | null>(null)
  const [newTopics, setNewTopics] = useState('')
  const [batch, setBatch] = useState<{ running: boolean; done: number; total: number; current: string; errors: number }>({ running: false, done: 0, total: 0, current: '', errors: 0 })
  const stop = useRef(false)
  const [meta, setMeta] = useState<{ exam_date: string; question_style: string } | null>(null)
  useEffect(() => { if (data) setMeta({ exam_date: data.role.exam_date || '', question_style: data.role.question_style }) }, [data])

  if (loading && !data) return <PageLoading />
  if (error) return <div className="page"><ErrorBox message={error} onRetry={reload} /></div>
  if (!data) return null
  const all = data.subjects.flatMap(s => s.topics.map(t => ({ ...t, subject: s.name })))
  const missing = all.filter(t => !t.lesson_origin || !t.n_questions || !t.n_cards)

  const call = async (fn: () => Promise<unknown>, ok?: string) => { try { await fn(); if (ok) toast(ok); reload() } catch (e) { toast((e as Error).message, true) } }

  async function runBatch() {
    stop.current = false
    setBatch({ running: true, done: 0, total: missing.length, current: '', errors: 0 })
    let errors = 0
    for (let k = 0; k < missing.length; k++) {
      if (stop.current) break
      const t = missing[k]
      setBatch(b => ({ ...b, current: t.name }))
      const parts = [!t.lesson_origin && 'lesson', !t.n_questions && 'questions', !t.n_cards && 'flashcards'].filter(Boolean)
      try { await api(`/admin/topics/${t.id}/generate`, { body: { parts } }) } catch { errors++ }
      setBatch(b => ({ ...b, done: k + 1, errors }))
    }
    setBatch(b => ({ ...b, running: false, current: '' }))
    toast(stop.current ? 'Geração pausada.' : `Geração concluída${errors ? ` com ${errors} falhas` : ''}.`, errors > 0)
    reload()
  }

  return (
    <div className="page">
      <a href="#/admin" className="small">Administração</a>
      <div className="page-head" style={{ marginTop: 6 }}>
        <div><h1>{data.role.name}</h1><p>{data.role.org}{data.role.banca ? `, ${data.role.banca}` : ''}</p></div>
      </div>
      <div className="grid-2">
        <div className="stack-lg">
          {data.subjects.map(s => (
            <section key={s.id} className="panel">
              <div className="pad row spread wrap" style={{ gap: 12 }}>
                <h3 style={{ flex: 1 }}>{s.name}</h3>
                <label className="row small" style={{ gap: 6 }}>Peso <input className="input" style={{ width: 70, minHeight: 34, padding: '4px 8px' }} type="number" step="0.1" min="0" defaultValue={s.weight}
                  onBlur={e => Number(e.target.value) !== s.weight && call(() => api(`/admin/roles/${id}/subjects/${s.id}`, { method: 'PATCH', body: { weight: Number(e.target.value) } }), 'Peso salvo.')} /></label>
                <label className="row small" style={{ gap: 6 }}>Questões na prova <input className="input" style={{ width: 70, minHeight: 34, padding: '4px 8px' }} type="number" min="0" defaultValue={s.questions}
                  onBlur={e => Number(e.target.value) !== s.questions && call(() => api(`/admin/roles/${id}/subjects/${s.id}`, { method: 'PATCH', body: { questions: Number(e.target.value) } }), 'Salvo.')} /></label>
                <button className="btn btn-sm btn-ghost btn-danger" aria-label={`Remover ${s.name} deste cargo`}
                  onClick={() => confirm(`Remover ${s.name} deste cargo? O conteúdo não é apagado.`) && call(() => api(`/admin/roles/${id}/subjects/${s.id}`, { method: 'DELETE' }), 'Matéria removida do cargo.')}><Icon name="trash" /></button>
              </div>
              {s.topics.map(t => (
                <div key={t.id} className="list-row" style={{ padding: '10px 20px' }}>
                  <a href={`#/admin/topico/${t.id}`} style={{ flex: 1, minWidth: 0 }}>{t.name}</a>
                  <span className={`chip ${t.lesson_origin ? 'ok' : 'mark'}`}>{t.lesson_origin ? 'aula' : 'sem aula'}</span>
                  <span className="tiny muted nowrap">{t.n_questions} q, {t.n_cards} cards</span>
                  <button className="btn btn-sm btn-ghost" aria-label="Tirar do cargo" onClick={() => call(() => api(`/admin/roles/${id}/topics/${t.id}`, { method: 'DELETE' }))}><Icon name="close" /></button>
                </div>
              ))}
              <div className="pad" style={{ borderTop: '1px solid var(--line)' }}>
                {addTo === s.id ? (
                  <div className="stack">
                    <textarea className="textarea" placeholder="Um tópico por linha" value={newTopics} onChange={e => setNewTopics(e.target.value)} autoFocus />
                    <div className="row"><button className="btn btn-primary btn-sm" onClick={() => call(() => api(`/admin/roles/${id}/topics`, { body: { subject_id: s.id, names: newTopics } }), 'Tópicos adicionados.').then(() => { setNewTopics(''); setAddTo(null) })}>Adicionar</button>
                      <button className="btn btn-sm" onClick={() => setAddTo(null)}>Cancelar</button></div>
                  </div>
                ) : <button className="btn btn-sm" onClick={() => setAddTo(s.id)}><Icon name="plus" /> Tópicos</button>}
              </div>
            </section>
          ))}
          <form className="panel pad row wrap" onSubmit={e => { e.preventDefault(); if (newSubject.trim()) call(() => api(`/admin/roles/${id}/subjects`, { body: { name: newSubject, include_existing_topics: true } }), 'Matéria adicionada.').then(() => setNewSubject('')) }}>
            <input className="input" style={{ flex: 1, minWidth: 200 }} placeholder="Nova matéria (se já existir em outro concurso, os tópicos dela vêm junto)" value={newSubject} onChange={e => setNewSubject(e.target.value)} />
            <button className="btn btn-primary">Adicionar matéria</button>
          </form>
        </div>
        <aside className="stack-lg">
          <section className="panel pad stack">
            <h3>Gerar o que falta</h3>
            <p className="small muted">{missing.length ? `${plural(missing.length, 'tópico está incompleto', 'tópicos estão incompletos')} (sem aula, questões ou flashcards).` : 'Todos os tópicos têm aula, questões e flashcards.'}</p>
            {batch.running || batch.done ? (
              <div className="stack">
                <Meter value={batch.total ? batch.done / batch.total : 0} />
                <p className="small">{batch.done} de {batch.total}{batch.errors ? `, ${batch.errors} falhas` : ''}</p>
                {batch.current && <p className="tiny muted">Agora: {batch.current}</p>}
                {batch.running && <button className="btn btn-sm" onClick={() => { stop.current = true }}>Pausar</button>}
              </div>
            ) : null}
            {!batch.running && missing.length > 0 && <button className="btn btn-primary" onClick={runBatch}><Icon name="spark" /> Gerar com IA</button>}
            <p className="tiny muted">Cada tópico leva cerca de um minuto e usa créditos do seu provedor de IA. Pode deixar a página aberta rodando.</p>
          </section>
          {meta && (
            <section className="panel pad stack">
              <h3>Dados do cargo</h3>
              <label className="field"><span>Data da prova</span><input className="input" type="date" value={meta.exam_date} onChange={e => setMeta({ ...meta, exam_date: e.target.value })} /></label>
              <label className="field"><span>Tipo de questão</span>
                <select className="select" value={meta.question_style} onChange={e => setMeta({ ...meta, question_style: e.target.value })}>
                  <option value="multipla">Múltipla escolha (A a E)</option><option value="certo_errado">Certo ou errado (Cebraspe)</option>
                </select></label>
              <button className="btn" onClick={() => call(() => api(`/admin/roles/${id}`, { method: 'PATCH', body: { exam_date: meta.exam_date || null, question_style: meta.question_style } }), 'Cargo salvo.')}>Salvar</button>
            </section>
          )}
        </aside>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Conteúdo de um tópico
// ---------------------------------------------------------------------------
type FullQ = { id: number; kind: string; statement: string; options: string[]; answer: string; explanation: string; origin: string; status: string; subject_id: number }

export function AdminTopic({ id }: { id: number }) {
  const { data, error, loading, reload } = useApi<{ topic: { id: number; name: string; subject: string; subject_id: number }; lesson: { body: string; summary: string; minutes: number; origin: string; status: string } | null; questions: FullQ[]; flashcards: { id: number; front: string; back: string }[] }>(`/admin/topics/${id}/content`)
  const toast = useToast()
  const [body, setBody] = useState('')
  const [summary, setSummary] = useState('')
  const [preview, setPreview] = useState(false)
  const [busy, setBusy] = useState('')
  const [card, setCard] = useState({ front: '', back: '' })
  const [q, setQ] = useState({ statement: '', options: ['', '', '', '', ''], answer: 'A', explanation: '' })
  const [name, setName] = useState('')
  useEffect(() => { if (data) { setBody(data.lesson?.body || ''); setSummary(data.lesson?.summary || ''); setName(data.topic.name) } }, [data])
  if (loading && !data) return <PageLoading />
  if (error) return <div className="page"><ErrorBox message={error} onRetry={reload} /></div>
  if (!data) return null
  const run = async (label: string, fn: () => Promise<unknown>, ok: string) => {
    setBusy(label)
    try { await fn(); toast(ok); reload() } catch (e) { toast((e as Error).message, true) } finally { setBusy('') }
  }
  return (
    <div className="page stack-lg">
      <div>
        <a className="small" href="#" onClick={e => { e.preventDefault(); history.back() }}>Voltar</a>
        <p className="muted small" style={{ marginTop: 8 }}>{data.topic.subject}</p>
        <div className="row wrap" style={{ marginTop: 4 }}>
          <input className="input" style={{ flex: 1, fontSize: '1.3rem', fontWeight: 700, fontFamily: 'var(--font-head)' }} value={name} onChange={e => setName(e.target.value)} aria-label="Nome do tópico" />
          {name !== data.topic.name && <button className="btn" onClick={() => run('', () => api(`/admin/topics/${id}`, { method: 'PATCH', body: { name } }), 'Nome salvo.')}>Salvar nome</button>}
          <a className="btn btn-ghost" href={`#/topico/${id}`}>Ver como aluno</a>
        </div>
      </div>

      <section className="panel pad-lg stack">
        <div className="row spread wrap"><h2>Aula</h2>
          <div className="row">
            {data.lesson && <span className="chip">{data.lesson.origin === 'ia' ? 'Gerada por IA' : data.lesson.origin === 'ia_revisada' ? 'IA revisada' : 'Autoral'}</span>}
            <div className="seg"><button aria-pressed={!preview} onClick={() => setPreview(false)}>Editar</button><button aria-pressed={preview} onClick={() => setPreview(true)}>Prévia</button></div>
          </div>
        </div>
        <label className="field"><span>Resumo em uma frase</span><input className="input" value={summary} onChange={e => setSummary(e.target.value)} /></label>
        {preview ? <div className="panel pad"><Markdown text={body} /></div> :
          <textarea className="textarea" style={{ minHeight: 420, fontFamily: 'ui-monospace, monospace', fontSize: '.9rem' }} value={body} onChange={e => setBody(e.target.value)} placeholder="Escreva em Markdown: ## títulos, **negrito**, listas com -" />}
        <div className="row wrap">
          <button className="btn btn-primary" disabled={!!busy || !body.trim()} onClick={() => run('save', () => api(`/admin/topics/${id}/lesson`, { method: 'PUT', body: { body, summary } }), 'Aula salva.')}>Salvar aula</button>
          {!data.lesson && <button className="btn" disabled={!!busy} onClick={() => run('lesson', () => api(`/admin/topics/${id}/generate`, { body: { parts: ['lesson'] } }), 'Aula gerada.')}><Icon name="spark" /> Gerar com IA</button>}
          {data.lesson && <button className="btn btn-ghost btn-danger" onClick={() => confirm('Apagar a aula? Você poderá gerar de novo.') && run('', () => api(`/admin/topics/${id}/lesson`, { method: 'DELETE' }), 'Aula apagada.')}>Apagar aula</button>}
          {busy === 'lesson' && <Spinner label="Escrevendo…" />}
        </div>
      </section>

      <section className="panel pad-lg stack">
        <div className="row spread wrap"><h2>Questões ({data.questions.length})</h2>
          <button className="btn" disabled={!!busy} onClick={() => run('q', () => api(`/admin/topics/${id}/generate`, { body: { parts: ['questions'] } }), 'Questões geradas.')}>{busy === 'q' ? <Spinner label="Gerando…" /> : <><Icon name="spark" /> Gerar mais com IA</>}</button></div>
        {data.questions.map((x, k) => (
          <details key={x.id} className="panel pad">
            <summary className="row" style={{ cursor: 'pointer' }}><span style={{ flex: 1 }}>{k + 1}. {x.statement.slice(0, 140)}{x.statement.length > 140 ? '…' : ''}</span>
              <span className={`chip ${x.status === 'publicada' ? 'ok' : 'mark'}`}>{x.status}</span></summary>
            <div className="stack" style={{ marginTop: 12 }}>
              <p className="q-statement">{x.statement}</p>
              {x.options.map((o, i) => <p key={i} className="small" style={{ fontWeight: LETTERS[i] === x.answer ? 700 : 400 }}>{LETTERS[i]}) {o}</p>)}
              {x.kind === 'certo_errado' && <p className="small"><strong>Gabarito: {x.answer === 'C' ? 'Certo' : 'Errado'}</strong></p>}
              {x.explanation && <p className="small muted">{x.explanation}</p>}
              <div className="row wrap">
                <button className="btn btn-sm" onClick={() => run('', () => api(`/admin/questions/${x.id}`, { method: 'PATCH', body: { status: x.status === 'publicada' ? 'rascunho' : 'publicada' } }), 'Status alterado.')}>{x.status === 'publicada' ? 'Voltar para rascunho' : 'Publicar'}</button>
                <button className="btn btn-sm btn-ghost btn-danger" onClick={() => confirm('Excluir esta questão?') && run('', () => api(`/admin/questions/${x.id}`, { method: 'DELETE' }), 'Questão excluída.')}>Excluir</button>
              </div>
            </div>
          </details>
        ))}
        <details className="panel pad">
          <summary style={{ cursor: 'pointer', fontWeight: 650 }}>Escrever uma questão</summary>
          <div className="stack" style={{ marginTop: 12 }}>
            <textarea className="textarea" placeholder="Enunciado" value={q.statement} onChange={e => setQ({ ...q, statement: e.target.value })} />
            {q.options.map((o, i) => (
              <div key={i} className="row"><label className="row small" style={{ gap: 4 }}><input type="radio" name="ans" checked={q.answer === LETTERS[i]} onChange={() => setQ({ ...q, answer: LETTERS[i] })} />{LETTERS[i]}</label>
                <input className="input" value={o} onChange={e => { const ops = [...q.options]; ops[i] = e.target.value; setQ({ ...q, options: ops }) }} placeholder={`Alternativa ${LETTERS[i]}`} /></div>
            ))}
            <textarea className="textarea" style={{ minHeight: 80 }} placeholder="Explicação do gabarito" value={q.explanation} onChange={e => setQ({ ...q, explanation: e.target.value })} />
            <button className="btn btn-primary" onClick={() => run('', () => api('/admin/questions', { body: { ...q, options: q.options.filter(o => o.trim()), subject_id: data.topic.subject_id, topic_id: id } }), 'Questão criada.').then(() => setQ({ statement: '', options: ['', '', '', '', ''], answer: 'A', explanation: '' }))}>Salvar questão</button>
          </div>
        </details>
      </section>

      <section className="panel pad-lg stack">
        <div className="row spread wrap"><h2>Flashcards ({data.flashcards.length})</h2>
          <button className="btn" disabled={!!busy} onClick={() => run('f', () => api(`/admin/topics/${id}/generate`, { body: { parts: ['flashcards'] } }), 'Flashcards gerados.')}>{busy === 'f' ? <Spinner label="Gerando…" /> : <><Icon name="spark" /> Gerar com IA</>}</button></div>
        {data.flashcards.map(f => (
          <div key={f.id} className="row" style={{ borderTop: '1px solid var(--line)', paddingTop: 10 }}>
            <span style={{ flex: 1 }} className="small"><strong>{f.front}</strong><br /><span className="muted">{f.back}</span></span>
            <button className="btn btn-sm btn-ghost btn-danger" aria-label="Excluir cartão" onClick={() => run('', () => api(`/admin/flashcards/${f.id}`, { method: 'DELETE' }), 'Cartão excluído.')}><Icon name="trash" /></button>
          </div>
        ))}
        <form className="row wrap" onSubmit={e => { e.preventDefault(); run('', () => api(`/admin/topics/${id}/flashcards`, { body: card }), 'Cartão criado.').then(() => setCard({ front: '', back: '' })) }}>
          <input className="input" style={{ flex: 1, minWidth: 180 }} placeholder="Frente (pergunta)" value={card.front} onChange={e => setCard({ ...card, front: e.target.value })} />
          <input className="input" style={{ flex: 1, minWidth: 180 }} placeholder="Verso (resposta)" value={card.back} onChange={e => setCard({ ...card, back: e.target.value })} />
          <button className="btn" disabled={!card.front.trim() || !card.back.trim()}>Adicionar</button>
        </form>
      </section>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Importar edital
// ---------------------------------------------------------------------------
type Proposal = { org: string; banca: string; role: string; exam_date: string; style: string; subjects: { name: string; questions: number; weight: number; topics: string[]; existing_id: number | null; existing_topics?: number }[] }

export function AdminEdital() {
  const toast = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [text, setText] = useState('')
  const [hint, setHint] = useState('')
  const [busy, setBusy] = useState(false)
  const [p, setP] = useState<Proposal | null>(null)
  const [target, setTarget] = useState<'novo' | 'existente'>('novo')
  const [roleId, setRoleId] = useState('')
  const exams = useApi<{ exams: { id: number; org: string; roles: { id: number; name: string }[] }[] }>('/admin/exams')
  const ov = useApi<{ ai: { enabled: boolean } }>('/admin/overview')

  async function parse() {
    setBusy(true)
    const form = new FormData()
    if (file) form.append('file', file)
    form.append('text', text)
    form.append('role_hint', hint)
    try { setP(await api<Proposal>('/admin/edital/parse', { form })) } catch (e) { toast((e as Error).message, true) } finally { setBusy(false) }
  }
  async function apply() {
    if (!p) return
    setBusy(true)
    try {
      const body = target === 'existente' ? { role_id: Number(roleId), subjects: p.subjects }
        : { exam: { org: p.org, banca: p.banca, name: p.org }, role: { name: p.role, exam_date: p.exam_date || null, question_style: p.style }, subjects: p.subjects }
      const r = await api<{ role_id: number; topics: number }>('/admin/edital/apply', { body })
      toast(`Edital aplicado: ${r.topics} tópicos.`)
      go(`/admin/cargo/${r.role_id}`)
    } catch (e) { toast((e as Error).message, true) } finally { setBusy(false) }
  }
  const upd = (i: number, patch: Partial<Proposal['subjects'][number]>) => p && setP({ ...p, subjects: p.subjects.map((s, k) => k === i ? { ...s, ...patch } : s) })

  return (
    <div className="page">
      <div className="page-head"><div><h1>Importar edital</h1><p>Envie o PDF. A IA lê o conteúdo programático e monta matérias e tópicos para você conferir.</p></div></div>
      <AdminNav here="/admin/edital" />
      {ov.data && !ov.data.ai.enabled && <div className="notice bad" style={{ marginBottom: 20 }}>Esta função precisa da IA configurada no servidor.</div>}
      {!p ? (
        <div className="panel pad-lg stack-lg" style={{ maxWidth: 720 }}>
          <label className="field"><span>PDF do edital</span><input className="input" type="file" accept=".pdf,.txt" onChange={e => setFile(e.target.files?.[0] || null)} />
            <small>Editais grandes funcionam melhor enviando só as páginas do cargo e do conteúdo programático.</small></label>
          <label className="field"><span>Ou cole o texto do conteúdo programático</span><textarea className="textarea" value={text} onChange={e => setText(e.target.value)} /></label>
          <label className="field"><span>Cargo de interesse</span><input className="input" placeholder="Ex.: Escrivão de Polícia" value={hint} onChange={e => setHint(e.target.value)} /><small>Ajuda quando o edital tem vários cargos.</small></label>
          <button className="btn btn-primary btn-lg" disabled={busy || (!file && text.trim().length < 100)} onClick={parse}>{busy ? <Spinner label="Lendo o edital…" /> : 'Ler edital'}</button>
        </div>
      ) : (
        <div className="stack-lg">
          <section className="panel pad-lg stack">
            <h2>Concurso</h2>
            <div className="seg"><button aria-pressed={target === 'novo'} onClick={() => setTarget('novo')}>Criar concurso e cargo</button><button aria-pressed={target === 'existente'} onClick={() => setTarget('existente')}>Atualizar cargo existente</button></div>
            {target === 'novo' ? (
              <div className="grid-2" style={{ gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <label className="field"><span>Órgão</span><input className="input" value={p.org} onChange={e => setP({ ...p, org: e.target.value })} /></label>
                <label className="field"><span>Cargo</span><input className="input" value={p.role} onChange={e => setP({ ...p, role: e.target.value })} /></label>
                <label className="field"><span>Banca</span><input className="input" value={p.banca} onChange={e => setP({ ...p, banca: e.target.value })} /></label>
                <label className="field"><span>Data da prova</span><input className="input" type="date" value={p.exam_date || ''} onChange={e => setP({ ...p, exam_date: e.target.value })} /></label>
                <label className="field"><span>Tipo de questão</span><select className="select" value={p.style} onChange={e => setP({ ...p, style: e.target.value })}><option value="multipla">Múltipla escolha</option><option value="certo_errado">Certo ou errado</option></select></label>
              </div>
            ) : (
              <select className="select" value={roleId} onChange={e => setRoleId(e.target.value)}>
                <option value="">Escolha o cargo</option>
                {exams.data?.exams.flatMap(x => x.roles.map(r => <option key={r.id} value={r.id}>{x.org}: {r.name}</option>))}
              </select>
            )}
          </section>
          <section className="stack">
            <h2>{plural(p.subjects.length, 'matéria encontrada', 'matérias encontradas')}</h2>
            <p className="muted small">Confira nomes e tópicos (um por linha). Matérias que já existem são reaproveitadas, com as aulas que já tiverem.</p>
            {p.subjects.map((s, i) => (
              <div key={i} className="panel pad stack">
                <div className="row wrap">
                  <input className="input" style={{ flex: 1, fontWeight: 650 }} value={s.name} onChange={e => upd(i, { name: e.target.value })} aria-label="Matéria" />
                  <label className="row small" style={{ gap: 6 }}>Questões <input className="input" type="number" style={{ width: 70 }} value={s.questions || 0} onChange={e => upd(i, { questions: Number(e.target.value) })} /></label>
                  <label className="row small" style={{ gap: 6 }}>Peso <input className="input" type="number" step="0.1" style={{ width: 70 }} value={s.weight || 1} onChange={e => upd(i, { weight: Number(e.target.value) })} /></label>
                  <button className="btn btn-sm btn-ghost btn-danger" onClick={() => setP({ ...p, subjects: p.subjects.filter((_, k) => k !== i) })} aria-label="Remover matéria"><Icon name="trash" /></button>
                </div>
                {s.existing_id && <p className="tiny"><span className="chip ok">Já existe</span> {s.existing_topics ? `${s.existing_topics} destes tópicos já têm cadastro` : ''}</p>}
                <textarea className="textarea" value={s.topics.join('\n')} onChange={e => upd(i, { topics: e.target.value.split('\n') })} aria-label={`Tópicos de ${s.name}`} />
              </div>
            ))}
          </section>
          <div className="row wrap"><button className="btn btn-primary btn-lg" disabled={busy || (target === 'existente' && !roleId)} onClick={apply}>{busy ? 'Aplicando…' : 'Criar trilha'}</button><button className="btn" onClick={() => setP(null)}>Recomeçar</button></div>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Importar prova anterior (PDF + gabarito) e revisar
// ---------------------------------------------------------------------------
type Extracted = { number: number; kind: string; statement: string; options: string[]; answer: string; subject: string; subject_id: number | null }

export function AdminProva() {
  const toast = useToast()
  const list = useApi<{ exams: { id: number; title: string; banca: string; year: number; status: string; n_questions: number; n_published: number; n_no_answer: number; role: string | null }[] }>('/admin/prior-exams')
  const exams = useApi<{ exams: { id: number; org: string; banca: string; roles: { id: number; name: string }[] }[] }>('/admin/exams')
  const ov = useApi<{ ai: { enabled: boolean } }>('/admin/overview')
  const [prova, setProva] = useState<File | null>(null)
  const [gab, setGab] = useState<File | null>(null)
  const [gabText, setGabText] = useState('')
  const [style, setStyle] = useState('multipla')
  const [roleId, setRoleId] = useState('')
  const [useAi, setUseAi] = useState(true)
  const [busy, setBusy] = useState(false)
  const [items, setItems] = useState<Extracted[] | null>(null)
  const [subjects, setSubjects] = useState<{ id: number; name: string }[]>([])
  const [meta, setMeta] = useState({ title: '', banca: '', year: new Date().getFullYear() - 1, duration_min: 240 })

  async function extract() {
    setBusy(true)
    const form = new FormData()
    if (prova) form.append('prova', prova)
    if (gab) form.append('gabarito', gab)
    form.append('gabarito_text', gabText)
    form.append('style', style)
    form.append('role_id', roleId)
    form.append('use_ai', useAi && ov.data?.ai.enabled ? '1' : '0')
    try {
      const r = await api<{ questions: Extracted[]; subjects: { id: number; name: string }[]; without_answer: number; method: string }>('/admin/prior-exams/extract', { form })
      setItems(r.questions); setSubjects(r.subjects)
      if (!r.questions.length) toast('Não encontrei questões. Tente com a IA ligada ou confira se o PDF tem texto selecionável.', true)
      else toast(`${r.questions.length} questões lidas${r.without_answer ? `, ${r.without_answer} sem gabarito` : ''}.`)
      const role = exams.data?.exams.find(x => x.roles.some(rr => String(rr.id) === roleId))
      if (role) setMeta(m => ({ ...m, banca: role.banca, title: m.title || `${role.org} ${m.year}` }))
    } catch (e) { toast((e as Error).message, true) } finally { setBusy(false) }
  }
  async function save(publish: boolean) {
    if (!items) return
    if (publish && items.some(q => !q.answer)) { if (!confirm('Há questões sem gabarito; elas ficam como rascunho. Continuar?')) return }
    if (items.some(q => !q.subject_id)) { toast('Defina a matéria de todas as questões.', true); return }
    setBusy(true)
    try {
      await api('/admin/prior-exams', { body: { exam: { ...meta, style, role_id: roleId ? Number(roleId) : null, publish }, questions: items } })
      toast(publish ? 'Prova publicada como simulado.' : 'Prova salva como rascunho.')
      setItems(null); setProva(null); setGab(null); setGabText(''); list.reload()
    } catch (e) { toast((e as Error).message, true) } finally { setBusy(false) }
  }
  const upd = (i: number, patch: Partial<Extracted>) => items && setItems(items.map((q, k) => k === i ? { ...q, ...patch } : q))
  async function setStatus(id: number, status: string) { try { await api(`/admin/prior-exams/${id}`, { method: 'PATCH', body: { status } }); list.reload() } catch (e) { toast((e as Error).message, true) } }
  async function del(id: number) { if (!confirm('Excluir esta prova e as questões dela?')) return; try { await api(`/admin/prior-exams/${id}`, { method: 'DELETE' }); list.reload() } catch (e) { toast((e as Error).message, true) } }

  return (
    <div className="page">
      <div className="page-head"><div><h1>Importar prova anterior</h1><p>PDF da prova e do gabarito viram um simulado digital com correção automática.</p></div></div>
      <AdminNav here="/admin/prova" />
      {!items ? (
        <div className="grid-2">
          <div className="panel pad-lg stack-lg">
            <label className="field"><span>PDF da prova (caderno de questões)</span><input className="input" type="file" accept=".pdf,.txt" onChange={e => setProva(e.target.files?.[0] || null)} /></label>
            <label className="field"><span>PDF do gabarito</span><input className="input" type="file" accept=".pdf,.txt" onChange={e => setGab(e.target.files?.[0] || null)} /></label>
            <label className="field"><span>Ou digite o gabarito</span><input className="input" placeholder="1-A 2-C 3-E 4-B …   (use X para anulada)" value={gabText} onChange={e => setGabText(e.target.value)} />
              <small>Use o gabarito definitivo, depois dos recursos.</small></label>
            <div className="grid-2" style={{ gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <label className="field"><span>Tipo</span><select className="select" value={style} onChange={e => setStyle(e.target.value)}><option value="multipla">Múltipla escolha</option><option value="certo_errado">Certo ou errado</option></select></label>
              <label className="field"><span>Cargo</span><select className="select" value={roleId} onChange={e => setRoleId(e.target.value)}><option value="">Nenhum específico</option>{exams.data?.exams.flatMap(x => x.roles.map(r => <option key={r.id} value={r.id}>{x.org}: {r.name}</option>))}</select></label>
            </div>
            <label className="row small"><input type="checkbox" checked={useAi && !!ov.data?.ai.enabled} disabled={!ov.data?.ai.enabled} onChange={e => setUseAi(e.target.checked)} /> Usar IA para ler a prova (recomendado; sem IA só funciona com provas bem formatadas)</label>
            <button className="btn btn-primary btn-lg" disabled={busy || !prova} onClick={extract}>{busy ? <Spinner label="Lendo a prova… pode levar alguns minutos" /> : 'Ler prova'}</button>
          </div>
          <aside>
            <h3 style={{ marginBottom: 12 }}>Provas cadastradas</h3>
            <div className="panel">
              {list.data?.exams.length ? list.data.exams.map(p => (
                <div key={p.id} className="list-row" style={{ flexWrap: 'wrap' }}>
                  <span style={{ flex: 1, minWidth: 0 }}><strong className="small">{p.title}</strong><br /><span className="tiny muted">{p.n_published}/{p.n_questions} publicadas{p.n_no_answer ? `, ${p.n_no_answer} sem gabarito` : ''}</span></span>
                  {p.status === 'publicada' ? <button className="btn btn-sm" onClick={() => setStatus(p.id, 'rascunho')}>Ocultar</button> : <button className="btn btn-sm btn-primary" onClick={() => setStatus(p.id, 'publicada')}>Publicar</button>}
                  <a className="btn btn-sm btn-ghost" href={`#/admin/questoes?prova=${p.id}`}>Questões</a>
                  <button className="btn btn-sm btn-ghost btn-danger" onClick={() => del(p.id)} aria-label="Excluir"><Icon name="trash" /></button>
                </div>
              )) : <p className="pad small muted">Nenhuma prova ainda.</p>}
            </div>
          </aside>
        </div>
      ) : (
        <div className="stack-lg">
          <section className="panel pad-lg stack">
            <h2>Dados da prova</h2>
            <div className="grid-2" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 12 }}>
              <label className="field"><span>Título</span><input className="input" value={meta.title} placeholder="PC-SP 2023, Escrivão" onChange={e => setMeta({ ...meta, title: e.target.value })} /></label>
              <label className="field"><span>Banca</span><input className="input" value={meta.banca} onChange={e => setMeta({ ...meta, banca: e.target.value })} /></label>
              <label className="field"><span>Ano</span><input className="input" type="number" value={meta.year} onChange={e => setMeta({ ...meta, year: Number(e.target.value) })} /></label>
              <label className="field"><span>Minutos</span><input className="input" type="number" value={meta.duration_min} onChange={e => setMeta({ ...meta, duration_min: Number(e.target.value) })} /></label>
            </div>
          </section>
          <section className="stack">
            <div className="row spread wrap"><h2>Revise as {items.length} questões</h2>
              <span className="small muted">{items.filter(q => !q.answer).length} sem gabarito, {items.filter(q => !q.subject_id).length} sem matéria</span></div>
            {items.map((q, i) => (
              <div key={i} className={`panel pad stack ${!q.answer || !q.subject_id ? '' : ''}`} style={!q.answer || !q.subject_id ? { borderColor: 'var(--mark)' } : undefined}>
                <div className="row wrap">
                  <strong>Questão {q.number}</strong>
                  <select className="select" style={{ width: 'auto', flex: 1, minWidth: 180 }} value={q.subject_id || ''} onChange={e => upd(i, { subject_id: Number(e.target.value) || null })} aria-label="Matéria">
                    <option value="">Matéria…{q.subject ? ` (sugerida: ${q.subject})` : ''}</option>{subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                  <select className="select" style={{ width: 120 }} value={q.answer} onChange={e => upd(i, { answer: e.target.value })} aria-label="Gabarito">
                    <option value="">Gabarito…</option>{(style === 'certo_errado' ? ['C', 'E'] : LETTERS).map(l => <option key={l}>{l}</option>)}<option value="X">Anulada</option>
                  </select>
                  <button className="btn btn-sm btn-ghost btn-danger" onClick={() => setItems(items.filter((_, k) => k !== i))} aria-label="Descartar questão"><Icon name="trash" /></button>
                </div>
                <textarea className="textarea" style={{ minHeight: 90 }} value={q.statement} onChange={e => upd(i, { statement: e.target.value })} aria-label="Enunciado" />
                {q.options.map((o, k) => (
                  <div key={k} className="row"><span className="bubble" style={{ width: 28, height: 28, fontSize: '.8rem', ...(q.answer === LETTERS[k] ? { background: 'var(--ok)', borderColor: 'var(--ok)', color: 'var(--surface)' } : {}) }}>{LETTERS[k]}</span>
                    <input className="input" value={o} onChange={e => upd(i, { options: q.options.map((x, j) => j === k ? e.target.value : x) })} aria-label={`Alternativa ${LETTERS[k]}`} /></div>
                ))}
              </div>
            ))}
          </section>
          <div className="row wrap" style={{ position: 'sticky', bottom: 80, background: 'var(--paper)', padding: '12px 0' }}>
            <button className="btn btn-primary btn-lg" disabled={busy || !meta.title} onClick={() => save(true)}>Publicar como simulado</button>
            <button className="btn" disabled={busy || !meta.title} onClick={() => save(false)}>Salvar rascunho</button>
            <button className="btn btn-ghost" onClick={() => setItems(null)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Questões: importar arquivo e revisar rascunhos
// ---------------------------------------------------------------------------
export function AdminQuestions({ prova }: { prova?: string }) {
  const toast = useToast()
  const [status, setStatus] = useState(prova ? '' : 'rascunho')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const qs = new URLSearchParams({ page: String(page) })
  if (status) qs.set('status', status)
  if (search) qs.set('q', search)
  if (prova) qs.set('prior_exam_id', prova)
  const { data, reload } = useApi<{ total: number; questions: (FullQ & { subject: string; topic: string; source: string })[] }>(`/admin/questions?${qs}`)
  const subjects = useApi<{ subjects: { id: number; name: string }[] }>('/admin/subjects')
  const [file, setFile] = useState<File | null>(null)
  const [subj, setSubj] = useState('')
  const [publish, setPublish] = useState(false)
  const [busy, setBusy] = useState(false)
  async function importFile() {
    if (!file) return
    setBusy(true)
    const form = new FormData()
    form.append('file', file); form.append('subject_id', subj); form.append('publish', publish ? '1' : '0')
    try {
      const r = await api<{ created: number; duplicates: number; skipped: number; total: number }>('/admin/questions/import', { form })
      toast(`${r.created} importadas, ${r.duplicates} repetidas ignoradas${r.skipped ? `, ${r.skipped} sem matéria` : ''}.`)
      reload()
    } catch (e) { toast((e as Error).message, true) } finally { setBusy(false) }
  }
  const act = async (fn: () => Promise<unknown>) => { try { await fn(); reload() } catch (e) { toast((e as Error).message, true) } }
  return (
    <div className="page">
      <div className="page-head"><div><h1>Questões</h1><p>Importe listas prontas e revise o que está em rascunho.</p></div></div>
      <AdminNav here="/admin/questoes" />
      <section className="panel pad-lg stack" style={{ marginBottom: 24 }}>
        <h2>Importar CSV ou JSON</h2>
        <p className="small muted">Colunas aceitas: enunciado, A a E, gabarito, comentario, materia, assunto, banca, ano. Aceita também os arquivos do EstudaTI antigo. Repetidas são ignoradas.</p>
        <div className="row wrap">
          <input className="input" style={{ flex: 1, minWidth: 220 }} type="file" accept=".csv,.json,.txt" onChange={e => setFile(e.target.files?.[0] || null)} />
          <select className="select" style={{ width: 'auto' }} value={subj} onChange={e => setSubj(e.target.value)}><option value="">Matéria pela coluna do arquivo</option>{subjects.data?.subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select>
          <label className="row small"><input type="checkbox" checked={publish} onChange={e => setPublish(e.target.checked)} /> Publicar direto</label>
          <button className="btn btn-primary" disabled={!file || busy} onClick={importFile}>{busy ? 'Importando…' : 'Importar'}</button>
        </div>
      </section>
      <div className="row wrap" style={{ marginBottom: 12 }}>
        <div className="seg">{[['rascunho', 'Rascunhos'], ['publicada', 'Publicadas'], ['', 'Todas']].map(([v, l]) => <button key={v} aria-pressed={status === v} onClick={() => { setStatus(v); setPage(1) }}>{l}</button>)}</div>
        <input className="input" style={{ flex: 1, minWidth: 200 }} placeholder="Buscar no enunciado" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
        <span className="small muted">{data?.total ?? 0} questões</span>
      </div>
      <div className="panel">
        {data?.questions.length ? data.questions.map(x => (
          <div key={x.id} className="list-row" style={{ alignItems: 'flex-start' }}>
            <span style={{ flex: 1, minWidth: 0 }}>
              <span className="tiny muted">{x.subject}{x.topic ? `, ${x.topic}` : ''}{x.source ? `, ${x.source}` : ''}</span>
              <p className="small" style={{ marginTop: 2 }}>{x.statement.slice(0, 220)}{x.statement.length > 220 ? '…' : ''}</p>
              <p className="tiny muted">Gabarito: {x.answer || 'não definido'}</p>
            </span>
            <span className="row" style={{ gap: 6 }}>
              {x.status !== 'publicada' ? <button className="btn btn-sm btn-primary" disabled={!x.answer} onClick={() => act(() => api(`/admin/questions/${x.id}`, { method: 'PATCH', body: { status: 'publicada' } }))}>Publicar</button>
                : <button className="btn btn-sm" onClick={() => act(() => api(`/admin/questions/${x.id}`, { method: 'PATCH', body: { status: 'rascunho' } }))}>Despublicar</button>}
              <button className="btn btn-sm btn-ghost btn-danger" aria-label="Excluir" onClick={() => confirm('Excluir esta questão?') && act(() => api(`/admin/questions/${x.id}`, { method: 'DELETE' }))}><Icon name="trash" /></button>
            </span>
          </div>
        )) : <Empty title="Nada por aqui">{status === 'rascunho' ? 'Nenhuma questão aguardando revisão.' : 'Nenhuma questão encontrada.'}</Empty>}
      </div>
      {data && data.total > 30 && (
        <div className="row" style={{ justifyContent: 'center', marginTop: 16 }}>
          <button className="btn btn-sm" disabled={page === 1} onClick={() => setPage(page - 1)}>Anterior</button>
          <span className="small muted">Página {page} de {Math.ceil(data.total / 30)}</span>
          <button className="btn btn-sm" disabled={page * 30 >= data.total} onClick={() => setPage(page + 1)}>Próxima</button>
        </div>
      )}
    </div>
  )
}
