"""Exporta aulas, flashcards e exercícios autorais para material offline, sem login ou banco.

Reexecute após editar seed.py/advanced_seed.py. Não altera o app Docker.
"""
import importlib
import json
import sys
import html
from pathlib import Path
from collections import Counter

ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'api'))
from seed import SUBJECTS,TOPICS
from advanced_seed import prepare_units,RESOURCES
OUT=ROOT/'materials';OUT.mkdir(exist_ok=True)

SUB_MAP={x[0]:x[1] for x in SUBJECTS}
LESSONS=[];CARDS=[];QUESTIONS=[]
for code,title,content,objective,cards,questions in TOPICS+prepare_units():
    li=len(LESSONS)
    LESSONS.append(dict(id=li,code=code,subject=SUB_MAP[code],title=title,content=content,objective=objective))
    for front,back in cards:CARDS.append(dict(id=len(CARDS),lesson=li,code=code,subject=SUB_MAP[code],front=front,back=back))
    for stem,choices,correct,explanation in questions:
        QUESTIONS.append(dict(id=len(QUESTIONS),lesson=li,code=code,subject=SUB_MAP[code],stem=stem,options=choices,correct=correct,explanation=explanation))

for code,name,category in SUBJECTS:
    items=[l for l in LESSONS if l['code']==code]
    lines=[f'# {name}', '',f'{len(items)} aulas • conteúdo autoral • EstudaTI v0.3','',
           '> Material de treinamento. Consulte legislação e normas vigentes nas fontes oficiais.', '']
    for item in items:
        lines += ['---','',f'## {item["title"]}','',f'**Objetivo:** {item["objective"]}','',item['content'].replace('CONCEITO E TEORIA','### Conceito e teoria').replace('APLICAÇÃO / EXEMPLO RESOLVIDO','### Exemplo').replace('ARMADILHA DE PROVA','### Armadilha de prova').replace('MÉTODO DE ESTUDO','### Método de estudo'), '']
        for q in [q for q in QUESTIONS if q['lesson']==item['id']]:
            lines += [f'**Treino:** {q["stem"]}','']
            for idx,op in enumerate(q['options']):lines.append(f'- {"ABCDE"[idx]}. {op}')
            lines += ['',f'**Gabarito comentado:** {"ABCDE"[q["correct"]]} — {q["explanation"]}','']
    dest=OUT/f'{code}_{name.lower().replace(" ","_").replace("/","_")}.md'
    dest.write_text('\n'.join(lines),encoding='utf-8')

(OUT/'catalogo_autoral.json').write_text(json.dumps({'lessons':LESSONS,'questions':QUESTIONS,'cards':CARDS,'resources':RESOURCES},ensure_ascii=False,indent=2),encoding='utf-8')
(OUT/'catalogo_questoes.csv').write_text('id;disciplina;assunto;enunciado;A;B;C;D;gabarito;comentario\n' + '\n'.join(
    ';'.join('"'+str(v).replace('"','""')+'"' for v in [q['id']+1,q['subject'],LESSONS[q['lesson']]['title'],q['stem'],*q['options'],"ABCD"[q['correct']],q['explanation']]) for q in QUESTIONS),encoding='utf-8')

