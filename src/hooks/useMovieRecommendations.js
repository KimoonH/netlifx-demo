import { useQuery } from "@tanstack/react-query"
import api from "../utils/api"

const fetchMovieRecommendations = (id) => {
    return api.get(`/movie/${id}/recommendations`)
}

export const useMovieRecommendationsQuery = (id) => {
    return useQuery({
        queryKey: ['movie-recommendations', id],
        queryFn: () => fetchMovieRecommendations(id),
        select: (result) => result.data,
    })
}
