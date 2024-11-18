import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from "react-router-dom";
import { API_URL } from '../context';
import "./SingleMovie.css"

const MovieCard = ({ movie }) => (
  <div className="movie-card">
    <figure>
      <img src={movie.Poster} alt={`Poster of ${movie.Title}`} />
    </figure>
    <div className="movie-info">
      <p className="title">{movie.Title}</p>
      <p>{movie.Plot}</p>
      <p className="card-text">Released: {movie.Released}</p>
      <p className="card-text">Genre: {movie.Genre}</p>
      <p className="card-text">Rating: {movie.imdbRating}/10</p>
      <NavLink to="/" className="back-btn">Back</NavLink>
    </div>
  </div>
);

const SingleMovie = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  const getMovies = async (url) => {
    setIsLoading(true);
    setError(null); // Reset error state before fetching
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.Response === "True") {
        setMovie(data);
      } else {
        setError(data.Error); // Set error message if movie not found
      }
    } catch (error) {
      setError("An error occurred while fetching the movie data."); // Set generic error message
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timerOut = setTimeout(() => {
      getMovies(`${API_URL}&i=${id}`);
    }, 1000);
    
    return () => clearTimeout(timerOut);
  }, [id]);


if (isLoading) {
  return (
    <div className="movie-section">
      <div className="loading">Loading...</div>
    </div>
    );
}

if (error) {
  return (
    <div className="movie-section">
      <div className="error">{error}</div>
    </div>
  );
}

return (
  <section className="movie-section">
    {movie && <MovieCard movie={movie} />}
  </section>
);

};


export default SingleMovie;
