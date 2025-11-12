import React from "react";
import { Card } from "react-bootstrap";
import "./Skeleton.css";

const MovieCardSkeleton = () => {
  return (
    <Card className="movie-card skeleton-card">
      <div className="skeleton skeleton-image"></div>
      <Card.ImgOverlay className="overlay">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-badge"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text"></div>
      </Card.ImgOverlay>
    </Card>
  );
};

export default MovieCardSkeleton;
