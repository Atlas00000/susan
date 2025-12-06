/**
 * UI Overhaul Utilities Index
 * 
 * Centralized exports for all UI overhaul utilities
 * following the modular approach
 */

// Animation utilities
export {
  easing,
  duration,
  stagger,
  getStaggerDelay,
  motionVariants,
  prefersReducedMotion,
  getAnimationConfig,
} from './animations'

// Elevation utilities
export {
  zIndex,
  elevation,
  getElevationClass,
  getZIndexClass,
  getDepthClasses,
} from './elevation'

// Spacing utilities
export {
  spacing,
  sectionSpacing,
  componentSpacing,
  containerWidths,
  getResponsiveSpacing,
  getSectionPadding,
  getContainerClass,
} from './spacing'

// Glassmorphism utilities
export {
  glassPresets,
  glassGradient,
  getGlassStyle,
  getGlassClasses,
  getGlassGradientStyle,
} from './glassmorphism'

