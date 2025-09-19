const puppeteer = require('puppeteer');

async function testResponsiveBreakpoints() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  const breakpoints = [
    { name: 'Mobile S', width: 320, height: 568 },
    { name: 'Mobile M', width: 375, height: 667 },
    { name: 'Mobile L', width: 425, height: 812 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Laptop', width: 1024, height: 768 },
    { name: 'Laptop L', width: 1440, height: 900 },
    { name: 'Desktop', width: 1920, height: 1080 },
    { name: '4K', width: 2560, height: 1440 },
  ];

  const urls = [
    'http://localhost:3003/',
    'http://localhost:3003/california',
    'http://localhost:3003/california/los-angeles/los-angeles/plumber',
  ];

  const results = {};

  console.log('=== Testing Responsive Breakpoints ===\n');

  for (const url of urls) {
    results[url] = {};
    console.log(`Testing: ${url}`);

    for (const breakpoint of breakpoints) {
      await page.setViewport({
        width: breakpoint.width,
        height: breakpoint.height,
        deviceScaleFactor: 1,
      });

      await page.goto(url, { waitUntil: 'networkidle2' });
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check for visual issues
      const visualCheck = await page.evaluate(() => {
        const issues = [];

        // Check for horizontal scrolling
        if (document.body.scrollWidth > window.innerWidth) {
          issues.push('Horizontal scrollbar detected');
        }

        // Check for overlapping elements
        const elements = document.querySelectorAll('*');
        const overlappingElements = [];

        for (let i = 0; i < Math.min(elements.length, 100); i++) {
          const rect1 = elements[i].getBoundingClientRect();
          for (let j = i + 1; j < Math.min(elements.length, 100); j++) {
            const rect2 = elements[j].getBoundingClientRect();

            // Check if elements overlap (and are not parent/child)
            if (!elements[i].contains(elements[j]) && !elements[j].contains(elements[i])) {
              const overlap = !(rect1.right < rect2.left ||
                               rect1.left > rect2.right ||
                               rect1.bottom < rect2.top ||
                               rect1.top > rect2.bottom);

              if (overlap && rect1.width > 0 && rect1.height > 0 && rect2.width > 0 && rect2.height > 0) {
                overlappingElements.push({
                  elem1: elements[i].tagName,
                  elem2: elements[j].tagName
                });
                if (overlappingElements.length >= 3) break;
              }
            }
          }
          if (overlappingElements.length >= 3) break;
        }

        if (overlappingElements.length > 0) {
          issues.push(`${overlappingElements.length} overlapping elements detected`);
        }

        // Check for text overflow
        const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, button');
        let overflowCount = 0;

        for (const el of textElements) {
          if (el.scrollWidth > el.clientWidth) {
            overflowCount++;
          }
        }

        if (overflowCount > 0) {
          issues.push(`${overflowCount} text elements with overflow`);
        }

        // Check navigation visibility
        const nav = document.querySelector('nav');
        if (nav) {
          const navRect = nav.getBoundingClientRect();
          if (navRect.bottom < 0 || navRect.top > window.innerHeight) {
            issues.push('Navigation not visible');
          }
        }

        // Check for images that are too large
        const images = document.querySelectorAll('img');
        let oversizedImages = 0;

        for (const img of images) {
          const rect = img.getBoundingClientRect();
          if (rect.width > window.innerWidth) {
            oversizedImages++;
          }
        }

        if (oversizedImages > 0) {
          issues.push(`${oversizedImages} images exceed viewport width`);
        }

        // Check font sizes
        const bodyFontSize = window.getComputedStyle(document.body).fontSize;
        const bodyFontSizePx = parseFloat(bodyFontSize);

        if (bodyFontSizePx < 14) {
          issues.push('Body font size too small (< 14px)');
        }

        return {
          issues,
          viewportWidth: window.innerWidth,
          viewportHeight: window.innerHeight,
          bodyWidth: document.body.scrollWidth,
          bodyHeight: document.body.scrollHeight,
        };
      });

      results[url][breakpoint.name] = {
        viewport: { width: breakpoint.width, height: breakpoint.height },
        issues: visualCheck.issues,
        bodyDimensions: {
          width: visualCheck.bodyWidth,
          height: visualCheck.bodyHeight
        },
        hasIssues: visualCheck.issues.length > 0
      };
    }
  }

  await browser.close();

  // Print results
  console.log('\n=== Responsive Breakpoint Test Results ===\n');

  for (const [url, breakpointData] of Object.entries(results)) {
    console.log(`\nURL: ${url}`);
    console.log('=' .repeat(50));

    let issueCount = 0;
    let passCount = 0;

    for (const [breakpointName, data] of Object.entries(breakpointData)) {
      if (data.hasIssues) {
        issueCount++;
        console.log(`\n  ❌ ${breakpointName} (${data.viewport.width}x${data.viewport.height})`);
        console.log('  Issues found:');
        data.issues.forEach(issue => {
          console.log(`    - ${issue}`);
        });
      } else {
        passCount++;
        console.log(`  ✅ ${breakpointName} (${data.viewport.width}x${data.viewport.height})`);
      }
    }

    console.log(`\n  Summary: ${passCount} passed, ${issueCount} with issues`);
  }

  return results;
}

testResponsiveBreakpoints().catch(console.error);