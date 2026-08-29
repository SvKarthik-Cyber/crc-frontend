import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { ACCOUNT_STATUSES } from '@/constants/registrationStatuses'
import { ACCOUNT_TYPES } from '@/constants/roles'
import RegisteredMemberList from '@/features/members/admin/components/RegisteredMemberList.jsx'
import { filterRegisteredMembers } from '@/features/members/admin/memberAdminFilters.js'

function RegisteredMembersPage({ memberRecords = null }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('ALL')
  const [accountStatus, setAccountStatus] = useState('ALL')
  const filteredMembers = useMemo(
    () => memberRecords ? filterRegisteredMembers(memberRecords, { search, category, accountStatus }) : [],
    [memberRecords, search, category, accountStatus],
  )

  function clearFilters() {
    setSearch('')
    setCategory('ALL')
    setAccountStatus('ALL')
  }

  return <section className="min-w-0" aria-labelledby="registered-members-title">
    <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl" id="registered-members-title">Registered Members</h1>
    <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">View approved member accounts and their separate account status. Registration review remains in Registration Requests.</p>
    <div className="mt-6 rounded-lg border border-slate-300 bg-slate-100 p-4 text-sm leading-6 text-slate-800" role="note">Frontend role guards and local state are not authorization or persistence boundaries. The future backend must restrict this area to CRC Administrators, return only approved member accounts, validate every member ID, audit suspension and reactivation, revoke sessions on suspension, prevent inactive or suspended authentication and refresh, and never return credentials, tokens, or internal security data.</div>

    {memberRecords === null ? <Card className="mt-8 min-w-0"><CardContent className="text-slate-600">Approved member account records are not connected to the backend yet.</CardContent></Card> : <div className="mt-8 min-w-0 space-y-6">
      <div className="grid min-w-0 gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_14rem_14rem_auto] xl:items-end">
        <div className="min-w-0 space-y-2 sm:col-span-2 xl:col-span-1"><Label htmlFor="registered-member-search">Search member or organization name</Label><Input id="registered-member-search" onChange={(event) => setSearch(event.target.value)} type="search" value={search} /></div>
        <div className="min-w-0 space-y-2"><Label htmlFor="registered-member-category">Account category</Label><NativeSelect className="w-full min-w-0" id="registered-member-category" onChange={(event) => setCategory(event.target.value)} value={category}>
          <NativeSelectOption value="ALL">All categories</NativeSelectOption>
          <NativeSelectOption value={ACCOUNT_TYPES.ORGANIZATION}>Organization</NativeSelectOption>
          <NativeSelectOption value={ACCOUNT_TYPES.VOLUNTEER}>Volunteer</NativeSelectOption>
          <NativeSelectOption value={ACCOUNT_TYPES.INDIVIDUAL}>Individual</NativeSelectOption>
        </NativeSelect></div>
        <div className="min-w-0 space-y-2"><Label htmlFor="registered-member-status">Account status</Label><NativeSelect className="w-full min-w-0" id="registered-member-status" onChange={(event) => setAccountStatus(event.target.value)} value={accountStatus}>
          <NativeSelectOption value="ALL">All account statuses</NativeSelectOption>
          <NativeSelectOption value={ACCOUNT_STATUSES.ACTIVE}>Active</NativeSelectOption>
          <NativeSelectOption value={ACCOUNT_STATUSES.INACTIVE}>Inactive</NativeSelectOption>
          <NativeSelectOption value={ACCOUNT_STATUSES.SUSPENDED}>Suspended</NativeSelectOption>
        </NativeSelect></div>
        <Button className="w-full xl:w-auto" onClick={clearFilters} type="button" variant="outline">Clear filters</Button>
      </div>
      <RegisteredMemberList members={filteredMembers} />
    </div>}
  </section>
}

export default RegisteredMembersPage
