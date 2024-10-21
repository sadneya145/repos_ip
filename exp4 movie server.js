// server.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

// Sample movie data
const movies = [
  {
    id: 1,
    title: 'Inception',
    year: 2010,
    genre: 'Science Fiction',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology.',
  },
  {
    id: 2,
    title: 'The Godfather',
    year: 1972,
    genre: 'Crime',
    description: 'The aging patriarch of an organized crime dynasty transfers control to his reluctant son.',
  },
  {
    id: 3,
    title: 'The Dark Knight',
    year: 2008,
    genre: 'Action',
    description: 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.',
  },
];

// GET request to fetch movie list
app.get('/api/movies', (req, res) => {
  res.json(movies);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
