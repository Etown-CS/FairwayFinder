require('dotenv').config();
const fs = require('fs');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { OpenAI } = require('openai');

// Define the question here
const question = "Convert the following raw text data into JSON format suitable for MongoDB, where each entry represents an individual item with relevant fields. Use the correct key for each field that corresponds with each value within the break statements. The fields are brand name, product title, price, and website based on the context of the text data. Ensure that the JSON is well-structured and ready for insertion into a MongoDB collection. Make sure that there are no missing quotation marks, commas, braces, and brackets at all. Also make sure that all strings are terminated and that the JSON string is fully complete. Make sure there are no syntax errors in the JSON string.";

// File path
const inputFilePath = "example_data.txt";

// Initialize OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// MongoDB connection setup
const psswd = process.env.DATABASE_PSSWD;
const password = encodeURIComponent(psswd);
const uri = `mongodb+srv://samh:${password}@fairwayfinder.stoif.mongodb.net/?retryWrites=true&w=majority&tls=true`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Function to insert JSON data into MongoDB
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

// Function to call OpenAI API and process each section
async function processSection(section) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo", // Ensure you have access to the correct model
      messages: [
        { role: "system", content: "You are an AI that analyzes a text file with info from a webpage that has golf products and price information. Please convert the text into JSON format suitable for MongoDB, including only the JSON data without any additional text or explanation." },
        { role: "user", content: `Analyze the following text and answer the question: "${question}"\n\n${section}` },
      ],
    });

    let jsonString = response.choices[0].message.content.trim();
    jsonString = jsonString.replace(/```json|```/g, '').trim(); // Clean up JSON
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error processing section with OpenAI:', error);
    throw error; // Rethrow to handle later
  }
}

// Main function to read file and process each section
fs.readFile(inputFilePath, 'utf8', async (err, fileContent) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  const sections = fileContent.split(/\n\s*\n/); // Split text into sections

  try {
    // Process each section and convert to JSON
    const jsonDataPromises = sections.map(section => processSection(section));
    const jsonDataArrays = await Promise.all(jsonDataPromises);

    // Flatten arrays of JSON objects from each section
    const combinedJsonData = jsonDataArrays.flat();

    // Insert all JSON data into MongoDB
    await insertJsonData(combinedJsonData);

    console.log(combinedJsonData);

  } catch (error) {
    console.error('Error during file processing:', error);
  }
});
