#!/usr/bin/env node

/**
 * Post-Build Optimization Script
 * Performs additional optimizations after Next.js build
 */

const fs = require('fs').promises;
const path = require('path');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const zlib = require('zlib');
const crypto = require('crypto');

const brotliCompress = promisify(zlib.brotliCompress);
const gzip = promisify(zlib.gzip);

class PostBuildOptimizer {
  constructor() {
    this.buildDir = path.join(process.cwd(), '.next');
    this.publicDir = path.join(process.cwd(), 'public');
    this.stats = {
      filesOptimized: 0,
      totalSizeBefore: 0,
      totalSizeAfter: 0,
      brotliFiles: 0,
      gzipFiles: 0,
      criticalCssExtracted: false,
    };
  }

  // Compress static files with Brotli and Gzip
  async compressFile(filePath) {
    try {
      const content = await fs.readFile(filePath);
      const originalSize = content.length;
      this.stats.totalSizeBefore += originalSize;

      // Skip if already compressed or too small
      if (originalSize < 1400) return;

      // Brotli compression
      const brotliContent = await brotliCompress(content, {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
        },
      });

      if (brotliContent.length < originalSize * 0.9) {
        await fs.writeFile(`${filePath}.br`, brotliContent);
        this.stats.brotliFiles++;
        console.log(`✅ Brotli: ${path.basename(filePath)} (${this.formatSize(originalSize)} → ${this.formatSize(brotliContent.length)})`);
      }

      // Gzip compression
      const gzipContent = await gzip(content, { level: 9 });
      if (gzipContent.length < originalSize * 0.9) {
        await fs.writeFile(`${filePath}.gz`, gzipContent);
        this.stats.gzipFiles++;
      }

      this.stats.filesOptimized++;
      this.stats.totalSizeAfter += Math.min(brotliContent.length, gzipContent.length);
    } catch (error) {
      console.error(`Error compressing ${filePath}:`, error.message);
    }
  }

  // Find and compress all eligible files
  async compressStaticAssets() {
    console.log('\n🗜️  Compressing static assets...');

    const extensions = ['.js', '.css', '.html', '.json', '.svg', '.xml'];
    const directories = [
      path.join(this.buildDir, 'static'),
      this.publicDir,
    ];

    for (const dir of directories) {
      try {
        await this.processDirectory(dir, extensions);
      } catch (error) {
        console.log(`Skipping ${dir}: ${error.message}`);
      }
    }
  }

  // Process directory recursively
  async processDirectory(dir, extensions) {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await this.processDirectory(fullPath, extensions);
      } else if (extensions.some(ext => entry.name.endsWith(ext))) {
        await this.compressFile(fullPath);
      }
    }
  }

  // Extract and inline critical CSS
  async extractCriticalCSS() {
    console.log('\n🎨 Extracting critical CSS...');

    try {
      // Check if critters is available
      const { exec: crittersExec } = await import('critters');

      // Process HTML files
      const htmlDir = path.join(this.buildDir, 'server', 'pages');
      const htmlFiles = await this.findFiles(htmlDir, '.html');

      for (const htmlFile of htmlFiles) {
        try {
          const html = await fs.readFile(htmlFile, 'utf8');

          // Extract critical CSS using critters
          const optimized = await crittersExec(html, {
            path: this.buildDir,
            publicPath: '/_next/',
            external: true,
            inlineThreshold: 10000,
            minimumExternalSize: 10000,
            pruneSource: true,
          });

          await fs.writeFile(htmlFile, optimized);
          this.stats.criticalCssExtracted = true;
          console.log(`✅ Critical CSS extracted: ${path.basename(htmlFile)}`);
        } catch (error) {
          console.log(`Skipping critical CSS for ${htmlFile}: ${error.message}`);
        }
      }
    } catch (error) {
      console.log('Critical CSS extraction not available');
    }
  }

  // Find files with specific extension
  async findFiles(dir, extension) {
    const files = [];

    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
          const subFiles = await this.findFiles(fullPath, extension);
          files.push(...subFiles);
        } else if (entry.name.endsWith(extension)) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      // Directory doesn't exist or not accessible
    }

    return files;
  }

  // Generate resource hints
  async generateResourceHints() {
    console.log('\n🔗 Generating resource hints...');

    const hints = {
      preconnect: [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://cdn.bkndtrusted.com',
        'https://vitals.vercel-insights.com',
      ],
      dnsPrefetch: [
        'https://api.bkndtrusted.com',
        'https://analytics.google.com',
      ],
      preload: [
        { href: '/fonts/inter-var.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
      ],
    };

    const hintsPath = path.join(this.publicDir, 'resource-hints.json');
    await fs.writeFile(hintsPath, JSON.stringify(hints, null, 2));
    console.log('✅ Resource hints generated');
  }

  // Generate service worker for offline support
  async generateServiceWorker() {
    console.log('\n⚡ Generating optimized service worker...');

    const swContent = `
// Service Worker for BKND Trusted
const CACHE_VERSION = 'v${Date.now()}';
const CACHE_NAME = \`bknd-cache-\${CACHE_VERSION}\`;
const RUNTIME_CACHE = 'bknd-runtime';

// Assets to cache immediately
const PRECACHE_ASSETS = [
  '/',
  '/offline',
  '/manifest.json',
  '/favicon.ico',
];

// Install event - cache essential assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith('bknd-cache-') && name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - network first, fall back to cache
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip cross-origin requests
  if (url.origin !== location.origin) return;

  // API calls - network first
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clonedResponse = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, clonedResponse);
          });
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Static assets - cache first
  if (url.pathname.match(/\\.(js|css|png|jpg|jpeg|svg|gif|webp|avif|woff|woff2)$/)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;

        return fetch(request).then((response) => {
          const clonedResponse = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, clonedResponse);
          });
          return response;
        });
      })
    );
    return;
  }

  // HTML pages - network first
  event.respondWith(
    fetch(request)
      .then((response) => {
        const clonedResponse = response.clone();
        caches.open(RUNTIME_CACHE).then((cache) => {
          cache.put(request, clonedResponse);
        });
        return response;
      })
      .catch(() => {
        return caches.match(request).then((cached) => {
          return cached || caches.match('/offline');
        });
      })
  );
});
`;

    const swPath = path.join(this.publicDir, 'sw.js');
    await fs.writeFile(swPath, swContent);
    console.log('✅ Service worker generated');
  }

  // Format file size
  formatSize(bytes) {
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  }

  // Print optimization summary
  printSummary() {
    console.log('\n📊 Optimization Summary');
    console.log('========================');
    console.log(`Files optimized: ${this.stats.filesOptimized}`);
    console.log(`Brotli files created: ${this.stats.brotliFiles}`);
    console.log(`Gzip files created: ${this.stats.gzipFiles}`);
    console.log(`Critical CSS extracted: ${this.stats.criticalCssExtracted ? 'Yes' : 'No'}`);

    if (this.stats.totalSizeBefore > 0) {
      const reduction = ((1 - this.stats.totalSizeAfter / this.stats.totalSizeBefore) * 100).toFixed(1);
      console.log(`\nSize reduction: ${reduction}%`);
      console.log(`Before: ${this.formatSize(this.stats.totalSizeBefore)}`);
      console.log(`After: ${this.formatSize(this.stats.totalSizeAfter)}`);
    }
  }

  // Run all optimizations
  async run() {
    console.log('🚀 Starting post-build optimizations...\n');

    try {
      await this.compressStaticAssets();
      await this.extractCriticalCSS();
      await this.generateResourceHints();
      await this.generateServiceWorker();

      this.printSummary();
      console.log('\n✨ Post-build optimizations complete!');
    } catch (error) {
      console.error('Error during optimization:', error);
      process.exit(1);
    }
  }
}

// Run the optimizer
const optimizer = new PostBuildOptimizer();
optimizer.run();