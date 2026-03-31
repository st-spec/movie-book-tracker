"use client"

import { ImageOff } from "lucide-react"
import styles from "./index.module.css"

type Props = {
  className?: string
}

const NoImage = ({ className }: Props) => {
  return (
    <div className={styles.noImage}>
      <ImageOff className={styles.icon} size={32} />
      <span className={styles.text}>No Image</span>
    </div>
  )
}

export default NoImage
