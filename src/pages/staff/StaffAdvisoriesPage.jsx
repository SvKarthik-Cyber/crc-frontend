import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { ADVISORY_AUDIENCES, ADVISORY_CATEGORIES } from '@/constants/advisoryAudiences'
import { ADVISORY_STATUSES } from '@/constants/advisoryStatuses'
import AdvisoryList from '@/features/advisories/admin/components/AdvisoryList.jsx'
import { filterAdvisoryRecords } from '@/features/advisories/admin/advisoryFilters.js'
import { formatAdvisoryStatus } from '@/features/advisories/admin/advisoryFormatters.js'

function StaffAdvisoriesPage({ advisoryRecords = null }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('ALL')
  const [status, setStatus] = useState('ALL')
  const [audience, setAudience] = useState('ALL')
  const filteredRecords = useMemo(
    () =>
      advisoryRecords
        ? filterAdvisoryRecords(advisoryRecords, { search, category, status, audience })
        : [],
    [advisoryRecords, search, category, status, audience],
  )

  function clearFilters() {
    setSearch('')
    setCategory('ALL')
    setStatus('ALL')
    setAudience('ALL')
  }

  return (
    <section className="min-w-0" aria-labelledby="staff-advisories-title">
      <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl" id="staff-advisories-title">
        Advisory Management
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
        This area allows authorized CRC personnel to prepare and manage cyber advisories for
        approved members.
      </p>

      <Button className="mt-6" nativeButton={false} render={<Link to="new" />}>
        <Plus aria-hidden="true" />
        Create advisory
      </Button>

      {advisoryRecords === null ? (
        <Card className="mt-8 min-w-0">
          <CardContent className="text-slate-600">
            Advisory records are not connected to the backend yet. The create form remains
            available for frontend validation only.
          </CardContent>
        </Card>
      ) : (
        <div className="mt-8 min-w-0 space-y-6">
          <div className="grid min-w-0 gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="min-w-0 space-y-2 sm:col-span-2 xl:col-span-4">
              <Label htmlFor="advisory-search">Search advisory reference or title</Label>
              <Input id="advisory-search" onChange={(event) => setSearch(event.target.value)} type="search" value={search} />
            </div>
            <div className="min-w-0 space-y-2">
              <Label htmlFor="advisory-category-filter">Advisory category</Label>
              <NativeSelect className="w-full min-w-0" id="advisory-category-filter" onChange={(event) => setCategory(event.target.value)} value={category}>
                <NativeSelectOption value="ALL">All categories</NativeSelectOption>
                {ADVISORY_CATEGORIES.map((item) => <NativeSelectOption key={item} value={item}>{item}</NativeSelectOption>)}
              </NativeSelect>
            </div>
            <div className="min-w-0 space-y-2">
              <Label htmlFor="advisory-status-filter">Status</Label>
              <NativeSelect className="w-full min-w-0" id="advisory-status-filter" onChange={(event) => setStatus(event.target.value)} value={status}>
                <NativeSelectOption value="ALL">All statuses</NativeSelectOption>
                {Object.values(ADVISORY_STATUSES).map((item) => <NativeSelectOption key={item} value={item}>{formatAdvisoryStatus(item)}</NativeSelectOption>)}
              </NativeSelect>
            </div>
            <div className="min-w-0 space-y-2">
              <Label htmlFor="advisory-audience-filter">Audience</Label>
              <NativeSelect className="w-full min-w-0" id="advisory-audience-filter" onChange={(event) => setAudience(event.target.value)} value={audience}>
                <NativeSelectOption value="ALL">All audiences</NativeSelectOption>
                <NativeSelectOption value={ADVISORY_AUDIENCES.ALL_APPROVED_MEMBERS}>All approved members</NativeSelectOption>
                <NativeSelectOption value={ADVISORY_AUDIENCES.ACCOUNT_CATEGORIES}>Account categories</NativeSelectOption>
              </NativeSelect>
            </div>
            <div className="flex items-end">
              <Button className="w-full" onClick={clearFilters} type="button" variant="outline">Clear filters</Button>
            </div>
          </div>
          <AdvisoryList records={filteredRecords} />
        </div>
      )}
    </section>
  )
}

export default StaffAdvisoriesPage
