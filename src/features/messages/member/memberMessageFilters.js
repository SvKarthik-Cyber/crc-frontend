export const MEMBER_MESSAGE_FILTERS = Object.freeze({
  ALL: 'ALL',
  UNREAD: 'UNREAD',
  READ: 'READ',
})

export function filterMemberMessages(messages, filter) {
  if (filter === MEMBER_MESSAGE_FILTERS.UNREAD) {
    return messages.filter((message) => message.readAt === null)
  }

  if (filter === MEMBER_MESSAGE_FILTERS.READ) {
    return messages.filter((message) => message.readAt !== null)
  }

  return messages
}
