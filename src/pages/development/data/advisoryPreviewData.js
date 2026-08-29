import { ACCOUNT_TYPES } from '@/constants/roles'
import { ADVISORY_AUDIENCES } from '@/constants/advisoryAudiences'
import { ADVISORY_STATUSES } from '@/constants/advisoryStatuses'

export const advisoryPreviewData = [
  {
    id: 'preview-phishing-advisory',
    reference: 'ADV-PREVIEW-001',
    title: 'CRC Preview Phishing Advisory',
    category: 'Phishing and online fraud',
    status: ADVISORY_STATUSES.DRAFT,
    audience: ADVISORY_AUDIENCES.ALL_APPROVED_MEMBERS,
    accountCategories: [],
    createdAt: '2026-08-22',
    publishedAt: '',
    archivedAt: '',
    summary: 'Fictional preview guidance for recognizing suspicious communications safely.',
    content:
      'This development-preview advisory contains generic awareness guidance only. Review unexpected communications carefully and avoid sharing sensitive information.',
  },
  {
    id: 'preview-account-security-advisory',
    reference: 'ADV-PREVIEW-002',
    title: 'CRC Preview Account Security Advisory',
    category: 'Account security',
    status: ADVISORY_STATUSES.PUBLISHED,
    audience: ADVISORY_AUDIENCES.ACCOUNT_CATEGORIES,
    accountCategories: [ACCOUNT_TYPES.ORGANIZATION, ACCOUNT_TYPES.VOLUNTEER],
    createdAt: '2026-08-18',
    publishedAt: '2026-08-19',
    archivedAt: '',
    summary: 'Fictional preview guidance about maintaining safer account-security practices.',
    content:
      'This fictional development-preview content encourages approved members to use careful account practices and to review unexpected access activity through appropriate channels.',
  },
  {
    id: 'preview-archived-awareness-advisory',
    reference: 'ADV-PREVIEW-003',
    title: 'CRC Preview Archived Awareness Advisory',
    category: 'Cyber awareness',
    status: ADVISORY_STATUSES.ARCHIVED,
    audience: ADVISORY_AUDIENCES.ACCOUNT_CATEGORIES,
    accountCategories: [ACCOUNT_TYPES.INDIVIDUAL],
    createdAt: '2026-08-10',
    publishedAt: '2026-08-11',
    archivedAt: '2026-08-17',
    summary: 'Fictional archived preview guidance for routine cyber-awareness practices.',
    content:
      'This archived development-preview advisory contains generic awareness content and does not describe an active event, attribution or operational situation.',
  },
]
