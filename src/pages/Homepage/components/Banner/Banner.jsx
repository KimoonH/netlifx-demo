import React from "react";
import { Alert, Spinner } from "react-bootstrap";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import "./Banner.style.css";

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  if (isLoading) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" variant="danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://media.themoviedb.org/t/p/w533_and_h300_bestv2${data?.results[0].poster_path}` +
          ")",
      }}
      className="banner"
    >
      <div className="text-white banner-text-area">
        <h1>{data?.results[0].title}</h1>
        <p>{data?.results[0].overview}</p>
      </div>
    </div>
  );
};

export default Banner;
