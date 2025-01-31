const Tesseract = require('tesseract.js');
const fs = require('fs');

// files paths of website screenshots and output path for extracted data

const imagePath1 = '../../../../../playwright_files/playwright-node-files/gloves/other/men/screen1.png';
const outputFilePath1 = 'gloves_other_men_1.txt';

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