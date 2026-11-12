import fs from 'fs';

let content = fs.readFileSync('src/AdminApp.tsx', 'utf-8');

// Colors replacement
content = content.replace(/bg-neutral-950\/50/g, 'bg-mist/50');
content = content.replace(/bg-neutral-950/g, 'bg-paper');
content = content.replace(/bg-neutral-900/g, 'bg-white');
content = content.replace(/bg-neutral-800\/50/g, 'bg-mist/50');
content = content.replace(/bg-neutral-800/g, 'bg-mist');
content = content.replace(/bg-neutral-700/g, 'bg-line');
content = content.replace(/text-neutral-100/g, 'text-ink');
content = content.replace(/text-neutral-200/g, 'text-ink');
content = content.replace(/text-neutral-300/g, 'text-text-secondary');
content = content.replace(/text-neutral-400/g, 'text-text-secondary');
content = content.replace(/text-neutral-500/g, 'text-text-muted');
content = content.replace(/border-neutral-800/g, 'border-line');
content = content.replace(/border-neutral-700/g, 'border-line');
content = content.replace(/hover:bg-neutral-800/g, 'hover:bg-mist');
content = content.replace(/hover:bg-neutral-700/g, 'hover:bg-mist');
content = content.replace(/hover:bg-neutral-900/g, 'hover:bg-paper');
content = content.replace(/hover:text-neutral-300/g, 'hover:text-ink');
content = content.replace(/hover:text-neutral-100/g, 'hover:text-ink');
content = content.replace(/bg-emerald-500\/10/g, 'bg-emerald-50');
content = content.replace(/text-emerald-400/g, 'text-emerald-700');
content = content.replace(/text-emerald-500/g, 'text-emerald-600');
content = content.replace(/border-emerald-500\/20/g, 'border-emerald-200');
content = content.replace(/border-emerald-500\/30/g, 'border-emerald-200');
content = content.replace(/bg-amber-500\/10/g, 'bg-amber-50');
content = content.replace(/text-amber-400/g, 'text-amber-700');
content = content.replace(/text-amber-500/g, 'text-amber-600');
content = content.replace(/border-amber-500\/20/g, 'border-amber-200');
content = content.replace(/bg-red-500\/10/g, 'bg-red-50');
content = content.replace(/text-red-400/g, 'text-red-700');
content = content.replace(/text-red-500/g, 'text-red-600');
content = content.replace(/border-red-500\/20/g, 'border-red-200');
content = content.replace(/bg-blue-500\/10/g, 'bg-blue-50');
content = content.replace(/text-blue-400/g, 'text-blue-700');
content = content.replace(/border-blue-500\/20/g, 'border-blue-200');

fs.writeFileSync('/tmp/AdminApp_new.tsx', content, 'utf-8');
console.log('Done');
