import { z } from 'zod'

export const INCIDENT_CATEGORIES = [
  'Phishing or suspicious communication',
  'Malware or ransomware',
  'Account compromise',
  'Financial or online fraud',
  'Data exposure or data breach',
  'Website or application attack',
  'Unauthorized access',
  'Social-media incident',
  'Cyber harassment or impersonation',
  'Other',
]

export const INCIDENT_STATUS_OPTIONS = ['Yes', 'No', 'Unknown']
export const CONTACT_METHOD_OPTIONS = ['Registered email', 'Registered mobile', 'Either']

const optionalTrimmedText = (maximum, message) =>
  z.string().trim().max(maximum, message).optional()

const optionalTime = z.union([
  z.literal(''),
  z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Enter a valid time.'),
])

const optionalFinancialLoss = z.union([
  z.literal(''),
  z
    .string()
    .trim()
    .regex(
      /^(?:0|[1-9]\d*)(?:\.\d{1,2})?$/,
      'Enter a valid non-negative amount with no more than 2 decimal places.',
    ),
])

export const incidentReportSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Enter an incident title.')
    .min(5, 'Incident title must contain at least 5 characters.')
    .max(150, 'Incident title must not exceed 150 characters.'),
  category: z.enum(INCIDENT_CATEGORIES, {
    error: 'Select an incident category.',
  }),
  dateDetected: z
    .string()
    .min(1, 'Enter the date the incident was detected.')
    .pipe(z.iso.date({ error: 'Enter a valid detection date.' })),
  timeDetected: optionalTime,
  description: z
    .string()
    .trim()
    .min(1, 'Describe the incident.')
    .min(20, 'Detailed description must contain at least 20 characters.')
    .max(3000, 'Detailed description must not exceed 3000 characters.'),
  affectedSystem: z
    .string()
    .trim()
    .min(1, 'Enter the affected system or service.')
    .min(3, 'Affected system or service must contain at least 3 characters.')
    .max(300, 'Affected system or service must not exceed 300 characters.'),
  isOngoing: z.enum(INCIDENT_STATUS_OPTIONS, {
    error: 'Select whether the incident is ongoing.',
  }),
  operationalImpact: z
    .string()
    .trim()
    .min(1, 'Describe the operational impact.')
    .min(10, 'Operational impact must contain at least 10 characters.')
    .max(1500, 'Operational impact must not exceed 1500 characters.'),
  financialLoss: optionalFinancialLoss,
  actionsTaken: optionalTrimmedText(
    1500,
    'Actions already taken must not exceed 1500 characters.',
  ),
  technicalIndicators: optionalTrimmedText(
    2000,
    'Technical indicators must not exceed 2000 characters.',
  ),
  preferredContactMethod: z.enum(CONTACT_METHOD_OPTIONS, {
    error: 'Select a preferred contact method.',
  }),
})
