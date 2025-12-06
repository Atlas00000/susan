'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-luxury-charcoal text-luxury-cream flex items-center justify-center p-6">
        <div className="max-w-md text-center space-y-6">
          <h1 className="text-3xl font-heading font-bold">Something went wrong!</h1>
          <p className="text-luxury-cream/70">We apologize for the inconvenience.</p>
          <div className="flex gap-3 justify-center flex-col sm:flex-row">
            <Button onClick={() => reset()} variant="outline">
              Try again
            </Button>
            <Link href="/">
              <Button>Go Home</Button>
            </Link>
          </div>
        </div>
      </body>
    </html>
  )
}

