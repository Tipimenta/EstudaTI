import { useEffect, useState } from 'react'
import { AlertCircle, BookOpen, Check, CloudUpload, Filter, RefreshCw, Search, ShieldCheck } from 'lucide-react'
import { api, patch, post, type Subject } from './api'
import OfficialQuality from './OfficialQuality'

type QuestionItem = { id:number; question:string; choices:string[]; correct_index:number; explanation:string;
  subject:string; topic:string; origin:string; board:string; exam:string; year:number|null;
  question_number:string; source_url:string; license_note:string; review_status:string; choice_rationales:Record<string,string> }
type Catalog = { total:number; items:QuestionItem[]; page:number }
type Meta = { counts:{origin:string;review_status:string;total:number}[]; boards:string[];years:number[];wrong_count:number }
type ImportResult = { imported:number;duplicates:number;similar_count?:number;similar?:{row:number;question_id:number;existing_question_id:number;similarity:number}[];errors_count:number;errors:{row:number;error:string}[];status:string }

// CSV parser próprio: suporta aspas escapadas, vírgulas e quebras de linha dentro de células.
function readCsv(text:string):Record<string,string>[] {
 const rows:string[][]=[]; let row:string[]=[];let cell='';let quoted=false
 for(let i=0;i<text.length;i++){
  const c=text[i]
  if(quoted){if(c==='"' && text[i+1]==='"'){cell+='"';i++}else if(c==='"'){quoted=false}else{cell+=c}}
  else if(c==='"'){quoted=true}
  else if(c===','){row.push(cell);cell=''}
  else if(c==='\n'){row.push(cell.replace(/\r$/,''));rows.push(row);row=[];cell=''}
  else{cell+=c}
 }
 if(quoted)throw new Error('CSV inválido: aspas não fechadas.')
 if(cell.length||row.length){row.push(cell.replace(/\r$/,''));rows.push(row)}
 const header=(rows.shift()||[]).map(x=>x.replace(/^\uFEFF/,'').trim())
 if(!header.includes('question')||!header.includes('correct'))throw new Error('CSV precisa conter as colunas question e correct.')
 return rows.filter(r=>r.some(c=>c.trim())).map(row=>Object.fromEntries(header.map((key,i)=>[key,row[i]||''])))
}

