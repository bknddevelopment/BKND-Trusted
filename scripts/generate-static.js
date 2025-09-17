#!/usr/bin/env node

/**
 * Static Page Generation Script for BKND Trusted
 * Generates 50,000+ static pages efficiently
 */

const fs = require('fs').promises;
const path = require('path');
const { Worker } = require('worker_threads');
const os = require('os');

// Configuration
const CONFIG = {
  BATCH_SIZE: parseInt(process.env.BATCH_SIZE) || 1000,
  MAX_WORKERS: parseInt(process.env.MAX_WORKERS) || os.cpus().length,
  OUTPUT_DIR: process.env.OUTPUT_DIR || 'out',
  TOTAL_PAGES: parseInt(process.env.TOTAL_PAGES) || 50000,
  INCREMENTAL: process.env.INCREMENTAL === 'true',
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.bkndtrusted.com',
};

// Progress tracking
let progress = {
  completed: 0,
  failed: 0,
  startTime: Date.now(),
};

/**
 * Logger utility
 */
const logger = {
  info: (msg) => console.log(`[INFO] ${msg}`),
  error: (msg) => console.error(`[ERROR] ${msg}`),
  success: (msg) => console.log(`[SUCCESS] ${msg}`),
  progress: () => {
    const percentage = ((progress.completed / CONFIG.TOTAL_PAGES) * 100).toFixed(2);
    const elapsed = (Date.now() - progress.startTime) / 1000;
    const rate = progress.completed / elapsed;
    const eta = (CONFIG.TOTAL_PAGES - progress.completed) / rate;

    console.log(`[PROGRESS] ${percentage}% (${progress.completed}/${CONFIG.TOTAL_PAGES}) - Rate: ${rate.toFixed(0)} pages/sec - ETA: ${(eta / 60).toFixed(1)} min`);
  }
};

/**
 * Fetch data for pages
 */
async function fetchPageData(startIndex, endIndex) {
  try {
    // In production, this would fetch from your API or database
    // For demo, we'll generate mock data
    const pages = [];
    for (let i = startIndex; i < endIndex; i++) {
      pages.push({
        id: i,
        slug: `property-${i}`,
        title: `Property ${i}`,
        description: `Beautiful property listing ${i} in prime location`,
        price: Math.floor(Math.random() * 1000000) + 100000,
        bedrooms: Math.floor(Math.random() * 5) + 1,
        bathrooms: Math.floor(Math.random() * 3) + 1,
        squareFeet: Math.floor(Math.random() * 3000) + 1000,
        image: `https://source.unsplash.com/800x600/?house,property&sig=${i}`,
        location: {
          address: `${i} Main Street`,
          city: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'][i % 5],
          state: ['NY', 'CA', 'IL', 'TX', 'AZ'][i % 5],
          zip: `${10000 + (i % 90000)}`,
        },
        features: [
          'Garage',
          'Pool',
          'Garden',
          'Modern Kitchen',
          'Hardwood Floors',
        ].filter(() => Math.random() > 0.5),
        listed: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      });
    }
    return pages;
  } catch (error) {
    logger.error(`Failed to fetch data for pages ${startIndex}-${endIndex}: ${error.message}`);
    return [];
  }
}

/**
 * Generate HTML for a property page
 */
