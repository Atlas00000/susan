'use client'

import { forwardRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface OverlayProps extends Omit<React.HTMLAttributes<HTMLDivElement>,
  'onDrag' | 'onDragEnd' | 'onDragEnter' | 'onDragExit' | 'onDragLeave' | 'onDragOver' | 'onDragStart' |
  'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'> {
  isOpen: boolean
  onClose?: () => void
  variant?: 'light' | 'medium' | 'heavy'
  blur?: boolean
  zIndex?: number
}

/**
 * Overlay Component
 * 
 * Provides backdrop overlay for modals, dialogs, and drawers
 * Features:
 * - Smooth fade animations
 * - Blur effect option
 * - Click-to-close
 * - Multiple variants
 */
const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
  ({ 
    isOpen,
    onClose,
    variant = 'medium',
    blur = true,
    zIndex = 60,
    className,
    onClick,
    ...props 
  }, ref) => {
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }

      return () => {
        document.body.style.overflow = ''
      }
    }, [isOpen])

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget && onClose) {
        onClose()
      }
      onClick?.(e)
    }

    const variantStyles = {
      light: 'bg-black/30',
      medium: 'bg-black/50',
      heavy: 'bg-black/70',
    }

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={ref}
            className={cn(
              'fixed inset-0',
              variantStyles[variant],
              blur && 'backdrop-blur-md',
              className
            )}
            style={{ zIndex }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={handleClick}
            {...props}
          />
        )}
      </AnimatePresence>
    )
  }
)

Overlay.displayName = 'Overlay'

export { Overlay }

