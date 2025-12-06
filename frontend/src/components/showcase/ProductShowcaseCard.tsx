'use client'

import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import Image from 'next/image'

interface ProductShowcaseCardProps {
  product: Product
  index: number
  isInView: boolean
}

export function ProductShowcaseCard({ product, index, isInView }: ProductShowcaseCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // 3D tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 30,
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    x.set(mouseX / rect.width)
    y.set(mouseY / rect.height)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="group relative"
    >
      <div className="relative h-full">
        {/* Main Card Container - Organic Shape */}
        <motion.div
          className="relative h-full bg-luxury-charcoal/60 backdrop-blur-xl border border-luxury-gold/20 rounded-[2.5rem] overflow-hidden"
          animate={{
            borderColor: isHovered
              ? 'rgba(212, 175, 55, 0.5)'
              : 'rgba(212, 175, 55, 0.2)',
            boxShadow: isHovered
              ? '0 20px 60px rgba(212, 175, 55, 0.3), 0 0 40px rgba(212, 175, 55, 0.2)'
              : '0 10px 30px rgba(0, 0, 0, 0.3)',
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-luxury-gold/5 via-transparent to-luxury-amber/5"
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Shimmer effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/20 to-transparent"
            animate={{
              x: isHovered ? ['-100%', '200%'] : '-100%',
            }}
            transition={{
              duration: 1.5,
              repeat: isHovered ? Infinity : 0,
              ease: 'linear',
            }}
          />

          <Link href={`/products/${product.id}`} className="block h-full">
            {/* Product Image Container */}
            <div className="relative aspect-square overflow-hidden">
              {product.images && product.images[0] ? (
                <motion.div
                  className="relative w-full h-full"
                  animate={{
                    scale: isHovered ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <Image
                    src={product.images[0] as string}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  {/* Gradient overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/90 via-luxury-charcoal/40 to-transparent"
                    animate={{
                      opacity: isHovered ? 1 : 0.7,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-luxury-gold/10 to-luxury-amber/10">
                  <span className="text-luxury-gold/60 text-sm font-medium text-center px-4">
                    {product.name}
                  </span>
                </div>
              )}

              {/* Badges - Floating */}
              <div className="absolute top-6 left-6 z-10">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ delay: index * 0.1 + 0.3, type: 'spring', stiffness: 200 }}
                >
                  <Badge
                    variant={product.availability === 'limited' ? 'luxury' : 'default'}
                    className="text-xs shadow-xl backdrop-blur-sm"
                  >
                    {product.availability === 'limited' ? 'Limited' : 'In Stock'}
                  </Badge>
                </motion.div>
              </div>

              {product.featured && (
                <div className="absolute top-6 right-6 z-10">
                  <motion.div
                    initial={{ scale: 0, rotate: 180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ delay: index * 0.1 + 0.4, type: 'spring', stiffness: 200 }}
                  >
                    <Badge
                      variant="outline"
                      className="text-xs shadow-xl backdrop-blur-sm bg-luxury-gold/30 border-luxury-gold/50"
                    >
                      Featured
                    </Badge>
                  </motion.div>
                </div>
              )}

              {/* Hover overlay with content */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  opacity: isHovered ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  initial={{ scale: 0.8, y: 20 }}
                  animate={isHovered ? { scale: 1, y: 0 } : { scale: 0.8, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center px-6"
                >
                  <motion.div
                    className="w-16 h-16 mx-auto mb-4 rounded-full bg-luxury-gold/20 backdrop-blur-md border border-luxury-gold/40 flex items-center justify-center"
                    animate={{
                      rotate: isHovered ? 360 : 0,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="text-2xl">→</span>
                  </motion.div>
                  <p className="text-luxury-gold font-semibold text-sm">Quick View</p>
                </motion.div>
              </motion.div>
            </div>

            {/* Product Info - Floating */}
            <div className="relative p-6 space-y-4 bg-luxury-charcoal/40 backdrop-blur-sm">
              {/* Scent Notes - Floating badges */}
              <motion.div
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                {product.notes.slice(0, 3).map((note, noteIndex) => (
                  <motion.div
                    key={note}
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{
                      delay: index * 0.1 + 0.5 + noteIndex * 0.1,
                      type: 'spring',
                      stiffness: 200,
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Badge variant="secondary" className="text-xs glass-light">
                      {note}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>

              {/* Product Name */}
              <motion.h3
                className="text-xl font-heading font-bold text-luxury-cream line-clamp-2"
                animate={{
                  color: isHovered ? '#D4AF37' : '#F5F5DC',
                }}
                transition={{ duration: 0.3 }}
              >
                {product.name}
              </motion.h3>

              {/* Description */}
              <p className="text-luxury-cream/70 line-clamp-2 text-sm leading-relaxed">
                {product.description}
              </p>

              {/* Price and Button */}
              <div className="flex items-center justify-between pt-2">
                <motion.span
                  className="text-2xl font-heading font-bold luxury-text-gradient"
                  animate={{
                    scale: isHovered ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {formatPrice(product.price)}
                </motion.span>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="sm"
                    variant="outline"
                    className="glass-light border-luxury-gold/30 hover:border-luxury-gold hover:bg-luxury-gold/10 transition-all duration-300"
                  >
                    <span className="flex items-center space-x-2">
                      <span>Explore</span>
                      <motion.span
                        animate={{
                          x: isHovered ? [0, 5, 0] : 0,
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                        }}
                      >
                        →
                      </motion.span>
                    </span>
                  </Button>
                </motion.div>
              </div>
            </div>
          </Link>

          {/* Glowing border effect */}
          <motion.div
            className="absolute inset-0 rounded-[2.5rem] border-2 border-luxury-gold/20 pointer-events-none"
            animate={{
              opacity: isHovered ? [0.3, 0.8, 0.3] : 0.3,
            }}
            transition={{
              duration: 2,
              repeat: isHovered ? Infinity : 0,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

