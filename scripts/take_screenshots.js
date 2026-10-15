import puppeteer from 'puppeteer-core';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function main() {
  console.log('Launching browser via Edge...');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // 设置 390x844 iPhone 视口
  await page.setViewport({
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });

  // 监听 console
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    consoleErrors.push(err.toString());
  });

  // 1. 首页截图
  console.log('Capturing Home Page...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'screenshot_home.png' });

  // 首页整页长截图
  console.log('Capturing Home Page Full...');
  await page.screenshot({ path: 'screenshot_home_full.png', fullPage: true });

  // 2. 搜索交互状态
  console.log('Capturing Search Modal...');
  await page.click('.search-bar');
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'screenshot_search_modal.png' });
  // 点击取消退出搜索
  await page.click('.modal-cancel-btn');
  await new Promise(r => setTimeout(r, 400));

  // 3. 二手闲置页
  console.log('Capturing Idle Market Page...');
  await page.click('.nav-tab-item:nth-child(2)');
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'screenshot_idle_market.png' });

  // 4. 校园论坛页
  console.log('Capturing Forum List Page...');
  await page.click('.nav-tab-item:nth-child(3)');
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'screenshot_forum_list.png' });

  // 5. 个人中心页
  console.log('Capturing Profile Page...');
  await page.click('.nav-tab-item:nth-child(4)');
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'screenshot_profile.png' });

  // 6. 商品详情页
  console.log('Capturing Product Detail Page...');
  await page.goto('http://localhost:5173/product/1', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'screenshot_product_detail.png' });

  // 7. 帖子详情页
  console.log('Capturing Post Detail Page...');
  await page.goto('http://localhost:5173/forum/1', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'screenshot_post_detail.png' });

  console.log('Console errors count:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.error('Console errors:', consoleErrors);
  } else {
    console.log('✓ Zero console errors detected!');
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
}

main().catch(err => {
  console.error('Error during screenshot capture:', err);
  process.exit(1);
});
