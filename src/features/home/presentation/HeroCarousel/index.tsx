"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, animate } from "framer-motion"
import clsx from "clsx"
import HeroSlide, { type HeroSlideRef } from "../HeroSlide"
import styles from "./index.module.css"

const slides = [
  {
    id: 1,
    backgroundUrl: "https://image.tmdb.org/t/p/original/wMmcCe6kgQmXIC2R1UmomoIV85e.jpg",
    logoUrl: "https://media.themoviedb.org/t/p/w1280/wyar1A3DVm0ckEzJHevflEy8jHJ.png",
    youtubeId: "j2uhGWbKQwg",
  },
  {
    id: 2,
    backgroundUrl: "https://image.tmdb.org/t/p/original/muzq3LRUsmMgyZm1ndySjVX45Hi.jpg",
    logoUrl: "https://image.tmdb.org/t/p/original/uykwNyOAqRtY0xXYZS2wDBuwdAi.png",
    youtubeId: "I-PbsNYjAvM",
  },
  {
    id: 3,
    backgroundUrl: "https://image.tmdb.org/t/p/original/oUavdgphaZD0UWZYbTOzpGkZFX3.jpg",
    logoUrl: "https://image.tmdb.org/t/p/original/csUxGBd5JUIfZvzKe87hhtyXa2X.png",
    youtubeId: "uUBCIILq7Hg",
  },
  {
    id: 4,
    backgroundUrl: "https://image.tmdb.org/t/p/original/8mnXR9rey5uQ08rZAvzojKWbDQS.jpg",
    logoUrl: "https://image.tmdb.org/t/p/original/jIaAA5XzePtrJBQjGQFnmKwDz0.png",
    youtubeId: "rSfrXXthnuQ",
  },
]

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentIndexRef = useRef(0)
  const heroSlideRefs = useRef<(HeroSlideRef | null)[]>([])
  const wrapperRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 })
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const getWidth = () => wrapperRef.current?.getBoundingClientRect().width ?? 0

  // 幅の初期化とリサイズ対応
  useEffect(() => {
    const update = () => {
      const width = getWidth()
      x.set(-currentIndexRef.current * width)
      setDragConstraints({ left: -(slides.length - 1) * width, right: 0 })
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [x])

  useEffect(() => {
    // 初期スライドの再生を開始
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current)
    }
  
    resumeTimerRef.current = setTimeout(() => {
      heroSlideRefs.current[0]?.resume()
    }, 3000)
  
    return () => {
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current)
      }
    }
  }, [])

  const goTo = (nextIndex: number) => {
    if (nextIndex === currentIndexRef.current) return
    const prevIndex = currentIndexRef.current
    currentIndexRef.current = nextIndex
    setCurrentIndex(nextIndex)

    animate(x, -nextIndex * getWidth(), { duration: 0.38, ease: "easeInOut" })

    setTimeout(() => heroSlideRefs.current[prevIndex]?.fadeOut(), 500)

    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    resumeTimerRef.current = setTimeout(() => {
      heroSlideRefs.current[nextIndex]?.resume()
    }, 3000)
  }

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    const current = currentIndexRef.current
    const { x: offsetX } = info.offset

    if (offsetX < -50 && current < slides.length - 1) {
      goTo(current + 1)
    } else if (offsetX > 50 && current > 0) {
      goTo(current - 1)
    } else {
      animate(x, -current * getWidth(), { duration: 0.25, ease: "easeOut" })
    }
  }

  return (
    <div className={styles.hero}>
      <div className={styles.imageWrapper} ref={wrapperRef}>
        <motion.div
          className={styles.slidesContainer}
          style={{ x }}
          drag="x"
          dragMomentum={false}
          dragElastic={0}
          dragConstraints={dragConstraints}
          onDragEnd={handleDragEnd}
        >
          {slides.map((slide, i) => (
            <HeroSlide
              key={slide.id}
              ref={(el) => { heroSlideRefs.current[i] = el }}
              youtubeId={slide.youtubeId}
              backgroundUrl={slide.backgroundUrl}
              logoUrl={slide.logoUrl}
              onVideoEnd={() => {
                if (i !== currentIndexRef.current) return
                goTo((i + 1) % slides.length)
              }}
            />
          ))}
        </motion.div>
      </div>

      <div className={styles.dots}>
        {slides.map((_, i) => (
          <button
            key={i}
            className={clsx(styles.dot, i === currentIndex && styles.active)}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroCarousel