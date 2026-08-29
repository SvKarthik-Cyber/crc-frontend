import { ACCOUNT_STATUSES, REGISTRATION_STATUSES } from '@/constants/registrationStatuses'
import { ACCOUNT_TYPES } from '@/constants/roles'

export const memberProfilePreviewData = {
  organizationName: 'Example Resilience Collective',
  organizationType: 'Fictional member organization',
  sector: 'Community learning preview',
  contactPerson: 'Example Profile Contact',
  designation: 'Preview Coordinator',
  email: 'organization-profile@example.invalid',
  mobile: '00000 00000 (fictional)',
  address: 'Example Building, Fictional Preview Lane, Demonstration Locality',
  district: 'Ernakulam',
  registrationDate: '2026-08-12',
  registrationStatus: REGISTRATION_STATUSES.APPROVED,
  accountStatus: ACCOUNT_STATUSES.ACTIVE,
  accountCategory: ACCOUNT_TYPES.ORGANIZATION,
}
