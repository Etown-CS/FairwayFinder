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
    await screenShot(data.clubs.fairway-woods["tgw.com"], data.clubs.fairway-woods["tgw.com"] + ".png");
    await screenShot(data.clubs.fairway-woods["rockbottomgolf.com"], data.clubs.fairway-woods["rockbottomgolf.com"] + ".png");
    await screenShot(data.clubs.fairway-woods["globalgolf.com"], data.clubs.fairway-woods["globalgolf.com"] + ".png");
    await screenShot(data.clubs.fairway-woods["pgatoursuperstore.com"], data.clubs.fairway-woods["pgatoursuperstore.com"] + ".png");
    await screenShot(data.clubs.fairway-woods["golfdiscount.com"], data.clubs.fairway-woods["golfdiscount.com"] + ".png");
    await screenShot(data.clubs.fairway-woods["carlsgolfland.com"], data.clubs.fairway-woods["carlsgolfland.com"] + ".png");
    await screenShot(data.clubs.fairway-woods["dickssportinggoods.com"], data.clubs.fairway-woods["dickssportinggoods.com"] + ".png");

})();
