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
    await screenShot(data.clubs.hybrids["tgw.com"], data.clubs.hybrids["tgw.com"] + ".png");
    await screenShot(data.clubs.hybrids["rockbottomgolf.com"], data.clubs.hybrids["rockbottomgolf.com"] + ".png");
    await screenShot(data.clubs.hybrids["globalgolf.com"], data.clubs.hybrids["globalgolf.com"] + ".png");
    await screenShot(data.clubs.hybrids["pgatoursuperstore.com"], data.clubs.hybrids["pgatoursuperstore.com"] + ".png");
    await screenShot(data.clubs.hybrids["golfdiscount.com"], data.clubs.hybrids["golfdiscount.com"] + ".png");
    await screenShot(data.clubs.hybrids["carlsgolfland.com"], data.clubs.hybrids["carlsgolfland.com"] + ".png");
    await screenShot(data.clubs.hybrids["dickssportinggoods.com"], data.clubs.hybrids["dickssportinggoods.com"] + ".png");

})();
