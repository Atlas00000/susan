'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Product } from '@/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
  }

  return (
    <Link href={`/products/${product.id}`}>
      <Card hover className={`group cursor-pointer ${className}`}>
        <CardHeader>
          {/* Product Image */}
          <div className="aspect-square bg-luxury-charcoal/50 rounded-lg overflow-hidden mb-4 relative">
            <img 
              src={product.images[0]} 
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                // Fallback to placeholder if image fails to load
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
            
            {/* Like Button */}
            <button
              onClick={handleLike}
              className="absolute top-2 right-2 w-8 h-8 bg-luxury-charcoal/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-luxury-gold hover:text-luxury-charcoal transition-all"
            >
              <span className={`text-sm ${isLiked ? 'text-luxury-gold' : 'text-luxury-cream/70'}`}>
                {isLiked ? '♥' : '♡'}
              </span>
            </button>

            {/* Featured Badge */}
            {product.featured && (
              <div className="absolute top-2 left-2">
                <Badge variant="luxury" size="sm">
                  Featured
                </Badge>
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div className="flex items-center justify-between mb-2">
            <Badge 
              variant={product.availability === 'limited' ? 'luxury' : 'default'} 
              size="sm"
            >
              {product.availability === 'limited' ? 'Limited' : 'In Stock'}
            </Badge>
            <span className="text-sm text-luxury-cream/50">
              {product.category.replace('-', ' ').toUpperCase()}
            </span>
          </div>
          
          <CardTitle className="text-xl group-hover:text-luxury-gold transition-colors line-clamp-2">
            {product.name}
          </CardTitle>
          <CardDescription className="text-luxury-cream/70 line-clamp-2">
            {product.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {/* Scent Notes */}
            <div>
              <h4 className="text-sm font-medium text-luxury-cream mb-2">Scent Notes</h4>
              <div className="flex flex-wrap gap-1">
                {product.notes.slice(0, 3).map((note) => (
                  <Badge key={note} variant="secondary" size="sm">
                    {note}
                  </Badge>
                ))}
                {product.notes.length > 3 && (
                  <Badge variant="outline" size="sm">
                    +{product.notes.length - 3}
                  </Badge>
                )}
              </div>
            </div>
            
            {/* Mood */}
            <div>
              <h4 className="text-sm font-medium text-luxury-cream mb-1">Mood</h4>
              <Badge variant="outline" size="sm">
                {product.mood.replace('-', ' & ').replace(/\b\w/g, l => l.toUpperCase())}
              </Badge>
            </div>
            
            {/* Price */}
            <div className="text-2xl font-heading font-bold text-luxury-gold">
              {formatPrice(product.price)}
            </div>
            
            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm" className="flex-1 group-hover:bg-luxury-gold group-hover:text-luxury-charcoal transition-all">
                View Details
              </Button>
              <Button size="sm" className="px-3 group-hover:bg-luxury-gold group-hover:text-luxury-charcoal transition-all">
                Add to Wishlist
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
