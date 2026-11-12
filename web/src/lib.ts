import { useCallback, useEffect, useRef, useState } from 'react'

// ---------------------------------------------------------------------------
// API
// ---------------------------------------------------------------------------
const TOKEN_KEY = 'estuda.token'

export function getToken(): string {
  try { return localStorage.getItem(TOKEN_KEY) || '' } catch { return '' }
}
export function setToken(t: string) {
  try { t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY) } catch { /* sem armazenamento */ }
}

export class ApiError extends Error {
  status: number
  constructor(status: number, message: string) { super(message); this.status = status }
}

type Listener = () => void
const unauthorizedListeners = new Set<Listener>()
export function onUnauthorized(fn: Listener) { unauthorizedListeners.add(fn); return () => { unauthorizedListeners.delete(fn) } }

export async function api<T = any>(path: string, opts: { method?: string; body?: unknown; form?: FormData } = {}): Promise<T> {
  const headers: Record<string, string> = {}
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`
  let body: BodyInit | undefined
  if (opts.form) body = opts.form
  else if (opts.body !== undefined) { headers['Content-Type'] = 'application/json'; body = JSON.stringify(opts.body) }
  let res: Response
  try {
    res = await fetch(`/api${path}`, { method: opts.method || (body ? 'POST' : 'GET'), headers, body })
  } catch {
    throw new ApiError(0, 'Sem conexão com o servidor. Verifique sua internet e tente de novo.')
  }
  let data: any = null
  try { data = await res.json() } catch { data = null }
  if (!res.ok) {
    if (res.status === 401 && token) unauthorizedListeners.forEach(fn => fn())
    throw new ApiError(res.status, data?.error || `Erro ${res.status}.`)
  }
  return data as T
}

/** Carrega dados e expõe recarregar; mantém os dados anteriores enquanto recarrega (sem piscar). */
export function useApi<T = any>(path: string | null, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(!!path)
  const seq = useRef(0)
  const load = useCallback(async () => {
    if (!path) { setLoading(false); return }
    const my = ++seq.current
    setLoading(true)
    try {
      const d = await api<T>(path)
      if (my === seq.current) { setData(d); setError('') }
    } catch (e) {
      if (my === seq.current) setError((e as Error).message)
    } finally {
      if (my === seq.current) setLoading(false)
    }
  }, [path])
  useEffect(() => { load() }, [load, ...deps])
  return { data, error, loading, reload: load, setData }
}

// ---------------------------------------------------------------------------
// Roteador por hash (#/caminho). Funciona em qualquer hospedagem, sem configuração.
// ---------------------------------------------------------------------------
export function currentPath(): string {
  const h = window.location.hash.replace(/^#/, '')
  return h.startsWith('/') ? h : '/'
}
export function useRoute(): string {
  const [path, setPath] = useState(currentPath())
  useEffect(() => {
    const on = () => { setPath(currentPath()); window.scrollTo({ top: 0 }) }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return path
}
export function go(path: string) { window.location.hash = path }
export function match(pattern: string, path: string): Record<string, string> | null {
  const p = pattern.split('/'), a = path.split('?')[0].split('/')
  if (p.length !== a.length) return null
  const out: Record<string, string> = {}
  for (let i = 0; i < p.length; i++) {
    if (p[i].startsWith(':')) out[p[i].slice(1)] = decodeURIComponent(a[i])
    else if (p[i] !== a[i]) return null
  }
  return out
}
export function queryParam(name: string): string {
  const q = currentPath().split('?')[1] || ''
  return new URLSearchParams(q).get(name) || ''
}

// ---------------------------------------------------------------------------
// Markdown seguro e sem dependências: todo HTML do texto é escapado antes de formatar.
// Suporta títulos, parágrafos, negrito, itálico, código, listas, citações, tabelas, links e linhas.
// ---------------------------------------------------------------------------
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function inline(t: string): string {
  const codes: string[] = []
  let s = esc(t).replace(/`([^`]+)`/g, (_m, c) => { codes.push(c); return `\u0000${codes.length - 1}\u0000` })
  s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
  s = s.replace(/\*\*([^*]+?)\*\*/g, '<strong>$1</strong>').replace(/__([^_]+?)__/g, '<strong>$1</strong>')
  s = s.replace(/(^|[^*\w])\*([^*\s][^*]*?)\*(?!\w)/g, '$1<em>$2</em>')
  s = s.replace(/==([^=]+)==/g, '<mark>$1</mark>')
  return s.replace(/\u0000(\d+)\u0000/g, (_m, i) => `<code>${codes[Number(i)]}</code>`)
}

export function md(text: string): string {
  const lines = (text || '').replace(/\r\n?/g, '\n').split('\n')
  const out: string[] = []
  let i = 0
  const isTableSep = (l: string) => /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(l)
  const cells = (l: string) => l.trim().replace(/^\||\|$/g, '').split('|').map(c => inline(c.trim()))
  while (i < lines.length) {
    const line = lines[i]
    if (!line.trim()) { i++; continue }
    const fence = line.match(/^\s*```/)
    if (fence) {
      const buf: string[] = []
      i++
      while (i < lines.length && !/^\s*```/.test(lines[i])) buf.push(lines[i++])
      i++
      out.push(`<pre><code>${esc(buf.join('\n'))}</code></pre>`)
      continue
    }
    const h = line.match(/^(#{1,6})\s+(.*)$/)
    if (h) { const n = Math.min(4, Math.max(2, h[1].length)); out.push(`<h${n}>${inline(h[2].replace(/#+\s*$/, ''))}</h${n}>`); i++; continue }
    if (/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/.test(line)) { out.push('<hr>'); i++; continue }
    if (line.includes('|') && i + 1 < lines.length && isTableSep(lines[i + 1])) {
      const head = cells(line)
      i += 2
      const rows: string[][] = []
      while (i < lines.length && lines[i].includes('|') && lines[i].trim()) rows.push(cells(lines[i++]))
      out.push(`<table><thead><tr>${head.map(c => `<th>${c}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`)
      continue
    }
    if (/^\s*>/.test(line)) {
      const buf: string[] = []
      while (i < lines.length && /^\s*>/.test(lines[i])) buf.push(lines[i++].replace(/^\s*>\s?/, ''))
      out.push(`<blockquote>${md(buf.join('\n'))}</blockquote>`)
      continue
    }
    const li = line.match(/^\s*([-*+]|\d+[.)])\s+(.*)$/)
    if (li) {
      const ordered = /\d/.test(li[1])
      const items: string[] = []
      while (i < lines.length) {
        const m = lines[i].match(/^\s*([-*+]|\d+[.)])\s+(.*)$/)
        if (m && /\d/.test(m[1]) === ordered) { items.push(m[2]); i++ }
        else if (lines[i].trim() && /^\s{2,}\S/.test(lines[i]) && items.length) { items[items.length - 1] += ' ' + lines[i].trim(); i++ }
        else break
      }
      const tag = ordered ? 'ol' : 'ul'
      out.push(`<${tag}>${items.map(t => `<li>${inline(t)}</li>`).join('')}</${tag}>`)
      continue
    }
    const buf: string[] = []
    while (i < lines.length && lines[i].trim() && !/^(#{1,6}\s|\s*```|\s*>|\s*([-*+]|\d+[.)])\s)/.test(lines[i])) buf.push(lines[i++])
    if (!buf.length) { buf.push(lines[i++]) }
    out.push(`<p>${buf.map(inline).join('<br>')}</p>`)
  }
  return out.join('\n')
}

// ---------------------------------------------------------------------------
// Formatação
// ---------------------------------------------------------------------------
export const pct = (v: number | null | undefined) => (v === null || v === undefined ? '—' : `${Math.round(v * 100)}%`)
export function plural(n: number, one: string, many: string) { return `${n} ${n === 1 ? one : many}` }
export function fmtDate(iso?: string | null) {
  if (!iso) return ''
  const d = new Date(iso.length === 10 ? iso + 'T12:00:00' : iso)
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
}
export function fmtMinutes(m: number) {
  if (!m) return '0 min'
  const h = Math.floor(m / 60), r = m % 60
  return h ? `${h} h${r ? ` ${r} min` : ''}` : `${r} min`
}
export const LETTERS = ['A', 'B', 'C', 'D', 'E']
export const STATUS_LABEL: Record<string, string> = {
  novo: 'Não iniciado', estudando: 'Estudando', dominado: 'Dominado', reforco: 'Precisa de reforço',
}
