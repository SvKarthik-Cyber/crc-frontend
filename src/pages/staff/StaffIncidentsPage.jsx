import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { INCIDENT_STATUSES } from '@/constants/incidentStatuses'
import StaffIncidentList from '@/features/incidents/admin/components/StaffIncidentList.jsx'
import { filterIncidentRecords } from '@/features/incidents/admin/incidentFilters.js'
import { formatIncidentStatus } from '@/features/incidents/admin/incidentStatusUtils.js'
import { INCIDENT_CATEGORIES } from '@/features/incidents/schemas/incidentReportSchema.js'

function StaffIncidentsPage({ incidentRecords = null }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('ALL')
  const [status, setStatus] = useState('ALL')
  const [assignment, setAssignment] = useState('ALL')
  const filteredRecords = useMemo(
    () =>
      incidentRecords
        ? filterIncidentRecords(incidentRecords, { search, category, status, assignment })
        : [],
    [incidentRecords, search, category, status, assignment],
  )

  function clearFilters() {
    setSearch('')
    setCategory('ALL')
    setStatus('ALL')
    setAssignment('ALL')
  }

  return (
    <section className="min-w-0" aria-labelledby="staff-incidents-title">
      <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl" id="staff-incidents-title">
        Incident Management
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
        This area allows authorized CRC personnel to review and coordinate member-reported
        incidents.
      </p>

      {incidentRecords === null ? (
        <Card className="mt-8 min-w-0">
          <CardContent className="text-slate-600">
            Incident records and handling tools are not connected to the backend yet.
          </CardContent>
        </Card>
      ) : (
        <div className="mt-8 min-w-0 space-y-6">
          <div className="grid min-w-0 gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="min-w-0 space-y-2 sm:col-span-2 xl:col-span-4">
              <Label htmlFor="incident-search">Search incident reference or title</Label>
              <Input
                id="incident-search"
                onChange={(event) => setSearch(event.target.value)}
                type="search"
                value={search}
              />
            </div>
            <div className="min-w-0 space-y-2">
              <Label htmlFor="incident-category-filter">Incident category</Label>
              <NativeSelect
                className="w-full min-w-0"
                id="incident-category-filter"
                onChange={(event) => setCategory(event.target.value)}
                value={category}
              >
                <NativeSelectOption value="ALL">All categories</NativeSelectOption>
                {INCIDENT_CATEGORIES.map((item) => (
                  <NativeSelectOption key={item} value={item}>
                    {item}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </div>
            <div className="min-w-0 space-y-2">
              <Label htmlFor="incident-status-filter">Status</Label>
              <NativeSelect
                className="w-full min-w-0"
                id="incident-status-filter"
                onChange={(event) => setStatus(event.target.value)}
                value={status}
              >
                <NativeSelectOption value="ALL">All statuses</NativeSelectOption>
                {Object.values(INCIDENT_STATUSES).map((item) => (
                  <NativeSelectOption key={item} value={item}>
                    {formatIncidentStatus(item)}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </div>
            <div className="min-w-0 space-y-2">
              <Label htmlFor="incident-assignment-filter">Assignment</Label>
              <NativeSelect
                className="w-full min-w-0"
                id="incident-assignment-filter"
                onChange={(event) => setAssignment(event.target.value)}
                value={assignment}
              >
                <NativeSelectOption value="ALL">All assignments</NativeSelectOption>
                <NativeSelectOption value="ASSIGNED">Assigned</NativeSelectOption>
                <NativeSelectOption value="UNASSIGNED">Unassigned</NativeSelectOption>
              </NativeSelect>
            </div>
            <div className="flex items-end">
              <Button className="w-full" onClick={clearFilters} type="button" variant="outline">
                Clear filters
              </Button>
            </div>
          </div>

          <StaffIncidentList records={filteredRecords} />
        </div>
      )}
    </section>
  )
}

export default StaffIncidentsPage
