import DevelopmentPreviewBanner from '@/components/development/DevelopmentPreviewBanner'
import { Outlet } from 'react-router'

function MemberPortalPreviewPage() {
  return (
    <>
      <DevelopmentPreviewBanner />
      <Outlet />
    </>
  )
}

export default MemberPortalPreviewPage
