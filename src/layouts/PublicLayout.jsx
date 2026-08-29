import { NavLink, Outlet } from 'react-router'

const navigationItems = [
  { label: 'Home', to: '/' },
  { label: 'About CRC', to: '/about' },
  { label: 'Register', to: '/register' },
  { label: 'Login', to: '/login' },
]

function PublicLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between md:gap-8">
          <div className="grid gap-0.5">
            <span className="text-lg font-bold">Cyber Resilient Centre</span>
            <span className="text-sm text-slate-600">Kerala Police</span>
          </div>

          <nav aria-label="Primary navigation">
            <ul className="m-0 flex list-none flex-wrap gap-x-4 gap-y-2 p-0 md:gap-1">
              {navigationItems.map(({ label, to }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                      `block rounded-md py-2 font-semibold text-slate-700 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-blue-600 md:px-3 ${
                        isActive ? 'text-blue-700' : ''
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 md:py-24">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 px-4 py-5 text-center text-slate-500">
        <p>Cyber Resilient Centre, Kerala Police</p>
      </footer>
    </div>
  )
}

export default PublicLayout
