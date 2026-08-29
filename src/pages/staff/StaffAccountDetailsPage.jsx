import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { Button } from '@/components/ui/button'
import StaffAccountDetails from '@/features/staff/admin/components/StaffAccountDetails.jsx'

function StaffAccountDetailsPage({ staffAccountRecords = null }) {
  const { staffId } = useParams()
  const staffAccount = staffAccountRecords?.find((record) => record.id === staffId)

  if (!staffAccount) return <section className="min-w-0" aria-labelledby="staff-account-unavailable-title">
    <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl" id="staff-account-unavailable-title">Staff account unavailable</h1>
    <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">Staff account not found or unavailable.</p>
    <Button className="mt-6" nativeButton={false} render={<Link relative="path" to=".." />} variant="outline"><ArrowLeft aria-hidden="true" /> Back to Staff Management</Button>
  </section>

  return <section className="min-w-0" aria-labelledby="staff-account-detail-title">
    <Button nativeButton={false} render={<Link relative="path" to=".." />} variant="outline"><ArrowLeft aria-hidden="true" /> Back to Staff Management</Button>
    <h1 className="mt-6 break-words text-3xl font-bold tracking-tight text-slate-950 md:text-4xl" id="staff-account-detail-title">{staffAccount.name}</h1>
    <div className="mt-8"><StaffAccountDetails staffAccount={staffAccount} /></div>
  </section>
}

export default StaffAccountDetailsPage
