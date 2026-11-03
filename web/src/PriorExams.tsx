import {useMemo,useState} from 'react'
import {PRIOR_EXAMS,type PriorExam} from './priorExamCatalog'
import {BookOpen,ExternalLink,Search,ShieldCheck,AlertCircle,ChevronDown} from 'lucide-react'

const order=['Birigui','UFMS','Dataprev','INB','ABDI','Mossoró','IBGE / CPNU','INSS / CPNU']
const label:Record<string,string>={
 'prova_definitiva':'Caderno + gabarito definitivo',
 'prova_preliminar':'Caderno + gabarito preliminar',
 'prova_oficial':'Caderno na página oficial',
 'acervo':'Acervo externo (conferir)',
 'edital':'Edital · prova ainda não aplicada',
}
const badge:Record<string,string>={
 'prova_definitiva':'border-emerald-400/20 bg-emerald-400/10 text-emerald-200',
 'prova_preliminar':'border-amber-400/20 bg-amber-400/10 text-amber-200',
 'prova_oficial':'border-emerald-400/20 bg-emerald-400/10 text-emerald-200',
 'acervo':'border-sky-400/20 bg-sky-400/10 text-sky-200',
 'edital':'border-slate-400/20 bg-slate-400/10 text-slate-300',
}

function ExamRow({exam}:{exam:PriorExam}){
 return <article className="rounded-xl border border-white/10 bg-white/[.025] p-4 sm:p-5">
  <div className="flex flex-wrap items-center gap-2 text-xs">
   <span className="rounded-md border border-white/10 px-2 py-1 text-slate-300">{exam.year}</span>
   <span className={`rounded-md border px-2 py-1 ${badge[exam.availability]||badge.acervo}`}>{label[exam.availability]||'Página do concurso'}</span>
   <span className="rounded-md border border-white/10 px-2 py-1 text-slate-300">{exam.source}</span>
  </div>
  <h4 className="mt-3 text-base font-bold leading-6 text-white">{exam.role}</h4>
  <p className="mt-1 text-xs font-semibold text-emerald-300">{exam.exam} · {exam.focus}</p>
  <p className="mt-3 text-sm leading-6 text-slate-300">{exam.notes}</p>
  <a href={exam.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-sm font-bold text-emerald-200 hover:bg-emerald-400/20">
   {exam.availability==='edital'?'Consultar edital oficial':'Abrir página da prova'} <ExternalLink size={15}/>
  </a>
 </article>
}
export default function PriorExams(){
 const [term,setTerm]=useState('')
 const [board,setBoard]=useState('')
 const [focus,setFocus]=useState('')
 const [onlyAvailable,setOnlyAvailable]=useState(false)
 const [groupBy,setGroupBy]=useState<'concurso'|'banca'>('concurso')
 const [openGroups,setOpenGroups]=useState<Record<string,boolean>>({Birigui:true})
 const banks=useMemo(()=>[...new Set(PRIOR_EXAMS.map(x=>x.board))].sort((a,b)=>a.localeCompare(b,'pt-BR')) ,[])
 const profiles=useMemo(()=>[...new Set(PRIOR_EXAMS.map(x=>x.focus))].sort((a,b)=>a.localeCompare(b,'pt-BR')),[])
 const filtered=PRIOR_EXAMS.filter(x=>{
   const text=[x.group,x.organization,x.board,x.role,x.exam,x.focus,x.year].join(' ').toLowerCase()
   return (!term||text.includes(term.toLowerCase()))&&(!board||x.board===board)&&(!focus||x.focus===focus)&&(!onlyAvailable||x.availability!=='edital')
 })
 const groups=(groupBy==='concurso'?order:banks).map(group=>({group,entries:filtered.filter(x=>groupBy==='concurso'?x.group===group:x.board===group)})).filter(x=>x.entries.length)
 const countAvailable=PRIOR_EXAMS.filter(x=>x.availability!=='edital').length
 return <section id="provas-por-concurso" className="panel p-5 sm:p-7">
  <div className="flex items-start gap-3"><BookOpen className="mt-1 shrink-0 text-emerald-300" size={24}/><div>
    <p className="text-xs font-bold uppercase tracking-wider text-emerald-300">Provas anteriores de TI</p>
    <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">Por concurso, banca e cargo</h2>
    <p className="mt-2 text-sm leading-6 text-slate-300">Catálogo de {PRIOR_EXAMS.length} referências verificadas, incluindo {countAvailable} registros de provas/acervos e {PRIOR_EXAMS.length-countAvailable} editais de concursos ainda sem prova aplicada. Foco em Analista de TI, infraestrutura, suporte, segurança e desenvolvimento.</p>
  </div></div>
  <div className="mt-5 rounded-xl border border-sky-400/15 bg-sky-400/5 p-4 text-xs leading-6 text-slate-300">
   <ShieldCheck size={15} className="mr-2 inline text-sky-300"/> <strong className="text-white">Links, não questões importadas.</strong> O banco interativo ainda contém questões autorais; para praticar uma prova oficial dentro do EstudaTI é preciso importar o caderno com permissão, conferir a versão definitiva do gabarito e revisar cada questão. Provas futuras e referências de outra instituição estão identificadas.
  </div>
  <div className="mt-5 flex flex-wrap items-center gap-2">
   <span className="mr-1 text-xs font-semibold text-slate-400">Organizar:</span>
   <button onClick={()=>setGroupBy('concurso')} className={groupBy==='concurso'?'rounded-lg bg-emerald-400/15 px-3 py-2 text-xs font-bold text-emerald-200':'rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-300'}>Por concurso</button>
   <button onClick={()=>setGroupBy('banca')} className={groupBy==='banca'?'rounded-lg bg-emerald-400/15 px-3 py-2 text-xs font-bold text-emerald-200':'rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-300'}>Por banca</button>
  </div>
  <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
   <label className="relative block xl:col-span-1"><span className="sr-only">Buscar concurso ou cargo</span><Search size={16} className="absolute left-3 top-3.5 text-slate-400"/><input className="field w-full pl-10" value={term} onChange={e=>setTerm(e.target.value)} placeholder="Concurso, cargo, ano..."/></label>
   <label><span className="sr-only">Filtrar por banca</span><select className="field w-full" value={board} onChange={e=>setBoard(e.target.value)}><option value="">Todas as bancas</option>{banks.map(x=><option key={x} value={x}>{x}</option>)}</select></label>
   <label><span className="sr-only">Filtrar por especialidade</span><select className="field w-full" value={focus} onChange={e=>setFocus(e.target.value)}><option value="">Todos os perfis de TI</option>{profiles.map(x=><option key={x} value={x}>{x}</option>)}</select></label>
   <label className="flex items-center gap-3 rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-200"><input type="checkbox" className="accent-emerald-400" checked={onlyAvailable} onChange={e=>setOnlyAvailable(e.target.checked)}/>Mostrar apenas provas disponíveis</label>
  </div>
  <p className="mt-3 text-xs text-slate-400">{filtered.length} registro(s) correspondente(s). A ordenação prioriza os concursos pesquisados originalmente; não representa classificação do cargo ou disponibilidade de vaga.</p>
  <div className="mt-5 space-y-3">{groups.map(({group,entries})=>{
    const open=Object.prototype.hasOwnProperty.call(openGroups,group)?openGroups[group]:false
    return <div key={group} className="overflow-hidden rounded-2xl border border-white/10">
     <button onClick={()=>setOpenGroups(x=>({...x,[group]:!open}))} className="flex w-full items-center gap-3 bg-[#182538] px-4 py-4 text-left sm:px-5">
      <span className="min-w-0 flex-1 font-bold text-white">{group}</span>
      <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-slate-300">{entries.length}</span>
      <ChevronDown className={`shrink-0 text-emerald-300 transition-transform ${open?'rotate-180':''}`} size={17}/>
     </button>
     {open&&<div className="grid gap-3 bg-[#0f1a2a] p-3 sm:grid-cols-2 sm:p-4">{entries.map(x=><ExamRow key={x.id} exam={x}/>)}</div>}
    </div>
   })}</div>
  {filtered.length===0&&<div className="mt-4 rounded-xl border border-white/10 p-5 text-sm text-slate-300"><AlertCircle className="mr-2 inline" size={16}/>Nenhuma referência com os filtros escolhidos. Experimente outra banca ou desative o filtro de provas disponíveis.</div>}
  <p className="mt-5 text-xs leading-5 text-slate-400">Fontes públicas consultadas em 02/11/2026. Uma mesma página pode reunir vários cargos ou tipos de caderno. Acervos externos podem exigir cadastro. Consulte sempre a banca e o gabarito definitivo antes de responder; nem todos os concursos da seleção inicial já tiveram provas aplicadas.</p>
 </section>
}
