import { NOTIFICATION_TYPES } from '@/constants/notificationTypes'

const notificationTypeLabels = {
  [NOTIFICATION_TYPES.INCIDENT_UPDATE]: 'Incident update',
  [NOTIFICATION_TYPES.ADVISORY_PUBLISHED]: 'Advisory published',
  [NOTIFICATION_TYPES.CRC_MESSAGE]: 'CRC message',
  [NOTIFICATION_TYPES.ACCOUNT]: 'Account',
}

export function formatMemberNotificationType(type) {
  return notificationTypeLabels[type] ?? 'Notification'
}

export function formatMemberNotificationDate(value) {
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}
