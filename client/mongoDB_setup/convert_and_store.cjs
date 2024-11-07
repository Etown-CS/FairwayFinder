require('dotenv').config();
const fs = require('fs');
const { OpenAI } = require('openai');
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const mongoose = require('mongoose'); // Mongoose to interact with MongoDB

// Define the question here
const question = "Convert the following raw text data into JSON format suitable for MongoDB, where each entry represents an individual item with relevant fields. Use the correct key for each field that corresponds with each value within the break statements. The fields are brand name, product title, price, and website based on the context of the text data. Ensure that the JSON is well-structured and ready for insertion into a MongoDB collection. Make sure that there are no missing quotation marks, commas, braces, and brackets at all. Also make sure that all strings are terminated and that the JSON string is fully complete. Make sure that there are no syntax errors in the JSON string.";

// File path
const inputFilePath = "example_data.txt";

// Initialize OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Feathers app setup
const app = express(feathers());

// MongoDB URI and connection setup
const mongoUri = `mongodb+srv://samh:${encodeURIComponent(process.env.DATABASE_PSSWD)}@fairwayfinder.stoif.mongodb.net/FairwayFinder?retryWrites=true&w=majority&tls=true`;

console.log("Mongo URI: ", mongoUri);

// Connect to MongoDB using Mongoose
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

// Define the MongoDB Schema and Model for the 'GolfData' collection
const golfDataSchema = new mongoose.Schema({
  brandName: String,
  productTitle: String,
  price: String,
  website: String
});

const GolfDataModel = mongoose.model('GolfData', golfDataSchema);

// Feathers Service that interacts with Mongoose Model
class GolfDataService {
  constructor() {
    this.model = GolfDataModel;
  }

  async create(data) {
    try {
      const newDocument = new this.model(data);
      return await newDocument.save();
    } catch (error) {
      throw new Error('Error inserting data into MongoDB: ' + error.message);
    }
  }
}

// Register the custom service with Feathers
app.use('/GolfData', new GolfDataService());

// Function to insert JSON data using Feathers service
async function insertJsonData(jsonData) {
  try {
    const service = app.service('GolfData');
    const result = await service.create(jsonData); // Use the custom service's create method
    console.log(`${result.length} documents were inserted`); // This will return an array of documents
  } catch (error) {
    console.error('Error inserting data into MongoDB:', error);
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

    // Insert all JSON data into MongoDB using custom Feathers service
    await insertJsonData(combinedJsonData);

    console.log(combinedJsonData);

  } catch (error) {
    console.error('Error during file processing:', error);
  }
});
