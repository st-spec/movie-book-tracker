"use client"

import SearchBar from "@/components/ui/SearchBar"
import { useDebounce } from "@/hooks/useDebounce"
import { TMDBSearchResponse } from "@/types/TMDBSearchResponse"
import { useState } from "react"
import useSWRInfinite from "swr/infinite"
import useSWR from "swr"
import SearchResultCard from "./SearchResultCard"
import styles from "./index.module.css"
import clsx from "clsx"
import { RecommendationsResponse } from "@/types/RecommendationsResponse"
import ScrollableSection from "./ScrollableSection"
import { ChevronDown } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import MovieModal from "@/components/ui/MovieModal"

const fetcher = (url: string) => fetch(url).then(res => res.json())

const Search = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedMovieId = searchParams.get("movieId")
  const [ query, setQuery ] = useState("")
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

  const handleSelectMovie = (id: number) => {
    router.push(`?movieId=${id}`)
  }

  return (
    <main className="bg-zinc-900 min-h-screen">
      <div className={styles.searchWrapper}>
        <SearchBar value={query} onQueryChange={(value) => setQuery(value)} />
      </div>
      {debounceQuery ? (
        <div className={clsx(styles.resultsWrapper, "divide-y", "divide-yellow-400")}>
          {
          movies.map((movie) => {
            return <SearchResultCard key={movie.id} movie={movie} onClick={(id) => handleSelectMovie(id)} />
          })
          }
        {!(isLoading || (size === totalPages)) && (
          <div className={styles.readMoreWrapper} onClick={() => setSize(size + 1)}>
            <ChevronDown className={styles.readMore} size={24} />
          </div>
        )}
        </div>
      ) : (
        <div className={styles.recommendationssWrapper}>
          {/* <div className={styles.sectionWrapper}>
            <h3 className={styles.topic}>Recommend for you</h3>
            <ScrollableSection movies={recommendationsData?.recommendedData.results ?? []} />
          </div> */}
          <div className={styles.sectionWrapper}>
            <h3 className={styles.topic}>Popular</h3>
            <ScrollableSection movies={recommendationsData?.popularData.results ?? []} onClick={(id) => handleSelectMovie(id)} />
          </div>
          <div className={styles.sectionWrapper}>
            <h3 className={styles.topic}>Coming soon</h3>
            <ScrollableSection movies={recommendationsData?.upcopmingData.results ?? []} onClick={(id) => handleSelectMovie(id)} />
          </div>
        </div>
      )}
      {selectedMovieId && (
        <MovieModal
          movieId={selectedMovieId}
          onClose={() => router.push("?")}
        />
      )}
    </main>
  )
}

export default Search