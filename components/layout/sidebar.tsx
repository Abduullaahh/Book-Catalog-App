"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CustomThemeToggle } from "@/components/ui/custom-theme-toggle"
import { UserDetailsPopup } from "@/components/layout/user-details-popup"
import { useAuthNextAuth } from "@/hooks/use-auth-nextauth"
import { BookOpen, Plus, User, LogOut, Menu, X } from "lucide-react"

export function Sidebar() {
  const { user, logout } = useAuthNextAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const menuItems = [
    { id: "/dashboard", label: "My Books", icon: BookOpen },
    { id: "/add", label: "Add Book", icon: Plus },
  ]

  const handleLogout = async () => {
    await logout()
    router.push("/")
    setIsMobileOpen(false)
  }

  const handlePageChange = (path: string) => {
    router.push(path)
    setIsMobileOpen(false)
  }

  const isActive = (path: string) => pathname === path

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden bg-background/80 backdrop-blur-sm border shadow-sm"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-sidebar/95 backdrop-blur-sm border-r border-sidebar-border transform transition-transform duration-300 ease-in-out shadow-lg
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:inset-0 md:bg-sidebar md:shadow-none md:h-full
      `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-sidebar-border flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sidebar-primary rounded-xl flex items-center justify-center shadow-sm">
                <BookOpen className="h-5 w-5 text-sidebar-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl font-bold text-sidebar-foreground">Book Catalog</h1>
                <p className="text-sm text-sidebar-foreground/70 truncate">Welcome, {user?.name}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <Button
                    key={item.id}
                    variant={isActive(item.id) ? "default" : "ghost"}
                    className={`w-full justify-start gap-3 h-11 transition-all duration-200 ${
                      isActive(item.id)
                        ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    }`}
                    onClick={() => handlePageChange(item.id)}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Button>
                )
              })}
            </div>
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-sidebar-border flex-shrink-0 space-y-2">
            <UserDetailsPopup>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              >
                <User className="h-4 w-4" />
                Profile
              </Button>
            </UserDetailsPopup>
            
            <CustomThemeToggle />
            
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-destructive transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  )
}
