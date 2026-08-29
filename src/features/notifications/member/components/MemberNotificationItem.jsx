import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  formatMemberNotificationDate,
  formatMemberNotificationType,
} from '../memberNotificationFormatters.js'

function getRelatedDestination(resource) {
  if (resource?.type === 'INCIDENT') return `../incidents/${resource.id}`
  if (resource?.type === 'ADVISORY') return `../advisories/${resource.id}`
  return null
}

function MemberNotificationItem({ notification, onMarkAsRead }) {
  const isUnread = notification.readAt === null
  const relatedDestination = getRelatedDestination(notification.relatedResource)

  return (
    <Card className="min-w-0">
      <CardContent className="grid min-w-0 gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <div className="min-w-0">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <span className="rounded-full border border-slate-300 bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-800">
              {formatMemberNotificationType(notification.type)}
            </span>
            <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${isUnread ? 'border-blue-300 bg-blue-50 text-blue-900' : 'border-slate-300 bg-white text-slate-700'}`}>
              {isUnread ? 'Unread' : 'Read'}
            </span>
          </div>
          <h2 className="mt-4 break-words text-lg font-semibold text-slate-950">{notification.title}</h2>
          <p className="mt-2 break-words leading-7 text-slate-700">{notification.message}</p>
          <p className="mt-3 text-sm text-slate-500">
            <span className="sr-only">Created </span>
            <time dateTime={notification.createdAt}>{formatMemberNotificationDate(notification.createdAt)}</time>
          </p>
        </div>
        <div className="flex min-w-0 flex-col gap-3 sm:flex-row md:flex-col md:items-stretch">
          {relatedDestination ? (
            <Button nativeButton={false} render={<Link relative="path" to={relatedDestination} />} variant="outline">
              {notification.relatedResource.label} <ArrowRight aria-hidden="true" />
            </Button>
          ) : null}
          {isUnread ? (
            <Button aria-label={`Mark ${notification.title} as read`} onClick={() => onMarkAsRead(notification.id)} type="button">
              <Check aria-hidden="true" /> Mark as read
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}

export default MemberNotificationItem
