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
    await screenShot(data.clubs.irons["tgw.com"], data.clubs.irons["tgw.com"] + ".png");
    await screenShot(data.clubs.irons["rockbottomgolf.com"], data.clubs.irons["rockbottomgolf.com"] + ".png");
    await screenShot(data.clubs.irons["globalgolf.com"], data.clubs.irons["globalgolf.com"] + ".png");
    await screenShot(data.clubs.irons["pgatoursuperstore.com"], data.clubs.irons["pgatoursuperstore.com"] + ".png");
    await screenShot(data.clubs.irons["golfdiscount.com"], data.clubs.irons["golfdiscount.com"] + ".png");
    await screenShot(data.clubs.irons["carlsgolfland.com"], data.clubs.irons["carlsgolfland.com"] + ".png");
    await screenShot(data.clubs.irons["dickssportinggoods.com"], data.clubs.irons["dickssportinggoods.com"] + ".png");

})();
