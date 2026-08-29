import { describe, expect, it } from 'vitest'
import { USER_ROLES } from '@/constants/roles'
import {
  getVisibleStaffDestinations,
  staffDestinations,
} from '../staffDestinations.js'

const labelsFor = (role, developmentPreview = false) =>
  getVisibleStaffDestinations(staffDestinations, role, developmentPreview).map(
    ({ label }) => label,
  )

describe('staff destination visibility', () => {
  it('returns the seven administrator destinations', () => {
    expect(labelsFor(USER_ROLES.ADMIN)).toEqual([
      'Dashboard',
      'Registration Requests',
      'Registered Members',
      'Incidents',
      'Advisories',
      'Notifications',
      'Staff Management',
    ])
  })

  it('returns only incident-reviewer destinations', () => {
    expect(labelsFor(USER_ROLES.POLICE)).toEqual([
      'Dashboard',
      'Incidents',
      'Notifications',
    ])
  })

  it('returns only advisory-manager destinations', () => {
    expect(labelsFor(USER_ROLES.ADVISORY)).toEqual([
      'Dashboard',
      'Advisories',
      'Notifications',
    ])
  })

  it.each([USER_ROLES.INDIVIDUAL, undefined, 'UNSUPPORTED'])(
    'returns no real destinations for role %s',
    (role) => {
      expect(labelsFor(role)).toEqual([])
    },
  )

  it('returns every implemented destination in development preview', () => {
    expect(labelsFor(undefined, true)).toEqual([
      'Dashboard',
      'Registration Requests',
      'Registered Members',
      'Incidents',
      'Advisories',
      'Notifications',
      'Staff Management',
    ])
  })

  it('never returns the deferred Messages destination', () => {
    for (const role of [...Object.values(USER_ROLES), undefined]) {
      expect(labelsFor(role)).not.toContain('Messages')
    }
    expect(labelsFor(undefined, true)).not.toContain('Messages')
  })

  it('does not mutate the source configuration', () => {
    const snapshot = [...staffDestinations]
    getVisibleStaffDestinations(staffDestinations, USER_ROLES.POLICE)
    getVisibleStaffDestinations(staffDestinations, undefined, true)
    expect(staffDestinations).toEqual(snapshot)
    expect(Object.isFrozen(staffDestinations)).toBe(true)
  })
})
