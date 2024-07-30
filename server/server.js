import './dotenv-config.js';
import cors from 'cors';

import express from 'express';
import path from 'path';

import { checkGameName, combineReferenceData, getObjectById } from './helperFuncs.js';

const app = express();

// Enable for all CORS origins
app.use(cors());

const PORT = process.env.PORT || 3000;

// Middleware to serve static files from the 'public' directory
app.use(express.static(path.resolve('./public')));

// Route to serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.resolve('./public/index.html'));
});

app.get("/:gameName/refData.json", async (req, res) => {
  const { gameName } = req.params;
  console.log(`Fetching reference data for ${gameName}`);
  try {
    const gameExists = await checkGameName(gameName);
    if (!gameExists) {
      return res.status(404).json({ error: 'Game not found' });
    }
    console.log(`Combining reference data for ${gameName}`);

    const combinedData = await combineReferenceData(gameName);
    // console.log(`Combined data: ${JSON.stringify(combinedData)}`);
    
    res.json(combinedData);
  } catch (err) {
    console.error('Error:',err);
    res.status(500).json({ error: err.message });
  }
});

// Catch-all route for serving a 404 page
app.get('*', (req, res) => {
  res.status(404).sendFile(path.resolve('./public/404.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
