'use client'

import { forwardRef } from 'react'
import { Overlay } from './Overlay'
import { Modal, ModalProps } from './Modal'

export interface DialogProps extends Omit<ModalProps, 'isOpen' | 'onClose'> {
  isOpen: boolean
  onClose?: () => void
  overlayVariant?: 'light' | 'medium' | 'heavy'
  overlayBlur?: boolean
  closeOnOverlayClick?: boolean
}

/**
 * Dialog Component
 * 
 * Combines Modal and Overlay for complete dialog experience
 * Features:
 * - Overlay backdrop
 * - Modal content
 * - Coordinated animations
 * - Click outside to close
 */
const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  ({ 
    isOpen,
    onClose,
    overlayVariant = 'medium',
    overlayBlur = true,
    closeOnOverlayClick = true,
    ...modalProps 
  }, ref) => {
    const handleOverlayClose = () => {
      if (closeOnOverlayClick && onClose) {
        onClose()
      }
    }

    return (
      <>
        <Overlay
          isOpen={isOpen}
          onClose={handleOverlayClose}
          variant={overlayVariant}
          blur={overlayBlur}
        />
        <Modal
          ref={ref}
          isOpen={isOpen}
          onClose={onClose}
          closeOnOverlayClick={closeOnOverlayClick}
          {...modalProps}
        />
      </>
    )
  }
)

Dialog.displayName = 'Dialog'

export { Dialog }

