#PowerShell Script that Runs Club/Drivers Scripts

cd "../../../playwright_files/playwright-node-files/clubs/wedges"
node "scrap_wedges.js"
cd "../../../../scrape-and-ag/web-src-scraping/clubs/wedges"
node "ocr_wedges.js"
cd "../../../data-ag/clubs/wedges/"
node "analyze_wedges.js"
cd "../../../../scrape-and-ag/scripts/clubs"