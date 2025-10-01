import { Container } from '@/components/ui/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import Link from 'next/link'

const guideArticles = [
  {
    id: 'fragrance-families',
    title: 'Understanding Fragrance Families',
    description: 'Discover the main categories of fragrances and how to identify your preferences.',
    category: 'Basics',
    readTime: '5 min read',
    featured: true
  },
  {
    id: 'scent-notes',
    title: 'The Art of Scent Notes',
    description: 'Learn about top, middle, and base notes and how they create the perfect fragrance.',
    category: 'Education',
    readTime: '7 min read',
    featured: true
  },
  {
    id: 'application-tips',
    title: 'How to Apply Perfume Like a Pro',
    description: 'Master the art of fragrance application for maximum impact and longevity.',
    category: 'Tips',
    readTime: '4 min read',
    featured: false
  },
  {
    id: 'seasonal-scents',
    title: 'Seasonal Fragrance Guide',
    description: 'Choose the perfect scent for every season and occasion.',
    category: 'Seasonal',
    readTime: '6 min read',
    featured: false
  },
  {
    id: 'storage-care',
    title: 'Caring for Your Fragrances',
    description: 'Learn how to properly store and maintain your perfume collection.',
    category: 'Care',
    readTime: '3 min read',
    featured: false
  },
  {
    id: 'gift-guide',
    title: 'Fragrance Gift Guide',
    description: 'The perfect guide to choosing fragrances as gifts for your loved ones.',
    category: 'Gifting',
    readTime: '8 min read',
    featured: false
  }
]

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-luxury-charcoal">
      <Container className="py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-luxury-cream mb-6">
            Fragrance <span className="luxury-text-gradient">Guide</span>
          </h1>
          <p className="text-xl text-luxury-cream/70 max-w-3xl mx-auto leading-relaxed">
            Master the art of fragrance with our comprehensive guides, tips, and insights. 
            From beginners to connoisseurs, discover everything you need to know about perfumes.
          </p>
        </motion.div>

        {/* Featured Articles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-heading font-bold text-luxury-cream mb-8">
            Featured Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {guideArticles
              .filter(article => article.featured)
              .map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <Card hover className="h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="luxury" size="sm">
                          {article.category}
                        </Badge>
                        <span className="text-sm text-luxury-cream/50">
                          {article.readTime}
                        </span>
                      </div>
                      <CardTitle className="text-2xl font-heading font-bold text-luxury-cream mb-2">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="text-luxury-cream/70 leading-relaxed">
                        {article.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link href={`/guide/${article.id}`}>
                        <Button variant="outline" className="w-full">
                          Read Article
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* All Articles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-heading font-bold text-luxury-cream mb-8">
            All Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guideArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                <Card hover className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" size="sm">
                        {article.category}
                      </Badge>
                      <span className="text-xs text-luxury-cream/50">
                        {article.readTime}
                      </span>
                    </div>
                    <CardTitle className="text-lg font-heading font-bold text-luxury-cream mb-2">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="text-luxury-cream/70 text-sm leading-relaxed">
                      {article.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href={`/guide/${article.id}`}>
                      <Button variant="ghost" size="sm" className="w-full">
                        Read More →
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-20 text-center"
        >
          <Card className="max-w-4xl mx-auto bg-luxury-charcoal/50 backdrop-blur-sm border border-luxury-gold/20">
            <CardContent className="p-12">
              <h2 className="text-3xl font-heading font-bold text-luxury-cream mb-4">
                Ready to Put Your Knowledge to Use?
              </h2>
              <p className="text-luxury-cream/70 mb-8 max-w-2xl mx-auto">
                Now that you've learned about fragrances, discover your perfect scent match with our personalized quiz.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/quiz">
                  <Button size="lg" className="w-full sm:w-auto">
                    Take the Quiz
                  </Button>
                </Link>
                <Link href="/collections">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Browse Collections
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </div>
  )
}
