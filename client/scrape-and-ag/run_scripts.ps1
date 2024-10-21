#PowerShell Script that Runs Scripts

cd "../playwright_files/playwright-node-files/"
node "scraping.js"
cd "../../scrape-and-ag/web-src-scraping/"
node "ocr.js"
cd "../data-ag/analyze-data/"
node "analyze.js"
cd "../../"