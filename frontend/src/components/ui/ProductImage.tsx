'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ProductImageProps {
  src: string
  alt: string
  className?: string
}

export function ProductImage({ src, alt, className = "object-cover" }: ProductImageProps) {
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    setHasError(true)
  }

  if (hasError) {
    return (
      <div className="w-full h-full bg-luxury-gold/10 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🌸</div>
          <span className="text-luxury-gold/50 text-lg font-medium">
            {alt}
          </span>
        </div>
      </div>
    )
  }

  return (
    <Image 
      src={src} 
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className={className}
      priority={false}
      onError={() => setHasError(true)}
    />
  )
}
