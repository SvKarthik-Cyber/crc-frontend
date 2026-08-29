import { USER_ROLES } from '@/constants/roles'

const staffRoleLabels = {
  [USER_ROLES.CRC_ADMIN]: 'CRC Administrator',
  [USER_ROLES.ANALYST]: 'Analyst',
  [USER_ROLES.ADVISORY_MANAGER]: 'Advisory Manager',
}

export function formatStaffRole(role) {
  return staffRoleLabels[role] ?? 'Staff'
}

export function formatStaffAccountDate(value) {
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}
