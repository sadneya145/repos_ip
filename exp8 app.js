import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <h1>Recipe Showcase</h1>
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipe/:id" element={<RecipeDetailWrapper />} />
        </Routes>
      </div>
    </Router>
  );
}

// Wrapper component to pass params as props
function RecipeDetailWrapper({ match }) {
  const id = window.location.pathname.split("/").pop(); // Extract the id from the URL path
  return <RecipeDetail id={id} />;
}

function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/recipes')
      .then((response) => setRecipes(response.data))
      .catch((error) => console.error('Error fetching recipes:', error));
  }, []);

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="recipe-card">
          <h2>{recipe.name}</h2>
          <img src={recipe.image} alt={recipe.name} className="recipe-image" />
          <Link to={`/recipe/${recipe.id}`} className="view-recipe-button">
            View Recipe
          </Link>
        </div>
      ))}
    </div>
  );
}

function RecipeDetail({ id }) {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/recipes/${id}`)
      .then((response) => setRecipe(response.data))
      .catch((error) => console.error('Error fetching recipe details:', error));
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="recipe-detail">
      <h2>{recipe.name}</h2>
      <img src={recipe.image} alt={recipe.name} className="recipe-image" />
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <p>{recipe.instructions}</p>
    </div>
  );
}

export default App;
