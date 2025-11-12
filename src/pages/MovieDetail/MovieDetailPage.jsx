import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMovieDetailQuery } from "../../hooks/useMovieDetail";
import { useMovieReviewsQuery } from "../../hooks/useMovieReviews";
import { useMovieRecommendationsQuery } from "../../hooks/useMovieRecommendations";
import { useMovieVideosQuery } from "../../hooks/useMovieVideos";
import { Container, Row, Col, Badge, Alert, Card, Button, Modal } from "react-bootstrap";
import YouTube from "react-youtube";
import MovieCard from "../Homepage/components/MovieCard/MovieCard";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import "./MovieDetailPage.style.css";

const MovieDetailPage = () => {
  const { id } = useParams();
  const { data: movie, isError, error } = useMovieDetailQuery(id);
  const { data: reviewData, isLoading: reviewLoading, isError: reviewError } = useMovieReviewsQuery(id);
  const { data: recommendationsData, isLoading: recommendationsLoading } = useMovieRecommendationsQuery(id);
  const { data: videoData } = useMovieVideosQuery(id);
  const [expandedReviews, setExpandedReviews] = useState({});
  const [showTrailer, setShowTrailer] = useState(false);

  const handleCloseTrailer = () => setShowTrailer(false);
  const handleShowTrailer = () => setShowTrailer(true);

  // 영화 ID가 변경될 때마다 페이지 상단으로 스크롤
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [id]);

  if (isError) {
    return (
      <ErrorMessage
        error={error}
        context="detail"
        onRetry={() => window.location.reload()}
      />
    );
  }

  const toggleReview = (reviewId) => {
    setExpandedReviews(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const truncateText = (text, maxLength = 300) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const formatBudget = (budget) => {
    if (!budget || budget === 0) return "정보 없음";
    return `$${budget.toLocaleString()}`;
  };

  const getPlaceholderImage = () => {
    // SVG 대체 이미지
    const svg = `
      <svg width="300" height="450" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="450" fill="#1a1a1a"/>
        <g transform="translate(150, 200)">
          <path d="M -40 -60 L -40 60 L 40 60 L 40 -60 Z" fill="#333" stroke="#555" stroke-width="3"/>
          <circle cx="0" cy="-20" r="18" fill="#555"/>
          <path d="M -30 15 L 0 45 L 30 15" fill="none" stroke="#555" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <text x="150" y="310" font-family="Arial, sans-serif" font-size="22" fill="#666" text-anchor="middle">No Image</text>
        <text x="150" y="340" font-family="Arial, sans-serif" font-size="18" fill="#555" text-anchor="middle">Available</text>
      </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };

  const posterUrl = movie?.poster_path
    ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`
    : getPlaceholderImage();

  const backdropUrl = movie?.backdrop_path
    ? `https://www.themoviedb.org/t/p/original${movie.backdrop_path}`
    : null;

  return (
    <div className="movie-detail-page page-container">
      {backdropUrl && (
        <div
          className="backdrop-container"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        >
          <div className="backdrop-overlay"></div>
        </div>
      )}

      <Container className="detail-content">
        <Row>
          <Col lg={4} md={5} xs={12} className="poster-column">
            <img
              src={posterUrl}
              alt={movie?.title}
              className="movie-poster"
              loading="lazy"
              onError={(e) => {
                e.target.src = getPlaceholderImage();
              }}
            />
          </Col>

          <Col lg={8} md={7} xs={12} className="info-column">
            <h1 className="movie-title">{movie?.title}</h1>

            <div className="movie-tagline">
              {movie?.tagline && <em>"{movie.tagline}"</em>}
            </div>

            <div className="genre-section">
              {movie?.genres?.map((genre) => (
                <Badge key={genre.id} bg="danger" className="genre-badge-detail">
                  {genre.name}
                </Badge>
              ))}
            </div>

            {videoData?.results && videoData.results.length > 0 && (
              <div className="trailer-section">
                <Button
                  variant="danger"
                  size="lg"
                  onClick={handleShowTrailer}
                  className="trailer-button"
                >
                  🎬 예고편 보기
                </Button>
              </div>
            )}

            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">⭐ 평점</span>
                <span className="info-value">
                  {movie?.vote_average?.toFixed(1)} / 10
                </span>
              </div>

              <div className="info-item">
                <span className="info-label">🔥 인기도</span>
                <span className="info-value">
                  {movie?.popularity?.toFixed(0)}
                </span>
              </div>

              <div className="info-item">
                <span className="info-label">📅 개봉일</span>
                <span className="info-value">{movie?.release_date}</span>
              </div>

              <div className="info-item">
                <span className="info-label">💰 예산</span>
                <span className="info-value">{formatBudget(movie?.budget)}</span>
              </div>

              <div className="info-item">
                <span className="info-label">⏱️ 러닝타임</span>
                <span className="info-value">{movie?.runtime}분</span>
              </div>
            </div>

            <div className="overview-section">
              <h3>줄거리</h3>
              <p className="overview-text">
                {movie?.overview || "줄거리 정보가 없습니다."}
              </p>
            </div>
          </Col>
        </Row>

        {/* 리뷰 섹션 */}
        <Row className="mt-5">
          <Col xs={12}>
            <div className="reviews-section">
              <h2 className="reviews-title">
                리뷰 ({reviewData?.results?.length || 0})
              </h2>

              {reviewLoading && (
                <div className="text-center text-white">리뷰를 불러오는 중...</div>
              )}

              {reviewError && (
                <Alert variant="warning" style={{ backgroundColor: 'rgba(255, 193, 7, 0.1)', borderColor: 'rgba(255, 193, 7, 0.5)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '24px' }}>⚠️</span>
                    <div>
                      <strong>리뷰를 불러올 수 없습니다</strong>
                      <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem' }}>리뷰 정보를 가져오는 중 문제가 발생했습니다.</p>
                    </div>
                  </div>
                </Alert>
              )}

              {!reviewLoading && reviewData?.results?.length === 0 && (
                <div className="no-reviews">
                  <p>아직 작성된 리뷰가 없습니다.</p>
                </div>
              )}

              {reviewData?.results?.map((review) => (
                <Card
                  key={review.id}
                  className="review-card"
                  style={{ backgroundColor: 'rgba(26, 26, 26, 0.95)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <Card.Body style={{ backgroundColor: 'transparent' }}>
                    <div className="review-header">
                      <div className="review-author-section">
                        <h5 className="review-author">👤 {review.author}</h5>
                        <span className="review-date">
                          {formatDate(review.created_at)}
                        </span>
                      </div>
                      {review.author_details?.rating && (
                        <div className="review-rating-box">
                          <Badge bg="warning" className="review-rating">
                            ⭐ {review.author_details.rating}
                          </Badge>
                          <span className="rating-label">/ 10</span>
                        </div>
                      )}
                    </div>

                    <div className="review-divider"></div>

                    <Card.Text className="review-content">
                      {expandedReviews[review.id]
                        ? review.content
                        : truncateText(review.content)}
                    </Card.Text>

                    {review.content.length > 300 && (
                      <Button
                        variant="link"
                        className="read-more-btn"
                        onClick={() => toggleReview(review.id)}
                      >
                        {expandedReviews[review.id] ? "▲ 접기" : "▼ 더보기"}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Col>
        </Row>

        {/* 추천 영화 섹션 */}
        <Row className="mt-5">
          <Col xs={12}>
            <div className="recommendations-section">
              <h2 className="recommendations-title">
                추천 영화
              </h2>

              {recommendationsLoading && (
                <div className="text-center text-white">추천 영화를 불러오는 중...</div>
              )}

              {!recommendationsLoading && recommendationsData?.results?.length === 0 && (
                <div className="no-recommendations">
                  <p>추천 영화가 없습니다.</p>
                </div>
              )}

              {recommendationsData?.results && recommendationsData.results.length > 0 && (
                <div className="recommendations-grid">
                  {recommendationsData.results.slice(0, 6).map((movie) => (
                    <div key={movie.id} className="recommendation-item">
                      <MovieCard movie={movie} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>

      {/* 예고편 Modal */}
      <Modal
        show={showTrailer}
        onHide={handleCloseTrailer}
        size="lg"
        centered
        className="trailer-modal"
      >
        <Modal.Header closeButton style={{ backgroundColor: '#000', borderBottom: '1px solid #333' }}>
          <Modal.Title style={{ color: '#fff' }}>예고편</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#000', padding: 0 }}>
          {videoData?.results && videoData.results.length > 0 && (
            <YouTube
              videoId={videoData.results[0].key}
              opts={{
                width: '100%',
                height: '450',
                playerVars: {
                  autoplay: 1,
                  modestbranding: 1,
                  rel: 0,
                },
              }}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MovieDetailPage;
