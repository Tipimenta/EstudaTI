import {useEffect,useMemo,useState} from 'react'
import {api,post} from './api'
import {ArrowLeft,ArrowRight,BookOpen,CheckCircle2,ChevronDown,ExternalLink,FileText,Filter,RefreshCw,Search,ShieldCheck} from 'lucide-react'

type Source={code:string;board:string;contest:string;role:string;year:number;book_type:number;total_questions?:number;source_page?:string;source_url:string;answer_url:string;last_checked_at:string|null;state:string;ready_count:number;skipped_count:number;live_count:number;diagnostic:string;focus:string;attempts?:number}
type Item={number:number;page:number;question:string;choices:string[]}
type Pack={role:string;total:number;complete:boolean;items:Item[]}
type Result={correct:number;total:number;results:{number:number;correct:boolean;your_choice:number;correct_index:number;explanation:string}[]}
type Mode='ready'|'new'|'all'

export default function OfficialExams(){
 const [sources,setSources]=useState<Source[]>([])
 const [active,setActive]=useState('')
 const [pack,setPack]=useState<Pack|null>(null)
 const [selected,setSelected]=useState<Record<number,number>>({})
 const [index,setIndex]=useState(0)
 const [result,setResult]=useState<Result|null>(null)
 const [busy,setBusy]=useState('')
 const [progress,setProgress]=useState('')
 const [error,setError]=useState('')
 const [message,setMessage]=useState('')
 const [saved,setSaved]=useState<Record<number,string>>({})
 const [started,setStarted]=useState(0)
 const [mode,setMode]=useState<Mode>('ready')
 const [search,setSearch]=useState('')
 const [board,setBoard]=useState('')
 const [contest,setContest]=useState('')

 async function load(){try{const r=await api<{items:Source[]}>('/provas/oficiais');setSources(r.items)}catch(e){setError((e as Error).message)}}
 useEffect(()=>{void load()},[])
 const ready=sources.filter(s=>s.live_count>0)
 const newOnes=sources.filter(s=>!s.live_count)
 const totalQuestions=sources.reduce((n,s)=>n+s.live_count,0)
 const contests=[...new Set(sources.map(s=>s.contest))].sort()
 const boards=[...new Set(sources.map(s=>s.board))].sort()
 const shown=useMemo(()=>sources.filter(s=>
   (mode==='ready'?s.live_count>0:mode==='new'?s.live_count===0:true)
   &&(!contest||s.contest===contest)&&(!board||s.board===board)
   &&([s.contest,s.role,s.focus,s.board,String(s.year)].join(' ').toLocaleLowerCase('pt-BR').includes(search.trim().toLocaleLowerCase('pt-BR')))
 ),[sources,mode,search,board,contest])
 const groups=useMemo(()=>{
  const order=[...new Set(shown.map(s=>s.contest))]
  return order.map(name=>({name,entries:shown.filter(s=>s.contest===name)}))
 },[shown])

 async function refresh(code:string){
  if(busy)return
  setBusy(code);setMessage('');setError('')
  try{
   const r=await post<{ok:boolean;imported:number;blocked:number|null;message:string}>('/provas/oficiais/'+code+'/atualizar',{})
   if(!r.ok){setError('Não foi possível liberar esta prova: '+r.message);return}
   setMessage(r.imported+' questões disponibilizadas após conferência automática. '+(r.blocked||0)+' itens anulados ou incertos permaneceram bloqueados.')
   setMode('ready')
  }catch(e){setError((e as Error).message)}
  finally{setBusy('');await load()}
 }
 async function refreshAll(){
  if(busy||!newOnes.length)return
  setBusy('all');setError('');setMessage('')
  let added=0,failed=0
  for(let i=0;i<newOnes.length;i++){
   setProgress('Importando '+(i+1)+' de '+newOnes.length+': '+newOnes[i].role)
   try{const r=await post<{ok:boolean;imported:number}>('/provas/oficiais/'+newOnes[i].code+'/atualizar',{});if(r.ok)added+=r.imported;else failed++}
   catch{failed++}
  }
  await load();setBusy('');setProgress('');setMode('ready')
  setMessage('Pesquisa concluída: '+added+' questões liberadas; '+failed+' caderno(s) não processado(s).')
  if(failed)setError('Alguns PDFs não passaram na extração ou não puderam ser baixados. Consulte o diagnóstico do caderno antes de tentar novamente.')
 }
 async function openExam(code:string){setBusy(code);setError('')
  try{const p=await api<Pack>('/provas/oficiais/'+code+'/questoes');if(!p.items.length)throw Error('Esta prova ainda não tem questões liberadas.')
   setPack(p);setActive(code);setSelected({});setSaved({});setResult(null);setIndex(0);setStarted(Date.now());window.scrollTo({top:0,behavior:'smooth'})
  }catch(e){setError((e as Error).message)}finally{setBusy('')}
 }
 async function saveCard(number:number){if(!active)return
  try{const r=await post<{duplicate:boolean}>('/provas/oficiais/'+active+'/flashcard',{number});setSaved(x=>({...x,[number]:r.duplicate?'Este cartão já existe.':'Flashcard salvo para revisão espaçada.'}))}
  catch(e){setError((e as Error).message)}
 }
 async function correct(){if(!pack||!active)return
  const answers=pack.items.filter(x=>selected[x.number]!==undefined).map(x=>({number:x.number,choice_index:selected[x.number]}))
  if(!answers.length){setError('Responda pelo menos uma questão.');return}
  setBusy('finish');setError('')
  try{setResult(await post<Result>('/provas/oficiais/'+active+'/corrigir',{answers,duration_sec:Math.round((Date.now()-started)/1000)}));window.scrollTo({top:0,behavior:'smooth'})}
  catch(e){setError((e as Error).message)}finally{setBusy('')}
 }
 const current=pack?.items[index]
 const answered=pack?.items.filter(x=>selected[x.number]!==undefined).length||0
 const selectedSource=sources.find(s=>s.code===active)

 if(active)return <div className="space-y-5">
  <button className="btn btn-outline text-sm" onClick={()=>{setActive('');setPack(null);setResult(null);setError('')}}><ArrowLeft size={16}/> Voltar ao acervo</button>
  <header className="mx-auto max-w-4xl"><p className="text-xs font-bold uppercase tracking-wider text-emerald-300">{selectedSource?.board} · {selectedSource?.contest} · Prova tipo {selectedSource?.book_type}</p>
   <h2 className="mt-2 text-2xl font-bold text-white">{pack?.role}</h2>
   <p className="mt-2 text-sm muted">{pack?.total} questões disponíveis · {answered} respondidas {pack?.complete?'· Caderno integral':'· Questões não legíveis ou anuladas excluídas'}</p>
   <div className="bartrack mt-4 h-2"><div className="barfill" style={{width:pack?.total?100*answered/pack.total+'%':'0%'}}/></div>
  </header>
  {error&&<div role="alert" className="panel mx-auto max-w-4xl border-rose-400/30 p-4 text-sm text-rose-600">{error}</div>}
  {!result&&current&&<section className="panel mx-auto max-w-4xl p-5 sm:p-8">
   <div className="flex flex-wrap items-center justify-between gap-2"><span className="badge bg-emerald-400/10 text-emerald-200">Questão {current.number} · {index+1} de {pack?.total}</span><span className="text-xs muted">Página {current.page} do PDF</span></div>
   <div className="reader"><p className="mt-7 whitespace-pre-wrap text-base leading-[1.85] text-white">{current.question}</p>
    <div className="mt-7 space-y-2.5">{current.choices.map((choice,i)=><button key={i} onClick={()=>setSelected(old=>({...old,[current.number]:i}))} className={'exam-choice flex w-full items-start gap-3 rounded-xl border p-4 text-left text-[15px] leading-6 '+(selected[current.number]===i?'exam-choice-active':'')}>
     <b className="exam-option-letter grid h-7 w-7 shrink-0 place-items-center rounded-lg">{'ABCDE'[i]}</b><span>{choice}</span>
    </button>)}</div>
    <div className="mt-7 flex items-center justify-between gap-3 border-t pt-5" style={{borderColor:'var(--app-border)'}}>
      <button disabled={index===0} className="btn btn-outline text-sm" onClick={()=>setIndex(i=>i-1)}><ArrowLeft size={15}/> Anterior</button>
      {index<(pack?.items.length||0)-1?<button className="btn btn-primary text-sm" onClick={()=>setIndex(i=>i+1)}>Próxima <ArrowRight size={15}/></button>:<button disabled={!!busy||!answered} className="btn btn-primary text-sm" onClick={correct}>Corrigir respostas <CheckCircle2 size={15}/></button>}
    </div>
   </div>
   <details className="mt-5 rounded-xl border p-4" style={{borderColor:'var(--app-border)'}}>
    <summary className="cursor-pointer text-sm font-semibold">Mapa de questões · {answered} respondidas</summary>
    <div className="mt-4 flex flex-wrap gap-1.5">{pack?.items.map((q,i)=><button key={q.number} aria-label={'Questão '+q.number} onClick={()=>setIndex(i)}
      className={'exam-number grid h-9 min-w-9 place-items-center rounded-lg border text-xs font-bold '+(i===index?'exam-number-current':selected[q.number]!==undefined?'exam-number-answered':'')}>{q.number}</button>)}</div>
   </details>
   {answered>0&&index<(pack?.items.length||0)-1&&<button onClick={correct} disabled={!!busy} className="btn btn-outline mt-5 w-full">Encerrar e corrigir {answered} respostas</button>}
  </section>}
  {result&&<section className="mx-auto max-w-4xl space-y-3">
   <div className="panel p-6"><span className="text-xs font-bold uppercase tracking-wide text-emerald-300">Seu resultado</span><h2 className="mt-2 text-3xl font-bold text-white">{result.correct} / {result.total} acertos <span className="text-lg muted">({Math.round(result.correct/result.total*100)}%)</span></h2>
    <p className="mt-2 text-sm muted">Resultado salvo no seu progresso. As explicações de provas reais mostram o gabarito oficial; comentários técnicos detalhados ainda estão sendo preparados.</p>
    <button className="btn btn-primary mt-5" onClick={()=>{setSelected({});setIndex(0);setResult(null);setStarted(Date.now())}}>Refazer prova</button>
   </div>
   <h3 className="pt-4 text-lg font-bold text-white">Conferência das respostas</h3>
   {result.results.map(x=><div key={x.number} className="panel p-5"><div className="flex justify-between gap-2"><b className="text-sm text-white">Questão {x.number}</b><span className={x.correct?'text-sm font-semibold text-emerald-300':'text-sm font-semibold text-rose-500'}>{x.correct?'Acertou':'Errou'}</span></div>
     <p className="mt-2 text-sm muted">Sua alternativa: {'ABCDE'[x.your_choice]} · Gabarito: {'ABCDE'[x.correct_index]}</p><p className="mt-2 text-sm leading-6 muted">{x.explanation}</p>
     {!x.correct&&<button onClick={()=>saveCard(x.number)} disabled={!!saved[x.number]} className="btn btn-outline mt-3 text-xs">Salvar nos flashcards</button>}
     {saved[x.number]&&<p className="mt-2 text-xs text-emerald-300">{saved[x.number]}</p>}
   </div>)}
  </section>}
 </div>

 return <div className="space-y-6">
  <section className="grid gap-3 sm:grid-cols-3" aria-label="Resumo do acervo">
   <div className="exam-stat"><p className="text-xs muted">Questões para resolver</p><p className="mt-1 text-3xl font-extrabold text-white">{totalQuestions}</p></div>
   <div className="exam-stat"><p className="text-xs muted">Cadernos prontos</p><p className="mt-1 text-3xl font-extrabold text-white">{ready.length}</p></div>
   <div className="exam-stat"><p className="text-xs muted">Outras fontes oficiais</p><p className="mt-1 text-3xl font-extrabold text-white">{newOnes.length}</p></div>
  </section>
  <section className="panel p-4 sm:p-6">
   <div className="flex flex-wrap items-start justify-between gap-3">
    <div><h2 className="text-lg font-bold text-white">Seu acervo de concursos</h2><p className="mt-1 text-sm leading-6 muted">Resolva provas já disponíveis ou importe novos cadernos diretamente das fontes oficiais.</p></div>
    <button onClick={()=>load()} className="btn btn-outline text-xs" disabled={!!busy}><RefreshCw size={15}/> Recarregar lista</button>
   </div>
   <div className="mt-5 flex flex-wrap gap-2 border-b pb-4" style={{borderColor:'var(--app-border)'}} role="group" aria-label="Estado das provas">
    {([{id:'ready',label:'Para resolver',count:ready.length},{id:'new',label:'Importar mais',count:newOnes.length},{id:'all',label:'Todas',count:sources.length}] as const).map(x=><button key={x.id} onClick={()=>setMode(x.id)}
      aria-pressed={mode===x.id} className={'exam-filter-tab '+(mode===x.id?'exam-filter-tab-active':'')}>{x.label} <span className="exam-tab-count">{x.count}</span></button>)}
   </div>
   <div className="mt-4 flex flex-col gap-2 sm:flex-row">
    <label className="relative min-w-0 flex-1"><Search size={17} className="pointer-events-none absolute left-3.5 top-[14px] text-slate-400"/><input aria-label="Buscar por concurso ou cargo" placeholder="Buscar cargo, concurso ou assunto..." value={search} onChange={e=>setSearch(e.target.value)} className="field pl-10"/></label>
    {contests.length>1&&<select aria-label="Filtrar por concurso" value={contest} onChange={e=>setContest(e.target.value)} className="field sm:max-w-[230px]"><option value="">Todos os concursos</option>{contests.map(x=><option key={x} value={x}>{x}</option>)}</select>}
    {boards.length>1&&<select aria-label="Filtrar por banca" value={board} onChange={e=>setBoard(e.target.value)} className="field sm:max-w-[170px]"><option value="">Todas as bancas</option>{boards.map(x=><option key={x}>{x}</option>)}</select>}
   </div>
   {mode==='new'&&newOnes.length>1&&<div className="mt-4 rounded-xl border p-3.5 text-sm leading-6" style={{borderColor:'var(--app-border)',background:'var(--app-subtle)'}}>
    <div className="flex flex-wrap items-center justify-between gap-2"><p className="max-w-xl muted">Encontramos PDFs e gabaritos de outros concursos. Importe um por vez ou solicite a verificação do conjunto; itens ilegíveis são bloqueados.</p>
    <button onClick={refreshAll} disabled={!!busy} className="btn btn-secondary text-xs"><RefreshCw size={15}/>{busy==='all'?progress:'Importar todos os cadernos pendentes'}</button></div>
   </div>}
  </section>
  {error&&<div role="alert" className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-500">{error}</div>}
  {message&&<div role="status" className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-300">{message}</div>}
  {groups.map(group=><section key={group.name} className="space-y-3">
   <div className="flex items-center justify-between gap-3"><h3 className="text-lg font-bold text-white">{group.name}</h3><span className="text-xs muted">{group.entries.length} {group.entries.length===1?'caderno':'cadernos'}</span></div>
   <div className="grid gap-3 lg:grid-cols-2">{group.entries.map(s=><article key={s.code} className="exam-source-card flex min-w-0 flex-col rounded-2xl border p-5 sm:p-6">
     <div className="flex flex-wrap items-center gap-2 text-xs"><span className="font-bold text-emerald-300">{s.board}</span><span className="muted">· {s.year} · Tipo {s.book_type}</span>
       <span className={'ml-auto rounded-full px-2.5 py-1 text-[11px] font-bold '+(s.live_count?'exam-pill-ready':'exam-pill-pending')}>{s.live_count?'Pronta para resolver':'Ainda não importada'}</span>
     </div>
     <h4 className="mt-3 text-[16px] font-bold leading-6 text-white">{s.role}</h4><p className="mt-1 text-sm muted">{s.focus}</p>
     {s.live_count>0?<p className="mt-4 text-sm font-semibold text-white">{s.live_count} questões disponíveis <span className="font-normal muted">de {s.total_questions||70} do caderno</span></p>
       :<p className="mt-4 text-sm leading-6 muted">Caderno oficial identificado · {s.total_questions||70} questões previstas · validação necessária.</p>}
     {s.state==='erro'&&s.diagnostic&&<p className="mt-3 rounded-lg border border-rose-400/25 p-3 text-xs leading-5 text-rose-500">Última tentativa: {s.diagnostic}</p>}
     <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
       <button className="btn btn-primary text-sm" disabled={!!busy} onClick={()=>s.live_count?openExam(s.code):refresh(s.code)}>
        {busy===s.code?<><RefreshCw size={15}/> Conferindo...</>:s.live_count?<><BookOpen size={16}/> Resolver agora <ArrowRight size={15}/></>:<><RefreshCw size={15}/> Buscar e importar</>}
       </button>
       <a href={s.source_page||s.source_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-sky-300">Ver fonte oficial <ExternalLink size={13}/></a>
     </div>
     {s.live_count>0&&<details className="mt-4 rounded-xl border p-3 text-xs" style={{borderColor:'var(--app-border)'}}>
      <summary className="cursor-pointer font-semibold text-slate-300">Origem, gabarito e atualização</summary>
      <div className="mt-3 flex flex-wrap items-center gap-3"><a href={s.source_url} target="_blank" rel="noopener noreferrer" className="text-sky-300 underline">Caderno PDF</a><a href={s.answer_url} target="_blank" rel="noopener noreferrer" className="text-sky-300 underline">Gabarito definitivo</a><button onClick={()=>refresh(s.code)} disabled={!!busy} className="btn btn-outline text-xs"><RefreshCw size={13}/> Atualizar questões</button></div>
     </details>}
   </article>)}</div>
  </section>)}
  {!groups.length&&<div className="panel flex flex-col items-center p-9 text-center"><Filter size={30} className="text-emerald-300"/><h3 className="mt-3 font-bold text-white">Nenhuma prova com estes filtros</h3><p className="mt-2 text-sm muted">Experimente outro cargo ou selecione a categoria Todas.</p><button onClick={()=>{setSearch('');setContest('');setBoard('');setMode('all')}} className="btn btn-outline mt-4">Limpar filtros</button></div>}
  <p className="flex items-start gap-2 text-xs leading-6 muted"><ShieldCheck size={17} className="mt-0.5 shrink-0 text-emerald-300"/> As respostas vêm dos gabaritos definitivos. Questões com extração suspeita, conteúdo visual ausente ou anulação ficam bloqueadas. A checagem automática não substitui revisão editorial completa.</p>
 </div>
}
