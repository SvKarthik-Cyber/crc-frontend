import { ArrowRight, BookX } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { describeMemberAdvisoryAudience } from '../memberAdvisoryFormatters.js'

function MemberAdvisoryList({ advisories, hasActiveFilters }) {
  if (advisories.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <BookX className="mx-auto size-8 text-slate-500" aria-hidden="true" />
          <h2 className="mt-4 text-lg font-semibold text-slate-950">No advisories found</h2>
          <p className="mt-2 text-slate-600">
            {hasActiveFilters
              ? 'No advisories match the current search and category filter.'
              : 'No published advisories are available for this account category.'}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <ul className="grid min-w-0 gap-4" aria-label="Available advisories">
      {advisories.map((advisory) => (
        <li className="min-w-0" key={advisory.id}>
          <Card className="min-w-0">
            <CardContent className="grid min-w-0 gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
              <div className="min-w-0">
                <p className="break-words text-sm font-semibold text-blue-800">{advisory.reference}</p>
                <h2 className="mt-1 break-words text-lg font-semibold text-slate-950">{advisory.title}</h2>
                <dl className="mt-4 grid min-w-0 gap-3 text-sm sm:grid-cols-3">
                  <div className="min-w-0"><dt className="font-medium text-slate-500">Category</dt><dd className="mt-1 break-words text-slate-900">{advisory.category}</dd></div>
                  <div><dt className="font-medium text-slate-500">Published date</dt><dd className="mt-1 text-slate-900"><time dateTime={advisory.publishedAt}>{advisory.publishedAt}</time></dd></div>
                  <div className="min-w-0"><dt className="font-medium text-slate-500">Intended audience</dt><dd className="mt-1 break-words text-slate-900">{describeMemberAdvisoryAudience(advisory)}</dd></div>
                </dl>
              </div>
              <Button nativeButton={false} render={<Link to={advisory.id} />} variant="outline">
                View advisory <ArrowRight aria-hidden="true" />
              </Button>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  )
}

export default MemberAdvisoryList
