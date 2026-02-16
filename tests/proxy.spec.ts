import { test, chromium } from '@playwright/test'

test('check the proxy and error handling', async () => {

    const CB = await chromium.launch({ headless: false });
    const context = await CB.newContext({
        viewport: { width: 720, height: 1000 },
        locale: 'en-US',
        //proxy:{'url:port'},
        ignoreHTTPSErrors: true
    });
    const page = await context.newPage();

    await page.goto('https://youtube.com');
    console.log('');

})