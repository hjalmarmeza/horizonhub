const fs = require('fs');
const path = require('path');

// 1. Optimize projects.js to avoid loading all images at once
const projectsPath = path.join(__dirname, '../src/data/projects.js');
let projectsContent = fs.readFileSync(projectsPath, 'utf8');

// Strategy: Change 'image' key to 'thumb' to force a fresh look, 
// and we will implement a virtual scroller/limiter in the UI later if needed.
// But the real killer is the HERO background.

// 2. Remove the heavy hero background from the CSS and use a lightweight gradient
const cssPath = path.join(__dirname, '../src/index.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

// Replace the heavy background image with a performance-optimized CSS gradient
cssContent = cssContent.replace(
  /background: url\('\/hero-bg\.png'\) no-repeat center center;/g,
  'background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);'
);

// Add better image-rendering for mobile
cssContent += `
img {
  image-rendering: -webkit-optimize-contrast;
  transform: translateZ(0); /* Force GPU */
}
`;

fs.writeFileSync(cssPath, cssContent);

console.log('✅ Performance audit: Hero background replaced with CSS gradient.');
