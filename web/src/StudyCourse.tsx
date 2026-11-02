import {useEffect,useMemo,useState} from 'react'
import {ArrowLeft,ArrowRight,BookOpen,Check,CheckCircle2,ChevronRight,Clock3,Lightbulb,ListChecks,NotebookPen,RefreshCw,Save,Search} from 'lucide-react'
import {api,patch,post,type Subject,type StudyLesson,type StudyLessonDetail,type QuizQuestion,type QuizResult} from './api'
import {academyLessons,type PedagogicalLesson} from './academy'
import {lessonGuides,type LessonGuide} from './academy/guides'
import {moduleForTopic,positionInCourse} from './academy/curriculum'

type Handbook={title:string;chapters:{title:string;body:string}[];source:string}
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
function norm(s:string){return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/gi,' ').trim().toLowerCase()}
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
function LessonSteps({active,total,onChange}:{active:number;total:number;onChange:(n:number)=>void}){
 return <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-5"><button disabled={active===0} className="btn btn-outline text-xs" onClick={()=>onChange(Math.max(0,active-1))}><ArrowLeft size={15}/> Voltar</button><span className="text-xs font-semibold text-slate-300">{active+1} / {total}</span><button disabled={active===total-1} className="btn btn-primary text-xs" onClick={()=>{onChange(Math.min(total-1,active+1));document.querySelector('#etapa-da-aula')?.scrollIntoView({behavior:'smooth',block:'start'})}}>Continuar <ArrowRight size={15}/></button></div>
}
function AcademyLesson({lesson}:{lesson:PedagogicalLesson}){
 const [active,setActive]=useState(0)
 const total=lesson.steps.length+2
 const step=lesson.steps[active]
 return <div id="etapa-da-aula" className="scroll-mt-28 space-y-5">
  <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/5 p-5"><p className="text-xs font-bold uppercase tracking-wider text-emerald-300">Leitura guiada · Aula revisada</p><h3 className="mt-2 text-lg font-bold text-white">{lesson.title}</h3><p className="mt-2 text-sm leading-6 text-slate-200">{lesson.goal}</p><div className="bartrack mt-4 h-1.5"><div className="barfill" style={{width:((active+1)/total*100)+'%'}}/></div></div>
  <section className="rounded-2xl border border-white/10 bg-white/[.025] p-5 sm:p-7">
   {step?<><p className="mb-2 text-xs font-bold uppercase tracking-widest text-sky-300">PARTE {active+1} · ENTENDA</p><h3 className="mb-5 text-xl font-bold leading-8 text-white">{step.title}</h3><RichText content={step.body}/></>:active===lesson.steps.length?<><p className="mb-2 text-xs font-bold uppercase text-sky-300">VEJA NA PRÁTICA</p><h3 className="mb-5 text-xl font-bold text-white">{lesson.worked.title}</h3><RichText content={lesson.worked.body}/></>:<><h3 className="mb-4 text-xl font-bold text-amber-100">Cuidado com as pegadinhas</h3><ul className="list-disc space-y-3 pl-5 text-sm leading-7 text-slate-200">{lesson.pitfalls.map((x,i)=><li key={i}>{x}</li>)}</ul><p className="mt-5 text-sm leading-6 text-emerald-200">Você terminou a explicação. Agora resolva as questões e depois revise os flashcards.</p></>}
   <LessonSteps active={active} total={total} onChange={setActive}/>
  </section>
  <details className="rounded-xl border border-white/10 bg-white/[.025] p-4"><summary className="cursor-pointer text-sm font-semibold text-emerald-200">Aprofundamento complementar (opcional)</summary><p className="mt-3 text-sm leading-7 text-slate-200">{lesson.extra}</p></details>
  <p className="text-xs text-slate-400">Material autoral em revisão editorial contínua. Fontes legais e normativas precisam ser conferidas na versão vigente.</p>
 </div>
}
function GuidedLesson({guide}:{guide:LessonGuide}){
 const [active,setActive]=useState(0)
 const pages=[{label:'1 · Entenda',title:guide.title,body:guide.theory},{label:'2 · Aplique',title:'Exemplo aplicado',body:guide.practical},{label:'3 · Atenção',title:'O que não confundir',body:guide.warning}].filter(x=>!!x.body)
 const page=pages[Math.min(active,pages.length-1)]
 return <div id="etapa-da-aula" className="scroll-mt-28 space-y-5">
  <div className="rounded-xl border border-sky-400/15 bg-sky-400/5 p-5"><p className="text-xs font-bold uppercase tracking-wider text-sky-300">Aula por etapas · {guide.source_kind==='brief'?'Em aprofundamento editorial':'Material detalhado'}</p><h3 className="mt-2 text-lg font-bold text-white">{guide.title}</h3><p className="mt-2 text-sm leading-6 text-slate-200">{guide.objective}</p><div className="bartrack mt-4 h-1.5"><div className="barfill" style={{width:((active+1)/pages.length*100)+'%'}}/></div></div>
  <section className="rounded-2xl border border-white/10 p-5 sm:p-7"><p className="mb-2 text-xs font-bold uppercase tracking-wider text-emerald-300">{page.label}</p><h3 className="mb-5 text-xl font-bold text-white">{page.title}</h3><RichText content={page.body}/><LessonSteps active={active} total={pages.length} onChange={setActive}/></section>
  {guide.source_kind==='brief'&&<p className="rounded-xl border border-amber-400/15 bg-amber-400/5 p-4 text-xs leading-6 text-slate-300">Este capítulo recebeu uma organização mais clara, mas sua teoria ainda precisa de aprofundamento individual. Evitamos misturar conteúdos de outras aulas apenas para aumentar o tamanho do texto.</p>}
 </div>
}
function TeachingTheory({lesson}:{lesson:StudyLessonDetail}){
 const authored=academyLessons[lesson.id];if(authored)return <AcademyLesson key={lesson.id} lesson={authored}/>
 const guide=lessonGuides[lesson.id];if(guide)return <GuidedLesson key={lesson.id} guide={guide}/>
 return <div className="space-y-4"><h3 className="text-xl font-semibold">Entenda o assunto</h3><RichText content={lesson.content.split(/<!--/)[0]}/></div>
}
export default function StudyCourse({onGoReview}:{onGoReview?:()=>void}){
 const [subjects,setSubjects]=useState<Subject[]>([]);const [lessons,setLessons]=useState<StudyLesson[]>([])
 const [subjectCode,setSubjectCode]=useState<string|null>(null);const [lessonId,setLessonId]=useState<number|null>(null)
 const [detail,setDetail]=useState<StudyLessonDetail|null>(null);const [handbook,setHandbook]=useState<Handbook|null>(null)
 const [previewChapter,setPreviewChapter]=useState<{title:string;body:string}|null>(null)
 const [showLessonPicker,setShowLessonPicker]=useState(false);const [questionIndex,setQuestionIndex]=useState(0);const [tab,setTab]=useState<Tab>('teoria');const [query,setQuery]=useState('');const [courseFilter,setCourseFilter]=useState<'path'|'cases'|'deep'|'intro'|'all'>('all')
 const [notes,setNotes]=useState('');const [error,setError]=useState('');const [busy,setBusy]=useState(false)
 const [allLessonQuestions,setAllLessonQuestions]=useState<QuizQuestion[]>([]);
 const [extraQuestions,setExtraQuestions]=useState<QuizQuestion[]>([]);const [loadingExtras,setLoadingExtras]=useState(false);
 const [flashcardSaved,setFlashcardSaved]=useState<Record<number,string>>({});const [recallShown,setRecallShown]=useState<Record<number,boolean>>({});
 const [choices,setChoices]=useState<Record<number,number>>({});const [results,setResults]=useState<Record<number,QuizResult['results'][number]>>({})
 useEffect(()=>{Promise.all([api<Subject[]>('/subjects'),api<StudyLesson[]>('/study/lessons')]).then(([s,l])=>{setSubjects(s);setLessons(l)}).catch(e=>setError(e.message))},[])
 const matchesTrack=(l:StudyLesson,filter:'path'|'cases'|'deep'|'intro'|'all')=>filter==='all'||(filter==='path'?l.track!=='Introdução':filter==='cases'?l.track==='Oficina de prova':filter==='deep'?l.track==='Aprofundamento':l.track==='Introdução');
 const ofSubject=useMemo(()=>lessons.filter(l=>l.code===subjectCode && matchesTrack(l,courseFilter)).sort((a,b)=>{return positionInCourse(a.code,a.id)-positionInCourse(b.code,b.id)}),[subjectCode,lessons,courseFilter]);
 useEffect(()=>{if(!lessonId)return;setDetail(null);setNotes('');setChoices({});setResults({});setExtraQuestions([]);setQuestionIndex(0);setFlashcardSaved({});setRecallShown({});setError('');api<StudyLessonDetail>(`/study/lessons/${lessonId}`).then(d=>{setDetail(d);setNotes(d.notes)}).catch(e=>setError(e.message))},[lessonId])
 useEffect(()=>{setAllLessonQuestions([]);if(!detail)return;api<{items:QuizQuestion[]}>('/questions/list?subject_id='+detail.subject_id+'&status=revisada&page_size=100').then(d=>setAllLessonQuestions(d.items.filter(q=>q.topic_id===detail.id))).catch(()=>{})},[detail?.id])
 useEffect(()=>{setHandbook(null);if(subjectCode)api<Handbook>(`/study/handbooks/${subjectCode}`).then(setHandbook).catch(()=>{})},[subjectCode])
 const chapter=useMemo(()=>handbook?.chapters.find(c=>norm(c.title)===norm(detail?.title??'')),[handbook,detail])
 const lessonQuestions=detail?(allLessonQuestions.length?allLessonQuestions:detail.questions):[]
 const questionsShown=[...lessonQuestions,...extraQuestions]
 const activeQuestion=questionsShown[questionIndex]
 const currentIndex=ofSubject.findIndex(l=>l.id===lessonId)
 function openSubject(code:string){setShowLessonPicker(false);setPreviewChapter(null);setSubjectCode(code);setCourseFilter('all');const matches=lessons.filter(l=>l.code===code).sort((a,b)=>positionInCourse(code,a.id)-positionInCourse(code,b.id));setLessonId(matches.find(l=>!l.completed)?.id??matches[0]?.id??null);setTab('teoria');setError('')}
 function lCode(l:StudyLesson){return l.code}
 function switchTrack(filter:'path'|'cases'|'deep'|'intro'|'all'){
  setShowLessonPicker(false);setPreviewChapter(null);setCourseFilter(filter);const matches=lessons.filter(l=>l.code===subjectCode&&matchesTrack(l,filter)).sort((a,b)=>positionInCourse(lCode(a),a.id)-positionInCourse(lCode(b),b.id))
  setLessonId(matches.find(l=>!l.completed)?.id??matches[0]?.id??null);setTab('teoria')
 }
 function openLesson(id:number){setShowLessonPicker(false);setPreviewChapter(null);setLessonId(id);setTab('teoria');window.scrollTo({top:0,behavior:'smooth'})}
 async function markCompleted(){if(!detail)return;setBusy(true);try{const data=await patch<{completed:number}>(`/study/lessons/${detail.id}`,{completed:!detail.completed});setDetail({...detail,completed:data.completed});setLessons(ls=>ls.map(l=>l.id===detail.id?{...l,completed:data.completed}:l))}catch(e){setError((e as Error).message)}finally{setBusy(false)}}
 async function saveNotes(){if(!detail)return;setBusy(true);try{await patch(`/study/lessons/${detail.id}`,{notes});setDetail({...detail,notes});setLessons(ls=>ls.map(l=>l.id===detail.id?{...l,notes}:l))}catch(e){setError((e as Error).message)}finally{setBusy(false)}}
 async function loadExtraQuestions(){if(!detail||!subject)return;setLoadingExtras(true);setError('');try{const list=await api<QuizQuestion[]>('/intelligence/quiz?limit=40&subject_id='+subject.id);const local=new Set(lessonQuestions.map(q=>q.id));setExtraQuestions(list.filter(q=>!local.has(q.id)).slice(0,20));setQuestionIndex(lessonQuestions.length)}catch(e){setError((e as Error).message)}finally{setLoadingExtras(false)}}
 async function answer(qid:number){if(choices[qid]===undefined||results[qid])return;setBusy(true);try{const r=await post<QuizResult>('/quiz/submit',{answers:[{question_id:qid,choice_index:choices[qid]}],duration_sec:0});setResults(old=>({...old,[qid]:r.results[0]}))}catch(e){setError((e as Error).message)}finally{setBusy(false)}}
 async function addFlashcard(qid:number){try{const r=await post<{ok:boolean;duplicate:boolean}>(`/questions/${qid}/flashcard`,{});setFlashcardSaved(x=>({...x,[qid]:r.duplicate?'Já está nos seus flashcards.':'Cartão adicionado à revisão espaçada.'}))}catch(e){setError((e as Error).message)}}
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
 <details className="mb-4 rounded-xl border border-white/10 bg-white/[.02] px-4 py-3"><summary className="cursor-pointer text-sm font-semibold text-slate-300">Filtrar etapas da disciplina (opcional)</summary><div className="mt-3 flex flex-wrap gap-2">{([{id:'all',label:'Curso completo'},{id:'intro',label:'Fundamentos'},{id:'deep',label:'Aprofundamento'},{id:'cases',label:'Aplicação'}] as const).map(x=><button key={x.id} onClick={()=>switchTrack(x.id)} className={courseFilter===x.id?'rounded-full bg-emerald-300 px-4 py-2 text-xs font-bold text-slate-950':'rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-white/5'}>{x.label}</button>)}</div></details>
 <button onClick={()=>setShowLessonPicker(v=>!v)} className="btn btn-secondary mb-4 w-full justify-between lg:hidden"><span className="flex items-center gap-2"><BookOpen size={17}/> {showLessonPicker?'Ocultar lista de aulas':'Escolher outra aula'}</span><ChevronRight size={16}/></button>
 <div className="grid items-start gap-5 lg:grid-cols-[285px_minmax(0,1fr)]"><aside className={(showLessonPicker?'block ':'hidden lg:block ')+'panel max-h-[60vh] overflow-y-auto p-3 lg:sticky lg:top-24 lg:max-h-[75vh]'}><div className="mb-2 px-3 py-2 text-xs font-bold uppercase tracking-widest text-slate-400">Aulas desta matéria</div>{ofSubject.map((l,i)=><div key={l.id}>{(i===0||moduleForTopic(l.code,l.id)?.title!==moduleForTopic(ofSubject[i-1].code,ofSubject[i-1].id)?.title)&&<h4 className="mb-2 mt-5 border-t border-white/10 px-3 pt-4 text-[11px] font-bold uppercase tracking-wider text-emerald-200">{moduleForTopic(l.code,l.id)?.title||'Outros assuntos'}</h4>}<button onClick={()=>openLesson(l.id)} className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left ${l.id===lessonId?'border border-emerald-400/20 bg-emerald-400/10 text-white':'text-slate-300 hover:bg-white/5'}`}><span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs font-bold ${l.completed?'bg-emerald-400 text-emerald-950':'bg-slate-700/70'}`}>{l.completed?<Check size={15}/>:String(i+1).padStart(2,'0')}</span><div className="min-w-0 flex-1"><p className="text-sm font-medium leading-5">{academyLessons[l.id]?.title||cleanTitle(l.title)}</p><p className="mt-1 text-[11px] text-slate-400">{academyLessons[l.id]?'Aula estruturada · ':''}{l.completed?'Concluída':'Pendente'}</p></div>{l.id===lessonId&&<ChevronRight size={15} className="shrink-0 text-emerald-300"/>}</button></div>)}</aside>
 <section className="min-w-0">{!detail?<div className="panel p-9 text-sm text-slate-400">Carregando aula...</div>:<><section className="heroGlow rounded-[22px] border border-emerald-300/15 p-6 sm:p-8"><div className="mb-3 flex flex-wrap items-center gap-2"><span className="badge bg-emerald-400/10 text-emerald-200">Aula {currentIndex+1} de {ofSubject.length}</span><span className="badge bg-white/10 text-slate-200"><Clock3 size={12}/> {academyLessons[detail.id]?'Leitura orientada':detail.minutes+' min sugeridos'}</span>{detail.track==='Aprofundamento'&&<span className="badge bg-violet-400/15 text-violet-200">Aprofundamento</span>}{detail.track==='Oficina de prova'&&<span className="badge bg-sky-400/15 text-sky-200">Oficina — aplicação e banca</span>}{detail.completed>0&&<span className="badge bg-emerald-400/20 text-emerald-200"><Check size={12}/> Concluída</span>}</div><h2 className="text-2xl font-bold text-white sm:text-3xl">{academyLessons[detail.id]?.title||lessonGuides[detail.id]?.title||cleanTitle(detail.title)}</h2><p className="mt-3 text-sm leading-7 text-slate-200">{detail.objective}</p></section>
 <nav aria-label="Etapas da aula" className="my-4 grid grid-cols-3 gap-2">{([{id:'teoria',text:'1. Aprender',icon:BookOpen},{id:'pratica',text:'2. Praticar',icon:ListChecks},{id:'revisao',text:'3. Revisar',icon:NotebookPen}] as const).map(({id,text,icon:Icon})=><button key={id} onClick={()=>setTab(id)} className={tab===id?'flex min-w-0 items-center justify-center gap-2 rounded-xl bg-emerald-400/15 px-2 py-3 text-xs font-bold text-emerald-100 ring-1 ring-emerald-400/40':'flex min-w-0 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-2 py-3 text-xs font-semibold text-slate-300 hover:bg-white/10'}><Icon size={15} className="hidden sm:block"/>{text}</button>)}</nav>
 <section className="panel min-h-[370px] p-5 sm:p-8">{tab==='teoria'&&<><TeachingTheory lesson={detail}/>{detail.track==='Oficina de prova'&&<p className="mt-6 rounded-xl border border-amber-300/20 bg-amber-300/5 p-4 text-sm text-amber-100">Aplicação, não repetição: esta oficina usa casos e decisões para transferir o conteúdo já estudado. Resolva as questões sem consultar o exemplo e justifique os distratores.</p>}<div className="mt-8 rounded-2xl border border-emerald-400/15 bg-emerald-400/5 p-4"><button onClick={()=>setTab('pratica')} className="btn btn-primary w-full sm:w-auto">Resolver questões desta aula <ArrowRight size={16}/></button></div>{!academyLessons[detail.id]&&<details className="mt-5 rounded-xl border border-white/10 p-4"><summary className="cursor-pointer text-sm font-semibold text-emerald-200">Arquivo de apoio (opcional)</summary><div className="mt-4">{detail.track!=='Introdução'&&<p className="mb-4 rounded-xl border border-violet-300/20 bg-violet-300/5 p-4 text-sm text-violet-100">Este módulo tem teoria e caso resolvido no conteúdo principal. A apostila é material complementar de fundamentos, não cópia da oficina.</p>}<div className="mb-6 rounded-xl bg-amber-400/5 p-4 text-sm leading-6 text-amber-100">Apostila autoral do EstudaTI, organizada por capítulo. As respostas dos exercícios de treino aparecem no texto. Para se avaliar sem consultar o gabarito, use a etapa <strong>Questões</strong>.</div>{(chapter||previewChapter)?<><h3 className="mb-4 text-lg font-bold text-white">{(chapter||previewChapter)?.title}</h3><RichText content={(chapter||previewChapter)!.body}/></>:<><p className="mb-3 text-sm text-slate-300">Para esta aula, a teoria está disponível na conteúdo principal. Confira também os capítulos complementares da disciplina:</p><div className="space-y-2">{handbook?.chapters.map((c,i)=><button key={c.title} onClick={()=>{const match=ofSubject.find(l=>norm(l.title)===norm(c.title));if(match){openLesson(match.id);setTab('teoria')}else{setPreviewChapter(c)}}} className="block w-full rounded-lg bg-slate-800/60 p-3 text-left text-sm text-slate-200">{i+1}. {c.title}</button>)}</div></> }</div></details>}</>}
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
   <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-5"><button className="btn btn-outline text-sm" disabled={questionIndex<=0} onClick={()=>setQuestionIndex(i=>Math.max(0,i-1))}><ArrowLeft size={15}/> Anterior</button><button className="btn btn-primary text-sm" disabled={questionIndex>=questionsShown.length-1} onClick={()=>setQuestionIndex(i=>Math.min(questionsShown.length-1,i+1))}>Próxima <ArrowRight size={15}/></button></div>
  </section>:<div className="rounded-xl border border-white/10 p-5 text-sm text-slate-300">Não encontramos questões deste assunto. Você pode usar o treino complementar da disciplina.</div>}
  <div className="mt-6 rounded-xl border border-white/10 bg-white/[.025] p-4 sm:p-5"><h4 className="font-semibold text-white">Quer continuar treinando?</h4><p className="mt-2 text-sm leading-6 text-slate-400">As questões acima são do assunto desta aula. Se desejar, carregue até 20 questões de outros assuntos da mesma disciplina, identificadas como treino geral.</p><button className="btn btn-secondary mt-4" disabled={loadingExtras} onClick={loadExtraQuestions}><RefreshCw size={15}/>{loadingExtras?'Carregando...':'Mais questões da disciplina'}</button>{extraQuestions.length>0&&<p className="mt-3 text-xs text-emerald-300">{extraQuestions.length} questões extras adicionadas.</p>}</div>
 </div>}
 {tab==='revisao'&&<><div className="mb-5"><p className="mb-2 text-xs font-bold uppercase tracking-wider text-emerald-300">REVISÃO ATIVA</p><h3 className="text-xl font-bold text-white">Fixe o que você aprendeu</h3><p className="mt-2 text-sm leading-6 text-slate-300">Responda mentalmente antes de virar cada cartão. A repetição espaçada completa está na aba Revisar.</p></div><div className="space-y-3">{(lessonGuides[detail.id]?.recall||academyLessons[detail.id]?.review.map(x=>({front:x.ask,back:x.answer}))||[]).map((card,i)=><div key={i} className="rounded-xl border border-white/10 bg-white/[.03] p-4"><p className="font-semibold leading-6 text-white">{i+1}. {card.front}</p>{recallShown[i]?<p className="mt-3 border-t border-white/10 pt-3 text-sm leading-6 text-emerald-100">{card.back}</p>:null}<button onClick={()=>setRecallShown(p=>({...p,[i]:!p[i]}))} className="mt-3 text-xs font-bold text-emerald-300">{recallShown[i]?'Ocultar resposta':'Mostrar resposta'}</button></div>)}</div><div className="my-6 rounded-2xl border border-emerald-400/15 bg-emerald-400/5 p-5"><h4 className="font-bold text-white">Flashcards com repetição espaçada</h4><p className="mt-2 text-sm leading-6 text-slate-300">O EstudaTI tem cartões programados no banco de dados. Responda e informe se errou ou acertou para agendar a próxima revisão.</p><button className="btn btn-primary mt-4" onClick={onGoReview} disabled={!onGoReview}>Abrir meus flashcards <ArrowRight size={16}/></button></div><details className="rounded-xl border border-white/10 p-4"><summary className="cursor-pointer text-sm font-semibold text-slate-200">Minhas anotações (opcional)</summary><div className="mt-5"><h3 className="text-xl font-bold text-white">Seu caderno desta aula</h3><p className="mt-2 text-sm leading-6 text-slate-400">Anote definições, dúvidas, detalhes da banca ou o que errou. As anotações são guardadas no banco do EstudaTI após salvar.</p></div><textarea value={notes} onChange={e=>setNotes(e.target.value)} maxLength={10000} className="field min-h-[270px] resize-y text-sm leading-7" placeholder="Explique o assunto com suas palavras. O que você confundiu? Quais questões deve refazer?"/><div className="mt-4 flex items-center justify-between gap-3"><span className="text-xs text-slate-400">{notes.length} / 10.000 caracteres</span><button disabled={busy||notes===detail.notes} onClick={saveNotes} className="btn btn-primary"><Save size={16}/> Salvar anotações</button></div></details></>}
 </section>
 <div className="mt-5 flex flex-wrap items-center justify-between gap-3"><button disabled={busy} onClick={markCompleted} className={`btn ${detail.completed?'btn-secondary':'btn-primary'}`}>{detail.completed?<RefreshCw size={16}/>:<CheckCircle2 size={16}/>} {detail.completed?'Marcar como pendente':'Concluir esta aula'}</button><div className="flex gap-2"><button disabled={currentIndex<=0} onClick={()=>openLesson(ofSubject[currentIndex-1].id)} className="btn btn-outline text-sm"><ArrowLeft size={15}/> Anterior</button><button disabled={currentIndex>=ofSubject.length-1} onClick={()=>openLesson(ofSubject[currentIndex+1].id)} className="btn btn-outline text-sm">Próxima <ArrowRight size={15}/></button></div></div>
 <div className="mt-5 flex justify-center"><button onClick={()=>setTab(tab==='teoria'?'pratica':tab==='pratica'?'revisao':'teoria')} className="btn btn-secondary w-full sm:w-auto">{tab==='teoria'?'Ir para as questões':tab==='pratica'?'Revisar com flashcards':'Voltar à aula'} <ArrowRight size={16}/></button></div>
 <p className="mt-6 flex gap-2 text-xs leading-5 text-slate-400"><Lightbulb size={15} className="shrink-0 text-amber-300"/> Marcar uma aula como concluída registra seu avanço, mas não significa domínio comprovado. Utilize questões inéditas e revisões para medir retenção.</p>
 </>}</section></div></div>
}
