import { useState, type FormEvent } from 'react'
import { api, go, useApi } from '../lib'
import { ErrorBox, Icon, PageLoading, useToast } from '../components/ui'
import type { Me } from '../App'

type DiscoveryItem = {
  title: string; url: string; source: string; published_at: string
  verified: boolean; status: string
}
type Official = { label: string; url: string; detail: string }
type DiscoveryResponse = {
  query: string; uf: string; days: number; items: DiscoveryItem[]
  online: boolean; error: string; provider: string
  notice: string; official_sources: Official[]
}
type CatalogResponse = { roles: { id: number; name: string; org: string }[] }

const STATES: [string, string][] = [
  ['SP', 'São Paulo'], ['', 'Todo o Brasil'], ['MS', 'Mato Grosso do Sul'],
  ['MG', 'Minas Gerais'], ['PR', 'Paraná'], ['RJ', 'Rio de Janeiro'],
  ['GO', 'Goiás'], ['DF', 'Distrito Federal'], ['SC', 'Santa Catarina'],
  ['RS', 'Rio Grande do Sul'], ['ES', 'Espírito Santo'], ['BA', 'Bahia'],
  ['PE', 'Pernambuco'], ['CE', 'Ceará'], ['RN', 'Rio Grande do Norte'],
  ['PB', 'Paraíba'], ['AM', 'Amazonas'], ['PA', 'Pará'], ['MT', 'Mato Grosso'],
]

