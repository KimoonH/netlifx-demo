import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Skeleton.css";

const MovieDetailSkeleton = () => {
  return (
    <div className="skeleton-detail-page">
      <Container>
        <Row>
          <Col lg={4} md={5} xs={12} className="poster-column">
            <div className="skeleton skeleton-poster"></div>
          </Col>

          <Col lg={8} md={7} xs={12} className="info-column">
            <div className="skeleton skeleton-detail-title"></div>
            <div className="skeleton skeleton-detail-subtitle"></div>

            <div className="genre-section" style={{ marginBottom: '20px' }}>
              <div className="skeleton skeleton-genre-badge"></div>
              <div className="skeleton skeleton-genre-badge"></div>
              <div className="skeleton skeleton-genre-badge"></div>
            </div>

            <div className="skeleton-info-grid">
              <div className="skeleton skeleton-info-item"></div>
              <div className="skeleton skeleton-info-item"></div>
              <div className="skeleton skeleton-info-item"></div>
              <div className="skeleton skeleton-info-item"></div>
            </div>

            <div className="skeleton-overview">
              <div className="skeleton skeleton-overview-title"></div>
              <div className="skeleton skeleton-overview-text"></div>
              <div className="skeleton skeleton-overview-text"></div>
              <div className="skeleton skeleton-overview-text"></div>
              <div className="skeleton skeleton-overview-text" style={{ width: '70%' }}></div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MovieDetailSkeleton;
