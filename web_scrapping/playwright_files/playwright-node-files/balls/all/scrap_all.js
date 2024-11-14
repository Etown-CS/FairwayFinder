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
    await screenShot('https://www.tgw.com/golf-balls/top-golf-balls', 'screen1.png');
    await screenShot('https://www.rockbottomgolf.com/balls/new-golf-balls/', 'screen2.png');
    await screenShot('https://www.globalgolf.com/golf-balls/', 'screen3.png');
    await screenShot('https://www.pgatoursuperstore.com/golf-balls/', 'screen4.png');
    await screenShot('https://www.golfdiscount.com/golf-balls?resultsPerPage=24', 'screen5.png');
    await screenShot('https://www.carlsgolfland.com/golf-balls', 'screen6.png');
    await screenShot('https://www.dickssportinggoods.com/f/golf-balls', 'screen7.png');

})();
