export const MEMBER_MESSAGE_SENDER = 'Cyber Resilient Centre'

export function formatMemberMessageDate(value) {
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}
