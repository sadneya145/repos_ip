const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Sample course data
const courses = [
  {
    id: 1,
    title: 'Introduction to JavaScript',
    image: 'https://via.placeholder.com/300.png/09f/fff',
    description: 'Learn the fundamentals of JavaScript, the most popular programming language for web development.',
  },
  {
    id: 2,
    title: 'React for Beginners',
    image: 'https://via.placeholder.com/300.png/09f/fff',
    description: 'Build interactive user interfaces using React, a powerful JavaScript library.',
  },
  // Add more courses as needed
];

// Endpoint to get all courses
app.get('/courses', (req, res) => {
  res.json(courses);
});

// Endpoint to handle inquiries
app.post('/inquiries', (req, res) => {
  const { name, email, message } = req.body;
  console.log('New Inquiry:', { name, email, message });
  res.status(201).json({ message: 'Inquiry received!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
