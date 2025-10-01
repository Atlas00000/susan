'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false)
  const [newsletterEmail, setNewsletterEmail] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Form submitted:', formData)
    setIsSubmitting(false)
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
    
    alert('Thank you for your message! We\'ll get back to you soon.')
  }

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsNewsletterSubmitting(true)
    
    // Simulate newsletter signup
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log('Newsletter signup:', newsletterEmail)
    setIsNewsletterSubmitting(false)
    setNewsletterEmail('')
    
    alert('Thank you for subscribing to our newsletter!')
  }

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
            Get in <span className="luxury-text-gradient">Touch</span>
          </h1>
          <p className="text-xl text-luxury-cream/70 max-w-3xl mx-auto leading-relaxed">
            Have questions about our fragrances? Need help finding your perfect scent? 
            We're here to help you on your fragrance journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-heading font-bold text-luxury-cream mb-2">
                  Send us a Message
                </CardTitle>
                <CardDescription className="text-luxury-cream/70">
                  We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-luxury-cream mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-luxury-charcoal/50 border border-luxury-gold/30 rounded-lg text-luxury-cream placeholder-luxury-cream/50 focus:outline-none focus:border-luxury-gold transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-luxury-cream mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-luxury-charcoal/50 border border-luxury-gold/30 rounded-lg text-luxury-cream placeholder-luxury-cream/50 focus:outline-none focus:border-luxury-gold transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-luxury-cream mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-luxury-charcoal/50 border border-luxury-gold/30 rounded-lg text-luxury-cream placeholder-luxury-cream/50 focus:outline-none focus:border-luxury-gold transition-colors"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-luxury-cream mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-luxury-charcoal/50 border border-luxury-gold/30 rounded-lg text-luxury-cream placeholder-luxury-cream/50 focus:outline-none focus:border-luxury-gold transition-colors resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info & Newsletter */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-heading font-bold text-luxury-cream mb-4">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-luxury-gold/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-luxury-gold">📧</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-luxury-cream mb-1">Email</h3>
                    <p className="text-luxury-cream/70">hello@sanayascents.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-luxury-gold/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-luxury-gold">📞</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-luxury-cream mb-1">Phone</h3>
                    <p className="text-luxury-cream/70">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-luxury-gold/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-luxury-gold">🕒</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-luxury-cream mb-1">Hours</h3>
                    <p className="text-luxury-cream/70">Monday - Friday: 9AM - 6PM</p>
                    <p className="text-luxury-cream/70">Saturday: 10AM - 4PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-heading font-bold text-luxury-cream mb-2">
                  Stay in the Scent
                </CardTitle>
                <CardDescription className="text-luxury-cream/70">
                  Get exclusive access to new collections, scent stories, and special offers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="newsletter-email" className="block text-sm font-medium text-luxury-cream mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="newsletter-email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-luxury-charcoal/50 border border-luxury-gold/30 rounded-lg text-luxury-cream placeholder-luxury-cream/50 focus:outline-none focus:border-luxury-gold transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    variant="outline" 
                    className="w-full"
                    disabled={isNewsletterSubmitting}
                  >
                    {isNewsletterSubmitting ? 'Subscribing...' : 'Subscribe to Newsletter'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-heading font-bold text-luxury-cream mb-4">
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-luxury-cream mb-2">
                    How do I choose the right fragrance?
                  </h3>
                  <p className="text-luxury-cream/70 text-sm">
                    Take our personalized scent discovery quiz to find your perfect match based on your preferences and lifestyle.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-luxury-cream mb-2">
                    Do you offer samples?
                  </h3>
                  <p className="text-luxury-cream/70 text-sm">
                    Yes! We offer sample sets so you can try before you buy. Contact us for more information.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-luxury-cream mb-2">
                    What's your return policy?
                  </h3>
                  <p className="text-luxury-cream/70 text-sm">
                    We offer a 30-day return policy for unopened products. Contact us for return instructions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>
    </div>
  )
}
