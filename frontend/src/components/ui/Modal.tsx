'use client'

import { forwardRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { getGlassClasses } from '@/lib/glassmorphism'

export interface ModalProps extends Omit<React.HTMLAttributes<HTMLDivElement>,
  'onDrag' | 'onDragEnd' | 'onDragEnter' | 'onDragExit' | 'onDragLeave' | 'onDragOver' | 'onDragStart' |
  'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'> {
  isOpen: boolean
  onClose?: () => void
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  glassVariant?: 'light' | 'medium' | 'heavy' | 'premium'
  showCloseButton?: boolean
  closeOnOverlayClick?: boolean
}

/**
 * Modal Component
 * 
 * Features:
 * - Glassmorphism background
 * - Smooth scale-in animation
 * - Multiple sizes
 * - Close button
 * - Keyboard support (ESC)
 */
const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ 
    isOpen,
    onClose,
    size = 'md',
    glassVariant = 'premium',
    showCloseButton = true,
    closeOnOverlayClick = true,
    children,
    className,
    ...props 
  }, ref) => {
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && onClose) {
          onClose()
        }
      }

      if (isOpen) {
        document.addEventListener('keydown', handleEscape)
        document.body.style.overflow = 'hidden'
      }

      return () => {
        document.removeEventListener('keydown', handleEscape)
        document.body.style.overflow = ''
      }
    }, [isOpen, onClose])

    const sizeStyles = {
      sm: 'max-w-md',
      md: 'max-w-lg',
      lg: 'max-w-2xl',
      xl: 'max-w-4xl',
      full: 'max-w-full mx-4',
    }

    return (
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div
              ref={ref}
              className={cn(
                'relative w-full rounded-2xl',
                getGlassClasses(glassVariant),
                'border border-luxury-gold/30',
                'shadow-glass shadow-premium-glow-lg',
                sizeStyles[size],
                className
              )}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              {...props}
            >
              {showCloseButton && onClose && (
                <button
                  onClick={onClose}
                  className={cn(
                    'absolute top-4 right-4',
                    'w-10 h-10 rounded-full',
                    'bg-luxury-gold/20 hover:bg-luxury-gold/30',
                    'flex items-center justify-center',
                    'text-luxury-cream hover:text-luxury-gold',
                    'transition-all duration-200',
                    'focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:ring-offset-2',
                    'z-10'
                  )}
                  aria-label="Close modal"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}

              <div className="p-6">
                {children}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    )
  }
)

Modal.displayName = 'Modal'

export { Modal }

