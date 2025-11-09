import React from "react";
import { useTopRatedMoviesQuery } from "../../../../hooks/useTopRatedMovies";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const TopRatedMovieSlide = () => {
  const { data, isLoading, isError, error } = useTopRatedMoviesQuery();

  return (
    <MovieSlider
      title="Top Rated Movies"
      movies={data?.results}
      isLoading={isLoading}
      isError={isError}
      error={error}
      responsive={responsive}
    />
  );
};

export default TopRatedMovieSlide;
