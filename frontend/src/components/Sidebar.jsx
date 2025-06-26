"use client"
import useAuthUser from "../hooks/useAuthUser"
import { Link, useLocation } from "react-router"
import { BellIcon, HomeIcon, ShipWheelIcon, UserIcon, MessageCircleIcon } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { getFriendRequests } from "../lib/api"

const Sidebar = () => {
  const { authUser } = useAuthUser()
  const location = useLocation()
  const currentPath = location.pathname

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  })

  const incomingRequests = friendRequests?.incomingReqs || []

  const navigationItems = [
    {
      path: "/",
      icon: HomeIcon,
      label: "Home",
      badge: null,
    },
    {
      path: "/friends",
      icon: UserIcon,
      label: "Friends",
      badge: null,
    },
    {
      path: "/chat",
      icon: MessageCircleIcon,
      label: "Messages",
      badge: null,
    },
    {
      path: "/notifications",
      icon: BellIcon,
      label: "Notifications",
      badge: incomingRequests.length > 0 ? incomingRequests.length : null,
    },
  ]

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-base-100/80 backdrop-blur-md border-r border-base-300/50 hidden lg:flex flex-col h-screen sticky top-0 shadow-sm">
        {/* Logo Section */}
        <div className="p-6 ">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="rounded-2xl bg-zinc-950 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300">
              <img 
                src="/logo.png" 
                alt="LangBridge Logo"
                className="h-8 rounded-full w-auto object-contain transition-transform duration-300"
              />
            </div>
            <span className="text-2xl font-bold font-mono italic bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              LangBridge
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPath === item.path || (item.path === "/chat" && currentPath.startsWith("/chat"))

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`btn justify-start w-full gap-4 px-4 py-3 h-auto min-h-12 normal-case transition-all duration-200 ${
                  isActive ? "btn-primary shadow-md" : "btn-ghost hover:bg-base-200 hover:shadow-sm"
                }`}
              >
                <div className="relative">
                  <Icon className={`size-5 ${isActive ? "text-primary-content" : "text-base-content/70"}`} />
                  {item.badge && (
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-error text-error-content text-xs rounded-full flex items-center justify-center font-bold">
                      {item.badge}
                    </div>
                  )}
                </div>
                <span className={`font-medium ${isActive ? "text-primary-content" : "text-base-content"}`}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-base-300/50 mt-auto">
          <div className="bg-base-200/50 rounded-xl p-4 hover:bg-base-200 transition-colors duration-200">
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="w-12 rounded-full ring-2 ring-primary/20">
                  <img src={authUser?.profilePic || "/placeholder.svg"} alt="User Avatar" className="object-cover" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{authUser?.fullName}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="size-2 rounded-full bg-success animate-pulse" />
                  <p className="text-xs text-success font-medium">Online</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation - Completely Fixed */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-[9999] bg-base-100/95 backdrop-blur-md border-t border-base-300/50 shadow-lg">
        <div className="grid grid-cols-4 h-16 max-w-screen-sm mx-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPath === item.path || (item.path === "/chat" && currentPath.startsWith("/chat"))

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center gap-1 transition-all duration-200 touch-manipulation ${
                  isActive ? "text-primary" : "text-base-content/60 hover:text-base-content"
                }`}
                style={{ WebkitTouchCallout: "none", WebkitUserSelect: "none" }}
              >
                <div className="relative">
                  <div
                    className={`p-2 rounded-xl transition-all duration-200 ${
                      isActive ? "bg-primary/20 scale-110" : "hover:bg-base-200"
                    }`}
                  >
                    <Icon className={`size-5 ${isActive ? "text-primary" : "text-current"}`} />
                  </div>
                  {item.badge && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-error text-error-content text-xs rounded-full flex items-center justify-center font-bold">
                      {item.badge}
                    </div>
                  )}
                </div>
                <span className={`text-xs font-medium ${isActive ? "text-primary" : "text-current"}`}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}

export default Sidebar
