import { z } from 'zod'

// Matches backend changePasswordSchema exactly (src/middleware/validate.js) -
// min 8 characters, nothing stricter than that is enforced server-side.
export const changePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, 'Enter a new password.')
      .min(8, 'Password must be at least 8 characters.')
      .max(128, 'Password must not exceed 128 characters.'),
    confirmPassword: z
      .string()
      .min(1, 'Confirm your new password.')
      .max(128, 'Password confirmation must not exceed 128 characters.'),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: 'Passwords must match exactly.',
    path: ['confirmPassword'],
  })
