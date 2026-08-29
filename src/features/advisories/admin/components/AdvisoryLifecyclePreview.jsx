import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ADVISORY_STATUSES } from '@/constants/advisoryStatuses'

function AdvisoryLifecyclePreview({ status }) {
  const [isConfirming, setIsConfirming] = useState(false)
  const [notice, setNotice] = useState('')
  const isDraft = status === ADVISORY_STATUSES.DRAFT
  const action = isDraft ? 'Publish advisory' : 'Archive advisory'

  function openConfirmation() {
    setNotice('')
    setIsConfirming(true)
  }

  function cancelConfirmation() {
    setNotice('')
    setIsConfirming(false)
  }

  function confirmAction() {
    setIsConfirming(false)
    setNotice(
      isDraft
        ? 'Preview only. The advisory was not published because the backend is not connected.'
        : 'Preview only. The advisory was not archived because the backend is not connected.',
    )
  }

  return (
    <Card className="mt-8 min-w-0 border border-blue-200">
      <CardHeader className="min-w-0 border-b">
        <h2 className="text-xl font-semibold text-slate-950">Lifecycle preview</h2>
      </CardHeader>
      <CardContent className="space-y-5">
        {!isConfirming ? (
          <Button onClick={openConfirmation} type="button">
            {action}
          </Button>
        ) : (
          <div className="rounded-lg border border-amber-300 bg-amber-50 p-4">
            <p className="leading-7 text-amber-950">
              {isDraft
                ? 'Publishing would make this advisory visible to its intended approved members.'
                : 'Archiving would remove this advisory from the active member advisory list.'}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button onClick={confirmAction} type="button">
                Confirm {action.toLowerCase()}
              </Button>
              <Button onClick={cancelConfirmation} type="button" variant="outline">
                Cancel
              </Button>
            </div>
          </div>
        )}
        {notice ? (
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-950" role="status">
            {notice}
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}

export default AdvisoryLifecyclePreview
