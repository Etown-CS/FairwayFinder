const fs = require('fs');
const playwright = require('playwright');

(async () => {
    for (const browserType of ['chromium']) {
        const browser = await playwright[browserType].launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        // Navigate to the Amazon page
        await page.goto('https://www.amazon.com/b?node=17938598011');

        const extractedRepos = await page.$$eval('body', repos => {
            const repoData = [];

            repos.forEach(repo => {
                const price = repo.querySelector('.a-price')?.textContent.trim() || 'N/A';
                const list_price = repo.querySelector('.a-text-price')?.textContent.trim() || 'N/A';
                const item_title = repo.querySelector('.a-size-base-plus')?.textContent.trim() || 'N/A';
                const rating = repo.querySelector('.a-icon-alt')?.textContent.trim() || 'N/A';

                repoData.push({ price, list_price, item_title, rating });
            });

            return repoData;
        });

        console.log(`Total items extracted: ${extractedRepos.length}`);

        // Save the extracted data to a JSON file
        fs.writeFileSync('extractedData.json', JSON.stringify(extractedRepos, null, 2));

        await browser.close();
    }

        //SCREENSHOT CODE

        async function screenShot() {
        
        for (const browserType of ['chromium']){
        const browser = await playwright[browserType].launch();

        const context = await browser.newContext();
        const page = await context.newPage();

        await page.setViewportSize({ width: 1280, height: 800 }); // set screenshot dimension
        await page.goto('<https://www.amazon.com/b?node=17938598011')
        await page.screenshot({ path: 'images/screenshot.png' })
        await browser.close()
    }
        }
    screenShot();
})();
