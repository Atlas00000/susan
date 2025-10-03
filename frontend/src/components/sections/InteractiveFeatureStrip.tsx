'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const features = [
  {
    icon: '🎯',
    title: 'Personalized Discovery',
    description: 'Take our intelligent scent quiz to find your perfect fragrance match tailored to your personality',
    color: 'from-luxury-gold to-luxury-amber',
    delay: 0.1,
    stats: '95% Match Rate',
    cta: 'Start Quiz'
  },
  {
    icon: '✨',
    title: 'Premium Quality',
    description: 'Handcrafted with the finest ingredients sourced from the world\'s most prestigious suppliers',
    color: 'from-luxury-royal to-luxury-gold',
    delay: 0.2,
    stats: '100% Authentic',
    cta: 'Explore Quality'
  },
  {
    icon: '🌹',
    title: 'Luxury Experience',
    description: 'Every scent tells a story of elegance and sophistication, curated for the modern connoisseur',
    color: 'from-luxury-amber to-luxury-royal',
    delay: 0.3,
    stats: '50+ Stories',
    cta: 'Read Stories'
  },
  {
    icon: '💎',
    title: 'Exclusive Collections',
    description: 'Limited edition fragrances for the discerning few who appreciate true luxury and rarity',
    color: 'from-luxury-gold to-luxury-royal',
    delay: 0.4,
    stats: 'Limited Editions',
    cta: 'View Collection'
  }
]

const testimonials = [
  {
    text: "The scent discovery quiz led me to my perfect match. It's like they know me better than I know myself.",
    author: "Sarah M.",
    rating: 5
  },
  {
    text: "Finally found a fragrance that truly represents who I am. The quality is absolutely exceptional.",
    author: "James L.",
    rating: 5
  },
  {
    text: "The luxury experience from start to finish is unmatched. Every detail is perfection.",
    author: "Emma K.",
    rating: 5
  }
]

