require('dotenv').config();
const fs = require('fs');
const { OpenAI } = require('openai');

// Define the question here
const question = "What are the prices for the products and the site they are from? formating must be as follows including square brackets and bold tags: Brand: <b>[Brand]</b> Title: <b>[Title]</b> Price: <b>[Price]</b>, at the end of the list add Website: <b>[Website]</b>";

// Define the file paths here (replace with your actual file paths)
const filePath = "../../web-src-scraping/extracted_text.txt";
const filePath2 = "../../web-src-scraping/extracted_text2.txt";
const filePath3 = "../../web-src-scraping/extracted_text3.txt";
const filePath4 = "../../web-src-scraping/extracted_text4.txt";
const filePath5 = "../../web-src-scraping/extracted_text5.txt";

// Define the single output file path
const outputFilePath = "output.txt";

// Initialize OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function analyzeTextFile(filePath) {
  try {
    // Read the text file content
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Prepare the request to OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo", // Ensure you have access to the correct model
      messages: [
        { role: "system", content: "You are an AI that analyzes a text file with info from a webpage that has golf products and price information. Provide brand name, product title, and price/price ranges for each. Also provide the website it is from. Format all of your result in the exact format. Brand: <b>[Brand]</b> Title: <b>[Title]</b> Price: <b>[Price]</b>, at the end of the list add Website: <b>[Website]</b>"},
        { role: "user", content: `Analyze the following text and answer the question: "${question}"\n\n${fileContent}` },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error analyzing text file:', error);
    return null;
  }
}

async function runAnalysis() {
  let completeAnalysis = "";

  // Analyze each file and accumulate results
  completeAnalysis += `Result from ${filePath}:\n`;
  const answer1 = await analyzeTextFile(filePath);
  if (answer1) completeAnalysis += `${answer1}\n\n`;

  completeAnalysis += `Result from ${filePath2}:\n`;
  const answer2 = await analyzeTextFile(filePath2);
  if (answer2) completeAnalysis += `${answer2}\n\n`;

  completeAnalysis += `Result from ${filePath3}:\n`;
  const answer3 = await analyzeTextFile(filePath3);
  if (answer3) completeAnalysis += `${answer3}\n\n`;

  completeAnalysis += `Result from ${filePath4}:\n`;
  const answer4 = await analyzeTextFile(filePath4);
  if (answer4) completeAnalysis += `${answer4}\n\n`;

  completeAnalysis += `Result from ${filePath5}:\n`;
  const answer5 = await analyzeTextFile(filePath5);
  if (answer5) completeAnalysis += `${answer5}\n\n`;

  // Write the complete analysis to the output file (overwrites existing content)
  fs.writeFileSync(outputFilePath, completeAnalysis);
  console.log(`Analysis results written to ${outputFilePath}`);
}

// Call the async function to run the analysis
runAnalysis();