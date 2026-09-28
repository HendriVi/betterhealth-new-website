import {readFile,writeFile,mkdir,rm,cp} from 'node:fs/promises';
import {improveRoadmapUX} from './roadmap-ux.mjs';
import {makePages} from '../src/pages.mjs';
const original=await readFile('src/original-site.html','utf8');
const base='/betterhealth-new-website/',origin='https://hendrivi.github.io';
const css=original.match(/<style>([\s\S]*?)<\/style>/)[1];
let js=original.match(/<script>\s*([\s\S]*?)<\/script>/)[1];
js=js.replace('var readDefault={en:readEl.getAttribute("data-en"),de:readEl.getAttribute("data-de")};','var readDefault=readEl?{en:readEl.getAttribute("data-en"),de:readEl.getAttribute("data-de")}:{};')
.replace('function paintRead(node){','function paintRead(node){ if(!readEl)return;')
.replace('var box=d.getElementById("measureAcc");','var box=d.getElementById("measureAcc"); if(!box)return;')
.replace('var box=d.getElementById("faqAcc");','var box=d.getElementById("faqAcc"); if(!box)return;')
.replace('var W=(function(){','var W=(function(){ if(!d.getElementById("wiz"))return null;')
.replace('ef.addEventListener("submit"','if(ef)ef.addEventListener("submit"')
.replace(/var groups=\{[\s\S]*?\/\* ---------- BetterHealth Preliminary/,'/* ---------- BetterHealth Preliminary')
.replace('if(!ref) return;','if(!ref){window.location.href="'+base+'"+(lang==="de"?"de/":"")+"science/#ref-"+c.dataset.ref;return;}')
.replace('setLang(b.dataset.lang);','window.location.href=d.documentElement.dataset[b.dataset.lang+"Url"];')
.replace('try{localStorage.setItem("bh-lang",next);}catch(e){}','')
.replace(/var saved=null; try\{saved=localStorage.getItem\("bh-lang"\);\}catch\(e\)\{\}\s*setLang\(saved==="de"\?"de":"en"\);/,'setLang(d.documentElement.lang);')
.replace(/function askAI\(top\)\{[\s\S]*?\nfunction renderResult\(\)/,'function askAI(){var slot=d.getElementById("aiSlot");if(slot)slot.remove();}\nfunction renderResult()');
js=js.replace(/sampleReady=\(window.claude[\s\S]*?: Promise.resolve\(null\);/,'sampleReady=Promise.resolve(null);');
js=js.replace('/* ---------- init ---------- */',`/* ---------- enquiry context ---------- */
var interest=d.getElementById("interest");
if(interest&&new URLSearchParams(window.location.search).get("interest")==="corporate")interest.value="corporate";
/* ---------- init ---------- */`);
js=js.replace('"Consultation request: "+n.value.trim()', '(d.getElementById("interest")&&d.getElementById("interest").value==="corporate"?"Corporate education enquiry: ":"Consultation request: ")+n.value.trim()');
js=improveRoadmapUX(js);
const sections={};for(const m of original.matchAll(/<section\b[\s\S]*?<\/section>/g)){const id=m[0].match(/^<section[^>]*id="([^"]+)"/)?.[1]||'hero';sections[id]=m[0];}
sections.contact=sections.contact.replace('<form class="form" id="enquiry" novalidate>', '<form class="form" id="enquiry" novalidate><div class="f"><label for="interest" data-en="Enquiry about" data-de="Anfrage zu">Enquiry about</label><select id="interest"><option value="individual" data-en="Individual consultation" data-de="Persönliches Erstgespräch">Individual consultation</option><option value="corporate" data-en="Corporate education" data-de="Wissensvermittlung im Unternehmen">Corporate education</option></select></div>');
let header=original.slice(original.indexOf('<div class="gridlines"'),original.indexOf('<main'));
let footer=original.match(/<footer[\s\S]*?<\/footer>/)[0];
sections.about=sections.about.replace(/<div class="portrait">[\s\S]*?<\/div>/,'').replace('class="about"','class="about original-about"').replace(/<li class="dim"[\s\S]*?<\/li>/,'');
sections.process=sections.process.replace(/<span class="when"[\s\S]*?<\/span>/g,'');
const configs={home:['Home','Startseite',['hero','problem']],individuals:['For individuals','Für Privatpersonen',['who','process']],approach:['Our approach','Unser Ansatz',['model','intervention','response']],assessment:['Assessment','Abklärung',['measure','logic','decision']],science:['Science & evidence','Wissenschaft & Evidenz',['science','evidence']],roadmap:['Your preliminary roadmap','Ihre vorläufige Roadmap',['roadmap','contact']],about:['About BetterHealth','Über BetterHealth',['about']],faq:['Frequently asked questions','Häufige Fragen',['faq']],contact:['Contact','Kontakt',['contact']],organisations:['For organisations','Für Unternehmen',[]],learn:['Education','Wissen',[]],privacy:['Privacy','Datenschutz',[]],legal:['Legal notice','Impressum',[]]};
const sectionRoute={hero:'home',top:'home',problem:'home'};for(const [id,c] of Object.entries(configs))for(const s of c[2])if(s!=='contact')sectionRoute[s]=id;sectionRoute.contact='contact';
const esc=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
await rm('dist',{recursive:true,force:true});await mkdir('dist/assets',{recursive:true});
await writeFile('public/assets/site.css',css+'\n/* Only adaptations required by separate pages. */\n.f select{width:100%;padding:14px;background:var(--ink-2);color:var(--paper);border:1px solid var(--line-ink);font:inherit}.original-about{grid-template-columns:1fr}.page-heading{padding-top:64px;padding-bottom:64px}.page-heading h1{max-width:22ch}.page-heading .lede{margin-top:24px;max-width:62ch}.page-links{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1px;background:var(--line-paper);border:1px solid var(--line-paper)}.page-link{padding:32px;background:var(--paper)}.page-link p{margin:16px 0 24px}.education-block{padding:32px 0;border-top:1px solid var(--line-paper)}.education-block p{max-width:70ch}.education-block h2{font-size:clamp(1.5rem,3vw,2.25rem);margin-bottom:18px}.education-block .btn-row{margin-top:24px}.foot-cols nav{flex-wrap:wrap}.foot-legal a{margin-left:16px}.prose{max-width:75ch}.prose h2{font-size:1.65rem;margin:32px 0 16px}.prose p{margin:16px 0}.nav a[aria-current]{color:var(--signal)}@media(max-width:700px){.page-links{grid-template-columns:1fr}}@media(min-width:1101px) and (max-width:1350px){.hdr-in{gap:12px}.nav a{padding-left:10px;padding-right:10px}.hdr-tools{gap:12px}.hdr-tools .btn{padding-left:14px;padding-right:14px}}');
await writeFile('public/assets/site.js',js);await cp('public','dist',{recursive:true});
const urls=[];
for(const lang of ['en','de']){
const t=(a,b)=>lang==='de'?b:a;const url=id=>base+(lang==='de'?'de/':'')+(id==='home'?'':id+'/');
const link=(id,label,cls='btn btn-primary')=>`<a class="${cls}" href="${url(id)}">${label||configs[id][lang==='de'?1:0]}</a>`;
const intro=(tag,title,copy='')=>`<section class="on-ink page-heading"><div class="shell"><p class="tag">${tag}</p><h1>${title}</h1>${copy?`<p class="lede">${copy}</p>`:''}</div></section>`;
const block=(title,copy,actions='')=>`<div class="education-block"><h2>${title}</h2><p>${copy}</p>${actions?`<div class="btn-row">${actions}</div>`:''}</div>`;
const wrap=body=>`<section class="on-paper"><div class="shell">${body}</div></section>`;
const cta=wrap(block(t('Start with a conversation','Beginnen wir mit einem Gespräch'),t('Tell us what you would like to understand or change.','Sagen Sie uns, was Sie verstehen oder verändern möchten.'),link('contact')));
const added={};
added.organisations=intro(t('BetterHealth for organisations','BetterHealth für Unternehmen'),t('Mental health, stress and burnout. Understood. Put into practice.','Psychische Gesundheit, Stress und Burnout. Verstehen. Im Alltag umsetzen.'),t('We work with organisations to explain the biology, neuroscience and psychology behind mental health, stress and burnout, and connect that understanding to what people and teams can actually do.','Wir arbeiten mit Unternehmen, um die Biologie, Neurowissenschaft und Psychologie hinter psychischer Gesundheit, Stress und Burnout verständlich zu machen und mit konkreten Handlungsmöglichkeiten für Menschen und Teams zu verbinden.'))+wrap(
block(t('Understand what is happening','Verstehen, was passiert'),t('Accessible explanations of stress, recovery, attention and behaviour. The aim is to make the science useful in everyday working life, with space for questions and discussion.','Verständliche Erklärungen zu Stress, Erholung, Aufmerksamkeit und Verhalten. Ziel ist, Wissenschaft im Arbeitsalltag nutzbar zu machen, mit Raum für Fragen und Austausch.'))+
block(t('Connect the science to your workplace','Die Wissenschaft mit Ihrem Arbeitsalltag verbinden'),t('We discuss individual habits alongside working conditions: workload, expectations, autonomy, communication and opportunities for recovery. Practical examples connect the underlying mechanisms to situations your team recognises.','Wir betrachten persönliche Gewohnheiten ebenso wie Arbeitsbedingungen: Arbeitsbelastung, Erwartungen, Handlungsspielraum, Kommunikation und Erholungsmöglichkeiten. Praktische Beispiele verbinden die zugrunde liegenden Mechanismen mit Situationen, die Ihr Team kennt.'))+
block(t('Leave with actions to discuss and try','Konkrete Schritte besprechen und erproben'),t('Sessions move from explanation to application: recognising patterns, identifying changes within your control, and deciding where further support is needed. We agree the audience, focus and format with you before a session.','Von der Erklärung zur Anwendung: Muster erkennen, beeinflussbare Veränderungen identifizieren und klären, wo weitere Unterstützung nötig ist. Zielgruppe, Schwerpunkte und Format stimmen wir vorab mit Ihnen ab.'))+
block(t('Discuss a session for your organisation','Eine Veranstaltung für Ihr Unternehmen besprechen'),t('Tell us about your organisation, the people you want to reach and the questions you want the session to address.','Erzählen Sie uns von Ihrem Unternehmen, Ihrer Zielgruppe und den Fragen, die Sie behandeln möchten.'),`<a class="btn btn-primary" href="${url('contact')}?interest=corporate">${t('Enquire about corporate education','Unternehmensangebot anfragen')}</a>`));
added.learn=intro(t('Education','Wissen'),t('Understand the science. Use it in real life.','Wissenschaft verstehen. Im Alltag nutzen.'),t('The thinking behind BetterHealth, with the evidence and its limits made visible.','Die Grundlagen von BetterHealth, mit nachvollziehbarer Evidenz und klar benannten Grenzen.'))+wrap(
block(t('Science & evidence','Wissenschaft & Evidenz'),t('Explore the original scientific foundations of our approach, the referenced studies and how we distinguish established knowledge from emerging ideas.','Entdecken Sie die wissenschaftlichen Grundlagen unseres Ansatzes, die zitierten Studien und unsere Unterscheidung zwischen etabliertem Wissen und neuen Ansätzen.'),link('science',t('Explore the science','Wissenschaft entdecken')))+
block(t('Reading & blog','Lesen & Blog'),t('Start with our explanations of the BetterHealth model, how assessments inform decisions and how change is reviewed. No additional blog posts have been published here yet.','Beginnen Sie mit unseren Erklärungen zum BetterHealth-Modell, zur Rolle von Abklärungen bei Entscheidungen und zur Überprüfung von Veränderungen. Weitere Blogbeiträge sind hier noch nicht veröffentlicht.'),link('approach')+link('assessment',null,'btn btn-ghost'))+
block(t('Courses & workplace learning','Kurse & Lernen im Unternehmen'),t('For learning tailored to a team or organisation, explore our corporate education work. Public course dates and enrolment are not currently listed.','Für auf Teams und Unternehmen abgestimmte Wissensvermittlung finden Sie Informationen in unserem Unternehmensangebot. Öffentliche Kurstermine und Anmeldungen sind derzeit nicht aufgeführt.'),link('organisations'))+
block(t('Social media','Social Media'),t('Official social media channels will be linked here once confirmed. For now, you can contact BetterHealth directly with questions about the material.','Offizielle Social-Media-Kanäle werden hier verlinkt, sobald sie bestätigt sind. Bei Fragen zu den Inhalten können Sie BetterHealth direkt kontaktieren.'),link('contact',t('Ask a question','Eine Frage stellen'))));
const old=makePages(lang,base).pages;
for(const id of ['privacy','legal']){
 let body=old[id].body;const prose=body.match(/<div class="prose">([\s\S]*?)<\/div>/)?.[1]||'';
 added[id]=intro('BetterHealth',configs[id][lang==='de'?1:0])+wrap('<div class="prose">'+prose.replace('or externally loaded fonts','').replace('oder extern geladenen Schriften','')+(id==='privacy'?block(t('Fonts','Schriften'),t('This site loads Inter and IBM Plex Mono from Google Fonts. Your browser connects to Google to request these files.','Diese Website lädt Inter und IBM Plex Mono von Google Fonts. Ihr Browser stellt zum Abruf dieser Dateien eine Verbindung zu Google her.')):'')+'</div>');
}
for(const [id,c] of Object.entries(configs)){
let body=added[id]||c[2].map(s=>sections[s]).join('\n');
if(!added[id]&&id!=='home')body=body.replace(/<h2\b/,'<h1').replace('</h2>','</h1>');
if(id==='home')body+=wrap(`<div class="page-links">${['individuals','organisations','learn','approach'].map(k=>`<div class="page-link"><h2 style="font-size:1.75rem">${configs[k][lang==='de'?1:0]}</h2><div class="btn-row" style="margin-top:24px">${link(k,t('Explore','Entdecken'),'btn btn-ghost')}</div></div>`).join('')}</div>`);
if(!['home','contact','roadmap','organisations','privacy','legal'].includes(id))body+=cta;
let head=header.replace(/<nav class="nav"[\s\S]*?<\/nav>/,`<nav class="nav" aria-label="Primary">${['individuals','organisations','learn','about'].map(k=>`<a href="${url(k)}" ${id===k?'aria-current="page"':''}>${configs[k][lang==='de'?1:0]}</a>`).join('')}</nav>`);
head=head.replace('<div class="drawer" id="drawer">',`<div class="drawer" id="drawer">${link('organisations',null,'')}${link('learn',null,'')}`);
let foot=footer.replace(/<p class="foot-legal[\s\S]*?<\/p>/,`<p class="foot-legal dim">© <span id="yr">2026</span> BetterHealth ${link('privacy',null,'')}${link('legal',null,'')}</p>`).replace('<nav aria-label="Footer">',`<nav aria-label="Footer">${link('organisations',null,'')}${link('learn',null,'')}${link('about',null,'')}`);
let content=head+'<main id="main"><span id="top"></span>'+body+'</main>'+foot;
content=content.replace(/href="#([^"]+)"/g,(m,anchor)=>{if(anchor==='main')return m;if(anchor==='top')return `href="${url('home')}"`;const target=sectionRoute[anchor];return target?`href="${url(target)}#${anchor}"`:m;});
// Keep the roadmap's hand-off on the same page; inputs stay in memory only.
if(id==='roadmap')content=content.replaceAll(`href="${url('contact')}#contact"`,'href="#contact"');
const en=base+(id==='home'?'':id+'/'),de=base+'de/'+(id==='home'?'':id+'/');
const title=c[lang==='de'?1:0]+' | BetterHealth';
await mkdir('dist/'+(lang==='de'?'de/':'')+(id==='home'?'':id+'/'),{recursive:true});
await writeFile('dist/'+(lang==='de'?'de/':'')+(id==='home'?'':id+'/')+'index.html',`<!doctype html><html lang="${lang}" data-en-url="${en}" data-de-url="${de}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(c[lang==='de'?1:0])} — BetterHealth. ${t('Brain and mental health.','Hirn- und psychische Gesundheit.')}"><meta name="theme-color" content="#1A1A1A"><link rel="canonical" href="${origin+url(id)}"><link rel="alternate" hreflang="en" href="${origin+en}"><link rel="alternate" hreflang="de" href="${origin+de}"><link rel="icon" href="${base}assets/favicon.svg"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet"><link rel="stylesheet" href="${base}assets/site.css?v=original-4"><script src="${base}assets/site.js?v=original-4" defer></script><noscript><style>.drawer{display:flex;position:static;visibility:visible;opacity:1;transform:none;height:auto;padding:32px;gap:16px}.burger{display:none}</style></noscript></head><body>${content}</body></html>`);urls.push(origin+url(id));
}}
await writeFile('dist/.nojekyll','');
await writeFile('dist/sitemap.xml','<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+urls.map(u=>'<url><loc>'+u+'</loc></url>').join('')+'</urlset>');
await writeFile('dist/robots.txt','User-agent: *\nAllow: /\nSitemap: '+origin+base+'sitemap.xml\n');
await writeFile('dist/404.html',`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Page not found | BetterHealth</title><link rel="stylesheet" href="${base}assets/site.css"><main class="shell"><h1>Page not found</h1><a href="${base}">Return to BetterHealth</a></main></html>`);
console.log(`Built ${urls.length} pages from the original design.`);
