import MovieCard from "@/components/ui/MovieCard"
import { Movie } from "@/types/movie"
import styles from "./index.module.css"

type Props = {
  movies: Movie[]
}

const MovieGrid = ({movies}: Props) => {
  return (
    <div className={styles.grid}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} id={movie.id} imageUrl={movie.poster_path} onClick={()=>{}} />
      ))}
    </div>
  )
}

export default MovieGrid
