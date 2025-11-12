import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import ErrorMessage from "../../../../components/ErrorMessage/ErrorMessage";
import "./Banner.style.css";

const Banner = () => {
  const { data, isError, error } = usePopularMoviesQuery();

  if (isError) {
    return (
      <div style={{ minHeight: '400px' }}>
        <ErrorMessage
          error={error}
          context="list"
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  const getPlaceholderImage = () => {
    // SVG 대체 이미지 (Banner용 가로형)
    const svg = `
      <svg width="533" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="533" height="300" fill="#1a1a1a"/>
        <g transform="translate(266.5, 120)">
          <path d="M -35 -50 L -35 50 L 35 50 L 35 -50 Z" fill="#333" stroke="#555" stroke-width="3"/>
          <circle cx="0" cy="-15" r="16" fill="#555"/>
          <path d="M -25 20 L 0 45 L 25 20" fill="none" stroke="#555" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <text x="266.5" y="220" font-family="Arial, sans-serif" font-size="20" fill="#666" text-anchor="middle">No Image Available</text>
      </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };

  const movie = data?.results[0];
  const backgroundImage = movie?.poster_path
    ? `https://media.themoviedb.org/t/p/w533_and_h300_bestv2${movie.poster_path}`
    : getPlaceholderImage();

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
