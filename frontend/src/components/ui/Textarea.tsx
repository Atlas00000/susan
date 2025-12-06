'use client'

import { forwardRef, useState, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'onDrag' | 'onDragEnd' | 'onDragEnter' | 'onDragExit' | 'onDragLeave' | 'onDragOver' | 'onDragStart' |
  'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'> {
  label?: string
  error?: string
  success?: boolean
  helperText?: string
  maxLength?: number
  showCount?: boolean
}

/**
 * Enhanced Textarea Component
 * 
 * Features:
 * - Animated floating label
 * - Focus states with glow
 * - Error and success states
 * - Character count
 * - Helper text
 * - Smooth animations
 * - Glassmorphism background
 */
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    label,
    error,
    success,
    helperText,
    maxLength,
    showCount = false,
    className,
    id,
    value,
    defaultValue,
    onFocus,
    onBlur,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const [hasValue, setHasValue] = useState(
      Boolean(value || defaultValue)
    )
    const inputId = id || useId()
    const helperId = `${inputId}-helper`
    const errorId = `${inputId}-error`

    const currentLength = typeof value === 'string' 
      ? value.length 
      : typeof defaultValue === 'string'
      ? defaultValue.length
      : 0

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true)
      onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false)
      setHasValue(Boolean(e.target.value))
      onBlur?.(e)
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setHasValue(Boolean(e.target.value))
      props.onChange?.(e)
    }

    const isLabelFloating = isFocused || hasValue
    const hasError = Boolean(error)
    const hasSuccess = success && !hasError
    const isNearLimit = maxLength && currentLength >= maxLength * 0.9

    return (
      <div className="w-full">
        <div className="relative">
          <motion.textarea
            ref={ref}
            id={inputId}
            value={value}
            defaultValue={defaultValue}
            maxLength={maxLength}
            className={cn(
              'w-full px-4 pt-6 pb-2 min-h-[120px] resize-y',
              'bg-luxury-charcoal/70 backdrop-blur-lg',
              'border rounded-xl',
              'text-luxury-cream placeholder-transparent',
              'transition-all duration-300',
              'focus:outline-none focus:ring-2',
              hasError
                ? 'border-error-500 focus:border-error-500 focus:ring-error-500/50'
                : hasSuccess
                ? 'border-success-500 focus:border-success-500 focus:ring-success-500/50'
                : 'border-luxury-gold/20 focus:border-luxury-gold focus:ring-luxury-gold/50',
              hasError && 'focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]',
              hasSuccess && 'focus:shadow-[0_0_0_3px_rgba(16,185,129,0.1)]',
              !hasError && !hasSuccess && 'focus:shadow-premium-glow',
              className
            )}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            aria-invalid={hasError}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            {...(props as any)}
          />

          {label && (
            <motion.label
              htmlFor={inputId}
              className={cn(
                'absolute left-4 top-4 pointer-events-none',
                'text-luxury-cream/70 transition-colors duration-300',
                isLabelFloating && 'top-2 text-xs font-medium',
                hasError && 'text-error-500',
                hasSuccess && 'text-success-500',
                isFocused && !hasError && !hasSuccess && 'text-luxury-gold'
              )}
              animate={{
                scale: isLabelFloating ? 0.85 : 1,
              }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {label}
            </motion.label>
          )}

          {/* Character count */}
          {showCount && maxLength && (
            <div className="absolute bottom-2 right-4">
              <span
                className={cn(
                  'text-xs',
                  isNearLimit
                    ? 'text-warning-500'
                    : currentLength >= maxLength
                    ? 'text-error-500'
                    : 'text-luxury-cream/50'
                )}
              >
                {currentLength} / {maxLength}
              </span>
            </div>
          )}

          {/* Success icon */}
          <AnimatePresence>
            {hasSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute right-4 top-4"
              >
                <svg
                  className="w-5 h-5 text-success-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error icon */}
          <AnimatePresence>
            {hasError && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute right-4 top-4"
              >
                <svg
                  className="w-5 h-5 text-error-500"
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Helper text / Error message */}
        <AnimatePresence>
          {(error || helperText) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2"
            >
              {error ? (
                <p
                  id={errorId}
                  className="text-sm text-error-500 flex items-center gap-1"
                  role="alert"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {error}
                </p>
              ) : (
                <p
                  id={helperId}
                  className="text-sm text-luxury-cream/60"
                >
                  {helperText}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export { Textarea }

