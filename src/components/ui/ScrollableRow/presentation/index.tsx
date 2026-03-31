import React, { ReactNode, RefObject } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import styles from "./index.module.css"
import clsx from "clsx"

type Props = {
  children: ReactNode
  scrollRef: RefObject<HTMLDivElement | null>
  isStart: boolean
  isEnd: boolean
  onScrollTo: (direction: "left" | "right") => void
  contentClassName?: string
  wrapperClassName?: string
  size?: 'md' | 'sm'
}

const ScrollableRowPresentation = ({
  children,
  scrollRef,
  isStart,
  isEnd,
  onScrollTo,
  contentClassName,
  wrapperClassName,
  size = 'md',
}: Props) => {
  return (
    <div className={clsx(styles.scrollableRow, styles[size], wrapperClassName)}>
      {isStart && (
        <div className={clsx(styles.iconWrapper, styles.left)} onClick={() => onScrollTo("left")}>
          <ChevronLeft className={styles.icon} />
        </div>
      )}
      <div ref={scrollRef as any} className={clsx(styles.contents, contentClassName)}>
        {children}
      </div>
      {isEnd && (
        <div className={clsx(styles.iconWrapper, styles.right)} onClick={() => onScrollTo("right")}>
          <ChevronRight className={styles.icon} />
        </div>
      )}
    </div>
  )
}

export default ScrollableRowPresentation
