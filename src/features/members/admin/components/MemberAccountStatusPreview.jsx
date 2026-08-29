import { useState } from 'react'
import { Ban, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ACCOUNT_STATUSES } from '@/constants/registrationStatuses'
import RegistrationStatusLabel from '@/features/registration/admin/components/RegistrationStatusLabel.jsx'

function MemberAccountStatusPreview({ initialStatus, memberName, previewUpdateNotice }) {
  const [status, setStatus] = useState(initialStatus)
  const [notice, setNotice] = useState('')

  function updateStatus(nextStatus) {
    setStatus(nextStatus)
    setNotice(previewUpdateNotice ?? '')
  }

  return (
    <Card className="min-w-0">
      <CardHeader className="border-b"><h2 className="text-xl font-semibold text-slate-950">Account status preview</h2></CardHeader>
      <CardContent className="space-y-5">
        <RegistrationStatusLabel label="Account" status={status} />
        {status === ACCOUNT_STATUSES.ACTIVE ? (
          <Button aria-label={`Suspend account for ${memberName}`} onClick={() => updateStatus(ACCOUNT_STATUSES.SUSPENDED)} type="button" variant="destructive"><Ban aria-hidden="true" /> Suspend account</Button>
        ) : null}
        {status === ACCOUNT_STATUSES.SUSPENDED ? (
          <Button aria-label={`Reactivate account for ${memberName}`} onClick={() => updateStatus(ACCOUNT_STATUSES.ACTIVE)} type="button"><RotateCcw aria-hidden="true" /> Reactivate account</Button>
        ) : null}
        {status === ACCOUNT_STATUSES.INACTIVE ? (
          <p className="leading-7 text-slate-600">Activation and credential establishment are handled through a separate backend workflow that is not connected.</p>
        ) : null}
        {notice ? <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-950" role="status">{notice}</div> : null}
      </CardContent>
    </Card>
  )
}

export default MemberAccountStatusPreview
