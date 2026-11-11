import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { api, getToken, go, match, onUnauthorized, queryParam, setToken, useRoute } from './lib'
import { Icon, PageLoading, ToastProvider } from './components/ui'
import { AuthPage, ChooseExam, Today, Trail } from './pages/Start'
import { QuestionsPage, ReviewPage, TopicPage } from './pages/Study'
import { Account, DiscursivaPage, Discursivas, ExamRun, Simulados, StatsPage } from './pages/Exams'
import { AdminEdital, AdminHome, AdminProva, AdminQuestions, AdminRole, AdminTopic } from './pages/Admin'

export type Enrollment = { id: number; role_id: number; exam_date: string | null; minutes_per_day: number; active: number; role: string; question_style: string; org: string; exam: string; banca: string }
export type Me = { user: { id: number; name: string; email: string; is_admin: boolean }; enrollments: Enrollment[]; active: Enrollment | null; ai: { enabled: boolean } }

const NAV: [string, string, string][] = [
  ['/hoje', 'Hoje', 'hoje'], ['/trilha', 'Trilha', 'trilha'], ['/questoes', 'Questões', 'questoes'],
  ['/simulados', 'Simulados', 'simulados'], ['/desempenho', 'Desempenho', 'desempenho'],
]

export default function App() {
  return <ToastProvider><Root /></ToastProvider>
}

function Root() {
  const path = useRoute()
  const [me, setMe] = useState<Me | null>(null)
  const [config, setConfig] = useState<{ has_users: boolean; signup: boolean } | null>(null)
  const [booting, setBooting] = useState(true)
  const [reviews, setReviews] = useState(0)

  const loadMe = useCallback(async () => {
    if (!getToken()) { setMe(null); setBooting(false); return }
    try { setMe(await api<Me>('/me')) } catch { setMe(null) } finally { setBooting(false) }
  }, [])
  useEffect(() => {
    api('/config').then(setConfig).catch(() => setConfig({ has_users: true, signup: true }))
    loadMe()
    return onUnauthorized(() => { setToken(''); setMe(null) })
  }, [loadMe])
  useEffect(() => {
    if (!me?.active) return
    api<{ reviews?: { total: number } }>('/today').then(d => setReviews(d.reviews?.total || 0)).catch(() => {})
  }, [me, path])

  if (booting) return <div className="main"><PageLoading /></div>
  if (!me) return <AuthPage config={config} onLogin={() => { setBooting(true); loadMe().then(() => go('/hoje')) }} />

  const needsExam = !me.active && !path.startsWith('/admin') && path !== '/conta'
  let page: ReactNode
  let m: Record<string, string> | null
  if (needsExam || path === '/concurso') page = <ChooseExam me={me} onDone={loadMe} />
  else if (path === '/' || path === '/hoje') page = <Today me={me} />
  else if (path === '/trilha') page = <Trail />
  else if ((m = match('/topico/:id', path))) page = <TopicPage key={m.id} id={Number(m.id)} />
  else if (path.startsWith('/questoes')) page = <QuestionsPage aiEnabled={me.ai.enabled} />
  else if (path === '/revisao') page = <ReviewPage aiEnabled={me.ai.enabled} />
  else if (path === '/simulados') page = <Simulados me={me} />
  else if ((m = match('/simulado/:id', path))) page = <ExamRun key={m.id} id={Number(m.id)} />
  else if (path === '/desempenho') page = <StatsPage />
  else if (path === '/discursivas') page = <Discursivas />
  else if ((m = match('/discursiva/:id', path))) page = <DiscursivaPage key={m.id} id={Number(m.id)} />
  else if (path === '/conta') page = <Account me={me} onChange={loadMe} />
  else if (me.user.is_admin && path === '/admin') page = <AdminHome />
  else if (me.user.is_admin && path === '/admin/edital') page = <AdminEdital />
  else if (me.user.is_admin && path === '/admin/prova') page = <AdminProva />
  else if (me.user.is_admin && path.startsWith('/admin/questoes')) page = <AdminQuestions key={path} prova={queryParam('prova')} />
  else if (me.user.is_admin && (m = match('/admin/cargo/:id', path))) page = <AdminRole key={m.id} id={Number(m.id)} />
  else if (me.user.is_admin && (m = match('/admin/topico/:id', path))) page = <AdminTopic key={m.id} id={Number(m.id)} />
  else page = <div className="page"><h1>Página não encontrada</h1><p style={{ marginTop: 12 }}><a href="#/hoje">Voltar para Hoje</a></p></div>

  const focus = path.startsWith('/simulado/')
  const current = (h: string) => (path === h || (h === '/hoje' && path === '/') || (h === '/trilha' && path.startsWith('/topico')) ? 'page' : undefined)
  return (
    <div className="shell" style={focus ? { gridTemplateColumns: '1fr' } : undefined}>
      {!focus && (
        <nav className="rail" aria-label="Principal">
          <a className="brand" href="#/hoje"><span className="brand-mark" />Estuda</a>
          {NAV.map(([h, l, i]) => <a key={h} className="nav-link" href={`#${h}`} aria-current={current(h)}><Icon name={i} />{l}</a>)}
          <a className="nav-link" href="#/revisao" aria-current={current('/revisao')}><Icon name="revisao" />Revisão{reviews > 0 && <span className="count">{reviews}</span>}</a>
          <a className="nav-link" href="#/discursivas" aria-current={current('/discursivas')}><Icon name="discursivas" />Discursivas</a>
          {me.user.is_admin && <><div className="rail-sep" /><a className="nav-link" href="#/admin" aria-current={path.startsWith('/admin') ? 'page' : undefined}><Icon name="admin" />Administração</a></>}
          <div className="rail-foot">
            <a href="#/conta" className="rail-goal" style={{ textDecoration: 'none', display: 'block' }}>
              <strong>{me.active?.role || 'Escolha um concurso'}</strong>{me.active?.org}
            </a>
          </div>
        </nav>
      )}
      <main className="main" id="conteudo">
        {!focus && (
          <div className="mobile-top">
            <a className="brand" href="#/hoje" style={{ padding: 0 }}><span className="brand-mark" />Estuda</a>
            <div className="row" style={{ gap: 4 }}>
              <a className="btn btn-ghost btn-sm" href="#/revisao" aria-label="Revisão"><Icon name="revisao" />{reviews > 0 && reviews}</a>
              {me.user.is_admin && <a className="btn btn-ghost btn-sm" href="#/admin" aria-label="Administração"><Icon name="admin" /></a>}
              <a className="btn btn-ghost btn-sm" href="#/conta" aria-label="Conta"><Icon name="user" /></a>
            </div>
          </div>
        )}
        {page}
      </main>
      {!focus && (
        <nav className="tabbar" aria-label="Principal">
          {NAV.map(([h, l, i]) => <a key={h} href={`#${h}`} aria-current={current(h)}><Icon name={i} />{l}</a>)}
        </nav>
      )}
    </div>
  )
}
