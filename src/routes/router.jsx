import { createBrowserRouter } from 'react-router'
import { advisoryPreviewData } from '../pages/development/data/advisoryPreviewData.js'
import { memberAdvisoryPreviewData } from '../pages/development/data/memberAdvisoryPreviewData.js'
import { memberAdminPreviewData } from '../pages/development/data/memberAdminPreviewData.js'
import { incidentPreviewData } from '../pages/development/data/incidentPreviewData.js'
import { memberIncidentPreviewData } from '../pages/development/data/memberIncidentPreviewData.js'
import { memberMessagePreviewData } from '../pages/development/data/memberMessagePreviewData.js'
import { memberNotificationPreviewData } from '../pages/development/data/memberNotificationPreviewData.js'
import { memberProfilePreviewData } from '../pages/development/data/memberProfilePreviewData.js'
import { registrationPreviewData } from '../pages/development/data/registrationPreviewData.js'
import { staffAccountPreviewData } from '../pages/development/data/staffAccountPreviewData.js'
import { staffNotificationPreviewData } from '../pages/development/data/staffNotificationPreviewData.js'
import { ACCOUNT_TYPES } from '../constants/roles.js'
import PublicLayout from '../layouts/PublicLayout.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import MemberRoute from './MemberRoute.jsx'
import RoleRoute from './RoleRoute.jsx'
import createLazyRouteElement from './lazyRouteElement.js'
import { createMemberPortalRoutes } from './memberPortalRoutes.jsx'
import { allStaffRoles, createStaffPortalRoutes } from './staffPortalRoutes.jsx'

const developmentPreviewRoutes = import.meta.env.DEV
  ? [
      { path: '/dev/previews', element: createLazyRouteElement(() => import('../pages/development/DevelopmentPreviewIndexPage.jsx')) },
      {
        path: '/dev/previews/member',
        element: createLazyRouteElement(() => import('../pages/development/MemberPortalPreviewPage.jsx')),
        children: [
          {
            element: createLazyRouteElement(() => import('@/layouts/PortalLayout')),
            children: createMemberPortalRoutes({
              advisoryRecords: memberAdvisoryPreviewData,
              incidentRecords: memberIncidentPreviewData,
              memberAccountCategory: ACCOUNT_TYPES.ORGANIZATION,
              messageRecords: memberMessagePreviewData,
              notificationRecords: memberNotificationPreviewData,
              previewCategoryNotice: 'Development preview account category: Organization',
              previewNotificationUpdateNotice: 'Preview only. The notification was not updated because the backend is not connected.',
              previewMessageUpdateNotice: 'Preview only. The message was not updated because the backend is not connected.',
              profile: memberProfilePreviewData,
            }),
          },
        ],
      },
      {
        path: '/dev/previews/staff',
        element: createLazyRouteElement(() => import('../pages/development/StaffPortalPreviewPage.jsx')),
        children: [
          {
            element: createLazyRouteElement(() => import('@/layouts/StaffLayout'), { developmentPreview: true }),
            children: createStaffPortalRoutes({
              authorize: false,
              developmentPreview: true,
              advisoryRecords: advisoryPreviewData,
              incidentRecords: incidentPreviewData,
              memberRecords: memberAdminPreviewData,
              previewMemberStatusNotice: 'Preview only. The account status was not changed because the backend is not connected.',
              registrationRecords: registrationPreviewData,
              staffAccountRecords: staffAccountPreviewData,
              staffNotificationRecords: staffNotificationPreviewData,
            }),
          },
        ],
      },
    ]
  : []

export const router = createBrowserRouter([
  ...developmentPreviewRoutes,
  {
    path: '/',
    Component: PublicLayout,
    children: [
      { index: true, element: createLazyRouteElement(() => import('../pages/HomePage.jsx')) },
      { path: 'about', element: createLazyRouteElement(() => import('../pages/AboutPage.jsx')) },
      { path: 'register', element: createLazyRouteElement(() => import('../pages/RegistrationSelectionPage.jsx')) },
      { path: 'register/individual', element: createLazyRouteElement(() => import('../pages/IndividualRegistrationPage.jsx')) },
      { path: 'register/organization', element: createLazyRouteElement(() => import('../pages/OrganizationRegistrationPage.jsx')) },
      { path: 'register/volunteer', element: createLazyRouteElement(() => import('../pages/VolunteerRegistrationPage.jsx')) },
      { path: 'login', element: createLazyRouteElement(() => import('../pages/LoginPage.jsx')) },
      { path: 'activate-account', element: createLazyRouteElement(() => import('../pages/AccountActivationPage.jsx')) },
      { path: 'access-denied', element: createLazyRouteElement(() => import('../pages/AccessDeniedPage.jsx')) },
      { path: '*', element: createLazyRouteElement(() => import('../pages/NotFoundPage.jsx')) },
    ],
  },
  {
    Component: ProtectedRoute,
    children: [
      { path: '/change-password', element: createLazyRouteElement(() => import('../pages/ChangePasswordPage.jsx')) },
      {
        Component: MemberRoute,
        children: [
          {
            path: '/portal',
            element: createLazyRouteElement(() => import('@/layouts/PortalLayout')),
            children: createMemberPortalRoutes(),
          },
        ],
      },
      {
        element: <RoleRoute allowedRoles={allStaffRoles} />,
        children: [
          {
            path: '/staff',
            element: createLazyRouteElement(() => import('@/layouts/StaffLayout')),
            children: createStaffPortalRoutes(),
          },
        ],
      },
    ],
  },
])