export default function QuestionBank(){
 const [catalog,setCatalog]=useState<Catalog|null>(null)
 const [meta,setMeta]=useState<Meta|null>(null)
 const [subjects,setSubjects]=useState<Subject[]>([])
 const [query,setQuery]=useState('');const [subject,setSubject]=useState('');const [status,setStatus]=useState('');const [origin,setOrigin]=useState('');const [board,setBoard]=useState('');const [page,setPage]=useState(1)
 const [qualityOpen,setQualityOpen]=useState<number|null>(null)
 const [fileName,setFileName]=useState('');const [preview,setPreview]=useState<Record<string,unknown>[]>([])
 const [message,setMessage]=useState('');const [error,setError]=useState('');const [busy,setBusy]=useState(false)
 async function load(n=page){
  const params=new URLSearchParams({q:query,origin,status,board,page:String(n),page_size:'20'})
  if(subject)params.set('subject_id',subject)
  try{const [catalog,metadata,subs]=await Promise.all([api<Catalog>('/questions/list?'+params),api<Meta>('/questions/meta'),api<Subject[]>('/subjects')]);setCatalog(catalog);setMeta(metadata);setSubjects(subs)}catch(e){setError((e as Error).message)}
 }
 useEffect(()=>{load(1);setPage(1)},[query,origin,status,board,subject])
 async function chooseFile(file:File|undefined){
  if(!file)return;setError('');setMessage('');setPreview([]);setFileName(file.name)
  try{
   if(file.size>2*1024*1024)throw new Error('Limite de 2 MB por arquivo. Divida o CSV em lotes.')
   const raw=await file.text()
   const data=file.name.toLowerCase().endsWith('.csv')?readCsv(raw):JSON.parse(raw)
   const items=Array.isArray(data)?data:Array.isArray(data?.questions)?data.questions:null
   if(!items||!items.length||items.length>500)throw new Error('Envie entre 1 e 500 questões por arquivo.')
   setPreview(items)
  }catch(e){setError((e as Error).message)}
 }
 async function upload(){
  setBusy(true);setError('');setMessage('')
  try{const r=await post<ImportResult>('/questions/import',{questions:preview});setMessage(`${r.imported} importadas; ${r.duplicates} duplicatas exatas ignoradas; ${r.similar_count??0} possíveis repetições para revisar; ${r.errors_count} rejeitadas. Tudo que foi importado fica em rascunho até você conferir.`+(r.similar?.length?' Atenção às linhas: '+r.similar.slice(0,8).map(x=>`${x.row} (semelhante à #${x.existing_question_id})`).join(', ')+'.':'')+(r.errors.length?' Erros: '+r.errors.slice(0,3).map(x=>`linha ${x.row}: ${x.error}`).join('; '):''));setPreview([]);setFileName('');setPage(1);await load(1)}catch(e){setError((e as Error).message)}finally{setBusy(false)}
 }
 async function changeStatus(item:QuestionItem,next:string){try{await patch(`/questions/${item.id}/status`,{status:next});setMessage(next==='revisada'?'Questão revisada e liberada para os simulados.':'Situação da questão atualizada.');await load()}catch(e){setError((e as Error).message);if(item.origin==='oficial')setQualityOpen(item.id)}}
 async function card(item:QuestionItem){try{const r=await post<{duplicate:boolean}>(`/questions/${item.id}/flashcard`,{});setMessage(r.duplicate?'Este flashcard já existe.':'Flashcard criado; ele aparecerá nas revisões.')}catch(e){setError((e as Error).message)}}
 const count=(o:string,s:string)=>meta?.counts?.find(x=>x.origin===o&&x.review_status===s)?.total??0
 return <div className="fade">
  <p className="mb-2 text-xs font-bold uppercase tracking-[.20em] text-emerald-300">Biblioteca de provas anteriores</p>
  <h1 className="text-3xl font-bold text-white sm:text-4xl">Banco de questões</h1>
  <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">Importe questões de provas que você tem autorização para utilizar. Registre banca, ano, concurso, caderno e fonte. Questões oficiais entram como <b>rascunho</b> até você conferir o gabarito definitivo.</p>
  {error&&<div className="my-4 rounded-xl border border-rose-400/30 bg-rose-400/10 p-4 text-sm text-rose-100"><AlertCircle size={16} className="mr-2 inline"/>{error}</div>}
  {message&&<div className="my-4 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-emerald-100">{message}</div>}
  <div className="my-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
   <div className="panel p-4"><div className="text-xs muted">Questões autorais</div><div className="mt-2 text-2xl font-extrabold">{count('autoral','revisada')}</div></div>
   <div className="panel p-4"><div className="text-xs muted">Oficiais revisadas</div><div className="mt-2 text-2xl font-extrabold">{count('oficial','revisada')}</div></div>
   <div className="panel p-4"><div className="text-xs muted">Aguardando revisão</div><div className="mt-2 text-2xl font-extrabold">{meta?.counts.filter(x=>x.review_status==='rascunho').reduce((n,x)=>n+x.total,0)??0}</div></div>
   <div className="panel p-4"><div className="text-xs muted">Questões já erradas</div><div className="mt-2 text-2xl font-extrabold">{meta?.wrong_count??0}</div></div>
  </div>
  <div className="panel mb-7 p-6">
   <div className="flex items-center gap-3"><CloudUpload className="text-emerald-300" size={22}/><h2 className="text-lg font-bold">Importar questões CSV ou JSON</h2></div>
   <p className="mt-2 text-sm leading-6 muted">Exemplo de planilha no pacote: <b>examples/questoes_modelo.csv</b>. Selecione seu arquivo com até 500 questões; confira tudo antes de liberar para os simulados. O sistema bloqueia duplicatas de enunciado e alternativas mesmo reordenadas, <b>avisa sobre enunciados parecidos</b> e não coleta automaticamente sites comerciais.</p>
   <label className="mt-5 block rounded-xl border border-dashed border-emerald-300/40 p-5 text-center text-sm text-emerald-200 hover:bg-white/5">
    <input type="file" accept=".csv,.json" className="hidden" onChange={e=>chooseFile(e.currentTarget.files?.[0])}/>
    <CloudUpload size={25} className="mx-auto mb-2"/> Escolher CSV/JSON do computador
   </label>
   {preview.length>0&&<div className="mt-4 rounded-xl bg-slate-900/70 p-4"><p className="text-sm text-slate-200">{fileName}: {preview.length} questões carregadas</p><p className="my-3 text-xs muted">Prévia: {String(preview[0].question||'sem enunciado').slice(0,220)}</p><button disabled={busy} onClick={upload} className="btn btn-primary"><Check size={16}/> {busy?'Importando...':'Importar como rascunho'}</button></div>}
   <p className="mt-4 text-xs text-amber-200/90"><ShieldCheck className="mr-1 inline" size={14}/> Use apenas material autorizado. Questões oficiais exigem concurso, banca, ano e link de origem; respeite direitos e termos das bancas.</p>
  </div>
  <div className="panel p-5">
   <div className="mb-4 flex items-center gap-2"><Filter size={17} className="text-emerald-300"/><h2 className="font-bold text-white">Catálogo e conferência</h2><button onClick={()=>load()} className="ml-auto text-xs text-emerald-300"><RefreshCw size={15}/></button></div>
   <div className="mb-5 grid gap-3 md:grid-cols-6">
    <div className="relative md:col-span-2"><Search size={16} className="absolute left-3 top-3 text-slate-400"/><input className="field pl-10" placeholder="Buscar enunciado" value={query} onChange={e=>setQuery(e.target.value)}/></div>
    <select className="field text-sm" value={subject} onChange={e=>setSubject(e.target.value)}><option value="">Todas as matérias</option>{subjects.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select>
    <select className="field text-sm" value={origin} onChange={e=>setOrigin(e.target.value)}><option value="">Todas as origens</option><option value="oficial">Oficial</option><option value="autoral">Autoral</option><option value="adaptada">Adaptada</option></select>
    <select className="field text-sm" value={status} onChange={e=>setStatus(e.target.value)}><option value="">Todos os estados</option><option value="rascunho">A revisar</option><option value="revisada">Revisada</option><option value="anulada">Anulada</option><option value="arquivada">Arquivada (duplicata)</option></select><select className="field text-sm" value={board} onChange={e=>setBoard(e.target.value)}><option value="">Todas as bancas</option>{meta?.boards.map(x=><option key={x} value={x}>{x}</option>)}</select>
   </div>
   <p className="mb-3 text-xs muted">{catalog?.total??0} questão(ões) · Questões oficiais precisam de conferência separada do enunciado e do gabarito definitivo.</p>
   <div className="space-y-3">{catalog?.items.map(item=><article key={item.id} className="rounded-xl border border-white/10 bg-slate-900/35 p-4">
    <div className="mb-2 flex flex-wrap gap-2 text-[11px]"><span className="badge bg-slate-700/50 text-slate-300">{item.subject}</span><span className="badge bg-slate-700/50 text-slate-300">{item.origin}</span><span className={`badge ${item.review_status==='revisada'?'bg-emerald-500/10 text-emerald-200':item.review_status==='anulada'?'bg-rose-500/10 text-rose-200':'bg-amber-500/10 text-amber-200'}`}>{item.review_status}</span>{item.board&&<span className="text-slate-300">{item.board} · {item.year} · {item.exam}</span>}</div>
    <p className="whitespace-pre-wrap text-sm font-semibold leading-6 text-white">{item.question}</p>
    <div className="mt-3 grid gap-1 text-xs text-slate-300 sm:grid-cols-2">{item.choices.map((s,i)=><p key={i} className={i===item.correct_index?'text-emerald-200':''}>{'ABCDE'[i]}. {s}</p>)}</div>
    <details className="mt-3 text-xs text-slate-300"><summary className="cursor-pointer text-emerald-300">Ver explicação / fonte</summary><p className="mt-2 whitespace-pre-wrap">{item.explanation}</p>{item.source_url&&<a href={item.source_url} className="mt-2 block break-all text-blue-300 underline" target="_blank" rel="noreferrer">{item.source_url}</a>}</details>{Object.entries(item.choice_rationales||{}).length>0&&<details className="mt-2 text-xs text-slate-300"><summary className="cursor-pointer text-emerald-300">Justificativas por alternativa</summary><div className="mt-2 space-y-2">{Object.entries(item.choice_rationales).map(([letter,why])=><p key={letter}><b className="text-emerald-200">{letter}:</b> {why}</p>)}</div></details>}
    <div className="mt-4 flex flex-wrap gap-2">{item.origin==='oficial'&&<button className="btn btn-outline text-xs" onClick={()=>setQualityOpen(q=>q===item.id?null:item.id)}><ShieldCheck size={14}/>{qualityOpen===item.id?'Fechar conferência':'Conferir fonte e gabarito'}</button>}<button className="btn btn-secondary text-xs" onClick={()=>changeStatus(item,item.review_status==='revisada'?'rascunho':'revisada')}><Check size={14}/>{item.review_status==='revisada'?'Retirar da prova':'Marcar revisada'}</button><button className="btn btn-outline text-xs" onClick={()=>changeStatus(item,'anulada')}>Anular</button><button className="btn btn-outline text-xs" onClick={()=>changeStatus(item,'arquivada')}>Arquivar</button><button disabled={item.review_status!=='revisada'} className="btn btn-outline text-xs" onClick={()=>card(item)}><BookOpen size={14}/> Criar flashcard</button></div>{qualityOpen===item.id&&<OfficialQuality questionId={item.id} onSave={()=>load()}/>}
   </article>)}</div>
   {catalog&&catalog.total>20&&<div className="mt-5 flex items-center justify-between"><button className="btn btn-secondary text-xs" disabled={page===1} onClick={()=>{setPage(page-1);load(page-1)}}>Anterior</button><span className="text-xs muted">Página {page}</span><button className="btn btn-secondary text-xs" disabled={page*20>=catalog.total} onClick={()=>{setPage(page+1);load(page+1)}}>Próxima</button></div>}
   {catalog?.total===0&&<p className="text-sm muted">Nenhuma questão encontrada para os filtros atuais.</p>}
  </div>
 </div>
}
