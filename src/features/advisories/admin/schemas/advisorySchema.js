import { z } from 'zod'
import { ACCOUNT_TYPES } from '../../../../constants/roles.js'
import {
  ADVISORY_AUDIENCES,
  ADVISORY_CATEGORIES,
} from '../../../../constants/advisoryAudiences.js'

const accountCategories = Object.values(ACCOUNT_TYPES)

export const advisorySchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, 'Enter an advisory title.')
      .min(5, 'Advisory title must contain at least 5 characters.')
      .max(200, 'Advisory title must not exceed 200 characters.'),
    category: z.enum(ADVISORY_CATEGORIES, { error: 'Select an advisory category.' }),
    summary: z
      .string()
      .trim()
      .min(1, 'Enter an advisory summary.')
      .min(20, 'Advisory summary must contain at least 20 characters.')
      .max(500, 'Advisory summary must not exceed 500 characters.'),
    content: z
      .string()
      .trim()
      .min(1, 'Enter advisory content.')
      .min(50, 'Advisory content must contain at least 50 characters.')
      .max(5000, 'Advisory content must not exceed 5000 characters.'),
    audience: z.enum(Object.values(ADVISORY_AUDIENCES), {
      error: 'Select an intended audience.',
    }),
    accountCategories: z.array(z.enum(accountCategories)).default([]),
  })
  .superRefine((values, context) => {
    if (
      values.audience === ADVISORY_AUDIENCES.ACCOUNT_CATEGORIES &&
      values.accountCategories.length === 0
    ) {
      context.addIssue({
        code: 'custom',
        message: 'Select at least one account category.',
        path: ['accountCategories'],
      })
    }
  })
  .transform((values) => ({
    ...values,
    accountCategories:
      values.audience === ADVISORY_AUDIENCES.ALL_APPROVED_MEMBERS
        ? []
        : values.accountCategories,
  }))
