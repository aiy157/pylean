import fs from 'fs';
import path from 'path';

// We'll parse the file using simple string matching since it has clear comments for each module
const curriculumPath = 'src/data/curriculum.js';
const content = fs.readFileSync(curriculumPath, 'utf-8');

// The modules are separated by comments like: // MODULE 1: FLOWCHART, // MODULE 2: VARIABLES & DATA TYPES
const modulesList = [
  { id: 1, name: 'module1_flowchart' },
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
  const startMarker = `  // ─────────────────────────────────────────────────────────────────────────\n  // MODULE ${mod.id}`;
  const nextMod = modulesList[i+1];
  let endMarker = 'export const getModuleById';
  if (nextMod) {
     endMarker = `  // ─────────────────────────────────────────────────────────────────────────\n  // MODULE ${nextMod.id}`;
  }

  const startIndex = remainingContent.indexOf(startMarker);
  let endIndex = remainingContent.indexOf(endMarker);
  
  if (startIndex === -1 || endIndex === -1) {
    console.error('Could not find markers for module', mod.id);
    // fallback if formatting differs
    continue;
  }

  let modContent = remainingContent.substring(startIndex, endIndex);
  
  // Cleanup the string, removing trailing commas if it's the last element, but wait, the last one before export might have a trailing comma and closing bracket.
  if (i === modulesList.length - 1) {
    // Find the last closing bracket before export const
    const bracketIndex = modContent.lastIndexOf('];');
    if (bracketIndex !== -1) {
        modContent = modContent.substring(0, bracketIndex);
    }
  }

  // Ensure it's a valid export
  const fileOutput = `// ${mod.name}.js\nexport const module${mod.id} = ${modContent.trim().replace(/,$/, '')};\n`;
  
  fs.writeFileSync(`src/data/modules/${mod.name}.js`, fileOutput);
  console.log(`Wrote ${mod.name}.js`);
  
  imports.push(`import { module${mod.id} } from './modules/${mod.name}';`);
  arrayElements.push(`  module${mod.id},`);
}

const newCurriculum = `// src/data/curriculum.js — Complete curriculum (EXPANDED)
${imports.join('\n')}

export const MODULES = [
${arrayElements.join('\n')}
];

export const getModuleById = (id) => MODULES.find(m => m.id === id);
export const getLessonById = (moduleId, lessonId) => {
  const mod = getModuleById(moduleId);
  if (!mod) return null;
  return mod.lessons.find(l => l.id === lessonId);
};
`;

fs.writeFileSync('src/data/curriculum.js', newCurriculum);
console.log('Updated curriculum.js');
