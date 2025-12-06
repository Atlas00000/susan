'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Product } from '@/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  className?: string
  animated?: boolean
}

export function ProductCard({ product, className, animated = true }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
  }

  const cardContent = (
    <Card
      variant="glass-premium"
      hover="premium"
      padding="md"
      className={cn('group cursor-pointer relative overflow-hidden', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader>
        {/* Product Image with 3D effect */}
        <div className="aspect-square bg-luxury-charcoal/50 rounded-xl overflow-hidden mb-4 relative">
          <motion.div
            className="relative w-full h-full"
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <img 
              src={product.images[0]} 
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div className="w-full h-full bg-luxury-gold/10 flex items-center justify-center absolute inset-0" style={{display: 'none'}}>
              <span className="text-luxury-gold/50 text-sm font-medium">
                {product.name}
              </span>
            </div>
          </motion.div>
          
          {/* Gradient overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/80 via-transparent to-transparent pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Like Button */}
          <motion.button
            onClick={handleLike}
            className="absolute top-3 right-3 w-10 h-10 glass-medium rounded-full flex items-center justify-center z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              className={cn(
                'text-lg font-semibold',
                isLiked ? 'text-error-500' : 'text-luxury-cream/70'
              )}
              animate={{
                scale: isLiked ? [1, 1.3, 1] : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {isLiked ? 'Liked' : 'Like'}
            </motion.span>
          </motion.button>

          {/* Featured Badge */}
          {product.featured && (
            <motion.div
              className="absolute top-3 left-3 z-10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <Badge variant="luxury" size="sm" className="glow-premium">
                Featured
              </Badge>
            </motion.div>
          )}

          {/* Quick view overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-luxury-charcoal/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button variant="premium" size="md" className="z-10">
              Quick View
            </Button>
          </motion.div>
        </div>
        
        {/* Product Info */}
        <div className="flex items-center justify-between mb-2">
          <Badge 
            variant={product.availability === 'limited' ? 'luxury' : 'default'} 
            size="sm"
          >
            {product.availability === 'limited' ? 'Limited' : 'In Stock'}
          </Badge>
          <span className="text-xs text-luxury-cream/50 font-medium uppercase tracking-wide">
            {product.category.replace('-', ' ')}
          </span>
        </div>
        
        <CardTitle className="text-xl group-hover:text-luxury-gold transition-colors line-clamp-2 mb-2">
          {product.name}
        </CardTitle>
        <CardDescription className="text-luxury-cream/70 line-clamp-2 text-sm">
          {product.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Scent Notes */}
          {product.notes && product.notes.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-luxury-cream/60 mb-2 uppercase tracking-wide">
                Scent Notes
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {product.notes.slice(0, 3).map((note, index) => (
                  <motion.div
                    key={note}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Badge variant="secondary" size="sm" className="glass-light">
                      {note}
                    </Badge>
                  </motion.div>
                ))}
                {product.notes.length > 3 && (
                  <Badge variant="outline" size="sm" className="glass-light">
                    +{product.notes.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          )}
          
          {/* Mood */}
          {product.mood && (
            <div>
              <h4 className="text-xs font-semibold text-luxury-cream/60 mb-1.5 uppercase tracking-wide">
                Mood
              </h4>
              <Badge variant="outline" size="sm" className="glass-light">
                {product.mood.replace('-', ' & ').replace(/\b\w/g, l => l.toUpperCase())}
              </Badge>
            </div>
          )}
          
          {/* Price */}
          <motion.div
            className="text-2xl font-heading font-bold luxury-text-gradient"
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            {formatPrice(product.price)}
          </motion.div>
          
          {/* Actions */}
          <motion.div
            className="flex gap-2 pt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: isHovered ? 1 : 0.7,
              y: isHovered ? 0 : 5,
            }}
            transition={{ duration: 0.3 }}
          >
            <Button
              variant="outline"
              size="sm"
              className="flex-1 group-hover:bg-luxury-gold group-hover:text-luxury-charcoal transition-all"
              magnetic
            >
              View Details
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="px-3 group-hover:bg-luxury-gold/20 transition-all"
              magnetic
            >
              <span className="text-sm font-medium">Like</span>
            </Button>
          </motion.div>
        </div>
      </CardContent>

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ x: '-100%' }}
        animate={{
          x: isHovered ? '100%' : '-100%',
        }}
        transition={{
          duration: 0.6,
          ease: 'easeInOut',
        }}
      >
        <div className="w-full h-full shimmer-gold" />
      </motion.div>
    </Card>
  )

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <Link href={`/products/${product.id}`}>
          {cardContent}
        </Link>
      </motion.div>
    )
  }

  return (
    <Link href={`/products/${product.id}`}>
      {cardContent}
    </Link>
  )
}
