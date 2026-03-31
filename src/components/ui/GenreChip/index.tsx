import styles from "./index.module.css"

type Props = {
  genre: string
}

const GenreChip = ({ genre }: Props) => {
  return(
    <span className={styles.chip}>{genre}</span>
  )
}

export default GenreChip