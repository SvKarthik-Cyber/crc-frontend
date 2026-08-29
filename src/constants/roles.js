// Backend User.role / Admin.role values (see backend src/models/User.js,
// src/models/Admin.js, and every authorizeRoles(...) call in src/routes/).
// These strings must match the backend exactly - they travel inside the JWT
// payload and are compared verbatim by authorizeRoles on every request.
export const USER_ROLES = Object.freeze({
  ORGANIZATION: 'organization',
  VOLUNTEER: 'volunteer',
  INDIVIDUAL: 'individual',
  ADMIN: 'admin',
  ADVISORY: 'advisory',
  POLICE: 'police',
})

// Member-portal account categories (User.role values that are NOT staff).
export const ACCOUNT_TYPES = Object.freeze({
  ORGANIZATION: 'organization',
  VOLUNTEER: 'volunteer',
  INDIVIDUAL: 'individual',
})

// User.role values that belong to CRC staff, not members.
export const STAFF_ROLES = Object.freeze({
  ADMIN: 'admin',
  ADVISORY: 'advisory',
  POLICE: 'police',
  VOLUNTEER: 'volunteer',
})
