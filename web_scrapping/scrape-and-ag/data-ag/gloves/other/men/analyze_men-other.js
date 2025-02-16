require('dotenv').config();
const fs = require('fs');
const { OpenAI } = require('openai');
const cliProgress = require('cli-progress'); // Import the cli-progress package

// Define the question here
const question = "What are the prices for the products and the site they are from? formatting must be as follows including square brackets and bold tags: Brand: <b>[Brand]</b> Title: <b>[Title]</b> Price: <b>[Price]</b>, at the end of the list add Website: <b>[Website]</b>. If a price does not exist for a product, drop the product. All prices must be actual prices and not text like low new price or checkout for price.";

// Define the file paths here (replace with your actual file paths)
const filePaths = [
  "../../../../web-src-scraping/gloves/other/men/gloves_other_men_1.txt"
  
];

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
      model: "gpt-4o-mini", // Ensure you have access to the correct model
      messages: [
        { role: "system", content: "You are an AI that analyzes a text file with info from a webpage that has golf products and price information. Provide brand name, product title, and price/price ranges for each. Also provide the website it is from. Format all of your result in the exact format. Brand: <b>[Brand]</b> Title: <b>[Title]</b> Price: <b>[Price]</b>, at the end of the list add Website: <b>[Website]</b>.If price is not given like click for low price or add to cart for price do no include that product in the list" },
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

  // Create a new progress bar
  const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  
  // Start the progress bar with the total number of files
  progressBar.start(filePaths.length, 0);

  for (let i = 0; i < filePaths.length; i++) {
    const filePath = filePaths[i];
    completeAnalysis += `Result from ${filePath}:\n`;

    const answer = await analyzeTextFile(filePath);
    if (answer) completeAnalysis += `${answer}\n\n`;

    // Increment the progress bar by 1 after each file is processed
    progressBar.increment();
  }

  // Stop the progress bar once all files are processed
  progressBar.stop();

  // Write the complete analysis to the output file (overwrites existing content)
  fs.writeFileSync(outputFilePath, completeAnalysis);
  console.log(`Analysis results written to ${outputFilePath}`);
}

// Call the async function to run the analysis
runAnalysis();
