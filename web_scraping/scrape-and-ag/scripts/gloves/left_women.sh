cd "../../../playwright_files/playwright-node-files/gloves/left/women"
node "scrape_women-left.js"
cd "../../../../../scrape-and-ag/ocr/gloves/left/women"
node "ocr_women-left.js"
cd "../../../../data-ag/gloves/left/women"
node "analyze_women-left.js"
cd "../../../../../scrape-and-ag/scripts/gloves"