const http = require('http');

http.get('http://localhost:500/journal/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('HTTP Status:', res.statusCode);
    console.log('HTML Length:', data.length);
    console.log('Has SVG hamburger:', data.includes('aria-label="Toggle Navigation Menu"'));
    console.log('Has journal-card class:', data.includes('class="journal-card"'));
    console.log('Has journal-card-image-wrap:', data.includes('class="journal-card-image-wrap"'));
    console.log('Has #articles-grid CSS:', data.includes('grid-template-columns: repeat(3, minmax(0, 1fr))'));
    console.log('Has fixed top-right capsule:', data.includes('position: fixed !important; top: 20px !important; right: 20px !important; left: auto !important; z-index: 9999 !important;'));
    console.log('Has Journal link in drawer:', data.includes('href="/journal/" data-barba-prevent="self"'));
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
