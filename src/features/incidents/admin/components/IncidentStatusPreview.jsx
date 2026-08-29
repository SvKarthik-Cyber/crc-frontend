import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { INCIDENT_STATUSES } from '@/constants/incidentStatuses'
import { formatIncidentStatus } from '../incidentStatusUtils.js'

const statusOptions = Object.values(INCIDENT_STATUSES)
const previewNotice =
  'Preview only. No incident status was changed because the backend is not connected.'

function IncidentStatusPreview({ currentStatus }) {
  const [proposedStatus, setProposedStatus] = useState(currentStatus)
  const [isConfirming, setIsConfirming] = useState(false)
  const [notice, setNotice] = useState('')

  function proposeChange() {
    setNotice('')
    setIsConfirming(true)
  }

  function cancelChange() {
    setNotice('')
    setIsConfirming(false)
  }

  function confirmChange() {
    setNotice(previewNotice)
    setIsConfirming(false)
  }

  return (
    <Card className="mt-8 min-w-0 border border-blue-200">
      <CardHeader className="min-w-0 border-b">
        <h2 className="text-xl font-semibold text-slate-950">Status management preview</h2>
      </CardHeader>
      <CardContent className="space-y-5">
        <p className="leading-7 text-slate-600">
          Current status: <strong className="text-slate-900">{formatIncidentStatus(currentStatus)}</strong>
        </p>
        <div className="max-w-sm space-y-2">
          <Label htmlFor="proposed-incident-status">Proposed status</Label>
          <NativeSelect
            className="w-full min-w-0"
            id="proposed-incident-status"
            onChange={(event) => {
              setProposedStatus(event.target.value)
              setIsConfirming(false)
              setNotice('')
            }}
            value={proposedStatus}
          >
            {statusOptions.map((status) => (
              <NativeSelectOption key={status} value={status}>
                {formatIncidentStatus(status)}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>
        {!isConfirming ? (
          <Button onClick={proposeChange} type="button">
            Review proposed change
          </Button>
        ) : (
          <div className="rounded-lg border border-amber-300 bg-amber-50 p-4">
            <p className="leading-7 text-amber-950">
              Confirm the preview proposal to change the status to{' '}
              <strong>{formatIncidentStatus(proposedStatus)}</strong>. The displayed incident status
              will not change.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button onClick={confirmChange} type="button">
                Confirm preview
              </Button>
              <Button onClick={cancelChange} type="button" variant="outline">
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

export default IncidentStatusPreview
