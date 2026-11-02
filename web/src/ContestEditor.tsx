import {useEffect,useState,type FormEvent} from 'react'
import {FilePlus2, Save, X} from 'lucide-react'
import {patch,post,type Contest} from './api'

const EMPTY={name:'',position:'',location:'',salary:'',registration_deadline:'',url:'',notes:'',priority:3,active:true}
type FormState=typeof EMPTY
export default function ContestEditor({items,onSaved}:{items:Contest[],onSaved:()=>Promise<void>}){
 const [show,setShow]=useState(false),[editing,setEditing]=useState(0),[form,setForm]=useState<FormState>(EMPTY),[error,setError]=useState(''),[busy,setBusy]=useState(false),[success,setSuccess]=useState('')
 useEffect(()=>{if(editing){const found=items.find(x=>x.id===editing);if(found)setForm({name:found.name,position:found.position,location:found.location,salary:found.salary?.toString()||'',registration_deadline:found.registration_deadline||'',url:found.url,notes:found.notes||'',priority:found.priority||3,active:Boolean(found.active)})}else{setForm(EMPTY)}},[editing,items])
 function setField<K extends keyof FormState>(key:K,value:FormState[K]){setForm(f=>({...f,[key]:value}))}
 async function save(e:FormEvent){e.preventDefault();setBusy(true);setError('');setSuccess('')
  try{const payload={...form,salary:form.salary?Number(form.salary):null,registration_deadline:form.registration_deadline||null}
   if(editing)await patch(`/contests/${editing}`,payload);else await post('/contests',payload)
   setSuccess('Concurso salvo. Confira a fonte antes de tomar decisões.');await onSaved();setShow(false);setEditing(0)
  }catch(e){setError((e as Error).message)}finally{setBusy(false)}
 }
 return <div className="panel mb-6 p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="font-bold text-white">Gerenciar metas e fontes oficiais</h3><p className="mt-1 text-xs muted">Adicione concursos ou atualize dados confirmados no edital.</p></div><button className="btn btn-secondary text-xs" onClick={()=>{setShow(x=>!x);setEditing(0);setError('');setSuccess('')}}>{show?<X size={15}/>:<FilePlus2 size={15}/>} {show?'Fechar':'Adicionar / editar concurso'}</button></div>
  {success&&<p className="mt-3 text-sm text-emerald-300">{success}</p>}
  {show&&<form onSubmit={save} className="mt-6 border-t border-white/10 pt-5"><label className="mb-4 block text-xs font-semibold text-slate-300">Alterar concurso existente<select className="field mt-2" value={editing} onChange={e=>setEditing(Number(e.target.value))}><option value={0}>Criar novo concurso</option>{items.map(c=><option key={c.id} value={c.id}>{c.name} — {c.position}</option>)}</select></label>
   <div className="grid gap-4 sm:grid-cols-2">{([
    ['name','Órgão / concurso'],['position','Cargo / especialidade'],['location','Cidade de lotação'],['salary','Salário-base bruto (opcional)'],['registration_deadline','Prazo inscrição AAAA-MM-DD (opcional)'],['url','Link HTTPS da fonte oficial']
   ] as [keyof FormState,string][]).map(([field,title])=><label key={field} className="text-xs font-semibold text-slate-300">{title}<input required={['name','position','location','url'].includes(field)} type={field==='salary'?'number':'text'} step={field==='salary'?'0.01':undefined} value={String(form[field])} onChange={e=>setField(field,e.target.value as never)} className="field mt-2"/></label>)}
    <label className="text-xs font-semibold text-slate-300">Prioridade<select className="field mt-2" value={form.priority} onChange={e=>setField('priority',Number(e.target.value))}>{[1,2,3,4,5].map(x=><option key={x} value={x}>{x} {x===1?'(mais alta)':''}</option>)}</select></label>
    <label className="flex items-center gap-2 text-xs text-slate-300"><input type="checkbox" checked={form.active} onChange={e=>setField('active',e.target.checked)}/> Monitorar fonte de forma periódica</label>
   </div><label className="mt-4 block text-xs font-semibold text-slate-300">Observações / verificação<textarea className="field mt-2 min-h-20" value={form.notes} onChange={e=>setField('notes',e.target.value)} /></label>
   {error&&<p className="mt-3 text-xs text-rose-300">{error}</p>}
   <p className="mt-3 text-xs text-amber-200/90">Ao editar o endereço da fonte, a comparação automática começa uma nova referência. Os valores inseridos manualmente não são confirmados pelo monitor.</p>
   <button className="btn btn-primary mt-4" disabled={busy}><Save size={15}/>{busy?'Salvando...':'Salvar concurso'}</button></form>}
 </div>
}
