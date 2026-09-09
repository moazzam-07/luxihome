const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
let missing = [];

function checkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== '.gemini' && file !== 'journal') {
        checkDir(fullPath);
      }
    } else if (file.endsWith('.html')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('data-target="menu-items"') && !content.includes('/journal/')) {
        missing.push(path.relative(rootDir, fullPath));
      }
    }
  }
}

checkDir(rootDir);
console.log('Total files missing /journal/:', missing.length);
console.log('Sample missing files:', missing.slice(0, 20));
