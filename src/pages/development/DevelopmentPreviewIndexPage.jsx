import { Link } from 'react-router'
import DevelopmentPreviewBanner from '@/components/development/DevelopmentPreviewBanner'

const previewLinks = [
  {
    to: '/dev/previews/member',
    label: 'Preview the member portal placeholder',
  },
  {
    to: '/dev/previews/staff',
    label: 'Preview the staff portal placeholder',
  },
]

function DevelopmentPreviewIndexPage() {
  return (
    <>
      <DevelopmentPreviewBanner />
      <main className="mx-auto w-full max-w-4xl px-4 py-12 md:py-20">
        <section aria-labelledby="development-previews-title">
          <p className="mb-3 text-sm font-semibold tracking-widest text-blue-700 uppercase">
            Local development
          </p>
          <h1
            className="text-4xl leading-tight font-bold tracking-tight text-slate-950 md:text-6xl"
            id="development-previews-title"
          >
            Frontend development previews
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            These routes exist only for local interface development and do not create an
            authenticated or authorized session.
          </p>

          <nav className="mt-8" aria-label="Development previews">
            <ul className="grid list-none gap-4 p-0 sm:grid-cols-2">
              {previewLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    className="block rounded-xl border border-slate-200 bg-white p-5 font-semibold text-blue-700 hover:border-blue-300 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-blue-600"
                    to={to}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </section>
      </main>
    </>
  )
}

export default DevelopmentPreviewIndexPage
