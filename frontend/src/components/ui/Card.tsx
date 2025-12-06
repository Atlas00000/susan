'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { CardVariant, CardPadding, CardHover, cardBaseStyles, getCardVariantClasses, getCardPaddingClasses, getCardHoverClasses } from './card-variants'

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>,
  'onDrag' | 'onDragEnd' | 'onDragEnter' | 'onDragExit' | 'onDragLeave' | 'onDragOver' | 'onDragStart' |
  'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'> {
  variant?: CardVariant
  padding?: CardPadding
  hover?: CardHover
  animated?: boolean
}

/**
 * Enhanced Card Component
 * 
 * Features:
 * - Glassmorphism variants
 * - 3D tilt effects
 * - Premium hover effects
 * - Smooth animations
 * - Multiple padding options
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    children, 
    className,
    variant = 'default',
    padding = 'md',
    hover = 'lift',
    animated = false,
    ...props 
  }, ref) => {
    const cardClasses = cn(
      cardBaseStyles,
      getCardVariantClasses(variant),
      getCardPaddingClasses(padding),
      getCardHoverClasses(hover),
      className
    )

    const Component = animated ? motion.div : 'div'
    const motionProps = animated ? {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, ease: 'easeOut' },
    } : {}

    return (
      <Component
        ref={ref}
        className={cardClasses}
        {...motionProps}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Card.displayName = 'Card'

const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 pb-4', className)}
      {...props}
    >
      {children}
    </div>
  )
)

CardHeader.displayName = 'CardHeader'

const CardTitle = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ children, className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-xl font-heading font-semibold text-luxury-cream', className)}
      {...props}
    >
      {children}
    </h3>
  )
)

CardTitle.displayName = 'CardTitle'

const CardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ children, className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-luxury-cream/70', className)}
      {...props}
    >
      {children}
    </p>
  )
)

CardDescription.displayName = 'CardDescription'

const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('pt-0', className)}
      {...props}
    >
      {children}
    </div>
  )
)

CardContent.displayName = 'CardContent'

const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center pt-4', className)}
      {...props}
    >
      {children}
    </div>
  )
)

CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
