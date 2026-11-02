import {useState} from 'react'
import { AlertCircle, BookOpenCheck, FileSearch, FileUp, ShieldCheck } from 'lucide-react'

type Analysis={filename:string;pages:number;chars:number;keyword_matches:{group:string;hits:string[]}[]; extracts:{page:number;keyword:string;excerpt:string}[];warning:string}

export default function EditalReader(){
 const [file,setFile]=useState<File|null>(null),[busy,setBusy]=useState(false)
 const [data,setData]=useState<Analysis|null>(null),[error,setError]=useState('')
 async function analyze(){if(!file)return;setBusy(true);setData(null);setError('')
  try{const form=new FormData();form.append('file',file)
   const response=await fetch('/api/editais/analisar',{method:'POST',body:form,credentials:'include'})
   const result=await response.json();if(!response.ok)throw new Error(result.detail||'Erro na análise do PDF')
   setData(result)
  }catch(e){setError((e as Error).message)}finally{setBusy(false)}
 }
 return <div className="fade"><p className="mb-2 text-xs font-bold uppercase tracking-[.20em] text-emerald-300">Leitor exploratório de editais</p>
  <h1 className="text-3xl font-bold text-white sm:text-4xl">Analisar edital</h1>
  <p className="mt-3 max-w-3xl text-sm leading-6 muted">Envie um edital em PDF, localize trechos relevantes e veja quais palavras-chave de disciplinas foram identificadas. <b>Você precisa validar tudo</b>: análise por palavras não substitui a leitura do edital do cargo.</p>
  <div className="panel mt-6 p-6"><label className="block rounded-xl border border-dashed border-emerald-400/40 p-6 text-center text-sm text-emerald-200"><FileUp size={24} className="mx-auto mb-2"/><input className="max-w-full" type="file" accept="application/pdf,.pdf" onChange={e=>setFile(e.currentTarget.files?.[0]||null)}/></label>
   <button onClick={analyze} disabled={!file||busy} className="btn btn-primary mt-4 w-full"><FileSearch size={17}/>{busy?'Analisando texto...':'Extrair e encontrar disciplinas'}</button>
   <p className="mt-3 text-xs muted">Limite: 12 MB, até 150 páginas. O PDF é processado na memória e não é salvo. PDFs digitalizados como imagem podem precisar de OCR antes.</p>
  </div>
  {error&&<div className="my-5 rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-100"><AlertCircle className="mr-2 inline" size={17}/>{error}</div>}
  {data&&<div className="mt-6 space-y-5"><div className="panel p-5"><div className="flex items-center gap-2 font-semibold text-emerald-300"><ShieldCheck size={17}/> PDF lido: {data.filename}</div><p className="mt-2 text-sm muted">{data.pages} páginas, {data.chars.toLocaleString('pt-BR')} caracteres extraídos.</p><p className="mt-3 text-xs text-amber-200">{data.warning}</p></div>
   <div className="panel p-5"><h2 className="mb-4 flex items-center gap-2 font-semibold text-white"><BookOpenCheck size={18}/> Indícios de disciplinas</h2><div className="grid gap-3 md:grid-cols-2">{data.keyword_matches.map(row=><div key={row.group} className="rounded-xl border border-white/10 p-4"><p className="font-bold capitalize text-white">{row.group}</p><p className="mt-2 text-sm leading-6 muted">{row.hits.join(' · ')}</p></div>)}</div>{!data.keyword_matches.length&&<p className="text-sm muted">Nenhuma palavra-chave reconhecida.</p>}</div>
   <div className="panel p-5"><h2 className="mb-4 font-semibold text-white">Trechos relevantes com página</h2><div className="space-y-3">{data.extracts.map((row,i)=><div key={i} className="rounded-xl border border-white/10 p-4"><p className="mb-2 text-xs font-semibold text-emerald-300">Página {row.page} · {row.keyword}</p><p className="whitespace-pre-wrap break-words text-xs leading-6 text-slate-300">{row.excerpt}</p></div>)}{!data.extracts.length&&<p className="text-sm muted">Nenhum trecho de cargo foi reconhecido. Use a leitura manual para confirmar o conteúdo.</p>}</div></div>
  </div>}
 </div>
}
