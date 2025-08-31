"use client"
import useAuthUser from "../hooks/useAuthUser"
import { Link, useLocation } from "react-router"
import { BellIcon, LogOutIcon, ShipWheelIcon, SearchIcon } from "lucide-react"
import ThemeSelector from "./ThemeSelector"
import useLogout from "../hooks/useLogout"

const Navbar = () => {
  const { authUser } = useAuthUser()
  const location = useLocation()
  const isChatPage = location.pathname?.startsWith("/chat")
  const { logoutMutation } = useLogout()

  return (
    <nav className="bg-base-100/80 backdrop-blur-md border-b border-base-300/50 sticky top-0 z-50 h-16 flex items-center shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full">
          {/* Logo - Always visible on mobile, hidden on desktop when sidebar is present */}
          <div className="flex items-center lg:hidden" >
              <Link to="/" className="flex items-center gap-3 group">
                <div className="rounded-2xl bg-zinc-950 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300">
                  <img 
                    src="/logo.png" 
                    alt="LangBridge Logo"
                    className="h-8 rounded-full w-auto object-contain transition-transform duration-300"
                  />
                </div>
                <span className="text-xl font-bold italic bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                  LangBridge
                </span>
              </Link>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            {/* Notifications */}
            <Link to="/notifications">
              <button className="btn btn-ghost btn-circle hover:bg-base-200 transition-colors duration-200 relative group">
                <BellIcon className="h-5 w-5 text-base-content/70 group-hover:text-base-content transition-colors" />
                {/* Notification badge - you can add logic to show this conditionally */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full border-2 border-base-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </Link>

            {/* Theme Selector */}
            <ThemeSelector />

            {/* User Avatar with Dropdown */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar hover:bg-base-200 transition-colors duration-200"
              >
                <div className="w-8 sm:w-9 rounded-full ring-2 ring-transparent hover:ring-primary/30 transition-all duration-200">
                  <img src={authUser?.profilePic || "/placeholder.svg"} alt="User Avatar" className="object-cover" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-lg border border-base-300"
              >
                <li className="menu-title">
                  <span className="text-base-content/70">Account</span>
                </li>
                <li>
                  <Link to="/profile" className="gap-3">
                    <div className="avatar">
                      <div className="w-6 rounded-full">
                        <img src={authUser?.profilePic || "/placeholder.svg"} alt="Profile" />
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold">{authUser?.fullName}</div>
                      <div className="text-xs text-base-content/60">View Profile</div>
                    </div>
                  </Link>
                </li>
                <div className="divider my-1"></div>
                <li>
                  <button onClick={logoutMutation} className="gap-3 text-error hover:bg-error/10">
                    <LogOutIcon className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
