import dotenv from 'dotenv';
import { feathers } from '@feathersjs/feathers';
import configuration from '@feathersjs/configuration';
import {
  koa,
  rest,
  bodyParser,
  errorHandler,
  parseAuthentication,
  cors
} from '@feathersjs/koa';
import socketio from '@feathersjs/socketio';
import { mongodb } from './mongodb.js'; // MongoDB connection logic
import { services } from './services/index.js'; // Import services
import { channels } from './channels.js';

console.log("running");

// Load environment variables
dotenv.config();

// Feathers app setup
const app = koa(feathers());

// Define allowed origins explicitly
const allowedOrigins = [
  'https://fairway-finder-git-backend-wetzeltanners-projects.vercel.app/', // Replace with your actual Vercel URL
  'http://localhost:3000'
];

// Middleware and configurations
app.configure(configuration())
   .use(cors({
     origin: allowedOrigins,
     credentials: true
   }))
   .use(errorHandler())
   .use(parseAuthentication())
   .use(bodyParser());

// Configure Feathers transports
app.configure(rest());
app.configure(socketio({
  cors: {
    origin: allowedOrigins,
    credentials: true
  }
}));

const psswd = process.env.DATABASE_PSSWD;
console.log("psswd:");
console.log(psswd); // Consider removing in production

// MongoDB URI and connection setup
const mongoUri = `mongodb+srv://samh:${encodeURIComponent(psswd)}@fairwayfinder.stoif.mongodb.net/FairwayFinderDB?retryWrites=true&w=majority&tls=true`;

// Set MongoDB URI on the app config
app.set('mongodb', mongoUri);

// Initialize MongoDB connection and Feathers app
async function initializeApp() {
  try {
    console.log('Initializing MongoDB connection...');
   
    const mongoClient = await app.configure(mongodb);

    if (!mongoClient) {
      throw new Error('MongoDB client is not set on the app.');
    }

    console.log('MongoDB client connected:', mongoClient);

    app.configure(services);
    app.configure(channels);

    const port = 3031;
    const host = '0.0.0.0';
    app.listen(port).then(() => {
      console.log(`Feathers app is listening on http://${host}:${port}`);
    });
  } catch (error) {
    console.error('Error initializing app:', error);
  }
}

initializeApp();

export { app };



