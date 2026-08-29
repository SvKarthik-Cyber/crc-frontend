import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { Button } from '@/components/ui/button'
import MemberIncidentDetails from '@/features/incidents/member/components/MemberIncidentDetails.jsx'

function MemberIncidentDetailsPage({ incidentRecords = null }) {
  const { incidentId } = useParams()
  const incident = incidentRecords?.find((record) => record.id === incidentId)
  if (!incident) return <section className="min-w-0" aria-labelledby="member-incident-not-found-title">
    <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl" id="member-incident-not-found-title">Incident not found</h1>
    <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">{incidentRecords === null ? 'Incident details are not connected to the backend yet.' : 'No member incident matches this identifier.'}</p>
    <Button className="mt-6" nativeButton={false} render={<Link relative="path" to=".." />} variant="outline"><ArrowLeft aria-hidden="true" />Back to My Incidents</Button>
  </section>
  return <section className="min-w-0" aria-labelledby="member-incident-detail-title">
    <Button nativeButton={false} render={<Link relative="path" to=".." />} variant="outline"><ArrowLeft aria-hidden="true" />Back to My Incidents</Button>
    <p className="mt-6 break-words text-sm font-semibold text-blue-800">{incident.reference}</p>
    <h1 className="mt-1 break-words text-3xl font-bold tracking-tight text-slate-950 md:text-4xl" id="member-incident-detail-title">{incident.title}</h1>
    <div className="mt-8"><MemberIncidentDetails incident={incident} /></div>
  </section>
}

export default MemberIncidentDetailsPage
