import { useState } from "react"
import { useDebounce } from "@/hooks/useDebounce"
import useSWRInfinite from "swr/infinite"
import useSWR from "swr"
import { useRouter, useSearchParams } from "next/navigation"
import { TMDBSearchResponse } from "@/types/TMDBSearchResponse"
import { RecommendationsResponse } from "@/types/RecommendationsResponse"

const fetcher = (url: string) => fetch(url).then(res => res.json())

export const useSearch = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedMovieId = searchParams.get("movieId")
  const [query, setQuery] = useState("")
  const debounceQuery = useDebounce(query, 500)

  const { data: recommendationsData } = useSWR<RecommendationsResponse>(
    debounceQuery ? null : "/api/recommendations",
    fetcher
  )

  const getKey = (page: number, previousData: TMDBSearchResponse) => {
    if (previousData?.total_pages === page + 1) {
      return null
    }
    return debounceQuery ? `/api/search?q=${debounceQuery}&page=${page + 1}` : null
  }

  const { data, size, setSize, isLoading } = useSWRInfinite(getKey, fetcher)
  const movies = data?.flatMap(page => page.data.results) ?? []
  const lastPage = data?.[data.length - 1]
  const totalPages = lastPage?.data.total_pages ?? 0
  const isReachingEnd = size === totalPages

  const handleSelectMovie = (id: string | number) => {
    router.push(`?movieId=${id}`)
  }

  const handleCloseModal = () => {
    router.push("?")
  }

  return {
    query,
    setQuery,
    debounceQuery,
    movies,
    recommendationsData,
    isLoading,
    size,
    setSize,
    isReachingEnd,
    selectedMovieId,
    handleSelectMovie,
    handleCloseModal,
  }
}
