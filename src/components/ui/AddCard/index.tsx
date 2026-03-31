"use client"

import Link from "next/link"
import { Plus } from "lucide-react"
import styles from "./index.module.css"

const AddCard = () => {
  return (
    <Link href="/add/search" className={styles.addCard}>
      <div className={styles.iconContainer}>
        <Plus className={styles.icon} />
      </div>
    </Link>
  )
}

export default AddCard
