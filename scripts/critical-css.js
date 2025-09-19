#!/usr/bin/env node
/**
 * Critical CSS Generation Script
 * Extracts and inlines critical CSS for faster initial render
 */

const fs = require('fs');
const path = require('path');

// Critical CSS that should be inlined in <head>
const CRITICAL_CSS = `
  /* Critical reset and base styles */
  *, *::before, *::after { box-sizing: border-box; }
  * { margin: 0; }
  html, body { height: 100%; }
  body { line-height: 1.5; -webkit-font-smoothing: antialiased; }
  img, picture, video, canvas, svg { display: block; max-width: 100%; }
  input, button, textarea, select { font: inherit; }
  p, h1, h2, h3, h4, h5, h6 { overflow-wrap: break-word; }

  /* Critical brand colors */
  :root {
    --trust-deep: #0F172A;
    --trust-action: #1E40AF;
    --trust-verified: #10B981;
    --trust-gold: #F59E0B;
    --surface-base: #ffffff;
    --text-primary: #0F172A;
    --text-secondary: #374151;
  }

  /* Critical typography */
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: var(--text-primary);
  }

  /* Critical layout containers */
  .container { width: 100%; margin: 0 auto; padding: 0 1rem; }
  @media (min-width: 640px) { .container { max-width: 640px; } }
  @media (min-width: 768px) { .container { max-width: 768px; } }
  @media (min-width: 1024px) { .container { max-width: 1024px; } }
  @media (min-width: 1280px) { .container { max-width: 1280px; } }

  /* Critical utilities */
  .hidden { display: none; }
  .flex { display: flex; }
  .grid { display: grid; }
  .relative { position: relative; }
  .absolute { position: absolute; }
  .fixed { position: fixed; }

  /* Above-fold skeleton loading */
  .skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
  }
  @keyframes skeleton-loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* Font loading optimization */
  .font-loading body { opacity: 0; }
  .font-loaded body { opacity: 1; transition: opacity 0.3s ease-in; }

  /* Critical performance optimizations */
  * {
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }
  img { content-visibility: auto; }
  .gpu-accelerated { transform: translateZ(0); }
`;

// Generate critical CSS file
function generateCriticalCSS() {
  const outputPath = path.join(__dirname, '../public/critical.css');

  // Minify the CSS
  const minifiedCSS = CRITICAL_CSS
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
    .replace(/\s+/g, ' ') // Collapse whitespace
    .replace(/:\s+/g, ':') // Remove space after colons
    .replace(/;\s+/g, ';') // Remove space after semicolons
    .replace(/\s*{\s*/g, '{') // Remove space around braces
    .replace(/\s*}\s*/g, '}') // Remove space around braces
    .replace(/;\}/g, '}') // Remove last semicolon
    .trim();

  fs.writeFileSync(outputPath, minifiedCSS);
  console.log('✅ Critical CSS generated:', outputPath);
  console.log('📦 Size:', (minifiedCSS.length / 1024).toFixed(2), 'KB');
}

// Generate inline script for font loading
function generateFontLoadScript() {
  const script = `
    (function() {
      // Font loading optimization
      document.documentElement.className += ' font-loading';

      if ('fonts' in document) {
        document.fonts.ready.then(function() {
          document.documentElement.classList.remove('font-loading');
          document.documentElement.classList.add('font-loaded');
        });
      } else {
        setTimeout(function() {
          document.documentElement.classList.remove('font-loading');
          document.documentElement.classList.add('font-loaded');
        }, 1000);
      }

      // Preload critical resources
      var preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.as = 'font';
      preloadLink.href = '/fonts/inter-var.woff2';
      preloadLink.type = 'font/woff2';
      preloadLink.crossOrigin = 'anonymous';
      document.head.appendChild(preloadLink);

      // DNS prefetch for external resources
      var dnsPrefetch = document.createElement('link');
      dnsPrefetch.rel = 'dns-prefetch';
      dnsPrefetch.href = 'https://images.unsplash.com';
      document.head.appendChild(dnsPrefetch);
    })();
  `.trim();

  const outputPath = path.join(__dirname, '../public/font-load.js');
  const minifiedScript = script.replace(/\s+/g, ' ').replace(/\s*([{}();,:])\s*/g, '$1');

  fs.writeFileSync(outputPath, minifiedScript);
  console.log('✅ Font loading script generated:', outputPath);
}

// Generate resource hints
function generateResourceHints() {
  const hints = {
    preconnect: [
      'https://fonts.googleapis.com',
      'https://images.unsplash.com'
    ],
    prefetch: [
      '/fonts/inter-var.woff2'
    ],
    preload: [
      { href: '/fonts/inter-var.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' }
    ]
  };

  const outputPath = path.join(__dirname, '../public/resource-hints.json');
  fs.writeFileSync(outputPath, JSON.stringify(hints, null, 2));
  console.log('✅ Resource hints generated:', outputPath);
}

// Run all generators
console.log('🚀 Generating performance optimization files...\n');
generateCriticalCSS();
generateFontLoadScript();
generateResourceHints();
console.log('\n✨ Performance optimization files generated successfully!');