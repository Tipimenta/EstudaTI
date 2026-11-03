import OfficialExams from './OfficialExams'
import {ShieldCheck} from 'lucide-react'

/** Tela única: acervo que o aluno consegue resolver, sem diretório de links. */
export default function StudyLibrary(){
 return <div className="fade space-y-6">
  <header>
   <p className="mb-2 text-xs font-bold uppercase tracking-[.18em] text-emerald-300">Acervo de provas reais</p>
   <h1 className="text-3xl font-bold text-white sm:text-4xl">Provas anteriores</h1>
   <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
    Escolha um concurso, resolva suas questões e acompanhe o resultado. Para pesquisar os
    cadernos oficiais cadastrados e atualizar o acervo, use o botão nesta página.
    <strong className="text-white"> Não precisa abrir links ou importar PDFs manualmente.</strong>
   </p>
  </header>
  <OfficialExams/>
  <div className="rounded-xl border border-sky-400/15 bg-sky-400/5 p-4 text-xs leading-6 text-slate-300">
   <ShieldCheck size={16} className="mr-2 inline text-sky-300"/>
   As provas são organizadas por banca, concurso e cargo. O sistema só disponibiliza
   questões com gabarito oficial identificado e extração textual que passa pelas verificações.
   Questões que dependem de gráficos, destaques, trechos externos ou páginas incompletas
   podem não aparecer. A validação automática não substitui revisão técnica de 100% do conteúdo.
  </div>
 </div>
}
