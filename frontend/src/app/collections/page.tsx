'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { collections } from '@/data/collections'
import Link from 'next/link'
import Image from 'next/image'

// Interactive Collection Card Component
const InteractiveCollectionCard = ({ 
  collection, 
  index, 
  isHovered, 
  onHover 
}: { 
  collection: any
  index: number
  isHovered: boolean
  onHover: (id: string | null) => void
}) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.2, 
        duration: 0.8,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -20,
        scale: 1.02,
        transition: { duration: 0.4 }
      }}
      onHoverStart={() => onHover(collection.id)}
      onHoverEnd={() => onHover(null)}
    >
      <Card className="group relative overflow-hidden bg-luxury-charcoal/80 backdrop-blur-lg border border-luxury-gold/30 hover:border-luxury-gold/60 transition-all duration-500 hover:shadow-2xl hover:shadow-luxury-gold/20">
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-luxury-gold/5 via-transparent to-luxury-amber/5"
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-luxury-gold/30 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                y: isHovered ? [-20, 20, -20] : [0, 0, 0],
                opacity: isHovered ? [0.3, 1, 0.3] : 0,
                scale: isHovered ? [0.5, 1.5, 0.5] : 0,
              }}
              transition={{
                duration: 2,
                repeat: isHovered ? Infinity : 0,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        <CardHeader className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <motion.div
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <Badge variant="luxury" size="sm" className="shadow-lg">
                    {collection.products.length} Fragrances
                  </Badge>
            </motion.div>
                  {collection.featured && (
              <motion.div
                animate={{ 
                  rotate: isHovered ? [0, 5, -5, 0] : 0,
                  scale: isHovered ? 1.1 : 1 
                }}
                transition={{ duration: 0.5 }}
              >
                <Badge variant="outline" size="sm" className="bg-luxury-gold/20">
                  ✨ Featured
                    </Badge>
              </motion.div>
                  )}
                </div>
          
          <motion.div
            animate={{ y: isHovered ? -5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardTitle className="text-3xl font-heading font-bold text-luxury-cream group-hover:text-luxury-gold transition-colors duration-500 mb-4">
                  {collection.name}
                </CardTitle>
            <CardDescription className="text-luxury-cream/80 leading-relaxed text-lg">
                  {collection.description}
                </CardDescription>
          </motion.div>
              </CardHeader>
              
        <CardContent className="relative z-10">
          <div className="space-y-6">
            {/* Interactive Product Preview */}
            <div className="grid grid-cols-2 gap-3">
              {collection.products.slice(0, 4).map((product: any, productIndex: number) => (
                <motion.div
                  key={product.id}
                  className="aspect-square bg-luxury-charcoal/60 rounded-xl overflow-hidden border border-luxury-gold/20 hover:border-luxury-gold/50 transition-all duration-300 relative"
                  animate={{
                    scale: isHovered ? 1.05 : 1,
                    y: isHovered ? -5 : 0,
                  }}
                  transition={{ 
                    duration: 0.3, 
                    delay: productIndex * 0.1 
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 2,
                    transition: { duration: 0.2 }
                  }}
                >
                  {/* Product Image */}
                  {product.images && product.images[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-luxury-gold/20 to-luxury-amber/20 flex items-center justify-center relative overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-luxury-gold/10 via-luxury-amber/10 to-luxury-gold/10"
                        animate={{
                          x: isHovered ? ['0%', '100%', '0%'] : '0%',
                        }}
                        transition={{
                          duration: 2,
                          repeat: isHovered ? Infinity : 0,
                          ease: "easeInOut"
                        }}
                      />
                      <span className="text-luxury-gold/80 text-sm font-semibold relative z-10">
                            {product.name.split(' ')[0]}
                          </span>
                        </div>
                  )}
                  
                  {/* Hover Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-luxury-gold text-sm font-semibold">
                        {product.name.split(' ')[0]}
                      </span>
                      </div>
                  </motion.div>
                </motion.div>
                    ))}
                  </div>
                  
            {/* Interactive CTA Button */}
            <motion.div
              className="pt-4"
              animate={{ y: isHovered ? -5 : 0 }}
              transition={{ duration: 0.3 }}
            >
                    <Link href={`/collections/${collection.id}`}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-luxury-gold group-hover:text-luxury-charcoal group-hover:border-luxury-gold transition-all duration-500 relative overflow-hidden"
                  >
                    <motion.span
                      className="flex items-center justify-center space-x-2"
                      animate={{
                        x: isHovered ? [0, 5, 0] : 0,
                      }}
                      transition={{
                        duration: 1,
                        repeat: isHovered ? Infinity : 0,
                      }}
                    >
                      <span>Explore Collection</span>
                      <motion.span
                        animate={{ rotate: isHovered ? 360 : 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        →
                      </motion.span>
                    </motion.span>
                    
                    {/* Shimmer Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/20 to-transparent"
                      animate={{
                        x: isHovered ? ['-100%', '100%'] : '-100%',
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: isHovered ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                    />
                      </Button>
                </motion.div>
                    </Link>
            </motion.div>
                </div>
              </CardContent>

        {/* Glowing Border Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-luxury-gold/20 group-hover:border-luxury-gold/60 transition-colors duration-500"
          animate={{
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
            </Card>
    </motion.div>
  )
}

// Interactive Stats Component
const InteractiveStats = () => {
  const [stats, setStats] = useState([
    { label: 'Collections', value: 0, target: 5 },
    { label: 'Fragrances', value: 0, target: 25 },
    { label: 'Happy Customers', value: 0, target: 1000 },
    { label: 'Years of Excellence', value: 0, target: 10 }
  ])

  useEffect(() => {
    const animateStats = () => {
      setStats(prev => prev.map(stat => ({
        ...stat,
        value: stat.target
      })))
    }

    const timer = setTimeout(animateStats, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="text-center"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <motion.div
            className="text-4xl md:text-5xl font-bold text-luxury-gold mb-2"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {stat.value}+
          </motion.div>
          <div className="text-luxury-cream/70 text-sm font-medium">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

// Floating Elements Component
const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-luxury-gold/20 rounded-full"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + i * 8}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.3, 1, 0.3],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
          ))}
        </div>
  )
}

export default function CollectionsPage() {
  const [hoveredCollection, setHoveredCollection] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <div className="min-h-screen bg-gradient-to-b from-luxury-charcoal via-luxury-royal/5 to-luxury-charcoal relative overflow-hidden">
      {/* Animated Background Elements */}
      <FloatingElements />
      
      {/* Hero Section */}
      <motion.section
        className="relative py-32"
        style={{ y, opacity }}
      >
        <Container className="relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block bg-luxury-gold/20 rounded-full px-8 py-4 mb-8 border border-luxury-gold/30 backdrop-blur-sm"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="text-luxury-gold font-semibold text-lg">
                ✨ Discover Our Collections ✨
              </span>
            </motion.div>
            
            <motion.h1
              className="text-6xl md:text-8xl font-heading font-bold text-luxury-cream mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <motion.span
                className="block"
                animate={{ 
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  background: 'linear-gradient(45deg, #D4AF37, #FFD700, #B8860B, #D4AF37)',
                  backgroundSize: '300% 300%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Luxury
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-luxury-gold via-luxury-amber to-luxury-gold bg-clip-text text-transparent"
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Collections
              </motion.span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-luxury-cream/80 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Immerse yourself in our world of exceptional fragrances, where each collection 
              tells a unique story of luxury, sophistication, and personal expression.
            </motion.p>
          </motion.div>

          {/* Interactive Stats */}
          <InteractiveStats />
        </Container>
      </motion.section>

      {/* Collections Grid */}
      <motion.section
        ref={containerRef}
        className="relative py-20"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <Container>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            {collections.map((collection, index) => (
              <InteractiveCollectionCard
                key={collection.id}
                collection={collection}
                index={index}
                isHovered={hoveredCollection === collection.id}
                onHover={setHoveredCollection}
              />
            ))}
          </motion.div>
        </Container>
      </motion.section>

      {/* Enhanced CTA Section */}
      <motion.section
        className="relative py-32"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Container>
          <motion.div
            className="relative bg-gradient-to-br from-luxury-charcoal/90 via-luxury-royal/20 to-luxury-charcoal/90 backdrop-blur-xl border border-luxury-gold/30 rounded-3xl p-16 text-center overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-luxury-gold/10 via-luxury-amber/10 to-luxury-gold/10"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2
                className="text-4xl md:text-6xl font-heading font-bold text-luxury-cream mb-6"
                animate={{ 
                  textShadow: [
                    '0 0 20px rgba(212, 175, 55, 0.3)',
                    '0 0 40px rgba(212, 175, 55, 0.6)',
                    '0 0 20px rgba(212, 175, 55, 0.3)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
              Can't Decide?
              </motion.h2>
              
              <motion.p
                className="text-xl text-luxury-cream/80 mb-12 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
              Take our personalized scent discovery quiz to find your perfect fragrance match.
                Our AI-powered recommendation system will guide you to your ideal scent.
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
            <Link href="/quiz">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      size="lg" 
                      className="px-12 py-6 text-lg bg-gradient-to-r from-luxury-gold to-luxury-amber hover:from-luxury-amber hover:to-luxury-gold transition-all duration-500 shadow-2xl shadow-luxury-gold/30"
                    >
                      <span className="flex items-center space-x-3">
                        <span>Start Your Journey</span>
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          ✨
                        </motion.span>
                      </span>
              </Button>
                  </motion.div>
            </Link>
                
            <Link href="/about">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="px-12 py-6 text-lg border-luxury-gold/50 hover:border-luxury-gold hover:bg-luxury-gold/10 transition-all duration-500"
                    >
                Learn More
              </Button>
                  </motion.div>
            </Link>
              </motion.div>
            </motion.div>
          </motion.div>
      </Container>
      </motion.section>
    </div>
  )
}
