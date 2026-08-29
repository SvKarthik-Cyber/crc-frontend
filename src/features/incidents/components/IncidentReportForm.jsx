import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Textarea } from '@/components/ui/textarea'
import {
  CONTACT_METHOD_OPTIONS,
  INCIDENT_CATEGORIES,
  INCIDENT_STATUS_OPTIONS,
  incidentReportSchema,
} from '../schemas/incidentReportSchema.js'

const validationNotice =
  'Incident details validated successfully. Backend submission is not connected yet.'

function FieldError({ id, message }) {
  if (!message) return null

  return (
    <p className="text-sm text-red-700" id={id} role="alert">
      {message}
    </p>
  )
}

function describedBy(helpId, errorId, hasError) {
  return [helpId, hasError ? errorId : null].filter(Boolean).join(' ') || undefined
}

function IncidentReportForm() {
  const [notice, setNotice] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(incidentReportSchema),
    defaultValues: {
      title: '',
      category: '',
      dateDetected: '',
      timeDetected: '',
      description: '',
      affectedSystem: '',
      isOngoing: '',
      operationalImpact: '',
      financialLoss: '',
      actionsTaken: '',
      technicalIndicators: '',
      preferredContactMethod: '',
    },
  })

  async function handleValidSubmission() {
    await Promise.resolve()
    setNotice(validationNotice)
  }

  function handleInvalidSubmission() {
    setNotice('')
  }

  return (
    <form
      className="min-w-0 space-y-6"
      noValidate
      onSubmit={handleSubmit(handleValidSubmission, handleInvalidSubmission)}
    >
      <Card className="min-w-0">
        <CardHeader className="min-w-0 border-b">
          <h2 className="text-xl font-semibold text-slate-950">Incident overview</h2>
        </CardHeader>
        <CardContent className="grid min-w-0 gap-6 sm:grid-cols-2">
          <div className="min-w-0 space-y-2 sm:col-span-2">
            <Label htmlFor="incident-title">Incident title</Label>
            <Input
              {...register('title')}
              aria-describedby={errors.title ? 'incident-title-error' : undefined}
              aria-invalid={Boolean(errors.title)}
              autoComplete="off"
              id="incident-title"
              type="text"
            />
            <FieldError id="incident-title-error" message={errors.title?.message} />
          </div>

          <div className="min-w-0 space-y-2">
            <Label htmlFor="incident-category">Incident category</Label>
            <NativeSelect
              {...register('category')}
              aria-describedby={errors.category ? 'incident-category-error' : undefined}
              aria-invalid={Boolean(errors.category)}
              className="w-full min-w-0"
              id="incident-category"
            >
              <NativeSelectOption value="">Select a category</NativeSelectOption>
              {INCIDENT_CATEGORIES.map((category) => (
                <NativeSelectOption key={category} value={category}>
                  {category}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            <FieldError id="incident-category-error" message={errors.category?.message} />
          </div>

          <div className="min-w-0 space-y-2">
            <Label htmlFor="date-detected">Date detected</Label>
            <Input
              {...register('dateDetected')}
              aria-describedby={errors.dateDetected ? 'date-detected-error' : undefined}
              aria-invalid={Boolean(errors.dateDetected)}
              id="date-detected"
              type="date"
            />
            <FieldError id="date-detected-error" message={errors.dateDetected?.message} />
          </div>

          <div className="min-w-0 space-y-2">
            <Label htmlFor="time-detected">Approximate time detected</Label>
            <Input
              {...register('timeDetected')}
              aria-describedby={errors.timeDetected ? 'time-detected-error' : undefined}
              aria-invalid={Boolean(errors.timeDetected)}
              id="time-detected"
              type="time"
            />
            <FieldError id="time-detected-error" message={errors.timeDetected?.message} />
          </div>

          <div className="min-w-0 space-y-2 sm:col-span-2">
            <Label htmlFor="incident-description">Detailed description</Label>
            <Textarea
              {...register('description')}
              aria-describedby={errors.description ? 'incident-description-error' : undefined}
              aria-invalid={Boolean(errors.description)}
              id="incident-description"
              rows={7}
            />
            <FieldError id="incident-description-error" message={errors.description?.message} />
          </div>
        </CardContent>
      </Card>

      <Card className="min-w-0">
        <CardHeader className="min-w-0 border-b">
          <h2 className="text-xl font-semibold text-slate-950">Impact and current status</h2>
        </CardHeader>
        <CardContent className="grid min-w-0 gap-6 sm:grid-cols-2">
          <div className="min-w-0 space-y-2">
            <Label htmlFor="affected-system">Affected system or service</Label>
            <Input
              {...register('affectedSystem')}
              aria-describedby={errors.affectedSystem ? 'affected-system-error' : undefined}
              aria-invalid={Boolean(errors.affectedSystem)}
              autoComplete="off"
              id="affected-system"
              type="text"
            />
            <FieldError id="affected-system-error" message={errors.affectedSystem?.message} />
          </div>

          <fieldset className="min-w-0 space-y-3">
            <legend className="text-sm font-medium text-slate-900">Is the incident ongoing?</legend>
            <div className="flex flex-wrap gap-x-5 gap-y-3">
              {INCIDENT_STATUS_OPTIONS.map((option) => {
                const optionId = `incident-ongoing-${option.toLowerCase()}`

                return (
                <label
                  className="flex items-center gap-2 text-sm text-slate-800"
                  htmlFor={optionId}
                  key={option}
                >
                  <input
                    {...register('isOngoing')}
                    aria-describedby={errors.isOngoing ? 'incident-ongoing-error' : undefined}
                    aria-invalid={Boolean(errors.isOngoing)}
                    className="size-4 accent-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    id={optionId}
                    type="radio"
                    value={option}
                  />
                  {option}
                </label>
                )
              })}
            </div>
            <FieldError id="incident-ongoing-error" message={errors.isOngoing?.message} />
          </fieldset>

          <div className="min-w-0 space-y-2 sm:col-span-2">
            <Label htmlFor="operational-impact">Operational impact</Label>
            <Textarea
              {...register('operationalImpact')}
              aria-describedby={errors.operationalImpact ? 'operational-impact-error' : undefined}
              aria-invalid={Boolean(errors.operationalImpact)}
              id="operational-impact"
              rows={5}
            />
            <FieldError id="operational-impact-error" message={errors.operationalImpact?.message} />
          </div>

          <div className="min-w-0 space-y-2">
            <Label htmlFor="financial-loss">Estimated financial loss in INR</Label>
            <p className="text-sm text-slate-600" id="financial-loss-help">
              Optional. Enter numbers only, with up to 2 decimal places.
            </p>
            <Input
              {...register('financialLoss')}
              aria-describedby={describedBy(
                'financial-loss-help',
                'financial-loss-error',
                Boolean(errors.financialLoss),
              )}
              aria-invalid={Boolean(errors.financialLoss)}
              id="financial-loss"
              inputMode="decimal"
              min="0"
              step="0.01"
              type="number"
            />
            <FieldError id="financial-loss-error" message={errors.financialLoss?.message} />
          </div>
        </CardContent>
      </Card>

      <Card className="min-w-0">
        <CardHeader className="min-w-0 border-b">
          <h2 className="text-xl font-semibold text-slate-950">Additional information</h2>
        </CardHeader>
        <CardContent className="grid min-w-0 gap-6">
          <div className="min-w-0 space-y-2">
            <Label htmlFor="actions-taken">Actions already taken</Label>
            <Textarea
              {...register('actionsTaken')}
              aria-describedby={errors.actionsTaken ? 'actions-taken-error' : undefined}
              aria-invalid={Boolean(errors.actionsTaken)}
              id="actions-taken"
              rows={5}
            />
            <FieldError id="actions-taken-error" message={errors.actionsTaken?.message} />
          </div>

          <div className="min-w-0 space-y-2">
            <Label htmlFor="technical-indicators">Technical indicators</Label>
            <p className="text-sm leading-6 text-slate-600" id="technical-indicators-help">
              Optional. Enter indicators as plain text, such as suspicious URLs, domains, IP
              addresses, email addresses, mobile numbers or file hashes.
            </p>
            <Textarea
              {...register('technicalIndicators')}
              aria-describedby={describedBy(
                'technical-indicators-help',
                'technical-indicators-error',
                Boolean(errors.technicalIndicators),
              )}
              aria-invalid={Boolean(errors.technicalIndicators)}
              className="break-words"
              id="technical-indicators"
              rows={6}
            />
            <FieldError
              id="technical-indicators-error"
              message={errors.technicalIndicators?.message}
            />
          </div>

          <fieldset className="min-w-0 space-y-3">
            <legend className="text-sm font-medium text-slate-900">Preferred contact method</legend>
            <p className="text-sm leading-6 text-slate-600" id="preferred-contact-help">
              CRC personnel will use contact details from your approved member profile.
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-3">
              {CONTACT_METHOD_OPTIONS.map((option) => {
                const optionId = `preferred-contact-${option.toLowerCase().replace(' ', '-')}`

                return (
                <label
                  className="flex items-center gap-2 text-sm text-slate-800"
                  htmlFor={optionId}
                  key={option}
                >
                  <input
                    {...register('preferredContactMethod')}
                    aria-describedby={describedBy(
                      'preferred-contact-help',
                      'preferred-contact-error',
                      Boolean(errors.preferredContactMethod),
                    )}
                    aria-invalid={Boolean(errors.preferredContactMethod)}
                    className="size-4 accent-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    id={optionId}
                    type="radio"
                    value={option}
                  />
                  {option}
                </label>
                )
              })}
            </div>
            <FieldError id="preferred-contact-error" message={errors.preferredContactMethod?.message} />
          </fieldset>
        </CardContent>
      </Card>

      {notice ? (
        <div
          className="rounded-lg border border-green-300 bg-green-50 p-4 text-sm text-green-900"
          role="status"
        >
          {notice}
        </div>
      ) : null}

      <Button className="h-10 w-full px-5 sm:w-auto" disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Validating incident details…' : 'Validate Incident Details'}
      </Button>
    </form>
  )
}

export default IncidentReportForm
