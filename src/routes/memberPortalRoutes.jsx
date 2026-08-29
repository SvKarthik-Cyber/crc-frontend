import createLazyRouteElement from './lazyRouteElement.js'

const lazyPage = (loader, componentProps) =>
  createLazyRouteElement(loader, componentProps)

export function createMemberPortalRoutes({
  advisoryRecords = null,
  incidentRecords = null,
  memberAccountCategory = null,
  messageRecords = null,
  notificationRecords = null,
  previewCategoryNotice = null,
  previewNotificationUpdateNotice = null,
  previewMessageUpdateNotice = null,
  profile = null,
} = {}) {
  return [
    { index: true, element: lazyPage(() => import('@/pages/portal/MemberDashboardPage.jsx')) },
    { path: 'profile', element: lazyPage(() => import('@/pages/portal/MemberProfilePage.jsx'), { profile }) },
    { path: 'incidents', element: lazyPage(() => import('@/pages/portal/MemberIncidentsPage.jsx'), { incidentRecords }) },
    { path: 'incidents/new', element: lazyPage(() => import('@/pages/portal/ReportIncidentPage.jsx')) },
    { path: 'incidents/:incidentId', element: lazyPage(() => import('@/pages/portal/MemberIncidentDetailsPage.jsx'), { incidentRecords }) },
    { path: 'advisories', element: lazyPage(() => import('@/pages/portal/MemberAdvisoriesPage.jsx'), { advisoryRecords, memberAccountCategory, previewCategoryNotice }) },
    { path: 'advisories/:advisoryId', element: lazyPage(() => import('@/pages/portal/MemberAdvisoryDetailsPage.jsx'), { advisoryRecords, memberAccountCategory }) },
    { path: 'notifications', element: lazyPage(() => import('@/pages/portal/MemberNotificationsPage.jsx'), { notificationRecords, previewUpdateNotice: previewNotificationUpdateNotice }) },
    { path: 'messages', element: lazyPage(() => import('@/pages/portal/MemberMessagesPage.jsx'), { messageRecords }) },
    { path: 'messages/:messageId', element: lazyPage(() => import('@/pages/portal/MemberMessageDetailsPage.jsx'), { messageRecords, previewUpdateNotice: previewMessageUpdateNotice }) },
  ]
}
