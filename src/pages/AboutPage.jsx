import {
  BellRing,
  Building2,
  CheckCircle2,
  CircleUserRound,
  ClipboardList,
  MessageSquareText,
  Network,
  Send,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader } from '@/components/ui/card'

const purposes = [
  'Cyber awareness',
  'Structured incident reporting',
  'Stakeholder coordination',
  'Distribution of relevant advisories and alerts',
  'Resilience and preparedness',
]

const objectives = [
  'Improve cyber awareness',
  'Encourage timely incident reporting',
  'Support coordinated communication',
  'Share relevant advisories',
  'Build stakeholder participation',
]

const participantCategories = [
  {
    title: 'Organizations',
    description: 'Institutions seeking to take part in coordinated cyber-resilience and awareness efforts.',
    icon: Building2,
  },
  {
    title: 'Cybersecurity volunteers',
    description: 'Eligible volunteers interested in contributing relevant knowledge, skills and time.',
    icon: UserRound,
  },
  {
    title: 'Individual citizens',
    description: 'Citizens seeking access to CRC participation, advisories and incident-reporting facilities.',
    icon: CircleUserRound,
  },
]

const participationSteps = [
  {
    title: 'Submit registration details',
    description: 'Select the appropriate category and provide the requested registration information.',
  },
  {
    title: 'CRC verification',
    description: 'CRC reviews the submitted details and verifies eligibility for portal participation.',
  },
  {
    title: 'Account activation',
    description: 'An account is activated only after the verification and approval process is complete.',
  },
  {
    title: 'Access the authenticated portal',
    description: 'Approved participants can sign in and use the portal features available to their account.',
  },
]

const portalServices = [
  {
    title: 'Incident submission and tracking',
    description: 'Submit incident information and follow its status within the authenticated portal.',
    icon: ClipboardList,
  },
  {
    title: 'CRC responses and messages',
    description: 'View communications associated with portal activity and submitted information.',
    icon: MessageSquareText,
  },
  {
    title: 'Advisories and notifications',
    description: 'Receive relevant cyber-resilience information shared through the portal.',
    icon: BellRing,
  },
  {
    title: 'Profile management',
    description: 'Review and maintain participant account information after access is approved.',
    icon: CircleUserRound,
  },
]

function AboutPage() {
  return (
    <div className="space-y-20 md:space-y-28">
      <section className="max-w-4xl" aria-labelledby="about-title">
        <p className="mb-4 text-sm font-semibold tracking-widest text-blue-700 uppercase">
          About CRC
        </p>
        <h1
          className="text-4xl leading-tight font-bold tracking-tight text-slate-950 sm:text-5xl md:text-6xl"
          id="about-title"
        >
          About the Cyber Resilient Centre
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          The Cyber Resilient Centre is intended to support cooperation among citizens,
          volunteers, organizations and CRC personnel in strengthening shared cyber resilience.
          The public portal provides a structured starting point for participation and access.
        </p>
      </section>

      <section className="grid gap-10 border-t border-slate-200 pt-16 lg:grid-cols-5 lg:gap-16" aria-labelledby="purpose-title">
        <div className="lg:col-span-2">
          <p className="text-sm font-semibold tracking-widest text-blue-700 uppercase">Purpose</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950" id="purpose-title">
            Practical foundations for cooperation
          </h2>
          <p className="mt-5 leading-7 text-slate-600">
            CRC is designed around clear communication, informed participation and preparedness.
          </p>
        </div>
        <ul className="grid list-none gap-3 p-0 sm:grid-cols-2 lg:col-span-3">
          {purposes.map((purpose) => (
            <li className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4" key={purpose}>
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-blue-700" aria-hidden="true" />
              <span className="font-medium text-slate-800">{purpose}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="mission-title">
        <Card className="border border-blue-200 bg-blue-50 ring-0">
          <CardHeader className="max-w-4xl py-4">
            <ShieldCheck className="mb-3 size-7 text-blue-700" aria-hidden="true" />
            <p className="text-sm font-semibold tracking-widest text-blue-700 uppercase">Mission</p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-950" id="mission-title">
              Support a safer, informed and resilient digital ecosystem
            </h2>
            <CardDescription className="mt-3 text-base leading-7 text-slate-700">
              Encourage awareness, responsible reporting, coordinated communication and active
              stakeholder participation in cyber resilience.
            </CardDescription>
          </CardHeader>
        </Card>
      </section>

      <section aria-labelledby="objectives-title">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-widest text-blue-700 uppercase">Objectives</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950" id="objectives-title">
            Core objectives
          </h2>
        </div>
        <ul className="mt-10 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-5">
          {objectives.map((objective, index) => (
            <li className="rounded-xl border border-slate-200 bg-white p-5" key={objective}>
              <span className="text-sm font-bold text-blue-700">0{index + 1}</span>
              <p className="mt-3 font-semibold leading-6 text-slate-900">{objective}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="participants-title">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-widest text-blue-700 uppercase">Participation</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950" id="participants-title">
            Who can participate
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Registration pathways are planned for the following stakeholder groups.
          </p>
        </div>
        <ul className="mt-10 grid list-none gap-4 p-0 md:grid-cols-3">
          {participantCategories.map(({ title, description, icon: Icon }) => (
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

      <section aria-labelledby="participation-process-title">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-widest text-blue-700 uppercase">Process</p>
          <h2
            className="mt-3 text-3xl font-bold tracking-tight text-slate-950"
            id="participation-process-title"
          >
            How participation works
          </h2>
        </div>
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {participationSteps.map(({ title, description }, index) => (
            <li className="border-l-2 border-blue-200 pl-5" key={title}>
              <span className="text-sm font-bold text-blue-700">Step {index + 1}</span>
              <h3 className="mt-2 text-lg font-semibold text-slate-950">{title}</h3>
              <p className="mt-2 leading-7 text-slate-600">{description}</p>
            </li>
          ))}
        </ol>
        <aside className="mt-8 flex gap-3 rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-950">
          <Send className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <p className="leading-6">
            Registration submission does not immediately activate an account. CRC verification and
            approval must be completed before portal access is enabled.
          </p>
        </aside>
      </section>

      <section aria-labelledby="services-title">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-widest text-blue-700 uppercase">Portal</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950" id="services-title">
            Portal services
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            These portal features are available only to approved, authenticated users.
          </p>
        </div>
        <ul className="mt-10 grid list-none gap-4 p-0 sm:grid-cols-2">
          {portalServices.map(({ title, description, icon: Icon }) => (
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

      <section
        className="rounded-xl border border-slate-300 bg-white px-6 py-10 sm:px-10"
        aria-labelledby="about-cta-title"
      >
        <div className="max-w-3xl">
          <Network className="mb-4 size-7 text-blue-700" aria-hidden="true" />
          <h2 className="text-3xl font-bold tracking-tight text-slate-950" id="about-cta-title">
            Take part in CRC
          </h2>
          <p className="mt-3 text-lg leading-7 text-slate-600">
            Submit a registration request to begin the verification process, or return to the CRC
            public landing page.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button className="h-10 px-5" nativeButton={false} render={<Link to="/register" />}>
              Submit registration request
            </Button>
            <Button
              className="h-10 px-5"
              nativeButton={false}
              render={<Link to="/" />}
              variant="outline"
            >
              Back to home
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
