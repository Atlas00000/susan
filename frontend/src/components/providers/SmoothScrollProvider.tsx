'use client'

import { useEffect } from 'react'

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth'
    
    // Add custom scroll effects
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const parallax = document.querySelectorAll('[data-parallax]')
      
      parallax.forEach((element) => {
        const speed = element.getAttribute('data-parallax') || '0.5'
        const yPos = -(scrolled * parseFloat(speed))
        ;(element as HTMLElement).style.transform = `translateY(${yPos}px)`
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return <>{children}</>
}
