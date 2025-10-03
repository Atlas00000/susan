'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import { Product } from '@/types'
import { getFeaturedProducts } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import Link from 'next/link'
import Image from 'next/image'

// Optimized mobile detection hook
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.5,
        ease: "easeOut"
      }}
    >
      <Link href={`/products/${product.id}`} className="block">
        <div className={`
          relative bg-luxury-charcoal/60 backdrop-blur-md border border-luxury-gold/20 
          ${isMobile ? 'rounded-2xl' : 'rounded-3xl'} overflow-hidden shadow-lg
          transition-all duration-300 hover:shadow-xl
        `}>
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden">
            {!imageError && product.images && product.images[0] ? (
              <Image
                src={product.images[0] as string}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                priority={index < 3}
                sizes={isMobile ? "100vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
              />
            ) : (
              <div className="w-full h-full bg-luxury-gold/10 flex items-center justify-center">
                <span className="text-luxury-gold/50 text-sm font-medium">
                  {product.name}
                </span>
              </div>
            )}
            
            {/* Loading placeholder */}
            {!imageLoaded && !imageError && product.images && product.images[0] && (
              <div className="absolute inset-0 bg-luxury-charcoal/50 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-luxury-gold/30 border-t-luxury-gold rounded-full animate-spin" />
              </div>
            )}
            
            {/* Badges */}
            <div className="absolute top-3 left-3">
              <Badge 
                variant={product.availability === 'limited' ? 'luxury' : 'default'}
                className="text-xs"
              >
                {product.availability === 'limited' ? 'Limited' : 'In Stock'}
              </Badge>
            </div>

            {product.featured && (
              <div className="absolute top-3 right-3">
                <Badge variant="outline" className="text-xs">
                  Featured
                </Badge>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className={`${isMobile ? 'p-4 space-y-3' : 'p-6 space-y-4'}`}>
            {/* Scent Notes */}
            <div className="flex flex-wrap gap-1.5">
              {product.notes.slice(0, isMobile ? 2 : 3).map((note) => (
                <Badge key={note} variant="secondary" className="text-xs">
                  {note}
                </Badge>
              ))}
            </div>

            {/* Product Name */}
            <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-heading font-bold text-luxury-cream line-clamp-2`}>
              {product.name}
            </h3>

            {/* Description */}
            <p className={`text-luxury-cream/70 ${isMobile ? 'line-clamp-2 text-sm' : 'line-clamp-2'}`}>
              {product.description}
            </p>

            {/* Price and Button */}
            <div className={`flex items-center ${isMobile ? 'flex-col gap-3' : 'justify-between'}`}>
              <span className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-luxury-gold`}>
                {formatPrice(product.price)}
              </span>
              
              <Button 
                size={isMobile ? 'sm' : 'sm'} 
                variant="outline"
                className={`${isMobile ? 'w-full' : ''} text-sm`}
              >
                View Details
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function MobileOptimizedProductShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { isMobile, isLoading } = useIsMobile()
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })
  
  // Memoize products to prevent unnecessary re-renders
  const products = useMemo(() => getFeaturedProducts(), [])
  
  // Show loading state while detecting mobile
  if (isLoading) {
    return (
      <section className="relative py-20 bg-gradient-to-b from-luxury-charcoal to-luxury-royal/10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="w-32 h-8 bg-luxury-gold/20 rounded mx-auto mb-6 animate-pulse" />
            <div className="w-64 h-12 bg-luxury-gold/20 rounded mx-auto mb-4 animate-pulse" />
            <div className="w-96 h-6 bg-luxury-gold/20 rounded mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </section>
    )
  }

  return (
    <section 
      ref={containerRef}
      className="relative py-20 bg-gradient-to-b from-luxury-charcoal to-luxury-royal/10"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className={`text-center ${isMobile ? 'mb-12' : 'mb-16'}`}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Badge variant="luxury" size="lg" className="mb-6">
              Featured Collection
            </Badge>
          </motion.div>
          
          <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-heading font-bold text-luxury-cream mb-6`}>
            <span className="block">Signature</span>
            <span className="block bg-gradient-to-r from-luxury-gold to-luxury-royal bg-clip-text text-transparent">
              Fragrances
            </span>
          </h2>
          
          <p className={`${isMobile ? 'text-base' : 'text-lg'} text-luxury-cream/70 ${isMobile ? 'max-w-full' : 'max-w-2xl mx-auto'}`}>
            Discover our most coveted fragrances, each one a masterpiece of perfumery art
          </p>
        </motion.div>

        {/* Product Grid */}
        <motion.div
          className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'}`}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
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
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Link href="/products">
            <Button size="lg" variant="outline" className="px-8">
              View All Products
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
