(function(){
"use strict";
var d=document, lang="en";

/* ---------- content data ---------- */
var MEASURE=[
 {id:"psy",lvl:"l1",t:{en:"Psychiatric and psychological state",de:"Psychiatrischer und psychologischer Zustand"},
  u:{en:"Symptom pattern, severity, variability, function, treatment history and response.",de:"Symptommuster, Schweregrad, Variabilität, Funktion, Behandlungsgeschichte und Ansprechen."},
  w:{en:"It defines what we are actually trying to change, and validated measures make change visible rather than remembered.",de:"Er definiert, was tatsächlich verändert werden soll, und validierte Instrumente machen Veränderung sichtbar statt erinnerbar."},
  n:{en:"Always, at baseline and at each review.",de:"Immer, zu Beginn und bei jeder Überprüfung."},
  c:{en:"It sets the outcome against which every later decision is judged.",de:"Er setzt die Messlatte, an der jede spätere Entscheidung beurteilt wird."}},
 {id:"cog",lvl:"l1",t:{en:"Cognition",de:"Kognition"},
  u:{en:"Attention, memory, processing speed and executive function, against your own baseline where one exists.",de:"Aufmerksamkeit, Gedächtnis, Verarbeitungsgeschwindigkeit und exekutive Funktion, gegen Ihren eigenen Ausgangswert, falls vorhanden."},
  w:{en:"Subjective cognitive complaints and objective performance often diverge, and the direction of that divergence changes the interpretation.",de:"Subjektive kognitive Klagen und objektive Leistung weichen oft voneinander ab, und die Richtung dieser Abweichung verändert die Interpretation."},
  n:{en:"When cognitive change is a presenting concern or a stated goal.",de:"Wenn kognitive Veränderung ein Anliegen oder ein erklärtes Ziel ist."},
  c:{en:"It separates a capacity problem from a state problem, which leads to different plans.",de:"Sie trennt ein Kapazitätsproblem von einem Zustandsproblem, was zu unterschiedlichen Plänen führt."}},
 {id:"sleep",lvl:"l1",t:{en:"Sleep and circadian rhythm",de:"Schlaf und zirkadianer Rhythmus"},
  u:{en:"Timing, continuity and depth of sleep, and whether breathing or circadian misalignment is involved.",de:"Zeitpunkt, Kontinuität und Tiefe des Schlafs sowie die Frage, ob Atmung oder zirkadiane Fehlausrichtung beteiligt sind."},
  w:{en:"Disturbed sleep can cause a dysregulated day or result from one, and the two require opposite first steps.",de:"Gestörter Schlaf kann einen dysregulierten Tag verursachen oder daraus folgen, und beides verlangt entgegengesetzte erste Schritte."},
  n:{en:"Whenever sleep, fatigue, mood or cognition are part of the picture.",de:"Immer wenn Schlaf, Erschöpfung, Stimmung oder Kognition Teil des Bildes sind."},
  c:{en:"A suspected sleep disorder moves to formal sleep investigation rather than being treated behaviourally.",de:"Ein Verdacht auf eine Schlafstörung führt zur formalen Schlafabklärung statt zu verhaltensbezogener Behandlung."}},
 {id:"auto",lvl:"l2",t:{en:"Autonomic regulation and recovery",de:"Autonome Regulation und Erholung"},
  u:{en:"Whether arousal settles during rest, or whether elevated activation persists into recovery periods.",de:"Ob die Aktivierung in Ruhe abfällt oder ob erhöhte Aktivierung in Erholungsphasen bestehen bleibt."},
  w:{en:"Persistent activation is a plausible link between sustained demand and symptoms across sleep, mood and cognition.",de:"Anhaltende Aktivierung ist eine plausible Verbindung zwischen Dauerbelastung und Symptomen in Schlaf, Stimmung und Kognition."},
  n:{en:"Where load, recovery or stress tolerance are central to the case.",de:"Wenn Belastung, Erholung oder Stresstoleranz im Zentrum stehen."},
  c:{en:"Interpretation depends heavily on method and context, so findings are used as one input among several and never alone.",de:"Die Interpretation hängt stark von Methode und Kontext ab, weshalb Befunde als einer von mehreren Eingängen dienen und nie allein."}},
 {id:"met",lvl:"l1",t:{en:"Metabolic, endocrine and nutritional status",de:"Metabolischer, endokriner und Nährstoffstatus"},
  u:{en:"Glucose regulation, thyroid and relevant hormonal function, and deficiency states with a plausible route to symptoms.",de:"Glukoseregulation, Schilddrüsen- und relevante Hormonfunktion sowie Mangelzustände mit plausibler Verbindung zu Symptomen."},
  w:{en:"Some of the most treatable contributors to fatigue, low mood and cognitive complaints sit here.",de:"Einige der am besten behandelbaren Mitursachen von Erschöpfung, gedrückter Stimmung und kognitiven Klagen liegen hier."},
  n:{en:"Where history, symptoms or risk profile make a contributor plausible, not as a routine sweep.",de:"Wenn Vorgeschichte, Symptome oder Risikoprofil eine Mitursache plausibel machen, nicht als Routinescreening."},
  c:{en:"A reversible contributor is treated directly, which sometimes removes the need for anything else.",de:"Eine reversible Mitursache wird direkt behandelt, was manchmal alles Weitere erübrigt."}},
 {id:"cv",lvl:"l1",t:{en:"Cardiovascular function and fitness",de:"Kardiovaskuläre Funktion und Fitness"},
  u:{en:"Blood pressure, exercise tolerance, aerobic capacity and recovery.",de:"Blutdruck, Belastungstoleranz, aerobe Kapazität und Erholung."},
  w:{en:"Cardiovascular health is among the better-supported modifiable factors for long-term brain health, and capacity constrains daily function directly.",de:"Kardiovaskuläre Gesundheit gehört zu den besser belegten veränderbaren Faktoren langfristiger Hirngesundheit, und Kapazität begrenzt die Alltagsfunktion unmittelbar."},
  n:{en:"In prevention work, in exhaustion presentations, and wherever exercise is part of the plan.",de:"In der Prävention, bei Erschöpfungsbildern und überall dort, wo Bewegung Teil des Plans ist."},
  c:{en:"It sets a realistic starting dose for conditioning and gives an objective outcome to re-measure.",de:"Sie legt eine realistische Startdosis für das Training fest und liefert eine objektive Grösse zum Wiedermessen."}},
 {id:"inf",lvl:"l2",t:{en:"Inflammatory and immune state",de:"Entzündungs- und Immunstatus"},
  u:{en:"Whether an inflammatory or immune process is plausibly contributing in this particular case.",de:"Ob ein entzündlicher oder immunologischer Prozess in diesem konkreten Fall plausibel beiträgt."},
  w:{en:"Immune signalling can influence mood, fatigue and cognition, but the individual-level evidence is far weaker than the group-level evidence.",de:"Immunsignale können Stimmung, Erschöpfung und Kognition beeinflussen, doch die Evidenz auf Individualebene ist weit schwächer als auf Gruppenebene."},
  n:{en:"Only where history or symptoms make it plausible.",de:"Nur wenn Vorgeschichte oder Symptome es plausibel machen."},
  c:{en:"A clear finding opens a medical pathway. An unclear one is not treated as an explanation.",de:"Ein klarer Befund eröffnet einen medizinischen Weg. Ein unklarer wird nicht als Erklärung behandelt."}},
 {id:"brain",lvl:"l2",t:{en:"Brain structure and function",de:"Hirnstruktur und Hirnfunktion"},
  u:{en:"Whether a structural or functional finding is present that would change the clinical direction.",de:"Ob ein struktureller oder funktioneller Befund vorliegt, der die klinische Richtung verändern würde."},
  w:{en:"Imaging and electrophysiology answer specific questions well and general questions badly.",de:"Bildgebung und Elektrophysiologie beantworten spezifische Fragen gut und allgemeine Fragen schlecht."},
  n:{en:"Only with a specific indication from history, examination or cognitive findings. Never as a screening step.",de:"Nur bei spezifischer Indikation aus Anamnese, Untersuchung oder kognitiven Befunden. Nie als Screening."},
  c:{en:"A positive finding redirects care, often out of psychiatry. A negative one narrows the differential.",de:"Ein positiver Befund lenkt die Behandlung um, oft aus der Psychiatrie hinaus. Ein negativer engt die Differenzialdiagnose ein."}},
 {id:"beh",lvl:"l1",t:{en:"Behaviour, activity and environment",de:"Verhalten, Aktivität und Umgebung"},
  u:{en:"What the week actually looks like: activity, recovery, alcohol, routines, demand, control and social context.",de:"Wie die Woche tatsächlich aussieht: Aktivität, Erholung, Alkohol, Routinen, Anforderung, Kontrolle und soziales Umfeld."},
  w:{en:"These are frequently the highest-yield modifiable factors and the ones most often skipped in favour of testing.",de:"Diese sind häufig die ertragreichsten veränderbaren Faktoren und werden am häufigsten zugunsten von Diagnostik übersprungen."},
  n:{en:"Always.",de:"Immer."},
  c:{en:"It determines what is realistically implementable, which decides whether any plan survives contact with your week.",de:"Sie bestimmt, was realistisch umsetzbar ist, und entscheidet damit, ob ein Plan den Kontakt mit Ihrer Woche überlebt."}}
];

var FAQ=[
 {q:{en:"Is this still psychiatry?",de:"Ist das noch Psychiatrie?"},
  a:{en:"Yes. Diagnosis, medication, psychotherapy and risk assessment remain part of the work, carried out by a board-certified specialist. What is added is a systematic account of the biological, behavioural and environmental processes that may be maintaining the state, and a measured way of testing whether treatment does what it was expected to do.",de:"Ja. Diagnostik, Medikation, Psychotherapie und Risikobeurteilung bleiben Teil der Arbeit, durchgeführt von einer fachärztlichen Person. Hinzu kommt eine systematische Betrachtung der biologischen, verhaltensbezogenen und umweltbezogenen Prozesse, die den Zustand aufrechterhalten könnten, sowie ein messbasiertes Vorgehen zur Prüfung, ob die Behandlung tut, was sie tun sollte."}},
 {q:{en:"Do I need every test?",de:"Brauche ich jede Untersuchung?"},
  a:{en:"No, and you will be argued out of tests you do not need. A measurement is ordered only when its result could change a decision. Broad testing without a question attached produces incidental findings and false positives, and those carry their own costs.",de:"Nein, und von Untersuchungen, die Sie nicht brauchen, werden wir Ihnen abraten. Eine Messung wird nur veranlasst, wenn ihr Ergebnis eine Entscheidung verändern könnte. Breite Diagnostik ohne zugehörige Frage erzeugt Zufallsbefunde und falsch positive Resultate, die eigene Kosten tragen."}},
 {q:{en:"Does this replace my existing doctor?",de:"Ersetzt das meine bisherige Ärztin oder meinen bisherigen Arzt?"},
  a:{en:"No. Your general practitioner, psychiatrist or specialists keep their role. This work is designed to connect to them, not to sit beside them. Where you prefer us not to contact anyone, that is respected and stated in the plan.",de:"Nein. Hausärztin, Psychiater oder Fachpersonen behalten ihre Rolle. Diese Arbeit ist darauf ausgelegt, sich mit ihnen zu verbinden, nicht neben ihnen zu stehen. Wenn Sie nicht möchten, dass wir jemanden kontaktieren, wird das respektiert und im Plan festgehalten."}},
 {q:{en:"What happens if you find something outside psychiatry?",de:"Was geschieht, wenn Sie etwas ausserhalb der Psychiatrie finden?"},
  a:{en:"It is referred to the appropriate specialty, promptly and with the findings that prompted it. Holding a medical problem inside a psychiatric frame because that is where the patient happens to be sitting is exactly the failure this model is built to avoid.",de:"Es wird zügig an das zuständige Fachgebiet überwiesen, zusammen mit den Befunden, die dazu geführt haben. Ein medizinisches Problem im psychiatrischen Rahmen zu halten, weil die Person zufällig dort sitzt, ist genau der Fehler, den dieses Modell vermeiden soll."}},
 {q:{en:"What does precision mean here?",de:"Was bedeutet Präzision hier?"},
  a:{en:"It means that decisions are tied to your data rather than to an average, and that both the expected effect and the point of evaluation are stated before an intervention starts. It does not mean certainty, and it does not mean more technology.",de:"Es bedeutet, dass Entscheidungen an Ihre Daten gebunden sind statt an einen Durchschnitt, und dass sowohl der erwartete Effekt als auch der Bewertungszeitpunkt vor Beginn einer Intervention festgelegt werden. Es bedeutet weder Sicherheit noch mehr Technologie."}},
 {q:{en:"What if the first plan does not work?",de:"Was, wenn der erste Plan nicht wirkt?"},
  a:{en:"That outcome is planned for. If the predicted change does not appear, the hypothesis that generated the prediction loses weight and the ranking is revised. A plan that fails informatively is more useful than one that is continued indefinitely on hope.",de:"Dieser Fall ist eingeplant. Bleibt die vorhergesagte Veränderung aus, verliert die zugrunde liegende Hypothese an Gewicht und die Gewichtung wird revidiert. Ein Plan, der informativ scheitert, ist nützlicher als einer, der unbegrenzt auf Hoffnung fortgeführt wird."}},
 {q:{en:"How is my information handled?",de:"Wie wird mit meinen Daten umgegangen?"},
  a:{en:"Clinical information is held under Swiss medical confidentiality and data protection law. The preliminary roadmap tool on this page runs entirely in your browser. Nothing you select is transmitted or stored, and no result reaches us unless you choose to describe it in a consultation request.",de:"Klinische Informationen unterliegen der ärztlichen Schweigepflicht und dem schweizerischen Datenschutzrecht. Das Roadmap-Tool auf dieser Seite läuft vollständig in Ihrem Browser. Nichts von dem, was Sie auswählen, wird übertragen oder gespeichert, und kein Ergebnis erreicht uns, solange Sie es nicht selbst in einer Terminanfrage beschreiben."}},
 {q:{en:"What does it cost?",de:"Was kostet das?"},
  a:{en:"Fees and the structure of engagement are discussed openly in the first conversation, before anything is booked. Pricing information will be published here once confirmed.",de:"Honorare und die Struktur der Zusammenarbeit werden im Erstgespräch offen besprochen, bevor etwas gebucht wird. Preisangaben werden hier veröffentlicht, sobald sie feststehen."}}
];

var TOOL={
 goals:[["mood",{en:"Mood and motivation",de:"Stimmung und Antrieb"}],["anx",{en:"Anxiety and stress",de:"Angst und Stress"}],
   ["burn",{en:"Burnout and recovery",de:"Burnout und Erholung"}],["sleep",{en:"Sleep",de:"Schlaf"}],
   ["cog",{en:"Cognition and concentration",de:"Kognition und Konzentration"}],["energy",{en:"Energy and fatigue",de:"Energie und Erschöpfung"}],
   ["perf",{en:"Performance and resilience",de:"Leistungsfähigkeit und Resilienz"}],["prev",{en:"Long-term brain health",de:"Langfristige Hirngesundheit"}],
   ["unexp",{en:"Unexplained symptoms",de:"Unklare Beschwerden"}],["treat",{en:"Improving an existing treatment",de:"Eine bestehende Behandlung verbessern"}]],
 durations:[["recent",{en:"Less than 6 months",de:"Weniger als 6 Monate"}],["mid",{en:"6 months to 2 years",de:"6 Monate bis 2 Jahre"}],
   ["long",{en:"Longer than 2 years",de:"Länger als 2 Jahre"}],["recur",{en:"Recurring over years",de:"Über Jahre wiederkehrend"}]],
 grid:[
  ["sleepq",{en:"Sleep",de:"Schlaf"},[["good",{en:"Generally restorative",de:"Meist erholsam"}],["frag",{en:"Broken or light",de:"Unterbrochen oder leicht"}],["short",{en:"Too short",de:"Zu kurz"}],["late",{en:"Late or irregular timing",de:"Spät oder unregelmässig"}]]],
  ["energyq",{en:"Energy",de:"Energie"},[["ok",{en:"Steady",de:"Stabil"}],["dip",{en:"Afternoon collapse",de:"Einbruch am Nachmittag"}],["low",{en:"Low most of the day",de:"Meist niedrig"}],["var",{en:"Highly variable",de:"Stark schwankend"}]]],
  ["cogq",{en:"Concentration",de:"Konzentration"},[["ok",{en:"Unchanged",de:"Unverändert"}],["short",{en:"Shorter than it was",de:"Kürzer als früher"}],["eff",{en:"Needs much more effort",de:"Deutlich anstrengender"}],["mem",{en:"Memory slips too",de:"Auch Gedächtnislücken"}]]],
  ["loadq",{en:"Demand and control",de:"Anforderung und Kontrolle"},[["ok",{en:"Manageable",de:"Bewältigbar"}],["high",{en:"High demand, some control",de:"Hohe Anforderung, etwas Kontrolle"}],["nocontrol",{en:"High demand, little control",de:"Hohe Anforderung, wenig Kontrolle"}],["change",{en:"Major life change",de:"Grosse Lebensveränderung"}]]],
  ["moveq",{en:"Physical activity",de:"Körperliche Aktivität"},[["reg",{en:"Regular",de:"Regelmässig"}],["some",{en:"Occasional",de:"Gelegentlich"}],["none",{en:"Almost none",de:"Kaum"}],["drop",{en:"Dropped off recently",de:"Zuletzt eingeschlafen"}]]],
  ["trendq",{en:"Compared with a year ago",de:"Im Vergleich zu vor einem Jahr"},[["better",{en:"Better",de:"Besser"}],["same",{en:"About the same",de:"Etwa gleich"}],["worse",{en:"Worse",de:"Schlechter"}],["much",{en:"Much worse",de:"Deutlich schlechter"}]]]],
 assets:[["blood",{en:"Recent bloodwork",de:"Aktuelle Blutwerte"}],["imaging",{en:"Imaging",de:"Bildgebung"}],
   ["cogtest",{en:"Cognitive testing",de:"Kognitive Testung"}],["wear",{en:"Wearable or sleep data",de:"Wearable- oder Schlafdaten"}],
   ["psych",{en:"Psychiatric or psychological reports",de:"Psychiatrische oder psychologische Berichte"}],["spec",{en:"Specialist reports",de:"Facharztberichte"}]]
};

/* ---------- language ---------- */
var UI={
 thinking:{en:"Building your roadmap. This usually takes under a minute.",de:"Ihre Roadmap wird erstellt. Das dauert meist unter einer Minute."},
 errGeneric:{en:"The roadmap could not be generated just now. Please try again in a moment.",de:"Die Roadmap konnte gerade nicht erstellt werden. Bitte versuchen Sie es in einem Moment erneut."},
 errRate:{en:"Too many requests at the moment. Please try again later.",de:"Derzeit zu viele Anfragen. Bitte versuchen Sie es später erneut."},
 needGoal:{en:"Please choose what you would most like to understand or improve.",de:"Bitte wählen Sie, was Sie am ehesten verstehen oder verbessern möchten."},
 heads:{goal:{en:"Where you want to get to",de:"Wohin Sie möchten"},current:{en:"Where you appear to be now",de:"Wo Sie derzeit zu stehen scheinen"},
  gap:{en:"The main gap",de:"Die zentrale Lücke"},domains:{en:"What may be shaping it",de:"Was das prägen könnte"},
  questions:{en:"The questions worth answering first",de:"Die Fragen, die zuerst zu beantworten sind"},
  pathway:{en:"A preliminary assessment sequence",de:"Eine vorläufige Abklärungsabfolge"},
  outcomes:{en:"What progress would look like",de:"Woran Fortschritt zu erkennen wäre"},
  loop:{en:"The decision loop",de:"Die Entscheidungsschleife"},
  priorities:{en:"What we would prioritise first",de:"Was wir zuerst priorisieren würden"},
  bring:{en:"What to bring to a consultation",de:"Was Sie zum Gespräch mitbringen sollten"}},
 first:{en:"First",de:"Zuerst"},next:{en:"Next",de:"Danach"},onlyif:{en:"Only if indicated",de:"Nur bei Indikation"},
 qAnswers:{en:"Question it answers",de:"Beantwortete Frage"},qWhy:{en:"Why it matters",de:"Warum es zählt"},qChange:{en:"How the result could change the plan",de:"Wie das Ergebnis den Plan verändern könnte"},
 subj:{en:"Subjective",de:"Subjektiv"},func:{en:"Functional",de:"Funktional"},obj:{en:"Objective",de:"Objektiv"},
 fine:{en:"This preliminary roadmap is educational and based only on the information you provided. It identifies useful questions and possible assessment priorities. It is not a diagnosis or an individualised medical treatment plan.",
   de:"Diese vorläufige Roadmap ist edukativ und beruht ausschliesslich auf Ihren Angaben. Sie benennt nützliche Fragen und mögliche Abklärungsprioritäten. Sie ist weder eine Diagnose noch ein individueller Behandlungsplan."},
 cta:{en:"Discuss my roadmap",de:"Meine Roadmap besprechen"},
 ctaText:{en:"Bring your roadmap, your existing results and your goals. We can work out which questions actually need answering, what is worth measuring, and what can be left alone.",
   de:"Bringen Sie Ihre Roadmap, Ihre vorhandenen Befunde und Ihre Ziele mit. Gemeinsam klären wir, welche Fragen tatsächlich zu beantworten sind, was sich zu messen lohnt und was man in Ruhe lassen kann."},
 urgent:{en:"Some of what you described should be looked at quickly rather than through a roadmap. Please contact your physician today, or an emergency service if the situation is acute. In Switzerland call 144. If you are in distress and need to talk to someone now, the Dargebotene Hand is reachable on 143.",
   de:"Ein Teil dessen, was Sie beschrieben haben, sollte rasch angeschaut werden und nicht über eine Roadmap. Bitte kontaktieren Sie heute Ihre Ärztin oder Ihren Arzt, bei akuter Situation den Notfalldienst. In der Schweiz wählen Sie 144. Wenn Sie belastet sind und jetzt mit jemandem sprechen möchten, ist die Dargebotene Hand unter 143 erreichbar."}
};
function T(o){return o&&o[lang]?o[lang]:(o&&o.en)||""}

function setLang(next){
  lang=next; d.documentElement.lang=next;
  d.querySelectorAll("[data-en]").forEach(function(el){
    var v=el.getAttribute("data-"+next); if(v===null) return;
    if(el.hasAttribute("data-html")) el.innerHTML=v; else el.textContent=v;
  });
  d.querySelectorAll(".lang button").forEach(function(b){b.setAttribute("aria-pressed",String(b.dataset.lang===next));});
  paintRead(d.querySelector('.node[aria-pressed="true"]'));
  buildMeasure(); buildFaq();
  if(typeof W!=="undefined"&&W&&W.relang) W.relang();
  if(typeof W!=="undefined"&&W&&W.relang) W.relang();
  
}
d.querySelectorAll(".lang button").forEach(function(b){b.addEventListener("click",function(){window.location.href=d.documentElement.dataset[b.dataset.lang+"Url"];});});

/* ---------- hero map ---------- */
var readEl=d.getElementById("mapRead");
var readDefault=readEl?{en:readEl.getAttribute("data-en"),de:readEl.getAttribute("data-de")}:{};
function paintRead(node){ if(!readEl)return;
  if(node) readEl.innerHTML=node.getAttribute("data-read-"+lang)||"";
  else readEl.textContent=readDefault[lang];
}
d.querySelectorAll(".node").forEach(function(n){
  n.addEventListener("click",function(){
    var on=n.getAttribute("aria-pressed")==="true";
    d.querySelectorAll(".node").forEach(function(o){o.setAttribute("aria-pressed","false");});
    n.setAttribute("aria-pressed",on?"false":"true");
    paintRead(on?null:n);
  });
});

/* ---------- accordions ---------- */
function accItem(id,title,badge,body){
  return '<div class="acc-item"><h3 style="margin:0"><button class="acc-btn" type="button" aria-expanded="false" aria-controls="p-'+id+'">'+
    '<span style="flex:1;font-size:1.0625rem;font-weight:700;letter-spacing:-.02em">'+title+'</span>'+badge+
    '<span class="sign" aria-hidden="true"></span></button></h3><div class="acc-panel" id="p-'+id+'" hidden>'+body+'</div></div>';
}
function lvlLabel(l){return {l1:{en:"Established",de:"Etabliert"},l2:{en:"Conditional",de:"Bedingt"},l3:{en:"Emerging",de:"Aufkommend"},l4:{en:"Exploratory",de:"Explorativ"}}[l];}
function buildMeasure(){
  var box=d.getElementById("measureAcc"); if(!box)return;
  box.innerHTML=MEASURE.map(function(m){
    var badge='<span class="lvl '+m.lvl+'">'+T(lvlLabel(m.lvl))+'</span>';
    var body='<dl>'+
      '<div><dt>'+T({en:"What we are trying to understand",de:"Was wir verstehen wollen"})+'</dt><dd>'+T(m.u)+'</dd></div>'+
      '<div><dt>'+T({en:"Why it could matter",de:"Warum es relevant sein könnte"})+'</dt><dd>'+T(m.w)+'</dd></div>'+
      '<div><dt>'+T({en:"When we would measure it",de:"Wann wir es messen"})+'</dt><dd>'+T(m.n)+'</dd></div>'+
      '<div><dt>'+T({en:"How the result could change management",de:"Wie das Ergebnis das Vorgehen ändern kann"})+'</dt><dd>'+T(m.c)+'</dd></div></dl>';
    return accItem("m-"+m.id,T(m.t),badge,body);
  }).join("");
  wireAcc(box);
}
function buildFaq(){
  var box=d.getElementById("faqAcc"); if(!box)return;
  box.innerHTML=FAQ.map(function(f,i){return accItem("f"+i,T(f.q),"","<p>"+T(f.a)+"</p>");}).join("");
  wireAcc(box);
}
function wireAcc(box){
  box.querySelectorAll(".acc-btn").forEach(function(b){
    b.addEventListener("click",function(){
      var open=b.getAttribute("aria-expanded")==="true";
      b.setAttribute("aria-expanded",String(!open));
      d.getElementById(b.getAttribute("aria-controls")).hidden=open;
    });
  });
}

/* ---------- citations ---------- */
d.addEventListener("click",function(e){
  var c=e.target.closest(".cite"); if(!c) return;
  var ref=d.getElementById("ref-"+c.dataset.ref); if(!ref){window.location.href="/betterhealth-new-website/"+(lang==="de"?"de/":"")+"science/#ref-"+c.dataset.ref;return;}
  d.querySelectorAll(".ref").forEach(function(r){r.removeAttribute("data-hit");});
  ref.setAttribute("data-hit","1");
  ref.scrollIntoView({block:"center",behavior:"smooth"});
});

/* ---------- nav ---------- */
var burger=d.querySelector(".burger"), drawer=d.getElementById("drawer");
function closeDrawer(){drawer.classList.remove("open");burger.setAttribute("aria-expanded","false");d.body.classList.remove("locked");}
burger.addEventListener("click",function(){
  var open=drawer.classList.toggle("open");
  burger.setAttribute("aria-expanded",String(open));
  d.body.classList.toggle("locked",open);
});
drawer.querySelectorAll("a").forEach(function(a){a.addEventListener("click",closeDrawer);});
d.addEventListener("keydown",function(e){if(e.key==="Escape")closeDrawer();});
window.addEventListener("resize",function(){if(window.innerWidth>1080)closeDrawer();});

/* ---------- BetterHealth Preliminary Roadmap (interactive model builder) ---------- */
/* ---------- BetterHealth preliminary map: a short curiosity tool ---------- */
var W=(function(){ if(!d.getElementById("wiz"))return null;
function t(a){return lang==="de"?a[1]:a[0];}
function esc(x){return String(x==null?"":x).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
function has(a,v){return a.indexOf(v)>-1;}

var GOALS=[
 ["mh","Mood and mental health","Stimmung und psychische Gesundheit",{psych:3}],
 ["stress","Stress and resilience","Stress und Resilienz",{auto:3,env:2}],
 ["sleep","Sleep and recovery","Schlaf und Erholung",{sleep:3}],
 ["energy","Energy and fatigue","Energie und Erschöpfung",{metab:3,auto:1}],
 ["cog","Concentration and clarity","Konzentration und Klarheit",{cog:3}],
 ["perf","Performance under load","Leistung unter Belastung",{cardio:2,auto:2}],
 ["prev","Long-term brain health","Langfristige Hirngesundheit",{neuro:2,cardio:2,cog:1}],
 ["unsure","Something feels off","Etwas fühlt sich anders an",{}]
];
var SIG=[
 ["conc","Concentration is shorter than it was","Die Konzentration hält kürzer als früher",{cog:3,sleep:1}],
 ["fog","Thinking feels foggy or slow","Das Denken fühlt sich träge oder unklar an",{cog:2,metab:2,sleep:1}],
 ["mem","Small things slip my memory","Kleinigkeiten entfallen mir",{cog:2,neuro:1}],
 ["mood","Mood is lower or flatter","Die Stimmung ist gedrückter oder flacher",{psych:3,metab:1}],
 ["anx","Tension or anxiety I cannot place","Anspannung oder Angst ohne klaren Anlass",{psych:3,auto:2}],
 ["switch","I cannot switch off","Ich kann nicht abschalten",{auto:3,sleep:1}],
 ["sleepq","Sleep is broken or unrefreshing","Der Schlaf ist unterbrochen oder nicht erholsam",{sleep:3,auto:1}],
 ["early","I wake far too early","Ich wache viel zu früh auf",{sleep:3,psych:1}],
 ["fat","Tired in a way rest does not fix","Müde auf eine Art, die Ruhe nicht behebt",{metab:3,sleep:2,endo:1}],
 ["crash","The afternoon disappears","Der Nachmittag geht verloren",{metab:3,sleep:1}],
 ["rec","Recovery takes longer than it used to","Die Erholung dauert länger als früher",{auto:3,cardio:1}],
 ["ex","Exercise feels harder than it should","Sport fällt schwerer, als er sollte",{cardio:3,metab:1}],
 ["irrit","Shorter fuse than usual","Kürzere Zündschnur als sonst",{psych:2,sleep:1}],
 ["drop","I have quietly dropped things I used to do","Ich habe still aufgegeben, was ich früher tat",{behav:3,psych:1}],
 ["treat","Treatment has not done what I hoped","Die Behandlung hat nicht bewirkt, was ich erhofft hatte",{meds:3,psych:1}],
 ["none","Nothing much. I am here out of interest","Eigentlich nichts. Mich interessiert das Thema",{}],
 ["more","I am struggling more than this can capture","Mir geht es schlechter, als das hier abbilden kann",{},"urgent"]
];
var WHEN=[
 ["stress","Under pressure","Unter Druck",{auto:2,env:3}],
 ["poorsleep","After poor sleep","Nach schlechtem Schlaf",{sleep:3}],
 ["aft","Later in the day","Später am Tag",{metab:2}],
 ["quiet","When I finally stop","Wenn ich endlich zur Ruhe komme",{auto:2,psych:2}],
 ["always","More or less constantly","Mehr oder weniger dauernd",{metab:1,endo:1,neuro:1}],
 ["nopat","No pattern I can see","Kein erkennbares Muster",{}]
];
var LONG=[
 ["weeks","Weeks","Wochen",{}],
 ["months","A few months","Einige Monate",{}],
 ["year","About a year","Etwa ein Jahr",{metab:1,endo:1}],
 ["longer","Longer than that","Länger",{metab:1,endo:1,neuro:1,cardio:1}]
];
var DOMS={
 cog:{n:["Cognition","Kognition"],
  o:["Worth separating what has measurably changed from what feels changed. They are not the same thing, and they lead to different plans.",
     "Es lohnt sich zu trennen, was sich messbar verändert hat, von dem, was sich verändert anfühlt. Das ist nicht dasselbe und führt zu unterschiedlichen Plänen."],
  q:["Has your concentration objectively changed, or is the demand on it what changed?",
     "Hat sich Ihre Konzentration objektiv verändert, oder hat sich die Anforderung an sie verändert?"]},
 psych:{n:["Mood and learned responses","Stimmung und gelernte Reaktionen"],
  o:["Mood shapes what the body does next, and what the body does next shapes mood. Which way it is running matters more than the label.",
     "Stimmung prägt, was der Körper tut, und was der Körper tut, prägt die Stimmung. In welche Richtung es läuft, zählt mehr als das Etikett."],
  q:["Is the mood driving the physical state, or following it?","Treibt die Stimmung den körperlichen Zustand an, oder folgt sie ihm?"]},
 sleep:{n:["Sleep and circadian rhythm","Schlaf und zirkadianer Rhythmus"],
  o:["Sleep sits upstream of almost everything else you selected, which makes it the first thing worth ruling in or out.",
     "Schlaf liegt fast allem anderen vor, was Sie ausgewählt haben, und ist damit das Erste, was sich zu klären lohnt."],
  q:["Is disturbed sleep causing the daytime picture, or is it a symptom of it?","Verursacht gestörter Schlaf das Tagesbild, oder ist er ein Symptom davon?"]},
 auto:{n:["Stress regulation and recovery","Stressregulation und Erholung"],
  o:["The interesting question is not how activated you get, but whether the system comes back down afterwards.",
     "Die interessante Frage ist nicht, wie stark Sie aktiviert werden, sondern ob das System danach wieder herunterkommt."],
  q:["Does your system return to baseline when the pressure comes off?","Kehrt Ihr System zum Ausgangswert zurück, wenn der Druck nachlässt?"]},
 metab:{n:["Energy regulation","Energieregulation"],
  o:["The shape of your energy across a day says more than the total amount of it, and it is straightforward to look at.",
     "Der Verlauf Ihrer Energie über den Tag sagt mehr aus als ihre Gesamtmenge, und er lässt sich einfach anschauen."],
  q:["Is there a treatable contributor behind the fatigue that has not been excluded?","Steckt hinter der Erschöpfung eine behandelbare Ursache, die noch nicht ausgeschlossen wurde?"]},
 endo:{n:["Hormonal regulation","Hormonelle Regulation"],
  o:["Several of the things you selected have hormonal contributors that are simple to check and easy to overlook.",
     "Mehrere Ihrer Angaben haben hormonelle Mitursachen, die einfach zu prüfen und leicht zu übersehen sind."],
  q:["Has the obvious hormonal explanation been excluded?","Wurde die naheliegende hormonelle Erklärung ausgeschlossen?"]},
 cardio:{n:["Physical capacity","Körperliche Kapazität"],
  o:["Capacity quietly sets the ceiling on everything else, and it is one of the few things that reliably moves.",
     "Kapazität setzt unbemerkt die Obergrenze für alles andere und gehört zu den wenigen Dingen, die sich verlässlich bewegen lassen."],
  q:["Where does your capacity actually sit, rather than where you assume it sits?","Wo liegt Ihre Kapazität tatsächlich, statt dort, wo Sie sie vermuten?"]},
 behav:{n:["What the week looks like","Wie die Woche aussieht"],
  o:["What quietly got dropped is often exactly what was holding the rest of it together.",
     "Was still weggefallen ist, war oft genau das, was den Rest zusammengehalten hat."],
  q:["Which parts of this are realistically changeable inside your actual week?","Welche Teile davon sind in Ihrer realen Woche tatsächlich veränderbar?"]},
 env:{n:["Demand and environment","Anforderung und Umgebung"],
  o:["When things lift as soon as demand drops, the environment is doing more of the work than anything internal.",
     "Wenn sich alles bessert, sobald die Anforderung sinkt, trägt die Umgebung mehr bei als jeder interne Faktor."],
  q:["How much of this is the situation, and how much has become self-sustaining?","Wie viel davon ist die Situation, und wie viel hat sich verselbstständigt?"]},
 meds:{n:["Treatment response","Behandlungsansprechen"],
  o:["An incomplete response is information. It narrows the explanation rather than simply calling for more of the same.",
     "Ein unvollständiges Ansprechen ist Information. Es engt die Erklärung ein, statt einfach mehr vom Gleichen zu verlangen."],
  q:["What did the treatment predict would change, and did it?","Was sollte sich unter der Behandlung verändern, und ist es eingetreten?"]},
 neuro:{n:["Long-term brain health","Langfristige Hirngesundheit"],
  o:["This is the part where a baseline taken now is worth considerably more than the same measurement taken later.",
     "Hier ist ein jetzt erhobener Ausgangswert deutlich mehr wert als dieselbe Messung später."],
  q:["What is your modifiable risk, separated from what is merely measurable?","Was ist Ihr veränderbares Risiko, getrennt von dem, was lediglich messbar ist?"]}
};

/* ---------- state ---------- */
var S={goals:[],sig:[],when:[],long:"",goalText:""}, step=0, mount=d.getElementById("wiz");
var sampleReady=null, aiText="", aiState="";
var U={
 kick:["Interactive","Interaktiv"],
 title:["What is shaping your state?","Was prägt Ihren Zustand?"],
 intro:["Three questions, about a minute, and you will see which systems your pattern makes worth looking at, and the questions we would want answered. It is a thinking tool, not an assessment.",
        "Drei Fragen, etwa eine Minute, und Sie sehen, welche Systeme Ihr Muster interessant macht und welche Fragen wir beantwortet haben wollten. Ein Denkwerkzeug, keine Abklärung."],
 start:["Start","Beginnen"],next:["Next","Weiter"],back:["Back","Zurück"],again:["Start again","Neu beginnen"],
 build:["Building your model","Ihr Modell entsteht"],
 crumbs:[["Goal","Ziel"],["Signals","Signale"],["Pattern","Muster"]],
 q1:["What would you most like to improve?","Was möchten Sie am ehesten verbessern?"],
 q1s:["Choose your main priority. Selecting an answer takes you to the next question.","Wählen Sie Ihr wichtigstes Ziel. Mit Ihrer Auswahl gelangen Sie zur nächsten Frage."],
 q1t:["And in your own words: if this were meaningfully better in a year, what would be different?",
      "Und in Ihren eigenen Worten: Wenn das in einem Jahr deutlich besser wäre, was wäre dann anders?"],
 q1th:["One or two lines is enough. Something you would be able to do again, or stop having to work around.",
       "Ein oder zwei Zeilen genügen. Etwas, das Sie wieder tun könnten, oder etwas, das Sie nicht mehr umgehen müssten."],
 yourGoal:["Your goal, in your words","Ihr Ziel, in Ihren Worten"],
 aiWait:["Reading that against your answers","Wird gegen Ihre Antworten gelesen"],
 q2:["What are you noticing?","Was nehmen Sie wahr?"],
 q2s:["Pick whatever applies. Three or four is plenty.","Wählen Sie, was zutrifft. Drei oder vier genügen."],
 q3:["When is it most obvious?","Wann ist es am deutlichsten?"],
 q3s:["And roughly how long has it been like this? Select an answer to see your roadmap.","Und wie lange ist das ungefähr schon so? Wählen Sie eine Antwort, um Ihre Roadmap zu sehen."],
 see:["See what this points at","Zeigen, worauf das deutet"],
 resTitle:["What your answers point at","Worauf Ihre Antworten deuten"],
 resSub:["Several systems can produce the same experience. These three are worth looking at first.",
         "Mehrere Systeme können dasselbe Erleben erzeugen. Diese drei lohnen sich zuerst."],
 worth:["Worth looking at","Lohnt den Blick"],
 goal:["Your goal","Ihr Ziel"],
 qs:["What we would want answered","Was wir beantwortet haben wollten"],
 endT:["This is as far as a web page can take it","Weiter kommt eine Webseite nicht"],
 endP:["Which of these actually explains your situation is a conversation. Your answers come with you into the form.",
       "Welche davon Ihre Situation tatsächlich erklärt, ist ein Gespräch. Ihre Angaben werden ins Formular übernommen."],
 cta:["Discuss this with us","Das mit uns besprechen"],
 fine:["A curiosity tool, not a medical assessment, and not a diagnosis. Nothing is stored here. Where the short summary is written, your text is sent to the model that writes it.",
       "Ein Neugier-Werkzeug, keine medizinische Abklärung und keine Diagnose. Hier wird nichts gespeichert. Wo die kurze Zusammenfassung entsteht, wird Ihr Text an das Modell übermittelt, das sie schreibt."],
 carry:["Your answers and your own wording will be carried into the form, so you do not have to type them again.",
        "Ihre Angaben und Ihre eigene Formulierung werden in das Formular übernommen, damit Sie sie nicht erneut eintippen müssen."],
 urgT:["Please talk to someone rather than a web page","Bitte sprechen Sie mit jemandem statt mit einer Webseite"],
 urgP:["If things are worse than this tool can hold, that deserves a person, not a map. Contact your physician today, or an emergency service if it is acute. In Switzerland the emergency number is 144, and the Dargebotene Hand is reachable on 143 at any hour.",
       "Wenn es schlechter steht, als dieses Werkzeug abbilden kann, verdient das einen Menschen und keine Karte. Kontaktieren Sie heute Ihre Ärztin oder Ihren Arzt, bei akuter Lage den Notfalldienst. In der Schweiz ist die Notrufnummer 144, die Dargebotene Hand ist rund um die Uhr unter 143 erreichbar."]
};

function card(name,id,label,checked,type){
 return '<label class="card-opt"><input type="'+type+'" name="'+name+'" value="'+id+'"'+(checked?" checked":"")+
  '><span class="box"><b>'+esc(label)+"</b></span></label>";
}
function chip(name,id,label,checked){
 return '<label class="chip"><input type="checkbox" name="'+name+'" value="'+id+'"'+(checked?" checked":"")+
  '><span>'+esc(label)+"</span></label>";
}
function crumbs(){
 return '<div class="wiz-crumbs">'+U.crumbs.map(function(c,i){
  var cls=step===i+1?"crumb on":(step>i+1?"crumb done":"crumb");
  return '<span class="'+cls+'">'+esc(t(c))+"</span>";}).join("")+"</div>";
}
function frame(inner,o){
 o=o||{};
 var nav='<div class="wiz-nav">'+(o.back===false?"":'<button class="btn btn-ghost" type="button" data-act="back">'+esc(t(U.back))+"</button>")+
  (o.auto?'':'<button class="btn btn-primary" type="button" data-act="next">'+esc(t(o.label||U.next))+"</button>")+
  (o.count?'<span class="count">'+esc(o.count)+"</span>":"")+"</div>";
 mount.innerHTML='<div class="wiz-bar"><p class="tag">'+esc(t(U.build))+"</p>"+crumbs()+"</div>"+
  '<div class="wiz-step">'+inner+"</div>"+nav;
}
function head(q,s){return '<h3 class="wiz-q">'+esc(q)+"</h3>"+(s?'<p class="wiz-sub">'+esc(s)+"</p>":"");}

function scrIntro(){
 mount.innerHTML='<div class="wiz-bar"><p class="tag">'+esc(t(U.kick))+'</p></div><div class="wiz-step">'+
  '<h3 class="wiz-q">'+esc(t(U.title))+'</h3><p class="wiz-sub">'+esc(t(U.intro))+"</p>"+
  '<button class="btn btn-primary" type="button" data-act="next">'+esc(t(U.start))+"</button></div>";
}
function goalNote(){
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
function scr3(){
 frame(head(t(U.q3))+'<div class="chipset">'+
  WHEN.map(function(x){return chip("when",x[0],t([x[1],x[2]]),has(S.when,x[0]));}).join("")+"</div>"+
  '<div class="grp" style="margin-top:28px"><h4>'+esc(t(U.q3s))+'</h4><div class="chipset">'+
  LONG.map(function(x){return '<label class="chip"><input type="radio" name="long" value="'+x[0]+'"'+
    (S.long===x[0]?" checked":"")+'><span>'+esc(t([x[1],x[2]]))+"</span></label>";}).join("")+"</div></div>",
  {label:U.see});
}

/* ---------- engine ---------- */
function addW(sc,w){ if(w) for(var k in w) sc[k]=(sc[k]||0)+w[k]; }
function pick(list,id){for(var i=0;i<list.length;i++) if(list[i][0]===id) return list[i]; return null;}
function ranked(){
 var sc={};
 S.goals.forEach(function(id){var x=pick(GOALS,id); if(x) addW(sc,x[3]);});
 S.sig.forEach(function(id){var x=pick(SIG,id); if(x) addW(sc,x[3]);});
 S.when.forEach(function(id){var x=pick(WHEN,id); if(x) addW(sc,x[3]);});
 var l=pick(LONG,S.long); if(l) addW(sc,l[3]);
 if(has(S.sig,"none")) addW(sc,{neuro:2,cardio:2,cog:1});
 var out=[];
 for(var k in sc) if(sc[k]>0) out.push([k,sc[k]]);
 out.sort(function(a,b){return b[1]-a[1]||a[0].localeCompare(b[0]);});
 return out.map(function(x){return x[0];});
}
function goalLabel(){
 if(!S.goals.length) return t(["A clearer picture","Ein klareres Bild"]);
 return S.goals.map(function(id){var g=pick(GOALS,id); return g?t([g[1],g[2]]):"";}).join(" · ");
}
function summary(){
 var lbl=function(list,ids){return ids.map(function(i){var x=pick(list,i);return x?t([x[1],x[2]]):"";}).filter(Boolean).join(", ");};
 var l=pick(LONG,S.long);
 return [
  t(["Goal","Ziel"])+": "+lbl(GOALS,S.goals),
  t(["In their words","In eigenen Worten"])+": "+(S.goalText.trim()||"-"),
  t(["Noticing","Wahrgenommen"])+": "+lbl(SIG,S.sig),
  t(["Worse when","Deutlicher bei"])+": "+(lbl(WHEN,S.when)||"-"),
  t(["Duration","Dauer"])+": "+(l?t([l[1],l[2]]):"-")
 ].join("\n");
}
function askAI(){var slot=d.getElementById("aiSlot");if(slot)slot.remove();}
function renderResult(){
 var top=ranked().slice(0,3);
 if(!top.length) top=["auto","sleep","cog"];
 var nodes=top.map(function(k){return '<div class="snode p1"><b>'+esc(t(DOMS[k].n))+'</b><span>'+esc(t(U.worth))+"</span></div>";});
 var html='<div class="wiz-bar"><p class="tag">'+esc(t(U.kick))+"</p></div><div class=\"wiz-step\">"+
  '<div class="res-head"><h3>'+esc(t(U.resTitle))+"</h3><p>"+esc(t(U.resSub))+"</p></div>"+
  '<div class="smap"><div class="smap-side">'+nodes.slice(0,2).join("")+"</div>"+
   '<div class="smap-core"><div class="from">'+esc(t(U.goal))+'</div><div class="to">'+esc(goalLabel())+"</div></div>"+
   '<div class="smap-side">'+(nodes[2]||"")+"</div></div>"+
  (S.goalText.trim()?'<div class="res-block"><h4>'+esc(t(U.yourGoal))+'</h4>'+
    '<p class="obs" style="font-size:1.0625rem;line-height:1.6;margin:0">'+esc(S.goalText.trim())+"</p>"+
    '<div id="aiSlot" style="margin-top:14px"></div></div>':"")+
  '<div class="res-block"><h4>'+esc(t(U.qs))+"</h4>"+
   top.map(function(k,i){return '<div class="unk"><span class="n">0'+(i+1)+'</span><p>'+esc(t(DOMS[k].q))+"</p></div>";}).join("")+"</div>"+
  '<div class="res-end"><h4>'+esc(t(U.endT))+"</h4><p>"+esc(t(U.endP))+"</p>"+
   '<div class="btn-row"><button class="btn btn-primary" type="button" data-act="carry">'+esc(t(U.cta))+"</button>"+
   '<button class="btn btn-ghost" type="button" data-act="restart">'+esc(t(U.again))+"</button></div>"+
   '<p class="res-fine">'+esc(t(U.fine))+"</p></div></div>";
 mount.innerHTML=html;
 askAI(top);
 mount.scrollIntoView({block:"start",behavior:"smooth"});
}
function renderUrgent(){
 mount.innerHTML='<div class="wiz-step"><div class="urgent"><h3>'+esc(t(U.urgT))+"</h3><p>"+esc(t(U.urgP))+"</p>"+
  '<div class="btn-row" style="margin-top:20px"><a class="btn btn-primary" href="#contact">'+esc(t(U.cta))+"</a>"+
  '<button class="btn btn-ghost" type="button" data-act="restart">'+esc(t(U.again))+"</button></div></div></div>";
 mount.scrollIntoView({block:"start",behavior:"smooth"});
}
sampleReady=Promise.resolve(null);

function render(){
 if(step===0) return scrIntro();
 if(step===1) return scr1();
 if(step===2) return scr2();
 if(step===3) return scr3();
 if(has(S.sig,"more")) return renderUrgent();
 renderResult();
}
mount.addEventListener("change",function(e){
 var n=e.target.name,v=e.target.value,on=e.target.checked;
 function multi(arr,lim){
  var i=arr.indexOf(v);
  if(on&&i<0){ if(lim&&arr.length>=lim){e.target.checked=false;return;} arr.push(v); }
  if(!on&&i>-1) arr.splice(i,1);
 }
 if(n==="goal"){ return; }
 else if(n==="sig"){ multi(S.sig); }
 else if(n==="when"){ multi(S.when); }
 else if(n==="long"){ S.long=v; }
});
mount.addEventListener("click",function(e){
 var choice=e.target.closest('input[type="radio"]');
 if(choice&&choice.name==="goal"){S.goals=[choice.value];moveTo(2);return;}
 if(choice&&choice.name==="long"){S.long=choice.value;moveTo(4);return;}
 var b=e.target.closest("[data-act]"); if(!b) return;
 var a=b.dataset.act;
 if(a==="carry"){
  var box=d.getElementById("f-msg");
  if(box){
   var lines=[];
   if(S.goalText.trim()) lines.push(t(["What I would like to be different:","Was anders sein sollte:"])+"\n"+S.goalText.trim());
   lines.push(t(["From the preliminary map:","Aus der vorläufigen Karte:"])+"\n"+summary());
   if(aiText) lines.push(aiText);
   box.value=lines.join("\n\n");
   box.dispatchEvent(new Event("input",{bubbles:true}));
  }
  var c=d.getElementById("contact");
  if(c) c.scrollIntoView({behavior:"smooth",block:"start"});
  setTimeout(function(){ var n=d.getElementById("f-name"); if(n) n.focus(); },700);
  return;
 }
 if(a==="restart"){ S={goals:[],sig:[],when:[],long:"",goalText:""}; aiText=""; return moveTo(0); }
 if(a==="back"){ return moveTo(Math.max(0,step-1)); }
 if(a==="next"){
  if(step===1&&!S.goals.length) return;
  if(step===2&&!S.sig.length) return;
  moveTo(step+1);
 }
});
render();
return {relang:function(){render();}};
})();



/* ---------- enquiry form ---------- */
var ef=d.getElementById("enquiry"), fmsg=d.getElementById("formMsg");
var FM={required:{en:"Please complete the highlighted fields.",de:"Bitte füllen Sie die markierten Felder aus."},
  email:{en:"Please enter a valid email address.",de:"Bitte geben Sie eine gültige E-Mail-Adresse ein."},
  consent:{en:"Please confirm the consent checkbox.",de:"Bitte bestätigen Sie die Einwilligung."},
  sent:{en:"Your request is ready in your mail app. Send it and a physician will reply personally.",de:"Ihre Anfrage ist in Ihrer Mail-App vorbereitet. Senden Sie sie ab, eine Ärztin oder ein Arzt antwortet persönlich."}};
function say(kind,key){ fmsg.className="msg show "+kind; fmsg.textContent=T(FM[key]); }
if(ef)ef.addEventListener("submit",function(e){
  e.preventDefault();
  var n=d.getElementById("f-name"),m=d.getElementById("f-mail"),t=d.getElementById("f-tel"),
      x=d.getElementById("f-msg"),c=d.getElementById("f-consent");
  [n,m,x].forEach(function(f){f.classList.remove("bad");});
  var miss=[n,m,x].filter(function(f){return !f.value.trim();});
  if(miss.length){ miss.forEach(function(f){f.classList.add("bad");}); miss[0].focus(); return say("err","required"); }
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(m.value.trim())){ m.classList.add("bad"); m.focus(); return say("err","email"); }
  if(!c.checked){ c.focus(); return say("err","consent"); }
  var body="Name: "+n.value.trim()+"\nEmail: "+m.value.trim()+"\nPhone: "+(t.value.trim()||"-")+"\n\n"+x.value.trim()+"\n";
  window.location.href="mailto:hello@betterhealth.ch?subject="+encodeURIComponent((d.getElementById("interest")&&d.getElementById("interest").value==="corporate"?"Corporate education enquiry: ":"Consultation request: ")+n.value.trim())+"&body="+encodeURIComponent(body);
  say("ok","sent");
});

/* ---------- reveal on scroll ---------- */
if("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches){
  var rvTargets=[];
  d.querySelectorAll("section > .shell > *").forEach(function(el){
    if(el.classList.contains("rail")||el.id==="wiz") return;
    el.classList.add("rv"); rvTargets.push(el);
  });
  d.querySelectorAll(".rail").forEach(function(el){ el.classList.add("rv"); rvTargets.push(el); });
  var rio=new IntersectionObserver(function(es){
    es.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add("in"); rio.unobserve(en.target); } });
  },{rootMargin:"0px 0px -8% 0px",threshold:.04});
  rvTargets.forEach(function(el){ rio.observe(el); });
}

/* ---------- enquiry context ---------- */
var interest=d.getElementById("interest");
if(interest&&new URLSearchParams(window.location.search).get("interest")==="corporate")interest.value="corporate";
/* ---------- init ---------- */
d.getElementById("yr").textContent=new Date().getFullYear();
buildMeasure(); buildFaq();
setLang(d.documentElement.lang);

})();
