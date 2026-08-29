import { Navigate, Outlet } from 'react-router'
import { useAppSelector } from '@/app/hooks'
import { selectCurrentUser } from '@/features/auth/state/authSlice'
import { canAccessMemberPortal } from './memberAccess.js'

function MemberRoute() {
  const user = useAppSelector(selectCurrentUser)

  // The backend must independently enforce identity, member status, and resource ownership.
  if (!canAccessMemberPortal(user)) {
    return <Navigate replace to="/access-denied" />
  }

  return <Outlet />
}

export default MemberRoute
