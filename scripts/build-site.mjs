import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { gunzipSync } from 'node:zlib';

const urls = Array.from({ length: 11 }, (_, i) =>
  new URL(`../site-parts/site.part${String(i).padStart(2, '0')}`, import.meta.url)
);
const parts = await Promise.all(urls.map((url) => readFile(url)));

let html = gunzipSync(Buffer.concat(parts)).toString('utf8');

/*
 * BetterHealth brand accent.
 * Preserve the neutral editorial palette and replace only the former gold
 * accent system with BetterHealth teal.
 */
html = html
  .replaceAll('#D4AF37', '#029781')
  .replaceAll('#d4af37', '#029781')
  .replaceAll('rgba(212,175,55,.14)', 'rgba(2,151,129,.14)')
  .replaceAll('rgba(212,175,55,.12)', 'rgba(2,151,129,.12)')
  .replaceAll('rgba(212, 175, 55, .14)', 'rgba(2, 151, 129, .14)')
  .replaceAll('rgba(212, 175, 55, .12)', 'rgba(2, 151, 129, .12)');

const dist = new URL('../dist/', import.meta.url);

await mkdir(dist, { recursive: true });
await writeFile(new URL('index.html', dist), html);
await writeFile(new URL('404.html', dist), html);
await writeFile(new URL('.nojekyll', dist), '');

console.log(`Built BetterHealth website (${Buffer.byteLength(html).toLocaleString()} bytes).`);
