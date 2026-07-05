const fs = require('fs');
const path = require('path');

const dirs = [
  'src/data/modules',
  'src/data/exercises',
];
const singles = [
  'src/data/curriculum.js',
  'src/data/exercises.js',
];

let totalFiles = 0;
let totalLines = 0;
let totalBytes = 0;

for (const dir of dirs) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));
  for (const file of files) {
    const fp = path.join(dir, file);
    const content = fs.readFileSync(fp, 'utf-8');
    const lines = content.split('\n').length;
    const bytes = fs.statSync(fp).size;
    console.log(`${fp}: ${lines} lines, ${bytes} bytes`);
    totalFiles++;
    totalLines += lines;
    totalBytes += bytes;
  }
}

for (const fp of singles) {
  const content = fs.readFileSync(fp, 'utf-8');
  const lines = content.split('\n').length;
  const bytes = fs.statSync(fp).size;
  console.log(`${fp}: ${lines} lines, ${bytes} bytes`);
  totalFiles++;
  totalLines += lines;
  totalBytes += bytes;
}

console.log('---');
console.log(`Total: ${totalFiles} files, ${totalLines} lines, ${totalBytes} bytes (${(totalBytes/1024).toFixed(1)} KB)`);
