const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const journalLi = `
<li class="font-sans font-light text-28 lg:text-28 xl:text-36 leading-[0.85] lg:leading-none tracking-1.14 lg:tracking-1.04 uppercase whitespace-normal lg:whitespace-nowrap" data-state="closed">
<a class="transition-opacity duration-200 xl:group-hover/menu-items:opacity-20 hover:!opacity-100" href="/journal/">Journal</a>
<div data-target="sub-menu"></div>
</li>`;

let updatedCount = 0;

function processFile(filePath) {
  if (!filePath.endsWith('.html')) return;
  if (filePath.includes('node_modules') || filePath.includes('.git') || filePath.includes('brain')) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Must have menu-items container
  if (!content.includes('data-target="menu-items"')) return;

  // If already contains a link to /journal/, skip
  if (content.includes('href="/journal/"') || content.includes("href='/journal/'")) {
    return;
  }

  // Find the About item (either /about/, /about-amali/, or containing About text)
  const aboutRegex = /(<li[^>]*>\s*<a[^>]*href="[^"]*about[^"]*"[^>]*>[\s\S]*?<\/li>)/i;
  const locationsRegex = /(<li[^>]*>\s*<a[^>]*href="[^"]*locations[^"]*"[^>]*>[\s\S]*?<\/li>)/i;
  const contactRegex = /(<li[^>]*>\s*<a[^>]*href="[^"]*contact[^"]*"[^>]*>[\s\S]*?<\/li>)/i;

  if (aboutRegex.test(content)) {
    content = content.replace(aboutRegex, `$1${journalLi}`);
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
    console.log(`[ABOUT MATCH] Added Journal to: ${path.relative(rootDir, filePath)}`);
  } else if (locationsRegex.test(content)) {
    // Insert before Locations
    content = content.replace(locationsRegex, `${journalLi}\n$1`);
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
    console.log(`[BEFORE LOCATIONS] Added Journal to: ${path.relative(rootDir, filePath)}`);
  } else if (contactRegex.test(content)) {
    // Insert before Contact
    content = content.replace(contactRegex, `${journalLi}\n$1`);
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
    console.log(`[BEFORE CONTACT] Added Journal to: ${path.relative(rootDir, filePath)}`);
  } else {
    console.warn(`[NO ANCHOR FOUND] Could not find anchor in: ${path.relative(rootDir, filePath)}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== '.gemini' && file !== 'journal') {
        walkDir(fullPath);
      }
    } else {
      processFile(fullPath);
    }
  }
}

walkDir(rootDir);
console.log(`Finished updating menus. Updated ${updatedCount} files.`);
