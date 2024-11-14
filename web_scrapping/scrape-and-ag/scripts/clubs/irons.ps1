#PowerShell Script that Runs Club/Drivers Scripts

cd "../../../playwright_files/playwright-node-files/clubs/irons"
node "scrap_irons.js"
cd "../../../../scrape-and-ag/web-src-scraping/clubs/irons"
node "ocr_irons.js"
cd "../../../data-ag/clubs/irons/"
node "analyze_irons.js"
cd "../../../../scrape-and-ag/scripts/clubs"