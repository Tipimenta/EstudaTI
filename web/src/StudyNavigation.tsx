import {useEffect,useState} from 'react'
import {Activity,ArrowRight,BookOpen,Brain,CalendarDays,ChevronRight,FileText,GraduationCap,LayoutDashboard,ListChecks,LogOut,Menu,Settings2,ShieldCheck,Sparkles,Target,Timer,Trophy,X} from 'lucide-react'

export type Page='painel'|'cronograma'|'conteudos'|'flashcards'|'simulados'|'banco'|'editais'|'foco'|'concursos'|'desempenho'|'fontes'|'dominio'|'ajustes'|'inteligencia'|'tutor'|'laboratorio'|'discursivas'|'matriz'
const sections=[
 {title:'APRENDER',items:[
  {id:'painel' as Page,label:'Visão geral',icon:LayoutDashboard},
  {id:'conteudos' as Page,label:'Aulas e matérias',icon:BookOpen},
  {id:'banco' as Page,label:'Banco de questões',icon:ListChecks},
  {id:'flashcards' as Page,label:'Revisão e flashcards',icon:Brain}]},
 {title:'COLOCAR EM PRÁTICA',items:[
  {id:'fontes' as Page,label:'Provas anteriores',icon:FileText},
  {id:'simulados' as Page,label:'Simulados',icon:Target}]},
 {title:'ORGANIZAR',items:[
  {id:'cronograma' as Page,label:'Plano de estudos',icon:CalendarDays},
  {id:'concursos' as Page,label:'Concursos e editais',icon:Trophy},
  {id:'desempenho' as Page,label:'Meu progresso',icon:Activity}]}
]
const extra=[
 {id:'inteligencia' as Page,label:'Orientador de estudos',hint:'Priorizar assuntos e revisar dificuldades',icon:Sparkles},
 {id:'tutor' as Page,label:'Tutor de estudos',hint:'Fazer perguntas sobre uma aula',icon:GraduationCap},
 {id:'laboratorio' as Page,label:'Laboratório de redes',hint:'Prática técnica guiada',icon:ShieldCheck},
 {id:'discursivas' as Page,label:'Questões discursivas',hint:'Treinar respostas abertas',icon:FileText},
 {id:'dominio' as Page,label:'Mapa de domínio',hint:'Ver detalhes de cada matéria',icon:Target},
 {id:'editais' as Page,label:'Leitor de edital',hint:'Examinar PDF de concurso',icon:BookOpen},
 {id:'matriz' as Page,label:'Conteúdo do edital',hint:'Comparar exigências com aulas',icon:ListChecks},
 {id:'foco' as Page,label:'Modo foco',hint:'Registrar sessões de estudo',icon:Timer}
]
export const NAV_LABELS:Record<Page,string>=Object.fromEntries([...sections.flatMap(s=>s.items),...extra,{id:'ajustes' as Page,label:'Configurações'}].map(i=>[i.id,i.label])) as Record<Page,string>

