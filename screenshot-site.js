const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');

const BASE_URL = 'https://conduitsystems.org';
const OUTPUT_DIR = path.join(__dirname, 'conduitsystems-screenshots');

const PAGES = [
  { name: '01-home',           url: '/' },
  { name: '02-home-offerings', url: '/#offerings' },
  { name: '03-home-work',      url: '/#work' },
  { name: '04-sites',          url: '/sites' },
  { name: '05-sites-pricing',  url: '/sites#pricing' },
  { name: '06-team',           url: '/team' },
  { name: '07-network',        url: '/network' },
  { name: '08-terms',          url: '/terms' },
  { name: '09-privacy',        url: '/privacy' },
];

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    ignoreHTTPSErrors: true,
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });

  for (const page of PAGES) {
    console.log(`Screenshotting: ${page.name} -> ${BASE_URL}${page.url}`);
    const tab = await context.newPage();
    try {
      await tab.goto(BASE_URL + page.url, { waitUntil: 'networkidle', timeout: 30000 });
      // Extra wait for any lazy-loaded content / animations
      await tab.waitForTimeout(2000);
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
