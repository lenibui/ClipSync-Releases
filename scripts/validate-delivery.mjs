import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const manifest = JSON.parse(await readFile('incoming/latest.json', 'utf8'));
if (!/^\d+\.\d+\.\d+$/.test(manifest.version) || process.env.GITHUB_REF_NAME !== `delivery/v${manifest.version}`) throw new Error('Version/branch mismatch');
const allowed = /^(?:ClipSync-Setup\.exe|ClipSync\.dmg|ClipSync_\d+\.\d+\.\d+_(?:x64-setup\.exe(?:\.sig)?|aarch64\.app\.tar\.gz(?:\.sig)?)|latest\.json|RELEASE_NOTES\.md|SHA256SUMS\.txt)$/;
for (const name of await readdir('incoming')) if (!allowed.test(name)) throw new Error(`Unexpected delivery file: ${name}`);
for (const target of ['windows-x86_64', 'darwin-aarch64']) {
  const item = manifest.platforms[target];
  if (!item?.signature) throw new Error('Missing target signature');
  const url = new URL(item.url);
  if (!url.href.startsWith(`https://github.com/lenibui/ClipSync-Releases/releases/download/v${manifest.version}/`)) throw new Error('Unexpected asset URL');
  const name = url.pathname.split('/').pop();
  if (!allowed.test(name)) throw new Error('Unexpected update package');
  const signature = await readFile(`incoming/${name}.sig`, 'utf8');
  if (signature.trim() !== item.signature.trim()) throw new Error('Signature metadata mismatch');
  await readFile(`incoming/${name}`);
}
const checksums = (await readFile('incoming/SHA256SUMS.txt', 'utf8')).trim().split(/\r?\n/);
const checked = new Set();
for (const line of checksums) {
  const match = /^([a-f0-9]{64})  (.+)$/.exec(line);
  if (!match || !allowed.test(match[2]) || checked.has(match[2])) throw new Error('Invalid checksum entry');
  const hash = createHash('sha256').update(await readFile(`incoming/${match[2]}`)).digest('hex');
  if (hash !== match[1]) throw new Error('Checksum mismatch');
  checked.add(match[2]);
}
for (const name of await readdir('incoming')) if (name !== 'SHA256SUMS.txt' && !checked.has(name)) throw new Error('Missing checksum');
