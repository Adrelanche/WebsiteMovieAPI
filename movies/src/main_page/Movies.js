import React from 'react'
import { useGlobalContext } from '../context'
import { NavLink } from 'react-router-dom';
import "./Movies.css"

const imgUrl = "";


const Movies = () => {
  
  const { movie, isLoading } = useGlobalContext();
  //Show the loading while the information don't appear
  if (isLoading) {
    return <div className="loading">Loading....</div>;
  }

  //return the selected informations of the movies
  return (
    <>
      <section className="movie-page">
        <div className="grid grid-4-col">
          {movie ? movie.map((curMovieElem) => {
                const { imdbID, Title, Poster, Year } = curMovieElem;
                const movieName = Title.substring(0, 15);
                //return a link of the selected movie with the name, img and the year of release
                return (
                  <NavLink to={`movie/${imdbID}`} key={imdbID}>
                    <div className="card">
                      <div className="card-info">
                        <h2>{movieName.length >= 15 ? `${movieName}...`: movieName}</h2>
                        <img src={Poster === "N/A" ? imgUrl : Poster} alt="#" />
                        <h3>{Year}</h3>
                      </div>
                    </div>
                  </NavLink>
                );
              })
            : ""}
        </div>
      </section>
    </>
  );
};

export default Movies