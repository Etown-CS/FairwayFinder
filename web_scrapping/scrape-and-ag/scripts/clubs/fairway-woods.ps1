#PowerShell Script that Runs Club/Drivers Scripts

cd "../../../playwright_files/playwright-node-files/clubs/fairway-woods"
node "scrap_fairway-woods.js"
cd "../../../../scrape-and-ag/web-src-scraping/clubs/fairway-woods"
node "ocr_fairway-woods.js"
cd "../../../data-ag/clubs/fairway-woods/"
node "analyze_fairway-woods.js"
cd "../../../../scrape-and-ag/scripts/clubs"