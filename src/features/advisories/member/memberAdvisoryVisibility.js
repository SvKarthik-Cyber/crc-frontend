import { ADVISORY_AUDIENCES } from '@/constants/advisoryAudiences'
import { ADVISORY_STATUSES } from '@/constants/advisoryStatuses'

export function isAdvisoryVisibleToMember(advisory, memberAccountCategory) {
  if (!advisory || advisory.status !== ADVISORY_STATUSES.PUBLISHED) return false

  if (advisory.audienceMode === ADVISORY_AUDIENCES.ALL_APPROVED_MEMBERS) return true

  return (
    advisory.audienceMode === ADVISORY_AUDIENCES.ACCOUNT_CATEGORIES &&
    advisory.accountCategories.includes(memberAccountCategory)
  )
}
