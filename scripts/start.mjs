import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const builtServer = path.join(projectRoot, 'dist', 'server.cjs');

if (!fs.existsSync(builtServer)) {
  console.error(`[Gadwal startup] Production server bundle was not found: ${builtServer}`);
  console.error('[Gadwal startup] Run npm run build before npm start.');
  process.exit(1);
}

process.chdir(projectRoot);
await import(pathToFileURL(builtServer).href);
