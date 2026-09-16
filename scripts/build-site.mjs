import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { gunzipSync } from 'node:zlib';

const urls = Array.from({ length: 11 }, (_, i) =>
  new URL(`../site-parts/site.part${String(i).padStart(2, '0')}`, import.meta.url)
);
const parts = await Promise.all(urls.map((url) => readFile(url)));
const html = gunzipSync(Buffer.concat(parts));
const dist = new URL('../dist/', import.meta.url);

await mkdir(dist, { recursive: true });
await writeFile(new URL('index.html', dist), html);
await writeFile(new URL('404.html', dist), html);
await writeFile(new URL('.nojekyll', dist), '');

console.log(`Built BetterHealth website (${html.length.toLocaleString()} bytes).`);
