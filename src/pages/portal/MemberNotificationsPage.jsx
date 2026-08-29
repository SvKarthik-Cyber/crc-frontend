import { useMemo, useState } from 'react'
import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import MemberNotificationList from '@/features/notifications/member/components/MemberNotificationList.jsx'
import {
  filterMemberNotifications,
  MEMBER_NOTIFICATION_FILTERS,
} from '@/features/notifications/member/memberNotificationFilters.js'

function copyNotifications(records) {
  return records.map((notification) => ({
    ...notification,
    relatedResource: notification.relatedResource
      ? { ...notification.relatedResource }
      : null,
  }))
}

function MemberNotificationsPage({ notificationRecords = null, previewUpdateNotice = null }) {
  const [notifications, setNotifications] = useState(() =>
    notificationRecords ? copyNotifications(notificationRecords) : [],
  )
  const [filter, setFilter] = useState(MEMBER_NOTIFICATION_FILTERS.ALL)
  const [notice, setNotice] = useState('')
  const filteredNotifications = useMemo(
    () => filterMemberNotifications(notifications, filter),
    [notifications, filter],
  )

  function markAsRead(notificationId) {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) =>
        notification.id === notificationId && notification.readAt === null
          ? { ...notification, readAt: new Date().toISOString() }
          : notification,
      ),
    )
    setNotice(previewUpdateNotice ?? '')
  }

  function clearFilter() {
    setFilter(MEMBER_NOTIFICATION_FILTERS.ALL)
  }

  return (
    <section className="min-w-0" aria-labelledby="member-notifications-title">
      <Bell className="mb-5 size-8 text-blue-700" aria-hidden="true" />
      <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl" id="member-notifications-title">Notifications</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">Review account notices and updates about member-visible CRC incidents and advisories.</p>

      <div className="mt-6 rounded-lg border border-slate-300 bg-slate-100 p-4 text-sm leading-6 text-slate-800" role="note">
        Frontend filtering and local read state are not authorization or persistence boundaries. The future backend must derive the recipient from authentication, return only that member&apos;s notifications, verify ownership before read updates, validate related incident ownership and advisory eligibility, generate records from trusted events, and never expose another member&apos;s notifications.
      </div>

      {notificationRecords === null ? (
        <Card className="mt-8 max-w-3xl">
          <CardContent className="text-slate-600">Notifications are not available until secure backend integration is connected.</CardContent>
        </Card>
      ) : (
        <div className="mt-8 min-w-0 space-y-6">
          <div className="grid min-w-0 gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
            <div className="min-w-0 space-y-2">
              <Label htmlFor="member-notification-filter">Read status</Label>
              <NativeSelect className="w-full min-w-0" id="member-notification-filter" onChange={(event) => setFilter(event.target.value)} value={filter}>
                <NativeSelectOption value={MEMBER_NOTIFICATION_FILTERS.ALL}>All notifications</NativeSelectOption>
                <NativeSelectOption value={MEMBER_NOTIFICATION_FILTERS.UNREAD}>Unread</NativeSelectOption>
                <NativeSelectOption value={MEMBER_NOTIFICATION_FILTERS.READ}>Read</NativeSelectOption>
              </NativeSelect>
            </div>
            <Button className="w-full sm:w-auto" disabled={filter === MEMBER_NOTIFICATION_FILTERS.ALL} onClick={clearFilter} type="button" variant="outline">Clear filter</Button>
          </div>

          {notice ? <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-950" role="status">{notice}</div> : null}
          <MemberNotificationList notifications={filteredNotifications} onMarkAsRead={markAsRead} />
        </div>
      )}
    </section>
  )
}

export default MemberNotificationsPage
