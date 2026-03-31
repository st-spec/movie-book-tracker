"use client"

import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import clsx from "clsx"
import styles from "./index.module.css"

/** 親が ref から呼べるメソッド */
export type HeroSlideRef = {
  fadeOut: () => void
  resume: () => void
}

type Props = {
  youtubeId: string
  backgroundUrl: string
  logoUrl: string
  onVideoEnd: () => void
}

const HeroSlide = forwardRef<HeroSlideRef, Props>(({ youtubeId, backgroundUrl, logoUrl, onVideoEnd }, ref) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const playerRef = useRef<YT.Player | null>(null)
  const youtubeIdRef = useRef(youtubeId)

  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  // 最新の youtubeId を ref に保持（resume で使う）
  useEffect(() => {
    youtubeIdRef.current = youtubeId
  }, [youtubeId])

  // マウント時に1回だけ YouTube プレイヤーを作成
  useEffect(() => {
    const initPlayer = () => {
      if (!containerRef.current) return
      if (typeof YT === "undefined" || !YT.Player) {
        setTimeout(initPlayer, 100)
        return
      }
      if (playerRef.current) return

      playerRef.current = new YT.Player(containerRef.current, {
        videoId: youtubeId,
        playerVars: {
          autoplay: 0,
          mute: 1,
          controls: 0,
          modestbranding: 1,
        },
        events: {
          onStateChange: (event: YT.OnStateChangeEvent) => {
            if (event.data === YT.PlayerState.PLAYING) {
              setIsVideoPlaying(true)
            }
            if (event.data === YT.PlayerState.ENDED) {
              setIsVideoPlaying(false)
              onVideoEnd()
            }
          },
        },
      })
    }

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const tag = document.createElement("script")
      tag.src = "https://www.youtube.com/iframe_api"
      document.body.appendChild(tag)
    }

    if (typeof YT !== "undefined" && YT.Player) {
      initPlayer()
    } else {
      const prev = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        prev?.()
        initPlayer()
      }
    }

    return () => {
      playerRef.current?.destroy()
      playerRef.current = null
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps -- youtubeId / onVideoEnd は resume() と onStateChange で扱うため再初期化しない
  }, [])

  // ref から fadeOut / resume を呼べるようにする
  useImperativeHandle(ref, () => ({
    fadeOut: () => setIsVideoPlaying(false),
    resume: () => {
      if (!playerRef.current) return
      playerRef.current.loadVideoById(youtubeIdRef.current)
      playerRef.current.playVideo()
    },
  }), [])

  return (
    <div
      className={styles.slide}
      // PCドラッグ時に画像がブラウザの「画像ドラッグ」として扱われ、
      // 変なゴースト/持ち出し表示になるのを防ぎます
      onDragStart={(e) => e.preventDefault()}
    >
              <Image
                src={backgroundUrl}
                alt=""
                fill
                className={styles.image}
                draggable={false}
              />
              <div className={clsx(styles.logoWrapper, isVideoPlaying && styles.isPlaying)}>
                <Image
                  src={logoUrl}
                  alt=""
                  fill
                  className={styles.logoImage}
                  draggable={false}
                />
              </div>
    <motion.div
      className={styles.videoWrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVideoPlaying ? 1 : 0 }}
      transition={{ duration: 1 }}
      style={{ pointerEvents: "none" }}
    >
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
    </motion.div>
    
    </div>
  )
})

HeroSlide.displayName = "HeroSlide"

export default HeroSlide
