'use client'

import { forwardRef, useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ButtonVariant, ButtonSize, buttonBaseStyles, getButtonVariantClasses, getButtonSizeClasses } from './button-variants'

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>,
  'onDrag' | 'onDragEnd' | 'onDragEnter' | 'onDragExit' | 'onDragLeave' | 'onDragOver' | 'onDragStart' |
  'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  magnetic?: boolean
}

/**
 * Enhanced Button Component
 * 
 * Features:
 * - Liquid ripple effect on click
 * - Magnetic hover (optional)
 * - Premium glow for premium variant
 * - Loading state
 * - Smooth animations
 * - Accessibility support
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    children, 
    className,
    disabled,
    loading = false,
    magnetic = false,
    type = 'button',
    onClick,
    ...props 
  }, ref) => {
    const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])
    const buttonRef = useRef<HTMLButtonElement>(null)
    const rippleIdRef = useRef(0)
    const prefersReducedMotion = useReducedMotion()

    // Combine refs
    useEffect(() => {
      if (typeof ref === 'function') {
        ref(buttonRef.current)
      } else if (ref) {
        ref.current = buttonRef.current
      }
    }, [ref])

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) return

      // Create ripple effect
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const id = rippleIdRef.current++

        setRipples(prev => [...prev, { x, y, id }])

        // Remove ripple after animation
        setTimeout(() => {
          setRipples(prev => prev.filter(ripple => ripple.id !== id))
        }, 600)
      }

      onClick?.(e)
    }

    const isDisabled = disabled || loading

    return (
      <motion.button
        ref={buttonRef}
        type={type}
        disabled={isDisabled}
        onClick={handleClick}
        className={cn(
          buttonBaseStyles,
          getButtonVariantClasses(variant),
          getButtonSizeClasses(size),
          magnetic && !prefersReducedMotion && 'magnetic-enhanced',
          className
        )}
        whileHover={!isDisabled && magnetic && !prefersReducedMotion ? { scale: 1.02 } : undefined}
        whileTap={!isDisabled && !prefersReducedMotion ? { scale: 0.98 } : undefined}
        {...props}
      >
        {/* Ripple effects */}
        {ripples.map(ripple => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full bg-white/30 pointer-events-none"
            initial={{ width: 0, height: 0, x: ripple.x, y: ripple.y }}
            animate={{
              width: 300,
              height: 300,
              x: ripple.x - 150,
              y: ripple.y - 150,
              opacity: [1, 0],
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              left: 0,
              top: 0,
            }}
          />
        ))}

        {/* Loading spinner */}
        {loading && (
          <motion.span
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </motion.span>
        )}

        {/* Button content */}
        <span className={cn('relative z-10 flex items-center gap-2', loading && 'opacity-0')}>
          {children}
        </span>
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
