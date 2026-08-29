import { INCIDENT_STATUSES } from '@/constants/incidentStatuses'
import { formatIncidentStatus } from '../incidentStatusUtils.js'

const statusStyles = {
  [INCIDENT_STATUSES.SUBMITTED]: 'border-slate-300 bg-slate-100 text-slate-800',
  [INCIDENT_STATUSES.UNDER_REVIEW]: 'border-amber-300 bg-amber-50 text-amber-900',
  [INCIDENT_STATUSES.IN_PROGRESS]: 'border-blue-300 bg-blue-50 text-blue-900',
  [INCIDENT_STATUSES.RESOLVED]: 'border-green-300 bg-green-50 text-green-900',
  [INCIDENT_STATUSES.CLOSED]: 'border-slate-400 bg-slate-200 text-slate-900',
}

function IncidentStatusLabel({ status }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      Status: {formatIncidentStatus(status)}
    </span>
  )
}

export default IncidentStatusLabel
