import { useEffect,useState, type FormEvent } from 'react'
import { AlertTriangle, CheckCircle2, ClipboardCheck, ExternalLink, Save, ShieldCheck } from 'lucide-react'
import {api,patch} from './api'

type Quality={content_checked:number;answer_checked:number;definitive_key:number;page_number:number|null;key_url:string;review_note:string}
type Detail={quality:Quality|null;audit:{id:number;action:string;created_at:string}[];question:{id:number;source_url:string;question_number:string;review_status:string}}
const initial={content_checked:false,answer_checked:false,definitive_key:false,page_number:'',key_url:'',review_note:''}
export default function OfficialQuality({questionId,onSave}:{questionId:number;onSave:()=>Promise<void>}){
 const [detail,setDetail]=useState<Detail|null>(null),[form,setForm]=useState(initial),[busy,setBusy]=useState(false),[error,setError]=useState(''),[message,setMessage]=useState('')
 useEffect(()=>{setError('');api<Detail>(`/questions/${questionId}/quality`).then(d=>{setDetail(d);if(d.quality)setForm({content_checked:!!d.quality.content_checked,answer_checked:!!d.quality.answer_checked,definitive_key:!!d.quality.definitive_key,page_number:d.quality.page_number?String(d.quality.page_number):'',key_url:d.quality.key_url||'',review_note:d.quality.review_note||''})}).catch(e=>setError((e as Error).message))},[questionId])
 async function save(e:FormEvent){e.preventDefault();setBusy(true);setError('');setMessage('');try{
  await patch(`/questions/${questionId}/quality`,{...form,page_number:form.page_number?Number(form.page_number):null})
  setMessage('Conferência registrada com histórico. Se ambas as partes e o gabarito definitivo foram confirmados, agora você pode liberar a questão no catálogo.');await onSave()
  const d=await api<Detail>(`/questions/${questionId}/quality`);setDetail(d)
 }catch(e){setError((e as Error).message)}finally{setBusy(false)}}
 return <form onSubmit={save} className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-300/5 p-4 sm:p-5"><h4 className="flex items-center gap-2 text-sm font-bold text-white"><ClipboardCheck size={18} className="text-amber-300"/>Conferência de questão oficial</h4><p className="mt-2 text-xs leading-5 text-slate-300">Conferência humana declarada: este formulário não compara automaticamente o documento original nem atesta autenticidade do gabarito. Compare número, prova/cargo, página, todas as alternativas e o gabarito definitivo antes de marcar.</p>
 {detail?.question?.source_url&&<a href={detail.question.source_url} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 break-all text-xs text-sky-300 underline"><ExternalLink size={13}/> Abrir fonte do caderno (questão {detail.question.question_number||'sem número'})</a>}
 <div className="mt-4 space-y-3">{([
 ['content_checked','Conferi o enunciado, número e alternativas com o caderno correspondente.'],
 ['answer_checked','Conferi a letra do gabarito para esse cargo e tipo de prova.'],
 ['definitive_key','O gabarito consultado é definitivo, incluindo possíveis anulações.']
 ] as [keyof Pick<typeof form,'content_checked'|'answer_checked'|'definitive_key'>,string][]).map(([field,label])=><label key={field} className="flex items-start gap-3 text-xs leading-5 text-slate-200"><input type="checkbox" className="mt-1" checked={form[field]} onChange={e=>setForm(v=>({...v,[field]:e.target.checked}))}/>{label}</label>)}</div>
 <div className="mt-4 grid gap-3 md:grid-cols-2"><label className="text-xs text-slate-300">Página no caderno<input className="field mt-1" type="number" min={1} max={10000} value={form.page_number} onChange={e=>setForm(v=>({...v,page_number:e.target.value}))} placeholder="Ex.: 14"/></label><label className="text-xs text-slate-300">URL HTTPS do gabarito definitivo<input className="field mt-1" type="url" value={form.key_url} onChange={e=>setForm(v=>({...v,key_url:e.target.value}))} placeholder="https://banca.../gabarito.pdf"/></label></div>
 <label className="mt-3 block text-xs text-slate-300">Observação da conferência<textarea className="field mt-1 min-h-20" maxLength={2000} value={form.review_note} onChange={e=>setForm(v=>({...v,review_note:e.target.value}))} placeholder="Ex.: cargo específico, caderno tipo 2, retificação do gabarito de 20/10..."/></label>
 {error&&<p className="mt-3 flex items-center gap-1 text-xs text-rose-200"><AlertTriangle size={14}/>{error}</p>}{message&&<p className="mt-3 flex items-center gap-1 text-xs text-emerald-200"><CheckCircle2 size={14}/>{message}</p>}
 <button type="submit" disabled={busy} className="btn btn-primary mt-4 text-xs"><Save size={14}/>{busy?'Salvando...':'Salvar conferência'}</button>
 {detail?.audit?.length?<p className="mt-3 flex items-center gap-2 text-xs text-slate-400"><ShieldCheck size={14}/> {detail.audit.length} evento(s) recentes no histórico de auditoria.</p>:null}
 </form>
}
