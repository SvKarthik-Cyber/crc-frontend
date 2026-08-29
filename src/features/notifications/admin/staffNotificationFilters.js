export function filterStaffNotificationRecords(records, { eventType, recipientScope }) {
  return records.filter((record) => {
    const matchesEventType = eventType === 'ALL' || record.eventType === eventType
    const matchesRecipient = recipientScope === 'ALL' || record.recipientScope === recipientScope

    return matchesEventType && matchesRecipient
  })
}
