import { MongoClient } from 'mongodb';

export const mongodb = async (app) => {
  const mongoUri = app.get('mongodb');  // Get Mongo URI from app config
  console.log('MongoDB URI:', mongoUri);  // Log Mongo URI to ensure it's correct

  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(mongoUri, {
      useNewUrlParser: true,  // These options are now deprecated but can be ignored in recent versions
      useUnifiedTopology: true // These options are now deprecated but can be ignored in recent versions
    });

    console.log('MongoDB connected successfully!');

    // Explicitly set the MongoDB client to the app
    app.set('mongodbClient', client);  // Set the whole client, not just the database
    console.log("client set!");

    //console.log('MongoDB client set to app:', client);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('MongoDB connection failed');
  }
};
