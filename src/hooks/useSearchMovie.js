import { useQuery } from "@tanstack/react-query"
import api from "../utils/api"

const fetchSearchMovie = ({ keyword, page, sortBy, genreId }) => {
  if (keyword) {
    // 검색어가 있을 때는 search API 사용 (params로 전달하여 자동 인코딩)
    return api.get(`/search/movie`, {
      params: {
        query: keyword,
        page: page
      }
    })
  } else {
    // 검색어가 없을 때는 discover API를 사용하여 정렬과 필터 지원
    const params = {
      page: page,
      sort_by: sortBy
    }
    if (genreId) {
      params.with_genres = genreId
    }
    return api.get(`/discover/movie`, { params })
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