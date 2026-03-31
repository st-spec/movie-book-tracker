"use client"

import { useState, useMemo } from "react"
import HeroCarousel from "./HeroCarousel"
import SearchBar from "../../components/ui/SearchBar"
import MovieGrid from "./MovieGrid"
import { Movie } from "@/types/movie"
import styles from "./index.module.css"

const movies: Movie[] = [
  { id: 1, title: "千と千尋の神隠し", poster_path: "https://placehold.co/200x300" },
  { id: 2, title: "もののけ姫", poster_path: "https://placehold.co/200x300" },
  { id: 3, title: "君の名は", poster_path: "https://placehold.co/200x300" },
  { id: 4, title: "天気の子", poster_path: "https://placehold.co/200x300" },
  { id: 5, title: "ドライブ・マイ・カー", poster_path: "https://placehold.co/200x300" },
  { id: 6, title: "怪物", poster_path: "https://placehold.co/200x300" },
  { id: 7, title: "万引き家族", poster_path: "https://placehold.co/200x300" },
  { id: 8, title: "花束みたいな恋をした", poster_path: "https://placehold.co/200x300" },
  { id: 9, title: "DUNE", poster_path: "https://placehold.co/200x300" },
  { id: 10, title: "マッドマックス 怒りのデス・ロード", poster_path: "https://placehold.co/200x300" },
]


const HomePage = () => {
  const [query, setQuery] = useState('')

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => movie.title.includes(query))
  }, [query])

  return (
    <main className="bg-zinc-900 min-h-screen">
      <HeroCarousel />
      <div className={styles.contentsWrapper}>
        <MovieGrid movies={filteredMovies} />
      </div>
    </main>
  )
}

export default HomePage
