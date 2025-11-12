import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import MovieCardSkeleton from "./MovieCardSkeleton";
import "./Skeleton.css";

const HomepageSkeleton = () => {
  return (
    <div>
      {/* Banner Skeleton */}
      <div className="skeleton skeleton-banner">
        <div className="skeleton-banner-content">
          <div className="skeleton skeleton-banner-title"></div>
          <div className="skeleton skeleton-banner-text"></div>
          <div className="skeleton skeleton-banner-text"></div>
          <div className="skeleton skeleton-banner-text" style={{ width: '70%' }}></div>
        </div>
      </div>

      {/* Movie Slides Skeleton */}
      <Container style={{ marginTop: '30px' }}>
        {[...Array(3)].map((_, sectionIndex) => (
          <div key={sectionIndex} style={{ marginBottom: '40px' }}>
            <div className="skeleton skeleton-title" style={{ width: '200px', height: '32px', marginBottom: '20px' }}></div>
            <Row>
              {[...Array(6)].map((_, cardIndex) => (
                <Col key={cardIndex} lg={2} md={4} xs={6}>
                  <MovieCardSkeleton />
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default HomepageSkeleton;
