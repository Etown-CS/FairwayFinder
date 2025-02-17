const Tesseract = require('tesseract.js');
const fs = require('fs');

const jsonString = await fs.readFile('../../../../scrape-and-ag/urls.json', 'utf8');
const data = JSON.parse(jsonString);

// files paths of website screenshots and output path for extracted data

const imagePath1 = '../../../../../playwright_files/playwright-node-files/gloves/other/women/' + data.gloves.other.women["carlsgolfland.com"] + '.png';
const outputFilePath1 = data.gloves.other.women["carlsgolfland.com"] + '.txt';

// Website 1 OCR

Tesseract.recognize(
  imagePath1,
  'eng', // Specify the language of the text in the image
  { logger: m => console.log(m) } // Optional: Log the progress
)
  .then(({ data: { text } }) => {
    fs.writeFile(outputFilePath1, text, (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('Text extracted and saved to:', outputFilePath1);
      }
    });
  })
  .catch(err => {
    console.error(err);
  });