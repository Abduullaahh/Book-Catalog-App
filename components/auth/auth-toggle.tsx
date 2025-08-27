"use client"

import { Button } from "@/components/ui/button"

interface AuthToggleProps {
  isRegisterMode: boolean
  onToggle: () => void
}

export function AuthToggle({ isRegisterMode, onToggle }: AuthToggleProps) {
  return (
    <div className="text-center">
      <Button variant="link" onClick={onToggle} className="text-sm">
        {isRegisterMode ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
      </Button>
    </div>
  )
}
