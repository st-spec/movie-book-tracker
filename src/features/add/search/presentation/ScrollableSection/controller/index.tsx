"use client"

import ScrollableSectionPresentation from "../presentation"
import { Movie } from "@/types/Movie"

type Props = {
  movies: Movie[]
  onClick: (id: string) => void
}

export const ScrollableSectionController = ({ movies, onClick }: Props) => {
  return (
    <ScrollableSectionPresentation
      movies={movies}
      onClick={onClick}
    />
  )
}

export default ScrollableSectionController
