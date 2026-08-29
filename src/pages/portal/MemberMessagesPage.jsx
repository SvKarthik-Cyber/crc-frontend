import { useMemo, useState } from 'react'
import { MessagesSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import MemberMessageList from '@/features/messages/member/components/MemberMessageList.jsx'
import {
  filterMemberMessages,
  MEMBER_MESSAGE_FILTERS,
} from '@/features/messages/member/memberMessageFilters.js'

function MemberMessagesPage({ messageRecords = null }) {
  const [filter, setFilter] = useState(MEMBER_MESSAGE_FILTERS.ALL)
  const filteredMessages = useMemo(
    () => filterMemberMessages(messageRecords ?? [], filter),
    [messageRecords, filter],
  )

  return (
    <section className="min-w-0" aria-labelledby="member-messages-title">
      <MessagesSquare className="mb-5 size-8 text-blue-700" aria-hidden="true" />
      <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl" id="member-messages-title">Messages from CRC</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">Read one-way communications sent by the Cyber Resilient Centre. Messages are read-only and cannot be replied to from the member portal.</p>

      <div className="mt-6 rounded-lg border border-slate-300 bg-slate-100 p-4 text-sm leading-6 text-slate-800" role="note">
        Frontend filtering and local read state are not authorization or persistence boundaries. The future backend must derive member identity from authentication, return only messages addressed to that member, verify ownership before detail access or read updates, reject client-supplied member IDs, protect staff-only data, and allow creation only through authorized staff operations.
      </div>

      {messageRecords === null ? (
        <Card className="mt-8 max-w-3xl">
          <CardContent className="text-slate-600">Messages from CRC are unavailable until secure backend integration is connected.</CardContent>
        </Card>
      ) : (
        <div className="mt-8 min-w-0 space-y-6">
          <div className="grid min-w-0 gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
            <div className="min-w-0 space-y-2">
              <Label htmlFor="member-message-filter">Read status</Label>
              <NativeSelect className="w-full min-w-0" id="member-message-filter" onChange={(event) => setFilter(event.target.value)} value={filter}>
                <NativeSelectOption value={MEMBER_MESSAGE_FILTERS.ALL}>All messages</NativeSelectOption>
                <NativeSelectOption value={MEMBER_MESSAGE_FILTERS.UNREAD}>Unread</NativeSelectOption>
                <NativeSelectOption value={MEMBER_MESSAGE_FILTERS.READ}>Read</NativeSelectOption>
              </NativeSelect>
            </div>
            <Button className="w-full sm:w-auto" disabled={filter === MEMBER_MESSAGE_FILTERS.ALL} onClick={() => setFilter(MEMBER_MESSAGE_FILTERS.ALL)} type="button" variant="outline">Clear filter</Button>
          </div>
          <MemberMessageList messages={filteredMessages} />
        </div>
      )}
    </section>
  )
}

export default MemberMessagesPage
