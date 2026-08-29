import { BellOff } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import MemberNotificationItem from './MemberNotificationItem.jsx'

function MemberNotificationList({ notifications, onMarkAsRead }) {
  if (notifications.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <BellOff className="mx-auto size-8 text-slate-500" aria-hidden="true" />
          <h2 className="mt-4 text-lg font-semibold text-slate-950">No notifications found</h2>
          <p className="mt-2 text-slate-600">No notifications match the selected read-status filter.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <ul className="grid min-w-0 gap-4" aria-label="Member notifications">
      {notifications.map((notification) => (
        <li className="min-w-0" key={notification.id}>
          <MemberNotificationItem notification={notification} onMarkAsRead={onMarkAsRead} />
        </li>
      ))}
    </ul>
  )
}

export default MemberNotificationList
