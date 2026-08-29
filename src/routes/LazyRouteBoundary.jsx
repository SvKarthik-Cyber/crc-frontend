import { Component, Suspense } from 'react'

function RouteLoadingState() {
  return (
    <div aria-live="polite" className="p-6 text-sm text-slate-700" role="status">
      Loading page…
    </div>
  )
}

class RouteChunkErrorBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="p-6 text-slate-800" role="alert">
          <p>The page could not be loaded.</p>
          <button
            className="mt-4 rounded-md border border-slate-300 px-4 py-2 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={() => window.location.reload()}
            type="button"
          >
            Reload page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

function LazyRouteBoundary({ LazyComponent, componentProps }) {
  return (
    <RouteChunkErrorBoundary>
      <Suspense fallback={<RouteLoadingState />}>
        <LazyComponent {...componentProps} />
      </Suspense>
    </RouteChunkErrorBoundary>
  )
}

export default LazyRouteBoundary
