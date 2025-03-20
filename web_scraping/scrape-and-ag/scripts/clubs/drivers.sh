
cd "../../../playwright_files/playwright-node-files/clubs/drivers"
node "scrape_drivers.js"
cd "../../../../scrape-and-ag/ocr/clubs/drivers"
node "ocr_drivers.js"
cd "../../../data-ag/clubs/drivers/"
node "analyze_drivers.js"
cd "../../../../scrape-and-ag/scripts/clubs"