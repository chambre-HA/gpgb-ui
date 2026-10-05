import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../cn'

export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

export function buttonClass(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', extra?: string) {
  return cn(
    'ds-btn',
    `ds-btn-${variant}`,
    size === 'sm' && 'ds-btn-sm',
    size === 'lg' && 'ds-btn-lg',
    size === 'icon' && 'ds-btn-icon',
    extra,
  )
}

/** Pill button. Use one `primary` per view; `outline` for secondary, `ghost` for toolbars. Icon-only needs aria-label. */
export function Button({ variant, size, className, type = 'button', ...rest }: ButtonProps) {
  return <button type={type} className={buttonClass(variant, size, className)} {...rest} />
}
