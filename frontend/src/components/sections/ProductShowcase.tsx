'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Product } from '@/types'
import { getFeaturedProducts } from '@/data/products'
import { ProductShowcaseHeader } from '@/components/showcase/ProductShowcaseHeader'
import { ProductShowcaseBackground } from '@/components/showcase/ProductShowcaseBackground'
import { ProductShowcaseSlider } from '@/components/showcase/ProductShowcaseSlider'
import { ProductShowcaseCTA } from '@/components/showcase/ProductShowcaseCTA'
import { Container } from '@/components/ui/Container'

export function ProductShowcase() {
  const [products, setProducts] = useState<Product[]>([])
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

  if (products.length === 0) {
    return null
  }

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-luxury-charcoal via-luxury-charcoal/95 to-luxury-royal/10">
      {/* Animated Background */}
      <ProductShowcaseBackground />

      {/* Content Container */}
      <Container className="relative z-10">
        {/* Header */}
        <ProductShowcaseHeader />

        {/* Product Slider */}
        <ProductShowcaseSlider products={products} isMobile={isMobile} />

        {/* CTA */}
        <ProductShowcaseCTA />
      </Container>
      </section>
    )
  }
