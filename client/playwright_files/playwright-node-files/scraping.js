const fs = require('fs');
const playwright = require('playwright');

(async () => {
    for (const browserType of ['chromium']) {
        const browser = await playwright[browserType].launch({ headless: false });
        const context = await browser.newContext();
        
        const page = await context.newPage();

        // Navigate to the page
        await page.goto('https://www.golfdiscount.com/golf-clubs/drivers/mens?resultsPerPage=12');

        // Extract data from the page
        const extractedRepos = await page.$$eval('body', (repos) => {
            const repoData = [];

            repos.forEach(repo => {
                
                // Get all titles, as an array of strings
                
                const titleElements = repo.querySelectorAll('.result-title');
                const title = Array.from(titleElements).map(element => element.textContent.trim());
                const titles = title.join('\n');
                const priceElements = repo.querySelectorAll('.price-wrapper');
                const price = Array.from(priceElements).map(element => element.textContent.trim());
                const prices = price.join('\n');
                
                repoData.push({ titles, prices });
            });

            return repoData;
        });

        console.log(`Total items extracted: ${extractedRepos.length}`);

        // Save the extracted data to a JSON file
        fs.writeFileSync('extractedData.json', JSON.stringify(extractedRepos, null, 2));

        console.dir(extractedRepos, { depth: null }); 

        await browser.close();
    }

    for (const browserType of ['chromium']) {
        const browser = await playwright[browserType].launch({ headless: false });
        const context = await browser.newContext();
        
        const page = await context.newPage();

        // Navigate to the page
        await page.goto('https://www.golfgalaxy.com/f/golf-clubs-and-golf-club-sets');

        // Extract data from the page
        const extractedRepos2 = await page.$$eval('body', (repos2) => {
            const repoData2 = [];

            repos2.forEach(repo2 => {
                
                // Get all titles, as an array of strings
                
                const titleElements2 = repo2.querySelectorAll('.rs_product_description.d-block');
                const title2 = Array.from(titleElements2).map(element => element.textContent.trim());
                const titles2 = title2.join('\n');
                const priceElements2 = repo2.querySelectorAll('.rs_product_price');
                const price = Array.from(priceElements2).map(element => element.textContent.trim());
                const prices2 = price.join('\n');
                
                repoData2.push({ titles2, prices2 });
            });

            return repoData2;
        });

        console.log(`Total items extracted: ${extractedRepos2.length}`);

        // Save the extracted data to a JSON file
        fs.writeFileSync('extractedData2.json', JSON.stringify(extractedRepos2, null, 2));

        console.dir(extractedRepos2, { depth: null }); 

        await browser.close();
    }
    
    // for (const browserType of ['firefox']) {
    //     const browser = await playwright[browserType].launch({ headless: false });
    //     const context = await browser.newContext();
        
    //     const page = await context.newPage();
    
    //     // Navigate to the page
    //     await page.goto('https://www.dickssportinggoods.com/f/golf-clubs');
    
    //     // Wait for the page to fully load
    //     await page.waitForLoadState('networkidle');
    
    //     // Wait for selectors
    //     await page.waitForSelector('a.product-title-link');
    
    //     // Extract data from the page
    //     const extractedRepos3 = await page.$$eval('body', (repos3) => {
    //         const repoData3 = [];
    
    //         repos3.forEach(repo3 => {
                
    //             // Get all titles, as an array of strings
    //             const titleElements3 = repo3.querySelectorAll('a.product-title-link');
    //             const title3 = Array.from(titleElements3).map(element => element.textContent.trim());
    //             const titles3 = title3.join('\n');
    
    //             const priceElements3 = repo3.querySelectorAll('homefield-price');
    //             const price3 = Array.from(priceElements3).map(element => element.textContent.trim());
    //             const prices3 = price3.join('\n');
                
    //             repoData3.push({ titles3, prices3 });
    //         });
    
    //         return repoData3;
    //     });
    
    //     console.log(`Total items extracted: ${extractedRepos3.length}`);
    
    //     // Save the extracted data to a JSON file
    //     fs.writeFileSync('extractedData3.json', JSON.stringify(extractedRepos3, null, 2));
    
    //     console.dir(extractedRepos3, { depth: null }); 
    
    //     await browser.close();
    // }

    for (const browserType of ['chromium']) {
        const browser = await playwright[browserType].launch({ headless: false });
        const context = await browser.newContext();
        
        const page = await context.newPage();
    
        // Navigate to the page
        await page.goto('https://www.tgw.com/golf-clubs');
    
        // Wait for the page to fully load
    
    
        // Extract data from the page
        const extractedRepos4 = await page.$$eval('body', (repos4) => {
            const repoData4 = [];
    
            repos4.forEach(repo4 => {
                
                // Get all titles, as an array of strings
                const titleElements4 = repo4.querySelectorAll('span[itemprop="name"]');
                const title4 = Array.from(titleElements4).map(element => element.textContent.trim());
                const titles4 = title4.join('\n');
                const priceElements4 = repo4.querySelectorAll('.price-orig');
                const price4 = Array.from(priceElements4).map(element => element.textContent.trim());
                const prices4 = price4.join('\n');
                
                repoData4.push({ titles4, prices4 });
            });
    
            return repoData4;
        });
    
        console.log(`Total items extracted: ${extractedRepos4.length}`);
    
        // Save the extracted data to a JSON file
        fs.writeFileSync('extractedData4.json', JSON.stringify(extractedRepos4, null, 2));
    
        console.dir(extractedRepos4, { depth: null }); 
    
        await browser.close();
    }
    
    // for (const browserType of ['chromium']) {
    //     const browser = await playwright[browserType].launch({ headless: false });
    //     const context = await browser.newContext();
        
    //     const page = await context.newPage();
    
    //     // Navigate to the page
    //     await page.goto('https://www.pgatoursuperstore.com/golf-clubs/');
    
    //     // Wait for the page to fully load
    
    
    //     // Extract data from the page
    //     const extractedRepos5 = await page.$$eval('body', (repos5) => {
    //         const repoData5 = [];
    
    //         repos5.forEach(repo5 => {
                
    //             // Get all titles, as an array of strings
    //             const titleElements5 = repo5.querySelectorAll('.product-tile-brand.pdp-link');
    //             const title5 = Array.from(titleElements5).map(element => element.textContent.trim());
    //             const titles5 = title5.join('\n');
    //             const priceElements5 = repo5.querySelectorAll('.price');
    //             const price5 = Array.from(priceElements5).map(element => element.textContent.trim());
    //             const prices5 = price5.join('\n');
                
    //             repoData5.push({ titles5, prices5 });
    //         });
    
    //         return repoData5;
    //     });
    
    //     console.log(`Total items extracted: ${extractedRepos5.length}`);
    
    //     // Save the extracted data to a JSON file
    //     fs.writeFileSync('extractedData5.json', JSON.stringify(extractedRepos5, null, 2));
    
    //     console.dir(extractedRepos5, { depth: null }); 
    
    //     await browser.close();
    // }

    for (const browserType of ['chromium']) {
        const browser = await playwright[browserType].launch({ headless: false });
        const context = await browser.newContext();
        
        const page = await context.newPage();
    
        // Navigate to the page
        await page.goto('https://www.rockbottomgolf.com/golf-clubs/hot-sellers/');
    
        // Wait for the page to fully load
    
    
        // Extract data from the page
        const extractedRepos6 = await page.$$eval('body', (repos6) => {
            const repoData6 = [];
    
            repos6.forEach(repo6 => {
                
                // Get all titles, as an array of strings
                const titleElements6 = repo6.querySelectorAll('.card-title');
                const title6 = Array.from(titleElements6).map(element => element.textContent.trim());
                const titles6 = title6.join('\n');
                const priceElements6 = repo6.querySelectorAll('.price');
                const price6 = Array.from(priceElements6).map(element => element.textContent.trim());
                const prices6 = price6.join('\n');
                
                repoData6.push({ titles6, prices6 });
            });
    
            return repoData6;
        });
    
        console.log(`Total items extracted: ${extractedRepos6.length}`);
    
        // Save the extracted data to a JSON file
        fs.writeFileSync('extractedData6.json', JSON.stringify(extractedRepos6, null, 2));
    
        console.dir(extractedRepos6, { depth: null }); 
    
        await browser.close();
    }

    // SCREENSHOT CODE

    async function screenShot() {
        for (const browserType of ['chromium']) {
            const browser = await playwright[browserType].launch({ headless: false });

            const context = await browser.newContext();
            const page = await context.newPage();

            await page.setViewportSize({ width: 1280, height: 800 }); // set screenshot dimension
            await page.goto('https://www.golfdiscount.com/golf-clubs/drivers/mens?resultsPerPage=12');
            await page.screenshot({ path: 'screenshot.png' }); // Make sure 'images/' exists or use a simpler path
            await browser.close();
        }
    }

    screenShot();

    async function screenShot2() {
        for (const browserType of ['chromium']) {
            const browser = await playwright[browserType].launch({ headless: false });

            const context = await browser.newContext();
            const page = await context.newPage();

            await page.setViewportSize({ width: 1280, height: 800 }); // set screenshot dimension
            await page.goto('https://www.golfgalaxy.com/f/golf-clubs-and-golf-club-sets');
            await page.screenshot({ path: 'screenshot2.png' }); // Make sure 'images/' exists or use a simpler path
            await browser.close();
        }
    }

    screenShot2();

    // async function screenShot3() {
    //     for (const browserType of ['firefox']) {
    //         const browser = await playwright[browserType].launch({ headless: false });
    //         const context = await browser.newContext();
    //         const page = await context.newPage();
    //         await page.goto('https://dickssportinggoods.com/f/golf-clubs');
    //         await page.waitForLoadState('networkidle');
    
    //         // Wait for selectors
    //         await page.waitForSelector('a.product-title-link');

            
    //         await page.setViewportSize({ width: 1280, height: 800 }); // set screenshot dimension
            
            
    //         await page.screenshot({ path: 'screenshot3.png' }); // Make sure 'images/' exists or use a simpler path
    //         await browser.close();
    //     }
    // }

    // screenShot3();

    async function screenShot4() {
        for (const browserType of ['chromium']) {
            const browser = await playwright[browserType].launch({ headless: false });

            const context = await browser.newContext();
            const page = await context.newPage();

            await page.setViewportSize({ width: 1280, height: 800 }); // set screenshot dimension
            await page.goto('https://www.tgw.com/golf-clubs/');
            await page.screenshot({ path: 'screenshot4.png' }); // Make sure 'images/' exists or use a simpler path
            await browser.close();
        }
    }

    screenShot4();
    
    // async function screenShot5() {
    //     for (const browserType of ['chromium']) {
    //         const browser = await playwright[browserType].launch({ headless: false });

    //         const context = await browser.newContext();
    //         const page = await context.newPage();

    //         await page.setViewportSize({ width: 1280, height: 800 }); // set screenshot dimension
    //         await page.goto('https://www.pgatoursuperstore.com/golf-clubs/');
    //         await page.screenshot({ path: 'screenshot5.png' }); // Make sure 'images/' exists or use a simpler path
    //         await browser.close();
    //     }
    // }

    // screenShot5();

    async function screenShot6() {
        for (const browserType of ['chromium']) {
            const browser = await playwright[browserType].launch({ headless: false });

            const context = await browser.newContext();
            const page = await context.newPage();

            await page.setViewportSize({ width: 1280, height: 800 }); // set screenshot dimension
            await page.goto('https://www.rockbottomgolf.com/golf-clubs/hot-sellers/');
            await page.screenshot({ path: 'screenshot6.png' }); // Make sure 'images/' exists or use a simpler path
            await browser.close();
        }
    }

    screenShot6();

})();
