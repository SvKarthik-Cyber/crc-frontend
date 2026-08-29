import { ADVISORY_AUDIENCES } from '@/constants/advisoryAudiences'
import { ADVISORY_STATUSES } from '@/constants/advisoryStatuses'
import { ACCOUNT_TYPES } from '@/constants/roles'

export const memberAdvisoryPreviewData = [
  {
    id: 'member-preview-safer-messages',
    reference: 'CRC-MEMBER-ADVISORY-PREVIEW-001',
    title: 'Fictional guide to recognizing unusual messages',
    category: 'Phishing and online fraud',
    status: ADVISORY_STATUSES.PUBLISHED,
    audienceMode: ADVISORY_AUDIENCES.ALL_APPROVED_MEMBERS,
    accountCategories: [],
    publishedAt: '2026-08-18',
    summary: 'A fictional preview advisory about pausing before acting on unexpected messages.',
    content: 'Treat unexpected requests with care. Verify the request through a familiar channel and avoid opening unfamiliar links. This text is fictional and is provided only to demonstrate the member advisory interface.',
  },
  {
    id: 'member-preview-device-care',
    reference: 'CRC-MEMBER-ADVISORY-PREVIEW-002',
    title: 'Fictional device care reminder for groups',
    category: 'Cyber awareness',
    status: ADVISORY_STATUSES.PUBLISHED,
    audienceMode: ADVISORY_AUDIENCES.ACCOUNT_CATEGORIES,
    accountCategories: [ACCOUNT_TYPES.ORGANIZATION, ACCOUNT_TYPES.VOLUNTEER],
    publishedAt: '2026-08-20',
    summary: 'A fictional preview reminder for organization and volunteer accounts.',
    content: 'Keep fictional preview devices updated, use approved software, and report unexpected behavior through the appropriate local process. This advisory makes no operational or official claim.',
  },
  {
    id: 'member-preview-individual-account',
    reference: 'CRC-MEMBER-ADVISORY-PREVIEW-003',
    title: 'Fictional personal account checklist',
    category: 'Account security',
    status: ADVISORY_STATUSES.PUBLISHED,
    audienceMode: ADVISORY_AUDIENCES.ACCOUNT_CATEGORIES,
    accountCategories: [ACCOUNT_TYPES.INDIVIDUAL],
    publishedAt: '2026-08-21',
    summary: 'A fictional preview checklist intended only for individual accounts.',
    content: 'Review fictional account settings and use distinct sign-in information. This text exists only as development fixture content.',
  },
  {
    id: 'member-preview-archived-basics',
    reference: 'CRC-MEMBER-ADVISORY-PREVIEW-004',
    title: 'Archived fictional cyber basics notice',
    category: 'General advisory',
    status: ADVISORY_STATUSES.ARCHIVED,
    audienceMode: ADVISORY_AUDIENCES.ALL_APPROVED_MEMBERS,
    accountCategories: [],
    publishedAt: '2026-08-10',
    summary: 'An archived fictional preview advisory.',
    content: 'This archived fictional content must not be available to a member.',
  },
]
