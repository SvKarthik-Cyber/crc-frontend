export function filterIncidentRecords(records, { search, category, status, assignment }) {
  const normalizedSearch = search.trim().toLocaleLowerCase()

  return records.filter((record) => {
    const searchableText = `${record.reference} ${record.title}`.toLocaleLowerCase()
    const matchesSearch = searchableText.includes(normalizedSearch)
    const matchesCategory = category === 'ALL' || record.category === category
    const matchesStatus = status === 'ALL' || record.status === status
    const matchesAssignment =
      assignment === 'ALL' ||
      (assignment === 'ASSIGNED' && Boolean(record.assignment)) ||
      (assignment === 'UNASSIGNED' && !record.assignment)

    return matchesSearch && matchesCategory && matchesStatus && matchesAssignment
  })
}
