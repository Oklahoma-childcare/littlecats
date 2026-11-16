import { createServer } from 'node:http';
import { watch, readFile, stat } from 'node:fs/promises';
import { join, dirname, resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from './build.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const dir=join(root,'dist');
const types={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.json':'application/json','.txt':'text/plain','.xml':'application/xml'};
await build();
const port=Number(process.env.PORT||5173);
const server=createServer(async(req,res)=>{
  try{
    const url=new URL(req.url,'http://localhost');
    const name=decodeURIComponent(url.pathname);
    const path=resolve(dir, '.'+name);
    if(!path.startsWith(dir)){res.writeHead(403);res.end('Forbidden');return;}
    let file=path;
    let s=await stat(file).catch(()=>null);
    if(s?.isDirectory()||!extname(file)){file=join(file,'index.html');s=await stat(file).catch(()=>null);}
    if(!s?.isFile()){res.writeHead(404);res.end('Not found');return;}
    res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream','Cache-Control':'no-store'});
    res.end(await readFile(file));
  }catch(e){res.writeHead(500);res.end('Server error');console.error(e);}
});
server.listen(port,()=>console.log(`Little Cats website: http://localhost:${port}`));
for(const folder of ['src','public']){
  (async()=>{try{for await(const _ of watch(join(root,folder),{recursive:true})){try{await build();}catch(err){console.error('Rebuild failed:',err);}}}catch(err){console.error('File watcher stopped:',err);}})();
}
