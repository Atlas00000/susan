'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'

const features = [
  {
    title: 'Curated Collections',
    description: 'Handpicked fragrances from the world\'s finest perfumers'
  },
  {
    title: 'Scent Discovery',
    description: 'Find your perfect match with our personalized quiz'
  },
  {
    title: 'Luxury Experience',
    description: 'Premium packaging and exceptional customer service'
  },
  {
    title: 'Natural Ingredients',
    description: 'Ethically sourced, high-quality fragrance components'
  }
]

export function FeatureStrip() {
  return (
    <section className="py-16 bg-luxury-charcoal/50 border-y border-luxury-gold/10">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="luxury" size="lg" className="mb-4">
            Why Choose Sanaya's Scents
          </Badge>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-luxury-cream mb-4">
            Luxury Redefined
          </h2>
          <p className="text-luxury-cream/70 text-lg max-w-2xl mx-auto">
            Experience the art of fragrance with our carefully curated collection 
            and personalized discovery process.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <h3 className="text-xl font-heading font-semibold text-luxury-cream mb-2">
                {feature.title}
              </h3>
              <p className="text-luxury-cream/70 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
