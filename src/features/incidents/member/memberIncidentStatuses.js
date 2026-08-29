import { INCIDENT_STATUSES } from '@/constants/incidentStatuses'

export const MEMBER_INCIDENT_STATUS_DETAILS = {
  [INCIDENT_STATUSES.SUBMITTED]: { label: 'Submitted', description: 'The report has been received and is waiting for CRC review.', className: 'border-slate-300 bg-slate-100 text-slate-800' },
  [INCIDENT_STATUSES.UNDER_REVIEW]: { label: 'Under review', description: 'CRC is reviewing the submitted incident details.', className: 'border-amber-300 bg-amber-50 text-amber-900' },
  [INCIDENT_STATUSES.IN_PROGRESS]: { label: 'In progress', description: 'CRC is currently handling the incident based on the information available.', className: 'border-blue-300 bg-blue-50 text-blue-900' },
  [INCIDENT_STATUSES.RESOLVED]: { label: 'Resolved', description: 'CRC has marked its handling of this incident as resolved.', className: 'border-green-300 bg-green-50 text-green-900' },
  [INCIDENT_STATUSES.CLOSED]: { label: 'Closed', description: 'CRC has closed this incident record.', className: 'border-slate-400 bg-slate-200 text-slate-900' },
}
