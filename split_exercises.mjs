import fs from 'fs';
import path from 'path';

// We'll read exercises and parse the JS using basic string matching since it's just an array of objects
const exPath = 'src/data/exercises.js';
const content = fs.readFileSync(exPath, 'utf-8');

const modulesList = [
  { id: 2, name: 'module2_variables' },
  { id: 3, name: 'module3_io' },
  { id: 4, name: 'module4_conditionals' },
  { id: 5, name: 'module5_loops' },
  { id: 6, name: 'module6_lists' },
  { id: 7, name: 'module7_functions' }
];

let remainingContent = content;
let imports = [];
let arrayElements = [];

for (let i = 0; i < modulesList.length; i++) {
  const mod = modulesList[i];
  const startMarker = `  // ───────────── MODULE ${mod.id}:`;
  const nextMod = modulesList[i+1];
  const endMarker = nextMod ? `  // ───────────── MODULE ${nextMod.id}:` : `];`;

  const startIndex = remainingContent.indexOf(startMarker);
  const endIndex = remainingContent.indexOf(endMarker, startIndex);
  
  if (startIndex === -1 || endIndex === -1) {
    console.error('Could not find markers for module', mod.id);
    continue;
  }

  let modContent = remainingContent.substring(startIndex, endIndex);
  
  // Clean up comma at end if needed
  modContent = modContent.trim().replace(/,$/, '');

  const fileOutput = `// ${mod.name}_exercises.js\nexport const exercises${mod.id} = [\n${modContent}\n];\n`;
  
  fs.writeFileSync(`src/data/exercises/${mod.name}_exercises.js`, fileOutput);
  console.log(`Wrote ${mod.name}_exercises.js`);
  
  imports.push(`import { exercises${mod.id} } from './exercises/${mod.name}_exercises';`);
  arrayElements.push(`  ...exercises${mod.id},`);
}

const newEx = `// src/data/exercises.js — Aggregated Exercise Bank
${imports.join('\n')}

export const DEFAULT_EXERCISES = [
${arrayElements.join('\n')}
];
`;

fs.writeFileSync('src/data/exercises.js', newEx);
console.log('Updated exercises.js');
