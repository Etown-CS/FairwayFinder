cd "../../../playwright_files/playwright-node-files/gloves/other/women"
node "scrap_women-other.js"
cd "../../../../scrape-and-ag/web-src-scraping/gloves/other/women"
node "ocr_women-other.js"
cd "../../../data-ag/gloves/other/women"
node "analyze_women-other.js"
cd "../../../../scrape-and-ag/scripts/gloves