#PowerShell Script that Runs Club/Drivers Scripts

cd "../../../playwright_files/playwright-node-files/clubs/drivers"
node "scrap_drivers.js"
cd "../../../../scrape-and-ag/web-src-scraping/clubs/drivers"
node "ocr_drivers.js"
cd "../../../data-ag/clubs/drivers/"
node "analyze_drivers.js"
cd "../../../../scrape-and-ag/scripts/clubs"