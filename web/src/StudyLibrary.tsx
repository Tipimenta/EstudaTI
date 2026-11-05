import OfficialExams from './OfficialExams'

/** Provas reais separadas de simulados autorais e do banco geral de questões. */
export default function StudyLibrary(){
 return <div className="fade space-y-6">
  <header className="max-w-4xl">
   <p className="mb-2 text-xs font-extrabold uppercase tracking-[.16em] text-emerald-300">Prática com provas reais</p>
   <h1 className="text-3xl font-bold text-white sm:text-4xl">Provas anteriores</h1>
   <p className="mt-3 max-w-2xl text-sm leading-7 muted">
    Organizadas por concurso e cargo. Comece por uma prova pronta ou importe
    outros cadernos oficiais para resolver diretamente no EstudaTI.
   </p>
  </header>
  <OfficialExams/>
 </div>
}
