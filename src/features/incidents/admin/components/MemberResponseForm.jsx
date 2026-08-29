import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { memberResponseSchema } from '../schemas/memberResponseSchema.js'

function MemberResponseForm() {
  const [notice, setNotice] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(memberResponseSchema), defaultValues: { response: '' } })

  async function handleValidResponse() {
    await Promise.resolve()
    setNotice('Member response validated locally. Backend submission is not connected.')
  }

  function handleInvalidResponse() {
    setNotice('')
  }

  return (
    <Card className="mt-8 min-w-0 border border-blue-300 bg-blue-50/40">
      <CardHeader className="min-w-0 border-b border-blue-200">
        <h2 className="text-xl font-semibold text-slate-950">
          Response to member — visible to the reporting member
        </h2>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          noValidate
          onSubmit={handleSubmit(handleValidResponse, handleInvalidResponse)}
        >
          <div className="space-y-2">
            <Label htmlFor="member-visible-response">Response to member</Label>
            <Textarea
              {...register('response')}
              aria-describedby={
                errors.response
                  ? 'member-visible-response-help member-visible-response-error'
                  : 'member-visible-response-help'
              }
              aria-invalid={Boolean(errors.response)}
              id="member-visible-response"
              rows={6}
            />
            <p className="text-sm text-blue-900" id="member-visible-response-help">
              This text is intended for the reporting member and is separate from internal notes.
            </p>
            {errors.response ? (
              <p className="text-sm text-red-700" id="member-visible-response-error" role="alert">
                {errors.response.message}
              </p>
            ) : null}
          </div>
          {notice ? (
            <div className="rounded-lg border border-green-300 bg-green-50 p-4 text-sm text-green-950" role="status">
              {notice}
            </div>
          ) : null}
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Validating member response…' : 'Validate member response'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default MemberResponseForm
