'use client'
import { useId, useRef } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { t } from '../copy'
import type { Lang } from '../copy'
import { useFocusTrap, useScrollLock } from '../hooks'

/** Dialog: focus moves in and loops, Esc + backdrop close, focus returns to the opener, scroll locked, labelled.
 *  Footer buttons: outline "cancel" then the primary action. For a task that needs neither interruption nor protected focus, use a page, not a modal. */
export function Modal({ open, onClose, title, children, footer, lang, closeLabel }: {
  open: boolean; onClose: () => void; title: string; children: ReactNode; footer?: ReactNode; lang?: Lang; closeLabel?: string
}) {
  const titleId = useId()
  const ref = useRef<HTMLDivElement>(null)
  useFocusTrap(open, ref, onClose)
  useScrollLock(open)
  if (!open) return null
  return createPortal(
    <div className="ds-backdrop" onClick={onClose}>
      <div ref={ref} className="ds-modal" role="dialog" aria-modal="true" aria-labelledby={titleId} onClick={e => e.stopPropagation()}>
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 id={titleId} className="font-display text-xl text-ink">{title}</h2>
          <button type="button" className="ds-btn ds-btn-ghost ds-btn-icon" onClick={onClose} aria-label={closeLabel ?? t(lang, 'close')}>
            <X size={18} />
          </button>
        </div>
        <div className="text-sm text-ink-soft">{children}</div>
        {footer && <div className="mt-6 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>,
    document.body,
  )
}
