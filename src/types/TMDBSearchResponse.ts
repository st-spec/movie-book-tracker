import { Movie } from "./movie"

export type TMDBSearchResponse = {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}