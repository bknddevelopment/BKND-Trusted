#!/usr/bin/env node
/**
 * Performance Testing Script
 * Measures Core Web Vitals and performance metrics
 */

const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const { URL } = require('url');

const TEST_URL = process.env.TEST_URL || 'http://localhost:3000';
const MOBILE_USER_AGENT = 'Mozilla/5.0 (Linux; Android 10; SM-A205U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36';

// Performance budgets
const PERFORMANCE_BUDGETS = {
  'first-contentful-paint': 1800,
  'largest-contentful-paint': 2500,
  'first-meaningful-paint': 2000,
  'speed-index': 3000,
  'total-blocking-time': 200,
  'max-potential-fid': 100,
  'cumulative-layout-shift': 0.1,
  'time-to-interactive': 3800,
  'server-response-time': 600,
  'total-byte-weight': 1500000, // 1.5MB
  'dom-size': 1500,
};

// Lighthouse configuration
const lighthouseConfig = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    formFactor: 'mobile',
    throttling: {
      rttMs: 150,
      throughputKbps: 1638.4,
      cpuSlowdownMultiplier: 4,
    },
    screenEmulation: {
      mobile: true,
      width: 375,
      height: 812,
      deviceScaleFactor: 3,
      disabled: false,
    },
    emulatedUserAgent: MOBILE_USER_AGENT,
  },
};

async function runLighthouseTest(url) {
  console.log('🚀 Starting Lighthouse performance test...\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const { lhr } = await lighthouse(url, {
    port: new URL(browser.wsEndpoint()).port,
    output: 'json',
    logLevel: 'info',
  }, lighthouseConfig);

  await browser.close();

  return lhr;
}

async function measureRealUserMetrics(url) {
  console.log('📊 Measuring Real User Metrics...\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setUserAgent(MOBILE_USER_AGENT);
  await page.setViewport({ width: 375, height: 812 });

  // Enable performance metrics collection
  await page.evaluateOnNewDocument(() => {
    window.__perf = {
      lcp: 0,
      fid: 0,
      cls: 0,
      fcp: 0,
      ttfb: 0,
      inp: 0,
    };

    // Observe LCP
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      window.__perf.lcp = entries[entries.length - 1].startTime;
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // Observe FID
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      if (entries.length > 0) {
        window.__perf.fid = entries[0].processingStart - entries[0].startTime;
      }
    }).observe({ entryTypes: ['first-input'] });

    // Observe CLS
    let clsValue = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          window.__perf.cls = clsValue;
        }
      }
    }).observe({ entryTypes: ['layout-shift'] });

    // Observe FCP
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        window.__perf.fcp = fcpEntry.startTime;
      }
    }).observe({ entryTypes: ['paint'] });
  });

  await page.goto(url, { waitUntil: 'networkidle0' });

  // Wait for metrics to be collected
  await page.waitForTimeout(5000);

  // Get performance metrics
  const metrics = await page.evaluate(() => {
    const navigation = performance.getEntriesByType('navigation')[0];
    return {
      ...window.__perf,
      ttfb: navigation.responseStart - navigation.requestStart,
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      resources: performance.getEntriesByType('resource').length,
      memory: performance.memory ? {
        usedJSHeapSize: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
        totalJSHeapSize: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
      } : null,
    };
  });

  // Check bundle sizes
  const coverage = await page.coverage.startJSCoverage();
  await page.reload({ waitUntil: 'networkidle0' });
  const jsCoverage = await page.coverage.stopJSCoverage();

  const bundleStats = {
    totalJS: 0,
    usedJS: 0,
  };

  for (const entry of jsCoverage) {
    bundleStats.totalJS += entry.text.length;
    for (const range of entry.ranges) {
      bundleStats.usedJS += range.end - range.start - 1;
    }
  }

  await browser.close();

  return {
    ...metrics,
    bundleStats: {
      totalJS: Math.round(bundleStats.totalJS / 1024),
      usedJS: Math.round(bundleStats.usedJS / 1024),
      unusedJS: Math.round((bundleStats.totalJS - bundleStats.usedJS) / 1024),
      unusedPercentage: Math.round(((bundleStats.totalJS - bundleStats.usedJS) / bundleStats.totalJS) * 100),
    },
  };
}

