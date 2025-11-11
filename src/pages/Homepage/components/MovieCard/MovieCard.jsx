import React from "react";
import { Badge, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./MovieCard.style.css";
import { useMovieGenreQuery } from "../../../../hooks/useMovieGenre";

const MovieCard = ({ movie }) => {
  const { data: genreData } = useMovieGenreQuery();
  const navigate = useNavigate();

  const showGenre = (genreIdList) => {
    if (!genreData) return [];
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });
    return genreNameList;
  };

  const getImageUrl = () => {
    if (movie.poster_path) {
      return `https://media.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`;
    }
    return "https://via.placeholder.com/220x330/1a1a1a/white?text=No+Image";
  };

  const handleCardClick = () => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <Card className="movie-card" onClick={handleCardClick} style={{ cursor: "pointer" }}>
      <Card.Img
        variant="top"
        src={getImageUrl()}
        alt={movie.title}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/220x330/1a1a1a/white?text=No+Image";
        }}
      />
      <Card.ImgOverlay className="overlay">
        <Card.Title className="movie-title">{movie.title}</Card.Title>
        <div className="genre-badges">
          {showGenre(movie.genre_ids).map((id) => (
            <Badge bg="danger" key={id} className="me-1 mb-1">
              {id}
            </Badge>
          ))}
        </div>
        <div className="movie-info">
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
        </div>
      </Card.ImgOverlay>
    </Card>
  );
};

export default MovieCard;
