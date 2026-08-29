import { describe, expect, it } from 'vitest'
import { ACCOUNT_STATUSES } from '@/constants/registrationStatuses'
import { ACCOUNT_TYPES, USER_ROLES } from '@/constants/roles'
import { filterRegisteredMembers } from '@/features/members/admin/memberAdminFilters'
import { MEMBER_MESSAGE_FILTERS, filterMemberMessages } from '@/features/messages/member/memberMessageFilters'
import { MEMBER_NOTIFICATION_FILTERS, filterMemberNotifications } from '@/features/notifications/member/memberNotificationFilters'
import { filterStaffAccounts } from '@/features/staff/admin/staffAccountFilters'

const communications = [{ id: 'unread', readAt: null }, { id: 'read', readAt: '2026-01-01T00:00:00Z' }]
const members = [
  { profile: { fullName: 'Anu Mathew' }, accountCategory: ACCOUNT_TYPES.INDIVIDUAL, accountStatus: ACCOUNT_STATUSES.ACTIVE },
  { profile: { organizationName: 'Sample Cooperative' }, accountCategory: ACCOUNT_TYPES.ORGANIZATION, accountStatus: ACCOUNT_STATUSES.SUSPENDED },
]
const staff = [
  { name: 'Admin One', officialEmail: 'admin@example.invalid', role: USER_ROLES.ADMIN, accountStatus: ACCOUNT_STATUSES.ACTIVE },
  { name: 'Analyst Two', officialEmail: 'analyst@example.invalid', role: USER_ROLES.POLICE, accountStatus: ACCOUNT_STATUSES.INACTIVE },
]

describe('member communication filters', () => {
  it.each([
    [filterMemberNotifications, MEMBER_NOTIFICATION_FILTERS],
    [filterMemberMessages, MEMBER_MESSAGE_FILTERS],
  ])('supports all, unread, read, and reset behavior', (filter, options) => {
    expect(filter(communications, options.ALL)).toBe(communications)
    expect(filter(communications, options.UNREAD)).toEqual([communications[0]])
    expect(filter(communications, options.READ)).toEqual([communications[1]])
    expect(filter(communications, 'UNSUPPORTED')).toBe(communications)
  })
})

describe('directory filters', () => {
  it('filters members by person/organization name, category, and status', () => {
    const defaults = { search: '', category: 'ALL', accountStatus: 'ALL' }
    expect(filterRegisteredMembers(members, defaults)).toEqual(members)
    expect(filterRegisteredMembers(members, { ...defaults, search: 'anu' })).toEqual([members[0]])
    expect(filterRegisteredMembers(members, { ...defaults, search: 'cooperative' })).toEqual([members[1]])
    expect(filterRegisteredMembers(members, { ...defaults, category: ACCOUNT_TYPES.ORGANIZATION })).toEqual([members[1]])
    expect(filterRegisteredMembers(members, { ...defaults, accountStatus: ACCOUNT_STATUSES.ACTIVE })).toEqual([members[0]])
  })

  it('filters staff by name/email, role, and status', () => {
    const defaults = { search: '', role: 'ALL', accountStatus: 'ALL' }
    expect(filterStaffAccounts(staff, defaults)).toEqual(staff)
    expect(filterStaffAccounts(staff, { ...defaults, search: 'admin one' })).toEqual([staff[0]])
    expect(filterStaffAccounts(staff, { ...defaults, search: 'analyst@example' })).toEqual([staff[1]])
    expect(filterStaffAccounts(staff, { ...defaults, role: USER_ROLES.POLICE })).toEqual([staff[1]])
    expect(filterStaffAccounts(staff, { ...defaults, accountStatus: ACCOUNT_STATUSES.ACTIVE })).toEqual([staff[0]])
  })
})
