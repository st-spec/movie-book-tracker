"use client"

import { Movie } from "@/types/movie"
import Image from "next/image"
import styles from "./index.module.css"
import clsx from "clsx"

type Props = {
  movie: Movie
  onClick: (id: number) => void
}

const SearchResultCard = ({ movie, onClick }: Props) => {
  return(
    <div className={styles.card} onClick={() => {onClick(movie?.id)}}>
      <div className={styles.imageWrapper}>
        <Image src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : ""} fill alt="" className={styles.image} />
      </div>
      <div className={styles.descriptionWrapper}>
        <h3 className={clsx(styles.title, "line-clamp-1")}>{movie.title}</h3>
        <p className={styles.releaseDate}>{movie.release_date}</p>
        <p className={clsx(styles.description, "line-clamp-4")}>{movie.overview}</p>
      </div>
    </div>
  )

}

export default SearchResultCard