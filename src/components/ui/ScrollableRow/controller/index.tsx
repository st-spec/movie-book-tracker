"use client"

import React, { ReactNode } from "react"
import { useScrollable } from "@/hooks/useScrollable"
import ScrollableRowPresentation from "../presentation"

type Props = {
  children: ReactNode
  contentClassName?: string
  wrapperClassName?: string
  size?: 'md' | 'sm'
}

export const ScrollableRowController = ({
  children,
  contentClassName,
  wrapperClassName,
  size = 'md',
}: Props) => {
  const {
    scrollRef,
    isStart,
    isEnd,
    handleScrollTo,
  } = useScrollable()

  return (
    <ScrollableRowPresentation
      isStart={isStart}
      isEnd={isEnd}
      scrollRef={scrollRef}
      onScrollTo={handleScrollTo}
      contentClassName={contentClassName}
      wrapperClassName={wrapperClassName}
      size={size}
    >
      {children}
    </ScrollableRowPresentation>
  )
}

export default ScrollableRowController
