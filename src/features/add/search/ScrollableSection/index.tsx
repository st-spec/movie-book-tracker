import MovieCard from "@/components/ui/MovieCard"
import { Movie } from "@/types/Movie"
import styles from "./index.module.css"
import { useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import clsx from "clsx"

type Props = {
  movies: Movie[]
  onClick: (id: string) => void
}

const ScrollableSection = ({ movies, onClick }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [isEnd, setIsEnd] = useState(false)

  const handleScrollEvent = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current
      console.log({ scrollLeft, clientWidth, scrollWidth, sum: scrollLeft + clientWidth })
      setScrollLeft(scrollLeft)
      setIsEnd(Math.ceil(scrollLeft + clientWidth) >= scrollWidth)
    }
  }

  const handleScroll = (direction: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return
  
    const firstCard = el.children[0] as HTMLElement
    if (!firstCard) return
  
    const style = getComputedStyle(el)
    const gap = parseInt(style.columnGap || "0", 10)
  
    const scrollAmount = firstCard.offsetWidth + gap
  
    const visibleCount = Math.floor(el.clientWidth / scrollAmount) -1
    el.scrollLeft += direction === "right" ? scrollAmount * visibleCount : -scrollAmount * visibleCount
  }

  return (
    <div className={styles.scrollableSection}>
      { scrollLeft !== 0 && (
        <div className={clsx(styles.iconWrapper, styles.left)} onClick={() => handleScroll("left")}>
          <ChevronLeft size={24} className={styles.icon} />
        </div>
      )}
      <div ref={scrollRef} className={styles.cardWrapper}  onScroll={handleScrollEvent}>
        {
          movies.map((movie) => {
            return <MovieCard key={movie.id} id={movie.id} imageUrl={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} onClick={onClick}/>
          })
        }
      </div>
      { !isEnd && (
        <div className={clsx(styles.iconWrapper, styles.right)} onClick={() => handleScroll("right")}>
          <ChevronRight size={24} className={styles.icon} />
        </div>
      )}
    </div>
  )
}

export default ScrollableSection