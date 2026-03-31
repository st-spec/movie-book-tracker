"use client"

import { useSearch } from "./useSearch"
import SearchPresentation from "../presentation"

export const SearchController = () => {
  const {
    query,
    setQuery,
    debounceQuery,
    movies,
    recommendationsData,
    isLoading,
    setSize,
    isReachingEnd,
    selectedMovieId,
    handleSelectMovie,
    handleCloseModal,
  } = useSearch()

  return (
    <SearchPresentation
      query={query}
      onQueryChange={setQuery}
      debounceQuery={debounceQuery}
      movies={movies}
      recommendationsData={recommendationsData}
      isLoading={isLoading}
      isReachingEnd={isReachingEnd}
      onLoadMore={() => setSize(prev => prev + 1)}
      selectedMovieId={selectedMovieId}
      onSelectMovie={handleSelectMovie}
      onCloseModal={handleCloseModal}
    />
  )
}

export default SearchController
