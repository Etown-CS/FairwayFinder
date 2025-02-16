const fs = require('fs').promises;
const playwright = require('playwright');

(async () => {
    
    // Read and parse JSON data
    const jsonString = await fs.readFile('../../../../../scrape-and-ag/urls.json', 'utf8');
    const data = JSON.parse(jsonString);
        
    // SCREENSHOT CODE
    async function screenShot(pageUrl, screenshotPath) {
        const browser = await playwright.chromium.launch({ headless: false });
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto(pageUrl);

        await page.evaluate(() => {
            document.body.style.transform = 'scale(1)'; // Zoom reset
            document.body.style.transformOrigin = 'top left';
            document.body.style.width = '100%';
        });

        // Take a full-page screenshot
        await page.screenshot({ path: screenshotPath, fullPage: true });
        await browser.close();
    }

    // Taking screenshots of different pages
    await screenShot(data.gloves.left.women["tgw.com"], 'screen1.png');
    await screenShot(data.gloves.left.women["rockbottomgolf.com"], 'screen2.png');
    await screenShot(data.gloves.left.women["pgatoursuperstore.com"], 'screen3.png');
    await screenShot(data.gloves.left.women["golfdiscount.com"], 'screen4.png');
    await screenShot(data.gloves.left.women["dickssportinggoods.com"], 'screen5.png');

})();
