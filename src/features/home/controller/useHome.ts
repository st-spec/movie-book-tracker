import { useRouter, useSearchParams } from "next/navigation"
import { MovieRecord } from "@/types/MovieRecord"
import { Movie } from "@/types/Movie"
import { useEffect, useState } from "react"

export const useHome = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedMovieId = searchParams.get("movieId")
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    const getRecords = (): MovieRecord[] | null => {
      try {
        const data: MovieRecord[] = JSON.parse(localStorage.getItem("movieRecords") ?? "[]")
        return data
      } catch { return null }
    }

    const records = getRecords()
    const mappedMovies = records?.map((record) => {
      const movie: Movie = {
        id: record.movieId,
        title: record.title,
        poster_path: record.poster_path
      }
      return movie
    }) ?? []
    setMovies(mappedMovies)
  }, [])

  const handleSelectMovie = (id: string | number) => {
    router.push(`?movieId=${id}`, { scroll: false })
  }

  const handleCloseModal = () => {
    router.push("?", { scroll: false })
  }

  return {
    movies,
    selectedMovieId,
    handleSelectMovie,
    handleCloseModal,
  }
}
