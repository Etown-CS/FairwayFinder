cd "../../../playwright_files/playwright-node-files/gloves/left/men"
node "scrap_men-left.js"
cd "../../../../scrape-and-ag/web-src-scraping/gloves/left/men"
node "ocr_men-left.js"
cd "../../../data-ag/gloves/left/men"
node "analyze_men-left.js"
cd "../../../../scrape-and-ag/scripts/gloves