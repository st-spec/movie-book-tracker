import MovieCard from "@/components/ui/MovieCard"
import styles from "./index.module.css"

const movies = [
  { id: 1, imageUrl: "https://placehold.co/200x300" },
  { id: 2, imageUrl: "https://placehold.co/200x300" },
  { id: 3, imageUrl: "https://placehold.co/200x300" },
  { id: 4, imageUrl: "https://placehold.co/200x300" },
  { id: 5, imageUrl: "https://placehold.co/200x300" },
  { id: 6, imageUrl: "https://placehold.co/200x300" },
  { id: 7, imageUrl: "https://placehold.co/200x300" },
  { id: 8, imageUrl: "https://placehold.co/200x300" },
  { id: 9, imageUrl: "https://placehold.co/200x300" },
  { id: 10, imageUrl: "https://placehold.co/200x300" }
]

const MovieGrid = () => {
  return (
    <div className={styles.grid}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} imageUrl={movie.imageUrl} />
      ))}
    </div>
  )
}

export default MovieGrid
