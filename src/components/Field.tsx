import { useId } from 'react'
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { cn } from '../cn'

interface FieldProps {
  label: string
  hint?: string
  error?: string
  children: (props: { id: string; 'aria-invalid'?: true; 'aria-describedby'?: string }) => ReactNode
}

/** Label + control + hint/error, wired for a11y. */
export function Field({ label, hint, error, children }: FieldProps) {
  const id = useId()
  const descId = hint || error ? `${id}-desc` : undefined
  return (
    <div>
      <label className="ds-label" htmlFor={id}>{label}</label>
      {children({ id, 'aria-invalid': error ? true : undefined, 'aria-describedby': descId })}
      {error ? <p id={descId} className="ds-error" role="alert">{error}</p>
        : hint ? <p id={descId} className="ds-hint mt-1.5">{hint}</p> : null}
    </div>
  )
}

export function Input({ className, small, ...rest }: InputHTMLAttributes<HTMLInputElement> & { small?: boolean }) {
  return <input className={cn('ds-input', small && 'ds-input-sm', className)} {...rest} />
}

export function Textarea({ className, ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn('ds-input', className)} {...rest} />
}

export function Select({ className, ...rest }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn('ds-input', className)} {...rest} />
}

export function Switch({ checked, onChange, label, disabled }: {
  checked: boolean; onChange: (v: boolean) => void; label: string; disabled?: boolean
}) {
  return (
    <button type="button" role="switch" aria-checked={checked} aria-label={label} disabled={disabled}
      className="ds-switch" onClick={() => onChange(!checked)} />
  )
}
