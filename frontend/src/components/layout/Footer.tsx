import Link from 'next/link'
import { Container } from '@/components/ui/Container'

export function Footer() {
  const footerLinks = {
    shop: [
      { name: 'All Collections', href: '/collections' },
      { name: 'Oud & Rich', href: '/collections/oud-rich' },
      { name: 'Amber & Gold', href: '/collections/amber-gold' },
      { name: 'Floral & Fresh', href: '/collections/floral-fresh' },
    ],
    discover: [
      { name: 'Scent Quiz', href: '/quiz' },
      { name: 'Our Story', href: '/about' },
      { name: 'Fragrance Guide', href: '/guide' },
      { name: 'Gift Guide', href: '/gifts' },
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
      { name: 'FAQ', href: '/faq' },
    ],
  }

  return (
    <footer className="bg-luxury-charcoal border-t border-luxury-gold/20">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-luxury-gold rounded-full flex items-center justify-center">
                  <span className="text-luxury-charcoal font-heading font-bold text-lg">S</span>
                </div>
                <span className="text-xl font-heading font-semibold text-luxury-cream">
                  Sanaya's Scents
                </span>
              </Link>
              <p className="text-luxury-cream/70 text-sm leading-relaxed">
                Discover your signature scent through our curated collection of luxury fragrances. 
                Your scent is your story.
              </p>
            </div>

            {/* Shop */}
            <div>
              <h3 className="text-luxury-cream font-heading font-semibold mb-4">Shop</h3>
              <ul className="space-y-2">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-luxury-cream/70 hover:text-luxury-gold transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Discover */}
            <div>
              <h3 className="text-luxury-cream font-heading font-semibold mb-4">Discover</h3>
              <ul className="space-y-2">
                {footerLinks.discover.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-luxury-cream/70 hover:text-luxury-gold transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-luxury-cream font-heading font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-luxury-cream/70 hover:text-luxury-gold transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="mt-12 pt-8 border-t border-luxury-gold/20">
            <div className="max-w-md">
              <h3 className="text-luxury-cream font-heading font-semibold mb-2">
                Stay in the Scent
              </h3>
              <p className="text-luxury-cream/70 text-sm mb-4">
                Get exclusive access to new collections and scent stories.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-luxury-charcoal/50 border border-luxury-gold/30 rounded-lg text-luxury-cream placeholder-luxury-cream/50 focus:outline-none focus:border-luxury-gold"
                />
                <button className="px-6 py-2 bg-luxury-gold text-luxury-charcoal rounded-lg hover:bg-luxury-gold/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-luxury-gold/20">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-luxury-cream/50 text-sm">
                © 2024 Sanaya's Scents. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="/privacy" className="text-luxury-cream/50 hover:text-luxury-gold text-sm">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-luxury-cream/50 hover:text-luxury-gold text-sm">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
