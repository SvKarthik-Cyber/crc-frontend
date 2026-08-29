import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import RegistrationRequestList from '@/features/registration/admin/components/RegistrationRequestList.jsx'
import { filterRegistrationRecords } from '@/features/registration/admin/registrationFilters.js'
import { ACCOUNT_TYPES } from '@/constants/roles'
import { REGISTRATION_STATUSES } from '@/constants/registrationStatuses'

function RegistrationRequestsPage({ registrationRecords = null }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('ALL')
  const [status, setStatus] = useState('ALL')
  const filteredRecords = useMemo(
    () =>
      registrationRecords
        ? filterRegistrationRecords(registrationRecords, { search, category, status })
        : [],
    [registrationRecords, search, category, status],
  )

  function clearFilters() {
    setSearch('')
    setCategory('ALL')
    setStatus('ALL')
  }

  return (
    <section className="min-w-0" aria-labelledby="registration-requests-title">
      <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl" id="registration-requests-title">
        Registration Requests
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
        This area allows authorized CRC Administrators to review Organization, Volunteer and
        Individual registration requests.
      </p>

      {registrationRecords === null ? (
        <Card className="mt-8 min-w-0">
          <CardContent className="text-slate-600">
            Registration request records are not connected yet. Review, approval and rejection
            actions will require backend integration.
          </CardContent>
        </Card>
      ) : (
        <div className="mt-8 min-w-0 space-y-6">
          <div className="grid min-w-0 gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_14rem_14rem_auto] xl:items-end">
            <div className="min-w-0 space-y-2 sm:col-span-2 xl:col-span-1">
              <Label htmlFor="registration-search">Search applicant or organization</Label>
              <Input
                id="registration-search"
                onChange={(event) => setSearch(event.target.value)}
                type="search"
                value={search}
              />
            </div>
            <div className="min-w-0 space-y-2">
              <Label htmlFor="registration-category-filter">Registration category</Label>
              <NativeSelect
                className="w-full min-w-0"
                id="registration-category-filter"
                onChange={(event) => setCategory(event.target.value)}
                value={category}
              >
                <NativeSelectOption value="ALL">All categories</NativeSelectOption>
                <NativeSelectOption value={ACCOUNT_TYPES.ORGANIZATION}>Organization</NativeSelectOption>
                <NativeSelectOption value={ACCOUNT_TYPES.VOLUNTEER}>Volunteer</NativeSelectOption>
                <NativeSelectOption value={ACCOUNT_TYPES.INDIVIDUAL}>Individual</NativeSelectOption>
              </NativeSelect>
            </div>
            <div className="min-w-0 space-y-2">
              <Label htmlFor="registration-status-filter">Registration status</Label>
              <NativeSelect
                className="w-full min-w-0"
                id="registration-status-filter"
                onChange={(event) => setStatus(event.target.value)}
                value={status}
              >
                <NativeSelectOption value="ALL">All statuses</NativeSelectOption>
                <NativeSelectOption value={REGISTRATION_STATUSES.PENDING}>Pending</NativeSelectOption>
                <NativeSelectOption value={REGISTRATION_STATUSES.APPROVED}>Approved</NativeSelectOption>
                <NativeSelectOption value={REGISTRATION_STATUSES.REJECTED}>Rejected</NativeSelectOption>
              </NativeSelect>
            </div>
            <Button className="w-full xl:w-auto" onClick={clearFilters} type="button" variant="outline">
              Clear filters
            </Button>
          </div>

          <RegistrationRequestList records={filteredRecords} />
        </div>
      )}
    </section>
  )
}

export default RegistrationRequestsPage
