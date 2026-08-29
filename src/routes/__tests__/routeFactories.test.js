import { describe, expect, it } from 'vitest'
import { createMemberPortalRoutes } from '../memberPortalRoutes.jsx'
import { createStaffPortalRoutes } from '../staffPortalRoutes.jsx'

const unwrapStaffRoute = (route) => route.children?.[0] ?? route

describe('lazy portal route factories', () => {
  it('returns fresh member and staff route objects', () => {
    const firstMemberRoutes = createMemberPortalRoutes()
    const secondMemberRoutes = createMemberPortalRoutes()
    const firstStaffRoutes = createStaffPortalRoutes()
    const secondStaffRoutes = createStaffPortalRoutes()

    expect(firstMemberRoutes).not.toBe(secondMemberRoutes)
    expect(firstMemberRoutes[0]).not.toBe(secondMemberRoutes[0])
    expect(firstStaffRoutes).not.toBe(secondStaffRoutes)
    expect(firstStaffRoutes[0]).not.toBe(secondStaffRoutes[0])
  })

  it('preserves member static-path ordering and real null props', () => {
    const routes = createMemberPortalRoutes()
    const paths = routes.map(({ path }) => path).filter(Boolean)

    expect(paths.indexOf('incidents/new')).toBeLessThan(
      paths.indexOf('incidents/:incidentId'),
    )
    expect(routes.find(({ path }) => path === 'incidents').element.props.componentProps)
      .toEqual({ incidentRecords: null })
    expect(routes.find(({ path }) => path === 'advisories').element.props.componentProps)
      .toMatchObject({ advisoryRecords: null, memberAccountCategory: null })
  })

  it('preserves member preview props through lazy elements', () => {
    const incidentRecords = [{ id: 'preview-incident' }]
    const routes = createMemberPortalRoutes({ incidentRecords })

    expect(routes.find(({ path }) => path === 'incidents').element.props.componentProps)
      .toEqual({ incidentRecords })
  })

  it('preserves staff static-path ordering and real null props', () => {
    const routes = createStaffPortalRoutes().map(unwrapStaffRoute)
    const paths = routes.map(({ path }) => path).filter(Boolean)

    expect(paths.indexOf('advisories/new')).toBeLessThan(
      paths.indexOf('advisories/:advisoryId'),
    )
    expect(routes.find(({ path }) => path === 'incidents').element.props.componentProps)
      .toEqual({ incidentRecords: null })
    expect(routes.find(({ path }) => path === 'registrations').element.props.componentProps)
      .toEqual({ registrationRecords: null })
  })

  it('preserves staff preview props without authorization wrappers', () => {
    const registrationRecords = [{ id: 'preview-registration' }]
    const routes = createStaffPortalRoutes({
      authorize: false,
      developmentPreview: true,
      registrationRecords,
    })

    expect(routes.find(({ path }) => path === 'registrations').element.props.componentProps)
      .toEqual({ registrationRecords })
    expect(routes[0].element.props.componentProps).toEqual({ developmentPreview: true })
  })
})
