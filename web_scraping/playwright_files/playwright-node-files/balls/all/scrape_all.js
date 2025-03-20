const fs = require('fs').promises;
const playwright = require('playwright'); // Requires Playwright

(async () => {
    
    // Read and parse JSON data
    // Reads file URL JSON file
    const jsonString = await fs.readFile('../../../../scrape-and-ag/urls.json', 'utf8');
    // Sets 'data' to Parse URLs
    const data = JSON.parse(jsonString);

    // Reads Filename JSON file
    const jsonString2 = await fs.readFile('../../../../scrape-and-ag/filenames.json', 'utf8');
    // Sets 'names' to Parse URLs
    const names = JSON.parse(jsonString2);
        
    // Screenshot Code--------------------------------------------------------------------------
    async function screenShot(pageUrl, screenshotPath) {
        const browser = await playwright.chromium.launch({ headless: false }); // Specifies what type of browser instance
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto(pageUrl);

        await page.evaluate(() => {
            document.body.style.transform = 'scale(1)'; // Zoom
            document.body.style.transformOrigin = 'top left'; // Keys scale origin at the top left
            document.body.style.width = '100%'; // sets the website to a 100% width to allow scaling
        });

        // Take a full-page screenshot
        await page.screenshot({ path: screenshotPath, fullPage: true });
        await browser.close(); // Closes the browser instance
    }

    // Each Statement takes a screenshot using the specified (URL, OUTPUT FILENAME)
    await screenShot(data.balls.all["tgw.com"], names.balls.all["tgw.com"] + ".png");
    await screenShot(data.balls.all["rockbottomgolf.com"], names.balls.all["rockbottomgolf.com"] + ".png");
    await screenShot(data.balls.all["globalgolf.com"], names.balls.all["globalgolf.com"] + ".png");
    await screenShot(data.balls.all["pgatoursuperstore.com"], names.balls.all["pgatoursuperstore.com"] + ".png");
    await screenShot(data.balls.all["golfdiscount.com"], names.balls.all["golfdiscount.com"] + ".png");
    await screenShot(data.balls.all["carlsgolfland.com"], names.balls.all["carlsgolfland.com"] + ".png");
    await screenShot(data.balls.all["dickssportinggoods.com"], names.balls.all["dickssportinggoods.com"] + ".png");

})();
