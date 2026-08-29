import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { KERALA_DISTRICTS } from '@/constants/districts'
import { useRegisterIndividualMutation } from '../../auth/api/authApi.js'
import { individualRegistrationSchema } from '../schemas/individualRegistrationSchema.js'

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

function IndividualRegistrationForm() {
  const [notice, setNotice] = useState('')
  const [registerIndividual] = useRegisterIndividualMutation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(individualRegistrationSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      mobile: '',
      district: '',
      occupation: '',
    },
  })

  async function handleValidSubmission(values) {
    setNotice('')
    try {
      const response = await registerIndividual({
        name: values.fullName,
        email: values.email,
        password: values.password,
        mobile: values.mobile,
        district: values.district,
        individualProfile: {
          occupation: values.occupation,
        },
      }).unwrap()

      // Unlike organization/volunteer registrations, individual accounts do
      // NOT get instant login - they sit in PENDING_ADVISORY until a staff
      // member forwards them through the advisory + police verification
      // pipeline, so there's no session to log them into here.
      setNotice(response.message || 'Registration submitted. Your account is pending advisory review.')
      reset()
    } catch (err) {
      setNotice(err?.data?.message || 'Registration failed. Please check your details and try again.')
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
        <Label htmlFor="full-name">Full name</Label>
        <Input
          {...register('fullName')}
          aria-describedby={errors.fullName ? 'full-name-error' : undefined}
          aria-invalid={Boolean(errors.fullName)}
          autoComplete="name"
          id="full-name"
          type="text"
        />
        <FieldError id="full-name-error" message={errors.fullName?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input
          {...register('email')}
          aria-describedby={errors.email ? 'email-error' : undefined}
          aria-invalid={Boolean(errors.email)}
          autoComplete="email"
          id="email"
          inputMode="email"
          type="email"
        />
        <FieldError id="email-error" message={errors.email?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          {...register('password')}
          aria-describedby={errors.password ? 'password-error' : undefined}
          aria-invalid={Boolean(errors.password)}
          autoComplete="new-password"
          id="password"
          type="password"
        />
        <FieldError id="password-error" message={errors.password?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="mobile">Mobile number</Label>
        <Input
          {...register('mobile')}
          aria-describedby={errors.mobile ? 'mobile-error' : undefined}
          aria-invalid={Boolean(errors.mobile)}
          autoComplete="tel-national"
          id="mobile"
          inputMode="numeric"
          maxLength={10}
          type="tel"
        />
        <FieldError id="mobile-error" message={errors.mobile?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="district">District</Label>
        <NativeSelect
          {...register('district')}
          aria-describedby={errors.district ? 'district-error' : undefined}
          aria-invalid={Boolean(errors.district)}
          className="w-full"
          id="district"
        >
          <NativeSelectOption value="">Select district</NativeSelectOption>
          {KERALA_DISTRICTS.map((district) => (
            <NativeSelectOption key={district} value={district}>
              {district}
            </NativeSelectOption>
          ))}
        </NativeSelect>
        <FieldError id="district-error" message={errors.district?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="occupation">Occupation</Label>
        <Input
          {...register('occupation')}
          aria-describedby={errors.occupation ? 'occupation-error' : undefined}
          aria-invalid={Boolean(errors.occupation)}
          autoComplete="organization-title"
          id="occupation"
          type="text"
        />
        <FieldError id="occupation-error" message={errors.occupation?.message} />
      </div>

      {notice ? (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-950" role="status">
          {notice}
        </div>
      ) : null}

      <Button className="h-10 w-full px-5 sm:w-auto" disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Validating details…' : 'Submit Registration Request'}
      </Button>
    </form>
  )
}

export default IndividualRegistrationForm