import { cloneElement, useId } from 'react'
import type { ReactElement } from 'react'
import { cn } from '../cn'

/** Short, non-essential hint (a name for an icon button, a keyboard shortcut). Shows on hover and keyboard focus after 350ms; hidden on touch.
 *  Never put required information here. Child must be one focusable element. */
export function Tooltip({ label, children, placement = 'top' }: { label: string; children: ReactElement<Record<string, unknown>>; placement?: 'top' | 'bottom' }) {
  const id = useId()
  return (
    <span className={cn('ds-tip-wrap', placement === 'bottom' && 'ds-tip-bottom')}>
      {cloneElement(children, { 'aria-describedby': id })}
      <span id={id} role="tooltip" className="ds-tip">{label}</span>
    </span>
  )
}
