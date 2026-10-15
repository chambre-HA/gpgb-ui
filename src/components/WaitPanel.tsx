'use client'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Check } from 'lucide-react'
import { cn } from '../cn'
import { t, type Lang } from '../copy'

const BREATH = 8 // seconds per breath: 4 in, 4 out. Matches the ds-breathe keyframes.
const R = 40
const C = 2 * Math.PI * R

/** Time-based estimate that slows as it nears the end and never claims to be done (stops at 92%). */
export function estimateProgress(elapsed: number, expected: number) {
  return 0.92 * (1 - Math.exp((-1.8 * elapsed) / Math.max(1, expected)))
}

function formatClock(s: number) {
  const m = Math.floor(s / 60)
  return `${m}:${String(Math.floor(s % 60)).padStart(2, '0')}`
}

function formatAbout(s: number, lang: Lang) {
  if (s < 60) return lang === 'en' ? `about ${Math.round(s / 5) * 5 || 5} seconds` : `约 ${Math.round(s / 5) * 5 || 5} 秒`
  const m = Math.round(s / 30) / 2
  return lang === 'en' ? `about ${m} minute${m === 1 ? '' : 's'}` : `约 ${m} 分钟`
}

export type WaitPanelProps = {
  /** What is happening, as a short present-tense line: 正在撰写文稿. */
  title: string
  /** Optional named stages. Advanced by `progress` when given, otherwise by time against `expectedSeconds`. */
  stages?: string[]
  /** Current stage index, if the app knows it (overrides the estimate). */
  stage?: number
  /** Real progress 0–1 (e.g. 3 of 12 paragraphs). Without it the ring follows a time estimate. */
  progress?: number
  /** Typical duration. Drives the estimate and the "usually about 1 minute" note. */
  expectedSeconds?: number
  /** Replaces the "usually about…" note, e.g. 第 3 / 12 段. */
  detail?: ReactNode
  /** Gentle lines, one per breath (8s), in order. */
  notes?: string[]
  /** Shows 吸 / 呼 inside the circle so the wait can be a few breaths. Default true. */
  breathe?: boolean
  onCancel?: () => void
  lang?: Lang
  className?: string
}

/** A calm panel for waits longer than a few seconds (AI writing, recording, rendering). A slow ensō ring fills with
 *  progress while a circle breathes inside it; stages, elapsed time and a gentle line sit beside. For waits under
 *  3 seconds use a button's aria-busy spinner instead. Mount it when the work starts and unmount when it ends. */
export function WaitPanel({ title, stages, stage, progress, expectedSeconds = 60, detail, notes, breathe = true, onCancel, lang = 'zh', className }: WaitPanelProps) {
  const started = useRef(Date.now())
  const box = useRef<HTMLDivElement>(null)
  const [elapsed, setElapsed] = useState(0)
  // Bring it into view: it usually replaces a button near the bottom of a form.
  useEffect(() => {
    const still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    box.current?.scrollIntoView?.({ block: 'nearest', behavior: still ? 'auto' : 'smooth' })
  }, [])
  useEffect(() => {
    const id = setInterval(() => setElapsed((Date.now() - started.current) / 1000), 1000)
    return () => clearInterval(id)
  }, [])

  const known = typeof progress === 'number'
  const p = known ? Math.min(1, Math.max(0, progress)) : estimateProgress(elapsed, expectedSeconds)
  const n = stages?.length ?? 0
  const current = n === 0 ? -1 : Math.min(n - 1, Math.max(0, stage ?? Math.floor((known ? p : elapsed / expectedSeconds) * n)))
  const breath = Math.floor(elapsed / BREATH)
  const inhale = elapsed % BREATH < BREATH / 2
  const note = notes?.length ? notes[breath % notes.length] : null
  const late = !known && elapsed > expectedSeconds * 1.25

  return (
    <div ref={box} className={cn('ds-wait', className)}>
      <div className="ds-wait-enso" role="progressbar" aria-label={title}
        aria-valuemin={known ? 0 : undefined} aria-valuemax={known ? 100 : undefined} aria-valuenow={known ? Math.round(p * 100) : undefined}>
        <svg viewBox="0 0 96 96" aria-hidden>
          <circle className="ds-wait-track" cx="48" cy="48" r={R} />
          <circle className="ds-wait-arc" cx="48" cy="48" r={R} strokeDasharray={C} strokeDashoffset={C * (1 - Math.max(0.02, p))} />
        </svg>
        <span className="ds-wait-breath" aria-hidden />
        {breathe && <span className="ds-wait-cue" aria-hidden>{t(lang, inhale ? 'breatheIn' : 'breatheOut')}</span>}
      </div>

      <div className="ds-wait-body space-y-3">
        <div>
          <p className="font-display text-lg text-ink">{title}</p>
          <p className="ds-hint tabular-nums" aria-hidden>
            {formatClock(elapsed)} · {detail ?? (late ? t(lang, 'waitLonger') : `${t(lang, 'waitUsually')}${formatAbout(expectedSeconds, lang)}`)}
          </p>
        </div>
        {n > 0 && (
          <ol className="ds-wait-stages">
            {stages!.map((s, i) => (
              <li key={i} data-state={i < current ? 'done' : i === current ? 'current' : 'todo'} aria-current={i === current ? 'step' : undefined}>
                <span className="ds-wait-mark" aria-hidden>{i < current && <Check size={12} strokeWidth={2.5} />}</span>{s}
              </li>
            ))}
          </ol>
        )}
        {note && <p key={breath} className="ds-wait-note">{note}</p>}
        {breathe && <p className="ds-hint">{t(lang, 'breatheHint')}</p>}
        {onCancel && <button type="button" className="ds-btn ds-btn-ghost ds-btn-sm -ml-3" onClick={onCancel}>{t(lang, 'cancel')}</button>}
      </div>

      <p className="sr-only" role="status">{current >= 0 ? `${title}${lang === 'en' ? ': ' : '：'}${stages![current]}` : title}</p>
    </div>
  )
}
