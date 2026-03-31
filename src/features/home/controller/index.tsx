"use client"

import { useHome } from "./useHome"
import HomePresentation from "../presentation"

export const HomeController = () => {
  const {
    movies,
    selectedMovieId,
    handleSelectMovie,
    handleCloseModal,
  } = useHome()

  return (
    <HomePresentation
      movies={movies}
      selectedMovieId={selectedMovieId}
      onSelectMovie={handleSelectMovie}
      onCloseModal={handleCloseModal}
    />
  )
}

export default HomeController