export function InteractiveFeatureStrip() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  // Enhanced parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.05])

  // Mouse tracking for interactive effects
  const mouseX = useSpring(useMotionValue(mousePosition.x / 50), { stiffness: 150, damping: 15 })
  const mouseY = useSpring(useMotionValue(mousePosition.y / 50), { stiffness: 150, damping: 15 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.section 
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-gradient-to-b from-luxury-charcoal to-luxury-charcoal/95"
      style={{ y, opacity, scale }}
    >
      {/* Enhanced Organic Background Shapes */}
      <div className="absolute inset-0">
        {/* Dynamic Gradient Background */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: `
              radial-gradient(circle at 15% 25%, rgba(212, 175, 55, 0.15) 0%, transparent 60%),
              radial-gradient(circle at 85% 75%, rgba(65, 105, 225, 0.12) 0%, transparent 60%),
              radial-gradient(circle at 45% 65%, rgba(255, 191, 0, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 70% 20%, rgba(139, 69, 19, 0.1) 0%, transparent 45%)
            `
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
            {/* Optimized Floating Elements - Reduced from 12 to 6 */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute border border-luxury-gold/20 rounded-full ${
                  i % 2 === 0 ? 'w-16 h-16' : 'w-10 h-10'
                }`}
                style={{
                  left: `${10 + i * 15}%`,
                  top: `${15 + (i % 3) * 30}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 6 + i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}

        {/* Interactive Mouse Followers */}
        <motion.div
          className="absolute w-64 h-64 bg-luxury-gold/5 rounded-full blur-3xl"
          style={{ x: mouseX, y: mouseY }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
            animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <Badge variant="luxury" size="lg" className="mb-8 relative group">
              <motion.span
                className="relative z-10"
                animate={{ 
                  textShadow: [
                    "0 0 0px rgba(212, 175, 55, 0)",
                    "0 0 20px rgba(212, 175, 55, 0.5)",
                    "0 0 0px rgba(212, 175, 55, 0)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
              Why Choose Sanaya's Scents
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-luxury-gold/20 to-luxury-royal/20 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </Badge>
          </motion.div>
          
          <motion.h2 
            className="text-5xl md:text-7xl font-heading font-bold text-luxury-cream mb-8 leading-tight"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <motion.span
              className="block mb-2"
              initial={{ opacity: 0, x: -100, rotateX: -90 }}
              animate={isInView ? { opacity: 1, x: 0, rotateX: 0 } : {}}
              transition={{ delay: 0.8, duration: 1, type: "spring", stiffness: 80 }}
            >
              Experience
            </motion.span>
            <motion.span
              className="block luxury-text-gradient relative"
              initial={{ opacity: 0, x: 100, rotateX: 90 }}
              animate={isInView ? { opacity: 1, x: 0, rotateX: 0 } : {}}
              transition={{ delay: 1, duration: 1, type: "spring", stiffness: 80 }}
              style={{
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 4s ease infinite'
              }}
            >
              Luxury
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-luxury-gold/10 to-luxury-royal/10 rounded-lg blur-2xl -z-10"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-xl text-luxury-cream/80 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            Discover the art of fragrance with our carefully curated collection and personalized discovery process. 
            Every scent tells a story, every bottle holds a dream.
          </motion.p>
        </motion.div>

        {/* SPECTACULAR Interactive Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative perspective-1000"
              initial={{ opacity: 0, y: 150, rotateX: -45, scale: 0.8 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
              transition={{ 
                delay: feature.delay, 
                duration: 1.2,
                type: "spring",
                stiffness: 60,
                damping: 15
              }}
              whileHover={{ 
                y: -30,
                scale: 1.08,
                rotateY: hoveredIndex === index ? 5 : 0,
                rotateX: hoveredIndex === index ? -5 : 0,
                transition: { duration: 0.4, type: "spring" }
              }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="relative h-full transform-gpu">
                {/* DRAMATIC 3D Background Layers */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-20"
                  style={{
                    background: `linear-gradient(135deg, ${feature.color})`,
                    transform: 'translateZ(-10px)',
                  }}
                  animate={{
                    scale: hoveredIndex === index ? [1, 1.2, 1] : 1,
                    opacity: hoveredIndex === index ? [0.2, 0.4, 0.2] : 0.2,
                    rotate: hoveredIndex === index ? [0, 180, 360] : 0,
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                    {/* Optimized Particle System - Reduced from 8 to 4 */}
                    {[...Array(4)].map((_, particleIndex) => (
                      <motion.div
                        key={particleIndex}
                        className="absolute w-2 h-2 bg-luxury-gold rounded-full opacity-0"
                        style={{
                          left: `${25 + particleIndex * 15}%`,
                          top: `${35 + (particleIndex % 2) * 25}%`,
                        }}
                        animate={hoveredIndex === index ? {
                          opacity: [0, 0.8, 0],
                          scale: [0, 1.2, 0],
                          y: [0, -40, -80],
                        } : {
                          opacity: 0,
                          scale: 0,
                          y: 0,
                        }}
                        transition={{
                          duration: 1.5,
                          delay: particleIndex * 0.15,
                          repeat: hoveredIndex === index ? Infinity : 0,
                        }}
                      />
                    ))}
                
                {/* MAIN SPECTACULAR CARD */}
                <motion.div 
                  className="relative bg-gradient-to-br from-luxury-charcoal/80 via-luxury-charcoal/60 to-luxury-charcoal/80 backdrop-blur-xl border-2 border-luxury-gold/30 rounded-3xl p-8 h-full overflow-hidden"
                  style={{
                    transformStyle: 'preserve-3d',
                    boxShadow: hoveredIndex === index 
                      ? '0 25px 50px -12px rgba(212, 175, 55, 0.4), 0 0 0 1px rgba(212, 175, 55, 0.1)' 
                      : '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
                  }}
                  animate={{
                    borderColor: hoveredIndex === index 
                      ? ['rgba(212, 175, 55, 0.3)', 'rgba(212, 175, 55, 0.8)', 'rgba(212, 175, 55, 0.3)']
                      : 'rgba(212, 175, 55, 0.3)',
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {/* LIQUID GOLD OVERLAY */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-luxury-gold/10 via-transparent to-luxury-royal/10 opacity-0"
                    animate={{
                      opacity: hoveredIndex === index ? [0, 0.3, 0] : 0,
                      backgroundPosition: hoveredIndex === index ? ['0% 0%', '100% 100%', '0% 0%'] : '0% 0%',
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  {/* SPECTACULAR ICON */}
                  <motion.div
                    className="text-8xl mb-8 text-center relative"
                    animate={{
                      rotate: hoveredIndex === index ? [0, 15, -15, 0] : 0,
                      scale: hoveredIndex === index ? [1, 1.3, 1] : 1,
                      filter: hoveredIndex === index ? 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.8))' : 'none',
                    }}
                    transition={{ duration: 0.8 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <motion.span
                      className="block"
                      animate={{
                        textShadow: hoveredIndex === index ? [
                          '0 0 0px rgba(212, 175, 55, 0)',
                          '0 0 30px rgba(212, 175, 55, 0.8)',
                          '0 0 0px rgba(212, 175, 55, 0)'
                        ] : 'none'
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {feature.icon}
                    </motion.span>
                    
                    {/* ICON AURA */}
                    <motion.div
                      className="absolute inset-0 bg-luxury-gold/20 rounded-full blur-2xl -z-10"
                      animate={{
                        scale: hoveredIndex === index ? [1, 2, 1] : 0,
                        opacity: hoveredIndex === index ? [0, 0.6, 0] : 0,
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>

                  {/* DRAMATIC CONTENT */}
                  <div className="text-center space-y-6 relative z-10">
                    <motion.h3
                      className="text-2xl font-heading font-bold text-luxury-cream group-hover:text-luxury-gold transition-colors duration-500"
                      initial={{ opacity: 0, y: 30 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: feature.delay + 0.7, duration: 0.8 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {feature.title}
                    </motion.h3>
                    
                    <motion.p
                      className="text-luxury-cream/80 leading-relaxed text-lg"
                      initial={{ opacity: 0, y: 30 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: feature.delay + 0.9, duration: 0.8 }}
                    >
                      {feature.description}
                    </motion.p>

                    {/* STATISTICS BADGE */}
                    <motion.div
                      className="inline-block bg-gradient-to-r from-luxury-gold/20 to-luxury-royal/20 border border-luxury-gold/30 rounded-full px-4 py-2"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: feature.delay + 1.1, duration: 0.6 }}
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(212, 175, 55, 0.3)' }}
                    >
                      <span className="text-luxury-gold font-semibold text-sm">
                        {feature.stats}
                      </span>
                    </motion.div>

                    {/* DRAMATIC CTA BUTTON */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: feature.delay + 1.3, duration: 0.6 }}
                    >
                      <Link href="/quiz">
                        <motion.div
                          className="relative overflow-hidden rounded-xl bg-gradient-to-r from-luxury-gold to-luxury-royal p-1"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <motion.button
                            className="relative w-full bg-luxury-charcoal text-luxury-gold font-semibold py-3 px-6 rounded-xl transition-colors duration-300 hover:bg-transparent hover:text-luxury-cream"
                            animate={{
                              background: hoveredIndex === index 
                                ? ['rgba(31, 31, 31, 1)', 'rgba(31, 31, 31, 0)', 'rgba(31, 31, 31, 1)']
                                : 'rgba(31, 31, 31, 1)'
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <motion.span
                              className="relative z-10"
                              animate={{
                                textShadow: hoveredIndex === index ? [
                                  '0 0 0px rgba(212, 175, 55, 0)',
                                  '0 0 15px rgba(212, 175, 55, 0.8)',
                                  '0 0 0px rgba(212, 175, 55, 0)'
                                ] : 'none'
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              {feature.cta}
                            </motion.span>
                            
                            {/* BUTTON SHIMMER */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent"
                              animate={{
                                x: hoveredIndex === index ? ['-100%', '100%'] : '-100%',
                              }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                          </motion.button>
                        </motion.div>
                      </Link>
                    </motion.div>
                  </div>

                  {/* SPECTACULAR ANIMATED BORDER */}
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
                      borderWidth: hoveredIndex === index ? ['2px', '4px', '2px'] : '2px',
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  {/* 3D DEPTH SHADOWS */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl shadow-2xl"
                    animate={{
                      boxShadow: hoveredIndex === index ? [
                        '0 25px 50px -12px rgba(212, 175, 55, 0.4)',
                        '0 35px 70px -12px rgba(212, 175, 55, 0.6)',
                        '0 25px 50px -12px rgba(212, 175, 55, 0.4)'
                      ] : '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* SPECTACULAR TESTIMONIALS SECTION */}
        <motion.div
          className="mt-24 mb-16"
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 2.2, duration: 0.8 }}
          >
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-luxury-cream mb-4">
              <span className="luxury-text-gradient">What Our Customers Say</span>
            </h3>
            <p className="text-luxury-cream/70 text-lg">Join thousands of satisfied customers who found their perfect scent</p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* TESTIMONIAL CAROUSEL */}
            <motion.div
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-luxury-charcoal/60 to-luxury-charcoal/40 backdrop-blur-xl border border-luxury-gold/20 p-8"
              animate={{
                borderColor: [
                  'rgba(212, 175, 55, 0.2)',
                  'rgba(212, 175, 55, 0.6)',
                  'rgba(212, 175, 55, 0.2)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, x: 100, scale: 0.9 }}
                  animate={{ 
                    opacity: activeTestimonial === index ? 1 : 0,
                    x: activeTestimonial === index ? 0 : 100,
                    scale: activeTestimonial === index ? 1 : 0.9,
                    display: activeTestimonial === index ? 'block' : 'none'
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  {/* STARS */}
                  <motion.div
                    className="flex justify-center mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {[...Array(testimonial.rating)].map((_, starIndex) => (
                      <motion.span
                        key={starIndex}
                        className="text-2xl text-luxury-gold mr-1"
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0]
                        }}
                        transition={{
                          duration: 2,
                          delay: starIndex * 0.1,
                          repeat: Infinity
                        }}
                      >
                        ⭐
                      </motion.span>
                    ))}
                  </motion.div>

                  <motion.blockquote
                    className="text-xl md:text-2xl text-luxury-cream/90 leading-relaxed mb-6 font-light"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    "{testimonial.text}"
                  </motion.blockquote>

                  <motion.cite
                    className="text-luxury-gold font-semibold text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    — {testimonial.author}
                  </motion.cite>
                </motion.div>
              ))}

              {/* TESTIMONIAL INDICATORS */}
              <div className="flex justify-center mt-8 space-x-3">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeTestimonial === index 
                        ? 'bg-luxury-gold scale-125' 
                        : 'bg-luxury-gold/30 hover:bg-luxury-gold/50'
                    }`}
                    onClick={() => setActiveTestimonial(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                      boxShadow: activeTestimonial === index 
                        ? '0 0 20px rgba(212, 175, 55, 0.6)' 
                        : 'none'
                    }}
                  />
                ))}
              </div>
            </motion.div>

                {/* Optimized Floating Elements - Reduced from 6 to 3 */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-luxury-gold/15 rounded-full"
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${25 + (i % 2) * 50}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.4
                    }}
                  />
                ))}
          </div>
        </motion.div>

        {/* SPECTACULAR CALL-TO-ACTION */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <motion.div
            className="relative inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/quiz">
              <motion.div
                className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-luxury-gold via-luxury-royal to-luxury-gold p-1"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ backgroundSize: '200% 100%' }}
              >
                <motion.button
                  className="relative bg-luxury-charcoal text-luxury-cream font-bold py-4 px-12 rounded-xl text-xl transition-all duration-300 hover:bg-transparent hover:text-luxury-gold"
                  animate={{
                    textShadow: [
                      '0 0 0px rgba(212, 175, 55, 0)',
                      '0 0 20px rgba(212, 175, 55, 0.8)',
                      '0 0 0px rgba(212, 175, 55, 0)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.span
                    className="relative z-10 flex items-center gap-3"
                    animate={{
                      x: [0, 5, 0]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Start Your Luxury Journey
                    <motion.span
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ✨
                    </motion.span>
                  </motion.span>
                  
                  {/* SHIMMER EFFECT */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

        {/* SPECTACULAR FLOATING ELEMENTS */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 3, duration: 0.8 }}
        >
          <motion.div
            className="flex items-center gap-6"
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {[
              { size: 'w-4 h-4', color: 'bg-luxury-gold', delay: 0 },
              { size: 'w-3 h-3', color: 'bg-luxury-royal', delay: 0.5 },
              { size: 'w-5 h-5', color: 'bg-luxury-amber', delay: 1 },
              { size: 'w-2 h-2', color: 'bg-luxury-gold', delay: 1.5 }
            ].map((element, index) => (
              <motion.div
                key={index}
                className={`${element.size} ${element.color} rounded-full`}
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.4, 1, 0.4],
                  rotate: [0, 360, 0],
                }}
                transition={{
                  duration: 3,
                  delay: element.delay,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
