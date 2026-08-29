import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import IncidentStatusLabel from '@/features/incidents/admin/components/IncidentStatusLabel.jsx'
import IncidentStatusPreview from '@/features/incidents/admin/components/IncidentStatusPreview.jsx'
import InternalNoteForm from '@/features/incidents/admin/components/InternalNoteForm.jsx'
import MemberResponseForm from '@/features/incidents/admin/components/MemberResponseForm.jsx'

function formatAccountCategory(category) {
  return category.charAt(0) + category.slice(1).toLowerCase()
}

function DetailList({ fields }) {
  return (
    <dl className="grid min-w-0 gap-x-8 gap-y-5 sm:grid-cols-2">
      {fields
        .filter(([, value]) => value !== '' && value !== null && value !== undefined)
        .map(([label, value, dateTime]) => (
          <div className="min-w-0" key={label}>
            <dt className="text-sm font-medium text-slate-500">{label}</dt>
            <dd className="mt-1 break-words leading-7 text-slate-900">{dateTime ? <time dateTime={dateTime}>{value}</time> : value}</dd>
          </div>
        ))}
    </dl>
  )
}

function StaffIncidentDetailsPage({ incidentRecords = null }) {
  const { incidentId } = useParams()
  const incident = incidentRecords?.find((record) => record.id === incidentId)

  if (!incident) {
    return (
      <section className="min-w-0" aria-labelledby="incident-not-found-title">
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl" id="incident-not-found-title">
          Incident record not found
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          {incidentRecords === null
            ? 'Incident details are not connected to the backend yet.'
            : 'No development-preview incident matches this identifier.'}
        </p>
        <Button
          className="mt-6"
          nativeButton={false}
          render={<Link relative="path" to=".." />}
          variant="outline"
        >
          <ArrowLeft aria-hidden="true" />
          Back to Incident Management
        </Button>
      </section>
    )
  }

  const assignment = incident.assignment ?? 'Unassigned'

  return (
    <section className="min-w-0" aria-labelledby="staff-incident-detail-title">
      <Button
        nativeButton={false}
        render={<Link relative="path" to=".." />}
        variant="outline"
      >
        <ArrowLeft aria-hidden="true" />
        Back to Incident Management
      </Button>

      <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl" id="staff-incident-detail-title">
        {incident.title}
      </h1>

      <Card className="mt-8 min-w-0">
        <CardHeader className="min-w-0 border-b">
          <h2 className="text-xl font-semibold text-slate-950">Incident summary</h2>
        </CardHeader>
        <CardContent className="space-y-5">
          <DetailList
            fields={[
              ['Incident reference', incident.reference],
              ['Incident title', incident.title],
              ['Category', incident.category],
              ['Submitted date', incident.submittedAt, incident.submittedAt],
              ['Assignment state', assignment],
            ]}
          />
          <IncidentStatusLabel status={incident.status} />
        </CardContent>
      </Card>

      <Card className="mt-8 min-w-0">
        <CardHeader className="min-w-0 border-b">
          <h2 className="text-xl font-semibold text-slate-950">Original member report</h2>
          <p className="leading-6 text-slate-600">
            Submitted report values are read-only and cannot be edited from this interface.
          </p>
        </CardHeader>
        <CardContent>
          <DetailList
            fields={[
              ['Date detected', incident.report.dateDetected, incident.report.dateDetected],
              ['Approximate time detected', incident.report.timeDetected],
              ['Detailed description', incident.report.description],
              ['Affected system or service', incident.report.affectedSystem],
              ['Whether the incident is ongoing', incident.report.isOngoing],
              ['Operational impact', incident.report.operationalImpact],
              ['Estimated financial loss in INR', incident.report.financialLoss],
              ['Actions already taken', incident.report.actionsTaken],
              ['Technical indicators', incident.report.technicalIndicators],
              ['Preferred contact method', incident.report.preferredContactMethod],
            ]}
          />
        </CardContent>
      </Card>

      <Card className="mt-8 min-w-0">
        <CardHeader className="min-w-0 border-b">
          <h2 className="text-xl font-semibold text-slate-950">Relevant reporting-member details</h2>
          <p className="leading-6 text-slate-600">
            Only information relevant to incident handling should be available to authorized staff.
          </p>
        </CardHeader>
        <CardContent>
          <DetailList
            fields={[
              ['Account category', formatAccountCategory(incident.member.accountCategory)],
              ['Registered name', incident.member.registeredName],
              ['Organization name', incident.member.organizationName],
              ['Approved fictional email', incident.member.email],
              ['Approved fictional mobile', incident.member.mobile],
              ['District', incident.member.district],
              ['Preferred contact method', incident.member.preferredContactMethod],
            ]}
          />
        </CardContent>
      </Card>

      <Card className="mt-8 min-w-0">
        <CardHeader className="min-w-0 border-b">
          <h2 className="text-xl font-semibold text-slate-950">Analyst assignment</h2>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="font-semibold text-slate-900">{assignment}</p>
          <p className="leading-7 text-slate-600">
            Assignment and reassignment require backend integration and CRC Administrator
            authorization. No staff selector or assignment control is available.
          </p>
        </CardContent>
      </Card>

      <IncidentStatusPreview currentStatus={incident.status} />
      <InternalNoteForm />
      <MemberResponseForm />
    </section>
  )
}

export default StaffIncidentDetailsPage
