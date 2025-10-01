import { Container } from '@/components/ui/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { getCollectionById } from '@/data/collections'
import { getProductsByCategory } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
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
    <div className="min-h-screen bg-luxury-charcoal">
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
          {products.map((product) => (
            <Card key={product.id} hover className="group">
              <CardHeader>
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
