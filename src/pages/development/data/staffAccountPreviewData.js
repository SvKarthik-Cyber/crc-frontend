import { ACCOUNT_STATUSES } from '@/constants/registrationStatuses'
import { USER_ROLES } from '@/constants/roles'

export const staffAccountPreviewData = [
  {
    id: 'staff-account-preview-administrator',
    name: 'Example CRC Administrator',
    role: USER_ROLES.CRC_ADMIN,
    officialEmail: 'administrator@example.invalid',
    accountStatus: ACCOUNT_STATUSES.ACTIVE,
    createdAt: '2026-08-05T09:15:00+05:30',
  },
  {
    id: 'staff-account-preview-analyst',
    name: 'Example CRC Analyst',
    role: USER_ROLES.ANALYST,
    officialEmail: 'analyst@example.invalid',
    accountStatus: ACCOUNT_STATUSES.ACTIVE,
    createdAt: '2026-08-07T11:30:00+05:30',
  },
  {
    id: 'staff-account-preview-advisory-manager',
    name: 'Example Advisory Manager',
    role: USER_ROLES.ADVISORY_MANAGER,
    officialEmail: 'advisory-manager@example.invalid',
    accountStatus: ACCOUNT_STATUSES.INACTIVE,
    createdAt: '2026-08-09T14:45:00+05:30',
  },
]
