export default function Platzhalter({ titel }: { titel: string }) {
  return (
    <div className="flex h-full items-center justify-center [background-color:var(--color-surface-sunken)]">
      <div className="text-center">
        <div className="[font-family:var(--font-mono)] text-2xs tracking-caps [color:var(--color-fg-subtle)]">IN ARBEIT</div>
        <div className="mt-xs text-xl font-semibold tracking-tight">{titel}</div>
      </div>
    </div>
  )
}
