// TODO: Add a script that takes the scraped data and runs right before this one that formats the scraped web data before passing it into gpt.
// Change GPT prompts accordingly

require('dotenv').config();
const fs = require('fs');
const { OpenAI } = require('openai');
const mongoose = require('mongoose'); // Mongoose to interact with MongoDB

// Define the question here
const question = "Convert the following raw text data into JSON format suitable for MongoDB, where each entry represents an individual item with relevant fields. Use the correct key for each field that corresponds with each value within the break statements. The fields are brandName, productTitle, price, and website based on the context of the text data. The website field for each individual entry in a group of deals will be at the bottom of the corresponding chunk of gold deals in Website: <b>website</b> format. Ensure that the JSON is well-structured and ready for insertion into a MongoDB collection. Make sure that there are no missing quotation marks, commas, braces, and brackets at all. Also make sure that all strings are terminated and that the JSON string is fully complete. Make sure there are no syntax errors in the JSON string. Make sure you don't miss any product field!!!";

// File path
const inputFilePath = "example_data.txt";

// Initialize OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// MongoDB URI and connection setup
const mongoUri = `mongodb+srv://samh:${encodeURIComponent(process.env.DATABASE_PSSWD)}@fairwayfinder.stoif.mongodb.net/FairwayFinderDB?retryWrites=true&w=majority&tls=true`;

console.log("Mongo URI: ", mongoUri);

// Connect to MongoDB using Mongoose
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB - success!');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

// Define the MongoDB Schema for the collections
const golfDataSchema = new mongoose.Schema({
  brandName: String,
  productTitle: String,
  price: String,
  website: String
});

// Function to insert JSON data into MongoDB
async function insertJsonData(jsonData, collectionType) {
  try {
    console.log(`Inserting into collection: ${collectionType}`); // Log the collection being used
    console.log(`${jsonData.length} items to be inserted into ${collectionType}`);  // Log the data being inserted

    // Dynamically define the collection based on the collectionType passed
    const model = mongoose.model(collectionType, golfDataSchema);
    await model.deleteMany(); // Clear the collection before inserting new data
    const newDocuments = await model.insertMany(jsonData);
    console.log(`Inserted ${newDocuments.length} documents into ${collectionType} collection`);
    return newDocuments;
  } catch (error) {
    console.error('Error inserting data into MongoDB:', error);
    throw error;
  }
}

// Function to call OpenAI API and process each section
async function processSection(section) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Ensure you have access to the correct model
      messages: [
        { role: "system", content: "You are an AI that analyzes a text file with info from a webpage that has golf products and price information. Please convert the text into JSON format suitable for MongoDB, including only the JSON data without any additional text or explanation." },
        { role: "user", content: `Analyze the following text and answer the question: "${question}"\n\n${section}` },
      ],
    });

    let jsonString = response.choices[0].message.content.trim();
    jsonString = jsonString.replace(/```json|```/g, '').trim(); // Clean up JSON

    try {
      const jsonData = JSON.parse(jsonString);
      console.log(`Parsed JSON data for section: ${section.slice(0, 100)}...`); // Log the first 100 characters of the section
      return jsonData;
    } catch (parseError) {
      console.error(`Failed to parse JSON response: ${jsonString}`);
      throw parseError;
    }
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
  console.log(`Total sections to process: ${sections.length}`);

  try {
    // Process each section and convert to JSON
    const jsonDataPromises = sections.map(section => processSection(section));
    const jsonDataArrays = await Promise.all(jsonDataPromises);

    // Flatten arrays of JSON objects from each section
    const combinedJsonData = jsonDataArrays.flat();
    console.log(`Total products to insert: ${combinedJsonData.length}`);

    // Group products by collection type
    const collections = {
      "putters": [],
      "drivers": [],
      "balls": [],
      "irons": [],
      "fairway-woods": [],
      "hybrids": [],
      "wedges": []
    };

    combinedJsonData.forEach(product => {
      // Ensure required fields are present
      if (product.brandName && product.productTitle && product.price) {
        // Handle missing website field
        product.website = product.website || 'Unknown';

        // Determine the collection type
        if (product.productTitle.toLowerCase().includes('putter')) {
          collections.putters.push(product);
        } else if (product.productTitle.toLowerCase().includes('driver')) {
          collections.drivers.push(product);
        } else if (product.productTitle.toLowerCase().includes('ball')) {
          collections.balls.push(product);
        } else if (product.productTitle.toLowerCase().includes('iron')) {
          collections.irons.push(product);
        } else if (product.productTitle.toLowerCase().includes('fairway')) {
          collections['fairway-woods'].push(product);
        } else if (product.productTitle.toLowerCase().includes('hybrid')) {
          collections.hybrids.push(product);
        } else if (product.productTitle.toLowerCase().includes('wedge')) {
          collections.wedges.push(product);
        } else {
          console.error('Error: Unknown product type', product);
        }
      } else {
        console.error('Error: Missing required fields', product);
      }
    });

    // Insert data into respective collections
    for (const [collectionType, data] of Object.entries(collections)) {
      if (data.length > 0) {
        await insertJsonData(data, collectionType);
      }
    }

  } catch (error) {
    console.error('Error during file processing:', error);
  } finally {
    // Close the mongoose connection when done
    mongoose.connection.close().then(() => {
      console.log('Mongoose connection closed');
    }).catch((closeError) => {
      console.error('Error closing mongoose connection:', closeError);
    });
  }
});