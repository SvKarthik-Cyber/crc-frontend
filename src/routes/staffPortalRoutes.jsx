import RoleRoute from './RoleRoute.jsx'
import createLazyRouteElement from './lazyRouteElement.js'
import {
  adminRoles,
  advisoryRoles,
  allStaffRoles,
  incidentRoles,
} from './staffRoleGroups.js'

const staffRouteDefinitions = [
  { path: 'messages', element: createLazyRouteElement(() => import('@/pages/staff/StaffMessagesPage.jsx')), allowedRoles: incidentRoles },
]

function applyAuthorization(route, allowedRoles, authorize) {
    if (!authorize) return { ...route }

    return {
      element: <RoleRoute allowedRoles={[...allowedRoles]} />,
      children: [{ ...route }],
    }
}

export function createStaffPortalRoutes({
  authorize = true,
  developmentPreview = false,
  registrationRecords = null,
  incidentRecords = null,
  advisoryRecords = null,
  memberRecords = null,
  previewMemberStatusNotice = null,
  staffAccountRecords = null,
  staffNotificationRecords = null,
} = {}) {
  const routes = [
    {
      index: true,
      element: createLazyRouteElement(() => import('@/pages/staff/StaffDashboardPage.jsx'), { developmentPreview }),
      allowedRoles: allStaffRoles,
    },
    ...staffRouteDefinitions,
    {
      path: 'notifications',
      element: createLazyRouteElement(() => import('@/pages/staff/StaffNotificationsPage.jsx'), { notificationRecords: staffNotificationRecords }),
      allowedRoles: allStaffRoles,
    },
    {
      path: 'staff-management',
      element: createLazyRouteElement(() => import('@/pages/staff/StaffManagementPage.jsx'), { staffAccountRecords }),
      allowedRoles: adminRoles,
    },
    {
      path: 'staff-management/:staffId',
      element: createLazyRouteElement(() => import('@/pages/staff/StaffAccountDetailsPage.jsx'), { staffAccountRecords }),
      allowedRoles: adminRoles,
    },
    {
      path: 'members',
      element: createLazyRouteElement(() => import('@/pages/staff/RegisteredMembersPage.jsx'), { memberRecords }),
      allowedRoles: adminRoles,
    },
    {
      path: 'members/:memberId',
      element: createLazyRouteElement(() => import('@/pages/staff/RegisteredMemberDetailsPage.jsx'), { memberRecords, previewUpdateNotice: previewMemberStatusNotice }),
      allowedRoles: adminRoles,
    },
    {
      path: 'registrations',
      element: createLazyRouteElement(() => import('@/pages/staff/RegistrationRequestsPage.jsx'), { registrationRecords }),
      allowedRoles: adminRoles,
    },
    {
      path: 'registrations/:registrationId',
      element: createLazyRouteElement(() => import('@/pages/staff/RegistrationRequestDetailsPage.jsx'), { registrationRecords }),
      allowedRoles: adminRoles,
    },
    {
      path: 'incidents',
      element: createLazyRouteElement(() => import('@/pages/staff/StaffIncidentsPage.jsx'), { incidentRecords }),
      allowedRoles: incidentRoles,
    },
    {
      path: 'incidents/:incidentId',
      element: createLazyRouteElement(() => import('@/pages/staff/StaffIncidentDetailsPage.jsx'), { incidentRecords }),
      allowedRoles: incidentRoles,
    },
    {
      path: 'advisories',
      element: createLazyRouteElement(() => import('@/pages/staff/StaffAdvisoriesPage.jsx'), { advisoryRecords }),
      allowedRoles: advisoryRoles,
    },
    {
      path: 'advisories/new',
      element: createLazyRouteElement(() => import('@/pages/staff/CreateAdvisoryPage.jsx')),
      allowedRoles: advisoryRoles,
    },
    {
      path: 'advisories/:advisoryId',
      element: createLazyRouteElement(() => import('@/pages/staff/StaffAdvisoryDetailsPage.jsx'), { advisoryRecords }),
      allowedRoles: advisoryRoles,
    },
    {
      path: 'advisories/:advisoryId/edit',
      element: createLazyRouteElement(() => import('@/pages/staff/EditAdvisoryPage.jsx'), { advisoryRecords }),
      allowedRoles: advisoryRoles,
    },
  ]

  return routes.map(({ allowedRoles, ...route }) =>
    applyAuthorization(route, allowedRoles, authorize),
  )
}

export { allStaffRoles }
