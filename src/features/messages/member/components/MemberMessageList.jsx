import { ArrowRight, MailX } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { formatMemberMessageDate, MEMBER_MESSAGE_SENDER } from '../memberMessageFormatters.js'

function MemberMessageList({ messages }) {
  if (messages.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <MailX className="mx-auto size-8 text-slate-500" aria-hidden="true" />
          <h2 className="mt-4 text-lg font-semibold text-slate-950">No messages found</h2>
          <p className="mt-2 text-slate-600">No messages match the selected read-status filter.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <ul className="grid min-w-0 gap-4" aria-label="Messages from CRC">
      {messages.map((message) => {
        const isUnread = message.readAt === null

        return (
          <li className="min-w-0" key={message.id}>
            <article>
              <Card className="min-w-0">
                <CardContent className="grid min-w-0 gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
                  <div className="min-w-0">
                    <header className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-medium text-slate-600">Sender: {MEMBER_MESSAGE_SENDER}</p>
                        <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${isUnread ? 'border-blue-300 bg-blue-50 text-blue-900' : 'border-slate-300 bg-white text-slate-700'}`}>{isUnread ? 'Unread' : 'Read'}</span>
                      </div>
                      <h2 className="mt-3 break-words text-lg font-semibold text-slate-950">{message.subject}</h2>
                    </header>
                    <p className="mt-2 break-words leading-7 text-slate-700">{message.preview}</p>
                    <p className="mt-3 text-sm text-slate-500"><span className="sr-only">Sent </span><time dateTime={message.sentAt}>{formatMemberMessageDate(message.sentAt)}</time></p>
                  </div>
                  <Button nativeButton={false} render={<Link to={message.id} />} variant="outline">
                    Read message: {message.subject} <ArrowRight aria-hidden="true" />
                  </Button>
                </CardContent>
              </Card>
            </article>
          </li>
        )
      })}
    </ul>
  )
}

export default MemberMessageList
