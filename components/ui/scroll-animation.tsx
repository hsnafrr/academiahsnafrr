"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface ScrollAnimationProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function ScrollAnimation({ children, delay = 0, className = "" }: ScrollAnimationProps) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function FadeInAnimation({ children, delay = 0, className = "" }: ScrollAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function SlideInAnimation({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: ScrollAnimationProps & { direction?: "up" | "down" | "left" | "right" }) {
  const variants = {
    up: { y: 50, opacity: 0 },
    down: { y: -50, opacity: 0 },
    left: { x: 50, opacity: 0 },
    right: { x: -50, opacity: 0 },
  }

  return (
    <motion.div
      initial={variants[direction]}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
