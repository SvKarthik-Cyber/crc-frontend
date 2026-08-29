export function getRegisteredMemberName(member) {
  return member.profile.organizationName ?? member.profile.fullName
}

export function filterRegisteredMembers(records, { search, category, accountStatus }) {
  const normalizedSearch = search.trim().toLocaleLowerCase()

  return records.filter((member) => {
    const matchesSearch = getRegisteredMemberName(member)
      .toLocaleLowerCase()
      .includes(normalizedSearch)
    const matchesCategory = category === 'ALL' || member.accountCategory === category
    const matchesStatus = accountStatus === 'ALL' || member.accountStatus === accountStatus

    return matchesSearch && matchesCategory && matchesStatus
  })
}
