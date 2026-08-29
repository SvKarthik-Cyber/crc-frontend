import { STAFF_ROLES } from '@/constants/roles'

// Mirrors the authorizeRoles(...) calls on the backend routes exactly:
// - dashboard/notifications: src/routes/notifications.routes.js '/staff'
// - staff-management/members/registrations: src/routes/admin.routes.js (admin only)
// - incidents: src/routes/incidents.routes.js
// - advisories: src/routes/advisories.routes.js canManageAdvisories
export const allStaffRoles = Object.freeze([
  STAFF_ROLES.ADMIN,
  STAFF_ROLES.ADVISORY,
  STAFF_ROLES.POLICE,
  STAFF_ROLES.VOLUNTEER,
])

export const adminRoles = Object.freeze([STAFF_ROLES.ADMIN])
export const incidentRoles = Object.freeze([
  STAFF_ROLES.ADMIN,
  STAFF_ROLES.VOLUNTEER,
  STAFF_ROLES.POLICE,
])
export const advisoryRoles = Object.freeze([
  STAFF_ROLES.ADMIN,
  STAFF_ROLES.ADVISORY,
])
