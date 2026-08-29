import { MEMBER_INCIDENT_STATUS_DETAILS } from '../memberIncidentStatuses.js'

function MemberIncidentStatus({ status }) {
  const details = MEMBER_INCIDENT_STATUS_DETAILS[status]
  if (!details) return null
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${details.className}`}>Status: {details.label}</span>
}

export default MemberIncidentStatus
