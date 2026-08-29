import { Info } from 'lucide-react'
import { Link, useSearchParams } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import AccountActivationForm from '@/features/auth/components/AccountActivationForm.jsx'

function AccountActivationPage() {
  const [searchParams] = useSearchParams()
  const hasToken = Boolean(searchParams.get('token')?.trim())

  return <section className="mx-auto min-w-0 max-w-md" aria-labelledby="account-activation-title">
    <p className="mb-3 text-sm font-semibold tracking-widest text-blue-700 uppercase">CRC account</p>
    <h1 className="text-4xl leading-tight font-bold tracking-tight text-slate-950 md:text-5xl" id="account-activation-title">Activate your account</h1>
    <p className="mt-5 text-lg leading-8 text-slate-600">Create a password after CRC approval using the activation link supplied to you.</p>

    <aside className="mt-8 flex min-w-0 gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 text-blue-950">
      <Info className="mt-0.5 size-5 shrink-0 text-blue-700" aria-hidden="true" />
      <p className="min-w-0 break-words leading-6">The future backend must verify that the short-lived link exists, is unexpired, unrevoked, single-use, and linked to an approved registration with an inactive account. Frontend token presence and password validation are not security boundaries.</p>
    </aside>

    <Card className="mt-8 min-w-0">
      <CardContent>
        {hasToken ? <AccountActivationForm /> : <div role="alert">
          <h2 className="text-lg font-semibold text-slate-950">Activation link is missing or invalid.</h2>
          <p className="mt-2 break-words leading-7 text-slate-600">Use the activation link provided after CRC approval. Only the future backend can determine whether a present link is valid, expired, already used, or revoked.</p>
        </div>}
      </CardContent>
    </Card>

    <p className="mt-6 text-sm leading-6 text-slate-600">The future backend must store only a cryptographic token hash, validate purpose and account state, atomically consume the token, hash the password with an approved algorithm, rate-limit attempts, return generic failures, audit successful activation, revoke other activation tokens, and never log tokens or passwords.</p>

    <div className="mt-6 flex flex-col items-stretch gap-2 sm:flex-row sm:justify-center">
      <Button nativeButton={false} render={<Link to="/login" />} variant="link">Go to Login</Button>
      <Button nativeButton={false} render={<Link to="/" />} variant="link">Return to public home</Button>
    </div>
  </section>
}

export default AccountActivationPage
