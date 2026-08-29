import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { rejectionReasonSchema } from '../schemas/rejectionReasonSchema.js'

const previewNotice =
  'Preview only. No registration status was changed because the backend is not connected.'

function RegistrationReviewActions() {
  const [mode, setMode] = useState(null)
  const [notice, setNotice] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(rejectionReasonSchema),
    defaultValues: { reason: '' },
  })

  function openMode(nextMode) {
    setNotice('')
    setMode(nextMode)
  }

  function cancelReview() {
    setMode(null)
    setNotice('')
  }

  function confirmApproval() {
    setNotice(previewNotice)
  }

  async function confirmRejection() {
    await Promise.resolve()
    setNotice(previewNotice)
  }

  return (
    <section className="mt-8 min-w-0" aria-labelledby="review-actions-title">
      <h2 className="text-2xl font-semibold text-slate-950" id="review-actions-title">
        Review registration
      </h2>
      <p className="mt-2 leading-7 text-slate-600">
        These controls demonstrate the intended review flow and do not update any record.
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        <Button onClick={() => openMode('approve')} type="button">
          Approve registration
        </Button>
        <Button onClick={() => openMode('reject')} type="button" variant="destructive">
          Reject registration
        </Button>
      </div>

      {mode === 'approve' ? (
        <Card className="mt-5 min-w-0 border border-amber-300">
          <CardHeader>
            <h3 className="text-lg font-semibold text-slate-950">Confirm approval</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="leading-7 text-slate-700">
              Approval accepts this registration but does not activate portal access.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={confirmApproval} type="button">
                Confirm approval
              </Button>
              <Button onClick={cancelReview} type="button" variant="outline">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {mode === 'reject' ? (
        <Card className="mt-5 min-w-0 border border-red-300">
          <CardHeader>
            <h3 className="text-lg font-semibold text-slate-950">Confirm rejection</h3>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" noValidate onSubmit={handleSubmit(confirmRejection)}>
              <div className="space-y-2">
                <Label htmlFor="rejection-reason">Rejection reason</Label>
                <Textarea
                  {...register('reason')}
                  aria-describedby={errors.reason ? 'rejection-reason-error' : undefined}
                  aria-invalid={Boolean(errors.reason)}
                  id="rejection-reason"
                  rows={5}
                />
                {errors.reason ? (
                  <p className="text-sm text-red-700" id="rejection-reason-error" role="alert">
                    {errors.reason.message}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-3">
                <Button disabled={isSubmitting} type="submit" variant="destructive">
                  {isSubmitting ? 'Validating reason…' : 'Confirm rejection'}
                </Button>
                <Button onClick={cancelReview} type="button" variant="outline">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : null}

      {notice ? (
        <div
          className="mt-5 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-950"
          role="status"
        >
          {notice}
        </div>
      ) : null}
    </section>
  )
}

export default RegistrationReviewActions
