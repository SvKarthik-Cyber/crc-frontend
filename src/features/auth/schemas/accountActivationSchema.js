import { z } from 'zod'

export const accountActivationSchema = z
  .object({
    password: z
      .string()
      .min(1, 'Enter a new password.')
      .min(12, 'Password must contain at least 12 characters.')
      .max(128, 'Password must not exceed 128 characters.'),
    confirmPassword: z
      .string()
      .min(1, 'Confirm your new password.')
      .max(128, 'Password confirmation must not exceed 128 characters.'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Passwords must match exactly.',
    path: ['confirmPassword'],
  })
