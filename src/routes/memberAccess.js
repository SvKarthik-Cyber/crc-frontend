import { ACCOUNT_TYPES } from '../constants/roles.js'

// The login/register API response only ever sends `role` and
// `verificationStatus` (see backend src/controllers/auth.controller.js) -
// there is no separate registrationStatus/accountStatus pair. A member can
// use the portal once their role is a member account type (not staff) and
// the backend has marked them ACTIVE (i.e. past advisory + police review).
export function canAccessMemberPortal(user) {
  return Boolean(
    user?.role &&
      Object.values(ACCOUNT_TYPES).includes(user.role) &&
      user.verificationStatus === 'ACTIVE',
  )
}
