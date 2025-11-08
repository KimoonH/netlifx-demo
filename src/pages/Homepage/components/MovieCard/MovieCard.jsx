import React from "react";
import { Badge, Card } from "react-bootstrap";
import "./MovieCard.style.css";

const MovieCard = ({ movie }) => {
  return (
    <Card className="movie-card">
      <Card.Img
        variant="top"
        src={`https://media.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`}
        alt={movie.title}
      />
      <Card.ImgOverlay className="overlay">
        <Card.Title className="movie-title">{movie.title}</Card.Title>
        <div className="genre-badges">
          {movie.genre_ids.map((id) => (
            <Badge bg="danger" key={id} className="me-1 mb-1">
              {id}
            </Badge>
          ))}
        </div>
        <Card.Text className="movie-info">
          <div className="info-item">
            <strong>⭐ Rating:</strong> {movie.vote_average.toFixed(1)}
          </div>
          <div className="info-item">
            <strong>🔥 Popularity:</strong> {movie.popularity.toFixed(0)}
          </div>
          <div className="info-item">
            <strong>📅 Release:</strong> {movie.release_date}
          </div>
          <div className="info-item">
            <Badge bg={movie.adult ? "warning" : "success"}>
              {movie.adult ? "18+" : "All Ages"}
            </Badge>
          </div>
        </Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
};

export default MovieCard;
