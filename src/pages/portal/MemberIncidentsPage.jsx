import { useMemo, useState } from 'react'
import { FilePlus2, FolderKanban } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import MemberIncidentList from '@/features/incidents/member/components/MemberIncidentList.jsx'
import { MEMBER_INCIDENT_STATUS_DETAILS } from '@/features/incidents/member/memberIncidentStatuses.js'
import { INCIDENT_CATEGORIES } from '@/features/incidents/schemas/incidentReportSchema.js'

function MemberIncidentsPage({ incidentRecords = null }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('')
  const hasActiveFilters = Boolean(search || category || status)
  const filteredIncidents = useMemo(() => {
    if (!incidentRecords) return []
    const query = search.trim().toLowerCase()
    return incidentRecords.filter((incident) =>
      (!query || incident.reference.toLowerCase().includes(query) || incident.title.toLowerCase().includes(query)) &&
      (!category || incident.category === category) && (!status || incident.status === status))
  }, [category, incidentRecords, search, status])
  function clearFilters() { setSearch(''); setCategory(''); setStatus('') }

  return <section className="min-w-0" aria-labelledby="member-incidents-title">
    <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0"><h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl" id="member-incidents-title">My Incidents</h1><p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">View the incidents submitted through your approved CRC member account and their current status.</p></div>
      <Button nativeButton={false} render={<Link to="new" />}><FilePlus2 aria-hidden="true" />Report Incident</Button>
    </div>
    <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-950" role="note">
      <p className="font-semibold">Incident ownership must be enforced by the future backend.</p>
      <p className="mt-1">Frontend route filtering does not enforce ownership. The backend must authenticate the request, resolve the member from the verified session, retrieve an incident by both ID and owner, and reject access to another account&apos;s incident. Member API responses must include only member-visible CRC responses and must never return internal staff notes.</p>
    </div>
    {incidentRecords === null ? <Card className="mt-8 max-w-3xl"><CardContent className="py-6 text-center"><FolderKanban className="mx-auto size-8 text-slate-500" aria-hidden="true" /><h2 className="mt-4 text-lg font-semibold text-slate-950">Incident data is not connected</h2><p className="mx-auto mt-2 max-w-xl leading-7 text-slate-600">Your submitted incidents will appear here after secure backend integration.</p></CardContent></Card> : <>
      <form className="my-8 grid min-w-0 gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-2 lg:grid-cols-4" onSubmit={(event) => event.preventDefault()}>
        <div className="min-w-0 sm:col-span-2 lg:col-span-1"><label className="mb-2 block text-sm font-medium text-slate-900" htmlFor="incident-search">Search incidents</label><Input id="incident-search" onChange={(event) => setSearch(event.target.value)} placeholder="Reference or title" type="search" value={search} /></div>
        <div className="min-w-0"><label className="mb-2 block text-sm font-medium text-slate-900" htmlFor="incident-category-filter">Category</label><NativeSelect className="w-full" id="incident-category-filter" onChange={(event) => setCategory(event.target.value)} value={category}><NativeSelectOption value="">All categories</NativeSelectOption>{INCIDENT_CATEGORIES.map((item) => <NativeSelectOption key={item} value={item}>{item}</NativeSelectOption>)}</NativeSelect></div>
        <div className="min-w-0"><label className="mb-2 block text-sm font-medium text-slate-900" htmlFor="incident-status-filter">Status</label><NativeSelect className="w-full" id="incident-status-filter" onChange={(event) => setStatus(event.target.value)} value={status}><NativeSelectOption value="">All statuses</NativeSelectOption>{Object.entries(MEMBER_INCIDENT_STATUS_DETAILS).map(([value, details]) => <NativeSelectOption key={value} value={value}>{details.label}</NativeSelectOption>)}</NativeSelect></div>
        <div className="flex items-end"><Button className="w-full" disabled={!hasActiveFilters} onClick={clearFilters} type="button" variant="outline">Clear filters</Button></div>
      </form>
      <MemberIncidentList incidents={filteredIncidents} hasActiveFilters={hasActiveFilters} />
    </>}
  </section>
}

export default MemberIncidentsPage
