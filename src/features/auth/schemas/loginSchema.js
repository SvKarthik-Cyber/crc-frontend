import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Enter your email address.')
    .pipe(z.email({ error: 'Enter a valid email address.' })),
  password: z
    .string()
    .min(1, 'Enter your password.')
    .max(128, 'Password must not exceed 128 characters.'),
})
