const puppeteer = require('puppeteer');

async function testPerformanceAndAnimations() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  const results = {};
  const urls = [
    'http://localhost:3003/',
    'http://localhost:3003/california',
    'http://localhost:3003/california/los-angeles/los-angeles/plumber',
  ];

  for (const url of urls) {
    console.log(`\nTesting performance for: ${url}`);

    // Enable performance monitoring
    await page.evaluateOnNewDocument(() => {
      window.performanceData = [];
      window.animationData = [];

      // Monitor animations
      const originalRequestAnimationFrame = window.requestAnimationFrame;
      let frameCount = 0;
      let frameTimestamps = [];

      window.requestAnimationFrame = function(callback) {
        frameCount++;
        frameTimestamps.push(performance.now());

        // Calculate FPS every 60 frames
        if (frameCount % 60 === 0 && frameTimestamps.length > 1) {
          const timeDiff = frameTimestamps[frameTimestamps.length - 1] - frameTimestamps[0];
          const fps = (frameTimestamps.length / timeDiff) * 1000;
          window.animationData.push({
            timestamp: performance.now(),
            fps: Math.round(fps),
            frameCount
          });
          frameTimestamps = [frameTimestamps[frameTimestamps.length - 1]];
        }

        return originalRequestAnimationFrame(callback);
      };
    });

    await page.goto(url, { waitUntil: 'networkidle2' });

    // Wait for any animations to run
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Collect performance metrics
    const metrics = await page.metrics();
    const performanceTiming = await page.evaluate(() => {
      const timing = performance.timing;
      const paintMetrics = performance.getEntriesByType('paint');
      const animationData = window.animationData || [];

      return {
        // Navigation timing
        loadTime: timing.loadEventEnd - timing.navigationStart,
        domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
        firstContentfulPaint: paintMetrics.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
        firstPaint: paintMetrics.find(p => p.name === 'first-paint')?.startTime || 0,

        // Animation performance
        animationFPS: animationData.length > 0
          ? animationData.reduce((sum, d) => sum + d.fps, 0) / animationData.length
          : 0,
        animationFrames: animationData[animationData.length - 1]?.frameCount || 0,

        // Resource timing
        resourceCount: performance.getEntriesByType('resource').length,
        totalTransferSize: performance.getEntriesByType('resource')
          .reduce((sum, r) => sum + (r.transferSize || 0), 0),
      };
    });

    // Check for layout shifts
    const layoutShifts = await page.evaluate(() => {
      try {
        const observer = new PerformanceObserver(() => {});
        observer.observe({ type: 'layout-shift', buffered: true });
        const entries = observer.takeRecords();
        return entries.filter(e => !e.hadRecentInput).reduce((sum, e) => sum + e.value, 0);
      } catch {
        return 0;
      }
    });

    results[url] = {
      metrics,
      performanceTiming,
      layoutShifts
    };
  }

  await browser.close();

  // Print results
  console.log('\n=== Performance & Animation Test Results ===\n');

  for (const [url, data] of Object.entries(results)) {
    console.log(`URL: ${url}`);
    console.log('  Performance Metrics:');
    console.log(`    • Load Time: ${data.performanceTiming.loadTime}ms`);
    console.log(`    • DOM Content Loaded: ${data.performanceTiming.domContentLoaded}ms`);
    console.log(`    • First Contentful Paint: ${Math.round(data.performanceTiming.firstContentfulPaint)}ms`);
    console.log(`    • JS Heap Used: ${Math.round(data.metrics.JSHeapUsedSize / 1024 / 1024)}MB`);
    console.log(`    • DOM Nodes: ${data.metrics.Nodes}`);
    console.log(`    • Layout Count: ${data.metrics.LayoutCount}`);
    console.log(`    • Recalc Styles: ${data.metrics.RecalcStyleCount}`);

    console.log('  Animation Performance:');
    if (data.performanceTiming.animationFPS > 0) {
      console.log(`    • Average FPS: ${Math.round(data.performanceTiming.animationFPS)}`);
      console.log(`    • Total Frames: ${data.performanceTiming.animationFrames}`);
      console.log(`    • Performance: ${data.performanceTiming.animationFPS >= 55 ? '✅ Smooth' : '⚠️ Needs optimization'}`);
    } else {
      console.log(`    • No animations detected`);
    }

    console.log('  Resource Loading:');
    console.log(`    • Total Resources: ${data.performanceTiming.resourceCount}`);
    console.log(`    • Transfer Size: ${Math.round(data.performanceTiming.totalTransferSize / 1024)}KB`);

    console.log('  Layout Stability:');
    console.log(`    • Cumulative Layout Shift: ${data.layoutShifts.toFixed(3)}`);
    console.log(`    • Status: ${data.layoutShifts < 0.1 ? '✅ Good' : data.layoutShifts < 0.25 ? '⚠️ Needs improvement' : '❌ Poor'}`);

    console.log('');
  }

  return results;
}

testPerformanceAndAnimations().catch(console.error);