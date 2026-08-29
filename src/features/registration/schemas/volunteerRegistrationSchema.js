import { z } from 'zod'
import { KERALA_DISTRICTS } from '../../../constants/districts.js'

export const volunteerRegistrationSchema = z.object({
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
  occupation: z
    .string()
    .trim()
    .min(1, 'Enter your occupation.')
    .min(2, 'Occupation must contain at least 2 characters.')
    .max(100, 'Occupation must not exceed 100 characters.'),
  cybersecuritySkills: z
    .string()
    .trim()
    .min(1, 'Describe your cybersecurity skills.')
    .min(5, 'Cybersecurity skills must contain at least 5 characters.')
    .max(1000, 'Cybersecurity skills must not exceed 1000 characters.'),
  certifications: z
    .string()
    .trim()
    .max(500, 'Certifications must not exceed 500 characters.')
    .optional(),
  district: z.enum(KERALA_DISTRICTS, {
    error: 'Select a Kerala district.',
  }),
  availability: z
    .string()
    .trim()
    .min(1, 'Describe your availability.')
    .min(2, 'Availability must contain at least 2 characters.')
    .max(200, 'Availability must not exceed 200 characters.'),
})