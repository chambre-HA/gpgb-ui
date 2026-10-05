'use client'
import { useRef } from 'react'
import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { t } from '../copy'
import type { Lang } from '../copy'
import { useFocusTrap, useScrollLock } from '../hooks'

/** Bottom sheet (phone: pickers, secondary panels) or left drawer (mobile nav). Stays mounted so it can slide; closed = inert.
 *  Children render only after the first open, so heavy content doesn't load until needed. */
export function Sheet({ open, onClose, title, side = 'bottom', children, lang }: {
  open: boolean; onClose: () => void; title: string; side?: 'bottom' | 'left'; children: ReactNode; lang?: Lang
}) {
  const ref = useRef<HTMLDivElement>(null)
  const opened = useRef(open)
  if (open) opened.current = true
  useFocusTrap(open, ref, onClose)
  useScrollLock(open)
  return (
    <div className="ds-sheet-root" data-open={open} inert={!open} aria-hidden={!open}>
      <div className="ds-sheet-scrim" onClick={onClose} />
      <div ref={ref} className={`ds-sheet ds-sheet-${side}`} role="dialog" aria-modal="true" aria-label={title}>
        {side === 'bottom' && <div className="ds-sheet-grab" aria-hidden />}
        <div className="ds-sheet-head">
          <h2 className="font-display text-base text-ink">{title}</h2>
          <button type="button" className="ds-btn ds-btn-ghost ds-btn-icon" onClick={onClose} aria-label={t(lang, 'close')}><X size={18} /></button>
        </div>
        <div className="ds-sheet-body">{opened.current ? children : null}</div>
      </div>
    </div>
  )
}
