import { Container } from '@/components/ui/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ProductImage } from '@/components/ui/ProductImage'
import { getProductById } from '@/data/products'
import { getCollectionById } from '@/data/collections'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'

interface ProductPageProps {
  params: {
    product: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.product)
  
  if (!product) {
    notFound()
  }

  const collection = getCollectionById(product.category)

  return (
    <div className="min-h-screen bg-luxury-charcoal">
      <Container className="py-16">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-luxury-cream/70">
            <Link href="/collections" className="hover:text-luxury-gold transition-colors">
              Collections
            </Link>
            <span>/</span>
            {collection && (
              <>
                <Link href={`/collections/${collection.id}`} className="hover:text-luxury-gold transition-colors">
                  {collection.name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-luxury-cream">{product.name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-luxury-charcoal/50 rounded-2xl overflow-hidden relative">
              <ProductImage 
                src={product.images[0]} 
                alt={product.name}
              />
            </div>
            
            {/* Additional Images Placeholder */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-luxury-charcoal/30 rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-luxury-gold/5 flex items-center justify-center">
                    <span className="text-luxury-gold/30 text-xs">+</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <Badge 
                  variant={product.availability === 'limited' ? 'luxury' : 'default'} 
                  size="lg"
                >
                  {product.availability === 'limited' ? 'Limited Edition' : 'In Stock'}
                </Badge>
                {product.featured && (
                  <Badge variant="outline" size="lg">
                    Featured
                  </Badge>
                )}
                {collection && (
                  <Link href={`/collections/${collection.id}`}>
                    <Badge variant="secondary" size="lg">
                      {collection.name}
                    </Badge>
                  </Link>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-luxury-cream mb-4">
                {product.name}
              </h1>
              
              <p className="text-xl text-luxury-cream/70 leading-relaxed mb-6">
                {product.description}
              </p>
              
              <div className="text-3xl font-heading font-bold text-luxury-gold">
                {formatPrice(product.price)}
              </div>
            </div>

            {/* Scent Story */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-luxury-cream">Scent Story</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-luxury-cream/80 leading-relaxed">
                  {product.story}
                </p>
              </CardContent>
            </Card>

            {/* Scent Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-luxury-cream">Scent Notes</CardTitle>
                <CardDescription>
                  The key ingredients that make this fragrance unique
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {product.notes.map((note) => (
                    <Badge key={note} variant="luxury" size="lg" className="justify-center">
                      {note}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Mood & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-luxury-cream">Mood</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline" size="lg">
                    {product.mood.replace('-', ' & ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Badge>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-luxury-cream">Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary" size="lg">
                    {product.category.replace('-', ' ').toUpperCase()}
                  </Badge>
                </CardContent>
              </Card>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <Button size="lg" className="flex-1">
                  Add to Wishlist
                </Button>
                <Button variant="outline" size="lg" className="flex-1">
                  Share
                </Button>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-luxury-cream/70 mb-2">
                  Need help choosing? Take our scent discovery quiz
                </p>
                <Link href="/quiz">
                  <Button variant="ghost" size="sm">
                    Find Your Perfect Match
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {collection && (
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-luxury-cream mb-4">
                More from {collection.name}
              </h2>
              <p className="text-luxury-cream/70">
                Discover other fragrances in this collection
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {collection.products
                .filter(p => p.id !== product.id)
                .slice(0, 3)
                .map((relatedProduct, index) => (
                  <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`}>
                    <Card hover className="group cursor-pointer">
                      <CardHeader>
                        <div className="aspect-square bg-luxury-charcoal/50 rounded-lg overflow-hidden mb-4 relative">
                          {relatedProduct.images && relatedProduct.images[0] ? (
                            <Image
                              src={relatedProduct.images[0]}
                              alt={relatedProduct.name}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              priority={index === 0}
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full bg-luxury-gold/10 flex items-center justify-center">
                              <span className="text-luxury-gold/50 text-sm font-medium">
                                {relatedProduct.name}
                              </span>
                            </div>
                          )}
                        </div>
                        <CardTitle className="text-lg group-hover:text-luxury-gold transition-colors">
                          {relatedProduct.name}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {relatedProduct.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xl font-heading font-bold text-luxury-gold">
                          {formatPrice(relatedProduct.price)}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
            
            <div className="text-center mt-8">
              <Link href={`/collections/${collection.id}`}>
                <Button variant="outline" size="lg">
                  View All in {collection.name}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}
