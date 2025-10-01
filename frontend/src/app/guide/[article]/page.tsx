import { Container } from '@/components/ui/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface ArticlePageProps {
  params: {
    article: string
  }
}

const articleContent: Record<string, any> = {
  'fragrance-families': {
    title: 'Understanding Fragrance Families',
    category: 'Basics',
    readTime: '5 min read',
    content: `
      <h2>The Four Main Fragrance Families</h2>
      <p>Understanding fragrance families is the foundation of perfume knowledge. Each family has distinct characteristics that help you identify your preferences.</p>
      
      <h3>1. Floral Family</h3>
      <p>The most popular family, featuring notes like rose, jasmine, and lily. Perfect for those who love fresh, feminine scents.</p>
      
      <h3>2. Oriental Family</h3>
      <p>Rich, warm, and exotic fragrances with notes like vanilla, amber, and spices. Ideal for evening wear and special occasions.</p>
      
      <h3>3. Woody Family</h3>
      <p>Earthy, sophisticated scents featuring sandalwood, cedar, and patchouli. Great for both men and women who prefer natural, grounding fragrances.</p>
      
      <h3>4. Fresh Family</h3>
      <p>Light, clean, and invigorating scents with citrus and aquatic notes. Perfect for daily wear and warm weather.</p>
    `
  },
  'scent-notes': {
    title: 'The Art of Scent Notes',
    category: 'Education',
    readTime: '7 min read',
    content: `
      <h2>Understanding the Fragrance Pyramid</h2>
      <p>Every perfume is composed of three layers of notes that unfold over time, creating the complete fragrance experience.</p>
      
      <h3>Top Notes (Head Notes)</h3>
      <p>These are the first scents you notice when you apply a fragrance. They're light, volatile, and evaporate quickly. Common top notes include citrus, herbs, and light fruits.</p>
      
      <h3>Middle Notes (Heart Notes)</h3>
      <p>The heart of the fragrance, these notes emerge after the top notes fade. They're usually floral or fruity and last for several hours.</p>
      
      <h3>Base Notes (Dry Down)</h3>
      <p>The foundation of the fragrance, these notes are the longest-lasting and include woods, musks, and resins. They can last for hours or even days.</p>
    `
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = articleContent[params.article]
  
  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-luxury-charcoal">
      <Container className="py-16">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-luxury-cream/70">
            <Link href="/guide" className="hover:text-luxury-gold transition-colors">
              Guide
            </Link>
            <span>/</span>
            <span className="text-luxury-cream">{article.title}</span>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <Badge variant="luxury" size="lg">
                {article.category}
              </Badge>
              <span className="text-luxury-cream/50">
                {article.readTime}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-luxury-cream mb-6">
              {article.title}
            </h1>
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-8">
                <div 
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Related Articles */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-heading font-bold text-luxury-cream mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(articleContent)
                .filter(([key]) => key !== params.article)
                .slice(0, 2)
                .map(([key, relatedArticle]) => (
                  <Link key={key} href={`/guide/${key}`}>
                    <Card hover className="h-full">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary" size="sm">
                            {relatedArticle.category}
                          </Badge>
                          <span className="text-xs text-luxury-cream/50">
                            {relatedArticle.readTime}
                          </span>
                        </div>
                        <CardTitle className="text-lg font-heading font-bold text-luxury-cream">
                          {relatedArticle.title}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
            </div>
          </motion.div>

          {/* Back to Guide */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Link href="/guide">
              <Button variant="ghost" size="lg">
                ← Back to Guide
              </Button>
            </Link>
          </motion.div>
        </div>
      </Container>
    </div>
  )
}
