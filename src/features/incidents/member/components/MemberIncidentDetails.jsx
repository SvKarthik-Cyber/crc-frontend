import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { MEMBER_INCIDENT_STATUS_DETAILS } from '../memberIncidentStatuses.js'
import MemberIncidentStatus from './MemberIncidentStatus.jsx'

function DetailList({ fields }) {
  return <dl className="grid min-w-0 gap-x-8 gap-y-5 sm:grid-cols-2">
    {fields.filter(([, value]) => value !== '').map(([label, value, dateTime]) => (
      <div className="min-w-0" key={label}><dt className="text-sm font-medium text-slate-500">{label}</dt><dd className="mt-1 whitespace-pre-wrap break-words leading-7 text-slate-900">{dateTime ? <time dateTime={dateTime}>{value}</time> : value}</dd></div>
    ))}
  </dl>
}

function MemberIncidentDetails({ incident }) {
  const statusDetails = MEMBER_INCIDENT_STATUS_DETAILS[incident.status]
  return <div className="min-w-0 space-y-8">
    <Card className="min-w-0"><CardHeader className="border-b"><h2 className="text-xl font-semibold text-slate-950">Incident summary</h2></CardHeader><CardContent className="space-y-5">
      <DetailList fields={[[ 'Incident reference', incident.reference ], [ 'Title', incident.title ], [ 'Category', incident.category ], [ 'Submitted date', incident.submittedAt, incident.submittedAt ]]} />
      <MemberIncidentStatus status={incident.status} />
    </CardContent></Card>
    <Card className="min-w-0"><CardHeader className="border-b"><h2 className="text-xl font-semibold text-slate-950">Original report</h2><p className="leading-6 text-slate-600">Submitted incident details are read-only in the portal and cannot be edited or deleted.</p></CardHeader><CardContent>
      <DetailList fields={[
        ['Date detected', incident.report.dateDetected, incident.report.dateDetected], ['Approximate time detected', incident.report.timeDetected],
        ['Detailed description', incident.report.description], ['Affected system or service', incident.report.affectedSystem],
        ['Whether the incident is ongoing', incident.report.isOngoing], ['Operational impact', incident.report.operationalImpact],
        ['Estimated financial loss', incident.report.financialLoss], ['Actions already taken', incident.report.actionsTaken],
        ['Technical indicators', incident.report.technicalIndicators], ['Preferred contact method', incident.report.preferredContactMethod],
      ]} />
    </CardContent></Card>
    <Card className="min-w-0"><CardHeader className="border-b"><h2 className="text-xl font-semibold text-slate-950">Current status</h2></CardHeader><CardContent className="space-y-3"><MemberIncidentStatus status={incident.status} /><p className="leading-7 text-slate-600">{statusDetails?.description}</p></CardContent></Card>
    <Card className="min-w-0"><CardHeader className="border-b"><h2 className="text-xl font-semibold text-slate-950">Responses from CRC</h2><p className="leading-6 text-slate-600">Responses shown here are visible to the reporting member.</p></CardHeader><CardContent>
      {incident.responses.length === 0 ? <p className="leading-7 text-slate-600">No CRC response is available for this incident yet.</p> : <ul className="space-y-4">{incident.responses.map((response) => <li className="rounded-lg border border-slate-200 bg-slate-50 p-4" key={response.id}><p className="whitespace-pre-wrap break-words leading-7 text-slate-900">{response.text}</p><p className="mt-3 text-sm text-slate-500">Sent date: <time dateTime={response.sentAt}>{response.sentAt}</time></p></li>)}</ul>}
    </CardContent></Card>
  </div>
}

export default MemberIncidentDetails
