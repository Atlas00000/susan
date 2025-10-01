import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding?: boolean
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, size = 'lg', padding = true, ...props }, ref) => {
    const sizeStyles = {
      sm: 'max-w-3xl',
      md: 'max-w-4xl',
      lg: 'max-w-7xl',
      xl: 'max-w-8xl',
      full: 'max-w-full'
    }
    
    const paddingStyles = padding ? 'px-4 sm:px-6 lg:px-8' : ''

    return (
      <div
        ref={ref}
        className={cn(
          'mx-auto w-full',
          sizeStyles[size],
          paddingStyles,
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Container.displayName = 'Container'

export { Container }
