const Tesseract = require('tesseract.js');
const fs = require('fs');

// files paths of website screenshots and output path for extracted data

const imagePath1 = '../../../../playwright_files/playwright-node-files/gloves/left/women/screen1.png';
const outputFilePath1 = 'gloves_women_left-1.txt';

const imagePath2 = '../../../../playwright_files/playwright-node-files/gloves/left/women/screen2.png';
const outputFilePath2 = 'gloves_women_left-2.txt';

const imagePath3 = '../../../../playwright_files/playwright-node-files/gloves/left/women/screen3.png';
const outputFilePath3 = 'gloves_women_left-3.txt';

const imagePath4 = '../../../../playwright_files/playwright-node-files/gloves/left/women/screen4.png';
const outputFilePath4 = 'gloves_women_left-4.txt';

const imagePath5 = '../../../../playwright_files/playwright-node-files/gloves/left/women/screen5.png';
const outputFilePath5 = 'gloves_women_left-5.txt';

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

  // Website 2 OCR

Tesseract.recognize(
  imagePath2,
  'eng', // Specify the language of the text in the image
  { logger: m => console.log(m) } // Optional: Log the progress
)
  .then(({ data: { text } }) => {
    fs.writeFile(outputFilePath2, text, (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('Text extracted and saved to:', outputFilePath2);
      }
    });
  })
  .catch(err => {
    console.error(err);
  });

    // Website 3 OCR

Tesseract.recognize(
  imagePath3,
  'eng', // Specify the language of the text in the image
  { logger: m => console.log(m) } // Optional: Log the progress
)
  .then(({ data: { text } }) => {
    fs.writeFile(outputFilePath3, text, (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('Text extracted and saved to:', outputFilePath3);
      }
    });
  })
  .catch(err => {
    console.error(err);
  });

      // Website 4 OCR

Tesseract.recognize(
  imagePath4,
  'eng', // Specify the language of the text in the image
  { logger: m => console.log(m) } // Optional: Log the progress
)
  .then(({ data: { text } }) => {
    fs.writeFile(outputFilePath4, text, (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('Text extracted and saved to:', outputFilePath4);
      }
    });
  })
  .catch(err => {
    console.error(err);
  });

        // Website 5 OCR

Tesseract.recognize(
  imagePath5,
  'eng', // Specify the language of the text in the image
  { logger: m => console.log(m) } // Optional: Log the progress
)
  .then(({ data: { text } }) => {
    fs.writeFile(outputFilePath5, text, (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('Text extracted and saved to:', outputFilePath5);
      }
    });
  })
  .catch(err => {
    console.error(err);
  });