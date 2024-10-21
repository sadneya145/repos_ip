// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Sample articles data
const articles = [
  {
    id: 1,
    title: "Navigating Your Career Path",
    content: "This article discusses how to choose the right career path based on your skills and interests.",
  },
  {
    id: 2,
    title: "Building a Strong Resume",
    content: "Learn tips and tricks for creating a resume that stands out to employers.",
  },
  {
    id: 3,
    title: "Interview Preparation Tips",
    content: "Get prepared for interviews with these helpful strategies and common questions.",
  },
];

// GET request to fetch articles
app.get('/api/articles', (req, res) => {
  res.json(articles);
});

// POST request to capture user inquiries
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Contact inquiry from ${name} (${email}): ${message}`);
  res.status(201).json({ message: 'Inquiry received, thank you!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
