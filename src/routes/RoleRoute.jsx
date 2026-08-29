import { Navigate, Outlet } from 'react-router'
import { useAppSelector } from '@/app/hooks'
import { selectCurrentUser } from '@/features/auth/state/authSlice'

function RoleRoute({ allowedRoles }) {
  const user = useAppSelector(selectCurrentUser)
  const isAllowed = Boolean(user?.role && allowedRoles.includes(user.role))

  if (!isAllowed) {
    return <Navigate replace to="/access-denied" />
  }

  return <Outlet />
}

export default RoleRoute
