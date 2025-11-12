import React, { useState, useMemo, useEffect } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Badge } from "react-bootstrap";
import MovieCard from "../Homepage/components/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import "./MoviePage.style.css";

// 경로 2 가지
// nav바에서 클릭해서 온 경우 => popular Moive 보여주기
// keyword를 입력해서 온 경우 => keyword와 관련된 영홛르을 보여줌
const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [selectedGenre, setSelectedGenre] = useState("");
  const keyword = query.get("q");
  const { data: genreData } = useMovieGenreQuery();
  const { data, isError, error } = useSearchMovieQuery({
    keyword,
    page,
    sortBy: keyword ? undefined : sortBy, // 검색어가 있으면 API 정렬 비활성화
    genreId: selectedGenre,
  });

  // 검색어가 변경되면 첫 페이지로 초기화
  useEffect(() => {
    setPage(1);
  }, [keyword]);

  // 클라이언트 사이드 정렬 함수
  const sortMovies = (movies, sortOption) => {
    if (!movies) return [];

    const sortedMovies = [...movies];
    const [field, order] = sortOption.split('.');

    sortedMovies.sort((a, b) => {
      let aValue = a[field];
      let bValue = b[field];

      // 날짜 필드인 경우 날짜 객체로 변환
      if (field === 'release_date') {
        aValue = new Date(aValue || '1900-01-01');
        bValue = new Date(bValue || '1900-01-01');
      }

      if (order === 'desc') {
        return bValue > aValue ? 1 : bValue < aValue ? -1 : 0;
      } else {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      }
    });

    return sortedMovies;
  };

  // 정렬된 영화 목록 (useMemo로 최적화)
  const sortedMovies = useMemo(() => {
    if (keyword && data?.results) {
      // 검색 결과는 클라이언트에서 정렬
      return sortMovies(data.results, sortBy);
    }
    return data?.results || [];
  }, [data?.results, sortBy, keyword]);

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setPage(1);
  };

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId === selectedGenre ? "" : genreId);
    setPage(1);
  };

  const handleResetFilters = () => {
    setSortBy("popularity.desc");
    setSelectedGenre("");
    setPage(1);
  };

  const handleClearSearch = () => {
    navigate("/movies");
  };

  if (isError) {
    const context = keyword ? "search" : "list";
    return (
      <ErrorMessage
        error={error}
        context={context}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="movie-page-container page-container">
      <Container>
      <Row>
        <Col lg={4} xs={12} className="filter-section">
          <div className="filter-container">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>필터</h5>
              <Button variant="outline-danger" size="sm" onClick={handleResetFilters}>
                초기화
              </Button>
            </div>

            {/* 정렬 옵션 */}
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="mb-0">정렬</h6>
                {keyword && (
                  <Badge bg="info" style={{ fontSize: '0.7rem' }}>
                    검색 결과 정렬
                  </Badge>
                )}
              </div>
              <Form.Select value={sortBy} onChange={handleSortChange}>
                <option value="popularity.desc">📈 인기도 높은순</option>
                <option value="popularity.asc">📉 인기도 낮은순</option>
                <option value="vote_average.desc">⭐ 평점 높은순</option>
                <option value="vote_average.asc">⭐ 평점 낮은순</option>
                <option value="release_date.desc">📅 최신순</option>
                <option value="release_date.asc">📅 오래된순</option>
              </Form.Select>
            </div>

            {/* 장르 필터 */}
            <div className="mb-4">
              <h6 className="mb-2">장르</h6>
              <div className="genre-filter">
                {genreData?.map((genre) => (
                  <Badge
                    key={genre.id}
                    bg={selectedGenre === genre.id ? "danger" : "secondary"}
                    className="genre-badge"
                    onClick={() => handleGenreClick(genre.id)}
                    style={{ cursor: "pointer" }}
                  >
                    {genre.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Col>
        <Col lg={8} xs={12}>
          {sortedMovies.length > 0 ? (
            <>
              <div className="results-info mb-3 d-flex justify-content-between align-items-center">
                <span style={{ color: '#999', fontSize: '0.95rem' }}>
                  총 {sortedMovies.length}개의 영화
                  {keyword && ` - "${keyword}" 검색 결과`}
                </span>
                {keyword && (
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={handleClearSearch}
                    style={{ fontSize: '0.85rem' }}
                  >
                    ✕ 검색 지우기
                  </Button>
                )}
              </div>
              <Row>
                {sortedMovies.map((movie, index) => (
                  <Col key={movie.id || index} lg={4} xs={12}>
                    <MovieCard movie={movie} />
                  </Col>
                ))}
              </Row>
            </>
          ) : (
            <div className="no-results">
              <p style={{ color: '#999', textAlign: 'center', padding: '40px' }}>
                검색 결과가 없습니다.
              </p>
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center mt-4">
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={Math.min(data?.total_pages || 1, 500)}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={page - 1}
          />
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default MoviePage;
