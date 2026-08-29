import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ACCOUNT_TYPES } from '@/constants/roles'
import { REGISTRATION_STATUSES } from '@/constants/registrationStatuses'
import RegistrationReviewActions from '@/features/registration/admin/components/RegistrationReviewActions.jsx'
import RegistrationStatusLabel from '@/features/registration/admin/components/RegistrationStatusLabel.jsx'

const detailFields = {
  [ACCOUNT_TYPES.ORGANIZATION]: [
    ['Organization name', 'organizationName'],
    ['Organization type', 'organizationType'],
    ['Sector', 'sector'],
    ['Contact person', 'contactPerson'],
    ['Designation', 'designation'],
    ['Email', 'email'],
    ['Mobile', 'mobile'],
    ['Address', 'address'],
    ['District', 'district'],
  ],
  [ACCOUNT_TYPES.VOLUNTEER]: [
    ['Full name', 'fullName'],
    ['Email', 'email'],
    ['Mobile', 'mobile'],
    ['Occupation', 'occupation'],
    ['Cybersecurity skills', 'cybersecuritySkills'],
    ['Certifications', 'certifications'],
    ['District', 'district'],
    ['Availability', 'availability'],
  ],
  [ACCOUNT_TYPES.INDIVIDUAL]: [
    ['Full name', 'fullName'],
    ['Email', 'email'],
    ['Mobile', 'mobile'],
    ['District', 'district'],
    ['Occupation', 'occupation'],
  ],
}

function formatCategory(category) {
  return category.charAt(0) + category.slice(1).toLowerCase()
}

function RegistrationRequestDetailsPage({ registrationRecords = null }) {
  const { registrationId } = useParams()
  const record = registrationRecords?.find((item) => item.id === registrationId)

  if (!record) {
    return (
      <section className="min-w-0" aria-labelledby="registration-not-found-title">
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl" id="registration-not-found-title">
          Registration record not found
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          {registrationRecords === null
            ? 'Registration details are not connected to the backend yet.'
            : 'No development-preview registration matches this identifier.'}
        </p>
        <Button
          className="mt-6"
          nativeButton={false}
          render={<Link relative="path" to=".." />}
          variant="outline"
        >
          <ArrowLeft aria-hidden="true" />
          Back to Registration Requests
        </Button>
      </section>
    )
  }

  const fields = detailFields[record.category].filter(([, key]) => record.details[key])

  return (
    <section className="min-w-0" aria-labelledby="registration-detail-title">
      <Button
        nativeButton={false}
        render={<Link relative="path" to=".." />}
        variant="outline"
      >
        <ArrowLeft aria-hidden="true" />
        Back to Registration Requests
      </Button>

      <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl" id="registration-detail-title">
        {record.name}
      </h1>

      <Card className="mt-8 min-w-0">
        <CardHeader className="min-w-0 border-b">
          <h2 className="text-xl font-semibold text-slate-950">Registration summary</h2>
        </CardHeader>
        <CardContent className="grid min-w-0 gap-5 sm:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-slate-500">Registration category</p>
            <p className="mt-1 text-slate-900">{formatCategory(record.category)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Submission date</p>
            <p className="mt-1 text-slate-900"><time dateTime={record.submittedAt}>{record.submittedAt}</time></p>
          </div>
          <div className="flex flex-wrap gap-2 sm:col-span-2">
            <RegistrationStatusLabel label="Registration" status={record.registrationStatus} />
            <RegistrationStatusLabel label="Account" status={record.accountStatus} />
          </div>
        </CardContent>
      </Card>

      {record.registrationStatus === REGISTRATION_STATUSES.APPROVED ? (
        <div className="mt-6 rounded-lg border border-green-300 bg-green-50 p-4 text-green-950">
          <p className="font-semibold">This registration is approved, but the account remains inactive.</p>
          <p className="mt-2 leading-7">
            Account activation is pending a separate backend and credential-workflow decision.
          </p>
        </div>
      ) : null}

      {record.registrationStatus === REGISTRATION_STATUSES.REJECTED ? (
        <div className="mt-6 rounded-lg border border-red-300 bg-red-50 p-4 text-red-950">
          <p className="font-semibold">Rejection reason</p>
          <p className="mt-2 leading-7">{record.rejectionReason}</p>
        </div>
      ) : null}

      <Card className="mt-8 min-w-0">
        <CardHeader className="min-w-0 border-b">
          <h2 className="text-xl font-semibold text-slate-950">Submitted details</h2>
        </CardHeader>
        <CardContent>
          <dl className="grid min-w-0 gap-x-8 gap-y-5 sm:grid-cols-2">
            {fields.map(([label, key]) => (
              <div className="min-w-0" key={key}>
                <dt className="text-sm font-medium text-slate-500">{label}</dt>
                <dd className="mt-1 break-words leading-7 text-slate-900">{record.details[key]}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>

      {record.registrationStatus === REGISTRATION_STATUSES.PENDING ? (
        <RegistrationReviewActions />
      ) : null}
    </section>
  )
}

export default RegistrationRequestDetailsPage
