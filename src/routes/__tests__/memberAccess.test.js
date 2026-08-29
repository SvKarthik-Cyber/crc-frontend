import { describe, expect, it } from 'vitest'
import { STAFF_ROLES, USER_ROLES } from '@/constants/roles'
import { canAccessMemberPortal } from '../memberAccess.js'

// Matches the fields the backend login/register response actually sends
// (User.role + User.verificationStatus - see auth.controller.js).
const validMember = {
  role: USER_ROLES.INDIVIDUAL,
  verificationStatus: 'ACTIVE',
}

describe('canAccessMemberPortal', () => {
  it('allows only an active member account', () => {
    expect(canAccessMemberPortal(validMember)).toBe(true)
  })

  it.each([undefined, null, {}])('denies a missing or incomplete user: %s', (user) => {
    expect(canAccessMemberPortal(user)).toBe(false)
  })

  it.each([
    STAFF_ROLES.ADMIN,
    STAFF_ROLES.POLICE,
    STAFF_ROLES.ADVISORY,
    undefined,
    'UNSUPPORTED',
  ])('denies role %s', (role) => {
    expect(canAccessMemberPortal({ ...validMember, role })).toBe(false)
  })

  it.each([
    'PENDING_ADVISORY',
    'PENDING_POLICE_VERIFICATION',
    'APPROVED_TEMPORARY',
    undefined,
    'UNSUPPORTED',
  ])('denies verification status %s', (verificationStatus) => {
    expect(canAccessMemberPortal({ ...validMember, verificationStatus })).toBe(false)
  })
})
