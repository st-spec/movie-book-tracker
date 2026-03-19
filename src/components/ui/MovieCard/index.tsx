import Image from "next/image"
import styles from "./index.module.css"
import clsx from "clsx"

type Props = {
  imageUrl: string
}

const MovieCard = ({ imageUrl }: Props) => {
  return (
    <div className={clsx(styles.card)}>
      <Image src={imageUrl} alt="" fill className={styles.image} />
    </div>
  )
}

export default MovieCard
