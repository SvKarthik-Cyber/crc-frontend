import { ADVISORY_AUDIENCES } from '@/constants/advisoryAudiences'
import { ACCOUNT_TYPES } from '@/constants/roles'
import { STAFF_NOTIFICATION_EVENT_TYPES } from '@/constants/staffNotificationEventTypes'

export const staffNotificationPreviewData = [
  {
    id: 'staff-event-notification-preview-status',
    eventType: STAFF_NOTIFICATION_EVENT_TYPES.INCIDENT_STATUS_CHANGED,
    title: 'Fictional incident status event',
    message: 'A fictional notification record generated after a preview incident status changed.',
    recipientScope: ACCOUNT_TYPES.INDIVIDUAL,
    relatedReference: 'CRC-EVENT-INCIDENT-PREVIEW-001',
    createdAt: '2026-08-27T09:15:00+05:30',
  },
  {
    id: 'staff-event-notification-preview-response',
    eventType: STAFF_NOTIFICATION_EVENT_TYPES.INCIDENT_RESPONSE_CREATED,
    title: 'Fictional incident response event',
    message: 'A fictional notification record generated after a member-visible preview response was created.',
    recipientScope: ACCOUNT_TYPES.ORGANIZATION,
    relatedReference: 'CRC-EVENT-INCIDENT-PREVIEW-002',
    createdAt: '2026-08-26T14:40:00+05:30',
  },
  {
    id: 'staff-event-notification-preview-advisory',
    eventType: STAFF_NOTIFICATION_EVENT_TYPES.ADVISORY_PUBLISHED,
    title: 'Fictional advisory publication event',
    message: 'A fictional notification record generated after a preview advisory was published.',
    recipientScope: ADVISORY_AUDIENCES.ALL_APPROVED_MEMBERS,
    relatedReference: 'CRC-EVENT-ADVISORY-PREVIEW-001',
    createdAt: '2026-08-25T11:25:00+05:30',
  },
  {
    id: 'staff-event-notification-preview-message',
    eventType: STAFF_NOTIFICATION_EVENT_TYPES.CRC_MESSAGE_CREATED,
    title: 'Fictional direct message event',
    message: 'A fictional notification record generated after a preview direct CRC message was created.',
    recipientScope: ACCOUNT_TYPES.VOLUNTEER,
    relatedReference: 'CRC-EVENT-MESSAGE-PREVIEW-001',
    createdAt: '2026-08-24T16:05:00+05:30',
  },
]