script=r'''
const DATA=%%DATA%%;
const LS='estudati_offline_v03';
let state={progress:{},cards:{},answers:{},active:'aulas',filter:'',query:'',quiz:[],pos:0,feedback:null};
try{const data=JSON.parse(localStorage.getItem(LS)||'{}');state={...state,...data,quiz:[],pos:0,feedback:null}}catch{}
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>\"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[m]));
const save=()=>{try{localStorage.setItem(LS,JSON.stringify({progress:state.progress,cards:state.cards,answers:state.answers}))}catch(e){$('storage-warning').textContent='Armazenamento local indisponível neste navegador. Exporte o progresso regularmente.'}};
const subjects=[...new Map(DATA.lessons.map(x=>[x.code,x.subject])).entries()];
function init(){
 $('countAulas').textContent=DATA.lessons.length;
 $('countQuestoes').textContent=DATA.questions.length;
 $('countCards').textContent=DATA.cards.length;
 $('subject').innerHTML='<option value="">Todas as disciplinas</option>'+subjects.map(([c,s])=>`<option value="${c}">${esc(s)}</option>`).join('');
 document.querySelectorAll('[data-tab]').forEach(x=>x.addEventListener('click',()=>{state.active=x.dataset.tab;state.feedback=null;render()}));
 $('subject').addEventListener('change',e=>{state.filter=e.target.value;render()});$('search').addEventListener('input',e=>{state.query=e.target.value.toLowerCase();render()});
 $('download').onclick=()=>{const blob=new Blob([JSON.stringify({exportedAt:new Date().toISOString(),...state},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='estudati-offline-progresso.json';a.click();URL.revokeObjectURL(a.href)};
 render()
}
function render(){
 document.querySelectorAll('[data-tab]').forEach(x=>x.classList.toggle('selected',x.dataset.tab===state.active));
 $('heading').textContent=({aulas:'Aulas e resumos',questoes:'Questões comentadas',cards:'Flashcards',fontes:'Fontes de referência'})[state.active];
 $('subtitle').textContent='Versão independente para estudar sem internet. O progresso fica neste navegador e não sincroniza com Docker.';
 let filtered=(x)=> (!state.filter||x.code===state.filter)&&(!state.query||JSON.stringify(x).toLowerCase().includes(state.query));
 if(state.active==='aulas')renderLessons(DATA.lessons.filter(filtered));
 if(state.active==='questoes')renderQuiz(DATA.questions.filter(filtered));
 if(state.active==='cards')renderCards(DATA.cards.filter(filtered));
 if(state.active==='fontes')renderSources(DATA.resources.filter(x=>!state.query||JSON.stringify(x).toLowerCase().includes(state.query)));
 $('reviewed').textContent=Object.keys(state.progress).length;
}
function renderLessons(items){$('workspace').innerHTML=`<div class="grid">${items.map(x=>`<article class="tile"><div class="eyebrow">${esc(x.subject)} • aula ${x.id+1}</div><h3>${esc(x.title)}</h3><p>${esc(x.objective)}</p><div class="actions"><button onclick="openLesson(${x.id})">Ler aula →</button>${state.progress[x.id]?'<span class="ok">✓ Estudada</span>':''}</div></article>`).join('')}</div>`}
function openLesson(id){const x=DATA.lessons[id];$('workspace').innerHTML=`<button class="back" onclick="render()">← Voltar à lista</button><article class="reader"><div class="eyebrow">${esc(x.subject)}</div><h2>${esc(x.title)}</h2><p class="lead">Objetivo: ${esc(x.objective)}</p><div class="fulltext">${esc(x.content)}</div><div class="actions"><button onclick="state.progress[${id}]=Date.now();save();render()">✓ Marcar estudada</button><button class="secondary" onclick="state.active='questoes';state.filter='${x.code}';$('subject').value='${x.code}';render()">Treinar questões →</button></div></article>`}
function renderQuiz(items){if(!items.length){$('workspace').innerHTML='<p>Sem questões para os filtros.</p>';return}
 state.quiz=items;state.pos=Math.min(state.pos,items.length-1);state.feedback=null;paintQuestion();}
function paintQuestion(){const q=state.quiz[state.pos];if(!q){$('workspace').innerHTML='<p>Sem questão.</p>';return}
 let options=q.options.map((x,i)=>`<button class="option ${state.feedback!==null?(i===q.correct?'right':i===state.feedback?'wrong':''):''}" ${state.feedback!==null?'disabled':''} onclick="grade(${i})"><b>${'ABCDE'[i]}</b>${esc(x)}</button>`).join('');
 $('workspace').innerHTML=`<article class="reader"><div class="eyebrow">${esc(q.subject)} • questão ${state.pos+1} / ${state.quiz.length} • Autoral</div><h2 class="question">${esc(q.stem)}</h2><div class="options">${options}</div>${state.feedback!==null?`<div class="explain"><b>${state.feedback===q.correct?'✓ Resposta correta':'✕ Resposta incorreta'}</b><p>${esc(q.explanation)}</p></div>`:''}<div class="actions"><button class="secondary" onclick="state.pos=(state.pos+state.quiz.length-1)%state.quiz.length;state.feedback=null;paintQuestion()">← Anterior</button><button onclick="state.pos=(state.pos+1)%state.quiz.length;state.feedback=null;paintQuestion()">Próxima →</button></div></article>`
}
function grade(i){const q=state.quiz[state.pos];state.feedback=i;const history=state.answers[q.id]||{seen:0,correct:0};history.seen++;history.correct+=+(i===q.correct);history.last=Date.now();state.answers[q.id]=history;save();paintQuestion()}
function renderCards(items){if(!items.length){$('workspace').innerHTML='<p>Sem cartões.</p>';return}
 const pending=items.filter(x=>!state.cards[x.id]||state.cards[x.id].due<=Date.now());let card=pending[0];if(!card){$('workspace').innerHTML='<div class="reader"><h2>Revisões concluídas</h2><p>Os próximos cartões aparecerão quando vencerem.</p></div>';return}
 $('workspace').innerHTML=`<article class="reader"><div class="eyebrow">Revisão espaçada • ${esc(card.subject)} • ${pending.length} vencidos</div><h2 class="question">${esc(card.front)}</h2><div id="cardanswer" class="answer hidden">${esc(card.back)}</div><div class="actions"><button onclick="$('cardanswer').classList.toggle('hidden')">Revelar / ocultar resposta</button></div><div class="actions"><button class="secondary" onclick="reviewCard(${card.id},0)">Errei</button><button class="secondary" onclick="reviewCard(${card.id},1)">Difícil</button><button class="secondary" onclick="reviewCard(${card.id},3)">Lembrei</button><button onclick="reviewCard(${card.id},7)">Fácil</button></div></article>`
}
function reviewCard(id,day){const prior=state.cards[id]||{streak:0};const streak=day===0?0:prior.streak+1;const interval=day===0?(10/1440):Math.min(90,day*Math.max(1,streak));state.cards[id]={streak,interval,due:Date.now()+interval*86400000};save();renderCards(DATA.cards.filter(x=>(!state.filter||x.code===state.filter)&&(!state.query||JSON.stringify(x).toLowerCase().includes(state.query))));}
function renderSources(items){$('workspace').innerHTML='<div class="grid">'+items.map(x=>`<a class="tile" href="${esc(x.url)}" target="_blank" rel="noopener noreferrer"><div class="eyebrow">${esc(x.category)} • ${esc(x.source)}</div><h3>${esc(x.title)}</h3><p>${esc(x.description)}</p><span class="open">Abrir fonte ↗</span></a>`).join('')+'</div>'}
init();
'''
html_template=r'''<!doctype html><html lang="pt-BR"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>EstudaTI • Material de estudo offline</title><style>
:root{font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:#091220;color:#eef6ff}*{box-sizing:border-box}body{margin:0}a{color:inherit;text-decoration:none}button{cursor:pointer;font:inherit}button:disabled{opacity:.6;cursor:default}header{padding:32px max(20px,calc((100vw - 1300px)/2));display:flex;gap:24px;align-items:center;justify-content:space-between;background:#111f31;border-bottom:1px solid #314056}header strong{font-size:27px}header strong span{color:#60e8bd}header p{color:#9baec6;margin:4px 0;font-size:13px}.hero{padding:48px 20px 30px;max-width:1300px;margin:0 auto}.eyebrow{color:#70e6c1;text-transform:uppercase;letter-spacing:.12em;font-size:12px;font-weight:700}.hero h1{font-size:36px;line-height:1.15;margin:10px 0}.hero p{color:#adbdd0;max-width:740px;line-height:1.6}.statbar{display:flex;gap:12px;flex-wrap:wrap;margin-top:26px}.stat{padding:14px 20px;border:1px solid #263b50;background:#14253b;border-radius:14px;min-width:140px}.stat b{font-size:28px;display:block}.stat small{color:#9baec6}.layout{max-width:1300px;margin:0 auto;padding:0 20px 70px}nav{display:flex;gap:8px;overflow-x:auto;margin-bottom:22px}nav button{padding:13px 19px;background:#16283d;border:1px solid #2a4158;color:#b3c0d0;border-radius:12px;white-space:nowrap}nav button.selected{background:#2c7566;color:#fff;border-color:#58cbaa}main{background:#101f32;border-radius:22px;border:1px solid #26394f;padding:25px;min-height:430px}.filters{display:flex;gap:12px;margin:24px 0;flex-wrap:wrap}.filters input,.filters select{background:#0a1726;border:1px solid #314b64;border-radius:10px;padding:12px 16px;color:#fff;min-width:200px}.filters input{flex:1}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:15px}.tile{padding:22px;background:#182b41;border:1px solid #2b4155;border-radius:17px;display:flex;flex-direction:column}.tile h3{margin:13px 0 10px}.tile p{color:#b4c3d2;line-height:1.6;font-size:14px;flex:1}.actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:24px;align-items:center}.actions button,button.back{padding:12px 17px;border:0;border-radius:10px;background:#6de6be;color:#06372c;font-weight:700}.actions .secondary,button.back{background:#263b53;color:#e9f2ff}.ok,.open{color:#7ceec6;font-size:12px}.reader{max-width:850px;margin:0 auto;padding:25px 16px}.reader h2{font-size:30px}.reader .lead{color:#9bb2c9}.fulltext{white-space:pre-wrap;line-height:1.85;color:#d5e2f0;border-top:1px solid #30465d;padding-top:22px;margin-top:24px}.reader .question{font-size:23px;font-weight:700;line-height:1.5}.options{display:grid;gap:12px;margin-top:28px}.option{text-align:left;background:#192d44;border:1px solid #31506c;color:#e4f0f9;border-radius:12px;padding:15px;display:flex;gap:12px;align-items:flex-start}.option b{background:#284660;padding:7px 11px;border-radius:8px}.option.right{border-color:#2bbd88;background:#194536}.option.wrong{border-color:#e77474;background:#48262c}.explain{border-left:3px solid #76edc4;background:#1b4038;padding:16px;margin:20px 0;border-radius:0 12px 12px 0;line-height:1.6}.answer{background:#1b3c38;border:1px solid #357a67;border-radius:14px;padding:25px;margin-top:28px;line-height:1.65}.hidden{display:none}.back{margin-bottom:20px}footer{padding:30px;color:#8495ac;text-align:center;font-size:12px}@media(max-width:900px){.grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:650px){.grid{grid-template-columns:1fr}header{padding:22px 18px}.hero h1{font-size:28px}main{padding:16px}.reader{padding:12px 0}.reader h2{font-size:24px}}
</style></head><body><header><div><strong>Estuda<span>TI</span></strong><p>Preparação para concursos de Tecnologia da Informação</p></div><div class="eyebrow">MODO OFFLINE • V0.3</div></header><section class="hero"><div class="eyebrow">Estude mesmo sem Docker</div><h1>Um plano, vários concursos de TI.</h1><p>Conteúdo autoral com teoria, exemplos, questões comentadas e revisões. Tudo funciona localmente: sem login, sem internet, sem coleta de dados.</p><div class="statbar"><div class="stat"><b id="countAulas">—</b><small>Aulas disponíveis</small></div><div class="stat"><b id="countQuestoes">—</b><small>Questões autorais</small></div><div class="stat"><b id="countCards">—</b><small>Flashcards</small></div><div class="stat"><b id="reviewed">—</b><small>Aulas marcadas</small></div></div></section><div class="layout"><nav><button data-tab="aulas" class="selected">📚 Aulas</button><button data-tab="questoes">📝 Questões</button><button data-tab="cards">🃏 Flashcards</button><button data-tab="fontes">🔗 Fontes oficiais</button></nav><h2 id="heading">Aulas e resumos</h2><p id="subtitle" style="color:#8fa4bc;font-size:14px"></p><div class="filters"><input type="search" id="search" placeholder="Buscar matéria ou tópico"/><select id="subject"></select><button id="download" class="back">Exportar progresso</button></div><main id="workspace"></main></div><footer>EstudaTI offline • exercícios autorais; não são questões oficiais • progresso fica apenas neste navegador</footer><script>%%SCRIPT%%</script></body></html>'''
js=script.replace('%%DATA%%',json.dumps({'lessons':LESSONS,'questions':QUESTIONS,'cards':CARDS,'resources':RESOURCES},ensure_ascii=False,separators=(',',':')))
html_output=html_template.replace(chr(92)+chr(34),chr(34)).replace('%%SCRIPT%%',js)
html_output=html_output.replace('<p id="subtitle" style="color:#8fa4bc;font-size:14px"></p>', '<p id="subtitle" style="color:#8fa4bc;font-size:14px"></p><p id="storage-warning" style="color:#ffd48a;font-size:13px"></p>')
(ROOT/'EstudaTI_Offline.html').write_text(html_output,encoding='utf-8')
print('Exportado:',len(LESSONS),'aulas;',len(QUESTIONS),'questões;',len(CARDS),'flashcards; HTML',round(len(html_output)/1024),'KiB')
