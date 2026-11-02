import { useEffect, useState } from 'react'
import { CheckCircle2, ChevronDown, Clock3, Pause, Play, RotateCcw, Save, Timer, X } from 'lucide-react'
import { api, post, type Topic } from './api'

type TimerSnapshot = {duration:number;remaining:number;running:boolean;since:number|null;topicId:number}
const STORAGE = 'estudati.studyTimer.v04'
const initial:TimerSnapshot = {duration:25*60,remaining:25*60,running:false,since:null,topicId:0}
function readSaved():TimerSnapshot {
  try {const raw=localStorage.getItem(STORAGE);if(!raw)return initial;const d=JSON.parse(raw) as TimerSnapshot
    if(!Number.isFinite(d.duration)||d.duration<60||d.duration>4*3600)return initial
    return {duration:d.duration,remaining:Math.max(0,Math.min(d.duration,d.remaining)),running:!!d.running,since:d.running&&Number.isFinite(d.since)?d.since:null,topicId:Number(d.topicId)||0}
  } catch {return initial}
}
export function formatTime(seconds:number){const s=Math.max(0,Math.floor(seconds));return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`}
export function useStudyTimer(enabled=false){
  const [state,setState]=useState<TimerSnapshot>(readSaved)
  const [clock,setClock]=useState(Date.now())
  const [topics,setTopics]=useState<Topic[]>([])
  const [busy,setBusy]=useState(false)
  const [message,setMessage]=useState('')
  useEffect(()=>{const timer=window.setInterval(()=>setClock(Date.now()),500);return()=>window.clearInterval(timer)},[])
  useEffect(()=>{localStorage.setItem(STORAGE,JSON.stringify(state))},[state])
  useEffect(()=>{if(enabled)api<Topic[]>('/topics').then(setTopics).catch(()=>{})},[enabled])
  const seconds=state.running&&state.since!==null?Math.max(0,state.remaining-Math.floor((clock-state.since)/1000)):state.remaining
  useEffect(()=>{if(state.running&&seconds===0){setState(s=>({...s,running:false,remaining:0,since:null}));setMessage('Tempo concluído! Registre o período estudado.')}},[seconds,state.running])
  const spent=state.duration-seconds
  function toggle(){setMessage('');setState(s=>{
    if(s.running){const r=Math.max(0,s.remaining-Math.floor((Date.now()-(s.since??Date.now()))/1000));return {...s,remaining:r,running:false,since:null}}
    return {...s,running:s.remaining>0,since:s.remaining>0?Date.now():null}
  })}
  function preset(minutes:number){setState(s=>({...s,duration:minutes*60,remaining:minutes*60,running:false,since:null}));setMessage('')}
  function reset(){setState(s=>({...s,remaining:s.duration,running:false,since:null}));setMessage('')}
  async function save(){if(spent<30||busy)return;setBusy(true);setMessage('');
    try{const n=Math.max(1,Math.round(spent/60));await post('/sessions',{topic_id:state.topicId||null,minutes:n,mode:'foco'});
      setState(s=>({...s,remaining:s.duration,running:false,since:null}));setMessage(`${n} min registrado(s) no histórico.`)
    }catch(e){setMessage('Falha ao registrar: '+(e instanceof Error?e.message:'verifique a conexão'))}finally{setBusy(false)}}
  return {seconds,spent,state,topics,busy,message,toggle,preset,reset,save,setTopicId:(topicId:number)=>setState(s=>({...s,topicId}))}
}
export type TimerController = ReturnType<typeof useStudyTimer>
export function MiniTimer({timer}:{timer:TimerController}){
  const [expanded,setExpanded]=useState(false)
  return <div className="relative z-30">
    <div className={`flex items-center gap-1 rounded-xl border px-1.5 py-1 ${timer.state.running?'border-emerald-400/40 bg-emerald-400/10':'border-white/15 bg-slate-800/70'}`}>
      <button aria-label="Abrir relógio de estudos" title="Configurar cronômetro" onClick={()=>setExpanded(x=>!x)} className="flex items-center gap-1.5 px-1 text-xs font-bold tabular-nums text-slate-100"><Clock3 size={14} className="text-emerald-300"/><span>{formatTime(timer.seconds)}</span><ChevronDown size={12} className="text-slate-400"/></button>
      <button onClick={timer.toggle} disabled={timer.seconds===0} title={timer.state.running?'Pausar':'Iniciar'} aria-label={timer.state.running?'Pausar relógio':'Iniciar relógio'} className="rounded-lg bg-emerald-300/20 p-1.5 text-emerald-200 hover:bg-emerald-300/30">{timer.state.running?<Pause size={14}/>:<Play size={14}/>}</button>
    </div>
    {expanded&&<div className="absolute right-0 top-[calc(100%+12px)] w-[min(340px,calc(100vw-32px))] rounded-2xl border border-white/15 bg-[#18273e] p-4 shadow-2xl shadow-black/60">
      <div className="mb-4 flex items-center justify-between"><strong className="flex items-center gap-2 text-sm"><Timer size={17} className="text-emerald-300"/> Relógio de estudos</strong><button onClick={()=>setExpanded(false)} aria-label="Fechar" className="text-slate-400 hover:text-white"><X size={18}/></button></div>
      <p className="mb-4 text-center font-mono text-4xl font-semibold tabular-nums text-white">{formatTime(timer.seconds)}</p>
      <div className="mb-4 flex gap-2">{[25,50,90].map(m=><button key={m} onClick={()=>timer.preset(m)} className={`flex-1 rounded-xl px-2 py-2 text-xs font-bold ${timer.state.duration===m*60?'bg-emerald-300 text-emerald-950':'bg-slate-700 text-slate-200'}`}>{m} min</button>)}</div>
      <label className="mb-2 block text-xs text-slate-300">Matéria / aula (opcional)</label><select className="field mb-4 text-xs" value={timer.state.topicId} onChange={e=>timer.setTopicId(Number(e.target.value))}><option value={0}>Estudo geral</option>{timer.topics.map(t=><option key={t.id} value={t.id}>{t.subject} · {t.title}</option>)}</select>
      <div className="grid grid-cols-3 gap-2"><button onClick={timer.toggle} disabled={timer.seconds===0} className="btn btn-primary px-2 py-2 text-xs">{timer.state.running?<Pause size={14}/>:<Play size={14}/>} {timer.state.running?'Pausar':'Iniciar'}</button><button onClick={timer.reset} className="btn btn-secondary px-2 py-2 text-xs"><RotateCcw size={14}/> Zerar</button><button onClick={timer.save} disabled={timer.spent<30||timer.busy} className="btn btn-outline px-2 py-2 text-xs"><Save size={14}/> Salvar</button></div>
      {timer.message&&<p role="status" className="mt-3 flex items-start gap-1.5 text-xs text-emerald-200"><CheckCircle2 size={14}/>{timer.message}</p>}
      <p className="mt-3 text-[11px] leading-4 text-slate-400">Continua ao trocar de tela e recarregar. Pause quando interromper o estudo. O tempo só entra nas estatísticas após salvar.</p>
    </div>}
  </div>
}
export function FocusTimerPage({timer}:{timer:TimerController}){
  const progress=100*timer.seconds/timer.state.duration
  return <div className="fade mx-auto max-w-2xl"><div className="mb-7"><p className="mb-2 text-xs font-bold uppercase tracking-[.18em] text-emerald-300">Concentração sem distrações</p><h1 className="text-3xl font-bold text-white">Modo foco</h1><p className="mt-3 text-sm leading-6 text-slate-400">O mesmo relógio aparece em todas as telas. Você pode iniciar aqui e continuar estudando qualquer matéria.</p></div>
   <div className="panel p-7 text-center sm:p-10"><div className="mb-7 flex justify-center gap-2">{[25,50,90].map(n=><button key={n} onClick={()=>timer.preset(n)} className={`btn px-5 text-sm ${timer.state.duration===n*60?'btn-primary':'btn-secondary'}`}>{n} min</button>)}</div>
    <div className="mx-auto mb-8 grid h-56 w-56 place-items-center rounded-full p-2" style={{background:`conic-gradient(#65e9bb ${progress}%,#25384c 0)`}}><div className="grid h-full w-full place-content-center rounded-full bg-[#141f33]"><Clock3 size={26} className="mx-auto mb-3 text-emerald-300"/><span className="font-mono text-5xl font-bold tabular-nums">{formatTime(timer.seconds)}</span><small className="mt-2 text-slate-400">{timer.state.running?'Em andamento':'Em pausa'}</small></div></div>
    <label className="mb-2 block text-left text-xs font-bold text-slate-300">Assunto da sessão</label><select className="field mb-6 text-sm" value={timer.state.topicId} onChange={e=>timer.setTopicId(Number(e.target.value))}><option value={0}>Estudo geral</option>{timer.topics.map(t=><option key={t.id} value={t.id}>{t.subject} — {t.title}</option>)}</select>
    <div className="grid grid-cols-2 gap-3"><button onClick={timer.toggle} disabled={timer.seconds===0} className="btn btn-primary py-3">{timer.state.running?<Pause size={18}/>:<Play size={18}/>} {timer.state.running?'Pausar':'Iniciar'}</button><button onClick={timer.reset} className="btn btn-secondary"><RotateCcw size={17}/> Reiniciar</button></div>
    <button onClick={timer.save} disabled={timer.spent<30||timer.busy} className="btn btn-outline mt-3 w-full"><Save size={17}/> Registrar {Math.max(0,Math.round(timer.spent/60))} min de estudo</button>
    {timer.message&&<p role="status" className="mt-4 text-sm text-emerald-200">{timer.message}</p>}
    <p className="mt-5 text-xs text-slate-400">Contagem baseada no horário do dispositivo. Sessões pausadas não acumulam tempo; não há registro automático.</p>
   </div>
  </div>
}
