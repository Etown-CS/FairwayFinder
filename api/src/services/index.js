import fs from 'fs';  // Import fs module to write data to a file

// Sleep function to delay execution for a given time (in milliseconds)
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const services = async (app) => {
  console.log("In the services function");

  // Access the MongoDB client set on the app
  let mongoClient = app.get('mongodbClient');
  console.log('MongoClient initially:', mongoClient);

  // Add a delay to wait for MongoDB client to be set
  await sleep(3000);  // Sleep for 3 seconds (3000 ms)

  // After the sleep, check if the client is set
  mongoClient = app.get('mongodbClient');
  console.log('MongoClient after sleep:', mongoClient);

  if (!mongoClient) {
    console.log('MongoDB client is not set on the app. Please check your MongoDB connection.');
    return;  // Exit early if MongoClient is not available
  }

  // Access the database
  const database = mongoClient.db('FairwayFinderDB');  // Use the correct database name

  // List of collections we want to expose as routes
  const collections = [
    'putters', 
    'balls', 
    'drivers', 
    'fairway-woods', 
    'hybrids', 
    'irons', 
    'wedges'
  ];

  // Iterate over the collection names and create routes for them
  collections.forEach(collectionName => {
    const collection = database.collection(collectionName);
    
    if (!collection) {
      console.log(`${collectionName} collection not found!`);
      return;
    }

    // Log to confirm collection
    console.log(`Accessing ${collectionName} collection`);

    // Define a route for each collection
    app.use(`/${collectionName}`, {
      async find() {
        console.log(`In the /${collectionName} find method`);

        try {
          const items = await collection.find().toArray();  // Fetch all documents as an array
          console.log(`Fetched ${collectionName}:`, JSON.stringify(items, null, 2));  // Print data in JSON format

          // Optionally, write the data to a JSON file for each collection
          fs.writeFileSync(`${collectionName}.json`, JSON.stringify(items, null, 2));  // Writing JSON with indentation
          console.log(`${collectionName} data has been written to ${collectionName}.json`);

          return items;  // Return the fetched data as JSON
        } catch (err) {
          console.error(`Error fetching ${collectionName}:`, err.message);
          throw new Error(`Error fetching ${collectionName}: ` + err.message);
        }
      }
    });
  });
};
