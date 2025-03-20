#PowerShell Script that Runs Club/Drivers Scripts

cd "../../../playwright_files/playwright-node-files/clubs/hybrids"
node "scrape_hybrids.js"
cd "../../../../scrape-and-ag/ocr/clubs/hybrids"
node "ocr_hybrids.js"
cd "../../../data-ag/clubs/hybrids/"
node "analyze_hybrids.js"
cd "../../../../scrape-and-ag/scripts/clubs"