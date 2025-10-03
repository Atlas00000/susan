'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Product } from '@/types'
import { getFeaturedProducts } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import Link from 'next/link'
import Image from 'next/image'

export function ProductShowcase() {
  const [products, setProducts] = useState<Product[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Load products
    setProducts(getFeaturedProducts())
    
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const slidesToShow = isMobile ? 1 : 3
  const totalSlides = Math.ceil(products.length / slidesToShow)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  if (products.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-gradient-to-b from-luxury-charcoal to-luxury-royal/10">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block bg-luxury-gold/20 rounded-full px-6 py-3 mb-8 border border-luxury-gold/30"
          >
            <span className="text-luxury-gold font-semibold text-lg">
              ✨ Featured Collection ✨
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-luxury-cream mb-6"
          >
            <span className="block">Signature</span>
            <span className="block bg-gradient-to-r from-luxury-gold via-luxury-amber to-luxury-gold bg-clip-text text-transparent">
              Fragrances
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-luxury-cream/70 max-w-3xl mx-auto"
          >
            Discover our most coveted fragrances, each one a masterpiece of perfumery art
          </motion.p>
        </div>

        {/* Product Slider */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative"
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)`
              }}
            >
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className={`${isMobile ? 'w-full' : 'w-1/3'} flex-shrink-0 px-4`}
                >
                  <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="group relative bg-luxury-charcoal/80 backdrop-blur-lg border border-luxury-gold/30 rounded-3xl overflow-hidden shadow-2xl hover:shadow-luxury-gold/20 hover:border-luxury-gold/50 transition-all duration-500"
                  >
                    <Link href={`/products/${product.id}`} className="block">
                      {/* Product Image */}
                      <div className="relative aspect-square overflow-hidden">
                        {product.images && product.images[0] ? (
                          <Image
                            src={product.images[0] as string}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes={isMobile ? "100vw" : "(max-width: 768px) 100vw, 33vw"}
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-luxury-gold/10">
                            <span className="text-luxury-gold/60 text-sm font-medium line-clamp-2 px-2 text-center">
                              {product.name}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Badges */}
                      <div className="absolute top-4 left-4">
                        <Badge
                          variant={product.availability === 'limited' ? 'luxury' : 'default'}
                          className="text-xs shadow-lg"
                        >
                          {product.availability === 'limited' ? 'Limited' : 'In Stock'}
                        </Badge>
                      </div>

                      {product.featured && (
                        <div className="absolute top-4 right-4">
                          <Badge variant="outline" className="text-xs shadow-lg bg-luxury-gold/30">
                            Featured
                          </Badge>
                        </div>
                      )}

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-luxury-gold text-5xl">✨</div>
                        </div>
                      </div>
                    </Link>

                      {/* Product Info */}
                      <div className="p-6 space-y-4">
                        {/* Scent Notes */}
                        <div className="flex flex-wrap gap-2">
                          {product.notes.slice(0, 3).map((note) => (
                            <Badge key={note} variant="secondary" className="text-xs">
                              {note}
                            </Badge>
                          ))}
                        </div>

                        {/* Product Name */}
                        <h3 className="text-xl font-bold text-luxury-cream line-clamp-2 group-hover:text-luxury-gold transition-colors duration-300">
                          {product.name}
                        </h3>

                        {/* Description */}
                        <p className="text-luxury-cream/70 line-clamp-2">
                          {product.description}
                        </p>

                        {/* Price and Button */}
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-luxury-gold">
                            {formatPrice(product.price)}
                          </span>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            className="group-hover:bg-luxury-gold/10 group-hover:border-luxury-gold transition-all duration-300"
                          >
                            <span className="flex items-center space-x-2">
                              <span>Explore</span>
                              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                            </span>
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center space-x-4 mt-8">
              {/* Previous Button */}
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="p-3 rounded-full bg-luxury-charcoal/80 border border-luxury-gold/30 hover:border-luxury-gold/60 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:bg-luxury-gold/10"
                aria-label="Previous products"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-luxury-gold">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Dots Indicator */}
              <div className="flex space-x-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? 'bg-luxury-gold scale-125'
                        : 'bg-luxury-gold/30 hover:bg-luxury-gold/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={nextSlide}
                disabled={currentSlide === totalSlides - 1}
                className="p-3 rounded-full bg-luxury-charcoal/80 border border-luxury-gold/30 hover:border-luxury-gold/60 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:bg-luxury-gold/10"
                aria-label="Next products"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-luxury-gold">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </motion.div>

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-12"
          >
            <Link href="/products">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-4 bg-gradient-to-r from-luxury-gold/10 to-luxury-amber/10 border-luxury-gold/50 hover:border-luxury-gold hover:bg-gradient-to-r hover:from-luxury-gold/20 hover:to-luxury-amber/20 transition-all duration-300"
              >
                <span className="flex items-center space-x-2">
                  <span>View All Products</span>
                  <span>→</span>
                </span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    )
  }
