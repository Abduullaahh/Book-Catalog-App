import type { Book } from "@/types"
import { BookCard } from "./book-card"

interface BookGridProps {
  books: Book[]
  onDeleteBook: (id: string) => void
  className?: string
}

export function BookGrid({ books, onDeleteBook, className = "" }: BookGridProps) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {books.map((book) => (
        <BookCard key={book.id} book={book} onDelete={onDeleteBook} />
      ))}
    </div>
  )
}
