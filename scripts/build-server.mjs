import { build } from 'esbuild';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
process.chdir(projectRoot);

const production = process.env.NODE_ENV === 'production';
const sourcemap = process.env.PRODUCTION_SOURCEMAPS === 'true' || (!production && process.env.SOURCEMAP === 'true');

await build({
  entryPoints: [path.join(projectRoot, 'server.ts')],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  packages: 'external',
  sourcemap,
  outfile: path.join(projectRoot, 'dist/server.cjs'),
});
