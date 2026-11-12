import { useMemo, useState } from 'react'
import { useApi } from '../lib'
import { ErrorBox, PageLoading } from '../components/ui'

type TopicAudit = {
  id: number; subject: string; topic: string; words: number
  questions: number; with_rationales: number; flashcards: number
  deepened: boolean; issues: string[]; pending: boolean
}
type Audit = {
  total: number; with_lesson: number; deepened: number
  question_total: number; rationale_total: number; pending: number
  disclaimer: string; topics: TopicAudit[]
}

export function ContentQualityPage() {
  const { data, loading, error, reload } = useApi<Audit>('/admin/content-quality')
  const [subject, setSubject] = useState('')
  const [term, setTerm] = useState('')
  const [pendingOnly, setPendingOnly] = useState(true)
  const subjects = useMemo(
    () => [...new Set((data?.topics || []).map(x => x.subject))].sort(),
    [data]
  )
  const filtered = useMemo(() => (data?.topics || []).filter(x =>
    (!subject || x.subject === subject) &&
    (!pendingOnly || x.pending) &&
    (!term.trim() || (x.subject + ' ' + x.topic).toLowerCase().includes(term.trim().toLowerCase()))
  ), [data, subject, pendingOnly, term])

  if (loading && !data) return <PageLoading />
  if (error) return <div className="page"><ErrorBox message={error} onRetry={reload} /></div>
  if (!data) return null
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <a href="#/admin" className="small">← Administração</a>
          <h1 style={{ marginTop: 6 }}>Qualidade do conteúdo</h1>
          <p>Acompanhe o que ainda falta para transformar as aulas do Estuda em material minucioso.</p>
        </div>
        <button className="btn btn-sm" onClick={reload}>Atualizar diagnóstico</button>
      </div>

      <div className="row wrap" style={{ gap: 26, margin: '18px 0 26px' }}>
        {[
          ['Tópicos', data.total], ['Com aula', data.with_lesson],
          ['Com guia minucioso adicional', data.deepened],
          ['Precisam de revisão', data.pending],
          ['Questões', data.question_total],
          ['Questões com justificativas individuais', data.rationale_total],
        ].map(([name, value]) => (
          <div key={String(name)}>
            <div className="big-num" style={{ fontSize: '1.6rem' }}>{value}</div>
            <div className="small muted">{name}</div>
          </div>
        ))}
      </div>

      <div className="notice" style={{ marginBottom: 22 }}>
        <strong>Como interpretar:</strong> texto curto, poucas questões e falta de justificativas
        são indícios de trabalho pendente, não uma prova automática de aula ruim.
        Uma aula com guia também precisa de conferência factual e pedagógica.
      </div>

      <div className="panel pad" style={{ marginBottom: 18 }}>
        <div className="row wrap" style={{ gap: 12 }}>
          <label className="field" style={{ flex: '1 1 230px' }}>
            <span>Matéria</span>
            <select className="input" value={subject} onChange={e => setSubject(e.target.value)}>
              <option value="">Todas as matérias</option>
              {subjects.map(name => <option value={name} key={name}>{name}</option>)}
            </select>
          </label>
          <label className="field" style={{ flex: '2 1 270px' }}>
            <span>Localizar tópico</span>
            <input className="input" value={term} onChange={e => setTerm(e.target.value)}
              placeholder="Ex.: subnetting, crase, LGPD" />
          </label>
        </div>
        <label className="row small" style={{ gap: 8, marginTop: 14 }}>
          <input type="checkbox" checked={pendingOnly} onChange={e => setPendingOnly(e.target.checked)} />
          Mostrar apenas tópicos com pendências
        </label>
        <p className="small muted" style={{ marginTop: 10 }}>
          {filtered.length} tópico(s) encontrados — priorizados pela quantidade de lacunas detectadas.
        </p>
      </div>

      <div className="panel scroll-x">
        <table className="table">
          <thead>
            <tr><th>Matéria / tópico</th><th>Palavras</th><th>Questões</th><th>Flashcards</th><th>Diagnóstico</th><th>Ação</th></tr>
          </thead>
          <tbody>
            {filtered.slice(0, 350).map(row => (
              <tr key={row.id}>
                <td style={{ minWidth: 260 }}>
                  <strong>{row.topic}</strong><br />
                  <span className="tiny muted">{row.subject}</span>
                  {row.deepened && <><br /><span className="chip ok">Guia aprofundado</span></>}
                </td>
                <td>{row.words.toLocaleString('pt-BR')}</td>
                <td>{row.questions} <span className="tiny muted">({row.with_rationales} comentadas)</span></td>
                <td>{row.flashcards}</td>
                <td style={{ minWidth: 230 }}>
                  {row.issues.length ? row.issues.map(issue =>
                    <div key={issue} className="small muted">• {issue}</div>
                  ) : <span className="chip ok">Sem alertas estruturais</span>}
                </td>
                <td><a href={`#/admin/topico/${row.id}`} className="btn btn-sm">Editar</a></td>
              </tr>
            ))}
            {!filtered.length && <tr><td colSpan={6} className="muted">Nada encontrado com esses filtros.</td></tr>}
          </tbody>
        </table>
      </div>
      <p className="tiny muted" style={{ marginTop: 16 }}>{data.disclaimer}</p>
    </div>
  )
}
