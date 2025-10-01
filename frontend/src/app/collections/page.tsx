import { Container } from '@/components/ui/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { collections } from '@/data/collections'
import Link from 'next/link'
import Image from 'next/image'

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-luxury-charcoal">
      <Container className="py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-luxury-cream mb-6">
            Our <span className="luxury-text-gradient">Collections</span>
          </h1>
          <p className="text-xl text-luxury-cream/70 max-w-3xl mx-auto leading-relaxed">
            Discover our carefully curated fragrance collections, each telling a unique story of luxury, 
            sophistication, and personal expression.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <Card key={collection.id} hover className="group">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="luxury" size="sm">
                    {collection.products.length} Fragrances
                  </Badge>
                  {collection.featured && (
                    <Badge variant="outline" size="sm">
                      Featured
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-2xl group-hover:text-luxury-gold transition-colors">
                  {collection.name}
                </CardTitle>
                <CardDescription className="text-luxury-cream/70 leading-relaxed">
                  {collection.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {/* Sample Product Images */}
                  <div className="grid grid-cols-2 gap-2">
                    {collection.products.slice(0, 4).map((product, index) => (
                      <div key={product.id} className="aspect-square bg-luxury-charcoal/50 rounded-lg overflow-hidden">
                        <div className="w-full h-full bg-luxury-gold/10 flex items-center justify-center">
                          <span className="text-luxury-gold/50 text-xs font-medium">
                            {product.name.split(' ')[0]}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4">
                    <Link href={`/collections/${collection.id}`}>
                      <Button variant="outline" className="w-full group-hover:bg-luxury-gold group-hover:text-luxury-charcoal transition-all">
                        Explore Collection
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-luxury-charcoal/50 backdrop-blur-sm border border-luxury-gold/20 rounded-2xl p-12">
            <h2 className="text-3xl font-heading font-bold text-luxury-cream mb-4">
              Can't Decide?
            </h2>
            <p className="text-luxury-cream/70 mb-8 max-w-2xl mx-auto">
              Take our personalized scent discovery quiz to find your perfect fragrance match.
            </p>
            <Link href="/quiz">
              <Button size="lg" className="mr-4">
                Start Your Journey
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}