function analyzeResults(lighthouseResult, realUserMetrics) {
  console.log('\n' + '='.repeat(60));
  console.log('📈 PERFORMANCE TEST RESULTS');
  console.log('='.repeat(60) + '\n');

  // Lighthouse scores
  console.log('🏆 Lighthouse Scores:');
  console.log(`  Performance:    ${Math.round(lighthouseResult.categories.performance.score * 100)}/100`);
  console.log(`  Accessibility:  ${Math.round(lighthouseResult.categories.accessibility.score * 100)}/100`);
  console.log(`  Best Practices: ${Math.round(lighthouseResult.categories['best-practices'].score * 100)}/100`);
  console.log(`  SEO:            ${Math.round(lighthouseResult.categories.seo.score * 100)}/100`);

  // Core Web Vitals
  console.log('\n📊 Core Web Vitals:');
  const lcp = lighthouseResult.audits['largest-contentful-paint'];
  const fid = lighthouseResult.audits['max-potential-fid'];
  const cls = lighthouseResult.audits['cumulative-layout-shift'];

  console.log(`  LCP: ${lcp.displayValue} ${lcp.numericValue <= PERFORMANCE_BUDGETS['largest-contentful-paint'] ? '✅' : '⚠️'}`);
  console.log(`  FID: ${fid.displayValue} ${fid.numericValue <= PERFORMANCE_BUDGETS['max-potential-fid'] ? '✅' : '⚠️'}`);
  console.log(`  CLS: ${cls.displayValue} ${cls.numericValue <= PERFORMANCE_BUDGETS['cumulative-layout-shift'] ? '✅' : '⚠️'}`);

  // Real User Metrics
  console.log('\n🔬 Real User Metrics:');
  console.log(`  FCP:  ${realUserMetrics.fcp.toFixed(0)}ms ${realUserMetrics.fcp <= 1800 ? '✅' : '⚠️'}`);
  console.log(`  LCP:  ${realUserMetrics.lcp.toFixed(0)}ms ${realUserMetrics.lcp <= 2500 ? '✅' : '⚠️'}`);
  console.log(`  CLS:  ${realUserMetrics.cls.toFixed(3)} ${realUserMetrics.cls <= 0.1 ? '✅' : '⚠️'}`);
  console.log(`  TTFB: ${realUserMetrics.ttfb.toFixed(0)}ms ${realUserMetrics.ttfb <= 800 ? '✅' : '⚠️'}`);

  // Bundle Analysis
  console.log('\n📦 Bundle Analysis:');
  console.log(`  Total JS:   ${realUserMetrics.bundleStats.totalJS}KB`);
  console.log(`  Used JS:    ${realUserMetrics.bundleStats.usedJS}KB`);
  console.log(`  Unused JS:  ${realUserMetrics.bundleStats.unusedJS}KB (${realUserMetrics.bundleStats.unusedPercentage}%)`);

  if (realUserMetrics.memory) {
    console.log('\n💾 Memory Usage:');
    console.log(`  JS Heap Used:  ${realUserMetrics.memory.usedJSHeapSize}MB`);
    console.log(`  JS Heap Total: ${realUserMetrics.memory.totalJSHeapSize}MB`);
  }

  // Key Recommendations
  console.log('\n💡 Key Opportunities:');
  const opportunities = lighthouseResult.audits;
  const topOpportunities = [
    'render-blocking-resources',
    'unused-css-rules',
    'unused-javascript',
    'uses-text-compression',
    'uses-responsive-images',
    'efficient-animated-content',
  ];

  topOpportunities.forEach(audit => {
    if (opportunities[audit] && opportunities[audit].score < 0.9) {
      console.log(`  ⚠️  ${opportunities[audit].title}`);
      if (opportunities[audit].numericValue) {
        console.log(`      Potential savings: ${opportunities[audit].displayValue}`);
      }
    }
  });

  // Performance budget check
  console.log('\n📋 Performance Budget Status:');
  let budgetPassed = true;

  Object.entries(PERFORMANCE_BUDGETS).forEach(([metric, budget]) => {
    if (lighthouseResult.audits[metric]) {
      const value = lighthouseResult.audits[metric].numericValue;
      const passed = value <= budget;
      if (!passed) budgetPassed = false;
      console.log(`  ${metric}: ${value} / ${budget} ${passed ? '✅' : '❌'}`);
    }
  });

  return {
    score: lighthouseResult.categories.performance.score * 100,
    budgetPassed,
  };
}

async function main() {
  try {
    console.log(`\n🎯 Testing performance for: ${TEST_URL}\n`);

    // Run tests
    const [lighthouseResult, realUserMetrics] = await Promise.all([
      runLighthouseTest(TEST_URL),
      measureRealUserMetrics(TEST_URL),
    ]);

    // Analyze and display results
    const { score, budgetPassed } = analyzeResults(lighthouseResult, realUserMetrics);

    // Final verdict
    console.log('\n' + '='.repeat(60));
    if (score >= 90 && budgetPassed) {
      console.log('✨ EXCELLENT! Your site has outstanding performance! ✨');
    } else if (score >= 75) {
      console.log('👍 Good performance, but there\'s room for improvement.');
    } else {
      console.log('⚠️  Performance needs attention. Review the opportunities above.');
    }
    console.log('='.repeat(60) + '\n');

    process.exit(budgetPassed ? 0 : 1);
  } catch (error) {
    console.error('❌ Error running performance tests:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { runLighthouseTest, measureRealUserMetrics };