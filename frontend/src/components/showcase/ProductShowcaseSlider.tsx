'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, PanInfo } from 'framer-motion'
import { Product } from '@/types'
import { ProductShowcaseCard } from './ProductShowcaseCard'
import { useInView } from 'framer-motion'

interface ProductShowcaseSliderProps {
  products: Product[]
  isMobile: boolean
}

export function ProductShowcaseSlider({ products, isMobile }: ProductShowcaseSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  const x = useMotionValue(0)
  const itemsPerView = isMobile ? 1 : 3
  const itemWidth = 100 / itemsPerView

  // Smooth spring animation
  const springConfig = { stiffness: 100, damping: 30 }
  const xSpring = useSpring(x, springConfig)

  useEffect(() => {
    const newX = -currentIndex * itemWidth
    x.set(newX)
  }, [currentIndex, itemWidth, x])

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false)
    const threshold = 50
    const direction = info.offset.x > 0 ? -1 : 1

    if (Math.abs(info.offset.x) > threshold) {
      const newIndex = Math.max(
        0,
        Math.min(
          Math.ceil(products.length / itemsPerView) - 1,
          currentIndex + direction
        )
      )
      setCurrentIndex(newIndex)
    } else {
      // Snap back to current position
      x.set(-currentIndex * itemWidth)
    }
  }

  const nextSlide = () => {
    const maxIndex = Math.ceil(products.length / itemsPerView) - 1
    setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1))
  }

  const prevSlide = () => {
    const maxIndex = Math.ceil(products.length / itemsPerView) - 1
    setCurrentIndex((prev) => (prev - 1 + maxIndex + 1) % (maxIndex + 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const totalSlides = Math.ceil(products.length / itemsPerView)

  return (
    <div ref={containerRef} className="relative">
      {/* Slider Container */}
      <div className="relative overflow-hidden">
        <motion.div
          ref={sliderRef}
          drag={isMobile ? 'x' : false}
          dragConstraints={{
            left: -(Math.ceil(products.length / itemsPerView) - 1) * 100,
            right: 0,
          }}
          dragElastic={0.2}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          style={{
            x: xSpring,
          }}
          className="flex cursor-grab active:cursor-grabbing"
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className="flex-shrink-0 px-4"
              style={{ width: `${itemWidth}%` }}
            >
              <ProductShowcaseCard
                product={product}
                index={index}
                isInView={isInView}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Controls - Magnetic Style */}
      <div className="flex items-center justify-center gap-6 mt-12">
        {/* Previous Button */}
        <motion.button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="relative group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="relative w-14 h-14 rounded-full bg-luxury-charcoal/80 backdrop-blur-lg border border-luxury-gold/30 flex items-center justify-center overflow-hidden">
            {/* Magnetic glow effect */}
            <motion.div
              className="absolute inset-0 bg-luxury-gold/20 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="relative z-10 text-luxury-gold"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </motion.button>

        {/* Dots Indicator - Organic Style */}
        <div className="flex items-center gap-3">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative group"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? 'bg-luxury-gold'
                    : 'bg-luxury-gold/30 hover:bg-luxury-gold/50'
                }`}
                animate={{
                  scale: currentIndex === index ? [1, 1.3, 1] : 1,
                }}
                transition={{
                  duration: 2,
                  repeat: currentIndex === index ? Infinity : 0,
                  ease: 'easeInOut',
                }}
              >
                {/* Pulse effect for active dot */}
                {currentIndex === index && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-luxury-gold"
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.6, 0, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                )}
              </motion.div>
            </motion.button>
          ))}
        </div>

        {/* Next Button */}
        <motion.button
          onClick={nextSlide}
          disabled={currentIndex === totalSlides - 1}
          className="relative group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="relative w-14 h-14 rounded-full bg-luxury-charcoal/80 backdrop-blur-lg border border-luxury-gold/30 flex items-center justify-center overflow-hidden">
            {/* Magnetic glow effect */}
            <motion.div
              className="absolute inset-0 bg-luxury-gold/20 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="relative z-10 text-luxury-gold"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </motion.button>
      </div>
    </div>
  )
}

