import { Container } from '@/components/ui/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers - Join Our Team',
  description: 'Join Sanaya\'s Scents and be part of our mission to help people discover their perfect fragrance. Explore career opportunities in luxury retail and fragrance expertise.',
  keywords: ['careers', 'jobs', 'luxury retail', 'fragrance jobs', 'perfume careers'],
  openGraph: {
    title: 'Careers at Sanaya\'s Scents - Join Our Team',
    description: 'Join our mission to help people discover their perfect fragrance. Explore career opportunities in luxury retail.',
  },
}

const jobOpenings = [
  {
    id: 'fragrance-specialist',
    title: 'Fragrance Specialist',
    department: 'Sales & Customer Experience',
    location: 'Remote / New York',
    type: 'Full-time',
    description: 'Help customers discover their perfect scent through personalized consultations and expert knowledge.',
    requirements: [
      '2+ years experience in luxury retail or fragrance industry',
      'Passion for perfumes and scent knowledge',
      'Excellent communication and customer service skills',
      'Ability to work flexible hours including weekends'
    ]
  },
  {
    id: 'digital-marketing-manager',
    title: 'Digital Marketing Manager',
    department: 'Marketing',
    location: 'Remote',
    type: 'Full-time',
    description: 'Lead our digital marketing efforts to reach fragrance enthusiasts and grow our online presence.',
    requirements: [
      '3+ years digital marketing experience',
      'Experience with luxury brands preferred',
      'Proficiency in social media and content marketing',
      'Analytical mindset with strong ROI focus'
    ]
  },
  {
    id: 'customer-success-specialist',
    title: 'Customer Success Specialist',
    department: 'Customer Experience',
    location: 'Remote',
    type: 'Full-time',
    description: 'Ensure our customers have an exceptional experience from discovery to purchase and beyond.',
    requirements: [
      '1+ years customer service experience',
      'Passion for helping others',
      'Strong problem-solving skills',
      'Experience with CRM systems preferred'
    ]
  }
]

export default function CareersPage() {
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
            Join Our <span className="luxury-text-gradient">Team</span>
          </h1>
          <p className="text-xl text-luxury-cream/70 max-w-3xl mx-auto leading-relaxed">
            Be part of our mission to help people discover their perfect fragrance. 
            Join a passionate team dedicated to luxury, authenticity, and personal connection.
          </p>
        </motion.div>

        {/* Why Work With Us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-luxury-cream mb-4">
              Why Work With Us?
            </h2>
            <p className="text-luxury-cream/70 max-w-2xl mx-auto">
              Join a company that values passion, growth, and making a difference in people's lives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Passionate Team',
                description: 'Work with people who share your love for fragrances and luxury experiences.',
                icon: '💫'
              },
              {
                title: 'Growth Opportunities',
                description: 'Advance your career in the growing luxury fragrance industry.',
                icon: '🚀'
              },
              {
                title: 'Flexible Work',
                description: 'Remote-first culture with flexible hours and work-life balance.',
                icon: '🏠'
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <Card hover className="h-full text-center">
                  <CardHeader>
                    <div className="text-4xl mb-4">{benefit.icon}</div>
                    <CardTitle className="text-xl font-heading font-bold text-luxury-cream">
                      {benefit.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-luxury-cream/70 leading-relaxed">
                      {benefit.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Current Openings */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-luxury-cream mb-4">
              Current Openings
            </h2>
            <p className="text-luxury-cream/70 max-w-2xl mx-auto">
              Explore our current career opportunities and find your perfect role.
            </p>
          </div>

          <div className="space-y-8">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                <Card hover className="max-w-4xl mx-auto">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <CardTitle className="text-2xl font-heading font-bold text-luxury-cream mb-2">
                          {job.title}
                        </CardTitle>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="secondary">{job.department}</Badge>
                          <Badge variant="outline">{job.location}</Badge>
                          <Badge variant="luxury">{job.type}</Badge>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-luxury-cream/70 text-lg leading-relaxed mb-6">
                      {job.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <h3 className="text-lg font-heading font-semibold text-luxury-cream mb-3">
                        Requirements:
                      </h3>
                      <ul className="space-y-2">
                        {job.requirements.map((requirement, reqIndex) => (
                          <li key={reqIndex} className="flex items-start space-x-2">
                            <span className="text-luxury-gold mt-1">•</span>
                            <span className="text-luxury-cream/70">{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button size="lg" className="flex-1">
                        Apply Now
                      </Button>
                      <Button variant="outline" size="lg" className="flex-1">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Application Process */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-luxury-cream mb-4">
              Application Process
            </h2>
            <p className="text-luxury-cream/70 max-w-2xl mx-auto">
              Our simple 3-step process makes it easy to join our team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Apply Online',
                description: 'Submit your application with your resume and cover letter through our online portal.'
              },
              {
                step: '02',
                title: 'Initial Interview',
                description: 'We\'ll schedule a video call to learn more about you and your passion for fragrances.'
              },
              {
                step: '03',
                title: 'Final Interview',
                description: 'Meet the team and discuss how you can contribute to our mission.'
              }
            ].map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
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
          transition={{ duration: 0.6, delay: 1.4 }}
          className="text-center"
        >
          <Card className="max-w-4xl mx-auto bg-luxury-charcoal/50 backdrop-blur-sm border border-luxury-gold/20">
            <CardContent className="p-12">
              <h2 className="text-3xl font-heading font-bold text-luxury-cream mb-4">
                Don't See Your Perfect Role?
              </h2>
              <p className="text-luxury-cream/70 mb-8 max-w-2xl mx-auto">
                We're always looking for passionate individuals to join our team. 
                Send us your resume and tell us how you'd like to contribute to our mission.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="w-full sm:w-auto">
                    Contact Us
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  General Application
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </div>
  )
}
