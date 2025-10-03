'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Product } from '@/types'
import { getFeaturedProducts } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import Link from 'next/link'
import Image from 'next/image'

// Mobile detection hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      setIsLoading(false)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  return { isMobile, isLoading }
}

// Optimized product card component
const ProductCard = ({ product, index, isMobile }: { product: Product, index: number, isMobile: boolean }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  
  return (
    <motion.div
      key={product.id}
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.15, 
        duration: 0.6,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: isMobile ? 0 : -10,
        scale: isMobile ? 1 : 1.02,
        transition: { duration: 0.3 }
      }}
    >
      <Link href={`/products/${product.id}`} className="block">
        <div className={`
          relative bg-luxury-charcoal/70 backdrop-blur-md border border-luxury-gold/20 
          ${isMobile ? 'rounded-2xl' : 'rounded-3xl'} overflow-hidden shadow-xl
          transition-all duration-500 hover:shadow-2xl hover:shadow-luxury-gold/20
          group-hover:border-luxury-gold/40
        `}>
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden">
            {!imageError && product.images && product.images[0] ? (
              <Image
                src={product.images[0] as string}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                priority={index < 3}
                sizes={isMobile ? "100vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-luxury-gold/10 to-luxury-amber/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">🌸</div>
                  <span className="text-luxury-gold/60 text-sm font-medium">
                    {product.name}
                  </span>
                </div>
              </div>
            )}
            
            {/* Loading placeholder */}
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-luxury-charcoal/50 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-luxury-gold/30 border-t-luxury-gold rounded-full animate-spin" />
              </div>
            )}
            
            {/* Floating Badges */}
            <motion.div
              className="absolute top-4 left-4"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15 + 0.3 }}
            >
              <Badge 
                variant={product.availability === 'limited' ? 'luxury' : 'default'}
                className="text-xs shadow-lg"
              >
                {product.availability === 'limited' ? 'Limited' : 'In Stock'}
              </Badge>
            </motion.div>

            {product.featured && (
              <motion.div
                className="absolute top-4 right-4"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.15 + 0.4 }}
              >
                <Badge variant="outline" className="text-xs shadow-lg bg-luxury-gold/20">
                  Featured
                </Badge>
              </motion.div>
            )}

            {/* Hover Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="text-luxury-gold text-4xl"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  ✨
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Product Info */}
          <div className={`${isMobile ? 'p-4 space-y-3' : 'p-6 space-y-4'}`}>
            {/* Scent Notes */}
            <div className="flex flex-wrap gap-1.5">
              {product.notes.slice(0, isMobile ? 2 : 3).map((note, noteIndex) => (
                <motion.div
                  key={note}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.15 + 0.5 + noteIndex * 0.1 }}
                >
                  <Badge variant="secondary" className="text-xs">
                    {note}
                  </Badge>
                </motion.div>
              ))}
            </div>

            {/* Product Name */}
            <motion.h3
              className={`${isMobile ? 'text-lg' : 'text-xl'} font-heading font-bold text-luxury-cream line-clamp-2 group-hover:text-luxury-gold transition-colors duration-300`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 + 0.6 }}
            >
              {product.name}
            </motion.h3>

            {/* Description */}
            <motion.p
              className={`text-luxury-cream/70 ${isMobile ? 'line-clamp-2 text-sm' : 'line-clamp-2'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 + 0.7 }}
            >
              {product.description}
            </motion.p>

            {/* Price and Button */}
            <motion.div
              className={`flex items-center ${isMobile ? 'flex-col gap-3' : 'justify-between'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 + 0.8 }}
            >
              <span className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-luxury-gold`}>
                {formatPrice(product.price)}
              </span>
              
              <motion.div
                className={isMobile ? 'w-full' : ''}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size={isMobile ? 'sm' : 'sm'} 
                  variant="outline"
                  className={`${isMobile ? 'w-full' : ''} group-hover:bg-luxury-gold/10 group-hover:border-luxury-gold transition-all duration-300`}
                >
                  <span className="flex items-center space-x-2">
                    <span>View Details</span>
                    <motion.span
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    >
                      →
                    </motion.span>
                  </span>
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Glowing Border */}
          <motion.div
            className="absolute inset-0 rounded-3xl border-2 border-luxury-gold/20 group-hover:border-luxury-gold/40 transition-colors duration-500"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </Link>
    </motion.div>
  )
}

export function FeaturedProducts() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { isMobile, isLoading } = useIsMobile()
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  
  // Memoize products to prevent unnecessary re-renders
  const products = useMemo(() => getFeaturedProducts(), [])
  
  // Show loading state while detecting mobile
  if (isLoading) {
    return (
      <motion.section 
        className="relative py-20 bg-gradient-to-b from-luxury-charcoal to-luxury-royal/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="w-32 h-8 bg-luxury-gold/20 rounded mx-auto mb-6 animate-pulse" />
            <div className="w-64 h-12 bg-luxury-gold/20 rounded mx-auto mb-4 animate-pulse" />
            <div className="w-96 h-6 bg-luxury-gold/20 rounded mx-auto animate-pulse" />
          </div>
          <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'}`}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-luxury-charcoal/40 rounded-2xl p-4 animate-pulse">
                <div className="aspect-square bg-luxury-gold/20 rounded mb-4" />
                <div className="h-4 bg-luxury-gold/20 rounded mb-2" />
                <div className="h-4 bg-luxury-gold/20 rounded w-3/4 mb-4" />
                <div className="h-6 bg-luxury-gold/20 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    )
  }

  return (
    <motion.section 
      ref={containerRef}
      className="relative pt-4 pb-16 bg-gradient-to-b from-luxury-charcoal via-luxury-royal/10 to-luxury-charcoal overflow-hidden"
      style={{ y, opacity }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-luxury-gold/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-48 h-48 bg-luxury-royal/10 rounded-full blur-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-32 h-32 bg-luxury-amber/10 rounded-full blur-xl"
          animate={{
            x: [-50, 50, -50],
            y: [-25, 25, -25],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className={`text-center ${isMobile ? 'mb-12' : 'mb-16'}`}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center rounded-full bg-gradient-to-r from-luxury-gold/20 to-luxury-amber/20 px-6 py-3 mb-8 border border-luxury-gold/30"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="text-luxury-gold font-semibold text-lg">
              ✨ Featured Collection ✨
            </span>
          </motion.div>
          
          <h2 className={`${isMobile ? 'text-4xl' : 'text-5xl md:text-6xl'} font-heading font-bold text-luxury-cream mb-6`}>
            <motion.span
              className="block"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Signature
            </motion.span>
            <motion.span
              className="block bg-gradient-to-r from-luxury-gold via-luxury-amber to-luxury-gold bg-clip-text text-transparent"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Fragrances
            </motion.span>
          </h2>
          
          <motion.p
            className={`${isMobile ? 'text-lg' : 'text-xl'} text-luxury-cream/70 ${isMobile ? 'max-w-full' : 'max-w-3xl mx-auto'}`}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Discover our most coveted fragrances, each one a masterpiece of perfumery art
          </motion.p>
        </motion.div>

        {/* Product Grid */}
        <motion.div
          className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'}`}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {products.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={index} 
              isMobile={isMobile}
            />
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <Link href="/products">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-4 bg-gradient-to-r from-luxury-gold/10 to-luxury-amber/10 border-luxury-gold/50 hover:border-luxury-gold hover:bg-gradient-to-r hover:from-luxury-gold/20 hover:to-luxury-amber/20 transition-all duration-300"
              >
                <span className="flex items-center space-x-2">
                  <span>View All Products</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}
