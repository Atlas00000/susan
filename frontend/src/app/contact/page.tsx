'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { motion } from 'framer-motion'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSuccess, setNewsletterSuccess] = useState(false)

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
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
    setErrors({})
    
    alert('Thank you for your message! We\'ll get back to you soon.')
  }

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateEmail(newsletterEmail)) {
      return
    }
    
    setIsNewsletterSubmitting(true)
    
    // Simulate newsletter signup
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log('Newsletter signup:', newsletterEmail)
    setIsNewsletterSubmitting(false)
    setNewsletterEmail('')
    setNewsletterSuccess(true)
    
    setTimeout(() => setNewsletterSuccess(false), 3000)
  }

  return (
    <div className="min-h-screen bg-luxury-charcoal">
      <Container className="py-16">
        {/* Header */}
        <ScrollReveal variant="fadeInUp" className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-luxury-cream mb-6">
            Get in <span className="luxury-text-gradient">Touch</span>
          </h1>
          <p className="text-xl text-luxury-cream/70 max-w-3xl mx-auto leading-relaxed">
            Have questions about our fragrances? Need help finding your perfect scent? 
            We're here to help you on your fragrance journey.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <ScrollReveal variant="slideInLeft" delay={0.2}>
            <Card variant="glass-premium" hover="glow">
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
                    <Input
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      error={errors.name}
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={errors.email}
                      required
                    />
                  </div>
                  
                  <Input
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    error={errors.subject}
                    required
                  />
                  
                  <Textarea
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    error={errors.message}
                    rows={5}
                    required
                  />
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    variant="premium"
                    className="w-full"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Contact Info & Newsletter */}
          <ScrollReveal variant="slideInRight" delay={0.4} className="space-y-8">
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
                  </div>
                  <div>
                    <h3 className="font-medium text-luxury-cream mb-1">Email</h3>
                    <p className="text-luxury-cream/70">hello@sanayascents.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-luxury-gold/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  </div>
                  <div>
                    <h3 className="font-medium text-luxury-cream mb-1">Phone</h3>
                    <p className="text-luxury-cream/70">+2349132993582</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-luxury-gold/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
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
            <Card variant="glass-premium" hover="glow">
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
                  <Input
                    label="Email Address"
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    success={newsletterSuccess}
                    helperText={newsletterSuccess ? 'Successfully subscribed!' : undefined}
                    required
                  />
                  
                  <Button 
                    type="submit" 
                    variant="premium"
                    className="w-full"
                    loading={isNewsletterSubmitting}
                    disabled={isNewsletterSubmitting || newsletterSuccess}
                  >
                    {newsletterSuccess ? 'Subscribed!' : isNewsletterSubmitting ? 'Subscribing...' : 'Subscribe to Newsletter'}
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
          </ScrollReveal>
        </div>
      </Container>
    </div>
  )
}
