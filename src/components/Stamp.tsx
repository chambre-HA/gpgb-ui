import { Check } from 'lucide-react'
import { cn } from '../cn'

/** The brand's seal: an orange stamp that lands once on a meaningful success (published, saved, signed up).
 *  Mount it when the success happens; remount (change `key`) to replay. Use at most one per view. */
export function Stamp({ large, label = '完成', className }: { large?: boolean; label?: string; className?: string }) {
  return (
    <span className={cn('ds-stamp', large && 'ds-stamp-lg', className)} role="img" aria-label={label}>
      <Check size={large ? 40 : 28} strokeWidth={2.5} aria-hidden />
    </span>
  )
}
