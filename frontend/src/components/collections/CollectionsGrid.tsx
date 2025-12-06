'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { CollectionCard } from './CollectionCard'

interface CollectionsGridProps {
  collections: any[]
}

export function CollectionsGrid({ collections }: CollectionsGridProps) {
  const [hoveredCollection, setHoveredCollection] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {collections.map((collection, index) => (
        <CollectionCard
          key={collection.id}
          collection={collection}
          index={index}
          isHovered={hoveredCollection === collection.id}
          onHover={setHoveredCollection}
        />
      ))}
    </motion.div>
  )
}

