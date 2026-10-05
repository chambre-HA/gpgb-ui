import { cn } from '../cn'

export function Tabs<T extends string>({ items, value, onChange, label, className }: {
  items: ReadonlyArray<{ value: T; label: string }>
  value: T
  onChange: (v: T) => void
  label: string
  className?: string
}) {
  return (
    <div className={cn('ds-tabs', className)} role="tablist" aria-label={label}>
      {items.map(it => (
        <button key={it.value} type="button" role="tab" className="ds-tab"
          aria-selected={it.value === value} onClick={() => onChange(it.value)}>
          {it.label}
        </button>
      ))}
    </div>
  )
}
