import { z } from 'zod'

export const rejectionReasonSchema = z.object({
  reason: z
    .string()
    .trim()
    .min(1, 'Enter a rejection reason.')
    .min(10, 'Rejection reason must contain at least 10 characters.')
    .max(500, 'Rejection reason must not exceed 500 characters.'),
})
