const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch({
        headless: 'new',
        defaultViewport: {
            width: 1280,
            height: 800
        }
    });

    try {
        const page = await browser.newPage();
        console.log('Navigating to dashboard...');
        await page.goto('http://localhost:3002/tenant-user/dashboard', { waitUntil: 'networkidle2' });
        await new Promise(r => setTimeout(r, 2000));
        await page.screenshot({ path: path.join(__dirname, 'public', 'hero-screenshot.png') });
        console.log('Saved hero-screenshot.png');

        console.log('Navigating to docs...');
        await page.goto('http://localhost:3002/tenant-user/docs', { waitUntil: 'networkidle2' });
        await new Promise(r => setTimeout(r, 2000));
        await page.screenshot({ path: path.join(__dirname, 'public', 'feature-email.png') });
        console.log('Saved feature-email.png');

        console.log('Navigating to chat/outage view (simulation)...');
        // Let's just scroll down a bit on docs or hover over a row to get a different view for feature-chat
        await page.mouse.move(500, 400);
        await new Promise(r => setTimeout(r, 1000));
        await page.screenshot({ path: path.join(__dirname, 'public', 'feature-chat.png') });

        console.log('Navigating to connectors...');
        await page.goto('http://localhost:3002/tenant-user/connectors', { waitUntil: 'networkidle2' }).catch(() => { });
        await new Promise(r => setTimeout(r, 2000));
        await page.screenshot({ path: path.join(__dirname, 'public', 'feature-connectors.png') });
        console.log('Saved feature-connectors.png');

        console.log('Navigating to admin config...');
        await page.goto('http://localhost:3002/tenant-user/admin', { waitUntil: 'networkidle2' }).catch(() => { });
        await new Promise(r => setTimeout(r, 2000));
        await page.screenshot({ path: path.join(__dirname, 'public', 'feature-config.png') });
        console.log('Saved feature-config.png');

        console.log('Done capturing screenshots.');
    } catch (e) {
        console.error('Error during capture:', e);
    } finally {
        await browser.close();
    }
})();
