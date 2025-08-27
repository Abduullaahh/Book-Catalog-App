import { CardContent } from "@/components/ui/card"
import type { Book } from "@/types"
import { BookMetadata } from "./book-metadata"
import { RatingDisplay } from "./rating-display"

interface BookCardContentProps {
  book: Book
}

export function BookCardContent({ book }: BookCardContentProps) {
  return (
    <CardContent className="pt-0">
      <div className="space-y-3">
        <BookMetadata 
          book={book} 
          showYear={false} 
          showIsbn={false} 
          showDateAdded={false}
          className="mb-3"
        />
        <RatingDisplay rating={book.rating} />
      </div>
    </CardContent>
  )
}
