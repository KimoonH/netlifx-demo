import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import MovieCardSkeleton from "./MovieCardSkeleton";
import "./Skeleton.css";

const MoviePageSkeleton = () => {
  return (
    <div className="movie-page-container" style={{ paddingTop: '40px' }}>
      <Container>
        <Row>
          <Col lg={4} xs={12} className="filter-section">
            <div className="filter-container" style={{ padding: '20px', background: 'rgba(0, 0, 0, 0.5)', borderRadius: '12px' }}>
              <div className="skeleton skeleton-title" style={{ width: '50%', marginBottom: '20px' }}></div>
              <div className="skeleton skeleton-text" style={{ marginBottom: '15px' }}></div>
              <div className="skeleton skeleton-text" style={{ marginBottom: '15px' }}></div>
              <div className="skeleton skeleton-text" style={{ marginBottom: '15px' }}></div>
            </div>
          </Col>
          <Col lg={8} xs={12}>
            <Row>
              {[...Array(9)].map((_, index) => (
                <Col key={index} lg={4} xs={12}>
                  <MovieCardSkeleton />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MoviePageSkeleton;
