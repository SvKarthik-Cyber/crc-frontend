import { BellOff } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import {
  formatStaffNotificationDate,
  formatStaffNotificationEventType,
  formatStaffNotificationRecipient,
} from '../staffNotificationFormatters.js'

function StaffNotificationRecordList({ records }) {
  if (records.length === 0) return <Card><CardContent className="py-8 text-center">
    <BellOff className="mx-auto size-8 text-slate-500" aria-hidden="true" />
    <h2 className="mt-4 text-lg font-semibold text-slate-950">No notification records found</h2>
    <p className="mt-2 text-slate-600">No notification records match the selected filters.</p>
  </CardContent></Card>

  return <ul className="grid min-w-0 gap-4" aria-label="Automatically generated notification records">{records.map((record) => (
    <li className="min-w-0" key={record.id}><article><Card className="min-w-0"><CardContent className="min-w-0">
      <p className="text-sm font-semibold text-blue-800">{formatStaffNotificationEventType(record.eventType)}</p>
      <h2 className="mt-2 break-words text-lg font-semibold text-slate-950">{record.title}</h2>
      <p className="mt-2 break-words leading-7 text-slate-700">{record.message}</p>
      <dl className="mt-4 grid min-w-0 gap-3 text-sm sm:grid-cols-3">
        <div className="min-w-0"><dt className="font-medium text-slate-500">Recipient scope</dt><dd className="mt-1 break-words text-slate-900">{formatStaffNotificationRecipient(record.recipientScope)}</dd></div>
        <div className="min-w-0"><dt className="font-medium text-slate-500">Related reference</dt><dd className="mt-1 break-words text-slate-900">{record.relatedReference}</dd></div>
        <div><dt className="font-medium text-slate-500">Created date</dt><dd className="mt-1 text-slate-900"><time dateTime={record.createdAt}>{formatStaffNotificationDate(record.createdAt)}</time></dd></div>
      </dl>
    </CardContent></Card></article></li>
  ))}</ul>
}

export default StaffNotificationRecordList
