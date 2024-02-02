import express from 'express';
import process from 'node:process';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('port', PORT);

// Add your Global middleware here
app.use(bodyParser.json());
app.use(cors());

// Error handling middleware
app.use((err, _, res, __) => {
  console.error(err.stack);

  return res.status(500).json({
    error: err?.message ?? 'Something went wrong',
  });
});

// This file is created to facilitate the retrieval of the Express App instance 
// without the need for initialization
export default app;
