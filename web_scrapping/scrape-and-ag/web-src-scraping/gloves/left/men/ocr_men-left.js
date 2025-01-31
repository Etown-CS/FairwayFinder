const Tesseract = require('tesseract.js');
const fs = require('fs');

// files paths of website screenshots and output path for extracted data

const imagePath1 = '../../../../../playwright_files/playwright-node-files/gloves/left/men/screen1.png';
const outputFilePath1 = 'gloves_left_men_1.txt';

const imagePath2 = '../../../../../playwright_files/playwright-node-files/gloves/left/men/screen2.png';
const outputFilePath2 = 'gloves_left_men_2.txt';

const imagePath3 = '../../../../../playwright_files/playwright-node-files/gloves/left/men/screen3.png';
const outputFilePath3 = 'gloves_left_men_3.txt';

const imagePath4 = '../../../../../playwright_files/playwright-node-files/gloves/left/men/screen4.png';
const outputFilePath4 = 'gloves_left_men_4.txt';

const imagePath5 = '../../../../../playwright_files/playwright-node-files/gloves/left/men/screen5.png';
const outputFilePath5 = 'gloves_left_men_5.txt';

const imagePath6 = '../../../../../playwright_files/playwright-node-files/gloves/left/men/screen6.png';
const outputFilePath6= 'gloves_left_men_6.txt';

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

       // Website 6 OCR

Tesseract.recognize(
  imagePath6,
  'eng', // Specify the language of the text in the image
  { logger: m => console.log(m) } // Optional: Log the progress
)
  .then(({ data: { text } }) => {
    fs.writeFile(outputFilePath6, text, (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('Text extracted and saved to:', outputFilePath6);
      }
    });
  })
  .catch(err => {
    console.error(err);
  });