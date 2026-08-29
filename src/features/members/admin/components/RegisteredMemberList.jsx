import { ArrowRight, UsersRound } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import RegistrationStatusLabel from '@/features/registration/admin/components/RegistrationStatusLabel.jsx'
import { getRegisteredMemberName } from '../memberAdminFilters.js'

function formatCategory(category) {
  return category.charAt(0) + category.slice(1).toLowerCase()
}

function RegisteredMemberList({ members }) {
  if (members.length === 0) {
    return (
      <Card><CardContent className="py-8 text-center">
        <UsersRound className="mx-auto size-8 text-slate-500" aria-hidden="true" />
        <h2 className="mt-4 text-lg font-semibold text-slate-950">No registered members found</h2>
        <p className="mt-2 text-slate-600">No approved members match the current search and filters.</p>
      </CardContent></Card>
    )
  }

  return (
    <ul className="grid min-w-0 gap-4" aria-label="Registered members">
      {members.map((member) => (
        <li className="min-w-0" key={member.id}><article><Card className="min-w-0"><CardContent className="grid min-w-0 gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div className="min-w-0">
            <h2 className="break-words text-lg font-semibold text-slate-950">{getRegisteredMemberName(member)}</h2>
            <dl className="mt-4 grid min-w-0 gap-3 text-sm sm:grid-cols-2">
              <div><dt className="font-medium text-slate-500">Account category</dt><dd className="mt-1 text-slate-900">{formatCategory(member.accountCategory)}</dd></div>
              <div><dt className="font-medium text-slate-500">Registration date</dt><dd className="mt-1 text-slate-900"><time dateTime={member.registrationDate}>{member.registrationDate}</time></dd></div>
            </dl>
            <div className="mt-4 flex flex-wrap gap-2">
              <RegistrationStatusLabel label="Registration" status={member.registrationStatus} />
              <RegistrationStatusLabel label="Account" status={member.accountStatus} />
            </div>
          </div>
          <Button nativeButton={false} render={<Link to={member.id} />} variant="outline">View details: {getRegisteredMemberName(member)} <ArrowRight aria-hidden="true" /></Button>
        </CardContent></Card></article></li>
      ))}
    </ul>
  )
}

export default RegisteredMemberList
