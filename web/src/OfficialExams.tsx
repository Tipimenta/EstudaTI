import {useEffect,useState} from 'react'
import {api,post} from './api'
import {BookOpen,ArrowLeft,ArrowRight,RefreshCw,CheckCircle2} from 'lucide-react'
type Source={code:string;board:string;contest:string;role:string;year:number;book_type:number;source_url:string;answer_url:string;last_checked_at:string|null;state:string;ready_count:number;skipped_count:number;live_count:number;diagnostic:string;focus:string}
type Item={number:number;page:number;question:string;choices:string[]}
type Pack={role:string;total:number;complete:boolean;items:Item[]}
type Result={correct:number;total:number;results:{number:number;correct:boolean;your_choice:number;correct_index:number;explanation:string}[]}
export default function OfficialExams(){
 const [sources,setSources]=useState<Source[]>([])
 const [active,setActive]=useState<string>('')
 const [pack,setPack]=useState<Pack|null>(null)
 const [selected,setSelected]=useState<Record<number,number>>({})
 const [index,setIndex]=useState(0)
 const [result,setResult]=useState<Result|null>(null)
 const [busy,setBusy]=useState('')
 const [error,setError]=useState('')
 const [message,setMessage]=useState('')
 const [started,setStarted]=useState(0)
 async function load(){try{const r=await api<{items:Source[]}>('/provas/oficiais');setSources(r.items)}catch(e){setError((e as Error).message)}}
 useEffect(()=>{load()},[])
 async function refresh(code:string){setBusy(code);setMessage('');setError('')
  try{const r=await post<{ok:boolean;imported:number;blocked:number|null;message:string}>('/provas/oficiais/'+code+'/atualizar',{})
   setMessage(r.ok?'Foram verificadas '+r.imported+' questões com gabarito definitivo; '+(r.blocked||0)+' bloqueadas.':r.message)
   if(!r.ok)setError('A importação não foi liberada: '+r.message)
   await load()
  }catch(e){setError((e as Error).message)}finally{setBusy('')}
 }
 async function openExam(code:string){setBusy(code);setError('')
  try{const p=await api<Pack>('/provas/oficiais/'+code+'/questoes');if(!p.items.length)throw Error('Esta prova ainda não possui questões confirmadas.')
   setPack(p);setActive(code);setSelected({});setResult(null);setIndex(0);setStarted(Date.now())
  }catch(e){setError((e as Error).message)}finally{setBusy('')}
 }
 async function correct(){if(!pack||!active)return
  const answers=pack.items.filter(x=>selected[x.number]!==undefined).map(x=>({number:x.number,choice_index:selected[x.number]}))
  if(!answers.length){setError('Responda ao menos uma questão.');return}
  setBusy('finish');setError('')
  try{const r=await post<Result>('/provas/oficiais/'+active+'/corrigir',{answers,duration_sec:Math.round((Date.now()-started)/1000)});setResult(r)}
  catch(e){setError((e as Error).message)}finally{setBusy('')}
 }
 const current=pack?.items[index]
 const answered=pack?.items.filter(x=>selected[x.number]!==undefined).length||0
 return <section className="panel p-4 sm:p-7">
  <div className="flex items-start gap-3"><BookOpen size={24} className="mt-1 text-emerald-300"/><div><h2 className="text-xl font-bold">Importar e resolver provas da banca</h2><p className="mt-2 text-sm leading-6 text-slate-300">A busca acontece <strong>somente ao apertar o botão</strong>, sem agendamentos nem serviços pagos. Nesta primeira versão, Dataprev 2024 (FGV), caderno tipo 1 e gabarito definitivo.</p></div></div>
  {error&&<div role="alert" className="mt-4 rounded-lg border border-rose-400/20 bg-rose-400/10 p-4 text-sm text-rose-200">{error}</div>}
  {message&&<p className="mt-4 rounded-lg bg-emerald-400/10 p-4 text-sm leading-6 text-emerald-100">{message}</p>}
  {!active?<div className="mt-5 grid gap-3 md:grid-cols-2">{sources.map(s=><div key={s.code} className="rounded-xl border border-white/10 bg-white/[.02] p-4">
   <span className="text-xs font-bold text-emerald-300">{s.board} · {s.contest} · Tipo {s.book_type}</span>
   <h3 className="mt-2 font-bold leading-6 text-white">{s.role}</h3><p className="mt-1 text-xs text-slate-400">{s.focus} · {s.live_count} questões prontas</p>
   {s.diagnostic&&<p className="mt-2 text-xs leading-5 text-slate-400">{s.diagnostic}</p>}
   <div className="mt-4 flex flex-wrap gap-2"><button className="btn btn-secondary text-xs" disabled={!!busy} onClick={()=>refresh(s.code)}><RefreshCw size={14}/>{busy===s.code?'Baixando e conferindo...':s.live_count?'Atualizar por botão':'Buscar e importar'}</button>
    {s.live_count>0&&<button className="btn btn-primary text-xs" onClick={()=>openExam(s.code)} disabled={!!busy}>Resolver prova <ArrowRight size={14}/></button>}</div>
   <p className="mt-3 text-xs"><a href={s.source_url} target="_blank" rel="noopener noreferrer" className="text-sky-300 underline">PDF oficial</a> · <a href={s.answer_url} target="_blank" rel="noopener noreferrer" className="text-sky-300 underline">Gabarito definitivo</a></p>
  </div>)}</div>:<div className="mt-5">
   <button className="btn btn-outline text-xs" onClick={()=>{setActive('');setPack(null);setResult(null);setError('')}}><ArrowLeft size={14}/> Todas as provas</button>
   <h3 className="mt-5 text-lg font-bold text-white">{pack?.role}</h3><p className="mt-2 text-sm text-slate-300">{pack?.total} questões verificadas · {answered} respondidas. {pack?.complete?'Prova completa.':'Questões com extração incerta ou anuladas não estão disponíveis.'}</p>
   {!result&&current&&<div className="mt-5 rounded-xl border border-white/10 p-4 sm:p-6"><p className="text-xs font-bold text-emerald-300">Questão {current.number} · Página {current.page} · {index+1} de {pack?.total}</p><p className="mt-5 whitespace-pre-wrap text-[15px] leading-7 text-white">{current.question}</p>
    <div className="mt-5 space-y-2">{current.choices.map((text,i)=><button key={i} onClick={()=>setSelected(old=>({...old,[current.number]:i}))} className={selected[current.number]===i?'flex w-full gap-3 rounded-xl border border-emerald-400/50 bg-emerald-400/10 p-4 text-left text-sm leading-6':'flex w-full gap-3 rounded-xl border border-white/10 p-4 text-left text-sm leading-6 text-slate-300'}><b className="text-emerald-300">{'ABCDE'[i]}.</b><span className="break-words">{text}</span></button>)}</div>
    <div className="mt-6 flex items-center justify-between gap-3"><button disabled={index===0} className="btn btn-outline text-xs" onClick={()=>setIndex(i=>i-1)}><ArrowLeft size={14}/> Anterior</button>
    {index<pack!.items.length-1?<button className="btn btn-primary text-xs" onClick={()=>setIndex(i=>i+1)}>Próxima <ArrowRight size={14}/></button>:<button disabled={!!busy||!answered} className="btn btn-primary text-xs" onClick={correct}>Corrigir prova <CheckCircle2 size={14}/></button>}</div>
    <div className="mt-4 flex flex-wrap gap-1.5">{pack?.items.map((q,i)=><button key={q.number} aria-label={'Questão '+q.number} onClick={()=>setIndex(i)} className={i===index?'h-7 w-7 rounded bg-emerald-300 text-xs text-slate-950':selected[q.number]!==undefined?'h-7 w-7 rounded bg-sky-400/20 text-xs text-sky-200':'h-7 w-7 rounded border border-white/10 text-xs text-slate-400'}>{q.number}</button>)}</div>
    {index<pack!.items.length-1&&answered>0&&<button onClick={correct} disabled={!!busy} className="mt-5 w-full rounded-xl border border-white/20 p-3 text-sm font-semibold">Encerrar e corrigir {answered} respostas</button>}
   </div>}
   {result&&<div className="mt-5 space-y-3"><div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-5"><h3 className="text-xl font-bold">{result.correct}/{result.total} acertos · {Math.round(result.correct/result.total*100)}%</h3><p className="mt-2 text-sm text-slate-300">Tentativa armazenada no seu banco.</p><button className="btn btn-primary mt-4" onClick={()=>{setIndex(0);setSelected({});setResult(null);setStarted(Date.now())}}>Refazer prova</button></div>
   {result.results.map(x=><div key={x.number} className="rounded-xl border border-white/10 p-4"><b>Questão {x.number} — {x.correct?'Correta':'Incorreta'}</b><p className="mt-2 text-sm text-slate-300">Sua resposta: {'ABCDE'[x.your_choice]} · Gabarito: {'ABCDE'[x.correct_index]}</p><p className="mt-2 text-xs text-slate-400">{x.explanation}</p></div>)}</div>}
  </div>}
  {!active&&<p className="mt-5 text-xs leading-6 text-slate-400">O importador não inventa respostas: cruza número da questão com a tabela do gabarito definitivo e bloqueia anuladas, imagens e textos ambíguos. As demais provas catalogadas continuam disponíveis por link oficial até haver extrator adequado.</p>}
 </section>
}