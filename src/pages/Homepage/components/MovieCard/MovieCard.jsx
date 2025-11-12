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

  const getPlaceholderImage = () => {
    // SVG 대체 이미지
    const svg = `
      <svg width="220" height="330" xmlns="http://www.w3.org/2000/svg">
        <rect width="220" height="330" fill="#1a1a1a"/>
        <g transform="translate(110, 140)">
          <path d="M -30 -40 L -30 40 L 30 40 L 30 -40 Z" fill="#333" stroke="#555" stroke-width="2"/>
          <circle cx="0" cy="-15" r="12" fill="#555"/>
          <path d="M -20 10 L 0 30 L 20 10" fill="none" stroke="#555" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <text x="110" y="220" font-family="Arial, sans-serif" font-size="16" fill="#666" text-anchor="middle">No Image</text>
        <text x="110" y="240" font-family="Arial, sans-serif" font-size="14" fill="#555" text-anchor="middle">Available</text>
      </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };

  const getImageUrl = () => {
    if (movie.poster_path) {
      return `https://media.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`;
    }
    return getPlaceholderImage();
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
        loading="lazy"
        onError={(e) => {
          e.target.src = getPlaceholderImage();
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
