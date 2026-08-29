import { createElement, lazy } from 'react'
import LazyRouteBoundary from './LazyRouteBoundary.jsx'

export default function createLazyRouteElement(loader, componentProps) {
  const LazyComponent = lazy(loader)
  return createElement(LazyRouteBoundary, { LazyComponent, componentProps })
}
