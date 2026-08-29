import { describe, expect, it } from 'vitest'
import { accountActivationSchema } from '../accountActivationSchema.js'
import { loginSchema } from '../loginSchema.js'

describe('authentication schemas', () => {
  it('trims login email but preserves password whitespace', () => {
    const result = loginSchema.parse({ email: '  member@example.invalid  ', password: ' passphrase ' })
    expect(result).toEqual({ email: 'member@example.invalid', password: ' passphrase ' })
  })

  it('rejects invalid email and required login values', () => {
    expect(loginSchema.safeParse({ email: 'invalid', password: 'password' }).success).toBe(false)
    expect(loginSchema.safeParse({ email: '', password: '' }).success).toBe(false)
  })

  it('accepts matching activation passwords at the length boundaries', () => {
    for (const password of ['x'.repeat(12), 'x'.repeat(128)]) {
      expect(accountActivationSchema.safeParse({ password, confirmPassword: password }).success).toBe(true)
    }
  })

  it('rejects short, overlong, and mismatched activation passwords', () => {
    expect(accountActivationSchema.safeParse({ password: 'x'.repeat(11), confirmPassword: 'x'.repeat(11) }).success).toBe(false)
    expect(accountActivationSchema.safeParse({ password: 'x'.repeat(129), confirmPassword: 'x'.repeat(129) }).success).toBe(false)
    expect(accountActivationSchema.safeParse({ password: 'validpassword', confirmPassword: 'differentpass' }).success).toBe(false)
  })

  it('does not trim activation passwords', () => {
    const password = ' validpass12 '
    expect(accountActivationSchema.parse({ password, confirmPassword: password }).password).toBe(password)
    expect(accountActivationSchema.safeParse({ password, confirmPassword: password.trim() }).success).toBe(false)
  })
})
