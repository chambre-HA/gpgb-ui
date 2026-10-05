'use client'
import { useEffect } from 'react'
import { cn } from '../cn'

/** Controlled toast: render when `message` is set; it calls onDone after `ms`. */
export function Toast({ message, tone, onDone, ms = 3000 }: {
  message: string | null; tone?: 'error'; onDone: () => void; ms?: number
}) {
  useEffect(() => {
    if (!message) return
    const t = setTimeout(onDone, ms)
    return () => clearTimeout(t)
  }, [message, ms, onDone])
  if (!message) return null
  return <div role={tone === 'error' ? 'alert' : 'status'} className={cn('ds-toast', tone === 'error' && 'ds-toast-error')}>{message}</div>
}
