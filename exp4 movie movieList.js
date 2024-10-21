// src/MovieList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get('http://localhost:5000/api/movies');
      setMovies(response.data);
    };

    fetchMovies();
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="movie-container">
      <h1>Static Movie Database</h1>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie" onClick={() => handleMovieClick(movie)}>
            <h2>{movie.title}</h2>
            <p>Year: {movie.year}</p>
            <p>Genre: {movie.genre}</p>
          </div>
        ))}
      </div>
      {selectedMovie && (
        <div className="movie-details">
          <h2>{selectedMovie.title}</h2>
          <p>{selectedMovie.description}</p>
          <button onClick={handleCloseDetails}>Close</button>
        </div>
      )}
    </div>
  );
};

export default MovieList;
