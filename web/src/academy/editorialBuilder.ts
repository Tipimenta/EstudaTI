import type {PedagogicalLesson} from './intro1'
/** Estrutura editorial consistente; todo o texto de cada capítulo é autoral e específico. */
export type EditorialSeed={
 id:number
 title:string
 goal:string
 context:string
 explanation:string
 connection:string
 exam:string
 caseTitle:string
 caseSteps:[string,string,string,string]
 pitfalls:[string,string,string,string]
 cards:[[string,string],[string,string],[string,string],[string,string]]
}
export function buildChapters(rows:EditorialSeed[]):Record<number,Partial<PedagogicalLesson>>{
 const result:Record<number,Partial<PedagogicalLesson>>={}
 for(const r of rows){
  if(result[r.id])throw Error('Aula duplicada no lote: '+r.id)
  result[r.id]={
   id:r.id,title:r.title,goal:r.goal,
   steps:[
    {title:'Comece entendendo o problema',body:r.context},
    {title:'Como funciona, passo a passo',body:r.explanation},
    {title:'Conecte com o que você já aprendeu',body:r.connection},
    {title:'Como a banca explora esse assunto',body:r.exam}
   ],
   worked:{
    title:r.caseTitle,
    body:r.caseSteps.map((s,i)=>'**Passo '+(i+1)+'.** '+s).join('\n\n')
   },
   pitfalls:r.pitfalls,
   review:r.cards.map(([ask,answer])=>({ask,answer})),
   extra:''
  }
 }
 return result
}
