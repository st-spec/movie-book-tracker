import Image from "next/image"
import styles from "./index.module.css"
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

type CastMember = { id: number; name: string; character: string; profile_path: string | null }
type CrewMember = { id: number; name: string; job: string; profile_path: string | null; credit_id: string }
type Props = { creditsData?: { cast: CastMember[]; crew: CrewMember[] } }

const Row = ({ label, people, sub }: { label: string; people: CrewMember[] | CastMember[]; sub?: (p: CastMember) => string }) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [isEnd, setIsEnd] = useState(false)
  
  const handleScrollEvent = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current
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
  
    const visibleCount = Math.floor(el.clientWidth / scrollAmount)
    el.scrollLeft += direction === "right" ? scrollAmount * visibleCount : -scrollAmount * visibleCount
  }

  useEffect(()=>{
    handleScrollEvent()
  },[])
  
  return (
    <>
      {people.length === 0 ? null : (
        <div>
          <p className={styles.label}>{label}</p>
          <div className={styles.rowWrapper}>
            { scrollLeft !== 0 && (
              <div className={clsx(styles.iconWrapper, styles.left)} onClick={() => handleScroll("left")}>
                <ChevronLeft size={24} className={styles.icon} />
              </div>
            )}
          <div className={styles.peopleWrapper} ref={scrollRef} onScroll={handleScrollEvent}>
            {people.map(p => (
              <div key={"credit_id" in p ? p.credit_id : p.id} className={styles.personWrapper}>
                <div className={styles.imageWrapper}>
                  {p.profile_path && <Image src={`https://image.tmdb.org/t/p/w200${p.profile_path}`} alt="" fill className={styles.image} />}
                </div>
                <p className={styles.name}>{p.name}</p>
                {sub && ("character" in p) && <p className={styles.character}>{sub(p)}</p>}
              </div>
            ))}
          </div>
          { !isEnd && (
              <div className={clsx(styles.iconWrapper, styles.right)} onClick={() => handleScroll("right")}>
                <ChevronRight size={24} className={styles.icon} />
              </div>
            )}
            </div>
        </div>
      )}
    </>
  )
}

const CastTab = ({ creditsData }: Props) => {
  const directors = creditsData?.crew.filter(c => c.job === "Director") ?? []
  const writers = creditsData?.crew.filter(c => c.job === "Screenplay") ?? []
  const cast = creditsData?.cast ?? []

  return (
    <div className={styles.castWrapper}>
      <Row label="監督" people={directors} />
      <Row label="脚本" people={writers} />
      <Row label="キャスト" people={cast.slice(0, 20)} sub={p => p.character} />
    </div>
  )
}
export default CastTab