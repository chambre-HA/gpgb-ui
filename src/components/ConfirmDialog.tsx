'use client'
import type { ReactNode } from 'react'
import { Modal } from './Modal'
import { Button } from './Button'
import { t } from '../copy'
import type { Lang } from '../copy'

/** Confirm before a destructive or irreversible action. Name the action in `confirmLabel` ("删除海报", not "确定"). */
export function ConfirmDialog({ open, onCancel, onConfirm, title, children, confirmLabel, cancelLabel, danger, busy, lang }: {
  open: boolean; onCancel: () => void; onConfirm: () => void; title: string; children?: ReactNode
  confirmLabel?: string; cancelLabel?: string; danger?: boolean; busy?: boolean; lang?: Lang
}) {
  return (
    <Modal open={open} onClose={onCancel} title={title} lang={lang}
      footer={<>
        <Button variant="outline" onClick={onCancel} disabled={busy}>{cancelLabel ?? t(lang, 'cancel')}</Button>
        <Button variant={danger ? 'danger' : 'primary'} onClick={onConfirm} aria-busy={busy || undefined}>{confirmLabel ?? t(lang, 'confirm')}</Button>
      </>}>
      {children}
    </Modal>
  )
}
