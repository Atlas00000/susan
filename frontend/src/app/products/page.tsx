'use client'

import { Container } from '@/components/ui/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { mockProducts } from '@/data/products'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { formatPrice } from '@/lib/utils'

export default function ProductsIndexPage() {
  const products = mockProducts

  return (
    <div className="min-h-screen bg-luxury-charcoal">
      <Container className="py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-heading font-bold text-luxury-cream mb-4">All Products</h1>
          <p className="text-luxury-cream/70">Explore our full catalog of luxury fragrances</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <Card hover className="group cursor-pointer">
                <CardHeader>
                  <div className="aspect-square bg-luxury-charcoal/50 rounded-xl overflow-hidden relative mb-4">
                    {product.images && product.images[0] ? (
                      <Image
                        src={product.images[0] as string}
                        alt={product.name}
                        fill
                        priority={index < 2}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-luxury-gold/10">
                        <span className="text-luxury-gold/60 text-sm font-medium line-clamp-2 px-2 text-center">
                          {product.name}
                        </span>
                      </div>
                    )}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={product.availability === 'limited' ? 'luxury' : 'default'} size="sm">
                      {product.availability === 'limited' ? 'Limited' : 'In Stock'}
                    </Badge>
                    {product.featured && (
                      <Badge variant="outline" size="sm">Featured</Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg group-hover:text-luxury-gold transition-colors">{product.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-heading font-bold text-luxury-gold">{formatPrice(product.price)}</span>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  )
}


