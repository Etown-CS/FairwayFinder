require('dotenv').config();
const fs = require('fs');
const { OpenAI } = require('openai');
const mongoose = require('mongoose'); // Mongoose to interact with MongoDB

// Define the question here
const question = "Convert the following raw text data into JSON format suitable for MongoDB, where each entry represents an individual item with relevant fields. Use the correct key for each field that corresponds with each value within the break statements. The fields are brandName, productTitle, price, and website based on the context of the text data. For the website field, that data is found at the bottom of each chunk of golf deals right after each group of deals. Please make sure that every product gets assigned its corresponding website with its full path url, which again is either directly underneath or seperated by a spece underneath a shunk of gold products for a specific equipment type. For each group of deals with no spaces, the corresponding website for each deal will be the next hit Website field underneath. Ensure that the JSON is well-structured and ready for insertion into a MongoDB collection. Make sure that there are no missing quotation marks, commas, braces, and brackets at all. Also, make sure that all strings are terminated and that the JSON string is fully complete. Make sure there are no syntax errors in the JSON string. Make sure you don't miss any product field!!!";

// File path
const inputFilePath = "deals_with_websites.txt";

console.log("API Key before OpenAI request:", process.env.OPENAI_API_KEY);

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
    console.log(`Inserting into collection: ${collectionType}`);
    console.log(`${jsonData.length} items to be inserted into ${collectionType}`);

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
      console.log(`Parsed JSON data for section: ${section.slice(0, 100)}...`);
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
    console.log('Combined JSON Data:', JSON.stringify(combinedJsonData, null, 2));
    console.log(`Total products to insert: ${combinedJsonData.length}`);

    // Group products by collection type
    const collections = {
      "putters": [],
      "drivers": [],
      "balls": [],
      "irons": [],
      "fairway-woods": [],
      "hybrids": [],
      "wedges": [],
      "gloves": []
    };

    // Main function to process products and clean brand and website names
    combinedJsonData.forEach(product => {
      if (!product.productTitle) {
        console.error('Warning: Missing productTitle for product', product);
        return; // Skip this product if productTitle is missing
      }

      let category;

      // Identify the category by matching productTitle
      if (product.productTitle.toLowerCase().includes('driver')) {
        category = 'drivers';
      } else if (product.productTitle.toLowerCase().includes('fairway')) {
        category = 'fairway-woods';
      } else if (product.productTitle.toLowerCase().includes('hybrid')) {
        category = 'hybrids';
      } else if (product.productTitle.toLowerCase().includes('iron')) {
        category = 'irons';
      } else if (product.productTitle.toLowerCase().includes('putter')) {
        category = 'putters';
      } else if (product.productTitle.toLowerCase().includes('wedge')) {
        category = 'wedges';
      } else if (product.productTitle.toLowerCase().includes('ball')) {
        category = 'balls';
      } else if (product.productTitle.toLowerCase().includes('glove')) {
        category = 'gloves';
      } else {
        console.error(`Warning: Could not determine category for product: ${product.productTitle}`);
        return; // Skip this product if no category is matched
      }

      // Assign category directly to collections
      if (category) {
        collections[category]?.push(product);
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