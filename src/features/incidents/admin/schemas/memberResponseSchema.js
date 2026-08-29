import { z } from 'zod'

export const memberResponseSchema = z.object({
  response: z
    .string()
    .trim()
    .min(1, 'Enter a response to the member.')
    .min(10, 'Member response must contain at least 10 characters.')
    .max(2000, 'Member response must not exceed 2000 characters.'),
})
