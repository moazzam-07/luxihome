const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

// 1. Setup Redirects for obsolete pages
function setupRedirect(folderName, targetPath, title) {
    const dir = path.join(ROOT_DIR, folderName);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const content = `<!DOCTYPE html>
<html lang="en-GB">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0; url=${targetPath}">
    <link rel="canonical" href="https://luxihome-tab-web.vercel.app${targetPath}" />
    <title>Redirecting to ${title} | LUXiHOME</title>
    <script>window.location.replace('${targetPath}');</script>
</head>
<body style="background:#13212E; color:#FFFFFF; font-family:'DIN',sans-serif; text-align:center; padding-top:25vh;">
    <p style="font-size:16px; letter-spacing:0.5px;">Redirecting to <a href="${targetPath}" style="color:#C2A26A; text-decoration:underline;">${title}</a>...</p>
</body>
</html>
`;
    fs.writeFileSync(path.join(dir, 'index.html'), content, 'utf-8');
    console.log(`✓ Created clean redirect in ${folderName}/index.html -> ${targetPath}`);
}

setupRedirect('payment-terms', '/terms-conditions/', 'Terms & Conditions');
setupRedirect('cookies-policy', '/privacy-policy/', 'Privacy Policy');
setupRedirect('credits', '/about/', 'About LUXiHOME');

// 2. Scan and update all other HTML files
const IGNORE_DIRS = new Set(['.git', 'node_modules', 'wp-content/plugins', 'wp-content/uploads', 'payment-terms', 'cookies-policy', 'credits', 'terms-conditions', 'privacy-policy']);

function findHtmlFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir, { withFileTypes: true });
    for (const dirent of list) {
        if (dirent.isDirectory()) {
            if (IGNORE_DIRS.has(dirent.name)) continue;
            const fullPath = path.join(dir, dirent.name);
            results = results.concat(findHtmlFiles(fullPath));
        } else if (dirent.isFile() && dirent.name.endsWith('.html')) {
            results.push(path.join(dir, dirent.name));
        }
    }
    return results;
}

const htmlFiles = findHtmlFiles(ROOT_DIR);
console.log(`Found ${htmlFiles.length} HTML files to inspect.`);

// Replacement target for standard footers
const replacement2Links = `<div class="flex flex-col sm:flex-row items-center gap-12 sm:gap-20 text-13 tracking-0.4">
                        <a href="/terms-conditions/" target="_self" class="hover:text-white transition-colors">Terms &amp; Conditions</a>
                        <span class="text-white/20 hidden sm:inline">•</span>
                        <a href="/privacy-policy/" target="_self" class="hover:text-white transition-colors">Privacy Policy</a>
                    </div>`;

// Regex pattern to match the 5-link container across formatting styles
// Matches <div class="flex flex-col lg:flex-row items-center gap-5 lg:gap-20">...terms...credits...</div>
const footer5LinksRegex = /<div class="flex flex-col lg:flex-row items-center gap-5 lg:gap-20">[\s\S]*?(?:Terms\s*(?:&amp;|&)\s*Conditions)[\s\S]*?(?:Credits)<\/a>\s*<\/div>/i;

let updatedCount = 0;
for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf-8');
    if (footer5LinksRegex.test(content)) {
        content = content.replace(footer5LinksRegex, replacement2Links);
        fs.writeFileSync(file, content, 'utf-8');
        updatedCount++;
        console.log(`Updated footer in: ${path.relative(ROOT_DIR, file)}`);
    }
}

console.log(`\nUpdated footers in ${updatedCount} HTML files.`);

// 3. Ensure bit-for-bit parity on Alam's Pentagon files
const p1 = path.join(ROOT_DIR, 'alams-pentagon', 'index.html');
const p2 = path.join(ROOT_DIR, 'bespoke-villa', 'alams-pentagon', 'index.html');
const p3 = path.join(ROOT_DIR, 'projects', 'alams-pentagon', 'index.html');

if (fs.existsSync(p1)) {
    const p1Content = fs.readFileSync(p1, 'utf-8');
    fs.writeFileSync(p2, p1Content, 'utf-8');
    fs.writeFileSync(p3, p1Content, 'utf-8');
    console.log('✓ Bit-for-bit parity maintained across all 3 alams-pentagon index.html files.');
}
