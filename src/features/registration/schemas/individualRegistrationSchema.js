import { z } from 'zod'
import { KERALA_DISTRICTS } from '../../../constants/districts.js'

export const individualRegistrationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, 'Enter your full name.')
    .min(2, 'Full name must contain at least 2 characters.')
    .max(100, 'Full name must not exceed 100 characters.'),
  email: z
    .string()
    .trim()
    .min(1, 'Enter your email address.')
    .pipe(z.email({ error: 'Enter a valid email address.' })),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .max(128, 'Password must not exceed 128 characters.'),
  mobile: z
    .string()
    .trim()
    .min(1, 'Enter your mobile number.')
    .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number beginning with 6, 7, 8 or 9.'),
  district: z.enum(KERALA_DISTRICTS, {
    error: 'Select a Kerala district.',
  }),
  occupation: z
    .string()
    .trim()
    .min(1, 'Enter your occupation.')
    .min(2, 'Occupation must contain at least 2 characters.')
    .max(100, 'Occupation must not exceed 100 characters.'),
})