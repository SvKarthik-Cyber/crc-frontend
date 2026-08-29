import { ACCOUNT_STATUSES, REGISTRATION_STATUSES } from '@/constants/registrationStatuses'

const statusStyles = {
  [REGISTRATION_STATUSES.PENDING]: 'border-amber-300 bg-amber-50 text-amber-900',
  [REGISTRATION_STATUSES.APPROVED]: 'border-green-300 bg-green-50 text-green-900',
  [REGISTRATION_STATUSES.REJECTED]: 'border-red-300 bg-red-50 text-red-900',
  [ACCOUNT_STATUSES.INACTIVE]: 'border-slate-300 bg-slate-100 text-slate-800',
  [ACCOUNT_STATUSES.ACTIVE]: 'border-blue-300 bg-blue-50 text-blue-900',
  [ACCOUNT_STATUSES.SUSPENDED]: 'border-orange-300 bg-orange-50 text-orange-900',
}

function formatStatus(status) {
  return status.charAt(0) + status.slice(1).toLowerCase()
}

function RegistrationStatusLabel({ label, status }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[status] ?? statusStyles.INACTIVE}`}
    >
      {label}: {formatStatus(status)}
    </span>
  )
}

export default RegistrationStatusLabel
