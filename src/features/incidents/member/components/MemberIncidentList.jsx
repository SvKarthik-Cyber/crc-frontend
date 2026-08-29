import { ArrowRight, FolderSearch } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import MemberIncidentStatus from './MemberIncidentStatus.jsx'

function MemberIncidentList({ incidents, hasActiveFilters }) {
  if (incidents.length === 0) {
    return (
      <Card><CardContent className="py-8 text-center">
        <FolderSearch className="mx-auto size-8 text-slate-500" aria-hidden="true" />
        <h2 className="mt-4 text-lg font-semibold text-slate-950">No incidents found</h2>
        <p className="mt-2 text-slate-600">{hasActiveFilters ? 'No incidents match the current search and filters.' : 'No member incident records are available.'}</p>
      </CardContent></Card>
    )
  }
  return (
    <ul className="grid min-w-0 gap-4" aria-label="Member incidents">
      {incidents.map((incident) => (
        <li className="min-w-0" key={incident.id}><Card className="min-w-0"><CardContent className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="break-words text-sm font-semibold text-blue-800">{incident.reference}</p>
            <h2 className="mt-1 break-words text-lg font-semibold text-slate-950">{incident.title}</h2>
            <dl className="mt-4 grid min-w-0 gap-3 text-sm sm:grid-cols-2">
              <div className="min-w-0"><dt className="font-medium text-slate-500">Category</dt><dd className="mt-1 break-words text-slate-900">{incident.category}</dd></div>
              <div><dt className="font-medium text-slate-500">Submitted date</dt><dd className="mt-1 text-slate-900"><time dateTime={incident.submittedAt}>{incident.submittedAt}</time></dd></div>
            </dl>
            <div className="mt-4"><MemberIncidentStatus status={incident.status} /></div>
          </div>
          <Button nativeButton={false} render={<Link to={incident.id} />} variant="outline">View details<ArrowRight aria-hidden="true" /></Button>
        </CardContent></Card></li>
      ))}
    </ul>
  )
}

export default MemberIncidentList
