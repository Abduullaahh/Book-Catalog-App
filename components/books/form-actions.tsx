"use client"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface FormActionsProps {
  loading?: boolean
  onReset?: () => void
  submitText?: string
  resetText?: string
  className?: string
}

export function FormActions({ 
  loading = false, 
  onReset, 
  submitText = "Submit", 
  resetText = "Reset",
  className = "" 
}: FormActionsProps) {
  return (
    <div className={`flex justify-end gap-3 pt-4 ${className}`}>
      {onReset && (
        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          disabled={loading}
        >
          {resetText}
        </Button>
      )}
      <Button type="submit" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Loading...
          </>
        ) : (
          submitText
        )}
      </Button>
    </div>
  )
}
