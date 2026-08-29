import DevelopmentPreviewBanner from '@/components/development/DevelopmentPreviewBanner'
import { Outlet } from 'react-router'

function StaffPortalPreviewPage() {
  return (
    <>
      <DevelopmentPreviewBanner />
      <Outlet />
    </>
  )
}

export default StaffPortalPreviewPage
