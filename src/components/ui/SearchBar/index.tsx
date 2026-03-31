"use client"

import clsx from "clsx"
import styles from "./index.module.css"
import { Search, X } from "lucide-react"

type Props = {
  value: string
  onQueryChange: (query: string) => void
}

const SearchBar = ({ value, onQueryChange }: Props) => {
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search for title..."
        value={value}
      />
      <Search className={clsx(styles.icon, styles.searchIcon)} size={18} />
      {value && (
        <X className={clsx(styles.icon, styles.xButton)} size={18} onClick={() => onQueryChange("")} />
      )}
    </div>
  )
}

export default SearchBar