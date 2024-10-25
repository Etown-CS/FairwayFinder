#PowerShell Script that Runs Club/Drivers Scripts

cd "../../../playwright_files/playwright-node-files/clubs/putters"
node "scrap_putters.js"
cd "../../../../scrape-and-ag/web-src-scraping/clubs/putters"
node "ocr_putters.js"
cd "../../../data-ag/clubs/putters/"
node "analyze_putters.js"
cd "../../../../scrape-and-ag/scripts/clubs"