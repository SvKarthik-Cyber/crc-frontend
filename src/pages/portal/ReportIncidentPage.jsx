import { FilePlus2 } from 'lucide-react'
import IncidentReportForm from '@/features/incidents/components/IncidentReportForm'

function ReportIncidentPage() {
  return (
    <section className="min-w-0" aria-labelledby="report-incident-title">
      <FilePlus2 className="mb-5 size-8 text-blue-700" aria-hidden="true" />
      <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl" id="report-incident-title">
        Report an incident
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
        Provide the initial details needed to describe a cyber incident affecting you or your
        organization.
      </p>

      <div
        className="mt-8 max-w-4xl rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-950 sm:p-5"
        role="note"
      >
        This form is intended for initial incident reporting only. Do not include passwords, OTPs,
        financial credentials, confidential documents or other sensitive evidence. CRC personnel
        may contact you separately if further information or formal procedures are required.
      </div>

      <div className="mt-8 min-w-0 max-w-4xl">
        <IncidentReportForm />
      </div>
    </section>
  )
}

export default ReportIncidentPage
