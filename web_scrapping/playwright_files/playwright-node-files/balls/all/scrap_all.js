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
    await screenShot(data.balls.all["tgw.com"], data.balls.all["tgw.com"] + ".png");
    await screenShot(data.balls.all["rockbottomgolf.com"], data.balls.all["rockbottomgolf.com"] + ".png");
    await screenShot(data.balls.all["globalgolf.com"], data.balls.all["globalgolf.com"] + ".png");
    await screenShot(data.balls.all["pgatoursuperstore.com"], data.balls.all["pgatoursuperstore.com"] + ".png");
    await screenShot(data.balls.all["golfdiscount.com"], data.balls.all["golfdiscount.com"] + ".png");
    await screenShot(data.balls.all["carlsgolfland.com"], data.balls.all["carlsgolfland.com"] + ".png");
    await screenShot(data.balls.all["dickssportinggoods.com"], data.balls.all["dickssportinggoods.com"] + ".png");

})();
