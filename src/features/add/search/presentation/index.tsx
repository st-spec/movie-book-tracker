"use client"

import SearchBar from "@/components/ui/SearchBar"
import SearchResultCard from "./SearchResultCard"
import ScrollableSection from "./ScrollableSection/controller"
import MovieModal from "@/components/ui/MovieModal"
import { ChevronDown } from "lucide-react"
import clsx from "clsx"
import styles from "./index.module.css"
import { RecommendationsResponse } from "@/types/RecommendationsResponse"

type Props = {
  query: string
  onQueryChange: (query: string) => void
  debounceQuery: string
  movies: any[]
  recommendationsData?: RecommendationsResponse
  isLoading: boolean
  isReachingEnd: boolean
  onLoadMore: () => void
  selectedMovieId: string | null
  onSelectMovie: (id: string | number) => void
  onCloseModal: () => void
}

const SearchPresentation = ({
  query,
  onQueryChange,
  debounceQuery,
  movies,
  recommendationsData,
  isLoading,
  isReachingEnd,
  onLoadMore,
  selectedMovieId,
  onSelectMovie,
  onCloseModal,
}: Props) => {
  return (
    <main className="bg-zinc-900 min-h-screen">
      <div className={styles.searchWrapper}>
        <SearchBar value={query} onQueryChange={onQueryChange} />
      </div>
      {debounceQuery ? (
        <div className={clsx(styles.resultsWrapper)}>
          {movies.map((movie) => (
            <SearchResultCard key={movie.id} movie={movie} onClick={onSelectMovie} />
          ))}
          {! (isLoading || isReachingEnd) && (
            <div className={styles.readMoreWrapper} onClick={onLoadMore}>
              <span className={styles.readMoreText}>Read More</span>
              <ChevronDown className={styles.readMoreIcon} size={20} />
            </div>
          )}
        </div>
      ) : (
        <div className={styles.recommendationsWrapper}>
          <div className={styles.sectionWrapper}>
            <h3 className={styles.topic}>Popular</h3>
            <ScrollableSection movies={recommendationsData?.popularData.results ?? []} onClick={onSelectMovie} />
          </div>
          <div className={styles.sectionWrapper}>
            <h3 className={styles.topic}>Coming soon</h3>
            <ScrollableSection movies={recommendationsData?.upcopmingData.results ?? []} onClick={onSelectMovie} />
          </div>
        </div>
      )}
      {selectedMovieId && (
        <MovieModal
          movieId={selectedMovieId}
          onClose={onCloseModal}
        />
      )}
    </main>
  )
}

export default SearchPresentation
