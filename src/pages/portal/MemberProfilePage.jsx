import { CircleUserRound } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ACCOUNT_STATUSES, REGISTRATION_STATUSES } from '@/constants/registrationStatuses'

function ProfileStatus({ label, status }) {
  const isRegistrationApproved = status === REGISTRATION_STATUSES.APPROVED
  const isAccountActive = status === ACCOUNT_STATUSES.ACTIVE
  const statusText = isRegistrationApproved ? 'Approved' : isAccountActive ? 'Active' : status
  const className = isRegistrationApproved
    ? 'border-green-300 bg-green-50 text-green-900'
    : 'border-blue-300 bg-blue-50 text-blue-900'

  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${className}`}>{label}: {statusText}</span>
}

function MemberProfilePage({ profile = null }) {
  return (
    <section className="min-w-0" aria-labelledby="member-profile-title">
      <CircleUserRound className="mb-5 size-8 text-blue-700" aria-hidden="true" />
      <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl" id="member-profile-title">Profile</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">View the Organization information associated with your approved CRC member account.</p>

      <Card className="mt-8 min-w-0 max-w-4xl">
        <CardHeader className="min-w-0 border-b">
          <h2 className="text-xl font-semibold text-slate-950">Organization profile</h2>
          <p className="leading-6 text-slate-600">Profile information is read-only in the member portal.</p>
        </CardHeader>
        <CardContent>
          {profile === null ? (
            <p className="leading-7 text-slate-600">Profile information will become available after secure backend integration.</p>
          ) : (
            <div className="min-w-0 space-y-6">
              <dl className="grid min-w-0 gap-x-8 gap-y-5 md:grid-cols-2">
                {[
                  ['Organization name', profile.organizationName],
                  ['Organization type', profile.organizationType],
                  ['Sector', profile.sector],
                  ['Contact person', profile.contactPerson],
                  ['Designation', profile.designation],
                  ['Email', profile.email],
                  ['Mobile', profile.mobile],
                  ['Address', profile.address, true],
                  ['District', profile.district],
                  ['Registration date', profile.registrationDate, false, profile.registrationDate],
                ].map(([label, value, fullWidth, dateTime]) => (
                  <div className={`min-w-0 ${fullWidth ? 'md:col-span-2' : ''}`} key={label}>
                    <dt className="text-sm font-medium text-slate-500">{label}</dt>
                    <dd className="mt-1 whitespace-pre-wrap break-words leading-7 text-slate-900">{dateTime ? <time dateTime={dateTime}>{value}</time> : value}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-wrap gap-2" aria-label="Profile statuses">
                <ProfileStatus label="Registration" status={profile.registrationStatus} />
                <ProfileStatus label="Account" status={profile.accountStatus} />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <p className="mt-6 max-w-4xl text-sm leading-6 text-slate-600">
        Frontend display logic is not an authorization boundary. The future backend must derive identity from authentication, return only the authenticated member&apos;s explicitly permitted profile fields, reject client-supplied member IDs, and never return password hashes, tokens, staff roles, permissions, audit data, or internal administrative information.
      </p>
    </section>
  )
}

export default MemberProfilePage
