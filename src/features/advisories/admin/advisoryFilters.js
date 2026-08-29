export function filterAdvisoryRecords(records, { search, category, status, audience }) {
  const normalizedSearch = search.trim().toLocaleLowerCase()

  return records.filter((record) => {
    const searchableText = `${record.reference} ${record.title}`.toLocaleLowerCase()
    const matchesSearch = searchableText.includes(normalizedSearch)
    const matchesCategory = category === 'ALL' || record.category === category
    const matchesStatus = status === 'ALL' || record.status === status
    const matchesAudience = audience === 'ALL' || record.audience === audience

    return matchesSearch && matchesCategory && matchesStatus && matchesAudience
  })
}
