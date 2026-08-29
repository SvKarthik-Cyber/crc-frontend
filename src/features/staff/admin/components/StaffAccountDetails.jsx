import { Card, CardContent, CardHeader } from '@/components/ui/card'
import RegistrationStatusLabel from '@/features/registration/admin/components/RegistrationStatusLabel.jsx'
import { formatStaffAccountDate, formatStaffRole } from '../staffAccountFormatters.js'

function StaffAccountDetails({ staffAccount }) {
  return (
    <Card className="min-w-0 max-w-3xl">
      <CardHeader className="border-b"><h2 className="text-xl font-semibold text-slate-950">Staff account details</h2></CardHeader>
      <CardContent className="space-y-6">
        <dl className="grid min-w-0 gap-x-8 gap-y-5 sm:grid-cols-2">
          {[
            ['Staff name', staffAccount.name],
            ['Role', formatStaffRole(staffAccount.role)],
            ['Official email', staffAccount.officialEmail],
            ['Created date', <time dateTime={staffAccount.createdAt}>{formatStaffAccountDate(staffAccount.createdAt)}</time>],
          ].map(([label, value]) => (
            <div className="min-w-0" key={label}><dt className="text-sm font-medium text-slate-500">{label}</dt><dd className="mt-1 break-words leading-7 text-slate-900">{value}</dd></div>
          ))}
        </dl>
        <RegistrationStatusLabel label="Account" status={staffAccount.accountStatus} />
      </CardContent>
    </Card>
  )
}

export default StaffAccountDetails
