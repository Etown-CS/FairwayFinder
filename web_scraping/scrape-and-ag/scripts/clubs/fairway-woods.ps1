#PowerShell Script that Runs Club/Drivers Scripts

cd "../../../playwright_files/playwright-node-files/clubs/fairway-woods"
node "scrape_fairway-woods.js"
cd "../../../../scrape-and-ag/ocr/clubs/fairway-woods"
node "ocr_fairway-woods.js"
cd "../../../data-ag/clubs/fairway-woods/"
node "analyze_fairway-woods.js"
cd "../../../../scrape-and-ag/scripts/clubs"