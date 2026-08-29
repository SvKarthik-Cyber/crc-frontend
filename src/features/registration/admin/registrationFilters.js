export function filterRegistrationRecords(records, { search, category, status }) {
  const normalizedSearch = search.trim().toLocaleLowerCase()

  return records.filter((record) => {
    const matchesSearch = record.name.toLocaleLowerCase().includes(normalizedSearch)
    const matchesCategory = category === 'ALL' || record.category === category
    const matchesStatus = status === 'ALL' || record.registrationStatus === status

    return matchesSearch && matchesCategory && matchesStatus
  })
}
