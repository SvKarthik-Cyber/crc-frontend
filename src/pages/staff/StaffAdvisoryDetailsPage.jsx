import { ArrowLeft, Pencil } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ADVISORY_AUDIENCES } from '@/constants/advisoryAudiences'
import { ADVISORY_STATUSES } from '@/constants/advisoryStatuses'
import AdvisoryLifecyclePreview from '@/features/advisories/admin/components/AdvisoryLifecyclePreview.jsx'
import AdvisoryStatusLabel from '@/features/advisories/admin/components/AdvisoryStatusLabel.jsx'
import { describeAdvisoryAudience } from '@/features/advisories/admin/advisoryFormatters.js'

function StaffAdvisoryDetailsPage({ advisoryRecords = null }) {
  const { advisoryId } = useParams()
  const advisory = advisoryRecords?.find((record) => record.id === advisoryId)

  if (!advisory) {
    return (
      <section className="min-w-0" aria-labelledby="advisory-not-found-title">
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl" id="advisory-not-found-title">Advisory record not found</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          {advisoryRecords === null ? 'Advisory details are not connected to the backend yet.' : 'No development-preview advisory matches this identifier.'}
        </p>
        <Button className="mt-6" nativeButton={false} render={<Link relative="path" to=".." />} variant="outline">
          <ArrowLeft aria-hidden="true" /> Back to Advisory Management
        </Button>
      </section>
    )
  }

  const isDraft = advisory.status === ADVISORY_STATUSES.DRAFT
  const isArchived = advisory.status === ADVISORY_STATUSES.ARCHIVED

  return (
    <section className="min-w-0" aria-labelledby="advisory-detail-title">
      <div className="flex flex-wrap gap-3">
        <Button nativeButton={false} render={<Link relative="path" to=".." />} variant="outline">
          <ArrowLeft aria-hidden="true" /> Back to Advisory Management
        </Button>
        {isDraft ? (
          <Button nativeButton={false} render={<Link to="edit" />} variant="outline">
            <Pencil aria-hidden="true" /> Edit advisory
          </Button>
        ) : null}
      </div>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl" id="advisory-detail-title">{advisory.title}</h1>
      <Card className="mt-8 min-w-0">
        <CardHeader className="min-w-0 border-b"><h2 className="text-xl font-semibold text-slate-950">Advisory details</h2></CardHeader>
        <CardContent className="space-y-6">
          <dl className="grid min-w-0 gap-x-8 gap-y-5 sm:grid-cols-2">
            {[
              ['Advisory reference', advisory.reference],
              ['Title', advisory.title],
              ['Category', advisory.category],
              ['Created date', advisory.createdAt, advisory.createdAt],
              ['Published date', advisory.publishedAt, advisory.publishedAt],
              ['Archived date', advisory.archivedAt, advisory.archivedAt],
              ['Intended audience', describeAdvisoryAudience(advisory, ADVISORY_AUDIENCES.ALL_APPROVED_MEMBERS)],
            ].filter(([, value]) => value).map(([label, value, dateTime]) => (
              <div className="min-w-0" key={label}><dt className="text-sm font-medium text-slate-500">{label}</dt><dd className="mt-1 break-words leading-7 text-slate-900">{dateTime ? <time dateTime={dateTime}>{value}</time> : value}</dd></div>
            ))}
          </dl>
          <AdvisoryStatusLabel status={advisory.status} />
        </CardContent>
      </Card>
      <Card className="mt-8 min-w-0">
        <CardHeader className="min-w-0 border-b"><h2 className="text-xl font-semibold text-slate-950">Advisory content</h2></CardHeader>
        <CardContent className="space-y-6">
          <div><h3 className="font-semibold text-slate-950">Summary</h3><p className="mt-2 whitespace-pre-wrap leading-7 text-slate-700">{advisory.summary}</p></div>
          <div><h3 className="font-semibold text-slate-950">Full content</h3><p className="mt-2 whitespace-pre-wrap break-words leading-7 text-slate-700">{advisory.content}</p></div>
        </CardContent>
      </Card>
      <div className="mt-8 rounded-lg border border-slate-300 bg-slate-100 p-4 text-sm leading-6 text-slate-800">
        Future backend filtering must require a published advisory, an approved registration and an active account. For account-category audiences, the member account type must match a selected category.
      </div>
      {isArchived ? (
        <div className="mt-8 rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-950">Archived advisories are read-only in this interface.</div>
      ) : (
        <AdvisoryLifecyclePreview status={advisory.status} />
      )}
    </section>
  )
}

export default StaffAdvisoryDetailsPage
