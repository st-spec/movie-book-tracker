export type Movie = {
  id: number
  title: string
  poster_path: string
  release_date?: string
  genre_ids?: number[]
  overview?: string
}