import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// Resolve the project root from this file, not from the process' initial cwd.
// Some hosted IDEs launch npm scripts from a wrapper directory.
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const entryPoint = path.join(projectRoot, 'server.ts');
const packageJson = path.join(projectRoot, 'package.json');

function fail(message) {
  console.error(`[Gadwal startup preflight] ${message}`);
  process.exit(1);
}

if (!fs.existsSync(packageJson)) fail(`package.json was not found at ${projectRoot}`);
if (!fs.existsSync(entryPoint)) fail(`Backend entry point server.ts was not found at ${entryPoint}. Re-import the complete project ZIP and keep its root files at the project root.`);
try {
  fs.accessSync(entryPoint, fs.constants.R_OK);
} catch {
  fail(`Backend entry point is not readable: ${entryPoint}. Check extracted file permissions.`);
}

// Respect the port supplied by hosted IDEs as an argument if they did not set PORT.
const args = process.argv.slice(2);
if (args.includes('--check')) {
  console.log('[Gadwal startup preflight] Project files and backend entry point are present and readable.');
  process.exit(0);
}
for (let i = 0; i < args.length; i += 1) {
  if (args[i] === '--port' && args[i + 1] && !process.env.PORT) process.env.PORT = args[i + 1];
  if (args[i].startsWith('--port=') && !process.env.PORT) process.env.PORT = args[i].slice('--port='.length);
}

const tsxPackage = path.join(projectRoot, 'node_modules', 'tsx', 'package.json');
if (!fs.existsSync(tsxPackage)) fail(`The tsx runtime is not installed at ${tsxPackage}. Run npm install in the project root and retry.`);

process.chdir(projectRoot);
console.log(`[Gadwal startup] Project root: ${projectRoot}`);
console.log(`[Gadwal startup] Backend entry: ${entryPoint}`);
console.log(`[Gadwal startup] Port: ${process.env.PORT || '3000 (default)'}`);

const child = spawn(process.execPath, ['--import', 'tsx', entryPoint, ...args], {
  cwd: projectRoot,
  env: process.env,
  stdio: 'inherit',
});

child.on('error', (error) => fail(`Could not launch the TypeScript runtime: ${error.message}. Confirm dependencies were installed with npm install.`));
child.on('exit', (code, signal) => {
  if (signal) {
    console.error(`[Gadwal startup] Backend stopped by signal ${signal}.`);
    process.exit(1);
  }
  process.exit(code ?? 1);
});
