const Tesseract = require('tesseract.js');
const fs = require('fs');

const jsonString = await fs.readFile('../../../scrape-and-ag/urls.json', 'utf8');
const data = JSON.parse(jsonString);

// files paths of website screenshots and output path for extracted data

const imagePath1 = '../../../../playwright_files/playwright-node-files/balls/personalized/' + data.balls.personalized["tgw.com"] + '.png';
const outputFilePath1 = data.balls.personalized["tgw.com"] + '.txt';

const imagePath2 = '../../../../playwright_files/playwright-node-files/balls/personalized/' + data.balls.personalized["rockbottomgolf.com"] + '.png';
const outputFilePath2 = data.balls.personalized["rockbottomgolf.com"] + '.txt';

const imagePath3 = '../../../../playwright_files/playwright-node-files/balls/personalized/' + data.balls.personalized["globalgolf.com"] + '.png';
const outputFilePath3 = data.balls.personalized["globalgolf.com"] + '.txt';

const imagePath4 = '../../../../playwright_files/playwright-node-files/balls/personalized/' + data.balls.personalized["pgatoursuperstore.com"] + '.png';
const outputFilePath4 = data.balls.personalized["pgatoursuperstore.com"] + '.txt';

const imagePath5 = '../../../../playwright_files/playwright-node-files/balls/personalized/' + data.balls.personalized["golfdiscount.com"] + '.png';
const outputFilePath5 = data.balls.personalized["golfdiscount.com"] + '.txt';

const imagePath6 = '../../../../playwright_files/playwright-node-files/balls/personalized/' + data.balls.personalized["carlsgolfland.com"] + '.png';
const outputFilePath6 = data.balls.personalized["carlsgolfland.com"] + '.txt';

const imagePath7 = '../../../../playwright_files/playwright-node-files/balls/personalized/' + data.balls.personalized["dickssportinggoods.com"] + '.png';
const outputFilePath7 = data.balls.personalized["dickssportinggoods.com"] + '.txt';

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

         // Website 7 OCR

Tesseract.recognize(
  imagePath7,
  'eng', // Specify the language of the text in the image
  { logger: m => console.log(m) } // Optional: Log the progress
)
  .then(({ data: { text } }) => {
    fs.writeFile(outputFilePath7, text, (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('Text extracted and saved to:', outputFilePath7);
      }
    });
  })
  .catch(err => {
    console.error(err);
  });