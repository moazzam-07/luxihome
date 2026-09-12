const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

const singleCaseStudyMenuItem = `
<li class="font-sans font-light text-28 lg:text-28 xl:text-36 leading-[0.85] lg:leading-none tracking-1.14 lg:tracking-1.04 uppercase whitespace-normal lg:whitespace-nowrap" data-state="closed">
<a class="transition-opacity duration-200 xl:group-hover/menu-items:opacity-20 hover:!opacity-100" data-barba-prevent="self" href="/case-studies/">Case Studies</a>
<div data-target="sub-menu"></div>
</li>`;

const TARGET_FILES = [
  'index.html',
  'about/index.html',
  'contact/index.html',
  'journal/index.html',
  'alams-pentagon/index.html',
  'projects/park-street/index.html',
  'projects/salt-lake/index.html',
  'projects/newtown/index.html',
  'projects/rajarhat/index.html'
];

function updateFile(relPath) {
  const filePath = path.join(ROOT_DIR, relPath);
  if (!fs.existsSync(filePath)) return;
  let html = fs.readFileSync(filePath, 'utf-8');

  // 1. Remove bulky case study list if present
  const bulkyPattern = /<li[^>]*>\s*<a[^>]*href=[\x22\x27]\/case-studies\/[\x22\x27][^>]*>[\s\S]*?luxi-case-studies-list[\s\S]*?<\/li>\s*<\/ul>\s*<\/div>\s*<\/div>\s*<\/li>\s*/i;
  if (bulkyPattern.test(html)) {
    html = html.replace(bulkyPattern, '');
    console.log(`- Removed bulky case study list from ${relPath}`);
  }

  // 2. Add single Case Studies link right before Journal if not already present
  if (!html.includes('href="/case-studies/" data-barba-prevent="self">Case Studies</a>') && 
      !html.includes('data-barba-prevent="self" href="/case-studies/">Case Studies</a>')) {
    
    // Look for Journal <li>
    const journalPattern = /(<li[^>]*data-state="closed"[^>]*>\s*<a[^>]*href="\/journal\/"[^>]*>Journal<\/a>\s*<div data-target="sub-menu"><\/div>\s*<\/li>)/i;
    if (journalPattern.test(html)) {
      html = html.replace(journalPattern, `${singleCaseStudyMenuItem}\n$1`);
      console.log(`✓ Added single Case Studies menu item before Journal in ${relPath}`);
    } else {
      console.log(`! Journal pattern not matched in ${relPath}`);
    }
  } else {
    console.log(`- ${relPath} already has single Case Studies menu item.`);
  }

  // 3. Ensure footer has Case Studies link
  if (html.includes('<a href="/#projects">Projects</a>') && !html.includes('<a href="/case-studies/">Case Studies</a>')) {
    html = html.replace(
      '<a href="/#projects">Projects</a>',
      '<a href="/#projects">Projects</a>\n<a href="/case-studies/">Case Studies</a>'
    );
  }

  fs.writeFileSync(filePath, html, 'utf-8');
}

TARGET_FILES.forEach(updateFile);

// Enforce 3-file parity for Alam's Pentagon
const pentagonMaster = fs.readFileSync(path.join(ROOT_DIR, 'alams-pentagon/index.html'), 'utf-8');
fs.writeFileSync(path.join(ROOT_DIR, 'bespoke-villa/alams-pentagon/index.html'), pentagonMaster, 'utf-8');
fs.writeFileSync(path.join(ROOT_DIR, 'projects/alams-pentagon/index.html'), pentagonMaster, 'utf-8');
console.log('✓ Alam Pentagon 3-file parity synchronized perfectly.');
