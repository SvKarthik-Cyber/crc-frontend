import { useState } from 'react'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { formatMemberMessageDate, MEMBER_MESSAGE_SENDER } from '../memberMessageFormatters.js'

function MemberMessageDetails({ message, previewUpdateNotice }) {
  const [readAt, setReadAt] = useState(message.readAt)
  const [notice, setNotice] = useState('')
  const isUnread = readAt === null

  function markAsRead() {
    setReadAt(new Date().toISOString())
    setNotice(previewUpdateNotice ?? '')
  }

  return (
    <article className="min-w-0">
      <Card className="min-w-0">
        <CardHeader className="min-w-0 border-b">
          <p className="text-sm font-medium text-slate-600">Sender: {MEMBER_MESSAGE_SENDER}</p>
          <h2 className="break-words text-2xl font-semibold text-slate-950">{message.subject}</h2>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
            <time className="text-slate-500" dateTime={message.sentAt}>Sent {formatMemberMessageDate(message.sentAt)}</time>
            <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${isUnread ? 'border-blue-300 bg-blue-50 text-blue-900' : 'border-slate-300 bg-white text-slate-700'}`}>{isUnread ? 'Unread' : 'Read'}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="whitespace-pre-wrap break-words leading-7 text-slate-800">{message.body}</p>
          {isUnread ? (
            <Button aria-label={`Mark ${message.subject} as read`} onClick={markAsRead} type="button">
              <Check aria-hidden="true" /> Mark as read
            </Button>
          ) : null}
          {notice ? <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-950" role="status">{notice}</div> : null}
        </CardContent>
      </Card>
    </article>
  )
}

export default MemberMessageDetails
