import { useEffect, useMemo, useState } from 'react'
import { api } from './api'
import { Activity, Target, AlertTriangle } from 'lucide-react'

type Item={id:number;title:string;subject:string;code:string;question_count:number;attempted:number;solved_at_least_once:number;missed_at_least_once:number;accuracy:number;cards_due:number;status:string}
type Coverage={topics:Item[];subjects:{subject:string;code:string;topics:number;attempted_questions:number;question_count:number}[];warning:string}
export default function MasteryMap(){
 const [data,setData]=useState<Coverage|null>(null);const [error,setError]=useState('');const [filter,setFilter]=useState('');const [onlyWeak,setOnlyWeak]=useState(false)
 useEffect(()=>{api<Coverage>('/study/mastery').then(setData).catch(e=>setError((e as Error).message))},[])
 const topics=useMemo(()=>data?.topics.filter(x=>(!filter||x.code===filter)&&(!onlyWeak||(x.attempted>0&&x.accuracy<65)))||[],[data,filter,onlyWeak])
 return <div className="fade"><div className="mb-7"><p className="mb-2 text-xs font-bold uppercase tracking-[.20em] text-emerald-300">Análise por assunto</p><h1 className="text-3xl font-bold">Mapa de domínio</h1><p className="mt-3 max-w-3xl text-sm leading-6 muted">Seu desempenho por tópico, incluindo cobertura do banco e revisões pendentes. Não confundimos repetição de questões com domínio confirmado.</p></div>
 {error&&<p className="text-rose-200">{error}</p>}
 {data&&<><div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{data.subjects.map(x=><article key={x.code} className="panel p-5"><div className="mb-1 text-xs uppercase tracking-wider text-emerald-300">{x.code}</div><h2 className="font-semibold text-white">{x.subject}</h2><div className="mt-3 text-2xl font-bold">{x.attempted_questions}<span className="text-sm text-slate-400"> / {x.question_count} questões</span></div><div className="bartrack mt-3"><div className="barfill" style={{width:`${x.question_count?100*x.attempted_questions/x.question_count:0}%`}}/></div><p className="mt-2 text-xs muted">{x.topics} aulas disponíveis</p></article>)}</div>
  <div className="panel p-5 sm:p-7"><div className="mb-5 flex flex-wrap gap-3"><div className="flex items-center gap-2 font-bold text-white"><Activity size={19} className="text-emerald-300"/> Detalhes por tópico</div><div className="ml-auto flex flex-wrap items-center gap-3"><label className="flex items-center gap-2 text-xs"><input checked={onlyWeak} onChange={e=>setOnlyWeak(e.target.checked)} type="checkbox"/> Mostrar fragilidades</label><select className="field max-w-[200px] text-sm" value={filter} onChange={e=>setFilter(e.target.value)}><option value="">Todas as matérias</option>{data.subjects.map(x=><option key={x.code} value={x.code}>{x.subject}</option>)}</select></div></div>
   <div className="space-y-2">{topics.map(x=><div key={x.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-slate-900/30 p-3"><div className="min-w-[200px] flex-1"><p className="text-[11px] text-emerald-300">{x.code} · {x.subject}</p><p className="mt-1 text-sm font-semibold text-slate-100">{x.title}</p><p className="mt-1 text-xs muted">{x.attempted}/{x.question_count} questões distintas · {x.cards_due} cards pendentes</p></div><div className="min-w-[110px]"><span className={`badge ${x.attempted===0?'bg-slate-700/60 text-slate-300':x.accuracy<65?'bg-rose-500/15 text-rose-200':x.accuracy<85?'bg-amber-500/15 text-amber-200':'bg-emerald-500/15 text-emerald-200'}`}>{x.status}</span><p className="mt-1 text-xs muted">{x.attempted?x.accuracy+'% dos acertos':'Sem amostra'}</p></div></div>)}</div>
   {topics.length===0&&<p className="py-8 text-center text-sm muted">Sem tópicos com os filtros selecionados.</p>}
   <div className="mt-6 flex gap-2 rounded-xl border border-amber-500/15 bg-amber-500/5 p-4 text-xs leading-6 text-amber-200"><AlertTriangle size={17} className="shrink-0"/>{data.warning}</div>
  </div></>}
 <p className="mt-6 flex items-center gap-2 text-sm muted"><Target size={16}/> Dica: primeiro resolva questões inéditas de cada assunto; depois use o caderno de erros e os cards.</p>
 </div>
}
