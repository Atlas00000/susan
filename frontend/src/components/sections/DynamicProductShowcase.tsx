'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Product } from '@/types'
import { getFeaturedProducts } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import Link from 'next/link'

export function DynamicProductShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const products = getFeaturedProducts()
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])

  return (
    <section 
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-gradient-to-b from-luxury-charcoal via-luxury-charcoal/95 to-luxury-royal/10"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-luxury-gold/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-64 h-64 bg-luxury-royal/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Badge variant="luxury" size="lg" className="mb-6">
              Featured Collection
            </Badge>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-luxury-cream mb-6">
            <motion.span
              className="block"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Signature
            </motion.span>
            <motion.span
              className="block bg-gradient-to-r from-luxury-gold to-luxury-royal bg-clip-text text-transparent"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Fragrances
            </motion.span>
          </h2>
          
          <motion.p
            className="text-xl text-luxury-cream/70 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Discover our most coveted fragrances, each one a masterpiece of perfumery art
          </motion.p>
        </motion.div>

        {/* Dynamic Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="group relative"
              initial={{ opacity: 0, y: 100, rotateX: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ 
                delay: index * 0.2, 
                duration: 0.8,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -20,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <Link href={`/products/${product.id}`}>
                <div className="relative bg-luxury-charcoal/60 backdrop-blur-md border border-luxury-gold/20 rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-luxury-gold/20 transition-all duration-500">
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <motion.img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Floating Badges */}
                    <motion.div
                      className="absolute top-4 left-4"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.2 + 0.5 }}
                    >
                      <Badge 
                        variant={product.availability === 'limited' ? 'luxury' : 'default'}
                        className="backdrop-blur-md"
                      >
                        {product.availability === 'limited' ? 'Limited' : 'In Stock'}
                      </Badge>
                    </motion.div>

                    {product.featured && (
                      <motion.div
                        className="absolute top-4 right-4"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2 + 0.7 }}
                      >
                        <Badge variant="outline" className="backdrop-blur-md">
                          Featured
                        </Badge>
                      </motion.div>
                    )}

                    {/* Hover Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-luxury-gold/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <motion.div
                        className="text-luxury-gold text-4xl"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        ✨
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6 space-y-4">
                    {/* Scent Notes */}
                    <div className="flex flex-wrap gap-2">
                      {product.notes.slice(0, 3).map((note, noteIndex) => (
                        <motion.div
                          key={note}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.2 + 0.8 + noteIndex * 0.1 }}
                        >
                          <Badge variant="secondary" size="sm">
                            {note}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>

                    {/* Product Name */}
                    <motion.h3
                      className="text-xl font-heading font-bold text-luxury-cream group-hover:text-luxury-gold transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 + 1 }}
                    >
                      {product.name}
                    </motion.h3>

                    {/* Description */}
                    <motion.p
                      className="text-luxury-cream/70 line-clamp-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 + 1.1 }}
                    >
                      {product.description}
                    </motion.p>

                    {/* Price */}
                    <motion.div
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 + 1.2 }}
                    >
                      <span className="text-2xl font-bold text-luxury-gold">
                        {formatPrice(product.price)}
                      </span>
                      
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* 3D Effect Border */}
                  <div className="absolute inset-0 rounded-3xl border border-luxury-gold/20 group-hover:border-luxury-gold/40 transition-colors duration-500" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/collections">
              <Button 
                size="lg"
                className="px-12 py-4 text-lg font-medium bg-gradient-to-r from-luxury-gold to-luxury-royal hover:from-luxury-royal hover:to-luxury-gold transition-all duration-300 shadow-2xl shadow-luxury-gold/25"
              >
                Explore All Collections
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
