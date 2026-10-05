import type { HTMLAttributes } from 'react'
import { cn } from '../cn'

export function Card({ interactive, className, ...rest }: HTMLAttributes<HTMLDivElement> & { interactive?: boolean }) {
  return <div className={cn('ds-card', interactive && 'ds-card-interactive', className)} {...rest} />
}

export type BadgeTone = 'accent' | 'ink' | 'tint' | 'outline' | 'danger'
export function Badge({ tone = 'tint', small, className, ...rest }:
  HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone; small?: boolean }) {
  return <span className={cn('ds-badge', `ds-badge-${tone}`, small && 'ds-badge-sm', className)} {...rest} />
}

export function EmptyState({ title, hint, action }: { title: string; hint?: string; action?: React.ReactNode }) {
  return (
    <div className="ds-empty">
      <p className="font-display text-lg text-ink">{title}</p>
      {hint && <p className="ds-hint mt-2">{hint}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('ds-skeleton', className)} aria-hidden />
}

export function Spinner({ label = '加载中' }: { label?: string }) {
  return <div className="ds-spinner" role="status" aria-label={label} />
}

export function Alert({ tone, className, ...rest }: HTMLAttributes<HTMLDivElement> & { tone?: 'danger' | 'warn' }) {
  return <div role={tone === 'danger' ? 'alert' : 'status'}
    className={cn('ds-alert', tone && `ds-alert-${tone}`, className)} {...rest} />
}
