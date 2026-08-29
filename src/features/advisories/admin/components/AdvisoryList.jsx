import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ADVISORY_AUDIENCES } from '@/constants/advisoryAudiences'
import AdvisoryStatusLabel from './AdvisoryStatusLabel.jsx'
import { describeAdvisoryAudience } from '../advisoryFormatters.js'

function AdvisoryList({ records }) {
  if (records.length === 0) {
    return (
      <Card className="min-w-0">
        <CardContent className="text-slate-600">
          No advisories match the selected search and filters.
        </CardContent>
      </Card>
    )
  }

  return (
    <ul className="grid min-w-0 list-none gap-4 p-0" aria-label="Advisory records">
      {records.map((record) => (
        <li className="min-w-0" key={record.id}>
          <Card className="min-w-0">
            <CardContent className="grid min-w-0 gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-blue-700">{record.reference}</p>
                <h2 className="mt-1 text-lg font-semibold text-slate-950">{record.title}</h2>
                <dl className="mt-3 grid min-w-0 gap-3 text-sm sm:grid-cols-3">
                  <div className="min-w-0">
                    <dt className="font-medium text-slate-500">Category</dt>
                    <dd className="mt-1 break-words text-slate-800">{record.category}</dd>
                  </div>
                  <div className="min-w-0">
                    <dt className="font-medium text-slate-500">Intended audience</dt>
                    <dd className="mt-1 break-words text-slate-800">
                      {describeAdvisoryAudience(
                        record,
                        ADVISORY_AUDIENCES.ALL_APPROVED_MEMBERS,
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-slate-500">Created date</dt>
                    <dd className="mt-1 text-slate-800"><time dateTime={record.createdAt}>{record.createdAt}</time></dd>
                  </div>
                </dl>
                <div className="mt-4">
                  <AdvisoryStatusLabel status={record.status} />
                </div>
              </div>
              <Button
                className="w-full md:w-auto"
                nativeButton={false}
                render={<Link to={record.id} />}
                variant="outline"
              >
                View details
                <ArrowRight aria-hidden="true" />
              </Button>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  )
}

export default AdvisoryList
