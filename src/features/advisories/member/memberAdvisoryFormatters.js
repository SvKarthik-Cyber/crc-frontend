import { ADVISORY_AUDIENCES } from '@/constants/advisoryAudiences'

function formatAccountCategory(category) {
  return category.charAt(0) + category.slice(1).toLowerCase()
}

export function describeMemberAdvisoryAudience(advisory) {
  if (advisory.audienceMode === ADVISORY_AUDIENCES.ALL_APPROVED_MEMBERS) {
    return 'All approved members'
  }

  return `Account categories: ${advisory.accountCategories.map(formatAccountCategory).join(', ')}`
}
