export function filterMemberAdvisories(records, { search, category }) {
  const normalizedSearch = search.trim().toLocaleLowerCase()

  return records.filter((record) => {
    const searchableText = `${record.reference} ${record.title}`.toLocaleLowerCase()
    const matchesSearch = searchableText.includes(normalizedSearch)
    const matchesCategory = category === 'ALL' || record.category === category

    return matchesSearch && matchesCategory
  })
}
