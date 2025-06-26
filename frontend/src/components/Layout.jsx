"use client"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 overflow-y-auto">
            <div className="min-h-full px-6 py-6">{children}</div>
          </main>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col min-h-screen">
        {/* Mobile Navbar */}
        <Navbar />

        {/* Mobile Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="min-h-full px-3 py-2 pb-20">{children}</div>
        </main>

        {/* Mobile Bottom Navigation - Always Fixed */}
        <Sidebar />
      </div>
    </div>
  )
}

export default Layout
