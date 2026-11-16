import { readFile, stat } from 'node:fs/promises';
import { join, dirname, resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROUTES } from '../src/render.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const dist=join(root,'dist');
let passed=0;
const assert=(condition,message)=>{if(!condition)throw new Error('FAILED: '+message);passed++;};
const base=await readFile(join(root,'src/config/site.json'),'utf8');
const site=JSON.parse(base);
const media=JSON.parse(await readFile(join(root,'src/config/media.json'),'utf8'));
for(const r of ROUTES){
  const f=join(dist,r.slug,'index.html');
  const html=await readFile(f,'utf8');
  assert((html.match(/<h1(?:\s|>)/gi)||[]).length===1,`one H1: ${r.slug||'home'}`);
  assert(html.includes('<!doctype html>')&&html.includes('</html>'),`HTML shell: ${r.slug||'home'}`);
  assert(/<title>[^<]+<\/title>/.test(html),`title: ${r.slug||'home'}`);
  assert(/<meta name="description" content="[^"]+"/.test(html),`description: ${r.slug||'home'}`);
  assert(html.includes(site.licenseId)&&html.includes('Little Cats'),`identity: ${r.slug||'home'}`);
  for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g)){
    const url=m[1];
    if(url.startsWith('http')||url.startsWith('mailto:')||url.startsWith('tel:')||url.startsWith('#')||url.startsWith('data:'))continue;
    const withoutFragment=url.split('#')[0].split('?')[0];
    if(!withoutFragment)continue;
    const target=resolve(dirname(f),withoutFragment);
    assert(target.startsWith(dist),`safe path: ${url}`);
    let s=await stat(target).catch(()=>null);
    if(s?.isDirectory())s=await stat(join(target,'index.html')).catch(()=>null);
    assert(Boolean(s?.isFile()),`resolves: ${r.slug||'home'} -> ${url}`);
  }
}
for(const [key,item] of Object.entries(media)){
  assert(Boolean(item.src),`media src: ${key}`);
  assert(Boolean(item.alt),`media alt: ${key}`);
  if(item.src.startsWith('/'))assert((await stat(join(dist,item.src.slice(1))).catch(()=>null))?.isFile(),`media exists: ${key}`);
}
const expected=['our-place','little-years','for-families','questions','contact'];
for(const slug of expected)assert(ROUTES.some(r=>r.slug===slug),`route ${slug}`);
assert(!base.includes('example.com'), 'domain is not a fabricated live URL');
console.log(`PASS: ${passed} checks across ${ROUTES.length} pages, images and links.`);
