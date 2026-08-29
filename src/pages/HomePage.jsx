import {
  Building2,
  CheckCircle2,
  CircleUserRound,
  Handshake,
  Info,
  Megaphone,
  Network,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader } from '@/components/ui/card'

const objectives = [
  {
    title: 'Cyber Awareness',
    description: 'Encourage informed and responsible participation in the digital environment.',
    icon: Megaphone,
  },
  {
    title: 'Incident Coordination',
    description: 'Support structured communication and coordination around reported cyber incidents.',
    icon: Network,
  },
  {
    title: 'Stakeholder Collaboration',
    description: 'Bring citizens, volunteers and organizations together around shared cyber-resilience goals.',
    icon: Handshake,
  },
  {
    title: 'Resilience Building',
    description: 'Promote practical preparedness and stronger digital practices across communities.',
    icon: ShieldCheck,
  },
]

const registrationCategories = [
  {
    title: 'Organization',
    description: 'For institutions seeking to participate in CRC coordination and resilience initiatives.',
    icon: Building2,
  },
  {
    title: 'Volunteer',
    description: 'For eligible people interested in contributing their time and relevant capabilities.',
    icon: UserRound,
  },
  {
    title: 'Individual Citizen',
    description: 'For citizens who want to request access to CRC resources and participation opportunities.',
    icon: CircleUserRound,
  },
]

const registrationSteps = [
  {
    title: 'Submit Details',
    description: 'Choose a registration category and provide the requested information when forms become available.',
  },
  {
    title: 'CRC Verification',
    description: 'CRC reviews the submitted information and verifies eligibility before granting access.',
  },
  {
    title: 'Account Activation',
    description: 'Approved applicants receive access after verification has been completed.',
  },
]

function HomePage() {
  return (
    <div className="space-y-20 md:space-y-28">
      <section className="grid items-start gap-10 lg:grid-cols-5 lg:gap-16" aria-labelledby="home-title">
        <div className="lg:col-span-3">
          <p className="mb-4 text-sm font-semibold tracking-widest text-blue-700 uppercase">
            Kerala Police Initiative
          </p>
          <h1
            className="max-w-3xl text-4xl leading-tight font-bold tracking-tight text-slate-950 sm:text-5xl md:text-6xl"
            id="home-title"
          >
            Cyber Resilient Centre
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            CRC connects citizens, volunteers and organizations with cyber-resilience support,
            advisories and incident-response services through a coordinated public portal.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button className="h-10 px-5" nativeButton={false} render={<Link to="/register" />}>
              Register with CRC
            </Button>
            <Button
              className="h-10 px-5"
              nativeButton={false}
              render={<Link to="/login" />}
              variant="outline"
            >
              Member Login
            </Button>
          </div>
        </div>

        <aside
          className="rounded-xl border border-blue-200 bg-blue-50 p-6 lg:col-span-2"
          aria-label="Portal access information"
        >
          <Info className="mb-4 size-6 text-blue-700" aria-hidden="true" />
          <h2 className="text-lg font-semibold text-slate-950">Verified portal access</h2>
          <p className="mt-2 leading-7 text-slate-700">
            Portal access is activated only after CRC verification and approval. Submitting a
            registration request does not create immediate access.
          </p>
        </aside>
      </section>

      <section className="border-t border-slate-200 pt-16" aria-labelledby="about-crc-title">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-widest text-blue-700 uppercase">About CRC</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950" id="about-crc-title">
            Coordinating for stronger cyber resilience
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            The Cyber Resilient Centre aims to strengthen cyber resilience through coordination,
            awareness, incident reporting and meaningful engagement with participating stakeholders.
          </p>
        </div>
      </section>

      <section aria-labelledby="mission-title">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-widest text-blue-700 uppercase">Our mission</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950" id="mission-title">
            A safer and more resilient digital ecosystem
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Build shared awareness, preparedness and cooperation so people and institutions can
            participate in the digital ecosystem with greater resilience.
          </p>
        </div>

        <ul className="mt-10 grid list-none gap-4 p-0 sm:grid-cols-2">
          {objectives.map(({ title, description, icon: Icon }) => (
            <li key={title}>
              <Card className="h-full">
                <CardHeader>
                  <Icon className="mb-3 size-6 text-blue-700" aria-hidden="true" />
                  <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
                  <CardDescription className="leading-6">{description}</CardDescription>
                </CardHeader>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="categories-title">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-widest text-blue-700 uppercase">Registration</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950" id="categories-title">
            Choose the category that fits you
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Begin with the common registration page. Category-specific forms will be introduced later.
          </p>
        </div>

        <ul className="mt-10 grid list-none gap-4 p-0 md:grid-cols-3">
          {registrationCategories.map(({ title, description, icon: Icon }) => (
            <li key={title}>
              <Card className="h-full">
                <CardHeader>
                  <Icon className="mb-3 size-6 text-blue-700" aria-hidden="true" />
                  <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
                  <CardDescription className="leading-6">{description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button
                    className="w-full"
                    nativeButton={false}
                    render={<Link to="/register" />}
                    variant="outline"
                  >
                    Register as {title}
                  </Button>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="process-title">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-widest text-blue-700 uppercase">How it works</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950" id="process-title">
            Registration process
          </h2>
        </div>

        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {registrationSteps.map(({ title, description }, index) => (
            <li className="relative border-l-2 border-blue-200 pl-6" key={title}>
              <span className="text-sm font-bold text-blue-700">Step {index + 1}</span>
              <h3 className="mt-2 text-lg font-semibold text-slate-950">{title}</h3>
              <p className="mt-2 leading-7 text-slate-600">{description}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex gap-3 rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-950">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <p className="leading-6">
            Submitting registration does not immediately activate an account. Access follows CRC
            verification and approval.
          </p>
        </div>
      </section>

      <section
        className="rounded-xl border border-slate-300 bg-white px-6 py-10 sm:px-10"
        aria-labelledby="cta-title"
      >
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-950" id="cta-title">
              Submit a registration request
            </h2>
            <p className="mt-3 text-lg leading-7 text-slate-600">
              Eligible citizens, volunteers and organizations are invited to begin the CRC
              registration process.
            </p>
          </div>
          <Button
            className="h-10 shrink-0 px-5"
            nativeButton={false}
            render={<Link to="/register" />}
          >
            Start registration
          </Button>
        </div>
      </section>
    </div>
  )
}

export default HomePage
