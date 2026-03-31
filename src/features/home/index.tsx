"use client"

import HeroCarousel from "./HeroCarousel"
import MovieGrid from "./MovieGrid"
import { Movie } from "@/types/Movie"
import styles from "./index.module.css"
import { MovieRecord } from "@/types/MovieRecord"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import MovieModal from "@/components/ui/MovieModal"

const HomePage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedMovieId = searchParams.get("movieId")

  const handleSelectMovie = (id: string) => {
    router.push(`?movieId=${id}`)
  }

  const getRecords = (): MovieRecord[] | null => {
    try {
      const data: MovieRecord[] = JSON.parse(localStorage.getItem("movieRecords") ?? "[]")
      return data
    } catch { return null }
  }
  
  const records = getRecords();
  const movies= records?.map((record)=>{
    const movie: Movie = {
      id: record.movieId,
      title: record.title,
      poster_path: record.poster_path
    }
    return movie
  }) ?? []
  
  return (
    <main className="bg-zinc-900 min-h-screen">
      <HeroCarousel />
      <div className={styles.contentsWrapper}>
        <MovieGrid movies={movies} onClick={handleSelectMovie} />
      </div>
      {selectedMovieId && (
        <MovieModal
          movieId={selectedMovieId}
          onClose={() => router.push("?")}
        />
      )}
    </main>
  )
}

export default HomePage
