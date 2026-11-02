export async function api<T>(path:string,init:RequestInit={}):Promise<T>{
 const res=await fetch('/api'+path,{credentials:'include',headers:{'Content-Type':'application/json',...(init.headers||{})},...init})
 if(!res.ok){let msg='Erro na solicitação.';try{const data=await res.json();msg=data.detail||msg}catch{/*ignore*/} throw new Error(msg)}
 return res.json()
}
export function post<T>(path:string,body:unknown):Promise<T>{return api<T>(path,{method:'POST',body:JSON.stringify(body)})}
export function patch<T>(path:string,body:unknown):Promise<T>{return api<T>(path,{method:'PATCH',body:JSON.stringify(body)})}
export type Subject={id:number,code:string,name:string,category:string,topic_count:number}
export type Topic={id:number,subject_id:number,title:string,content:string,objective:string,minutes:number,subject:string,code?:string}
export type Card={id:number,front:string,back:string,due_at:string,repetitions:number,title:string,subject:string}
export type Plan={id:number,study_date:string,minutes:number,completed:number,activity?:string,title:string,topic_id:number,subject:string}
export type QuizQuestion={id:number,topic_id:number,question:string,choices:string[],title:string,subject:string,origin:string,board:string,exam:string,year:number|null,source_url:string}
export type QuizResult={attempt_id:number,correct:number,total:number,results:{question_id:number,question:string,correct:boolean,your_choice:number,correct_index:number,choices:string[],explanation:string,choice_rationales:Record<string,string>}[]}
export type Contest={id:number,name:string,position:string,location:string,salary:number|null,registration_deadline:string|null,url:string,notes:string,last_checked_at:string|null,changed:number,last_error:string|null,active:number,priority:number,verified_at:string|null}
export type Dashboard={minutes_today:number,minutes_week:number,cards_due:number,question_count:number,quizzes_completed:number,quiz_accuracy:number,daily_goal:number,recent_quizzes:{id:number,created_at:string,count:number,correct:number}[],next_plan:Plan[]}
export type Progress={subjects:{id:number,name:string,category:string,minutes:number,answers:number,accuracy:number}[],days:{day:string,minutes:number}[]}

export type StudyLesson = {id:number;subject_id:number;title:string;objective:string;minutes:number;subject:string;code:string;completed:number;notes:string;track:string;module_order:number}
export type StudyLessonDetail = StudyLesson & {content:string;questions:{id:number;question:string;choices:string[]}[];source_url:string;source_label:string}
