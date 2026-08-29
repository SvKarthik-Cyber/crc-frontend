export function formatAdvisoryStatus(status) {
  return status.charAt(0) + status.slice(1).toLowerCase()
}

export function formatAccountCategory(category) {
  return category.charAt(0) + category.slice(1).toLowerCase()
}

export function describeAdvisoryAudience(record, allApprovedMembersValue) {
  if (record.audience === allApprovedMembersValue) return 'All approved members'

  return `Account categories: ${record.accountCategories.map(formatAccountCategory).join(', ')}`
}
