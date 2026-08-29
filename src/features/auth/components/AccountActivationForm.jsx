import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { accountActivationSchema } from '../schemas/accountActivationSchema.js'

function FieldError({ id, message }) {
  if (!message) return null
  return <p className="text-sm text-red-700" id={id} role="alert">{message}</p>
}

function AccountActivationForm() {
  const [notice, setNotice] = useState('')
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(accountActivationSchema),
    defaultValues: { password: '', confirmPassword: '' },
  })

  async function handleValidSubmission() {
    await Promise.resolve()
    setNotice('Activation details validated locally. Account activation is not connected to the backend yet.')
  }

  function handleInvalidSubmission() {
    setNotice('')
  }

  return <form className="min-w-0 space-y-6" noValidate onSubmit={handleSubmit(handleValidSubmission, handleInvalidSubmission)}>
    <div className="min-w-0 space-y-2">
      <Label htmlFor="activation-password">New password</Label>
      <p className="text-sm text-slate-600" id="activation-password-help">Use at least 12 characters.</p>
      <Input {...register('password')} aria-describedby={errors.password ? 'activation-password-help activation-password-error' : 'activation-password-help'} aria-invalid={Boolean(errors.password)} autoComplete="new-password" id="activation-password" type="password" />
      <FieldError id="activation-password-error" message={errors.password?.message} />
    </div>
    <div className="min-w-0 space-y-2">
      <Label htmlFor="activation-confirm-password">Confirm password</Label>
      <Input {...register('confirmPassword')} aria-describedby={errors.confirmPassword ? 'activation-confirm-password-error' : undefined} aria-invalid={Boolean(errors.confirmPassword)} autoComplete="new-password" id="activation-confirm-password" type="password" />
      <FieldError id="activation-confirm-password-error" message={errors.confirmPassword?.message} />
    </div>
    {notice ? <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-950" role="status">{notice}</div> : null}
    <Button className="h-10 w-full px-5" disabled={isSubmitting} type="submit">{isSubmitting ? 'Validating activation details…' : 'Validate activation details'}</Button>
  </form>
}

export default AccountActivationForm
