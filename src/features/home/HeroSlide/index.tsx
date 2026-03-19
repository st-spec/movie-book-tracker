"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import clsx from "clsx"
import HeroVideo, { type HeroVideoRef } from "../HeroVideo"
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
    backgroundUrl: "https://placehold.co/1200x600/333/fff?text=Background+3",
    logoUrl: "https://placehold.co/300x100/333/fff?text=Logo+3",
    youtubeId: "CvgSMDHb21s",
  },
]

const HeroSlide = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
const heroVideoRefs = useRef<(HeroVideoRef | null)[]>([])

const goToNext = () => {
  setCurrentIndex((prev) => (prev + 1) % slides.length)
  setTimeout(() => heroVideoRefs.current[currentIndex]?.fadeOut(), 500)
}

const goTo = (index: number) => {
  if (index === currentIndex) return
  setCurrentIndex(index)
  setTimeout(() => heroVideoRefs.current[currentIndex]?.fadeOut(), 500)
}

useEffect(() => {
  heroVideoRefs.current[currentIndex]?.fadeOut()
  const timer = setTimeout(() => {
    heroVideoRefs.current[currentIndex]?.resume()
  }, 3000)

  return () => clearTimeout(timer)
}, [currentIndex])

  return (
    <div className={styles.hero}>
      <div className={styles.imageWrapper}>
        <motion.div
          className={styles.slidesContainer}
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {slides.map((slide, i) => (
            <div key={slide.id} className={styles.slide}>
              <Image
                src={slide.backgroundUrl}
                alt=""
                fill
                className={styles.image}
              />
              <div className={styles.logoWrapper}>
                <Image
                  src={slide.logoUrl}
                  alt=""
                  fill
                  className={styles.logoImage}
                />
              </div>
              <HeroVideo
  ref={(el) => { heroVideoRefs.current[i] = el }}
  youtubeId={slide.youtubeId}
  onVideoEnd={goToNext}
/>
            </div>
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

export default HeroSlide