export function DiscoveryPage({ me }: { me: Me }) {
  const [term, setTerm] = useState('tecnologia da informação')
  const [uf, setUf] = useState('SP')
  const [days, setDays] = useState(30)
  const [query, setQuery] = useState({ q: 'tecnologia da informação', uf: 'SP', days: 30 })
  const [selected, setSelected] = useState<DiscoveryItem | null>(null)
  const [org, setOrg] = useState('')
  const [role, setRole] = useState('')
  const [copyFrom, setCopyFrom] = useState('')
  const [saving, setSaving] = useState(false)
  const toast = useToast()

  const address = '/discover?q=' + encodeURIComponent(query.q) +
    '&uf=' + encodeURIComponent(query.uf) + '&days=' + query.days
  const { data, loading, error, reload } = useApi<DiscoveryResponse>(address)
  const catalog = useApi<CatalogResponse>('/catalog')

  function search(e: FormEvent) {
    e.preventDefault()
    setSelected(null)
    setQuery({ q: term.trim() || 'tecnologia da informação', uf, days })
  }

  async function saveDraft(e: FormEvent) {
    e.preventDefault()
    if (!selected) return
    setSaving(true)
    try {
      const r = await api<{ role_id: number }>('/admin/discovered-draft', {
        body: {
          org, role, headline: selected.title, source_url: selected.url,
          copy_from: copyFrom ? Number(copyFrom) : null,
        },
      })
      toast('Rascunho criado. Confira o edital oficial e ajuste as matérias antes de publicar.')
      go('/admin/cargo/' + r.role_id)
    } catch (err) {
      toast((err as Error).message, true)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <p className="small muted">Busca externa de publicações</p>
          <h1>Descobrir concursos</h1>
          <p>Pesquise notícias recentes e depois confira o edital no órgão ou na banca.
            Esta ferramenta não confirma inscrições abertas nem extrai automaticamente as matérias.</p>
        </div>
        <a href="#/concurso" className="btn"><Icon name="trilha" /> Trilhas para estudar</a>
      </div>

      <form className="panel pad stack" onSubmit={search} style={{ marginBottom: 20 }}>
        <div className="row wrap" style={{ gap: 12 }}>
          <label className="field" style={{ flex: '3 1 220px' }}>
            <span>Órgão, cargo ou área</span>
            <input className="input" value={term} onChange={e => setTerm(e.target.value)}
              placeholder="Ex.: analista de TI, tribunal, informática" />
          </label>
          <label className="field" style={{ flex: '1 1 160px' }}>
            <span>Região</span>
            <select className="input" value={uf} onChange={e => setUf(e.target.value)}>
              {STATES.map(([id, name]) => <option value={id} key={id || 'br'}>{name}</option>)}
            </select>
          </label>
          <label className="field" style={{ flex: '1 1 160px' }}>
            <span>Período das notícias</span>
            <select className="input" value={days} onChange={e => setDays(Number(e.target.value))}>
              <option value={7}>Últimos 7 dias</option>
              <option value={30}>Últimos 30 dias</option>
              <option value={90}>Últimos 90 dias</option>
            </select>
          </label>
        </div>
        <div className="row wrap" style={{ gap: 10 }}>
          <button className="btn btn-primary" disabled={loading}>
            <Icon name="questoes" /> {loading ? 'Consultando…' : 'Pesquisar notícias'}
          </button>
          <span className="tiny muted">RSS público, sem créditos de IA.</span>
        </div>
      </form>

      <section className="panel pad" style={{ marginBottom: 20 }}>
        <strong>Atenção à origem das informações</strong>
        <p className="small muted" style={{ marginTop: 8 }}>
          {data?.notice || 'Notícias não são editais validados. Confirme vaga, regime, etapas, inscrição e prazo nos canais oficiais.'}
        </p>
      </section>

      {error && <ErrorBox message={error} onRetry={reload} />}
      {loading && !data && <PageLoading />}
      {data && <>
        <div className="row spread wrap" style={{ marginBottom: 10 }}>
          <h2>Publicações encontradas ({data.items.length})</h2>
          <span className="tiny muted">{data.provider}</span>
        </div>
        {!data.online && <div className="notice bad" style={{ marginBottom: 14 }}>{data.error}</div>}
        <div className="panel" style={{ marginBottom: 26 }}>
          {data.items.map(item => (
            <div className="list-row" key={item.url} style={{ alignItems: 'flex-start', gap: 12 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="small muted">
                  {item.source || 'Fonte não identificada'}
                  {item.published_at && ' · ' + new Date(item.published_at).toLocaleDateString('pt-BR')}
                </div>
                <strong style={{ display: 'block', marginTop: 5 }}>{item.title}</strong>
                <span className="tiny muted">Publicação não validada. Confira o órgão, o edital e a inscrição.</span>
                <div className="row wrap" style={{ marginTop: 10, gap: 8 }}>
                  <a className="btn btn-sm" href={item.url} target="_blank" rel="noopener noreferrer">
                    Abrir notícia ↗
                  </a>
                  {me.user.is_admin && <button className="btn btn-sm btn-ghost"
                    onClick={() => { setSelected(item); setOrg(''); setRole(''); setCopyFrom('') }}>
                    Preparar concurso (rascunho)
                  </button>}
                </div>
              </div>
            </div>
          ))}
          {!data.items.length && <div className="pad">
            <strong>Nenhuma notícia encontrada com esses filtros.</strong>
            <p className="small muted" style={{ marginTop: 8 }}>
              Amplie para 90 dias, pesquise por “concurso” ou selecione Todo o Brasil.
              Isso não significa que não existam editais abertos.
            </p>
          </div>}
        </div>
        <section className="panel pad stack" style={{ marginBottom: 24 }}>
          <h2>Fontes oficiais para confirmação</h2>
          {data.official_sources.map(src => <div key={src.url}>
            <a href={src.url} target="_blank" rel="noopener noreferrer">
              <strong>{src.label} ↗</strong>
            </a>
            <div className="small muted">{src.detail}</div>
          </div>)}
          <p className="tiny muted">Notícias são pistas de busca; o edital e comunicados oficiais prevalecem.</p>
        </section>
      </>}

      {selected && me.user.is_admin && <section className="panel pad-lg stack" style={{ marginTop: 20 }}>
        <div className="row spread wrap">
          <h2>Preparar trilha a partir da publicação</h2>
          <button className="btn btn-sm" onClick={() => setSelected(null)}>Cancelar</button>
        </div>
        <div className="notice">
          Este cadastro será um <strong>rascunho oculto dos alunos</strong>. A notícia não comprova
          a existência de edital, e as matérias copiadas de um modelo precisam ser confrontadas com o edital.
        </div>
        <p className="small muted"><strong>Notícia:</strong> {selected.title}</p>
        <form className="stack" onSubmit={saveDraft}>
          <label className="field"><span>Órgão oficial (confirme na fonte)</span>
            <input required className="input" value={org} onChange={e => setOrg(e.target.value)}
              placeholder="Ex.: Prefeitura de ... / Tribunal ..." />
          </label>
          <label className="field"><span>Cargo efetivo identificado no edital</span>
            <input required className="input" value={role} onChange={e => setRole(e.target.value)}
              placeholder="Ex.: Analista de Tecnologia da Informação" />
          </label>
          <label className="field"><span>Usar como base uma trilha existente (opcional)</span>
            <select className="input" value={copyFrom} onChange={e => setCopyFrom(e.target.value)}>
              <option value="">Criar sem matérias; configurar depois</option>
              {(catalog.data?.roles || []).map(r =>
                <option value={r.id} key={r.id}>{r.name} — {r.org}</option>)}
            </select>
          </label>
          <div><button className="btn btn-primary" disabled={saving || !org.trim() || !role.trim()}>
            {saving ? 'Salvando…' : 'Criar rascunho e revisar matérias'}
          </button></div>
        </form>
      </section>}
    </div>
  )
}
