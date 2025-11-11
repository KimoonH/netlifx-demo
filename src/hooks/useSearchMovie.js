import { useQuery } from "@tanstack/react-query"
import api from "../utils/api"

const fetchSearchMovie = ({ keyword, page, sortBy, genreId }) => {
  if (keyword) {
    // 검색어가 있을 때는 search API 사용
    return api.get(`/search/movie?query=${keyword}&page=${page}`)
  } else {
    // 검색어가 없을 때는 discover API를 사용하여 정렬과 필터 지원
    let url = `/discover/movie?page=${page}&sort_by=${sortBy}`
    if (genreId) {
      url += `&with_genres=${genreId}`
    }
    return api.get(url)
  }
}

export const useSearchMovieQuery = ({ keyword, page, sortBy = "popularity.desc", genreId = "" }) => {
  return useQuery({
    queryKey: ['movie-search', { keyword, page, sortBy, genreId }],
    queryFn: () => fetchSearchMovie({ keyword, page, sortBy, genreId }),
    select: (result) => result.data,
    suspense: true,
  })
}