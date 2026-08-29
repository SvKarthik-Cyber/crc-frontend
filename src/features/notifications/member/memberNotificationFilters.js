export const MEMBER_NOTIFICATION_FILTERS = Object.freeze({
  ALL: 'ALL',
  UNREAD: 'UNREAD',
  READ: 'READ',
})

export function filterMemberNotifications(notifications, filter) {
  if (filter === MEMBER_NOTIFICATION_FILTERS.UNREAD) {
    return notifications.filter((notification) => notification.readAt === null)
  }

  if (filter === MEMBER_NOTIFICATION_FILTERS.READ) {
    return notifications.filter((notification) => notification.readAt !== null)
  }

  return notifications
}
