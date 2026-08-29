import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { useAppDispatch } from '@/app/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Textarea } from '@/components/ui/textarea'
import { KERALA_DISTRICTS } from '@/constants/districts'
import { useRegisterVolunteerMutation } from '../../auth/api/authApi.js'
import { setAuthenticatedUser } from '../../auth/state/authSlice.js'
import { volunteerRegistrationSchema } from '../schemas/volunteerRegistrationSchema.js'

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

// The backend expects skills/certifications as string arrays
// (volunteerProfile.skills / volunteerProfile.certifications - see backend
// src/middleware/validate.js), but this form collects them as free text.
// Splitting on commas/newlines is a reasonable bridge until the form itself
// becomes a tag input.
function toList(value) {
  return value
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function VolunteerRegistrationForm() {
  const [notice, setNotice] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [registerVolunteer] = useRegisterVolunteerMutation()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(volunteerRegistrationSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      mobile: '',
      occupation: '',
      cybersecuritySkills: '',
      certifications: '',
      district: '',
      availability: '',
    },
  })

  async function handleValidSubmission(values) {
    setNotice('')
    try {
      const response = await registerVolunteer({
        name: values.fullName,
        email: values.email,
        password: values.password,
        mobile: values.mobile,
        district: values.district,
        volunteerProfile: {
          occupation: values.occupation,
          skills: toList(values.cybersecuritySkills),
          certifications: values.certifications ? toList(values.certifications) : [],
          availability: values.availability,
        },
      }).unwrap()

      // Volunteer accounts get instant login access (unlike individual
      // registrations, which wait for advisory review) - log them straight in.
      dispatch(setAuthenticatedUser(response))
      navigate('/portal')
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
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="volunteer-full-name">Full name</Label>
          <Input
            {...register('fullName')}
            aria-describedby={errors.fullName ? 'volunteer-full-name-error' : undefined}
            aria-invalid={Boolean(errors.fullName)}
            autoComplete="name"
            id="volunteer-full-name"
            placeholder="Enter your full name"
            type="text"
          />
          <FieldError id="volunteer-full-name-error" message={errors.fullName?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="volunteer-email">Email address</Label>
          <Input
            {...register('email')}
            aria-describedby={errors.email ? 'volunteer-email-error' : undefined}
            aria-invalid={Boolean(errors.email)}
            autoComplete="email"
            id="volunteer-email"
            inputMode="email"
            placeholder="name@example.com"
            type="email"
          />
          <FieldError id="volunteer-email-error" message={errors.email?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="volunteer-password">Password</Label>
          <Input
            {...register('password')}
            aria-describedby={errors.password ? 'volunteer-password-error' : undefined}
            aria-invalid={Boolean(errors.password)}
            autoComplete="new-password"
            id="volunteer-password"
            type="password"
          />
          <FieldError id="volunteer-password-error" message={errors.password?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="volunteer-mobile">Mobile number</Label>
          <Input
            {...register('mobile')}
            aria-describedby={errors.mobile ? 'volunteer-mobile-error' : undefined}
            aria-invalid={Boolean(errors.mobile)}
            autoComplete="tel-national"
            id="volunteer-mobile"
            inputMode="numeric"
            maxLength={10}
            placeholder="10-digit mobile number"
            type="tel"
          />
          <FieldError id="volunteer-mobile-error" message={errors.mobile?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="volunteer-occupation">Occupation</Label>
          <Input
            {...register('occupation')}
            aria-describedby={errors.occupation ? 'volunteer-occupation-error' : undefined}
            aria-invalid={Boolean(errors.occupation)}
            autoComplete="organization-title"
            id="volunteer-occupation"
            placeholder="Your current occupation"
            type="text"
          />
          <FieldError id="volunteer-occupation-error" message={errors.occupation?.message} />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="cybersecurity-skills">Cybersecurity skills</Label>
          <Textarea
            {...register('cybersecuritySkills')}
            aria-describedby={errors.cybersecuritySkills ? 'cybersecurity-skills-error' : undefined}
            aria-invalid={Boolean(errors.cybersecuritySkills)}
            autoComplete="off"
            id="cybersecurity-skills"
            placeholder="Describe relevant technical, awareness, response or coordination skills"
            rows={5}
          />
          <FieldError id="cybersecurity-skills-error" message={errors.cybersecuritySkills?.message} />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="volunteer-certifications">Certifications (optional)</Label>
          <Textarea
            {...register('certifications')}
            aria-describedby={errors.certifications ? 'volunteer-certifications-error' : undefined}
            aria-invalid={Boolean(errors.certifications)}
            autoComplete="off"
            id="volunteer-certifications"
            placeholder="List relevant certifications, or leave this field blank"
            rows={3}
          />
          <FieldError id="volunteer-certifications-error" message={errors.certifications?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="volunteer-district">District</Label>
          <NativeSelect
            {...register('district')}
            aria-describedby={errors.district ? 'volunteer-district-error' : undefined}
            aria-invalid={Boolean(errors.district)}
            className="w-full"
            id="volunteer-district"
          >
            <NativeSelectOption value="">Select district</NativeSelectOption>
            {KERALA_DISTRICTS.map((district) => (
              <NativeSelectOption key={district} value={district}>
                {district}
              </NativeSelectOption>
            ))}
          </NativeSelect>
          <FieldError id="volunteer-district-error" message={errors.district?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="volunteer-availability">Availability</Label>
          <Input
            {...register('availability')}
            aria-describedby={errors.availability ? 'volunteer-availability-error' : undefined}
            aria-invalid={Boolean(errors.availability)}
            autoComplete="off"
            id="volunteer-availability"
            placeholder="For example, weekday evenings"
            type="text"
          />
          <FieldError id="volunteer-availability-error" message={errors.availability?.message} />
        </div>
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

export default VolunteerRegistrationForm