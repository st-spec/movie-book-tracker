"use client"

import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react"
import { motion } from "framer-motion"
import styles from "./index.module.css"

export type HeroVideoRef = {
  fadeOut: () => void
  resume: () => void
}

type Props = {
  youtubeId: string
  onVideoEnd: () => void
}

const HeroVideo = forwardRef<HeroVideoRef, Props>(({ youtubeId, onVideoEnd }, ref) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const playerRef = useRef<YT.Player | null>(null)
  const initDoneRef = useRef(false)
  const youtubeIdRef = useRef(youtubeId)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  useEffect(() => {
    youtubeIdRef.current = youtubeId
  }, [youtubeId])

  useEffect(() => {
    if (initDoneRef.current || !containerRef.current) return

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
      initDoneRef.current = true
    }

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const tag = document.createElement("script")
      tag.src = "https://www.youtube.com/iframe_api"
      document.body.appendChild(tag)
    }

    if (typeof YT !== "undefined" && YT.Player) {
      initPlayer()
    } else {
      const prev = (window as unknown as { onYouTubeIframeAPIReady?: () => void }).onYouTubeIframeAPIReady
      ;(window as unknown as { onYouTubeIframeAPIReady?: () => void }).onYouTubeIframeAPIReady = () => {
        prev?.()
        initPlayer()
      }
    }

    return () => {
      playerRef.current?.destroy()
      playerRef.current = null
      initDoneRef.current = false
    }
  }, [])

  useImperativeHandle(ref, () => ({
    fadeOut: () => {
      setIsVideoPlaying(false)
    },
    resume: () => {
      if (!playerRef.current) return
      playerRef.current.loadVideoById(youtubeIdRef.current)
      playerRef.current.playVideo()
    },
  }), [])

  return (
    <motion.div
      className={styles.videoWrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVideoPlaying ? 1 : 0 }}
      transition={{ duration: 1 }}
      style={{
        pointerEvents: isVideoPlaying ? "auto" : "none",
      }}
    >
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
    </motion.div>
  )
})

HeroVideo.displayName = "HeroVideo"

export default HeroVideo