import type { ReactNode } from 'react'
import Sidebar from './Sidebar'
import type { QuickAction } from './Sidebar'

export default function AppShell({
  quickActions,
  children,
}: {
  quickActions?: QuickAction[]
  children: ReactNode
}) {
  return (
    <div className="flex h-full overflow-hidden [background-color:var(--color-surface)]">
      <Sidebar quickActions={quickActions} />
      {children}
    </div>
  )
}
