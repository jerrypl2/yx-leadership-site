// Prepare only the dedicated API checkout. Its build script packages the Worker
// and schema; the public GitHub Pages artifact contains neither.
import { build } from 'esbuild';
import { cp, readFile, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
const checkout = process.argv[2];
if (!checkout) throw new Error('Supply the existing Sites API checkout path.');
const manifest = resolve(checkout, '.openai/hosting.json');
const hosting = JSON.parse(await readFile(manifest));
if (hosting.project_id !== 'appgprj_6b086fb62664819199db469660b8e9ec') throw new Error('Unexpected API project');
await build({entryPoints:['worker/yueyue-api.js'],bundle:true,format:'esm',platform:'browser', target:'es2022', outfile:join(checkout,'worker/index.js')});
await writeFile(manifest, JSON.stringify({...hosting, d1:'DB'}, null, 2) + '\n');
await cp('drizzle', join(checkout,'drizzle'), {recursive:true});
await cp('scripts/build-api.sh', join(checkout,'scripts/build.sh'));
