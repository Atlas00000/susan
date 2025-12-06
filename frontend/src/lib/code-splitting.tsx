/**
 * Code Splitting Utilities
 * 
 * Provides utilities for optimizing dynamic imports,
 * lazy loading components, and managing bundle sizes
 */

import React from 'react'
import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

/**
 * Dynamic import options for better code splitting
 */
export const DYNAMIC_IMPORT_OPTIONS = {
  // Load immediately but don't block rendering
  ssr: true,
  // Show loading state
  loading: () => (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="w-8 h-8 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin" />
    </div>
  ),
}

/**
 * Lazy load component with loading state
 */
export function lazyLoadComponent<P = {}>(
  importFunc: () => Promise<{ default: ComponentType<P> }>,
  options?: {
    ssr?: boolean
    loading?: () => React.ReactElement | null
  }
) {
  return dynamic(importFunc, {
    ssr: options?.ssr ?? true,
    loading: options?.loading ?? DYNAMIC_IMPORT_OPTIONS.loading,
  })
}

/**
 * Lazy load component only on client side
 */
export function lazyLoadClientComponent<P = {}>(
  importFunc: () => Promise<{ default: ComponentType<P> }>
) {
  return dynamic(importFunc, {
    ssr: false,
    loading: DYNAMIC_IMPORT_OPTIONS.loading,
  })
}

/**
 * Preload component for better performance
 */
export function preloadComponent(importFunc: () => Promise<any>) {
  if (typeof window !== 'undefined') {
    // Preload on client side
    importFunc()
  }
}

/**
 * Check if component should be lazy loaded
 * Based on viewport visibility or user interaction
 */
export function shouldLazyLoad(
  isAboveFold: boolean,
  requiresInteraction: boolean = false
): boolean {
  // Always load above-the-fold content immediately
  if (isAboveFold) return false
  
  // Lazy load below-the-fold or interactive content
  return true
}
