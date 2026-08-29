import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <section className="max-w-3xl" aria-labelledby="not-found-title">
      <h1 className="mb-4 text-4xl leading-tight font-bold tracking-tight md:text-6xl" id="not-found-title">
        Page not found
      </h1>
      <p className="text-lg leading-7 text-slate-600">The page you requested does not exist.</p>
      <Link
        className="mt-6 inline-block font-semibold text-slate-700 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-blue-600"
        to="/"
      >
        Return home
      </Link>
    </section>
  )
}

export default NotFoundPage
