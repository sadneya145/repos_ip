const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Sample recipe data (could be replaced with a database in a real-world app)
const recipes = [
  {
    id: 1,
    name: 'Spaghetti Carbonara',
    image: 'https://th.bing.com/th/id/R.c2aaf32ff00b4e508ffde1d98099187f?rik=k8h3KqtQjEvoJg&riu=http%3a%2f%2fwww.dumpaday.com%2fwp-content%2fuploads%2f2017%2f02%2fthe-random-pictures-14.jpg&ehk=Up3aRTCN0QqKpd5LcPVVFpyn9Lg7lPn2jHcTQZJkSQc%3d&risl=&pid=ImgRaw&r=0',
    ingredients: ['Spaghetti', 'Eggs', 'Pancetta', 'Parmesan', 'Black pepper'],
    instructions: 'Boil pasta. Fry pancetta. Mix eggs and cheese. Combine all ingredients.'
  },
  {
    id: 2,
    name: 'Chicken Biryani',
    image: 'https://th.bing.com/th/id/R.c2aaf32ff00b4e508ffde1d98099187f?rik=k8h3KqtQjEvoJg&riu=http%3a%2f%2fwww.dumpaday.com%2fwp-content%2fuploads%2f2017%2f02%2fthe-random-pictures-14.jpg&ehk=Up3aRTCN0QqKpd5LcPVVFpyn9Lg7lPn2jHcTQZJkSQc%3d&risl=&pid=ImgRaw&r=0',
    ingredients: ['Rice', 'Chicken', 'Yogurt', 'Spices', 'Onions'],
    instructions: 'Marinate chicken. Cook rice. Layer rice and chicken. Cook on low heat.'
  }
];

// Endpoint to get all recipes
app.get('/recipes', (req, res) => {
  res.json(recipes);
});

// Endpoint to get a single recipe by ID
app.get('/recipes/:id', (req, res) => {
  const recipe = recipes.find(r => r.id === parseInt(req.params.id));
  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).json({ message: 'Recipe not found' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
