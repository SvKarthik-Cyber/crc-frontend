import {
  House,
  ShieldCheck,
} from 'lucide-react'
import { Link, NavLink, Outlet } from 'react-router'
import { useAppSelector } from '@/app/hooks'
import { selectCurrentUser } from '@/features/auth/state/authSlice'
import {
  getVisibleStaffDestinations,
  staffDestinations,
} from '@/features/staff/navigation/staffDestinations'

function StaffLayout({ developmentPreview = false }) {
  const user = useAppSelector(selectCurrentUser)
  const visibleDestinations = getVisibleStaffDestinations(
    staffDestinations,
    user?.role,
    developmentPreview,
  )
  return (
    <div className="flex min-h-svh min-w-0 flex-col bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-6 px-4 py-5 sm:px-6">
          <div className="grid min-w-0 gap-0.5">
            <span className="text-lg font-bold">Cyber Resilient Centre</span>
            <span className="inline-flex items-center gap-1.5 text-sm text-slate-600">
              <ShieldCheck className="size-4" aria-hidden="true" />
              Staff Portal
            </span>
          </div>
          <Link
            className="inline-flex items-center gap-2 rounded-md font-semibold text-slate-700 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-blue-600"
            to="/"
          >
            <House className="size-4" aria-hidden="true" />
            Public home
          </Link>
        </div>
      </header>

      <div className="mx-auto grid min-w-0 w-full max-w-7xl flex-1 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <aside className="min-w-0 border-b border-slate-200 bg-white px-4 py-4 lg:border-r lg:border-b-0 lg:px-6 lg:py-8">
          <nav className="min-w-0" aria-label="Staff portal navigation">
            <ul className="flex w-full max-w-full list-none gap-2 overflow-x-auto p-0 lg:flex-col lg:overflow-visible">
              {visibleDestinations.map(({ label, to, end, icon: Icon }) => (
                <li className="shrink-0" key={to}>
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold whitespace-nowrap hover:bg-slate-100 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                        isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
                      }`
                    }
                    end={end}
                    to={to}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="min-w-0 px-4 py-10 sm:px-6 lg:px-10 lg:py-12">
          <Outlet />
        </main>
      </div>

      <footer className="border-t border-slate-200 bg-white px-4 py-5 text-center text-sm text-slate-500">
        <p>Cyber Resilient Centre Staff Portal</p>
      </footer>
    </div>
  )
}

export default StaffLayout
