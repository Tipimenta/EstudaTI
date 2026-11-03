import { useEffect, useState } from 'react'
import PriorExams from './PriorExams'
import OfficialExams from './OfficialExams'
import { api, post, type Subject } from './api'
import { BookOpen, ExternalLink, FileQuestion, AlertCircle, CloudUpload, CheckCircle2, FileText, Search, RefreshCw } from 'lucide-react'

type Resource = { category:string; title:string; url:string;description:string;source:string }
type Candidate = {number:number;page:number;question:string;options:{letter:string;text:string}[];confidence:string;correct:null}
type Extract = {pages:number;chars:number;candidates:Candidate[];warning:string;page_samples:{page:number;text:string}[]}
type EditorCandidate = Candidate & {selected:boolean;answer:string;explanation:string}
const errorMessage=(e:unknown)=>e instanceof Error?e.message:'Erro inesperado.'

export default function StudyLibrary(){
 const [resources,setResources]=useState<Resource[]>([]);const [category,setCategory]=useState('');const [filter,setFilter]=useState('')
 const [subjects,setSubjects]=useState<Subject[]>([]);const [subject,setSubject]=useState('RED')
 const [file,setFile]=useState<File|null>(null);const [extract,setExtract]=useState<Extract|null>(null);const [candidates,setCandidates]=useState<EditorCandidate[]>([])
 const [board,setBoard]=useState('FGV');const [exam,setExam]=useState('');const [year,setYear]=useState('2024');const [url,setUrl]=useState('')
 const [authorized,setAuthorized]=useState(false);const [busy,setBusy]=useState(false);const [message,setMessage]=useState('');const [error,setError]=useState('')
 useEffect(()=>{api<{items:Resource[]}>('/resources').then(x=>setResources(x.items)).catch(e=>setError(errorMessage(e)));api<Subject[]>('/subjects').then(setSubjects).catch(e=>setError(errorMessage(e)))},[])
 const selected=candidates.filter(c=>c.selected&&c.answer&&c.explanation.trim().length>=10)
 async function analyze(){if(!file)return;setBusy(true);setError('');setMessage('');try{
  const data=new FormData();data.append('file',file)
  const response=await fetch('/api/provas/extrair',{method:'POST',credentials:'include',body:data})
  const json=await response.json();if(!response.ok)throw new Error(json.detail||'Erro ao analisar PDF')
  const result=json as Extract;setExtract(result);setCandidates(result.candidates.map(x=>({...x,selected:false,answer:'',explanation:''})))
  setMessage(`Leitura concluída: ${result.candidates.length} possíveis questões encontradas. Nenhuma tem gabarito validado.`)
 }catch(e){setError(errorMessage(e))}finally{setBusy(false)}}
 function update(n:number,patch:Partial<EditorCandidate>){setCandidates(items=>items.map((item,index)=>index===n?{...item,...patch}:item))}
 async function importSelected(){if(!authorized){setError('Confirme que você tem permissão para utilizar este material.');return}
 if(!/^\d{4}$/.test(year)||!url.startsWith('https://')||!board.trim()||!exam.trim()){setError('Informe banca, prova, ano e link HTTPS da fonte oficial.');return}
 setBusy(true);setMessage('');setError('')
 try{const items=selected.map(x=>{
  const opts:Record<string,string>={};x.options.forEach((o,index)=>opts['option_'+'abcde'[index]]=o.text)
  return {subject_code:subject,question:x.question,...opts,correct:String.fromCharCode(65+x.options.findIndex(o=>o.letter===x.answer)),explanation:x.explanation,
   board,exam,year,origin:'oficial',question_number:String(x.number),source_url:url,
   license_note:'Importação pessoal com revisão manual. Verificar autorização e versão definitiva da prova/gabarito.'}
 })
 const result=await post<{imported:number;duplicates:number;similar_count?:number;errors_count:number;errors:{row:number;error:string}[]}>('/questions/import',{questions:items})
 setMessage(`${result.imported} importadas como RASCUNHO; ${result.duplicates} duplicatas descartadas; ${result.similar_count??0} semelhantes a conferir e ${result.errors_count} rejeitadas. Revise-as no Banco de questões antes de liberar.`)
 if(result.errors_count)setError(result.errors.slice(0,4).map(e=>`Linha ${e.row}: ${e.error}`).join(' | '))
 }catch(e){setError(errorMessage(e))}finally{setBusy(false)}}
 const filtered=resources.filter(x=>(!category||x.category===category)&&`${x.title} ${x.description} ${x.source}`.toLowerCase().includes(filter.toLowerCase()))
 return <div className="fade space-y-8">
  <header><p className="mb-2 text-xs font-bold uppercase tracking-[.20em] text-emerald-300">Base confiável para estudar</p><h1 className="text-3xl font-bold">Provas anteriores e biblioteca</h1><p className="mt-3 max-w-3xl text-sm leading-6 muted">Consulte provas por concurso, banca, ano e área de TI. A biblioteca também oferece referências técnicas e importação assistida de PDFs; os gabaritos precisam ser conferidos.</p></header>
  {error&&<div className="rounded-xl border border-rose-400/30 bg-rose-400/10 p-4 text-sm text-rose-200"><AlertCircle className="mr-2 inline" size={16}/>{error}</div>}
  {message&&<div className="rounded-xl border border-emerald-400/25 bg-emerald-400/10 p-4 text-sm text-emerald-200"><CheckCircle2 className="mr-2 inline" size={16}/>{message}</div>}
  <OfficialExams/>
  <PriorExams/>
  <section className="panel p-5 sm:p-7"><div className="mb-5 flex items-center gap-3"><BookOpen size={22} className="text-emerald-300"/><h2 className="text-xl font-bold">Fontes oficiais e materiais abertos</h2><span className="ml-auto badge bg-slate-700/50 text-slate-300">{resources.length} links</span></div>
   <div className="mb-5 grid gap-3 md:grid-cols-[1fr_260px]"><div className="relative"><Search className="absolute left-3 top-3.5 text-slate-400" size={17}/><input className="field pl-10" placeholder="Buscar fonte, tema ou órgão" value={filter} onChange={e=>setFilter(e.target.value)}/></div><select className="field" value={category} onChange={e=>setCategory(e.target.value)}><option value="">Todas as categorias</option>{Array.from(new Set(resources.map(x=>x.category))).map(c=><option key={c}>{c}</option>)}</select></div>
   <div className="grid gap-3 lg:grid-cols-2">{filtered.map(x=><a key={x.url} href={x.url} target="_blank" rel="noopener noreferrer" className="block rounded-2xl border border-white/10 bg-slate-900/30 p-4 hover:border-emerald-400/40"><div className="flex items-center justify-between gap-2"><span className="badge bg-emerald-400/10 text-emerald-200">{x.category}</span><ExternalLink size={15} className="text-slate-400"/></div><h3 className="mt-3 font-semibold text-white">{x.title}</h3><p className="mt-2 text-sm leading-5 muted">{x.description}</p><p className="mt-2 text-xs text-slate-500">Fonte: {x.source}</p></a>)}</div>
   <p className="mt-5 text-xs leading-5 text-amber-200">A Biblioteca fornece links, não baixa automaticamente conteúdo protegido por direitos autorais. Confira condições e eventuais alterações dos sites.</p>
  </section>
  <section className="panel p-5 sm:p-7"><div className="flex items-center gap-3"><FileQuestion size={22} className="text-emerald-300"/><div><h2 className="text-xl font-bold">Assistente de importação de prova PDF</h2><p className="text-xs muted">Detecta possíveis enunciados e alternativas; exige conferência humana e gabarito definitivo.</p></div></div>
   <div className="mt-5 grid gap-4 md:grid-cols-2"><label className="cursor-pointer rounded-xl border border-dashed border-emerald-400/30 bg-emerald-400/5 p-5 text-center"><CloudUpload className="mx-auto mb-2 text-emerald-300"/><span className="text-sm">{file?file.name:'Selecionar PDF de prova (até 12 MB)'}</span><input type="file" accept=".pdf,application/pdf" className="hidden" onChange={e=>{setFile(e.currentTarget.files?.[0]||null);setExtract(null);setCandidates([])}}/></label><div className="flex items-center"><button className="btn btn-primary w-full" disabled={!file||busy} onClick={analyze}><FileText size={16}/>{busy?'Analisando...':'Identificar questões no PDF'}</button></div></div>
   {extract&&<><div className="mt-5 rounded-xl bg-slate-900/60 p-4 text-sm"><p>{extract.pages} páginas · {extract.chars.toLocaleString('pt-BR')} caracteres · {candidates.length} possíveis questões</p><p className="mt-2 text-xs leading-5 text-amber-200">{extract.warning}</p></div>
    <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3"><label className="text-xs text-slate-300">Banca<input className="field mt-1" value={board} onChange={e=>setBoard(e.target.value)}/></label><label className="text-xs text-slate-300">Concurso / especialidade<input className="field mt-1" value={exam} onChange={e=>setExam(e.target.value)} placeholder="Dataprev — Segurança"/></label><label className="text-xs text-slate-300">Ano<input className="field mt-1" value={year} onChange={e=>setYear(e.target.value)} inputMode="numeric"/></label><label className="text-xs text-slate-300 md:col-span-2">URL oficial do PDF / concurso<input className="field mt-1" value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://..."/></label><label className="text-xs text-slate-300">Matéria<select className="field mt-1" value={subject} onChange={e=>setSubject(e.target.value)}>{subjects.map(s=><option key={s.id} value={s.code}>{s.name}</option>)}</select></label></div>
    <div className="mt-6 max-h-[650px] space-y-4 overflow-y-auto pr-1">{candidates.map((x,index)=><article key={`${x.page}-${index}`} className="rounded-xl border border-white/10 bg-slate-900/40 p-4"><div className="flex items-center justify-between gap-2"><label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={x.selected} onChange={e=>update(index,{selected:e.target.checked})}/> Questão {x.number} · página {x.page}</label><span className="text-[11px] text-amber-200">Não validada</span></div><p className="mt-3 max-h-48 overflow-auto whitespace-pre-wrap text-sm leading-6 text-slate-200">{x.question}</p><div className="mt-3 space-y-2 text-xs text-slate-300">{x.options.map(o=><div key={o.letter}><b>{o.letter}.</b> {o.text.slice(0,380)}</div>)}</div><div className="mt-4 grid gap-3 sm:grid-cols-[140px_1fr]"><label className="text-xs text-slate-300">Gabarito definitivo<select className="field mt-1" value={x.answer} onChange={e=>update(index,{answer:e.target.value})}><option value="">Não conferido</option>{x.options.map(o=><option key={o.letter}>{o.letter}</option>)}</select></label><label className="text-xs text-slate-300">Explicação validada<input className="field mt-1" value={x.explanation} onChange={e=>update(index,{explanation:e.target.value})} placeholder="Explique o fundamento da alternativa correta"/></label></div></article>)}</div>
    {candidates.length===0&&<p className="mt-5 text-sm text-amber-200">Este layout de prova não foi reconhecido. Use o extrator de texto local e importe por CSV/JSON.</p>}
    <label className="mt-5 flex items-start gap-3 text-sm text-slate-300"><input type="checkbox" checked={authorized} onChange={e=>setAuthorized(e.target.checked)} className="mt-1"/> Confirmo que tenho permissão para uso pessoal das questões e que conferi os gabaritos definitivos das selecionadas.</label>
    <button onClick={importSelected} disabled={busy||selected.length===0||!authorized} className="btn btn-primary mt-4"><RefreshCw size={16}/> Importar {selected.length} conferida(s) como rascunho</button>
   </>}
  </section>
 </div>
}
