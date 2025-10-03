import { Container } from '@/components/ui/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { getCollectionById } from '@/data/collections'
import { getProductsByCategory } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'

interface CollectionPageProps {
  params: {
    collection: string
  }
}

export default function CollectionPage({ params }: CollectionPageProps) {
  const collection = getCollectionById(params.collection)
  
  if (!collection) {
    notFound()
  }

  const products = getProductsByCategory(collection.category)

  return (
    <div className="min-h-screen bg-luxury-charcoal relative">
      <Container className="py-16">
        {/* Collection Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Badge variant="luxury" size="lg" className="mr-4">
              {products.length} Fragrances
            </Badge>
            {collection.featured && (
              <Badge variant="outline" size="lg">
                Featured Collection
              </Badge>
            )}
          </div>
          
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-luxury-cream mb-6">
            {collection.name}
          </h1>
          <p className="text-xl text-luxury-cream/70 max-w-3xl mx-auto leading-relaxed">
            {collection.description}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <Card key={product.id} hover className="group">
              <CardHeader>
                <div className="aspect-square bg-luxury-charcoal/50 rounded-lg overflow-hidden mb-4 relative">
                  {product.images && product.images[0] ? (
                    <Image
                      src={product.images[0] as string}
                      alt={product.name}
                      fill
                      priority={index === 0}
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
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <Badge 
                    variant={product.availability === 'limited' ? 'luxury' : 'default'} 
                    size="sm"
                  >
                    {product.availability === 'limited' ? 'Limited' : 'In Stock'}
                  </Badge>
                  {product.featured && (
                    <Badge variant="outline" size="sm">
                      Featured
                    </Badge>
                  )}
                </div>
                
                <CardTitle className="text-xl group-hover:text-luxury-gold transition-colors">
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
                          +{product.notes.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="text-2xl font-heading font-bold text-luxury-gold">
                    {formatPrice(product.price)}
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link href={`/products/${product.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </Link>
                    <Button size="sm" className="px-3">
                      ♡
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Back to Collections */}
        <div className="mt-16 text-center">
          <Link href="/collections">
            <Button variant="ghost" size="lg">
              ← Back to All Collections
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  )
}
