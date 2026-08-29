import { Card, CardContent } from '@/components/ui/card'

function StaffMessagesPage() {
  return (
    <section className="min-w-0" aria-labelledby="staff-messages-title">
      <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl" id="staff-messages-title">
        Messages
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
        This area will support future authorized communication between CRC personnel and reporting
        members.
      </p>
      <Card className="mt-8 min-w-0">
        <CardContent className="text-slate-600">
          Conversations and message composition are not connected or available.
        </CardContent>
      </Card>
    </section>
  )
}

export default StaffMessagesPage
