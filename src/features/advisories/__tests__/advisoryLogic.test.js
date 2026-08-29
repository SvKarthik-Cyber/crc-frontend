import { describe, expect, it } from 'vitest'
import { ADVISORY_AUDIENCES } from '@/constants/advisoryAudiences'
import { ADVISORY_STATUSES } from '@/constants/advisoryStatuses'
import { ACCOUNT_TYPES } from '@/constants/roles'
import { filterAdvisoryRecords } from '../admin/advisoryFilters.js'
import { filterMemberAdvisories } from '../member/memberAdvisoryFilters.js'
import { isAdvisoryVisibleToMember } from '../member/memberAdvisoryVisibility.js'

const allMembers = { reference: 'ADV-001', title: 'General guidance', category: 'General', status: ADVISORY_STATUSES.PUBLISHED, audience: ADVISORY_AUDIENCES.ALL_APPROVED_MEMBERS, audienceMode: ADVISORY_AUDIENCES.ALL_APPROVED_MEMBERS, accountCategories: [] }
const organization = { reference: 'ADV-002', title: 'Organization alert', category: 'Phishing', status: ADVISORY_STATUSES.PUBLISHED, audience: ADVISORY_AUDIENCES.ACCOUNT_CATEGORIES, audienceMode: ADVISORY_AUDIENCES.ACCOUNT_CATEGORIES, accountCategories: [ACCOUNT_TYPES.ORGANIZATION] }
const draft = { ...organization, reference: 'ADV-003', title: 'Draft notice', status: ADVISORY_STATUSES.DRAFT }
const archived = { ...organization, reference: 'ADV-004', title: 'Archived notice', status: ADVISORY_STATUSES.ARCHIVED }
const records = [allMembers, organization, draft, archived]

describe('advisory visibility and filters', () => {
  it('allows published all-member and matching-category advisories', () => {
    expect(isAdvisoryVisibleToMember(allMembers, ACCOUNT_TYPES.INDIVIDUAL)).toBe(true)
    expect(isAdvisoryVisibleToMember(organization, ACCOUNT_TYPES.ORGANIZATION)).toBe(true)
  })

  it('denies mismatch, non-published, missing, and unsupported categories', () => {
    expect(isAdvisoryVisibleToMember(organization, ACCOUNT_TYPES.VOLUNTEER)).toBe(false)
    expect(isAdvisoryVisibleToMember(draft, ACCOUNT_TYPES.ORGANIZATION)).toBe(false)
    expect(isAdvisoryVisibleToMember(archived, ACCOUNT_TYPES.ORGANIZATION)).toBe(false)
    expect(isAdvisoryVisibleToMember(organization)).toBe(false)
    expect(isAdvisoryVisibleToMember(organization, 'UNSUPPORTED')).toBe(false)
  })

  it('filters member records by reference/title and category', () => {
    const defaults = { search: '', category: 'ALL' }
    expect(filterMemberAdvisories(records, defaults)).toEqual(records)
    expect(filterMemberAdvisories(records, { ...defaults, search: 'adv-002' })).toEqual([organization])
    expect(filterMemberAdvisories(records, { ...defaults, search: 'draft notice' })).toEqual([draft])
    expect(filterMemberAdvisories(records, { ...defaults, category: 'General' })).toEqual([allMembers])
  })

  it('filters staff records by search, category, status, and audience', () => {
    const defaults = { search: '', category: 'ALL', status: 'ALL', audience: 'ALL' }
    expect(filterAdvisoryRecords(records, defaults)).toEqual(records)
    expect(filterAdvisoryRecords(records, { ...defaults, search: 'organization' })).toEqual([organization])
    expect(filterAdvisoryRecords(records, { ...defaults, status: ADVISORY_STATUSES.DRAFT })).toEqual([draft])
    expect(filterAdvisoryRecords(records, { ...defaults, audience: ADVISORY_AUDIENCES.ALL_APPROVED_MEMBERS })).toEqual([allMembers])
  })
})
