const fs = require('fs').promises;
const playwright = require('playwright');

(async () => {
    
    // Read and parse JSON data
    const jsonString = await fs.readFile('../../../../scrape-and-ag/urls.json', 'utf8');
    const data = JSON.parse(jsonString);

    const jsonString2 = await fs.readFile('../../../../scrape-and-ag/filenames.json', 'utf8');
    const names = JSON.parse(jsonString2);

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
    await screenShot(data.clubs.drivers["tgw.com"], names.clubs.drivers["tgw.com"] + ".png");
    await screenShot(data.clubs.drivers["rockbottomgolf.com"], names.clubs.drivers["rockbottomgolf.com"] + ".png");
    await screenShot(data.clubs.drivers["globalgolf.com"], names.clubs.drivers["globalgolf.com"] + ".png");
    await screenShot(data.clubs.drivers["pgatoursuperstore.com"], names.clubs.drivers["pgatoursuperstore.com"] + ".png");
    await screenShot(data.clubs.drivers["golfdiscount.com"], names.clubs.drivers["golfdiscount.com"] + ".png");
    await screenShot(data.clubs.drivers["carlsgolfland.com"], names.clubs.drivers["carlsgolfland.com"] + ".png");
    await screenShot(data.clubs.drivers["dickssportinggoods.com"], names.clubs.drivers["dickssportinggoods.com"] + ".png");

   
})();
