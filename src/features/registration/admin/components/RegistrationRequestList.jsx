import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import RegistrationStatusLabel from './RegistrationStatusLabel.jsx'

function formatCategory(category) {
  return category.charAt(0) + category.slice(1).toLowerCase()
}

function RegistrationRequestList({ records }) {
  if (records.length === 0) {
    return (
      <Card className="min-w-0">
        <CardContent className="text-slate-600">
          No registration requests match the selected search and filters.
        </CardContent>
      </Card>
    )
  }

  return (
    <ul className="grid min-w-0 list-none gap-4 p-0" aria-label="Registration requests">
      {records.map((record) => (
        <li className="min-w-0" key={record.id}>
          <Card className="min-w-0">
            <CardContent className="grid min-w-0 gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
              <div className="min-w-0">
                <h2 className="text-lg font-semibold text-slate-950">{record.name}</h2>
                <dl className="mt-3 grid min-w-0 gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="font-medium text-slate-500">Registration category</dt>
                    <dd className="mt-1 text-slate-800">{formatCategory(record.category)}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-slate-500">Submission date</dt>
                    <dd className="mt-1 text-slate-800"><time dateTime={record.submittedAt}>{record.submittedAt}</time></dd>
                  </div>
                </dl>
                <div className="mt-4 flex flex-wrap gap-2">
                  <RegistrationStatusLabel
                    label="Registration"
                    status={record.registrationStatus}
                  />
                  <RegistrationStatusLabel label="Account" status={record.accountStatus} />
                </div>
              </div>
              <Button
                className="w-full md:w-auto"
                nativeButton={false}
                render={<Link to={record.id} />}
                variant="outline"
              >
                Review details
                <ArrowRight aria-hidden="true" />
              </Button>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  )
}

export default RegistrationRequestList
