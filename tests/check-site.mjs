import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);const {chromium}=require('playwright');
import {readdir,readFile,mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const host='http://127.0.0.1:4173',base='/betterhealth-new-website/';
const routes=[],errors=[];let links=0;
async function walk(dir,p=''){for(const f of await readdir(dir,{withFileTypes:true}))if(f.isDirectory())await walk(dir+'/'+f.name,p+f.name+'/');else if(f.name==='index.html')routes.push(p);}
await walk('dist');await mkdir('test-results',{recursive:true});
const browser=await chromium.launch({args:['--no-sandbox']});const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
for(const route of routes){
 await page.goto(host+base+route);await page.waitForFunction(()=>document.getElementById('yr')?.textContent);
 assert.equal(await page.locator('h1').count(),1,route+' h1');
 assert.equal(await page.locator('html').getAttribute('lang'),route.startsWith('de/')?'de':'en');
 for(const href of await page.locator('a[href]').evaluateAll(ns=>ns.map(n=>n.getAttribute('href')))){
 if(href.startsWith(base)){const u=new URL(href,host);const f='dist/'+u.pathname.slice(base.length)+(u.pathname.endsWith('/')?'index.html':'');const html=await readFile(f,'utf8');if(u.hash)assert.ok(html.includes('id="'+u.hash.slice(1)+'"'),route+' '+href);links++;}
 else if(href.startsWith('#'))assert.ok(await page.locator('[id="'+href.slice(1)+'"]').count(),route+' '+href);
 }
 for(const width of [1440,390]){await page.setViewportSize({width,height:900});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),route+' overflow '+width);}
}
await page.goto(host+base);assert.match(await page.locator('h1').textContent(),/What shapes your brain/);assert.equal(await page.locator('.map-frame .node').count(),4);assert.equal(await page.locator('.orb,.orbit,.atom').count(),0);
await page.locator('.node').first().click();assert.match(await page.locator('#mapRead').textContent(),/Cognition/);
await page.locator('.burger').click();assert.equal(await page.locator('.burger').getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await page.locator('.burger').getAttribute('aria-expanded'),'false');
await page.goto(host+base+'faq/');await page.locator('.acc-btn').first().click();assert.equal(await page.locator('.acc-btn').first().getAttribute('aria-expanded'),'true');
await page.goto(host+base+'assessment/');assert.ok(await page.locator('.acc-btn').count()>3);await page.locator('.acc-btn').first().click();assert.ok(await page.locator('.acc-panel').first().isVisible());
await page.goto(host+base+'roadmap/');await page.locator('#wiz [data-act="start"]').click();assert.ok(await page.locator('#wiz input').count()>0);
await page.goto(host+base+'contact/?interest=corporate');assert.equal(await page.inputValue('#interest'),'corporate');await page.locator('#enquiry button[type=submit]').click();assert.ok(await page.locator('#f-name').evaluate(e=>e===document.activeElement));
await page.goto(host+base+'de/');assert.match(await page.locator('h1').textContent(),/Was Ihr Gehirn/);await page.locator('.burger').click();await page.locator('#drawer [data-lang=en]').click();await page.waitForURL(host+base);assert.match(await page.locator('h1').textContent(),/What shapes/);
for(const [route,name] of [['','home'],['organisations/','corporate'],['learn/','education']]){for(const width of [1440,390]){await page.setViewportSize({width,height:1000});await page.goto(host+base+route);await page.screenshot({path:`test-results/${name}-${width}.png`,fullPage:true});}}
assert.deepEqual(errors,[]);await writeFile('test-results/report.json',JSON.stringify({pages:routes.length,links,errors,checks:['original homepage, four rectangular explanation tiles, no atom','all page links and anchors','desktop and mobile overflow','menu and language navigation','assessment and FAQ accordions','original interactive roadmap starts','corporate enquiry context and form validation']},null,2));await browser.close();
