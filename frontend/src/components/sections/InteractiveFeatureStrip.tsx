'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Badge } from '@/components/ui/Badge'

const features = [
  {
    icon: '🎯',
    title: 'Personalized Discovery',
    description: 'Take our scent quiz to find your perfect fragrance match',
    color: 'from-luxury-gold to-luxury-amber',
    delay: 0.1
  },
  {
    icon: '✨',
    title: 'Premium Quality',
    description: 'Handcrafted with the finest ingredients from around the world',
    color: 'from-luxury-royal to-luxury-gold',
    delay: 0.2
  },
  {
    icon: '🌹',
    title: 'Luxury Experience',
    description: 'Every scent tells a story of elegance and sophistication',
    color: 'from-luxury-amber to-luxury-royal',
    delay: 0.3
  },
  {
    icon: '💎',
    title: 'Exclusive Collections',
    description: 'Limited edition fragrances for the discerning few',
    color: 'from-luxury-gold to-luxury-royal',
    delay: 0.4
  }
]

export function InteractiveFeatureStrip() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const isInView = useInView(containerRef, { once: true, amount: 0.3 })

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])

  return (
    <section 
      ref={containerRef}
      className="relative py-24 overflow-hidden"
      style={{ y, opacity }}
    >
      {/* Organic Background Shapes */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(65, 105, 225, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(255, 191, 0, 0.05) 0%, transparent 50%)
            `
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Floating Geometric Shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-16 border border-luxury-gold/20 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
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
              Why Choose Sanaya's Scents
            </Badge>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-luxury-cream mb-6">
            <motion.span
              className="block"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Experience
            </motion.span>
            <motion.span
              className="block bg-gradient-to-r from-luxury-gold to-luxury-royal bg-clip-text text-transparent"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Luxury
            </motion.span>
          </h2>
        </motion.div>

        {/* Interactive Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative"
              initial={{ opacity: 0, y: 100, rotateX: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ 
                delay: feature.delay, 
                duration: 0.8,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -20,
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <div className="relative h-full">
                {/* Organic Shape Background */}
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: `linear-gradient(135deg, ${feature.color})`,
                    opacity: 0.1
                  }}
                  animate={{
                    scale: hoveredIndex === index ? [1, 1.1, 1] : 1,
                    opacity: hoveredIndex === index ? [0.1, 0.2, 0.1] : 0.1,
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Main Content */}
                <div className="relative bg-luxury-charcoal/40 backdrop-blur-md border border-luxury-gold/20 rounded-3xl p-8 h-full group-hover:border-luxury-gold/40 transition-all duration-500">
                  {/* Icon */}
                  <motion.div
                    className="text-6xl mb-6 text-center"
                    animate={{
                      rotate: hoveredIndex === index ? [0, 10, -10, 0] : 0,
                      scale: hoveredIndex === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {feature.icon}
                  </motion.div>

                  {/* Content */}
                  <div className="text-center space-y-4">
                    <motion.h3
                      className="text-xl font-heading font-bold text-luxury-cream group-hover:text-luxury-gold transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: feature.delay + 0.5, duration: 0.6 }}
                    >
                      {feature.title}
                    </motion.h3>
                    
                    <motion.p
                      className="text-luxury-cream/70 leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: feature.delay + 0.7, duration: 0.6 }}
                    >
                      {feature.description}
                    </motion.p>
                  </div>

                  {/* Hover Effect Overlay */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-br from-luxury-gold/5 to-luxury-royal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />

                  {/* Animated Border */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl border-2 border-transparent"
                    style={{
                      background: `linear-gradient(135deg, ${feature.color}) border-box`,
                      WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                    }}
                    animate={{
                      backgroundPosition: hoveredIndex === index ? ['0% 0%', '100% 100%', '0% 0%'] : '0% 0%',
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Action Elements */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.div
            className="flex items-center gap-4"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div
              className="w-3 h-3 bg-luxury-gold rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="w-2 h-2 bg-luxury-royal rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="w-4 h-4 bg-luxury-amber rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.9, 0.4],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
