import { ArrowLeft, Info } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import VolunteerRegistrationForm from '@/features/registration/components/VolunteerRegistrationForm.jsx'

function VolunteerRegistrationPage() {
  return (
    <section className="max-w-4xl" aria-labelledby="volunteer-registration-title">
      <Button
        className="mb-8 px-0"
        nativeButton={false}
        render={<Link to="/register" />}
        variant="link"
      >
        <ArrowLeft aria-hidden="true" />
        Back to registration categories
      </Button>

      <p className="mb-3 text-sm font-semibold tracking-widest text-blue-700 uppercase">
        Cybersecurity volunteer
      </p>
      <h1
        className="text-4xl leading-tight font-bold tracking-tight text-slate-950 md:text-5xl"
        id="volunteer-registration-title"
      >
        Volunteer registration request
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
        Provide your background, skills and availability for frontend validation. This form is not
        connected to backend submission yet.
      </p>

      <aside className="mt-8 flex max-w-2xl gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 text-blue-950">
        <Info className="mt-0.5 size-5 shrink-0 text-blue-700" aria-hidden="true" />
        <p className="leading-6">
          Account access requires CRC verification and approval. Completing this form does not
          immediately activate an account.
        </p>
      </aside>

      <Card className="mt-10">
        <CardContent>
          <VolunteerRegistrationForm />
        </CardContent>
      </Card>
    </section>
  )
}

export default VolunteerRegistrationPage
