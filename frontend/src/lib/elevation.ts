/**
 * Elevation & Depth System
 * 
 * Provides utilities for creating depth and elevation in the UI
 * following the UI overhaul philosophy
 */

// Z-index layers
export const zIndex = {
  background: -10,
  base: 0,
  content: 10,
  elevated: 20,
  cards: 30,
  sticky: 40,
  header: 50,
  modal: 60,
  overlay: 70,
  tooltip: 80,
  popover: 90,
  notification: 100,
} as const

// Elevation levels with shadow definitions
export const elevation = {
  level0: {
    shadow: 'none',
    zIndex: zIndex.base,
  },
  level1: {
    shadow: '0 1px 3px rgba(0, 0, 0, 0.12)',
    zIndex: zIndex.content,
  },
  level2: {
    shadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
    zIndex: zIndex.elevated,
  },
  level3: {
    shadow: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
    zIndex: zIndex.cards,
  },
  level4: {
    shadow: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
    zIndex: zIndex.cards,
  },
  premium: {
    shadow: '0 0 40px rgba(200, 169, 106, 0.3)',
    zIndex: zIndex.elevated,
  },
  premiumLarge: {
    shadow: '0 0 60px rgba(200, 169, 106, 0.4)',
    zIndex: zIndex.elevated,
  },
} as const

/**
 * Get elevation classes for Tailwind
 */
export function getElevationClass(level: keyof typeof elevation): string {
  const elevationMap: Record<keyof typeof elevation, string> = {
    level0: 'shadow-elevation-0',
    level1: 'shadow-elevation-1',
    level2: 'shadow-elevation-2',
    level3: 'shadow-elevation-3',
    level4: 'shadow-elevation-4',
    premium: 'shadow-premium-glow',
    premiumLarge: 'shadow-premium-glow-lg',
  }
  return elevationMap[level] || elevationMap.level1
}

/**
 * Get z-index class for Tailwind
 */
export function getZIndexClass(layer: keyof typeof zIndex): string {
  const zIndexMap: Record<keyof typeof zIndex, string> = {
    background: 'z-[-10]',
    base: 'z-0',
    content: 'z-10',
    elevated: 'z-20',
    cards: 'z-30',
    sticky: 'z-40',
    header: 'z-50',
    modal: 'z-60',
    overlay: 'z-70',
    tooltip: 'z-80',
    popover: 'z-90',
    notification: 'z-[100]',
  }
  return zIndexMap[layer] || zIndexMap.base
}

/**
 * Combine elevation and z-index classes
 */
export function getDepthClasses(
  elevationLevel: keyof typeof elevation,
  zIndexLayer?: keyof typeof zIndex
): string {
  const classes = [getElevationClass(elevationLevel)]
  if (zIndexLayer) {
    classes.push(getZIndexClass(zIndexLayer))
  }
  return classes.join(' ')
}

