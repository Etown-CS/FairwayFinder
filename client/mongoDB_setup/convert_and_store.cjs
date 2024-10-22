require('dotenv').config();
const fs = require('fs');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { OpenAI } = require('openai');

// Define the question here
const question = "Convert the following raw text data into JSON format suitable for MongoDB, where each entry represents an individual item with relevant fields. Use the correct key for each field that corresponds with each value within the break statements. The fields are brand name, product title, price/price ranges, and website based on the context of the text data. Ensure that the JSON is well-structured and ready for insertion into a MongoDB collection.";

// Define the single input file path
const inputFilePath = "example_data.txt";

// Initialize OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// MongoDB connection setup
const psswd = process.env.DATABASE_PSSWD; 
const password = encodeURIComponent(psswd);
const uri = `mongodb+srv://samh:${password}@fairwayfinder.stoif.mongodb.net/?retryWrites=true&w=majority&appName=FairwayFinder`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function insertJsonData(jsonData) {
  try {
    await client.connect();
    const collection = client.db("FairwayFinderDB").collection("GolfData");
    const result = await collection.insertMany(jsonData);
    console.log(`${result.insertedCount} documents were inserted`);
  } catch (error) {
    console.error('Error inserting data into MongoDB:', error);
  } finally {
    await client.close();
  }
}

// Read file content and convert it into a string
fs.readFile(inputFilePath, 'utf8', async (err, fileContent) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  try {
    // Prepare the request to OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo", // Ensure you have access to the correct model
      messages: [
        { 
          role: "system", 
          content: "You are an AI that analyzes a text file with info from a webpage that has golf products and price information. Please convert the text into JSON format suitable for MongoDB, including only the JSON data without any additional text or explanation." 
        },
        { 
          role: "user", 
          content: `Analyze the following text and answer the question: "${question}"\n\n${fileContent}` 
        },
      ],
    });

    // Extract and parse only the JSON data from the response
    let jsonString = response.choices[0].message.content.trim();

    // Remove any Markdown formatting (like ```json) from the string
    jsonString = jsonString.replace(/```json|```/g, '').trim();

    // Log the raw JSON string for debugging
    console.log("Raw JSON string:", jsonString);

    // Parse the cleaned JSON string to an array
    const jsonData = JSON.parse(jsonString); // Ensure this is an array

    // Insert JSON data into MongoDB
    await insertJsonData(jsonData);
  } catch (error) {
    console.error('Error with OpenAI API request or JSON parsing:', error);
    // Additional debugging information
    if (error instanceof SyntaxError) {
      console.error("Invalid JSON string:", jsonString);
    }
  }
});
