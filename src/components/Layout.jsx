import AppHeader from './AppHeader.jsx'
import BottomNav from './BottomNav.jsx'
import ScreenTab from './ScreenTab.jsx'

/**
 * Standard app-chrome wrapper used on every authenticated screen:
 * - Fixed width "phone" column
 * - Header w/ Pique logo + greeting
 * - Page content
 * - Dark-green title tab (ScreenTab)
 * - Green bottom nav
 */
export default function Layout({
  title,
  showTab = true,
  withMenu = false,
  menuPosition = 'right',
  children,
}) {
  return (
    <div className="relative mx-auto max-w-md min-h-screen bg-paper px-5 pb-36">
      <AppHeader />
      <main className="pb-10">{children}</main>
      {showTab && title && (
        <ScreenTab title={title} withMenu={withMenu} menuPosition={menuPosition} />
      )}
      <BottomNav />
    </div>
  )
}
