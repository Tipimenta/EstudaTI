import {useEffect,useMemo,useState} from 'react'
import {ArrowLeft,ArrowRight,BookOpen,Check,CheckCircle2,ChevronRight,Clock3,ListChecks,NotebookPen,RefreshCw,Save,Search} from 'lucide-react'
import {api,patch,post,type Subject,type StudyLesson,type StudyLessonDetail,type QuizQuestion,type QuizResult} from './api'
import {academyLessons,type PedagogicalLesson} from './academy'
import {moduleForTopic,positionInCourse} from './academy/curriculum'

type Tab='teoria'|'pratica'|'revisao'
const palette:Record<string,{icon:string,subtitle:string,focus:string}>={
 RED:{icon:'🌐',subtitle:'Protocolos, endereçamento e conectividade',focus:'Explique os protocolos e resolva cálculos de sub-redes sem consulta.'},
 SEG:{icon:'🛡️',subtitle:'Gestão de riscos, criptografia e defesa',focus:'Relacionar controles, ameaças e respostas a incidentes.'},
 SO:{icon:'💻',subtitle:'Servidores, Linux, Windows e containers',focus:'Conectar teoria de administração aos cenários de infraestrutura.'},
 POR:{icon:'📖',subtitle:'Interpretação, gramática e pontuação',focus:'Resolver questões de texto antes de memorizar regras isoladas.'},
 GOV:{icon:'📊',subtitle:'ITIL, COBIT, contratos e governança',focus:'Diferenciar os objetivos de cada framework e processo.'},
 BD:{icon:'🗃️',subtitle:'SQL, modelagem, índices e transações',focus:'Praticar consultas e explicar seus efeitos nos dados.'},
 ENG:{icon:'🧩',subtitle:'APIs, requisitos, testes e arquitetura',focus:'Relacionar conceitos a situações reais de software.'},
 LOG:{icon:'🔢',subtitle:'Lógica, conjuntos, probabilidades e sequências',focus:'Resolver problemas passo a passo sem antecipar o gabarito.'},
 LEG:{icon:'⚖️',subtitle:'LGPD, licitações e governo digital',focus:'Conferir dispositivos vigentes nas fontes oficiais antes da prova.'}
}
function pct(n:number,d:number){return d?Math.round(100*n/d):0}
function TextInline({text}:{text:string}){
 const parts=text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\(https?:\/\/[^)]+\))/g)
 return <>{parts.map((part,i)=>{
  if(part.startsWith('**')&&part.endsWith('**'))return <strong key={i} className="font-bold text-white">{part.slice(2,-2)}</strong>
  if(part.startsWith('`')&&part.endsWith('`'))return <code key={i} className="break-all rounded bg-emerald-400/10 px-1 py-0.5 font-mono text-emerald-200">{part.slice(1,-1)}</code>
  const link=part.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/)
  if(link)return <a key={i} className="break-words text-sky-300 underline" href={link[2]} target="_blank" rel="noopener noreferrer">{link[1]}</a>
  return <span key={i}>{part}</span>
 })}</>
}
function RichText({content}:{content:string}){
 type Block={kind:'heading'|'para'|'bullet'|'numbered'|'code'|'quote'|'table';text:string;rows?:string[][];items?:string[]}
 const blocks:Block[]=[];const paragraphs:string[]=[];let inCode=false;let code:string[]=[]
 const flush=()=>{if(paragraphs.length){blocks.push({kind:'para',text:paragraphs.join(' ')});paragraphs.length=0}}
 const appendItem=(kind:'bullet'|'numbered',item:string)=>{
  const last=blocks[blocks.length-1]
  if(last?.kind===kind)last.items?.push(item)
  else blocks.push({kind,text:'',items:[item]})
 }
 for(const raw of content.split('\n')){
  const line=raw.trim()
  if(line.startsWith('<!--'))continue
  if(line.startsWith('```')){if(!inCode){flush();code=[];inCode=true}else{blocks.push({kind:'code',text:code.join('\n')});inCode=false}continue}
  if(inCode){code.push(raw);continue}
  if(!line){flush();continue}
  if(/^\|.+\|$/.test(line)){
   flush()
   if(/^\|[\s:|\-]+\|$/.test(line))continue
   const row=line.slice(1,-1).split('|').map(x=>x.trim())
   const last=blocks[blocks.length-1]
   if(last?.kind==='table')last.rows?.push(row)
   else blocks.push({kind:'table',text:'',rows:[row]})
   continue
  }
  if(/^#{1,4} /.test(line)){flush();blocks.push({kind:'heading',text:line.replace(/^#+ /,'')});continue}
  if(/^[-*] /.test(line)){flush();appendItem('bullet',line.slice(2));continue}
  if(/^\d+[.)]\s+/.test(line)){flush();appendItem('numbered',line.replace(/^\d+[.)]\s+/,''));continue}
  if(line.startsWith('>')){flush();blocks.push({kind:'quote',text:line.slice(1).trim()});continue}
  paragraphs.push(line)
 }flush()
 if(inCode&&code.length)blocks.push({kind:'code',text:code.join('\n')})
 return <article className="space-y-4 text-[15px] leading-[1.8] text-slate-200 sm:text-base">{blocks.map((b,i)=>{
  if(b.kind==='heading')return <h3 key={i} className="mt-7 border-b border-white/10 pb-2 text-base font-bold leading-7 text-emerald-100 sm:text-lg"><TextInline text={b.text}/></h3>
  if(b.kind==='code')return <pre key={i} className="max-w-full overflow-x-auto whitespace-pre rounded-xl border border-white/10 bg-[#080e19] p-4 text-xs leading-6 text-emerald-100 sm:text-sm"><code>{b.text}</code></pre>
  if(b.kind==='table')return <div key={i} className="max-w-full overflow-x-auto rounded-xl border border-white/10"><table className="w-full min-w-[400px] text-left text-sm"><thead className="bg-white/10"><tr>{b.rows?.[0]?.map((col,j)=><th key={j} className="border-b border-white/10 px-4 py-3 font-bold text-white"><TextInline text={col}/></th>)}</tr></thead><tbody>{b.rows?.slice(1).map((row,j)=><tr key={j} className="border-b border-white/5">{row.map((col,k)=><td key={k} className="px-4 py-3 align-top text-slate-300"><TextInline text={col}/></td>)}</tr>)}</tbody></table></div>
  if(b.kind==='bullet')return <ul key={i} className="list-disc space-y-2 pl-5 marker:text-emerald-400">{b.items?.map((item,j)=><li key={j} className="pl-1"><TextInline text={item}/></li>)}</ul>
  if(b.kind==='numbered')return <ol key={i} className="list-decimal space-y-2 pl-6 marker:font-semibold marker:text-emerald-400">{b.items?.map((item,j)=><li key={j} className="pl-1"><TextInline text={item}/></li>)}</ol>
  if(b.kind==='quote')return <blockquote key={i} className="border-l-2 border-amber-400/50 pl-4 italic text-amber-100"><TextInline text={b.text}/></blockquote>
  return <p key={i} className="break-words"><TextInline text={b.text}/></p>
 })}</article>
}
function cleanTitle(title:string){return title.replace(/^\[(Aprofundamento|Oficina)\]\s*/i,'')}
function AcademyLesson({lesson,onPractice}:{lesson:PedagogicalLesson;onPractice:()=>void}){
 const objective=lesson.goal&&!lesson.goal.startsWith('Explicar e aplicar:')?lesson.goal:''
 return <div className="reader scroll-mt-28 space-y-6">
  {objective&&<div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4 text-sm leading-7 text-slate-200"><span className="font-bold text-emerald-200">Você vai aprender:</span> {objective}</div>}
  {lesson.steps.map((step,index)=><section key={index} className={index?'border-t border-white/10 pt-6':''}>
    <h3 className="mb-4 text-xl font-bold leading-8 text-white">{step.title.replace(/^\\d+\\.\\s*/,'').replace(/^Entenda /,'Conhecendo ')}</h3>
    <RichText content={step.body}/>
  </section>)}
  <section className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5 sm:p-7">
   <p className="mb-2 text-xs font-bold uppercase tracking-wide text-emerald-300">Aplicação passo a passo</p>
   <h3 className="mb-4 text-xl font-bold text-white">{lesson.worked.title}</h3>
   <RichText content={lesson.worked.body}/>
  </section>
  {lesson.pitfalls.length>0&&<section className="border-t border-white/10 pt-5">
   <h3 className="mb-4 text-lg font-bold text-white">Atenção às pegadinhas da banca</h3>
   <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-slate-200">{lesson.pitfalls.map((item,index)=><li key={index}>{item}</li>)}</ul>
  </section>}
  <div className="flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
   <p className="text-sm leading-6 muted">Terminou a leitura? Teste o que compreendeu nas questões da aula.</p>
   <button className="btn btn-primary shrink-0" onClick={onPractice}>Resolver questões <ArrowRight size={16}/></button>
  </div>
 </div>
}
function TeachingTheory({lesson,onPractice}:{lesson:StudyLessonDetail;onPractice:()=>void}){
 const authored=academyLessons[lesson.id];if(authored)return <AcademyLesson key={lesson.id} lesson={authored} onPractice={onPractice}/>
 return <div className="reader space-y-5"><RichText content={lesson.content.split(/<!--/)[0]}/><button className="btn btn-primary" onClick={onPractice}>Resolver questões <ArrowRight size={16}/></button></div>
}
export default function StudyCourse({onGoReview}:{onGoReview?:()=>void}){
 const [subjects,setSubjects]=useState<Subject[]>([]);const [lessons,setLessons]=useState<StudyLesson[]>([])
 const [subjectCode,setSubjectCode]=useState<string|null>(null);const [lessonId,setLessonId]=useState<number|null>(null)
 const [detail,setDetail]=useState<StudyLessonDetail|null>(null)
 const [showLessonPicker,setShowLessonPicker]=useState(false);const [questionIndex,setQuestionIndex]=useState(0);const [tab,setTab]=useState<Tab>('teoria');const [query,setQuery]=useState('')
 const [notes,setNotes]=useState('');const [error,setError]=useState('');const [busy,setBusy]=useState(false)
 const [allLessonQuestions,setAllLessonQuestions]=useState<QuizQuestion[]>([]);
 const [extraQuestions,setExtraQuestions]=useState<QuizQuestion[]>([]);const [loadingExtras,setLoadingExtras]=useState(false);
 const [flashcardSaved,setFlashcardSaved]=useState<Record<number,string>>({});const [recallShown,setRecallShown]=useState<Record<number,boolean>>({});
 const [choices,setChoices]=useState<Record<number,number>>({});const [results,setResults]=useState<Record<number,QuizResult['results'][number]>>({})
 useEffect(()=>{Promise.all([api<Subject[]>('/subjects'),api<StudyLesson[]>('/study/lessons')]).then(([s,l])=>{setSubjects(s);setLessons(l)}).catch(e=>setError(e.message))},[])
 const ofSubject=useMemo(()=>lessons.filter(l=>l.code===subjectCode).sort((a,b)=>positionInCourse(a.code,a.id)-positionInCourse(b.code,b.id)),[subjectCode,lessons]);
 useEffect(()=>{if(!lessonId)return;setDetail(null);setNotes('');setChoices({});setResults({});setExtraQuestions([]);setQuestionIndex(0);setFlashcardSaved({});setRecallShown({});setError('');api<StudyLessonDetail>(`/study/lessons/${lessonId}`).then(d=>{setDetail(d);setNotes(d.notes)}).catch(e=>setError(e.message))},[lessonId])
 useEffect(()=>{setAllLessonQuestions([]);if(!detail)return;api<{items:QuizQuestion[]}>('/questions/list?subject_id='+detail.subject_id+'&status=revisada&page_size=100').then(d=>setAllLessonQuestions(d.items.filter(q=>q.topic_id===detail.id))).catch(()=>{})},[detail?.id])
 const lessonQuestions=detail?(allLessonQuestions.length?allLessonQuestions:detail.questions):[]
 const questionsShown=[...lessonQuestions,...extraQuestions]
 const activeQuestion=questionsShown[questionIndex]
 const currentIndex=ofSubject.findIndex(l=>l.id===lessonId)
 function openSubject(code:string){setShowLessonPicker(false);setSubjectCode(code);const matches=lessons.filter(l=>l.code===code).sort((a,b)=>positionInCourse(code,a.id)-positionInCourse(code,b.id));setLessonId(matches.find(l=>!l.completed)?.id??matches[0]?.id??null);setTab('teoria');setError('')}
 function openLesson(id:number){setShowLessonPicker(false);setLessonId(id);setTab('teoria');window.scrollTo({top:0,behavior:'smooth'})}
 async function markCompleted(){if(!detail)return;setBusy(true);try{const data=await patch<{completed:number}>(`/study/lessons/${detail.id}`,{completed:!detail.completed});setDetail({...detail,completed:data.completed});setLessons(ls=>ls.map(l=>l.id===detail.id?{...l,completed:data.completed}:l))}catch(e){setError((e as Error).message)}finally{setBusy(false)}}
 async function saveNotes(){if(!detail)return;setBusy(true);try{await patch(`/study/lessons/${detail.id}`,{notes});setDetail({...detail,notes});setLessons(ls=>ls.map(l=>l.id===detail.id?{...l,notes}:l))}catch(e){setError((e as Error).message)}finally{setBusy(false)}}
 async function loadExtraQuestions(){if(!detail||!subject)return;setLoadingExtras(true);setError('');try{const list=await api<QuizQuestion[]>('/intelligence/quiz?limit=40&subject_id='+subject.id);const local=new Set(lessonQuestions.map(q=>q.id));setExtraQuestions(list.filter(q=>!local.has(q.id)).slice(0,20));setQuestionIndex(lessonQuestions.length)}catch(e){setError((e as Error).message)}finally{setLoadingExtras(false)}}
 async function answer(qid:number){if(choices[qid]===undefined||results[qid])return;setBusy(true);try{const r=await post<QuizResult>('/quiz/submit',{answers:[{question_id:qid,choice_index:choices[qid]}],duration_sec:0});setResults(old=>({...old,[qid]:r.results[0]}))}catch(e){setError((e as Error).message)}finally{setBusy(false)}}
 async function addFlashcard(qid:number){try{const r=await post<{ok:boolean;duplicate:boolean}>(`/questions/${qid}/flashcard`,{});setFlashcardSaved(x=>({...x,[qid]:r.duplicate?'Já está nos seus flashcards.':'Cartão adicionado à revisão espaçada.'}))}catch(e){setError((e as Error).message)}}
 function goToTab(target:Tab){setTab(target);window.setTimeout(()=>document.getElementById('estudati-tabs')?.scrollIntoView({behavior:'smooth',block:'start'}),30)}
 const filtered=subjects.filter(s=>`${s.name} ${s.category}`.toLowerCase().includes(query.toLowerCase()))
 if(!subjectCode)return <div className="fade">
  <header className="mb-5"><p className="text-xs font-bold uppercase tracking-wider text-emerald-300">MINHAS AULAS</p><h1 className="mt-2 text-3xl font-extrabold text-white">Escolha uma matéria</h1><p className="mt-2 text-sm leading-6 muted">Entre na disciplina e continue a próxima aula. O progresso fica salvo.</p></header>
  <div className="mb-5 flex flex-wrap gap-2 text-xs text-slate-300"><span className="rounded-full border border-white/10 px-3 py-2">{subjects.length} matérias</span><span className="rounded-full border border-white/10 px-3 py-2">{lessons.length} aulas</span><span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 font-semibold text-emerald-300">{lessons.filter(l=>l.completed).length} concluídas</span></div>
  <div className="relative mb-6 max-w-xl"><Search size={18} className="pointer-events-none absolute left-4 top-3.5 text-slate-400"/><input className="field" style={{paddingLeft:48}} placeholder="Buscar matéria..." aria-label="Buscar matéria" value={query} onChange={e=>setQuery(e.target.value)}/></div>
  {error&&<p role="alert" className="mb-4 text-rose-200">{error}</p>}
  <div className="grid gap-3 md:grid-cols-2">{filtered.map(subject=>{const items=lessons.filter(l=>l.subject_id===subject.id);const done=items.filter(l=>l.completed).length;const info=palette[subject.code]??{icon:'📚',subtitle:'Conteúdo de concurso',focus:'Aprenda por etapas.'};return <button key={subject.id} onClick={()=>openSubject(subject.code)} className="group panel flex w-full items-center gap-4 p-4 text-left transition hover:border-emerald-400/40 sm:p-5"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-slate-700/40 text-2xl">{info.icon}</span><span className="min-w-0 flex-1"><span className="block text-base font-bold text-white">{subject.name}</span><span className="mt-1 block text-xs text-slate-400">{done} de {items.length} aulas concluídas</span><span className="bartrack mt-3 block h-1.5"><span className="barfill block" style={{width:pct(done,items.length)+'%'}}/></span></span><ArrowRight size={18} className="shrink-0 text-emerald-300"/></button>})}</div>
  {!filtered.length&&<div className="panel p-6 text-sm text-slate-300">Nenhuma matéria encontrada.</div>}
  <p className="mt-6 text-sm leading-6 text-slate-400">Como funciona: <b className="text-white">ler a aula → resolver questões → marcar como concluída.</b></p>
 </div>
  const subject=subjects.find(s=>s.code===subjectCode)
 return <div className="fade">
 <button onClick={()=>{setSubjectCode(null);setLessonId(null);setShowLessonPicker(false)}} className="mb-4 flex items-center gap-2 text-sm font-semibold text-emerald-300 hover:underline"><ArrowLeft size={16}/> Voltar às matérias</button>
 <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-wider text-emerald-300">AULAS DA DISCIPLINA</p><h1 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">{subject?.name}</h1></div><div className="min-w-[140px] text-xs text-slate-300"><span>{ofSubject.filter(l=>l.completed).length} de {ofSubject.length} concluídas</span><div className="bartrack mt-2"><div className="barfill" style={{width:pct(ofSubject.filter(l=>l.completed).length,ofSubject.length)+'%'}}/></div></div></div>
 {error&&<div role="alert" className="mb-5 rounded-xl bg-rose-400/10 p-3 text-sm text-rose-200">{error}</div>}
 <button onClick={()=>setShowLessonPicker(v=>!v)} className="btn btn-secondary mb-4 w-full justify-between lg:hidden"><span className="flex items-center gap-2"><BookOpen size={17}/> {showLessonPicker?'Ocultar lista de aulas':'Escolher outra aula'}</span><ChevronRight size={16}/></button>
 <div className="grid items-start gap-5 lg:grid-cols-[270px_minmax(0,1fr)]">
 <aside className={(showLessonPicker?'block ':'hidden lg:block ')+'panel max-h-[70vh] overflow-y-auto p-3 lg:sticky lg:top-24 lg:max-h-[78vh]'}>
  <div className="mb-2 px-3 py-2 text-xs font-extrabold uppercase tracking-wider muted">Conteúdo da matéria</div>
  {ofSubject.reduce<{title:string;items:StudyLesson[]}[]>((groups,lesson)=>{
    const title=moduleForTopic(lesson.code,lesson.id)?.title||'Outros assuntos'
    let section=groups.find(x=>x.title===title)
    if(!section){section={title,items:[]};groups.push(section)}
    section.items.push(lesson)
    return groups
   },[]).map((group)=>{
     const currentGroup=group.items.some(l=>l.id===lessonId)
     const done=group.items.filter(l=>l.completed).length
     return <details key={group.title+(currentGroup?'-current':'')} open={currentGroup?true:undefined} className="lesson-module mb-2 rounded-xl border" style={{borderColor:'var(--app-border)'}}>
      <summary className="cursor-pointer rounded-xl px-3 py-3 text-[12px] font-bold leading-5 text-slate-200">
       <span className="block pr-3">{group.title}</span>
       <span className="mt-1 block text-[11px] font-normal muted">{done}/{group.items.length} aulas concluídas</span>
      </summary>
      <div className="space-y-1 border-t p-1.5" style={{borderColor:'var(--app-border)'}}>
      {group.items.map(l=>{
       const i=ofSubject.findIndex(x=>x.id===l.id)
       return <button key={l.id} onClick={()=>openLesson(l.id)} aria-current={l.id===lessonId?'page':undefined} className={'flex w-full items-start gap-2.5 rounded-lg px-2.5 py-3 text-left transition-colors '+(l.id===lessonId?'study-nav-active':'study-nav-idle')}>
        <span className={'grid h-6 w-6 shrink-0 place-items-center rounded-md text-[11px] font-bold '+(l.completed?'bg-emerald-400/20 text-emerald-300':'bg-slate-700/20 text-slate-400')}>{l.completed?<Check size={14}/>:String(i+1).padStart(2,'0')}</span>
        <span className="min-w-0 flex-1"><span className="block text-[12px] font-semibold leading-[1.5]">{academyLessons[l.id]?.title||cleanTitle(l.title)}</span>{l.completed&&<span className="mt-0.5 block text-[10px] text-emerald-300">Concluída</span>}</span>
       </button>
      })}
      </div>
     </details>
    })}
 </aside>
 <section className="min-w-0">{!detail?<div className="panel p-9 text-sm text-slate-400">Carregando aula...</div>:<><section className="heroGlow rounded-[22px] border border-emerald-300/15 p-6 sm:p-8"><div className="mb-3 flex flex-wrap items-center gap-2"><span className="badge bg-emerald-400/10 text-emerald-200">Aula {currentIndex+1} de {ofSubject.length}</span><span className="badge bg-white/10 text-slate-200"><Clock3 size={12}/> {detail.minutes} min sugeridos</span>{detail.completed>0&&<span className="badge bg-emerald-400/20 text-emerald-200"><Check size={12}/> Concluída</span>}</div><h2 className="text-2xl font-bold text-white sm:text-3xl">{academyLessons[detail.id]?.title||cleanTitle(detail.title)}</h2>{!(academyLessons[detail.id]?.goal&&!academyLessons[detail.id]?.goal.startsWith("Explicar e aplicar:"))&&<p className="mt-3 text-sm leading-7 text-slate-200">{detail.objective}</p>}</section>
 <nav id="estudati-tabs" aria-label="Etapas da aula" className="my-4 grid scroll-mt-28 grid-cols-3 gap-2">{([{id:'teoria',text:'1. Aprender',icon:BookOpen},{id:'pratica',text:'2. Praticar',icon:ListChecks},{id:'revisao',text:'3. Revisar',icon:NotebookPen}] as const).map(({id,text,icon:Icon})=><button key={id} onClick={()=>goToTab(id)} className={tab===id?'flex min-w-0 items-center justify-center gap-2 rounded-xl bg-emerald-400/15 px-2 py-3 text-xs font-bold text-emerald-100 ring-1 ring-emerald-400/40':'flex min-w-0 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-2 py-3 text-xs font-semibold text-slate-300 hover:bg-white/10'}><Icon size={15} className="hidden sm:block"/>{text}</button>)}</nav>
 <section className="panel min-h-[370px] p-4 sm:p-8">{tab==='teoria'&&<TeachingTheory lesson={detail} onPractice={()=>goToTab('pratica')}/>}
 {tab==='pratica'&&<div id="estudati-questoes">
  <div className="mb-6"><p className="mb-2 text-xs font-bold uppercase tracking-wider text-emerald-300">PRÁTICA GUIADA</p><h3 className="text-xl font-bold text-white">Resolva uma questão por vez</h3><p className="mt-2 text-sm leading-6 text-slate-400">Marque sua resposta, confira a explicação e avance no seu ritmo. As respostas ficam registradas no seu desempenho.</p></div>
  {activeQuestion?<section className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 sm:p-6">
   <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-xs">
    <span className="font-semibold text-emerald-300">Questão {questionIndex+1} de {questionsShown.length}</span>
    <span className="rounded-full bg-white/5 px-3 py-1.5 text-slate-300">{questionIndex<lessonQuestions.length?'Deste assunto':'Treino geral da disciplina'}</span>
   </div>
   <div className="bartrack mb-6 h-1.5"><div className="barfill" style={{width:((questionIndex+1)/questionsShown.length*100)+'%'}}/></div>
   <h4 className="mb-6 text-base font-semibold leading-7 text-white">{activeQuestion.question}</h4>
   <div className="space-y-3">{activeQuestion.choices.map((choice,i)=><button key={i} disabled={!!results[activeQuestion.id]} onClick={()=>setChoices(v=>({...v,[activeQuestion.id]:i}))} className={choices[activeQuestion.id]===i?'flex w-full items-start gap-3 rounded-xl border border-emerald-400/60 bg-emerald-400/10 p-4 text-left text-sm leading-6':'flex w-full items-start gap-3 rounded-xl border border-white/10 bg-white/[.025] p-4 text-left text-sm leading-6 hover:bg-white/5'}><span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-slate-700 text-xs font-bold">{'ABCDE'[i]}</span><span>{choice}</span></button>)}</div>
   {results[activeQuestion.id]?<div className={results[activeQuestion.id].correct?'mt-5 rounded-xl border border-emerald-400/25 bg-emerald-400/10 p-4':'mt-5 rounded-xl border border-amber-400/25 bg-amber-400/10 p-4'}>
    <p className="font-bold text-white">{results[activeQuestion.id].correct?'Resposta correta!':'Vamos entender o erro'}</p>
    <p className="mt-2 text-sm font-semibold text-slate-200">Gabarito: {'ABCDE'[results[activeQuestion.id].correct_index]} — {activeQuestion.choices[results[activeQuestion.id].correct_index]}</p>
    <p className="mt-3 text-sm leading-7 text-slate-200">{results[activeQuestion.id].explanation}</p>
    {Object.entries(results[activeQuestion.id].choice_rationales||{}).filter(([,explanation])=>!!explanation).length>0&&<details className="mt-4 border-t border-white/10 pt-4"><summary className="cursor-pointer text-sm font-semibold text-slate-100">Ver comentário de cada alternativa</summary><div className="mt-3 space-y-2">{Object.entries(results[activeQuestion.id].choice_rationales||{}).filter(([,explanation])=>!!explanation).map(([letter,explanation])=><p key={letter} className="text-sm leading-6 text-slate-300"><b className="text-white">{letter}:</b> {explanation}</p>)}</div></details>}
   </div>:<button disabled={busy||choices[activeQuestion.id]===undefined} onClick={()=>answer(activeQuestion.id)} className="btn btn-primary mt-5 w-full sm:w-auto">Conferir resposta <Check size={16}/></button>}
   {results[activeQuestion.id]&&!results[activeQuestion.id].correct&&<div className="mt-3"><button onClick={()=>addFlashcard(activeQuestion.id)} disabled={!!flashcardSaved[activeQuestion.id]} className="btn btn-secondary text-xs">Salvar erro como flashcard</button>{flashcardSaved[activeQuestion.id]&&<p className="mt-2 text-xs text-emerald-300">{flashcardSaved[activeQuestion.id]}</p>}</div>}
   <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-5"><button className="btn btn-outline text-sm" disabled={questionIndex<=0} onClick={()=>setQuestionIndex(i=>Math.max(0,i-1))}><ArrowLeft size={15}/> Anterior</button><button className="btn btn-primary text-sm" disabled={!results[activeQuestion.id]} onClick={()=>{if(questionIndex===questionsShown.length-1)goToTab('revisao');else{setQuestionIndex(i=>i+1);document.getElementById('estudati-tabs')?.scrollIntoView({behavior:'smooth',block:'start'})}}}>{questionIndex===questionsShown.length-1?'Ir para revisão':'Próxima'} <ArrowRight size={15}/></button></div>
  </section>:<div className="rounded-xl border border-white/10 p-5 text-sm text-slate-300">Não encontramos questões deste assunto. Você pode usar o treino complementar da disciplina.</div>}
  <details className="mt-6 rounded-xl border border-white/10 bg-white/[.025] p-4 sm:p-5"><summary className="cursor-pointer text-sm font-semibold text-emerald-100">Treinar outras questões desta matéria (opcional)</summary><p className="mt-2 text-sm leading-6 text-slate-400">As questões acima são do assunto desta aula. Se desejar, carregue até 20 questões de outros assuntos da mesma disciplina, identificadas como treino geral.</p><button className="btn btn-secondary mt-4" disabled={loadingExtras} onClick={loadExtraQuestions}><RefreshCw size={15}/>{loadingExtras?'Carregando...':'Mais questões da disciplina'}</button>{extraQuestions.length>0&&<p className="mt-3 text-xs text-emerald-300">{extraQuestions.length} questões extras adicionadas.</p>}</details>
 </div>}
 {tab==='revisao'&&<><div className="mb-5"><p className="mb-2 text-xs font-bold uppercase tracking-wider text-emerald-300">REVISÃO ATIVA</p><h3 className="text-xl font-bold text-white">Fixe o que você aprendeu</h3><p className="mt-2 text-sm leading-6 text-slate-300">Responda mentalmente antes de virar cada cartão. A repetição espaçada completa está na aba Revisar.</p></div><div className="space-y-3">{(academyLessons[detail.id]?.review.map(x=>({front:x.ask,back:x.answer}))||[]).map((card,i)=><div key={i} className="rounded-xl border border-white/10 bg-white/[.03] p-4"><p className="font-semibold leading-6 text-white">{i+1}. {card.front}</p>{recallShown[i]?<p className="mt-3 border-t border-white/10 pt-3 text-sm leading-6 text-emerald-100">{card.back}</p>:null}<button onClick={()=>setRecallShown(p=>({...p,[i]:!p[i]}))} className="mt-3 text-xs font-bold text-emerald-300">{recallShown[i]?'Ocultar resposta':'Mostrar resposta'}</button></div>)}</div><div className="my-6 rounded-2xl border border-emerald-400/15 bg-emerald-400/5 p-5"><h4 className="font-bold text-white">Flashcards com repetição espaçada</h4><p className="mt-2 text-sm leading-6 text-slate-300">O EstudaTI tem cartões programados no banco de dados. Responda e informe se errou ou acertou para agendar a próxima revisão.</p><button className="btn btn-primary mt-4" onClick={onGoReview} disabled={!onGoReview}>Abrir meus flashcards <ArrowRight size={16}/></button></div><details className="rounded-xl border border-white/10 p-4"><summary className="cursor-pointer text-sm font-semibold text-slate-200">Minhas anotações (opcional)</summary><div className="mt-5"><h3 className="text-xl font-bold text-white">Seu caderno desta aula</h3><p className="mt-2 text-sm leading-6 text-slate-400">Anote definições, dúvidas, detalhes da banca ou o que errou. As anotações são guardadas no banco do EstudaTI após salvar.</p></div><textarea value={notes} onChange={e=>setNotes(e.target.value)} maxLength={10000} className="field min-h-[270px] resize-y text-sm leading-7" placeholder="Explique o assunto com suas palavras. O que você confundiu? Quais questões deve refazer?"/><div className="mt-4 flex items-center justify-between gap-3"><span className="text-xs text-slate-400">{notes.length} / 10.000 caracteres</span><button disabled={busy||notes===detail.notes} onClick={saveNotes} className="btn btn-primary"><Save size={16}/> Salvar anotações</button></div></details></>}
 </section>
 {tab==='revisao'&&<div className="mt-6 rounded-2xl border border-emerald-300/15 bg-emerald-300/5 p-5">
 {!detail.completed?<><h3 className="font-bold text-white">Finalizar esta aula</h3><p className="mt-2 text-sm leading-6 text-slate-300">Depois de estudar, praticar e revisar, registre seu avanço.</p><button disabled={busy} onClick={markCompleted} className="btn btn-primary mt-4 w-full sm:w-auto"><CheckCircle2 size={17}/> Concluir aula</button></>:<><p className="flex items-center gap-2 font-semibold text-emerald-200"><CheckCircle2 size={18}/> Aula concluída</p>{currentIndex<ofSubject.length-1&&<button className="btn btn-primary mt-4 w-full sm:w-auto" onClick={()=>openLesson(ofSubject[currentIndex+1].id)}>Próxima aula <ArrowRight size={17}/></button>}</>}
 </div>}
 </>}</section></div></div>
}
