import React from "react";
import { useUpcomingMoviesQuery } from "../../../../hooks/useUpcomingMovies";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const UpcomingMovieSlide = () => {
  const { data, isError, error } = useUpcomingMoviesQuery();

  return (
    <MovieSlider
      title="Upcoming Movies"
      movies={data?.results}
      isError={isError}
      error={error}
      responsive={responsive}
    />
  );
};

export default UpcomingMovieSlide;
