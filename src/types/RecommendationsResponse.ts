import { TMDBSearchResponse } from "./TMDBSearchResponse"

export type RecommendationsResponse = {
  popularData: TMDBSearchResponse
  upcopmingData: TMDBSearchResponse
  recommendedData: TMDBSearchResponse
}