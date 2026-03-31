import MovieCard from "@/components/ui/MovieCard"
import { Movie } from "@/types/Movie"
import styles from "./index.module.css"

type Props = {
  movies: Movie[]
  onClick: (movieId: string) => void
}

const MovieGrid = ({movies, onClick}: Props) => {
  return (
    <div className={styles.grid}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} id={movie.id} imageUrl={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} onClick={onClick} />
      ))}
    </div>
  )
}

export default MovieGrid
