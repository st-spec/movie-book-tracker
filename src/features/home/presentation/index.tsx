"use client"

import HeroCarousel from "./HeroCarousel"
import MovieGrid from "./MovieGrid"
import MovieModal from "@/components/ui/MovieModal"
import styles from "./index.module.css"
import { Movie } from "@/types/Movie"

type Props = {
  movies: Movie[]
  selectedMovieId: string | null
  onSelectMovie: (id: string | number) => void
  onCloseModal: () => void
}

const HomePresentation = ({
  movies,
  selectedMovieId,
  onSelectMovie,
  onCloseModal,
}: Props) => {
  return (
    <main className="bg-zinc-900 min-h-screen">
      <HeroCarousel />
      <div className={styles.contentsWrapper}>
        <MovieGrid movies={movies} onClick={onSelectMovie} />
      </div>
      {selectedMovieId && (
        <MovieModal
          movieId={selectedMovieId}
          onClose={onCloseModal}
        />
      )}
    </main>
  )
}

export default HomePresentation
