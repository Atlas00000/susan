import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { ClientParticles404 } from '../components/ui/ClientParticles404'

export const metadata = {
  title: 'Page Not Found',
  description: "We couldn't find the page you're looking for.",
} as const

export default function NotFound() {
  return (
    <div className="min-h-screen bg-luxury-charcoal relative overflow-hidden">
      <ClientParticles404 />
      <Container className="py-24 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-8xl md:text-9xl font-heading font-bold text-luxury-cream mb-6">
            <span className="bg-gradient-to-r from-luxury-gold via-luxury-amber to-luxury-gold bg-clip-text text-transparent">
              404
            </span>
          </h1>
          <p className="text-xl text-luxury-cream/70 mb-10">
            The page you’re looking for has drifted into the ether. Let’s guide you back to something delightful.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button size="lg" className="px-10">Go Home</Button>
            </Link>
            <Link href="/collections">
              <Button variant="outline" size="lg" className="px-10">Explore Collections</Button>
            </Link>
            <Link href="/quiz">
              <Button variant="ghost" size="lg" className="px-10">Find Your Scent</Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}


