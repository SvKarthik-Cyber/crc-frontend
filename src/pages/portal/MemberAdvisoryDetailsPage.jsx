import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { Button } from '@/components/ui/button'
import MemberAdvisoryDetails from '@/features/advisories/member/components/MemberAdvisoryDetails.jsx'
import { isAdvisoryVisibleToMember } from '@/features/advisories/member/memberAdvisoryVisibility.js'

function MemberAdvisoryDetailsPage({ advisoryRecords = null, memberAccountCategory = null }) {
  const { advisoryId } = useParams()
  const advisory = advisoryRecords?.find((record) => record.id === advisoryId)
  const visibleAdvisory = isAdvisoryVisibleToMember(advisory, memberAccountCategory)
    ? advisory
    : null

  if (!visibleAdvisory) {
    return (
      <section className="min-w-0" aria-labelledby="member-advisory-unavailable-title">
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl" id="member-advisory-unavailable-title">Advisory unavailable</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">Advisory not found or unavailable.</p>
        <Button className="mt-6" nativeButton={false} render={<Link relative="path" to=".." />} variant="outline">
          <ArrowLeft aria-hidden="true" /> Back to Advisories
        </Button>
      </section>
    )
  }

  return (
    <section className="min-w-0" aria-labelledby="member-advisory-detail-title">
      <Button nativeButton={false} render={<Link relative="path" to=".." />} variant="outline">
        <ArrowLeft aria-hidden="true" /> Back to Advisories
      </Button>
      <p className="mt-6 break-words text-sm font-semibold text-blue-800">{visibleAdvisory.reference}</p>
      <h1 className="mt-1 break-words text-3xl font-bold tracking-tight text-slate-950 md:text-4xl" id="member-advisory-detail-title">{visibleAdvisory.title}</h1>
      <div className="mt-8"><MemberAdvisoryDetails advisory={visibleAdvisory} /></div>
    </section>
  )
}

export default MemberAdvisoryDetailsPage