function LinkButton({id,label,icon:Icon,active,onNavigate}:{id:Page;label:string;icon:typeof BookOpen;active:Page;onNavigate:(page:Page)=>void}){
 return <button type="button" onClick={()=>onNavigate(id)} aria-current={id===active?'page':undefined}
 className={'study-nav-item group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium transition-colors '+(id===active?'study-nav-active':'study-nav-idle')}>
 <Icon size={18} strokeWidth={id===active?2.3:1.8}/><span className="min-w-0 flex-1">{label}</span>{id===active&&<ChevronRight size={14}/>}
 </button>
}
function NavSections({active,onNavigate}:{active:Page;onNavigate:(p:Page)=>void}){
 return <div className="space-y-4">{sections.map((section,i)=><section key={section.title} aria-label={section.title}>
 <div className={'px-3 pb-2 text-[10px] font-extrabold tracking-[.16em] uppercase study-nav-group '+(i>0?'pt-1':'')}>{section.title}</div>
 <div className="space-y-0.5">{section.items.map(x=><LinkButton key={x.id} {...x} active={active} onNavigate={onNavigate}/>)}</div>
 </section>)}</div>
}
export function StudyNavigation({active,onNavigate,onLogout,mobile,onMobileChange}:{active:Page;onNavigate:(p:Page)=>void;onLogout:()=>void;mobile:boolean;onMobileChange:(v:boolean)=>void}){
 const [toolbox,setToolbox]=useState(false)
 useEffect(()=>{if(!mobile&&!toolbox)return;function onKey(e:KeyboardEvent){if(e.key==='Escape'){setToolbox(false);onMobileChange(false)}}document.addEventListener('keydown',onKey);return()=>document.removeEventListener('keydown',onKey)},[mobile,toolbox,onMobileChange])
 function navigate(id:Page){setToolbox(false);onMobileChange(false);onNavigate(id)}
 function showTools(){onMobileChange(false);setToolbox(true)}
 const logo=<div className="flex items-center gap-3 px-2.5">
  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#d5e9de] text-[#196559]"><GraduationCap size={24}/></div>
  <div><div className="text-xl font-extrabold tracking-tight text-white">Estuda<span className="text-emerald-600">TI</span></div><p className="text-[10px] font-semibold tracking-wider muted">SEU ESPAÇO DE ESTUDOS</p></div>
 </div>
 return <>
  <aside className="app-sidebar fixed inset-y-0 left-0 z-30 hidden w-[248px] flex-col border-r p-4 md:flex">
   <button onClick={()=>navigate('painel')} className="my-3 mb-8 text-left" aria-label="EstudaTI — início">{logo}</button>
   <div className="min-h-0 flex-1 overflow-y-auto pr-1"><NavSections active={active} onNavigate={navigate}/></div>
   <div className="mt-3 space-y-1 border-t pt-3" style={{borderColor:'var(--app-border)'}}>
    <button onClick={showTools} className="study-nav-item study-nav-idle flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px]"><Menu size={18}/> Todas as ferramentas <ArrowRight className="ml-auto" size={15}/></button>
    <LinkButton id="ajustes" label="Configurações" icon={Settings2} active={active} onNavigate={navigate}/>
    <button onClick={onLogout} className="study-nav-item study-nav-idle flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px]"><LogOut size={17}/> Sair</button>
   </div>
  </aside>
  {mobile&&<div className="fixed inset-0 z-50 md:hidden" role="presentation">
   <button aria-label="Fechar menu" className="absolute inset-0 bg-[#081e1acc] backdrop-blur-sm" onClick={()=>onMobileChange(false)}/>
   <div role="dialog" aria-label="Menu de navegação EstudaTI" aria-modal="true" className="app-mobile-menu absolute inset-y-0 left-0 flex w-[min(90vw,340px)] flex-col overflow-y-auto border-r p-5 shadow-2xl">
    <div className="mb-7 flex items-center justify-between">{logo}<button className="theme-switch" onClick={()=>onMobileChange(false)} aria-label="Fechar menu"><X size={18}/></button></div>
    <NavSections active={active} onNavigate={navigate}/>
    <div className="mt-5 space-y-1 border-t pt-4" style={{borderColor:'var(--app-border)'}}>
      <button className="study-nav-item study-nav-idle flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm" onClick={showTools}><Menu size={18}/> Ferramentas opcionais</button>
      <LinkButton id="ajustes" label="Configurações" icon={Settings2} active={active} onNavigate={navigate}/>
      <button className="study-nav-item study-nav-idle flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm" onClick={onLogout}><LogOut size={18}/> Sair</button>
    </div>
   </div>
  </div>}
  <nav aria-label="Navegação rápida" className="app-mobile-tabs fixed inset-x-0 bottom-0 z-30 flex justify-between border-t px-2 pt-2 pb-[max(8px,env(safe-area-inset-bottom))] md:hidden">
   {([
    {id:'painel' as Page,label:'Início',icon:LayoutDashboard},
    {id:'conteudos' as Page,label:'Aulas',icon:BookOpen},
    {id:'banco' as Page,label:'Questões',icon:ListChecks},
    {id:'fontes' as Page,label:'Provas',icon:FileText},
    {id:'flashcards' as Page,label:'Revisar',icon:Brain}
   ]).map(({id,label,icon:Icon})=><button key={id} onClick={()=>navigate(id)}
     aria-current={active===id?'page':undefined}
     className={'flex min-w-0 flex-1 flex-col items-center gap-1.5 rounded-xl px-1 py-1.5 text-[11px] font-semibold '+(active===id?'mobile-nav-active':'mobile-nav-idle')}>
    <Icon size={21}/><span>{label}</span>
   </button>)}
  </nav>
  {toolbox&&<div className="fixed inset-0 z-[65] flex items-center justify-center bg-[#091a16b8] p-4" onMouseDown={e=>{if(e.currentTarget===e.target)setToolbox(false)}}>
   <section role="dialog" aria-modal="true" aria-label="Ferramentas de apoio" className="panel w-full max-w-2xl p-5 shadow-2xl sm:p-7">
    <div className="mb-5 flex items-start justify-between gap-3"><div><h2 className="text-xl font-bold text-white">Ferramentas de apoio</h2><p className="mt-1 text-sm muted">Recursos complementares para quando precisar.</p></div><button className="theme-switch" aria-label="Fechar ferramentas" onClick={()=>setToolbox(false)}><X size={19}/></button></div>
    <div className="grid max-h-[65vh] gap-2 overflow-y-auto sm:grid-cols-2">{extra.map(({id,label,hint,icon:Icon})=><button key={id} onClick={()=>navigate(id)} className="study-tool-card flex items-start gap-3 rounded-xl border p-3.5 text-left">
       <span className="mt-0.5 rounded-lg bg-emerald-400/10 p-2 text-emerald-300"><Icon size={19}/></span>
       <span className="min-w-0"><span className="block text-sm font-bold text-white">{label}</span><span className="mt-1 block text-xs leading-5 muted">{hint}</span></span>
     </button>)}</div>
   </section>
  </div>}
 </>
}
