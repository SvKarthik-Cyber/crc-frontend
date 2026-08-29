import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ADVISORY_STATUSES } from '@/constants/advisoryStatuses'
import AdvisoryForm from '@/features/advisories/admin/components/AdvisoryForm.jsx'

function EditAdvisoryPage({ advisoryRecords = null }) {
  const { advisoryId } = useParams()
  const advisory = advisoryRecords?.find((record) => record.id === advisoryId)

  if (!advisory) {
    const isBackendUnconnected = advisoryRecords === null

    return (
      <section className="min-w-0" aria-labelledby="edit-advisory-unavailable-title">
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl" id="edit-advisory-unavailable-title">
          {isBackendUnconnected ? 'Advisory edit unavailable' : 'Advisory record not found'}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          {isBackendUnconnected ? 'Advisory editing is not connected to the backend yet.' : 'No development-preview advisory matches this identifier.'}
        </p>
        <Button className="mt-6" nativeButton={false} render={<Link relative="path" to="../.." />} variant="outline"><ArrowLeft aria-hidden="true" /> Back to Advisory Management</Button>
      </section>
    )
  }

  if (advisory.status !== ADVISORY_STATUSES.DRAFT) {
    return (
      <section className="min-w-0" aria-labelledby="edit-advisory-read-only-title">
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl" id="edit-advisory-read-only-title">Advisory is read-only</h1>
        <Card className="mt-8 min-w-0"><CardContent className="text-slate-600">Only draft advisories may be edited. This preview record remains unchanged.</CardContent></Card>
        <Button className="mt-6" nativeButton={false} render={<Link relative="path" to=".." />} variant="outline"><ArrowLeft aria-hidden="true" /> Back to advisory details</Button>
      </section>
    )
  }

  const initialValues = {
    title: advisory.title,
    category: advisory.category,
    summary: advisory.summary,
    content: advisory.content,
    audience: advisory.audience,
    accountCategories: [...advisory.accountCategories],
  }

  return (
    <section className="min-w-0" aria-labelledby="edit-advisory-title">
      <Button nativeButton={false} render={<Link relative="path" to=".." />} variant="outline"><ArrowLeft aria-hidden="true" /> Back to advisory details</Button>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl" id="edit-advisory-title">Edit advisory</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">This preview validates proposed draft changes locally without modifying the original record.</p>
      <div className="mt-8 min-w-0 max-w-4xl">
        <AdvisoryForm initialValues={initialValues} submitLabel="Validate advisory changes" successNotice="Advisory changes validated locally. Backend submission is not connected." />
      </div>
    </section>
  )
}

export default EditAdvisoryPage
