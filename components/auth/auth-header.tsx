import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BookOpen } from "lucide-react"

interface AuthHeaderProps {
  isRegisterMode: boolean
}

export function AuthHeader({ isRegisterMode }: AuthHeaderProps) {
  return (
    <CardHeader className="pb-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-sm">
          <BookOpen className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <CardTitle className="text-2xl">
            {isRegisterMode ? "Create Account" : "Welcome Back"}
          </CardTitle>
          <CardDescription className="text-base">
            {isRegisterMode
              ? "Join us to start managing your book collection"
              : "Sign in to access your book catalog"}
          </CardDescription>
        </div>
      </div>
    </CardHeader>
  )
}
