'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

interface CollectionCardProps {
  collection: {
    id: string
    name: string
    description: string
    products: any[]
    featured?: boolean
  }
  index: number
  isHovered: boolean
  onHover: (id: string | null) => void
}

export function CollectionCard({
  collection,
  index,
  isHovered,
  onHover,
}: CollectionCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
    })
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => onHover(collection.id)}
      onHoverEnd={() => onHover(null)}
    >
      <motion.div
        className="relative h-full rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(30, 30, 30, 0.7), rgba(20, 20, 20, 0.9))',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(212, 175, 55, 0.2)',
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateX: mousePosition.y,
          rotateY: mousePosition.x,
        }}
        whileHover={{
          scale: 1.02,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Morphing background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-luxury-gold/10 via-transparent to-luxury-royal/10"
          animate={{
            opacity: isHovered ? 1 : 0.5,
            scale: isHovered ? 1.1 : 1,
            borderRadius: isHovered
              ? ['30% 70% 70% 30% / 30% 30% 70% 70%', '70% 30% 30% 70% / 70% 70% 30% 30%']
              : '30% 70% 70% 30% / 30% 30% 70% 70%',
          }}
          transition={{
            duration: 0.6,
            ease: 'easeInOut',
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-8 h-full flex flex-col">
          {/* Header with badges */}
          <div className="flex items-center justify-between mb-6">
            <motion.div
              animate={{
                scale: isHovered ? 1.1 : 1,
                y: isHovered ? -2 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <Badge
                variant="luxury"
                size="sm"
                className="shadow-lg backdrop-blur-sm"
              >
                {collection.products.length} Fragrances
              </Badge>
            </motion.div>
            {collection.featured && (
              <motion.div
                animate={{
                  rotate: isHovered ? [0, 5, -5, 0] : 0,
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.5 }}
              >
                <Badge
                  variant="outline"
                  size="sm"
                  className="bg-luxury-gold/20 backdrop-blur-sm"
                >
                  Featured
                </Badge>
              </motion.div>
            )}
          </div>

          {/* Title and Description */}
          <motion.div
            className="mb-6 flex-1"
            animate={{
              y: isHovered ? -5 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.h3
              className="text-3xl font-heading font-bold text-luxury-cream mb-4 group-hover:text-luxury-gold transition-colors duration-500"
              animate={{
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {collection.name}
            </motion.h3>
            <p className="text-luxury-cream/80 leading-relaxed text-lg">
              {collection.description}
            </p>
          </motion.div>

          {/* Product Preview Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {collection.products.slice(0, 4).map((product: any, productIndex: number) => (
              <motion.div
                key={product.id}
                className="aspect-square rounded-xl overflow-hidden relative group/product"
                style={{
                  background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(212, 175, 55, 0.05))',
                  border: '1px solid rgba(212, 175, 55, 0.15)',
                }}
                animate={{
                  scale: isHovered ? 1.05 : 1,
                  y: isHovered ? -3 : 0,
                }}
                transition={{
                  duration: 0.3,
                  delay: productIndex * 0.05,
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 2,
                  borderColor: 'rgba(212, 175, 55, 0.4)',
                }}
              >
                {product.images && product.images[0] ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover/product:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-luxury-gold/60 text-sm font-semibold">
                      {product.name.split(' ')[0]}
                    </span>
                  </div>
                )}

                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/90 via-transparent to-transparent opacity-0 group-hover/product:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                >
                  <div className="absolute bottom-2 left-2 right-2">
                    <span className="text-luxury-gold text-xs font-semibold block truncate">
                      {product.name.split(' ')[0]}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            animate={{
              y: isHovered ? -3 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <Link href={`/collections/${collection.id}`}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  className="w-full relative overflow-hidden group/button"
                  style={{
                    borderColor: 'rgba(212, 175, 55, 0.3)',
                    background: isHovered
                      ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(212, 175, 55, 0.05))'
                      : 'transparent',
                  }}
                >
                  <motion.span
                    className="flex items-center justify-center space-x-2 relative z-10"
                    animate={{
                      x: isHovered ? [0, 3, 0] : 0,
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: isHovered ? Infinity : 0,
                      ease: 'easeInOut',
                    }}
                  >
                    <span>Explore Collection</span>
                    <motion.span
                      animate={{
                        rotate: isHovered ? 360 : 0,
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: isHovered ? Infinity : 0,
                      }}
                    >
                      →
                    </motion.span>
                  </motion.span>

                  {/* Liquid shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/10 to-transparent"
                    animate={{
                      x: isHovered ? ['-100%', '100%'] : '-100%',
                    }}
                    transition={{
                      duration: 2,
                      repeat: isHovered ? Infinity : 0,
                      ease: 'linear',
                    }}
                  />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Glowing border effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            border: '1px solid rgba(212, 175, 55, 0.2)',
          }}
          animate={{
            opacity: isHovered ? [0.3, 0.6, 0.3] : 0.2,
            boxShadow: isHovered
              ? [
                  '0 0 20px rgba(212, 175, 55, 0.1)',
                  '0 0 40px rgba(212, 175, 55, 0.2)',
                  '0 0 20px rgba(212, 175, 55, 0.1)',
                ]
              : '0 0 0px rgba(212, 175, 55, 0)',
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </motion.div>
  )
}

