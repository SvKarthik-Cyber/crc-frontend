import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { ACCOUNT_STATUSES } from '@/constants/registrationStatuses'
import { USER_ROLES } from '@/constants/roles'
import StaffAccountList from '@/features/staff/admin/components/StaffAccountList.jsx'
import { filterStaffAccounts } from '@/features/staff/admin/staffAccountFilters.js'

function StaffManagementPage({ staffAccountRecords = null }) {
  const [search, setSearch] = useState('')
  const [role, setRole] = useState('ALL')
  const [accountStatus, setAccountStatus] = useState('ALL')
  const filteredAccounts = useMemo(
    () => staffAccountRecords ? filterStaffAccounts(staffAccountRecords, { search, role, accountStatus }) : [],
    [staffAccountRecords, search, role, accountStatus],
  )

  function clearFilters() {
    setSearch('')
    setRole('ALL')
    setAccountStatus('ALL')
  }

  return <section className="min-w-0" aria-labelledby="staff-management-title">
    <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl" id="staff-management-title">Staff Management</h1>
    <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">View the read-only directory of CRC staff accounts. Account creation and administrative changes are not available in this interface.</p>
    <div className="mt-6 rounded-lg border border-slate-300 bg-slate-100 p-4 text-sm leading-6 text-slate-800" role="note">Frontend route guards are not an authorization boundary. The future backend must restrict staff management to CRC Administrators, prohibit public staff registration, authorize every staff ID, protect the final active administrator and unsafe self-changes, audit all account and credential operations, require suitable MFA controls, and never return passwords, tokens, MFA secrets, or recovery codes.</div>

    {staffAccountRecords === null ? <Card className="mt-8 min-w-0"><CardContent className="text-slate-600">Staff account information is unavailable until secure backend integration is connected.</CardContent></Card> : <div className="mt-8 min-w-0 space-y-6">
      <div className="grid min-w-0 gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_14rem_14rem_auto] xl:items-end">
        <div className="min-w-0 space-y-2 sm:col-span-2 xl:col-span-1"><Label htmlFor="staff-account-search">Search staff name or official email</Label><Input id="staff-account-search" onChange={(event) => setSearch(event.target.value)} type="search" value={search} /></div>
        <div className="min-w-0 space-y-2"><Label htmlFor="staff-account-role">Staff role</Label><NativeSelect className="w-full min-w-0" id="staff-account-role" onChange={(event) => setRole(event.target.value)} value={role}>
          <NativeSelectOption value="ALL">All roles</NativeSelectOption>
          <NativeSelectOption value={USER_ROLES.CRC_ADMIN}>CRC Administrator</NativeSelectOption>
          <NativeSelectOption value={USER_ROLES.ANALYST}>Analyst</NativeSelectOption>
          <NativeSelectOption value={USER_ROLES.ADVISORY_MANAGER}>Advisory Manager</NativeSelectOption>
        </NativeSelect></div>
        <div className="min-w-0 space-y-2"><Label htmlFor="staff-account-status">Account status</Label><NativeSelect className="w-full min-w-0" id="staff-account-status" onChange={(event) => setAccountStatus(event.target.value)} value={accountStatus}>
          <NativeSelectOption value="ALL">All account statuses</NativeSelectOption>
          <NativeSelectOption value={ACCOUNT_STATUSES.ACTIVE}>Active</NativeSelectOption>
          <NativeSelectOption value={ACCOUNT_STATUSES.INACTIVE}>Inactive</NativeSelectOption>
        </NativeSelect></div>
        <Button className="w-full xl:w-auto" onClick={clearFilters} type="button" variant="outline">Clear filters</Button>
      </div>
      <StaffAccountList staffAccounts={filteredAccounts} />
    </div>}
  </section>
}

export default StaffManagementPage
