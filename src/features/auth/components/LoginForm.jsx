import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { useAppDispatch } from '@/app/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLoginMutation } from '../api/authApi.js'
import { setAuthenticatedUser } from '../state/authSlice.js'
import { loginSchema } from '../schemas/loginSchema.js'

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

function LoginForm() {
  const [notice, setNotice] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [login] = useLoginMutation()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function handleValidSubmission(values) {
    setNotice('')
    try {
      const response = await login(values).unwrap()

      dispatch(setAuthenticatedUser(response))

      if (response.mustChangePassword) {
        // Backend blocks every other route until this happens (see
        // isChangePasswordRoute in src/middleware/auth.js).
        navigate('/change-password')
        return
      }

      navigate('/portal')
    } catch (err) {
      setNotice(err?.data?.message || 'Login failed. Check your credentials and try again.')
    }
  }

  function handleInvalidSubmission() {
    setNotice('')
  }

  return (
    <form
      className="space-y-6"
      noValidate
      onSubmit={handleSubmit(handleValidSubmission, handleInvalidSubmission)}
    >
      <div className="space-y-2">
        <Label htmlFor="login-email">Email address</Label>
        <Input
          {...register('email')}
          aria-describedby={errors.email ? 'login-email-error' : undefined}
          aria-invalid={Boolean(errors.email)}
          autoComplete="email"
          id="login-email"
          inputMode="email"
          type="email"
        />
        <FieldError id="login-email-error" message={errors.email?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="login-password">Password</Label>
        <Input
          {...register('password')}
          aria-describedby={errors.password ? 'login-password-error' : undefined}
          aria-invalid={Boolean(errors.password)}
          autoComplete="current-password"
          id="login-password"
          type="password"
        />
        <FieldError id="login-password-error" message={errors.password?.message} />
      </div>

      {notice ? (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-950" role="status">
          {notice}
        </div>
      ) : null}

      <Button className="h-10 w-full px-5" disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Validating credentials…' : 'Sign in'}
      </Button>
    </form>
  )
}

export default LoginForm