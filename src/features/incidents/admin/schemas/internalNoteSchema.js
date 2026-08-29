import { z } from 'zod'

export const internalNoteSchema = z.object({
  note: z
    .string()
    .trim()
    .min(1, 'Enter an internal note.')
    .min(10, 'Internal note must contain at least 10 characters.')
    .max(2000, 'Internal note must not exceed 2000 characters.'),
})
