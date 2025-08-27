"use client"

import type { Book } from "@/types"
import { BookDialog } from "./book-dialog"
import { DeleteBookButton } from "./delete-book-button"

interface BookActionsProps {
  book: Book
  onDelete: (id: string) => void
  className?: string
}

export function BookActions({ book, onDelete, className = "" }: BookActionsProps) {
  const handleDelete = async () => {
    try {
      await onDelete(book.id)
    } catch (error) {
      console.error("Error deleting book:", error)
    }
  }

  return (
    <div className={`flex gap-1 ${className}`}>
      <BookDialog book={book} />
      <DeleteBookButton bookTitle={book.title} onDelete={handleDelete} />
    </div>
  )
}
