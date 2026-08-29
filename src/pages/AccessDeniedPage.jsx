import { Link } from 'react-router'

function AccessDeniedPage() {
  return (
    <section className="max-w-3xl" aria-labelledby="access-denied-title">
      <p className="mb-3 text-sm font-semibold tracking-widest text-blue-700 uppercase">
        Authorization
      </p>
      <h1
        className="text-4xl leading-tight font-bold tracking-tight text-slate-950 md:text-6xl"
        id="access-denied-title"
      >
        Access denied
      </h1>
      <p className="mt-5 text-lg leading-8 text-slate-600">
        This account does not have permission to access the requested area.
      </p>
      <Link
        className="mt-6 inline-block rounded-md font-semibold text-blue-700 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-blue-600"
        to="/"
      >
        Return to the CRC home page
      </Link>
    </section>
  )
}

export default AccessDeniedPage
