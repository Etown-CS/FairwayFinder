# Web scraping with Playwright in Node.js

## Install Playwright

```js
npm init -y
npm install playwright
```
## Opening a Web Page
### Amazon.com for Example

#### Importing Playwright
```js
const playwright = require('playwright');
```

#### Launch Multiple Browser Instances
```

(async () => {
    for (const browserType of ['chromium', 'firefox', 'webkit']) {
      const browser = await playwright[browserType].launch();
```
### Got to "https://amazon.com" 
```
      const page = await context.newPage();
      await page.goto("https://amazon.com");
```
```
      await page.screenshot({path: `nodejs_${browserType}.png`, fullPage: true});
```
### Wait 1 Second and then Close Browser
```
      await page.waitForTimeout(1000);
      await browser.close();
    };
   })()
```
## Create More Browser Contextes/Tabs
```
const context = await browser.newContext()
const page1 = await context.newPage()
const page2 = await context.newPage()
```
## Using CSS selectors to Locate Items

<img src="https://pbgmidi.tech/cs401/amazon-price-example.png">

You can see that all the items are under the International Best Seller category, which has div elements with the class for the a section price - ``.a-price``

## Scraping Text Using CSS Selectors

```
const products = await page.$$eval('.s-card-container > .a-spacing-base', all_products => {
   // run a loop here
   })
```