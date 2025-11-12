import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppLayout from "./layout/AppLayout";
import Homepage from "./pages/Homepage/Homepage";
import MoviePage from "./pages/Movies/MoviePage";
import MovieDetailPage from "./pages/MovieDetail/MovieDetailPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import HomepageSkeleton from "./components/Skeleton/HomepageSkeleton";
import MoviePageSkeleton from "./components/Skeleton/MoviePageSkeleton";
import MovieDetailSkeleton from "./components/Skeleton/MovieDetailSkeleton";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route
            index
            element={
              <Suspense fallback={<HomepageSkeleton />}>
                <Homepage />
              </Suspense>
            }
          />
          <Route path="movies">
            <Route
              index
              element={
                <Suspense fallback={<MoviePageSkeleton />}>
                  <MoviePage />
                </Suspense>
              }
            />
            <Route
              path=":id"
              element={
                <Suspense fallback={<MovieDetailSkeleton />}>
                  <MovieDetailPage />
                </Suspense>
              }
            />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
