import { useMemo, useState } from 'react'
import { BookOpenText } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { ADVISORY_CATEGORIES } from '@/constants/advisoryAudiences'
import MemberAdvisoryList from '@/features/advisories/member/components/MemberAdvisoryList.jsx'
import { filterMemberAdvisories } from '@/features/advisories/member/memberAdvisoryFilters.js'
import { isAdvisoryVisibleToMember } from '@/features/advisories/member/memberAdvisoryVisibility.js'

function MemberAdvisoriesPage({
  advisoryRecords = null,
  memberAccountCategory = null,
  previewCategoryNotice = null,
}) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('ALL')
  const hasActiveFilters = Boolean(search || category !== 'ALL')
  const visibleAdvisories = useMemo(
    () =>
      advisoryRecords
        ? advisoryRecords.filter((advisory) =>
            isAdvisoryVisibleToMember(advisory, memberAccountCategory),
          )
        : [],
    [advisoryRecords, memberAccountCategory],
  )
  const filteredAdvisories = useMemo(
    () => filterMemberAdvisories(visibleAdvisories, { search, category }),
    [visibleAdvisories, search, category],
  )

  function clearFilters() {
    setSearch('')
    setCategory('ALL')
  }

  return (
    <section className="min-w-0" aria-labelledby="member-advisories-title">
      <BookOpenText className="mb-5 size-8 text-blue-700" aria-hidden="true" />
      <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl" id="member-advisories-title">Advisories</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">View published CRC advisories available to your approved member account category.</p>

      {previewCategoryNotice ? (
        <p className="mt-5 w-fit rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-900">{previewCategoryNotice}</p>
      ) : null}

      <div className="mt-6 rounded-lg border border-slate-300 bg-slate-100 p-4 text-sm leading-6 text-slate-800" role="note">
        Frontend filtering is not an authorization boundary. The future backend must require an approved registration and active account, return only published advisories for all approved members or the authenticated member&apos;s account category, and never return draft, archived, or unauthorized advisories.
      </div>

      {advisoryRecords === null ? (
        <Card className="mt-8 max-w-3xl">
          <CardContent className="text-slate-600">Published advisories are not connected to the backend yet.</CardContent>
        </Card>
      ) : (
        <div className="mt-8 min-w-0 space-y-6">
          <form className="grid min-w-0 gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] lg:items-end" onSubmit={(event) => event.preventDefault()}>
            <div className="min-w-0 space-y-2">
              <Label htmlFor="member-advisory-search">Search advisory reference or title</Label>
              <Input id="member-advisory-search" onChange={(event) => setSearch(event.target.value)} type="search" value={search} />
            </div>
            <div className="min-w-0 space-y-2">
              <Label htmlFor="member-advisory-category-filter">Advisory category</Label>
              <NativeSelect className="w-full min-w-0" id="member-advisory-category-filter" onChange={(event) => setCategory(event.target.value)} value={category}>
                <NativeSelectOption value="ALL">All categories</NativeSelectOption>
                {ADVISORY_CATEGORIES.map((item) => <NativeSelectOption key={item} value={item}>{item}</NativeSelectOption>)}
              </NativeSelect>
            </div>
            <Button className="w-full lg:w-auto" disabled={!hasActiveFilters} onClick={clearFilters} type="button" variant="outline">Clear filters</Button>
          </form>
          <MemberAdvisoryList advisories={filteredAdvisories} hasActiveFilters={hasActiveFilters} />
        </div>
      )}
    </section>
  )
}

export default MemberAdvisoriesPage
