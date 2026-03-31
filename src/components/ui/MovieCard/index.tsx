import Image from "next/image"
import styles from "./index.module.css"
import clsx from "clsx"
import NoImage from "@/components/ui/NoImage"

type Props = {
  id: string
  imageUrl?: string
  onClick: (id: string) => void
}

const MovieCard = ({ id, imageUrl, onClick }: Props) => {
  return (
    <div className={clsx(styles.card)} onClick={() => {onClick(id)}}>
      {imageUrl ? (
        <Image src={imageUrl} alt="" fill className={styles.image} />
      ) : (
        <NoImage />
      )}
    </div>
  )
}

export default MovieCard
