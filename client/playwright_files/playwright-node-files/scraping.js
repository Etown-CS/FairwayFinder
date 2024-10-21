const fs = require('fs');
const playwright = require('playwright');

(async () => {
    
    // SCREENSHOT CODE

    async function screenShot(pageUrl, screenshotPath) {
        for (const browserType of ['chromium']) {
            const browser = await playwright[browserType].launch({ headless: false });
            const context = await browser.newContext();
            const page = await context.newPage();

            await page.goto(pageUrl);
            await page.evaluate(() => {
                document.body.style.transform = 'scale(1)'; // Zoom out to 60%
                document.body.style.transformOrigin = 'top left'; // Set transform origin
                document.body.style.width = '100%'; // Adjust body width for 60% zoom
            });

            // Take a full page screenshot
            await page.screenshot({ path: screenshotPath, fullPage: true });
            await browser.close();
        }
    }

    // Taking screenshots of different pages
    await screenShot('https://www.golfdiscount.com/golf-clubs/drivers/mens?resultsPerPage=12', 'screenshot.png');
    await screenShot('https://www.golfgalaxy.com/f/golf-clubs-and-golf-club-sets', 'screenshot2.png');
    await screenShot('https://www.tgw.com/golf-clubs/', 'screenshot4.png');
    await screenShot('https://www.rockbottomgolf.com/golf-clubs/hot-sellers/', 'screenshot6.png');
    await screenShot('https://www.2ndswing.com/golf-clubs/', 'screenshot7.png');

})();
