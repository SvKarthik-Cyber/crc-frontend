import { TriangleAlert } from 'lucide-react'

function DevelopmentPreviewBanner() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 pt-6">
      <aside
        className="flex gap-3 rounded-lg border border-amber-400 bg-amber-50 p-4 text-amber-950"
        aria-label="Development preview warning"
        role="note"
      >
        <TriangleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
        <p className="font-medium leading-6">
          Development preview only. This page does not represent an authenticated session.
        </p>
      </aside>
    </div>
  )
}

export default DevelopmentPreviewBanner
