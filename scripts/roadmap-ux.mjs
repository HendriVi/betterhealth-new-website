// Adapt the preserved original tool for a one-tap single-choice flow.
export function improveRoadmapUX(js){
 js=js.replace('q1s:["Choose one or two.","Wählen Sie eines oder zwei."],','q1s:["Choose your main priority. Selecting an answer takes you to the next question.","Wählen Sie Ihr wichtigstes Ziel. Mit Ihrer Auswahl gelangen Sie zur nächsten Frage."],');
 js=js.replace('And roughly how long has it been like this?', 'And roughly how long has it been like this? Select an answer to see your roadmap.').replace('Und wie lange ist das ungefähr schon so?', 'Und wie lange ist das ungefähr schon so? Wählen Sie eine Antwort, um Ihre Roadmap zu sehen.');
 js=js.replace("'<button class=\"btn btn-primary\" type=\"button\" data-act=\"next\">'+esc(t(o.label||U.next))+\"</button>\"+", "(o.auto?'':'<button class=\"btn btn-primary\" type=\"button\" data-act=\"next\">'+esc(t(o.label||U.next))+\"</button>\")+");
 const start=js.indexOf('function scr1(){'),end=js.indexOf('function scr3(){',start);
 js=js.slice(0,start)+`function goalNote(){
 return '<div class="grp" style="margin-top:30px"><h4>'+esc(t(U.q1t))+'</h4>'+
 '<div class="f" style="margin:0"><textarea id="wGoalText" rows="3">'+esc(S.goalText)+'</textarea>'+
 '<p class="hint">'+esc(t(U.q1th))+"</p></div></div>";
}
function scr1(){
 frame(head(t(U.q1),t(U.q1s))+'<div class="cards">'+
 GOALS.map(function(g){return card("goal",g[0],t([g[1],g[2]]),has(S.goals,g[0]),"radio");}).join("")+"</div>",{auto:true});
}
function scr2(){
 frame(head(t(U.q2),t(U.q2s))+'<div class="chipset">'+
 SIG.map(function(x){return chip("sig",x[0],t([x[1],x[2]]),has(S.sig,x[0]));}).join("")+"</div>"+goalNote());
 var ta=d.getElementById("wGoalText");
 ta.addEventListener("input",function(){S.goalText=ta.value;});
}
function moveTo(next){
 step=next;render();
 var heading=mount.querySelector(".wiz-q, h3");
 if(heading){heading.setAttribute("tabindex","-1");heading.focus({preventScroll:true});}
 mount.style.scrollMarginTop="96px";
 mount.scrollIntoView({block:"start",behavior:"instant"});
}
`+js.slice(end);
 js=js.replace('if(n==="goal"){ multi(S.goals,2); scr1(); }','if(n==="goal"){ return; }');
 js=js.replace('var b=e.target.closest("[data-act]"); if(!b) return;',`var choice=e.target.closest('input[type="radio"]');
 if(choice&&choice.name==="goal"){S.goals=[choice.value];moveTo(2);return;}
 if(choice&&choice.name==="long"){S.long=choice.value;moveTo(4);return;}
 var b=e.target.closest("[data-act]"); if(!b) return;`);
 js=js.replace('step=0; return render();','return moveTo(0);')
 .replace('step=Math.max(0,step-1); return render();','return moveTo(Math.max(0,step-1));')
 .replace('step++; render();','moveTo(step+1);');
 return js;
}
