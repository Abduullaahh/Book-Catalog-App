"use client"

import { useRouter } from "next/navigation"
import { AddBookForm } from "./add-book-form"

export function AddBookPageContent() {
  const router = useRouter()

  const handleSuccess = () => {
    router.push("/dashboard")
  }

  return <AddBookForm onSuccess={handleSuccess} />
}
