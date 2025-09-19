const { AxePuppeteer } = require('@axe-core/puppeteer');
const puppeteer = require('puppeteer');

async function testAccessibility() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  const results = {};
  const urls = [
    'http://localhost:3003/',
    'http://localhost:3003/california',
    'http://localhost:3003/california/los-angeles/los-angeles/plumber',
  ];

  for (const url of urls) {
    console.log(`Testing: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Wait for animations to complete
    await new Promise(resolve => setTimeout(resolve, 1000));

    const axeResults = await new AxePuppeteer(page)
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa'])
      .analyze();

    results[url] = {
      violations: axeResults.violations.length,
      passes: axeResults.passes.length,
      incomplete: axeResults.incomplete.length,
      details: axeResults.violations.map(v => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        help: v.help,
        helpUrl: v.helpUrl,
        nodes: v.nodes.length
      }))
    };
  }

  await browser.close();

  // Print summary
  console.log('\n=== Accessibility Test Results ===\n');
  for (const [url, data] of Object.entries(results)) {
    console.log(`URL: ${url}`);
    console.log(`  ✅ Passes: ${data.passes}`);
    console.log(`  ❌ Violations: ${data.violations}`);
    console.log(`  ⚠️  Incomplete: ${data.incomplete}`);

    if (data.violations > 0) {
      console.log('  Violation details:');
      data.details.forEach(v => {
        console.log(`    - [${v.impact}] ${v.id}: ${v.description} (${v.nodes} elements)`);
      });
    }
    console.log('');
  }

  return results;
}

testAccessibility().catch(console.error);