const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

const caseStudiesMenuSnippet = `
<li class="group/li font-sans font-light text-28 sm:text-38 lg:text-40 xl:text-50 leading-[0.85] lg:leading-none tracking-1.14 lg:tracking-1.5 uppercase whitespace-normal lg:whitespace-nowrap">
<a class="no-barba block transition-opacity duration-200 xl:group-hover/menu-items:opacity-20 hover:!opacity-100" href="/case-studies/">
<span>Case Studies</span>
</a>
<div class="h-auto opacity-100 visible">
<div class="pt-20 pb-12 sm:pt-25 sm:pb-15">
<ul class="luxi-case-studies-list flex flex-col pl-20 border-l border-white/20" style="display: flex !important; flex-direction: column !important; gap: 26px !important; row-gap: 26px !important; padding-left: 20px !important; border-left: 1px solid rgba(255,255,255,0.2) !important; margin-top: 14px !important; margin-bottom: 6px !important;">
<li class="font-normal text-16 sm:text-17 leading-none tracking-0.42" style="margin: 0 !important; padding: 0 !important;">
<a class="relative block py-2 text-white/90 hover:text-[#C2A26A] transition-colors" href="/case-studies/ballygunge/" style="display: inline-block; line-height: 1.35;">Ballygunge Duplex</a>
</li>
<li class="font-normal text-16 sm:text-17 leading-none tracking-0.42" style="margin: 0 !important; padding: 0 !important;">
<a class="relative block py-2 text-white/90 hover:text-[#C2A26A] transition-colors" href="/case-studies/new-town/" style="display: inline-block; line-height: 1.35;">New Town Penthouse</a>
</li>
<li class="font-normal text-16 sm:text-17 leading-none tracking-0.42" style="margin: 0 !important; padding: 0 !important;">
<a class="relative block py-2 text-white/90 hover:text-[#C2A26A] transition-colors" href="/case-studies/alipore/" style="display: inline-block; line-height: 1.35;">Alipore Heritage Villa</a>
</li>
<li class="font-normal text-16 sm:text-17 leading-none tracking-0.42" style="margin: 0 !important; padding: 0 !important;">
<a class="relative block py-2 text-white/90 hover:text-[#C2A26A] transition-colors" href="/case-studies/salt-lake/" style="display: inline-block; line-height: 1.35;">Salt Lake Modernist Manor</a>
</li>
<li class="font-normal text-16 sm:text-17 leading-none tracking-0.42" style="margin: 0 !important; padding: 0 !important;">
<a class="relative block py-2 text-white/90 hover:text-[#C2A26A] transition-colors" href="/case-studies/topsia/" style="display: inline-block; line-height: 1.35;">Topsia Sky Villa</a>
</li>
<li class="font-normal text-16 sm:text-17 leading-none tracking-0.42" style="margin: 0 !important; padding: 0 !important;">
<a class="relative block py-2 text-white/90 hover:text-[#C2A26A] transition-colors" href="/case-studies/rajarhat/" style="display: inline-block; line-height: 1.35;">Rajarhat Villa Sanctuary</a>
</li>
<li class="font-normal text-16 sm:text-17 leading-none tracking-0.42" style="margin: 0 !important; padding: 0 !important;">
<a class="relative block py-2 text-white/90 hover:text-[#C2A26A] transition-colors" href="/case-studies/dum-dum/" style="display: inline-block; line-height: 1.35;">Dum Dum Private Estate</a>
</li>
</ul>
</div>
</div>
</li>`;

const TARGET_FILES = [
  'index.html',
  'about/index.html',
  'contact/index.html',
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

  // Skip if already has case-studies in menu
  if (html.includes('luxi-case-studies-list') || html.includes('href="/case-studies/"')) {
    console.log(`- ${relPath} already has Case Studies in menu.`);
    return;
  }

  // Look for end of Projects </li> and divider
  const targetPattern = /<\/ul>\s*<\/div>\s*<\/div>\s*<\/li>\s*(<div[^>]*data-target="menu-divider"[^>]*><\/div>)/i;
  
  if (targetPattern.test(html)) {
    html = html.replace(targetPattern, (match, divider) => {
      return `</ul>\n</div>\n</div>\n</li>\n${caseStudiesMenuSnippet}\n${divider}`;
    });

    // Also add to footer if not present
    if (html.includes('<a href="/#projects">Projects</a>') && !html.includes('<a href="/case-studies/">Case Studies</a>')) {
      html = html.replace(
        '<a href="/#projects">Projects</a>',
        '<a href="/#projects">Projects</a>\n<a href="/case-studies/">Case Studies</a>'
      );
    }

    fs.writeFileSync(filePath, html, 'utf-8');
    console.log(`✓ Updated menu in ${relPath}`);
  } else {
    console.log(`! Pattern not found in ${relPath}`);
  }
}

TARGET_FILES.forEach(updateFile);

// Enforce 3-file parity for Alam's Pentagon
const pentagonMaster = fs.readFileSync(path.join(ROOT_DIR, 'alams-pentagon/index.html'), 'utf-8');
fs.writeFileSync(path.join(ROOT_DIR, 'bespoke-villa/alams-pentagon/index.html'), pentagonMaster, 'utf-8');
fs.writeFileSync(path.join(ROOT_DIR, 'projects/alams-pentagon/index.html'), pentagonMaster, 'utf-8');
console.log('✓ Alam Pentagon 3-file parity synchronized perfectly.');
