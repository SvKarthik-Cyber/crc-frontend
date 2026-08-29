import { BookOpenText, CircleUserRound, FolderKanban, MessagesSquare } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader } from '@/components/ui/card'

const dashboardLinks = [
  {
    title: 'Profile',
    description: 'Review the profile area prepared for approved member information.',
    to: 'profile',
    icon: CircleUserRound,
  },
  {
    title: 'My Incidents',
    description: 'Access the area intended for submitted incident information and status.',
    to: 'incidents',
    icon: FolderKanban,
  },
  {
    title: 'Advisories',
    description: 'View the area where relevant CRC advisories will be made available.',
    to: 'advisories',
    icon: BookOpenText,
  },
  {
    title: 'Messages from CRC',
    description: 'Open the area intended for authenticated CRC communication.',
    to: 'messages',
    icon: MessagesSquare,
  },
]

function MemberDashboardPage() {
  return (
    <section className="min-w-0" aria-labelledby="member-dashboard-title">
      <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl" id="member-dashboard-title">
        Member dashboard
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
        This area will provide approved members with access to their CRC services after backend
        integration.
      </p>

      <ul className="mt-10 grid min-w-0 list-none gap-4 p-0 sm:grid-cols-2">
        {dashboardLinks.map(({ title, description, to, icon: Icon }) => (
          <li className="min-w-0" key={to}>
            <Card className="h-full min-w-0">
              <CardHeader className="min-w-0">
                <Icon className="mb-3 size-6 text-blue-700" aria-hidden="true" />
                <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
                <CardDescription className="leading-6">{description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button
                  className="w-full"
                  nativeButton={false}
                  render={<Link to={to} />}
                  variant="outline"
                >
                  Open {title}
                </Button>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default MemberDashboardPage
