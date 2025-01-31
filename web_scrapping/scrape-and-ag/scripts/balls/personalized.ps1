#PowerShell Script that Runs Club/Drivers Scripts

cd "../../../playwright_files/playwright-node-files/balls/personalized"
node "scrap_personalized.js"
cd "../../../../scrape-and-ag/web-src-scraping/balls/personalized"
node "ocr_personalized.js"
cd "../../../data-ag/balls/personalized/"
node "analyze_personalized.js"
cd "../../../../scrape-and-ag/scripts/balls"