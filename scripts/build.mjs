import { readFile, writeFile, mkdir, cp, rm } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROUTES, renderPage } from '../src/render.mjs';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const parse = async path => JSON.parse(await readFile(join(root,path),'utf8'));
export async function build(){
  const [site, media] = await Promise.all([parse('src/config/site.json'),parse('src/config/media.json')]);
  if(site.ageGroups?.length !== 3 || !site.phoneE164 || !site.licenseUrl) throw new Error('Missing required verified site details.');
  await rm(dist,{recursive:true,force:true});
  await mkdir(dist,{recursive:true});
  await cp(join(root,'public'),dist,{recursive:true});
  for(const route of ROUTES){
    const file = join(dist, route.slug, 'index.html');
    await mkdir(dirname(file),{recursive:true});
    await writeFile(file,renderPage(route,site,media));
  }
  const url = site.domain?.trim();
  if(url?.startsWith('https://')){
    const base=url.replace(/\/$/,'');
    const urls=ROUTES.map(r=>`  <url><loc>${base}/${r.slug?`${r.slug}/`:''}</loc></url>`).join('\n');
    await writeFile(join(dist,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`);
    await writeFile(join(dist,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`);
  }
  console.log(`Built ${ROUTES.length} pages to ${dist}`);
}
if(process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)){
  build().catch(e=>{console.error(e);process.exit(1);});
}
