import { Card, CardContent } from '@/components/ui/card'
import ChangePasswordForm from '@/features/auth/components/ChangePasswordForm.jsx'

function ChangePasswordPage() {
  return (
    <section className="mx-auto min-w-0 max-w-md" aria-labelledby="change-password-title">
      <p className="mb-3 text-sm font-semibold tracking-widest text-blue-700 uppercase">CRC account</p>
      <h1
        className="text-4xl leading-tight font-bold tracking-tight text-slate-950 md:text-5xl"
        id="change-password-title"
      >
        Set a new password
      </h1>
      <p className="mt-5 text-lg leading-8 text-slate-600">
        You logged in with a temporary password. Choose a new password to finish setting up your account.
      </p>

      <Card className="mt-8 min-w-0">
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </section>
  )
}

export default ChangePasswordPage
