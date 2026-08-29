import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { describeMemberAdvisoryAudience } from '../memberAdvisoryFormatters.js'

function MemberAdvisoryDetails({ advisory }) {
  return (
    <div className="min-w-0 space-y-8">
      <Card className="min-w-0">
        <CardHeader className="border-b"><h2 className="text-xl font-semibold text-slate-950">Advisory details</h2></CardHeader>
        <CardContent>
          <dl className="grid min-w-0 gap-x-8 gap-y-5 sm:grid-cols-2">
            {[
              ['Advisory reference', advisory.reference],
              ['Title', advisory.title],
              ['Category', advisory.category],
              ['Published date', advisory.publishedAt, advisory.publishedAt],
              ['Intended audience', describeMemberAdvisoryAudience(advisory)],
            ].map(([label, value, dateTime]) => (
              <div className="min-w-0" key={label}>
                <dt className="text-sm font-medium text-slate-500">{label}</dt>
                <dd className="mt-1 break-words leading-7 text-slate-900">{dateTime ? <time dateTime={dateTime}>{value}</time> : value}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>

      <Card className="min-w-0">
        <CardHeader className="border-b"><h2 className="text-xl font-semibold text-slate-950">Advisory content</h2></CardHeader>
        <CardContent className="space-y-6">
          <section aria-labelledby="member-advisory-summary-title">
            <h3 className="font-semibold text-slate-950" id="member-advisory-summary-title">Summary</h3>
            <p className="mt-2 whitespace-pre-wrap break-words leading-7 text-slate-700">{advisory.summary}</p>
          </section>
          <section aria-labelledby="member-advisory-content-title">
            <h3 className="font-semibold text-slate-950" id="member-advisory-content-title">Full advisory content</h3>
            <p className="mt-2 whitespace-pre-wrap break-words leading-7 text-slate-700">{advisory.content}</p>
          </section>
        </CardContent>
      </Card>
    </div>
  )
}

export default MemberAdvisoryDetails
