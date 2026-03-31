"use client"

import { Movie } from "@/types/Movie"
import Image from "next/image"
import styles from "./index.module.css"
import clsx from "clsx"
import NoImage from "@/components/ui/NoImage"

type Props = {
  movie: Movie
  onClick: (id: string | number) => void
}

const SearchResultCard = ({ movie, onClick }: Props) => {
  const imageUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : null
  
  return(
    <div className={styles.card} onClick={() => {onClick(movie?.id)}}>
      <div className={styles.imageWrapper}>
        {imageUrl ? (
          <Image src={imageUrl} fill alt="" className={styles.image} />
        ) : (
          <NoImage />
        )}
      </div>
      <div className={styles.descriptionWrapper}>
        <h3 className={clsx(styles.title, "line-clamp-1")}>{movie.title}</h3>
        <p className={styles.releaseDate}>{movie.release_date}</p>
        <p className={clsx(styles.description, "line-clamp-5")}>{movie.overview}</p>
      </div>
    </div>
  )
}

export default SearchResultCard