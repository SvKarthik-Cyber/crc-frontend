import { STAFF_NOTIFICATION_EVENT_TYPES } from '@/constants/staffNotificationEventTypes'
import { ADVISORY_AUDIENCES } from '@/constants/advisoryAudiences'
import { ACCOUNT_TYPES } from '@/constants/roles'

const eventTypeLabels = {
  [STAFF_NOTIFICATION_EVENT_TYPES.INCIDENT_STATUS_CHANGED]: 'Incident status changed',
  [STAFF_NOTIFICATION_EVENT_TYPES.INCIDENT_RESPONSE_CREATED]: 'Incident response created',
  [STAFF_NOTIFICATION_EVENT_TYPES.ADVISORY_PUBLISHED]: 'Advisory published',
  [STAFF_NOTIFICATION_EVENT_TYPES.CRC_MESSAGE_CREATED]: 'CRC message created',
}

const recipientScopeLabels = {
  [ADVISORY_AUDIENCES.ALL_APPROVED_MEMBERS]: 'All approved members',
  [ACCOUNT_TYPES.ORGANIZATION]: 'Organization',
  [ACCOUNT_TYPES.VOLUNTEER]: 'Volunteer',
  [ACCOUNT_TYPES.INDIVIDUAL]: 'Individual',
}

export function formatStaffNotificationEventType(eventType) {
  return eventTypeLabels[eventType] ?? 'Notification event'
}

export function formatStaffNotificationRecipient(recipientScope) {
  return recipientScopeLabels[recipientScope] ?? 'Authorized recipient'
}

export function formatStaffNotificationDate(value) {
  return new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
}
