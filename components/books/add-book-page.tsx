"use client"

import { useState } from "react"
import { AddBookForm } from "./add-book-form"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowLeft } from "lucide-react"

interface AddBookPageProps {
  onNavigateToBooks: () => void
}

export function AddBookPage({ onNavigateToBooks }: AddBookPageProps) {
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSuccess = () => {
    setShowSuccess(true)
    // Auto-hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onNavigateToBooks}
          className="gap-2 hover:bg-accent/50 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Books
        </Button>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center gap-3 shadow-sm animate-in slide-in-from-top-2 duration-300">
          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
          <div>
            <p className="font-medium text-green-800 dark:text-green-200">Book added successfully!</p>
            <p className="text-sm text-green-600 dark:text-green-300">Your book has been added to your library.</p>
          </div>
        </div>
      )}

      {/* Form */}
      <AddBookForm onSuccess={handleSuccess} />
    </div>
  )
}
