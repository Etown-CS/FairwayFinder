#PowerShell Script that Runs Club/Drivers Scripts

cd "../../../playwright_files/playwright-node-files/balls/all"
node "scrape_all.js"
cd "../../../../scrape-and-ag/ocr/balls/all"
node "ocr_all.js"
cd "../../../data-ag/balls/all/"
node "analyze_all.js"
cd "../../../../scrape-and-ag/scripts/balls"