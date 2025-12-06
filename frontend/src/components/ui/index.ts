/**
 * UI Components Index
 * 
 * Centralized exports for all UI components
 * following the modular approach
 */

// Core components
export { Button } from './Button'
export type { ButtonProps } from './Button'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card'
export type { CardProps } from './Card'

export { Input } from './Input'
export type { InputProps } from './Input'

export { Textarea } from './Textarea'
export type { TextareaProps } from './Textarea'

export { Glass } from './Glass'
export type { GlassProps } from './Glass'

export { GradientText } from './GradientText'
export type { GradientTextProps } from './GradientText'

export { Modal } from './Modal'
export type { ModalProps } from './Modal'

export { Overlay } from './Overlay'
export type { OverlayProps } from './Overlay'

export { Dialog } from './Dialog'
export type { DialogProps } from './Dialog'

// Variants (for advanced usage)
export { buttonVariants, buttonSizes, getButtonVariantClasses, getButtonSizeClasses } from './button-variants'
export type { ButtonVariant, ButtonSize } from './button-variants'

export { cardVariants, cardPadding, cardHoverStyles, getCardVariantClasses, getCardPaddingClasses, getCardHoverClasses } from './card-variants'
export type { CardVariant, CardPadding, CardHover } from './card-variants'

