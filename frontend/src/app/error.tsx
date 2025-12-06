'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-luxury-charcoal text-luxury-cream flex items-center justify-center p-6">
      <Container>
        <div className="max-w-md text-center space-y-6 mx-auto">
          <h1 className="text-3xl font-heading font-bold">Something went wrong</h1>
          <p className="text-luxury-cream/70">Please try again or go back home.</p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => reset()} variant="outline">Try again</Button>
            <Link href="/"><Button>Go Home</Button></Link>
          </div>
        </div>
      </Container>
    </div>
  )
}


