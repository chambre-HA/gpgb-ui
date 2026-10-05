'use client'
import { useEffect } from 'react'
import type { RefObject } from 'react'

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

/** While `open`: moves focus into `ref`, loops Tab inside it, calls onEscape on Esc, and restores focus on close. */
export function useFocusTrap(open: boolean, ref: RefObject<HTMLElement | null>, onEscape: () => void) {
  useEffect(() => {
    if (!open) return
    const prev = document.activeElement as HTMLElement | null
    const el = ref.current
    const items = () => (el ? Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE)) : [])
    ;(items()[0] ?? el)?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.stopPropagation(); onEscape(); return }
      if (e.key !== 'Tab') return
      const list = items()
      if (!list.length) { e.preventDefault(); return }
      const first = list[0], last = list[list.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('keydown', onKey); prev?.focus?.() }
  }, [open, ref, onEscape])
}

/** Closes on outside pointer-down or Esc while `open`. */
export function useDismiss(open: boolean, ref: RefObject<HTMLElement | null>, onDismiss: () => void) {
  useEffect(() => {
    if (!open) return
    const down = (e: MouseEvent | TouchEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onDismiss() }
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') onDismiss() }
    document.addEventListener('mousedown', down)
    document.addEventListener('touchstart', down)
    document.addEventListener('keydown', key)
    return () => { document.removeEventListener('mousedown', down); document.removeEventListener('touchstart', down); document.removeEventListener('keydown', key) }
  }, [open, ref, onDismiss])
}

/** Locks page scroll while `locked`. */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [locked])
}
