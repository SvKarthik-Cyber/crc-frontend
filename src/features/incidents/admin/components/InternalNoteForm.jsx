import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { internalNoteSchema } from '../schemas/internalNoteSchema.js'

function InternalNoteForm() {
  const [notice, setNotice] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(internalNoteSchema), defaultValues: { note: '' } })

  async function handleValidNote() {
    await Promise.resolve()
    setNotice('Internal note validated locally. Backend submission is not connected.')
  }

  function handleInvalidNote() {
    setNotice('')
  }

  return (
    <Card className="mt-8 min-w-0 border border-amber-300 bg-amber-50/40">
      <CardHeader className="min-w-0 border-b border-amber-200">
        <h2 className="text-xl font-semibold text-slate-950">
          Internal note — visible only to authorized CRC staff
        </h2>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" noValidate onSubmit={handleSubmit(handleValidNote, handleInvalidNote)}>
          <div className="space-y-2">
            <Label htmlFor="internal-staff-note">Internal note</Label>
            <Textarea
              {...register('note')}
              aria-describedby={
                errors.note
                  ? 'internal-staff-note-help internal-staff-note-error'
                  : 'internal-staff-note-help'
              }
              aria-invalid={Boolean(errors.note)}
              id="internal-staff-note"
              rows={6}
            />
            <p className="text-sm text-amber-900" id="internal-staff-note-help">
              This text is intended only for authorized staff and is not a response to the member.
            </p>
            {errors.note ? (
              <p className="text-sm text-red-700" id="internal-staff-note-error" role="alert">
                {errors.note.message}
              </p>
            ) : null}
          </div>
          {notice ? (
            <div className="rounded-lg border border-green-300 bg-green-50 p-4 text-sm text-green-950" role="status">
              {notice}
            </div>
          ) : null}
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Validating internal note…' : 'Validate internal note'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default InternalNoteForm
