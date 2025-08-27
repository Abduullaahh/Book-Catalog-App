"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { User, Mail, BookOpen, User as UserIcon } from "lucide-react"
import { useAuthNextAuth } from "@/hooks/use-auth-nextauth"
import { useBooks } from "@/hooks/use-books"

interface UserDetailsPopupProps {
  children: React.ReactNode
}

export function UserDetailsPopup({ children }: UserDetailsPopupProps) {
  const { user } = useAuthNextAuth()
  const { books } = useBooks()
  const [open, setOpen] = useState(false)

  const totalBooks = books.length

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserIcon className="h-5 w-5" />
            User Profile
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* User Avatar and Basic Info */}
          <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-sm">
                {user?.image ? (
                  <Image 
                    src={user.image} 
                    alt={user.name || "User"} 
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-8 w-8 text-primary-foreground" />
                )}
              </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{user?.name || "Unknown User"}</h3>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>

          <Separator />

          {/* User Stats */}
          <div className="grid grid-cols-1 gap-4">
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <div className="flex items-center justify-center gap-2 mb-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">{totalBooks}</span>
              </div>
              <p className="text-sm text-muted-foreground">Total Books</p>
            </div>
          </div>

          <Separator />

          {/* Detailed Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Name</p>
                <p className="text-sm text-muted-foreground">{user?.name || "Not provided"}</p>
              </div>
            </div>

            {user?.image && (
              <div className="flex items-center gap-3">
                <div className="h-4 w-4 rounded-full bg-muted-foreground/20" />
                <div>
                  <p className="text-sm font-medium">Profile Picture</p>
                  <p className="text-sm text-muted-foreground">Available</p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
