'use client'

import { useState, useRef, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { FAQHeader } from '@/components/faq/FAQHeader'
import { FAQBackground } from '@/components/faq/FAQBackground'
import { FAQSearch } from '@/components/faq/FAQSearch'
import { FAQItem } from '@/components/faq/FAQItem'
import { FAQCTA } from '@/components/faq/FAQCTA'

const faqs = [
  {
    id: 1,
    question: 'How do I choose the right fragrance for me?',
    answer:
      'We recommend taking our personalized scent quiz, which analyzes your preferences, lifestyle, and personality to suggest the perfect fragrance. You can also explore our fragrance categories or contact our scent consultants for personalized advice.',
  },
  {
    id: 2,
    question: 'What is the difference between eau de parfum and eau de toilette?',
    answer:
      'Eau de parfum (EDP) has a higher concentration of fragrance oils (15-20%) and lasts 6-8 hours, while eau de toilette (EDT) has a lower concentration (5-15%) and lasts 3-4 hours. EDP is more intense and long-lasting, perfect for special occasions.',
  },
  {
    id: 3,
    question: 'How should I store my fragrances?',
    answer:
      'Store your fragrances in a cool, dry place away from direct sunlight and heat. Keep them in their original boxes when not in use. Avoid storing in bathrooms due to humidity and temperature changes that can affect the fragrance quality.',
  },
  {
    id: 4,
    question: 'Do you offer international shipping?',
    answer:
      'Yes, we ship to over 25 countries worldwide. Shipping costs and delivery times vary by location. We use premium packaging to ensure your fragrances arrive in perfect condition.',
  },
  {
    id: 5,
    question: 'What is your return policy?',
    answer:
      'We offer a 30-day return policy for unopened products. If you\'re not satisfied with your purchase, you can return it for a full refund or exchange. Opened products can be returned within 14 days for store credit.',
  },
  {
    id: 6,
    question: 'Are your fragrances cruelty-free and vegan?',
    answer:
      'Yes, all our fragrances are cruelty-free and many are vegan. We\'re committed to ethical and sustainable practices in all our products.',
  },
]

export function InteractiveFAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  const toggleItem = (id: number) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase())
  }

  const filteredFAQs = useMemo(() => {
    if (!searchQuery) return faqs
    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchQuery) ||
        faq.answer.toLowerCase().includes(searchQuery)
    )
  }, [searchQuery])

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-luxury-royal/10 via-luxury-charcoal to-luxury-amber/10"
    >
      {/* Animated Background */}
      <FAQBackground />

      {/* Content Container */}
      <Container className="relative z-10">
        {/* Header */}
        <FAQHeader />

        {/* Search */}
        <FAQSearch onSearch={handleSearch} />

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <FAQItem
                key={faq.id}
                id={faq.id}
                question={faq.question}
                answer={faq.answer}
                index={index}
                isOpen={openItems.includes(faq.id)}
                onToggle={toggleItem}
                isInView={isInView}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12 bg-luxury-charcoal/70 backdrop-blur-xl border border-luxury-gold/20 rounded-[2rem]"
            >
              <p className="text-luxury-cream/70 text-lg">
                No results found. Try a different search term.
              </p>
            </motion.div>
          )}
        </div>

        {/* CTA Section */}
        <FAQCTA />
      </Container>
    </section>
  )
}
