import { ACCOUNT_STATUSES, REGISTRATION_STATUSES } from '@/constants/registrationStatuses'
import { ACCOUNT_TYPES } from '@/constants/roles'

export const memberAdminPreviewData = [
  {
    id: 'registered-member-preview-organization',
    accountCategory: ACCOUNT_TYPES.ORGANIZATION,
    registrationStatus: REGISTRATION_STATUSES.APPROVED,
    accountStatus: ACCOUNT_STATUSES.ACTIVE,
    registeredEmail: 'approved-organization@example.invalid',
    registeredMobile: '0000000000 (preview only)',
    district: 'Ernakulam',
    registrationDate: '2026-08-12',
    profile: {
      organizationName: 'Example Approved Organization',
      organizationType: 'Fictional community group',
      sector: 'Preview education sector',
      contactPerson: 'Example Organization Contact',
      designation: 'Preview Coordinator',
      address: 'Example House, Fictional Member Road, Preview Locality',
    },
  },
  {
    id: 'registered-member-preview-volunteer',
    accountCategory: ACCOUNT_TYPES.VOLUNTEER,
    registrationStatus: REGISTRATION_STATUSES.APPROVED,
    accountStatus: ACCOUNT_STATUSES.INACTIVE,
    registeredEmail: 'approved-volunteer@example.invalid',
    registeredMobile: '0000000000 (preview only)',
    district: 'Kozhikode',
    registrationDate: '2026-08-10',
    profile: {
      fullName: 'Example Volunteer Member',
      occupation: 'Fictional learning facilitator',
      cybersecuritySkills: 'Fictional awareness and safe-device practice skills',
      certifications: 'Example Preview Certificate',
      availability: 'Fictional weekend availability',
    },
  },
  {
    id: 'registered-member-preview-individual',
    accountCategory: ACCOUNT_TYPES.INDIVIDUAL,
    registrationStatus: REGISTRATION_STATUSES.APPROVED,
    accountStatus: ACCOUNT_STATUSES.SUSPENDED,
    registeredEmail: 'approved-individual@example.invalid',
    registeredMobile: '0000000000 (preview only)',
    district: 'Kannur',
    registrationDate: '2026-08-08',
    profile: {
      fullName: 'Example Individual Member',
      occupation: 'Fictional independent learner',
    },
  },
]
