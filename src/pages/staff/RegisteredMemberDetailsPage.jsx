import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { Button } from '@/components/ui/button'
import RegisteredMemberDetails from '@/features/members/admin/components/RegisteredMemberDetails.jsx'
import { getRegisteredMemberName } from '@/features/members/admin/memberAdminFilters.js'

function RegisteredMemberDetailsPage({ memberRecords = null, previewUpdateNotice = null }) {
  const { memberId } = useParams()
  const member = memberRecords?.find((record) => record.id === memberId)

  if (!member) return <section className="min-w-0" aria-labelledby="registered-member-unavailable-title">
    <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl" id="registered-member-unavailable-title">Member unavailable</h1>
    <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">Member not found or unavailable.</p>
    <Button className="mt-6" nativeButton={false} render={<Link relative="path" to=".." />} variant="outline"><ArrowLeft aria-hidden="true" /> Back to Registered Members</Button>
  </section>

  const memberName = getRegisteredMemberName(member)
  return <section className="min-w-0" aria-labelledby="registered-member-detail-title">
    <Button nativeButton={false} render={<Link relative="path" to=".." />} variant="outline"><ArrowLeft aria-hidden="true" /> Back to Registered Members</Button>
    <h1 className="mt-6 break-words text-3xl font-bold tracking-tight text-slate-950 md:text-4xl" id="registered-member-detail-title">{memberName}</h1>
    <div className="mt-8"><RegisteredMemberDetails member={member} memberName={memberName} previewUpdateNotice={previewUpdateNotice} /></div>
  </section>
}

export default RegisteredMemberDetailsPage
