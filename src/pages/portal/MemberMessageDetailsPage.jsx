import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { Button } from '@/components/ui/button'
import MemberMessageDetails from '@/features/messages/member/components/MemberMessageDetails.jsx'

function MemberMessageDetailsPage({ messageRecords = null, previewUpdateNotice = null }) {
  const { messageId } = useParams()
  const message = messageRecords?.find((record) => record.id === messageId)

  if (!message) {
    return (
      <section className="min-w-0" aria-labelledby="member-message-unavailable-title">
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl" id="member-message-unavailable-title">Message unavailable</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">Message not found or unavailable.</p>
        <Button className="mt-6" nativeButton={false} render={<Link relative="path" to=".." />} variant="outline">
          <ArrowLeft aria-hidden="true" /> Back to Messages
        </Button>
      </section>
    )
  }

  return (
    <section className="min-w-0" aria-labelledby="member-message-detail-title">
      <Button nativeButton={false} render={<Link relative="path" to=".." />} variant="outline">
        <ArrowLeft aria-hidden="true" /> Back to Messages
      </Button>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl" id="member-message-detail-title">Message from CRC</h1>
      <div className="mt-8"><MemberMessageDetails message={message} previewUpdateNotice={previewUpdateNotice} /></div>
    </section>
  )
}

export default MemberMessageDetailsPage
