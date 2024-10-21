const Tesseract = require('tesseract.js');
const fs = require('fs');

// files paths of website screenshots and output path for extracted data

const imagePath = '../../playwright_files/playwright-node-files/screenshot.png';
const outputFilePath = 'extracted_text.txt';

const imagePath2 = '../../playwright_files/playwright-node-files/screenshot2.png';
const outputFilePath2 = 'extracted_text2.txt';

const imagePath3 = '../../playwright_files/playwright-node-files/screenshot4.png';
const outputFilePath3 = 'extracted_text3.txt';

const imagePath4 = '../../playwright_files/playwright-node-files/screenshot6.png';
const outputFilePath4 = 'extracted_text4.txt';

const imagePath5 = '../../playwright_files/playwright-node-files/screenshot7.png';
const outputFilePath5 = 'extracted_text5.txt';

// Website 1 OCR

Tesseract.recognize(
  imagePath,
  'eng', // Specify the language of the text in the image
  { logger: m => console.log(m) } // Optional: Log the progress
)
  .then(({ data: { text } }) => {
    fs.writeFile(outputFilePath, text, (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('Text extracted and saved to:', outputFilePath);
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
    
  
    
  