import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Textarea } from '@/components/ui/textarea'
import { ACCOUNT_TYPES } from '@/constants/roles'
import { ADVISORY_AUDIENCES, ADVISORY_CATEGORIES } from '@/constants/advisoryAudiences'
import { advisorySchema } from '../schemas/advisorySchema.js'
import { formatAccountCategory } from '../advisoryFormatters.js'

const accountCategoryOptions = Object.values(ACCOUNT_TYPES)

function FieldError({ id, message }) {
  if (!message) return null

  return (
    <p className="text-sm text-red-700" id={id} role="alert">
      {message}
    </p>
  )
}

function AdvisoryForm({ initialValues, successNotice, submitLabel }) {
  const [notice, setNotice] = useState('')
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(advisorySchema),
    defaultValues: initialValues ?? {
      title: '',
      category: '',
      summary: '',
      content: '',
      audience: '',
      accountCategories: [],
    },
  })
  const audience = useWatch({ control, name: 'audience' })

  async function handleValidSubmission() {
    await Promise.resolve()
    setNotice(successNotice)
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
          <h2 className="text-xl font-semibold text-slate-950">Advisory content</h2>
        </CardHeader>
        <CardContent className="grid min-w-0 gap-6 sm:grid-cols-2">
          <div className="min-w-0 space-y-2 sm:col-span-2">
            <Label htmlFor="advisory-title">Title</Label>
            <Input
              {...register('title')}
              aria-describedby={errors.title ? 'advisory-title-error' : undefined}
              aria-invalid={Boolean(errors.title)}
              id="advisory-title"
              type="text"
            />
            <FieldError id="advisory-title-error" message={errors.title?.message} />
          </div>
          <div className="min-w-0 space-y-2">
            <Label htmlFor="advisory-category">Category</Label>
            <NativeSelect
              {...register('category')}
              aria-describedby={errors.category ? 'advisory-category-error' : undefined}
              aria-invalid={Boolean(errors.category)}
              className="w-full min-w-0"
              id="advisory-category"
            >
              <NativeSelectOption value="">Select a category</NativeSelectOption>
              {ADVISORY_CATEGORIES.map((category) => (
                <NativeSelectOption key={category} value={category}>
                  {category}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            <FieldError id="advisory-category-error" message={errors.category?.message} />
          </div>
          <div className="min-w-0 space-y-2 sm:col-span-2">
            <Label htmlFor="advisory-summary">Summary</Label>
            <Textarea
              {...register('summary')}
              aria-describedby={errors.summary ? 'advisory-summary-error' : undefined}
              aria-invalid={Boolean(errors.summary)}
              id="advisory-summary"
              rows={4}
            />
            <FieldError id="advisory-summary-error" message={errors.summary?.message} />
          </div>
          <div className="min-w-0 space-y-2 sm:col-span-2">
            <Label htmlFor="advisory-content">Advisory content</Label>
            <p className="text-sm text-slate-600" id="advisory-content-help">
              Enter plain text only.
            </p>
            <Textarea
              {...register('content')}
              aria-describedby={
                errors.content
                  ? 'advisory-content-help advisory-content-error'
                  : 'advisory-content-help'
              }
              aria-invalid={Boolean(errors.content)}
              id="advisory-content"
              rows={10}
            />
            <FieldError id="advisory-content-error" message={errors.content?.message} />
          </div>
        </CardContent>
      </Card>

      <Card className="min-w-0">
        <CardHeader className="min-w-0 border-b">
          <h2 className="text-xl font-semibold text-slate-950">Intended audience</h2>
        </CardHeader>
        <CardContent className="space-y-6">
          <fieldset className="min-w-0 space-y-3">
            <legend className="text-sm font-medium text-slate-900">Audience mode</legend>
            <div className="grid min-w-0 gap-3 sm:grid-cols-2">
              {Object.values(ADVISORY_AUDIENCES).map((option) => {
                const id = `advisory-audience-${option.toLowerCase().replaceAll('_', '-')}`
                const label =
                  option === ADVISORY_AUDIENCES.ALL_APPROVED_MEMBERS
                    ? 'All approved members'
                    : 'Account categories'

                return (
                  <label
                    className="flex min-w-0 items-start gap-3 rounded-lg border border-slate-200 p-4 text-sm text-slate-800"
                    htmlFor={id}
                    key={option}
                  >
                    <input
                      {...register('audience')}
                      aria-describedby={errors.audience ? 'advisory-audience-error' : undefined}
                      aria-invalid={Boolean(errors.audience)}
                      className="mt-0.5 size-4 shrink-0 accent-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                      id={id}
                      type="radio"
                      value={option}
                    />
                    {label}
                  </label>
                )
              })}
            </div>
            <FieldError id="advisory-audience-error" message={errors.audience?.message} />
          </fieldset>

          {audience === ADVISORY_AUDIENCES.ACCOUNT_CATEGORIES ? (
            <fieldset className="min-w-0 space-y-3">
              <legend className="text-sm font-medium text-slate-900">Account categories</legend>
              <p className="text-sm text-slate-600" id="advisory-account-categories-help">
                Select at least one approved account category.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {accountCategoryOptions.map((category) => {
                  const id = `advisory-account-${category.toLowerCase()}`

                  return (
                    <label className="flex items-center gap-2 text-sm text-slate-800" htmlFor={id} key={category}>
                      <input
                        {...register('accountCategories')}
                        aria-describedby={
                          errors.accountCategories
                            ? 'advisory-account-categories-help advisory-account-categories-error'
                            : 'advisory-account-categories-help'
                        }
                        aria-invalid={Boolean(errors.accountCategories)}
                        className="size-4 accent-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        id={id}
                        type="checkbox"
                        value={category}
                      />
                      {formatAccountCategory(category)}
                    </label>
                  )
                })}
              </div>
              <FieldError
                id="advisory-account-categories-error"
                message={errors.accountCategories?.message}
              />
            </fieldset>
          ) : null}
        </CardContent>
      </Card>

      {notice ? (
        <div className="rounded-lg border border-green-300 bg-green-50 p-4 text-sm text-green-950" role="status">
          {notice}
        </div>
      ) : null}

      <Button className="w-full sm:w-auto" disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Validating advisory…' : submitLabel}
      </Button>
    </form>
  )
}

export default AdvisoryForm
