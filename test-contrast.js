const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('@axe-core/puppeteer');

async function testColorContrast() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  const results = {
    lightMode: {},
    darkMode: {}
  };

  const urls = [
    'http://localhost:3003/',
    'http://localhost:3003/california'
  ];

  console.log('=== Testing Color Contrast ===\n');

  for (const url of urls) {
    console.log(`Testing: ${url}`);

    // Test Light Mode
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    });
    await new Promise(resolve => setTimeout(resolve, 500));

    const lightAxeResults = await new AxePuppeteer(page)
      .withRules(['color-contrast', 'color-contrast-enhanced'])
      .analyze();

    // Extract color contrast information
    const lightContrastInfo = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      const contrastData = [];

      for (const el of elements) {
        const styles = window.getComputedStyle(el);
        const text = el.textContent?.trim();

        if (text && text.length > 0 && el.children.length === 0) {
          const color = styles.color;
          const backgroundColor = styles.backgroundColor;

          if (color !== 'rgba(0, 0, 0, 0)' && backgroundColor !== 'rgba(0, 0, 0, 0)') {
            contrastData.push({
              text: text.substring(0, 50),
              color,
              backgroundColor,
              fontSize: styles.fontSize,
              fontWeight: styles.fontWeight
            });
          }
        }
      }

      return contrastData.slice(0, 10); // Sample first 10 text elements
    });

    results.lightMode[url] = {
      violations: lightAxeResults.violations,
      passes: lightAxeResults.passes.length,
      contrastSamples: lightContrastInfo
    };

    // Test Dark Mode
    await page.evaluate(() => {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    });
    await new Promise(resolve => setTimeout(resolve, 500));

    const darkAxeResults = await new AxePuppeteer(page)
      .withRules(['color-contrast', 'color-contrast-enhanced'])
      .analyze();

    const darkContrastInfo = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      const contrastData = [];

      for (const el of elements) {
        const styles = window.getComputedStyle(el);
        const text = el.textContent?.trim();

        if (text && text.length > 0 && el.children.length === 0) {
          const color = styles.color;
          const backgroundColor = styles.backgroundColor;

          if (color !== 'rgba(0, 0, 0, 0)' && backgroundColor !== 'rgba(0, 0, 0, 0)') {
            contrastData.push({
              text: text.substring(0, 50),
              color,
              backgroundColor,
              fontSize: styles.fontSize,
              fontWeight: styles.fontWeight
            });
          }
        }
      }

      return contrastData.slice(0, 10); // Sample first 10 text elements
    });

    results.darkMode[url] = {
      violations: darkAxeResults.violations,
      passes: darkAxeResults.passes.length,
      contrastSamples: darkContrastInfo
    };
  }

  await browser.close();

  // Print results
  console.log('\n=== Color Contrast Test Results ===\n');

  for (const url of urls) {
    console.log(`\nURL: ${url}`);

    console.log('\n  Light Mode:');
    console.log(`    ✅ Contrast checks passed: ${results.lightMode[url].passes}`);
    console.log(`    ❌ Contrast violations: ${results.lightMode[url].violations.length}`);

    if (results.lightMode[url].violations.length > 0) {
      console.log('    Violation details:');
      results.lightMode[url].violations.forEach(v => {
        console.log(`      - ${v.description}`);
        console.log(`        Impact: ${v.impact}`);
        console.log(`        Affected elements: ${v.nodes.length}`);
      });
    }

    console.log('\n  Dark Mode:');
    console.log(`    ✅ Contrast checks passed: ${results.darkMode[url].passes}`);
    console.log(`    ❌ Contrast violations: ${results.darkMode[url].violations.length}`);

    if (results.darkMode[url].violations.length > 0) {
      console.log('    Violation details:');
      results.darkMode[url].violations.forEach(v => {
        console.log(`      - ${v.description}`);
        console.log(`        Impact: ${v.impact}`);
        console.log(`        Affected elements: ${v.nodes.length}`);
      });
    }

    // Show sample contrasts
    console.log('\n  Sample Text Elements (Light Mode):');
    results.lightMode[url].contrastSamples.slice(0, 3).forEach(sample => {
      console.log(`    • "${sample.text.substring(0, 30)}..."`);
      console.log(`      Color: ${sample.color} | BG: ${sample.backgroundColor}`);
    });

    console.log('\n  Sample Text Elements (Dark Mode):');
    results.darkMode[url].contrastSamples.slice(0, 3).forEach(sample => {
      console.log(`    • "${sample.text.substring(0, 30)}..."`);
      console.log(`      Color: ${sample.color} | BG: ${sample.backgroundColor}`);
    });
  }

  return results;
}

testColorContrast().catch(console.error);