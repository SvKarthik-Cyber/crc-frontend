import { ADVISORY_STATUSES } from '@/constants/advisoryStatuses'
import { formatAdvisoryStatus } from '../advisoryFormatters.js'

const statusStyles = {
  [ADVISORY_STATUSES.DRAFT]: 'border-slate-300 bg-slate-100 text-slate-800',
  [ADVISORY_STATUSES.PUBLISHED]: 'border-green-300 bg-green-50 text-green-900',
  [ADVISORY_STATUSES.ARCHIVED]: 'border-amber-300 bg-amber-50 text-amber-900',
}

function AdvisoryStatusLabel({ status }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      Status: {formatAdvisoryStatus(status)}
    </span>
  )
}

export default AdvisoryStatusLabel
