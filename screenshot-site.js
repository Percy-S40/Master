const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');

const BASE_URL = 'https://conduitsystems.org';
const OUTPUT_DIR = path.join(__dirname, 'conduitsystems-screenshots');

// Pages that are distinct full-page captures (hash variants captured by scrolling)
const PAGES = [
  { name: '01-home',     url: '/' },
  { name: '04-sites',    url: '/sites' },
  { name: '06-team',     url: '/team' },
  { name: '07-network',  url: '/network' },
  { name: '08-terms',    url: '/terms' },
  { name: '09-privacy',  url: '/privacy' },
];

async function fullyLoad(tab) {
  // Scroll slowly top-to-bottom to trigger lazy-loaded images/videos
  await tab.evaluate(async () => {
    await new Promise(resolve => {
      const distance = 300;
      const delay = 120;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, delay);
    });
  });

  // Wait for all <img> tags to finish loading
  await tab.evaluate(async () => {
    const imgs = Array.from(document.querySelectorAll('img'));
    await Promise.all(
      imgs.map(img =>
        img.complete
          ? Promise.resolve()
          : new Promise(res => { img.onload = res; img.onerror = res; })
      )
    );
  });

  // Wait for network to go quiet again after lazy loads triggered
  await tab.waitForLoadState('networkidle').catch(() => {});
  // Extra buffer for CSS animations / web fonts
  await tab.waitForTimeout(3000);
  // Scroll back to top for clean screenshot
  await tab.evaluate(() => window.scrollTo(0, 0));
  await tab.waitForTimeout(500);
}

(async () => {
  const browser = await chromium.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    ignoreHTTPSErrors: true,
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });

  for (const page of PAGES) {
    console.log(`Screenshotting: ${page.name} -> ${BASE_URL}${page.url}`);
    const tab = await context.newPage();
    try {
      await tab.goto(BASE_URL + page.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await tab.waitForLoadState('load').catch(() => {});
      await fullyLoad(tab);
      const filePath = path.join(OUTPUT_DIR, `${page.name}.png`);
      await tab.screenshot({ path: filePath, fullPage: true });
      console.log(`  Saved: ${filePath}`);
    } catch (err) {
      console.error(`  ERROR on ${page.name}: ${err.message}`);
    } finally {
      await tab.close();
    }
  }

  await browser.close();
  console.log('\nDone!');
})();
