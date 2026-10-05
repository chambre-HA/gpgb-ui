import { Search } from 'lucide-react'
import type { InputHTMLAttributes } from 'react'
import { cn } from '../cn'

/** Search field: the standard 40px `ds-input` with a leading icon. Pass `label` (the accessible name) and a placeholder. */
export function SearchInput({ label, className, wrapperClassName, ...rest }: InputHTMLAttributes<HTMLInputElement> & { label: string; wrapperClassName?: string }) {
  return (
    <div className={cn('ds-search', wrapperClassName)}>
      <Search aria-hidden />
      <input type="search" aria-label={label} className={cn('ds-input', className)} {...rest} />
    </div>
  )
}
