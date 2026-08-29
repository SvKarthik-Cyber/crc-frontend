import { Link } from 'react-router'
import { useAppSelector } from '@/app/hooks'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader } from '@/components/ui/card'
import { selectCurrentUser } from '@/features/auth/state/authSlice'
import {
  getVisibleStaffDestinations,
  staffDestinations,
} from '@/features/staff/navigation/staffDestinations'

function StaffDashboardPage({ developmentPreview = false }) {
  const user = useAppSelector(selectCurrentUser)
  const dashboardDestinations = getVisibleStaffDestinations(
    staffDestinations,
    user?.role,
    developmentPreview,
  ).filter(({ description }) => Boolean(description))
  return (
    <section className="min-w-0" aria-labelledby="staff-dashboard-title">
      <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl" id="staff-dashboard-title">
        CRC staff dashboard
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
        This workspace is intended for authorized CRC personnel. Staff functions will become
        available after backend integration.
      </p>

      <ul className="mt-10 grid min-w-0 list-none gap-4 p-0 sm:grid-cols-2">
        {dashboardDestinations.map(({ label, dashboardLabel, description, to, icon: Icon }) => {
          const title = dashboardLabel ?? label

          return (
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
          )
        })}
      </ul>
    </section>
  )
}

export default StaffDashboardPage
