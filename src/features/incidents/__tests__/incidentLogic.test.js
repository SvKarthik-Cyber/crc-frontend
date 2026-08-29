import { describe, expect, it } from 'vitest'
import { INCIDENT_STATUSES } from '@/constants/incidentStatuses'
import { filterIncidentRecords } from '../admin/incidentFilters.js'
import { formatIncidentStatus } from '../admin/incidentStatusUtils.js'
import { MEMBER_INCIDENT_STATUS_DETAILS } from '../member/memberIncidentStatuses.js'

const records = [
  { reference: 'INC-001', title: 'Phishing email', category: 'Phishing', status: INCIDENT_STATUSES.SUBMITTED, assignment: null },
  { reference: 'INC-002', title: 'Account access', category: 'Account', status: INCIDENT_STATUSES.IN_PROGRESS, assignment: { name: 'Analyst' } },
  { reference: 'INC-003', title: 'Resolved malware', category: 'Malware', status: INCIDENT_STATUSES.RESOLVED, assignment: { name: 'Admin' } },
]
const defaults = { search: '', category: 'ALL', status: 'ALL', assignment: 'ALL' }

describe('incident logic', () => {
  it('defines member details and formatting for all five approved statuses', () => {
    expect(Object.keys(MEMBER_INCIDENT_STATUS_DETAILS)).toEqual(Object.values(INCIDENT_STATUSES))
    expect(Object.values(INCIDENT_STATUSES).map(formatIncidentStatus)).toEqual(['Submitted', 'Under Review', 'In Progress', 'Resolved', 'Closed'])
  })

  it('returns all supplied records for clear/default filters', () => {
    expect(filterIncidentRecords(records, defaults)).toEqual(records)
  })

  it('searches reference and title case-insensitively', () => {
    expect(filterIncidentRecords(records, { ...defaults, search: 'inc-002' })).toEqual([records[1]])
    expect(filterIncidentRecords(records, { ...defaults, search: 'MALWARE' })).toEqual([records[2]])
  })

  it('filters category, status, and assignment', () => {
    expect(filterIncidentRecords(records, { ...defaults, category: 'Phishing' })).toEqual([records[0]])
    expect(filterIncidentRecords(records, { ...defaults, status: INCIDENT_STATUSES.RESOLVED })).toEqual([records[2]])
    expect(filterIncidentRecords(records, { ...defaults, assignment: 'ASSIGNED' })).toEqual([records[1], records[2]])
    expect(filterIncidentRecords(records, { ...defaults, assignment: 'UNASSIGNED' })).toEqual([records[0]])
  })
})
