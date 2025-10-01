import { Container } from '@/components/ui/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - Our Story & Mission',
  description: 'Learn about Sanaya\'s Scents - our passion for luxury fragrances, commitment to authenticity, and mission to help you discover your perfect scent.',
  keywords: ['about sanaya scents', 'luxury fragrance story', 'perfume mission', 'scent discovery company'],
  openGraph: {
    title: 'About Sanaya\'s Scents - Our Story & Mission',
    description: 'Learn about our passion for luxury fragrances and commitment to helping you discover your perfect scent.',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-luxury-charcoal">
      <Container className="py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-luxury-cream mb-6">
            Our <span className="luxury-text-gradient">Story</span>
          </h1>
          <p className="text-xl text-luxury-cream/70 max-w-3xl mx-auto leading-relaxed">
            Discover the passion, craftsmanship, and vision behind Sanaya's Scents. 
            Every fragrance tells a story, and we're here to help you find yours.
          </p>
        </motion.div>

        {/* Brand Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-heading font-bold text-luxury-cream mb-6">
                The Art of Scent
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg text-luxury-cream/80 leading-relaxed">
                At Sanaya's Scents, we believe that perfume isn't just a fragrance—it's a mood, a memory, a story, a signature. 
                Our journey began with a simple yet profound understanding: the crave of perfumes is not just because of its availability, 
                but rather, often times it affects how we feel about ourselves, drives confidence and in situations gives a boost of support.
              </p>
              
              <p className="text-lg text-luxury-cream/80 leading-relaxed">
                Founded on the principle that every individual deserves to discover their perfect scent match, we curate the world's 
                finest fragrances with an unwavering commitment to quality, authenticity, and personal connection. Our collection spans 
                from ancient oud traditions to modern gourmand innovations, each bottle carefully selected to tell a unique story.
              </p>
              
              <p className="text-lg text-luxury-cream/80 leading-relaxed">
                We understand that choosing a fragrance is deeply personal. That's why we've created our signature scent discovery quiz—a 
                journey of self-exploration that guides you to your perfect match. Allow us to walk with you on your scent discovery journey, 
                where every question leads to a deeper understanding of your unique fragrance personality.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-luxury-cream mb-4">
              Our Values
            </h2>
            <p className="text-luxury-cream/70 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Authenticity',
                description: 'We source only the finest, most authentic fragrances from trusted artisans and renowned houses worldwide.',
                icon: '✨'
              },
              {
                title: 'Personal Connection',
                description: 'Every recommendation is tailored to your unique personality, preferences, and lifestyle.',
                icon: '💫'
              },
              {
                title: 'Luxury Experience',
                description: 'From discovery to delivery, we provide an unparalleled luxury experience that exceeds expectations.',
                icon: '👑'
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <Card hover className="h-full">
                  <CardHeader className="text-center">
                    <div className="text-4xl mb-4">{value.icon}</div>
                    <CardTitle className="text-xl font-heading font-bold text-luxury-cream">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-luxury-cream/70 leading-relaxed">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-luxury-cream mb-4">
              Our Process
            </h2>
            <p className="text-luxury-cream/70 max-w-2xl mx-auto">
              How we help you discover your perfect scent
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Discovery',
                description: 'Take our personalized scent discovery quiz to understand your fragrance preferences.'
              },
              {
                step: '02',
                title: 'Analysis',
                description: 'Our algorithm analyzes your answers to create your unique scent profile.'
              },
              {
                step: '03',
                title: 'Recommendation',
                description: 'We curate a personalized selection of fragrances just for you.'
              },
              {
                step: '04',
                title: 'Experience',
                description: 'Discover, explore, and fall in love with your perfect scent match.'
              }
            ].map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                className="text-center"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-heading font-bold text-luxury-gold">
                      {process.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-luxury-cream mb-2">
                    {process.title}
                  </h3>
                  <p className="text-luxury-cream/70 leading-relaxed">
                    {process.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center"
        >
          <Card className="max-w-4xl mx-auto bg-luxury-charcoal/50 backdrop-blur-sm border border-luxury-gold/20">
            <CardContent className="p-12">
              <h2 className="text-3xl font-heading font-bold text-luxury-cream mb-4">
                Ready to Discover Your Signature Scent?
              </h2>
              <p className="text-luxury-cream/70 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers who have found their perfect fragrance match through our personalized discovery process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/quiz">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start Your Journey
                  </Button>
                </Link>
                <Link href="/collections">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Explore Collections
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
