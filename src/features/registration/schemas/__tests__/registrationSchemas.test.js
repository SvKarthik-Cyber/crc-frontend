import { describe, expect, it } from 'vitest'
import { individualRegistrationSchema } from '../individualRegistrationSchema.js'
import { organizationRegistrationSchema } from '../organizationRegistrationSchema.js'
import { volunteerRegistrationSchema } from '../volunteerRegistrationSchema.js'

const individual = {
  fullName: '  Anu Mathew  ', email: '  anu@example.invalid  ', mobile: '9876543210',
  district: 'Ernakulam', occupation: '  Engineer  ',
}
const organization = {
  organizationName: '  Sample Cooperative  ', organizationType: 'Cooperative', sector: 'Finance',
  contactPerson: 'Maya Das', designation: 'Coordinator', email: 'office@example.invalid',
  mobile: '8765432109', address: '  12 Example Road, Kochi  ', district: 'Ernakulam',
}
const volunteer = {
  fullName: '  Dev Nair  ', email: 'dev@example.invalid', mobile: '7654321098',
  occupation: 'Researcher', cybersecuritySkills: '  Incident response  ', certifications: '  Security course  ',
  district: 'Kozhikode', availability: '  Weekends  ',
}

describe('registration schemas', () => {
  it('accepts and trims appropriate individual fields', () => {
    const result = individualRegistrationSchema.parse(individual)
    expect(result).toMatchObject({ fullName: 'Anu Mathew', email: 'anu@example.invalid', occupation: 'Engineer' })
  })

  it('rejects invalid individual email, mobile, and required values', () => {
    expect(individualRegistrationSchema.safeParse({ ...individual, email: 'invalid' }).success).toBe(false)
    expect(individualRegistrationSchema.safeParse({ ...individual, mobile: '12345' }).success).toBe(false)
    expect(individualRegistrationSchema.safeParse({ ...individual, fullName: ' ' }).success).toBe(false)
  })

  it('accepts and trims appropriate organization fields', () => {
    const result = organizationRegistrationSchema.parse(organization)
    expect(result.organizationName).toBe('Sample Cooperative')
    expect(result.address).toBe('12 Example Road, Kochi')
  })

  it('rejects invalid organization contact fields and required values', () => {
    expect(organizationRegistrationSchema.safeParse({ ...organization, email: 'invalid' }).success).toBe(false)
    expect(organizationRegistrationSchema.safeParse({ ...organization, mobile: '1234567890' }).success).toBe(false)
    expect(organizationRegistrationSchema.safeParse({ ...organization, address: '' }).success).toBe(false)
  })

  it('accepts and trims appropriate volunteer fields', () => {
    const result = volunteerRegistrationSchema.parse(volunteer)
    expect(result).toMatchObject({ fullName: 'Dev Nair', cybersecuritySkills: 'Incident response', certifications: 'Security course', availability: 'Weekends' })
  })

  it('rejects invalid volunteer contact fields and required values', () => {
    expect(volunteerRegistrationSchema.safeParse({ ...volunteer, email: 'invalid' }).success).toBe(false)
    expect(volunteerRegistrationSchema.safeParse({ ...volunteer, mobile: '5555555555' }).success).toBe(false)
    expect(volunteerRegistrationSchema.safeParse({ ...volunteer, cybersecuritySkills: '' }).success).toBe(false)
  })
})
