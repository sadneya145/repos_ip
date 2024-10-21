// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactForm from './CourseForm';
import './App.css';

const App = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await axios.get('http://localhost:5000/api/articles');
      setArticles(response.data);
    };

    fetchArticles();
  }, []);

  return (
    <div className="container">
      <h1>Career Guidance Blog</h1>
      <div className="articles">
        {articles.map((article) => (
          <div key={article.id} className="article">
            <h2>{article.title}</h2>
            <p>{article.content}</p>
          </div>
        ))}
      </div>
      <ContactForm />
    </div>
  );
};

export default App;
