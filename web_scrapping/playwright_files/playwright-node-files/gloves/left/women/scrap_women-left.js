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
    await screenShot('https://www.tgw.com/accessories/golf-gloves#facet:-77411240122833343738711110910111039115,-774112401228336683576101102116&productBeginIndex:0&orderBy:5&pageView:grid&minPrice:&maxPrice:&pageSize:&', 'screen1.png');
    await screenShot('https://www.rockbottomgolf.com/accessories/gloves/#?profile_id=9a60e9bcfd4c1a789dfe41a2ec4ffd11&session_id=468725c2-d939-11ef-b74b-0242ac110003&Gender=Ladies&Dexteritysearch=&Searchcat1=Gloves&search_return=all&Dexterity=Left', 'screen2.png');
    //await screenShot('https://www.globalgolf.com/golf-clubs/wedge/', 'screen3.png');
    await screenShot('https://www.pgatoursuperstore.com/search?q=gloves+women&pmin=0.01&prefn1=STK_DEXTERITY&prefv1=Left+Hand&prefn2=gender&prefv2=Women%27s&prefn3=merchantCategory&prefv3=Golf+Gloves&srule=Best+Sellers', 'screen3.png');
    await screenShot('https://www.golfdiscount.com/catalogsearch/result/?q=gloves&resultsPerPage=36&filter.hand=Left%20Hand&filter.gender=Women%27s', 'screen4.png');
    //await screenShot('https://www.carlsgolfland.com/search/go?ts=custom&w=gloves#/perpage:90/filter:gender_filter:Mens/filter:golf_club_hand:Left', 'screen5.png');
    await screenShot('https://www.dickssportinggoods.com/search/SearchDisplay?searchTerm=gloves%20golf&storeId=15108&catalogId=12301&langId=-1&sType=SimpleSearch&resultCatEntryType=2&showResultsPage=true&fromPage=Search&searchSource=Q&pageView=&beginIndex=0&DSGsearchType=Keyword&pageSize=96&selectedStore=260&filterFacets=3945%253ALeft%2520Hand%253B5495%253AWomen%27s', 'screen5.png');

})();
