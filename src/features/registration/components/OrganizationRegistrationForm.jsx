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
import { useRegisterOrganizationMutation } from '../../auth/api/authApi.js'
import { setAuthenticatedUser } from '../../auth/state/authSlice.js'
import { organizationRegistrationSchema } from '../schemas/organizationRegistrationSchema.js'

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

function OrganizationRegistrationForm() {
  const [notice, setNotice] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [registerOrganization] = useRegisterOrganizationMutation()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(organizationRegistrationSchema),
    defaultValues: {
      organizationName: '',
      organizationType: '',
      sector: '',
      contactPerson: '',
      designation: '',
      email: '',
      password: '',
      mobile: '',
      address: '',
      district: '',
    },
  })

  async function handleValidSubmission(values) {
    setNotice('')
    try {
      // Maps this form's field names onto the backend's registerOrgSchema
      // exactly (see backend src/middleware/validate.js) - top-level name/
      // email/password/mobile/district, everything else nested under orgProfile.
      const response = await registerOrganization({
        name: values.organizationName,
        email: values.email,
        password: values.password,
        mobile: values.mobile,
        district: values.district,
        orgProfile: {
          orgType: values.organizationType,
          sector: values.sector,
          contactPerson: values.contactPerson,
          designation: values.designation,
          address: values.address,
        },
      }).unwrap()

      // Organization accounts get instant login access (unlike individual
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
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="organization-name">Organization name</Label>
          <Input
            {...register('organizationName')}
            aria-describedby={errors.organizationName ? 'organization-name-error' : undefined}
            aria-invalid={Boolean(errors.organizationName)}
            autoComplete="organization"
            id="organization-name"
            type="text"
          />
          <FieldError id="organization-name-error" message={errors.organizationName?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="organization-type">Organization type</Label>
          <Input
            {...register('organizationType')}
            aria-describedby={errors.organizationType ? 'organization-type-error' : undefined}
            aria-invalid={Boolean(errors.organizationType)}
            autoComplete="off"
            id="organization-type"
            type="text"
          />
          <FieldError id="organization-type-error" message={errors.organizationType?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="organization-sector">Sector</Label>
          <Input
            {...register('sector')}
            aria-describedby={errors.sector ? 'organization-sector-error' : undefined}
            aria-invalid={Boolean(errors.sector)}
            autoComplete="off"
            id="organization-sector"
            type="text"
          />
          <FieldError id="organization-sector-error" message={errors.sector?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-person">Contact person</Label>
          <Input
            {...register('contactPerson')}
            aria-describedby={errors.contactPerson ? 'contact-person-error' : undefined}
            aria-invalid={Boolean(errors.contactPerson)}
            autoComplete="name"
            id="contact-person"
            type="text"
          />
          <FieldError id="contact-person-error" message={errors.contactPerson?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="designation">Designation</Label>
          <Input
            {...register('designation')}
            aria-describedby={errors.designation ? 'designation-error' : undefined}
            aria-invalid={Boolean(errors.designation)}
            autoComplete="organization-title"
            id="designation"
            type="text"
          />
          <FieldError id="designation-error" message={errors.designation?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="organization-email">Email address</Label>
          <Input
            {...register('email')}
            aria-describedby={errors.email ? 'organization-email-error' : undefined}
            aria-invalid={Boolean(errors.email)}
            autoComplete="email"
            id="organization-email"
            inputMode="email"
            type="email"
          />
          <FieldError id="organization-email-error" message={errors.email?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="organization-password">Password</Label>
          <Input
            {...register('password')}
            aria-describedby={errors.password ? 'organization-password-error' : undefined}
            aria-invalid={Boolean(errors.password)}
            autoComplete="new-password"
            id="organization-password"
            type="password"
          />
          <FieldError id="organization-password-error" message={errors.password?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="organization-mobile">Mobile number</Label>
          <Input
            {...register('mobile')}
            aria-describedby={errors.mobile ? 'organization-mobile-error' : undefined}
            aria-invalid={Boolean(errors.mobile)}
            autoComplete="tel-national"
            id="organization-mobile"
            inputMode="numeric"
            maxLength={10}
            type="tel"
          />
          <FieldError id="organization-mobile-error" message={errors.mobile?.message} />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="organization-address">Address</Label>
          <Textarea
            {...register('address')}
            aria-describedby={errors.address ? 'organization-address-error' : undefined}
            aria-invalid={Boolean(errors.address)}
            autoComplete="street-address"
            id="organization-address"
            rows={4}
          />
          <FieldError id="organization-address-error" message={errors.address?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="organization-district">District</Label>
          <NativeSelect
            {...register('district')}
            aria-describedby={errors.district ? 'organization-district-error' : undefined}
            aria-invalid={Boolean(errors.district)}
            className="w-full"
            id="organization-district"
          >
            <NativeSelectOption value="">Select district</NativeSelectOption>
            {KERALA_DISTRICTS.map((district) => (
              <NativeSelectOption key={district} value={district}>
                {district}
              </NativeSelectOption>
            ))}
          </NativeSelect>
          <FieldError id="organization-district-error" message={errors.district?.message} />
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

export default OrganizationRegistrationForm