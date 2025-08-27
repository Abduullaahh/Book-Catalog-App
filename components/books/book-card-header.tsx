import { CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card"
import { User } from "lucide-react"
import type { Book } from "@/types"
import { BookCover } from "./book-cover"
import { BookActions } from "./book-actions"

interface BookCardHeaderProps {
  book: Book
  onDelete: (id: string) => void
}

export function BookCardHeader({ book, onDelete }: BookCardHeaderProps) {
  return (
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-shrink-0">
          <BookCover
            src={book.coverUrl}
            alt={`${book.title} cover`}
            width={64}
            height={88}
            className="w-16 h-22"
          />
        </div>

        <div className="flex-1 min-w-0">
          <CardTitle className="text-base leading-tight line-clamp-2 text-balance">{book.title}</CardTitle>
          <CardDescription className="flex items-center gap-1 mt-1">
            <User className="h-3 w-3" />
            {book.author}
          </CardDescription>
        </div>

        <CardAction>
          <BookActions book={book} onDelete={onDelete} />
        </CardAction>
      </div>
    </CardHeader>
  )
}
