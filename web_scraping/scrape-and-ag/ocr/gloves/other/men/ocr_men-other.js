const Tesseract = require('tesseract.js');
const fs = require('fs');

const jsonString = fs.readFileSync('../../../../../scrape-and-ag/filenames.json', 'utf8');
const names = JSON.parse(jsonString);

// files paths of website screenshots and output path for extracted data

const imagePath1 = '../../../../../playwright_files/playwright-node-files/gloves/other/men/' + names.gloves.other.men["globalgolf.com"] + '.png';
const outputFilePath1 = names.gloves.other.men["globalgolf.com"] + '.txt';

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