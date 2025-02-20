const Tesseract = require('tesseract.js');
const fs = require('fs');

const jsonString = fs.readFileSync('../../../scrape-and-ag/filenames.json', 'utf8');
const names = JSON.parse(jsonString);

// files paths of website screenshots and output path for extracted data

const imagePath1 = '../../../../playwright_files/playwright-node-files/clubs/hybrids/' + names.clubs.hybrids["tgw.com"] + '.png';
const outputFilePath1 = names.clubs.hybrids["tgw.com"] + '.txt';

const imagePath2 = '../../../../playwright_files/playwright-node-files/clubs/hybrids/' + names.clubs.hybrids["rockbottomgolf.com"] + '.png';
const outputFilePath2 = names.clubs.hybrids["rockbottomgolf.com"] + '.txt';

const imagePath3 = '../../../../playwright_files/playwright-node-files/clubs/hybrids/' + names.clubs.hybrids["globalgolf.com"] + '.png';
const outputFilePath3 = names.clubs.hybrids["globalgolf.com"] + '.txt';

const imagePath4 = '../../../../playwright_files/playwright-node-files/clubs/hybrids/' + names.clubs.hybrids["pgatoursuperstore.com"] + '.png';
const outputFilePath4 = names.clubs.hybrids["pgatoursuperstore.com"] + '.txt';

const imagePath5 = '../../../../playwright_files/playwright-node-files/clubs/hybrids/' + names.clubs.hybrids["golfdiscount.com"] + '.png';
const outputFilePath5 = names.clubs.hybrids["golfdiscount.com"] + '.txt';

const imagePath6 = '../../../../playwright_files/playwright-node-files/clubs/hybrids/' + names.clubs.hybrids["carlsgolfland.com"] + '.png';
const outputFilePath6 = names.clubs.hybrids["carlsgolfland.com"] + '.txt';

const imagePath7 = '../../../../playwright_files/playwright-node-files/clubs/hybrids/' + names.clubs.hybrids["dickssportinggoods.com"] + '.png';
const outputFilePath7 = names.clubs.hybrids["dickssportinggoods.com"] + '.txt';

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