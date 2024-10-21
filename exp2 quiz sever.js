// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Load questions
const questions = require('./questions.json');

// GET endpoint to fetch questions
app.get('/api/questions', (req, res) => {
  res.json(questions);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
