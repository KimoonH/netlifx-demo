import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const PopularMovieSlide = () => {
  const { data, isError, error } = usePopularMoviesQuery();

  return (
    <MovieSlider
      title="Popular Movies"
      movies={data?.results}
      isError={isError}
      error={error}
      responsive={responsive}
    />
  );
};

export default PopularMovieSlide;
