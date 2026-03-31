import Image from "next/image"
import styles from "./index.module.css"
import clsx from "clsx"

type Props = {
  id: number
  imageUrl: string
  onClick: (id: number) => void
}

const MovieCard = ({ id, imageUrl, onClick }: Props) => {
  return (
    <div className={clsx(styles.card)} onClick={() => {onClick(id)}}>
      <Image src={imageUrl} alt="" fill className={styles.image} />
    </div>
  )
}

export default MovieCard
