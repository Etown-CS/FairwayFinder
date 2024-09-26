const fs = require('fs');
const playwright = require('playwright');

(async () => {
    for (const browserType of ['chromium']) {
        const browser = await playwright[browserType].launch({ headless: false });
        const context = await browser.newContext();
        
        const page = await context.newPage();

        // Navigate to the Amazon page
        await page.goto('https://www.toysrus.com/collections/lego-dreamzzz/products/lego-dreamzzz-71454-mateo-and-z-blob-c2-a0the-robot-toy-building-set-16425503');
        

        const extractedRepos = await page.$$eval('body', repos => {
            const repoData = [];

            repos.forEach(repo => {
                const price = repo.querySelector('.price-item.price-item--regular')?.textContent.trim() || 'N/A';
                const item_title = repo.querySelector('h1')?.textContent.trim() || 'N/A';
                const stock = repo.querySelector('.tru-availability-status')?.textContent.trim() || 'N/A';

                repoData.push({ price, item_title, stock });
            });

            return repoData;
        });

        console.log(`Total items extracted: ${extractedRepos.length}`);

        // Save the extracted data to a JSON file
        fs.writeFileSync('extractedData.json', JSON.stringify(extractedRepos, null, 2));

        console.dir(extractedRepos, { depth: null }); 

        await browser.close();
    }

        //SCREENSHOT CODE

    async function screenShot() {
    
    for (const browserType of ['chromium']){
        const browser = await playwright[browserType].launch({ headless: false });

        const context = await browser.newContext();
        const page = await context.newPage();

        await page.setViewportSize({ width: 1280, height: 800 }); // set screenshot dimension
        await page.goto('https://www.toysrus.com/collections/lego-dreamzzz/products/lego-dreamzzz-71454-mateo-and-z-blob-c2-a0the-robot-toy-building-set-16425503')
        await page.screenshot({ path: 'images/screenshot.png' })
        await browser.close()
    }
    }
screenShot();
})();
