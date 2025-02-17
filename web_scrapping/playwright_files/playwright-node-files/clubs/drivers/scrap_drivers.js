const fs = require('fs').promises;
const playwright = require('playwright');

(async () => {
    
    // Read and parse JSON data
    const jsonString = await fs.readFile('../../../../scrape-and-ag/urls.json', 'utf8');
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
    await screenShot(data.clubs.drivers["tgw.com"], data.clubs.drivers["tgw.com"] + ".png");
    await screenShot(data.clubs.drivers["rockbottomgolf.com"], data.clubs.drivers["rockbottomgolf.com"] + ".png");
    await screenShot(data.clubs.drivers["globalgolf.com"], data.clubs.drivers["globalgolf.com"] + ".png");
    await screenShot(data.clubs.drivers["pgatoursuperstore.com"], data.clubs.drivers["pgatoursuperstore.com"] + ".png");
    await screenShot(data.clubs.drivers["golfdiscount.com"], data.clubs.drivers["golfdiscount.com"] + ".png");
    await screenShot(data.clubs.drivers["carlsgolfland.com"], data.clubs.drivers["carlsgolfland.com"] + ".png");
    await screenShot(data.clubs.drivers["dickssportinggoods.com"], data.clubs.drivers["dickssportinggoods.com"] + ".png");

   
})();
