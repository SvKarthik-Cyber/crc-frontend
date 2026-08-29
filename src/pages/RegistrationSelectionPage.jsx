import { Button } from '@/components/ui/button'
import { Link } from 'react-router'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card'

const registrationTypes = [
  {
    title: 'Organization',
    description: 'Registration for organizations is available here.',
    path: '/register/organization',
  },
  {
    title: 'Volunteer',
    description: 'Registration for cybersecurity volunteers is available here.',
    path: '/register/volunteer',
  },
  {
    title: 'Individual',
    description: 'Registration for individual citizens is available here.',
    path: '/register/individual',
  },
]

function RegistrationSelectionPage() {
  return (
    <section className="max-w-3xl" aria-labelledby="register-title">
      <h1 className="mb-4 text-4xl leading-tight font-bold tracking-tight md:text-6xl" id="register-title">
        Register
      </h1>
      <p className="text-lg leading-7 text-slate-600">
        Select a registration category.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {registrationTypes.map(({ title, description, path }) => (
          <article key={title}>
            <Card className="h-full">
              <CardHeader>
                <h2 className="text-lg font-semibold">{title}</h2>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button
                  className="w-full"
                  nativeButton={false}
                  render={<Link to={path} />}
                >
                  Register as {title}
                </Button>
              </CardFooter>
            </Card>
          </article>
        ))}
      </div>
    </section>
  )
}

export default RegistrationSelectionPage
