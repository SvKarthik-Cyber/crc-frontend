export function filterStaffAccounts(records, { search, role, accountStatus }) {
  const normalizedSearch = search.trim().toLocaleLowerCase()

  return records.filter((staffAccount) => {
    const searchableText = `${staffAccount.name} ${staffAccount.officialEmail}`.toLocaleLowerCase()
    const matchesSearch = searchableText.includes(normalizedSearch)
    const matchesRole = role === 'ALL' || staffAccount.role === role
    const matchesStatus = accountStatus === 'ALL' || staffAccount.accountStatus === accountStatus

    return matchesSearch && matchesRole && matchesStatus
  })
}
