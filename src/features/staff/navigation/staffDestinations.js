import {
  Bell,
  BookOpenText,
  ClipboardCheck,
  FolderKanban,
  LayoutDashboard,
  UserCog,
  UsersRound,
} from 'lucide-react'
import {
  adminRoles,
  advisoryRoles,
  allStaffRoles,
  incidentRoles,
} from '@/routes/staffRoleGroups'

export const staffDestinations = Object.freeze([
  Object.freeze({ label: 'Dashboard', to: '.', end: true, icon: LayoutDashboard, allowedRoles: allStaffRoles }),
  Object.freeze({ label: 'Registration Requests', to: 'registrations', end: true, icon: ClipboardCheck, allowedRoles: adminRoles, description: 'Open the area intended for future review of member registration requests.' }),
  Object.freeze({ label: 'Registered Members', to: 'members', end: true, icon: UsersRound, allowedRoles: adminRoles, description: 'Open the area intended for future administration of approved member accounts.' }),
  Object.freeze({ label: 'Incidents', dashboardLabel: 'Incident Management', to: 'incidents', end: true, icon: FolderKanban, allowedRoles: incidentRoles, description: 'Open the area intended for future incident review and coordination.' }),
  Object.freeze({ label: 'Advisories', dashboardLabel: 'Advisory Management', to: 'advisories', end: true, icon: BookOpenText, allowedRoles: advisoryRoles, description: 'Open the area intended for future advisory preparation and publication.' }),
  Object.freeze({ label: 'Notifications', to: 'notifications', end: true, icon: Bell, allowedRoles: allStaffRoles, description: 'Review records intended for future automatic staff notification events.' }),
  Object.freeze({ label: 'Staff Management', to: 'staff-management', end: true, icon: UserCog, allowedRoles: adminRoles, description: 'Open the read-only directory of CRC staff accounts.' }),
])

export function getVisibleStaffDestinations(destinations, currentRole, developmentPreview = false) {
  if (developmentPreview) return destinations.filter(() => true)

  return destinations.filter(({ allowedRoles }) => allowedRoles.includes(currentRole))
}
