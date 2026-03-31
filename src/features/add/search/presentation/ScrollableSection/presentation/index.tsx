import MovieCard from "@/components/ui/MovieCard"
import { Movie } from "@/types/Movie"
import ScrollableRow from "@/components/ui/ScrollableRow/controller"
import styles from "./index.module.css"

type Props = {
  movies: Movie[]
  onClick: (id: string) => void
}

const ScrollableSectionPresentation = ({
  movies,
  onClick,
}: Props) => {
  return (
    <ScrollableRow contentClassName={styles.cardWrapper}>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          imageUrl={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          onClick={onClick}
        />
      ))}
    </ScrollableRow>
  )
}

export default ScrollableSectionPresentation
