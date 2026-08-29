import { z } from 'zod'
import { KERALA_DISTRICTS } from '../../../constants/districts.js'

export const organizationRegistrationSchema = z.object({
  organizationName: z
    .string()
    .trim()
    .min(1, 'Enter the organization name.')
    .min(2, 'Organization name must contain at least 2 characters.')
    .max(150, 'Organization name must not exceed 150 characters.'),
  organizationType: z
    .string()
    .trim()
    .min(1, 'Enter the organization type.')
    .min(2, 'Organization type must contain at least 2 characters.')
    .max(100, 'Organization type must not exceed 100 characters.'),
  sector: z
    .string()
    .trim()
    .min(1, 'Enter the sector.')
    .min(2, 'Sector must contain at least 2 characters.')
    .max(100, 'Sector must not exceed 100 characters.'),
  contactPerson: z
    .string()
    .trim()
    .min(1, 'Enter the contact person name.')
    .min(2, 'Contact person name must contain at least 2 characters.')
    .max(100, 'Contact person name must not exceed 100 characters.'),
  designation: z
    .string()
    .trim()
    .min(1, 'Enter the designation.')
    .min(2, 'Designation must contain at least 2 characters.')
    .max(100, 'Designation must not exceed 100 characters.'),
  email: z
    .string()
    .trim()
    .min(1, 'Enter the email address.')
    .pipe(z.email({ error: 'Enter a valid email address.' })),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .max(128, 'Password must not exceed 128 characters.'),
  mobile: z
    .string()
    .trim()
    .min(1, 'Enter the mobile number.')
    .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number beginning with 6, 7, 8 or 9.'),
  address: z
    .string()
    .trim()
    .min(1, 'Enter the organization address.')
    .min(10, 'Address must contain at least 10 characters.')
    .max(500, 'Address must not exceed 500 characters.'),
  district: z.enum(KERALA_DISTRICTS, {
    error: 'Select a Kerala district.',
  }),
})