function generateHTML(property) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${property.description}">
    <meta property="og:title" content="${property.title} - BKND Trusted">
    <meta property="og:description" content="${property.description}">
    <meta property="og:image" content="${property.image}">
    <meta property="og:type" content="website">
    <title>${property.title} - BKND Trusted</title>
    <link rel="canonical" href="https://bkndtrusted.com/property/${property.slug}">
    <script type="application/ld+json">
    ${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      "name": property.title,
      "description": property.description,
      "image": property.image,
      "price": property.price,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": property.location.address,
        "addressLocality": property.location.city,
        "addressRegion": property.location.state,
        "postalCode": property.location.zip
      },
      "numberOfRooms": property.bedrooms,
      "numberOfBathroomsTotal": property.bathrooms,
      "floorSize": {
        "@type": "QuantitativeValue",
        "value": property.squareFeet,
        "unitCode": "FTK"
      }
    }, null, 2)}
    </script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        header { background: #2c3e50; color: white; padding: 20px 0; margin-bottom: 30px; }
        h1 { font-size: 2.5rem; margin-bottom: 10px; }
        .property-image { width: 100%; max-width: 800px; height: auto; border-radius: 8px; margin-bottom: 30px; }
        .details { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .detail-card { background: #f8f9fa; padding: 20px; border-radius: 8px; }
        .price { font-size: 2rem; color: #27ae60; font-weight: bold; }
        .features { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 20px; }
        .feature { background: #3498db; color: white; padding: 5px 15px; border-radius: 20px; font-size: 0.9rem; }
        .cta { background: #e74c3c; color: white; padding: 15px 30px; border: none; border-radius: 5px; font-size: 1.1rem; cursor: pointer; margin-top: 20px; }
        footer { background: #34495e; color: white; text-align: center; padding: 20px 0; margin-top: 50px; }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <h1>BKND Trusted</h1>
            <p>Your trusted real estate partner</p>
        </div>
    </header>

    <main class="container">
        <h1>${property.title}</h1>
        <p class="price">$${property.price.toLocaleString()}</p>

        <img src="${property.image}" alt="${property.title}" class="property-image" loading="lazy">

        <div class="details">
            <div class="detail-card">
                <h3>Location</h3>
                <p>${property.location.address}</p>
                <p>${property.location.city}, ${property.location.state} ${property.location.zip}</p>
            </div>

            <div class="detail-card">
                <h3>Property Details</h3>
                <p>Bedrooms: ${property.bedrooms}</p>
                <p>Bathrooms: ${property.bathrooms}</p>
                <p>Square Feet: ${property.squareFeet.toLocaleString()}</p>
            </div>

            <div class="detail-card">
                <h3>Listed</h3>
                <p>${new Date(property.listed).toLocaleDateString()}</p>
                <p>ID: ${property.id}</p>
            </div>
        </div>

        <div class="detail-card">
            <h3>Features</h3>
            <div class="features">
                ${property.features.map(f => `<span class="feature">${f}</span>`).join('')}
            </div>
        </div>

        <button class="cta" onclick="window.location.href='/contact?property=${property.id}'">
            Schedule Viewing
        </button>
    </main>

    <footer>
        <div class="container">
            <p>&copy; ${new Date().getFullYear()} BKND Trusted. All rights reserved.</p>
            <p>Generated: ${new Date().toISOString()}</p>
        </div>
    </footer>

    <script>
        // Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_view', {
                page_title: '${property.title}',
                page_path: '/property/${property.slug}',
                property_id: '${property.id}'
            });
        }
    </script>
</body>
</html>`;
}

/**
 * Check if page needs regeneration (for incremental builds)
 */
async function shouldRegenerate(filePath) {
  if (!CONFIG.INCREMENTAL) return true;

  try {
    const stats = await fs.stat(filePath);
    const daysSinceModified = (Date.now() - stats.mtime) / (1000 * 60 * 60 * 24);

    // Regenerate if older than 7 days
    return daysSinceModified > 7;
  } catch {
    // File doesn't exist, so generate it
    return true;
  }
}

/**
 * Process a batch of pages
 */
async function processBatch(startIndex, endIndex) {
  try {
    // Fetch data for batch
    const pages = await fetchPageData(startIndex, endIndex);

    // Generate and save each page
    for (const page of pages) {
      const dirPath = path.join(CONFIG.OUTPUT_DIR, 'property');
      const filePath = path.join(dirPath, `${page.slug}.html`);

      // Check if regeneration needed
      if (!(await shouldRegenerate(filePath))) {
        progress.completed++;
        continue;
      }

      // Create directory
      await fs.mkdir(dirPath, { recursive: true });

      // Generate HTML
      const html = generateHTML(page);

      // Save file
      await fs.writeFile(filePath, html);

      progress.completed++;

      // Log progress every 100 pages
      if (progress.completed % 100 === 0) {
        logger.progress();
      }
    }
  } catch (error) {
    logger.error(`Failed to process batch ${startIndex}-${endIndex}: ${error.message}`);
    progress.failed += endIndex - startIndex;
  }
}

/**
 * Create sitemap
 */
async function generateSitemap(totalPages) {
  logger.info('Generating sitemap...');

  const sitemapEntries = [];
  for (let i = 0; i < totalPages; i++) {
    sitemapEntries.push(`  <url>
    <loc>https://bkndtrusted.com/property/property-${i}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.join('\n')}
</urlset>`;

  await fs.writeFile(path.join(CONFIG.OUTPUT_DIR, 'sitemap-properties.xml'), sitemap);
  logger.success('Sitemap generated!');
}

/**
 * Generate index page with links to all properties
 */
async function generateIndexPage(totalPages) {
  logger.info('Generating index page...');

  const indexHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>All Properties - BKND Trusted</title>
    <style>
        body { font-family: sans-serif; padding: 20px; }
        h1 { color: #2c3e50; }
        .properties { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; }
        .property-link { padding: 10px; background: #f0f0f0; text-decoration: none; color: #333; border-radius: 5px; }
        .property-link:hover { background: #e0e0e0; }
    </style>
</head>
<body>
    <h1>All Properties (${totalPages} total)</h1>
    <div class="properties">
        ${Array.from({ length: Math.min(totalPages, 1000) }, (_, i) =>
          `<a href="/property/property-${i}" class="property-link">Property ${i}</a>`
        ).join('')}
    </div>
    <p>Showing first 1000 properties. Use search or filters to find more.</p>
</body>
</html>`;

  await fs.writeFile(path.join(CONFIG.OUTPUT_DIR, 'properties.html'), indexHTML);
  logger.success('Index page generated!');
}

/**
 * Main function
 */
async function main() {
  logger.info('Starting static page generation...');
  logger.info(`Configuration: ${JSON.stringify(CONFIG, null, 2)}`);

  // Create output directory
  await fs.mkdir(CONFIG.OUTPUT_DIR, { recursive: true });

  // Calculate batches
  const batches = [];
  for (let i = 0; i < CONFIG.TOTAL_PAGES; i += CONFIG.BATCH_SIZE) {
    batches.push({
      start: i,
      end: Math.min(i + CONFIG.BATCH_SIZE, CONFIG.TOTAL_PAGES)
    });
  }

  logger.info(`Processing ${batches.length} batches with ${CONFIG.MAX_WORKERS} workers...`);

  // Process batches in parallel with limited concurrency
  const batchPromises = [];
  for (const batch of batches) {
    // Limit concurrent batches
    if (batchPromises.length >= CONFIG.MAX_WORKERS) {
      await Promise.race(batchPromises);
      batchPromises.splice(batchPromises.findIndex(p => p), 1);
    }

    const promise = processBatch(batch.start, batch.end);
    batchPromises.push(promise);
  }

  // Wait for all batches to complete
  await Promise.all(batchPromises);

  // Generate sitemap and index
  await generateSitemap(CONFIG.TOTAL_PAGES);
  await generateIndexPage(CONFIG.TOTAL_PAGES);

  // Final report
  const elapsed = (Date.now() - progress.startTime) / 1000;
  logger.success(`
Generation complete!
- Total pages: ${progress.completed}
- Failed: ${progress.failed}
- Time: ${(elapsed / 60).toFixed(2)} minutes
- Rate: ${(progress.completed / elapsed).toFixed(0)} pages/second
- Output: ${CONFIG.OUTPUT_DIR}/
  `);

  // Exit with error if any failed
  if (progress.failed > 0) {
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    logger.error(`Fatal error: ${error.message}`);
    process.exit(1);
  });
}

module.exports = { generateHTML, fetchPageData, processBatch };