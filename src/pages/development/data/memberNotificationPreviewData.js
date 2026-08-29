import { NOTIFICATION_TYPES } from '@/constants/notificationTypes'

export const memberNotificationPreviewData = [
  {
    id: 'member-notification-preview-incident-update',
    type: NOTIFICATION_TYPES.INCIDENT_UPDATE,
    title: 'Fictional incident status updated',
    message: 'A fictional member incident has a new status available in the development preview.',
    createdAt: '2026-08-24T09:30:00+05:30',
    readAt: null,
    relatedResource: {
      type: 'INCIDENT',
      id: 'preview-malware-report',
      label: 'View fictional incident',
    },
  },
  {
    id: 'member-notification-preview-advisory',
    type: NOTIFICATION_TYPES.ADVISORY_PUBLISHED,
    title: 'Fictional advisory published',
    message: 'A fictional advisory is available to this development preview account category.',
    createdAt: '2026-08-23T14:15:00+05:30',
    readAt: null,
    relatedResource: {
      type: 'ADVISORY',
      id: 'member-preview-safer-messages',
      label: 'View fictional advisory',
    },
  },
  {
    id: 'member-notification-preview-crc-message',
    type: NOTIFICATION_TYPES.CRC_MESSAGE,
    title: 'Fictional CRC message notice',
    message: 'A fictional member-visible message notice is shown without linking to the placeholder Messages page.',
    createdAt: '2026-08-22T11:00:00+05:30',
    readAt: '2026-08-22T12:05:00+05:30',
    relatedResource: null,
  },
  {
    id: 'member-notification-preview-account',
    type: NOTIFICATION_TYPES.ACCOUNT,
    title: 'Fictional account notice',
    message: 'This fictional development notice demonstrates a previously read account notification.',
    createdAt: '2026-08-21T16:45:00+05:30',
    readAt: '2026-08-21T17:10:00+05:30',
    relatedResource: null,
  },
]
