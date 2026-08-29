import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { useAppDispatch } from '@/app/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useChangePasswordMutation } from '../api/authApi.js'
import { setAuthenticatedUser } from '../state/authSlice.js'
import { changePasswordSchema } from '../schemas/changePasswordSchema.js'

function FieldError({ id, message }) {
  if (!message) {
    return null
  }

  return (
    <p className="text-sm text-red-700" id={id} role="alert">
      {message}
    </p>
  )
}

function ChangePasswordForm() {
  const [notice, setNotice] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [changePassword] = useChangePasswordMutation()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  })

  async function handleValidSubmission(values) {
    setNotice('')
    try {
      const response = await changePassword({ newPassword: values.newPassword }).unwrap()

      dispatch(setAuthenticatedUser(response))
      navigate('/portal')
    } catch (err) {
      setNotice(err?.data?.message || 'Could not update your password. Please try again.')
    }
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
      <div className="min-w-0 space-y-2">
        <Label htmlFor="change-password-new">New password</Label>
        <p className="text-sm text-slate-600" id="change-password-new-help">
          Use at least 8 characters.
        </p>
        <Input
          {...register('newPassword')}
          aria-describedby={
            errors.newPassword
              ? 'change-password-new-help change-password-new-error'
              : 'change-password-new-help'
          }
          aria-invalid={Boolean(errors.newPassword)}
          autoComplete="new-password"
          id="change-password-new"
          type="password"
        />
        <FieldError id="change-password-new-error" message={errors.newPassword?.message} />
      </div>

      <div className="min-w-0 space-y-2">
        <Label htmlFor="change-password-confirm">Confirm new password</Label>
        <Input
          {...register('confirmPassword')}
          aria-describedby={errors.confirmPassword ? 'change-password-confirm-error' : undefined}
          aria-invalid={Boolean(errors.confirmPassword)}
          autoComplete="new-password"
          id="change-password-confirm"
          type="password"
        />
        <FieldError id="change-password-confirm-error" message={errors.confirmPassword?.message} />
      </div>

      {notice ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-950" role="alert">
          {notice}
        </div>
      ) : null}

      <Button className="h-10 w-full px-5" disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Updating password…' : 'Set new password'}
      </Button>
    </form>
  )
}

export default ChangePasswordForm
