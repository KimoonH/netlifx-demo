import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Alert } from "react-bootstrap";
import MovieCard from "../../pages/Homepage/components/MovieCard/MovieCard";
import { getErrorMessage } from "../../utils/errorHandler";
import "./MovieSlider.style.css";

const MovieSlider = ({ title, movies, isError, error, responsive }) => {
  if (isError) {
    const errorInfo = getErrorMessage(error);
    return (
      <div className="movie-slider-container" style={{ padding: '20px 0' }}>
        <h3>{title}</h3>
        <Alert
          variant="danger"
          style={{
            backgroundColor: 'rgba(220, 53, 69, 0.1)',
            borderColor: 'rgba(220, 53, 69, 0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <span style={{ fontSize: '24px' }}>{errorInfo.icon}</span>
          <div>
            <strong>{errorInfo.title}</strong>
            <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem' }}>{errorInfo.message}</p>
          </div>
        </Alert>
      </div>
    );
  }

  return (
    <div className="movie-slider-container">
      <h3>{title}</h3>
      <Carousel
        infinite={true}
        centerMode={true}
        itemClass="movie-slider p-1"
        containerClass="carousel-container"
        responsive={responsive}
      >
        {movies.map((movie, index) => (
          <MovieCard movie={movie} key={index} />
        ))}
      </Carousel>
    </div>
  );
};

export default MovieSlider;
