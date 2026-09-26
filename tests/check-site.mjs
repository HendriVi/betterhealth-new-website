import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {chromium}=require('playwright');
import {readdir,readFile,mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const host=process.env.TEST_ORIGIN||'http://127.0.0.1:4173';
const base='/betterhealth-new-website/';
const errors=[]; const pages=[];
async function walk(dir,relative=''){for(const item of await readdir(dir,{withFileTypes:true})){if(item.isDirectory())await walk(dir+'/'+item.name,relative+item.name+'/');else if(item.name==='index.html')pages.push(relative);}}
await walk('dist');
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const context=await browser.newContext({viewport:{width:1440,height:1000}});
const page=await context.newPage();
page.on('pageerror',e=>errors.push(e.message));
page.on('response',res=>{if(res.status()>=400&&res.url().startsWith(host))errors.push(`${res.status()} ${res.url()}`);});
await mkdir('test-results',{recursive:true});
let linksChecked=0;
for(const path of pages){
 await page.goto(host+base+path);
 assert.equal(await page.locator('h1').count(),1,`${path}: one h1`);
 assert.ok(await page.title(),`${path}: title`);
 assert.ok(await page.locator('meta[name=description]').getAttribute('content'),`${path}: description`);
 assert.equal(await page.locator('html').getAttribute('lang'),path.startsWith('de/')?'de':'en');
 const bad=await page.evaluate(()=>[...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')).filter(x=>!x||x==='#'||x.startsWith('javascript:')));
 assert.deepEqual(bad,[],`${path}: no empty links`);
 const links=await page.locator('a[href]').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('href')));
 for(const href of links){if(href.startsWith(base)){const url=new URL(href,host);const local='dist/'+url.pathname.slice(base.length)+(url.pathname.endsWith('/')?'index.html':'');await readFile(local);linksChecked++;}else if(href.startsWith('#'))assert.ok(await page.locator(`[id="${href.slice(1)}"]`).count(),`${path}: ${href} exists`);}
 for(const width of [1440,390]){await page.setViewportSize({width,height:900});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${path}: no overflow at ${width}`);const clipped=await page.locator('h1,h2,h3,p,button').evaluateAll(ns=>ns.filter(n=>n.getBoundingClientRect().width>0&&n.scrollWidth>n.clientWidth+2).map(n=>n.textContent.slice(0,60)));assert.deepEqual(clipped,[],`${path}: text fits at ${width}`);}
}
await page.setViewportSize({width:1440,height:1000});
for(const [route,file] of [['','home-desktop'],['organisations/','corporate-desktop'],['learn/','learn-desktop'],['contact/','contact-desktop'],['de/','home-de-desktop']]){await page.goto(host+base+route);await page.screenshot({path:`test-results/${file}.png`,fullPage:true});}
await page.setViewportSize({width:390,height:844});await page.goto(host+base);
await page.screenshot({path:'test-results/home-mobile.png',fullPage:true});
await page.getByRole('button',{name:'Menu',exact:true}).click();assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
await page.goto(host+base+'learn/');await page.getByRole('button',{name:'At work',exact:true}).click();assert.equal(await page.locator('[data-category]:visible').count(),1);assert.match(await page.locator('#filter-status').textContent(),/1 resources/);await page.getByRole('button',{name:'All articles',exact:true}).click();assert.equal(await page.locator('[data-category]:visible').count(),3);
await page.goto(host+base+'faq/');const summary=page.locator('summary').first();await summary.click();assert.equal(await page.locator('details').first().getAttribute('open'),'');
await page.goto(host+base+'roadmap/');await page.getByLabel('Stress & recovery',{exact:true}).check();await page.selectOption('#duration','persistent');await page.getByRole('button',{name:'Show my conversation prompts'}).click();assert.equal(await page.locator('#roadmap-result').isVisible(),true);assert.match(await page.locator('#roadmap-question').textContent(),/workload/);await page.getByLabel('Sleep & energy',{exact:true}).check();assert.equal(await page.locator('#roadmap-result').isVisible(),false);
await page.goto(host+base+'contact/?interest=corporate');assert.equal(await page.inputValue('#interest'),'corporate');assert.ok(await page.locator('#corporate-fields').isVisible());
await page.getByRole('button',{name:'Prepare my email'}).click();assert.equal(await page.locator('#email-result').isVisible(),false);
await page.fill('#name','QA Test');await page.fill('#email','qa@example.com');await page.fill('#company','Example AG');await page.selectOption('#team','16–30');await page.fill('#message','We would like a workshop for our team.');await page.check('input[name=privacy]');
let outgoing=0;page.on('request',r=>{if(['fetch','xhr'].includes(r.resourceType()))outgoing++;});await page.getByRole('button',{name:'Prepare my email'}).click();assert.ok(await page.locator('#email-result').isVisible());const mail=await page.locator('#open-email').getAttribute('href');assert.ok(mail.startsWith('mailto:hello@betterhealth.ch?'));assert.match(decodeURIComponent(mail),/Example AG/);assert.equal(outgoing,0);await page.fill('#message','Changed');assert.equal(await page.locator('#email-result').isVisible(),false);
await page.goto(host+base+'de/contact/?interest=corporate');assert.equal(await page.inputValue('#interest'),'corporate');assert.ok(await page.getByRole('button',{name:'Meine E-Mail vorbereiten'}).isVisible());
const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const staticPage=await nojs.newPage();await staticPage.goto(host+base);assert.ok(await staticPage.getByRole('link',{name:'For organisations',exact:true}).first().isVisible());assert.ok(await staticPage.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await nojs.close();
assert.deepEqual(errors,[]);const report={pages:pages.length,internalLinksChecked:linksChecked,viewports:[1440,390],checks:['unique h1, metadata, language','local links and anchors','horizontal overflow and clipped text','mobile menu and Escape','resource filters','FAQ disclosures','reflection tool updates','contact validation, corporate selection, email draft, no submission','German contact flow','navigation without JavaScript'],errors};await writeFile('test-results/report.json',JSON.stringify(report,null,2));console.log(report);await browser.close();
