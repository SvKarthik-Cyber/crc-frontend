import { ArrowRight, UserRoundX } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import RegistrationStatusLabel from '@/features/registration/admin/components/RegistrationStatusLabel.jsx'
import { formatStaffAccountDate, formatStaffRole } from '../staffAccountFormatters.js'

function StaffAccountList({ staffAccounts }) {
  if (staffAccounts.length === 0) {
    return <Card><CardContent className="py-8 text-center">
      <UserRoundX className="mx-auto size-8 text-slate-500" aria-hidden="true" />
      <h2 className="mt-4 text-lg font-semibold text-slate-950">No staff accounts found</h2>
      <p className="mt-2 text-slate-600">No staff accounts match the current search and filters.</p>
    </CardContent></Card>
  }

  return <ul className="grid min-w-0 gap-4" aria-label="Staff accounts">{staffAccounts.map((staffAccount) => (
    <li className="min-w-0" key={staffAccount.id}><article><Card className="min-w-0"><CardContent className="grid min-w-0 gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
      <div className="min-w-0">
        <h2 className="break-words text-lg font-semibold text-slate-950">{staffAccount.name}</h2>
        <dl className="mt-4 grid min-w-0 gap-3 text-sm sm:grid-cols-2">
          <div><dt className="font-medium text-slate-500">Role</dt><dd className="mt-1 text-slate-900">{formatStaffRole(staffAccount.role)}</dd></div>
          <div className="min-w-0"><dt className="font-medium text-slate-500">Official email</dt><dd className="mt-1 break-words text-slate-900">{staffAccount.officialEmail}</dd></div>
          <div><dt className="font-medium text-slate-500">Created date</dt><dd className="mt-1 text-slate-900"><time dateTime={staffAccount.createdAt}>{formatStaffAccountDate(staffAccount.createdAt)}</time></dd></div>
        </dl>
        <div className="mt-4"><RegistrationStatusLabel label="Account" status={staffAccount.accountStatus} /></div>
      </div>
      <Button nativeButton={false} render={<Link to={staffAccount.id} />} variant="outline">View details: {staffAccount.name} <ArrowRight aria-hidden="true" /></Button>
    </CardContent></Card></article></li>
  ))}</ul>
}

export default StaffAccountList
