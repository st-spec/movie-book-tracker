import { useRef, useState, useCallback, useEffect } from "react"

export const useScrollable = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isStart, setIsStart] = useState(false)
  const [isEnd, setIsEnd] = useState(false)

  const updateScrollStatus = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current
      // 許容誤差を考慮
      setIsStart(scrollLeft > 1)
      setIsEnd(Math.ceil(scrollLeft + clientWidth) < scrollWidth)
    }
  }, [])

  const handleScrollTo = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return

    const firstCard = el.children[0] as HTMLElement
    if (!firstCard) return

    const style = getComputedStyle(el)
    const gap = parseInt(style.columnGap || "0", 10)

    const scrollAmount = firstCard.offsetWidth + gap
    // 表示されている要素の数だけスクロール。最低1つ
    const visibleCount = Math.max(1, Math.floor(el.clientWidth / scrollAmount) - 1)
    const finalScrollAmount = direction === "right" ? scrollAmount * visibleCount : -scrollAmount * visibleCount
    
    el.scrollBy({ left: finalScrollAmount, behavior: "smooth" })
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (el) {
      updateScrollStatus()
      el.addEventListener("scroll", updateScrollStatus)
      window.addEventListener("resize", updateScrollStatus)

      // MutationObserverで要素の増減検知（データ読み込み時など）
      const observer = new MutationObserver(updateScrollStatus)
      observer.observe(el, { childList: true, subtree: true })

      return () => {
        el.removeEventListener("scroll", updateScrollStatus)
        window.removeEventListener("resize", updateScrollStatus)
        observer.disconnect()
      }
    }
  }, [updateScrollStatus])

  return {
    scrollRef,
    isStart,
    isEnd,
    handleScrollTo,
    updateScrollStatus,
  }
}
