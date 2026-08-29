import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ACCOUNT_TYPES } from '@/constants/roles'
import RegistrationStatusLabel from '@/features/registration/admin/components/RegistrationStatusLabel.jsx'
import MemberAccountStatusPreview from './MemberAccountStatusPreview.jsx'

const profileFields = {
  [ACCOUNT_TYPES.ORGANIZATION]: [
    ['Organization name', 'organizationName'], ['Organization type', 'organizationType'],
    ['Sector', 'sector'], ['Contact person', 'contactPerson'],
    ['Designation', 'designation'], ['Address', 'address'],
  ],
  [ACCOUNT_TYPES.VOLUNTEER]: [
    ['Full name', 'fullName'], ['Occupation', 'occupation'],
    ['Cybersecurity skills', 'cybersecuritySkills'], ['Certifications', 'certifications'],
    ['Availability', 'availability'],
  ],
  [ACCOUNT_TYPES.INDIVIDUAL]: [
    ['Full name', 'fullName'], ['Occupation', 'occupation'],
  ],
}

function formatCategory(category) {
  return category.charAt(0) + category.slice(1).toLowerCase()
}

function DetailList({ fields }) {
  return <dl className="grid min-w-0 gap-x-8 gap-y-5 sm:grid-cols-2">{fields.map(([label, value, dateTime]) => (
    <div className="min-w-0" key={label}><dt className="text-sm font-medium text-slate-500">{label}</dt><dd className="mt-1 whitespace-pre-wrap break-words leading-7 text-slate-900">{dateTime ? <time dateTime={dateTime}>{value}</time> : value}</dd></div>
  ))}</dl>
}

function RegisteredMemberDetails({ member, memberName, previewUpdateNotice }) {
  const categoryFields = profileFields[member.accountCategory].map(([label, key]) => [label, member.profile[key]])

  return <div className="min-w-0 space-y-8">
    <Card className="min-w-0"><CardHeader className="border-b"><h2 className="text-xl font-semibold text-slate-950">Member account summary</h2></CardHeader><CardContent className="space-y-5">
      <DetailList fields={[
        ['Account category', formatCategory(member.accountCategory)],
        ['Registered email', member.registeredEmail], ['Registered mobile', member.registeredMobile],
        ['District', member.district], ['Registration date', member.registrationDate, member.registrationDate],
      ]} />
      <div className="flex flex-wrap gap-2">
        <RegistrationStatusLabel label="Registration" status={member.registrationStatus} />
        <RegistrationStatusLabel label="Account" status={member.accountStatus} />
      </div>
    </CardContent></Card>
    <Card className="min-w-0"><CardHeader className="border-b"><h2 className="text-xl font-semibold text-slate-950">{formatCategory(member.accountCategory)} profile</h2></CardHeader><CardContent><DetailList fields={categoryFields} /></CardContent></Card>
    <MemberAccountStatusPreview initialStatus={member.accountStatus} memberName={memberName} previewUpdateNotice={previewUpdateNotice} />
  </div>
}

export default RegisteredMemberDetails
