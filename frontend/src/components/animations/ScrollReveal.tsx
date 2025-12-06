'use client'

import { useRef } from 'react'
import { motion, useInView, Variants, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'
import { motionVariants } from '@/lib/animations'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export interface ScrollRevealProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 
  'onDrag' | 'onDragEnd' | 'onDragEnter' | 'onDragExit' | 'onDragLeave' | 'onDragOver' | 'onDragStart' |
  'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'> {
  children: React.ReactNode
  variant?: 'fadeInUp' | 'fadeInDown' | 'slideInLeft' | 'slideInRight' | 'scaleIn'
  delay?: number
  duration?: number
  once?: boolean
  amount?: number
  className?: string
}

/**
 * ScrollReveal Component
 * 
 * Wraps content with scroll-triggered reveal animations
 * Features:
 * - Multiple animation variants
 * - Configurable delay and duration
 * - Intersection Observer based
 * - Performance optimized
 * - Respects reduced motion preference
 */
export function ScrollReveal({
  children,
  variant = 'fadeInUp',
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.2,
  className,
  ...props
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount })
  const prefersReducedMotion = useReducedMotion()

  // Skip animation if user prefers reduced motion
  if (prefersReducedMotion) {
    return (
      <div 
        ref={ref} 
        className={cn(className)} 
        {...props}
      >
        {children}
      </div>
    )
  }

  const variants: Variants = {
    hidden: motionVariants[variant].initial,
    visible: {
      ...motionVariants[variant].animate,
      transition: {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}
