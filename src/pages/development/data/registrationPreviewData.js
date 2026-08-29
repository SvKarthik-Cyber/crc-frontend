import { ACCOUNT_TYPES } from '@/constants/roles'
import { ACCOUNT_STATUSES, REGISTRATION_STATUSES } from '@/constants/registrationStatuses'

export const registrationPreviewData = [
  {
    id: 'preview-organization',
    category: ACCOUNT_TYPES.ORGANIZATION,
    name: 'CRC Preview Organization',
    submittedAt: '2026-08-20',
    registrationStatus: REGISTRATION_STATUSES.PENDING,
    accountStatus: ACCOUNT_STATUSES.INACTIVE,
    details: {
      organizationName: 'CRC Preview Organization',
      organizationType: 'Development preview organization',
      sector: 'Development preview sector',
      contactPerson: 'Preview Contact',
      designation: 'Preview Designation',
      email: 'organization@example.invalid',
      mobile: '0000000000 (preview only)',
      address: 'Development preview address only',
      district: 'Thiruvananthapuram',
    },
  },
  {
    id: 'preview-volunteer',
    category: ACCOUNT_TYPES.VOLUNTEER,
    name: 'Preview Volunteer',
    submittedAt: '2026-08-19',
    registrationStatus: REGISTRATION_STATUSES.APPROVED,
    accountStatus: ACCOUNT_STATUSES.INACTIVE,
    details: {
      fullName: 'Preview Volunteer',
      email: 'volunteer@example.invalid',
      mobile: '0000000000 (preview only)',
      occupation: 'Development preview occupation',
      cybersecuritySkills: 'Fictional development-preview skills only',
      certifications: 'Development preview certification',
      district: 'Ernakulam',
      availability: 'Development preview availability',
    },
  },
  {
    id: 'preview-individual',
    category: ACCOUNT_TYPES.INDIVIDUAL,
    name: 'Preview Individual',
    submittedAt: '2026-08-18',
    registrationStatus: REGISTRATION_STATUSES.REJECTED,
    accountStatus: ACCOUNT_STATUSES.INACTIVE,
    rejectionReason: 'Development preview example only.',
    details: {
      fullName: 'Preview Individual',
      email: 'individual@example.invalid',
      mobile: '0000000000 (preview only)',
      district: 'Kozhikode',
      occupation: 'Development preview occupation',
    },
  },
]
