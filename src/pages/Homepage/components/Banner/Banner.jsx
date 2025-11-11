import React from "react";
import { Alert } from "react-bootstrap";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import "./Banner.style.css";

const Banner = () => {
  const { data, isError, error } = usePopularMoviesQuery();

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  const movie = data?.results[0];
  const backgroundImage = movie?.poster_path
    ? `https://media.themoviedb.org/t/p/w533_and_h300_bestv2${movie.poster_path}`
    : "https://via.placeholder.com/533x300/1a1a1a/white?text=No+Image";

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
      className="banner"
    >
      <div className="text-white banner-text-area">
        <h1>{movie?.title}</h1>
        <p>{movie?.overview}</p>
      </div>
    </div>
  );
};

export default Banner;
