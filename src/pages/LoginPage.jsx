import { Info } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import LoginForm from '@/features/auth/components/LoginForm.jsx'

function LoginPage() {
  return (
    <section className="mx-auto max-w-md" aria-labelledby="login-title">
      <p className="mb-3 text-sm font-semibold tracking-widest text-blue-700 uppercase">
        CRC portal
      </p>
      <h1
        className="text-4xl leading-tight font-bold tracking-tight text-slate-950 md:text-5xl"
        id="login-title"
      >
        Member login
      </h1>
      <p className="mt-5 text-lg leading-8 text-slate-600">
        Login is available only after CRC verification, approval and account activation.
      </p>

      <aside className="mt-8 flex gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 text-blue-950">
        <Info className="mt-0.5 size-5 shrink-0 text-blue-700" aria-hidden="true" />
        <p className="leading-6">
          Registration submission does not provide immediate access. Use activated account
          credentials only after CRC approval.
        </p>
      </aside>

      <Card className="mt-8">
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>

      <div className="mt-6 text-center">
        <p className="text-sm text-slate-600">Have not submitted a registration request?</p>
        <Button
          className="mt-2 px-0"
          nativeButton={false}
          render={<Link to="/register" />}
          variant="link"
        >
          View registration categories
        </Button>
      </div>
    </section>
  )
}

export default LoginPage
