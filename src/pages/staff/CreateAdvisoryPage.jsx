import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import AdvisoryForm from '@/features/advisories/admin/components/AdvisoryForm.jsx'

function CreateAdvisoryPage() {
  return (
    <section className="min-w-0" aria-labelledby="create-advisory-title">
      <Button nativeButton={false} render={<Link relative="path" to=".." />} variant="outline">
        <ArrowLeft aria-hidden="true" />
        Back to Advisory Management
      </Button>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl" id="create-advisory-title">
        Create advisory
      </h1>
      <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-blue-950">
        Advisories are created as drafts. Publication is a separate action.
      </div>
      <div className="mt-8 min-w-0 max-w-4xl">
        <AdvisoryForm
          submitLabel="Validate draft advisory"
          successNotice="Advisory validated locally as a draft. Backend submission is not connected."
        />
      </div>
    </section>
  )
}

export default CreateAdvisoryPage
