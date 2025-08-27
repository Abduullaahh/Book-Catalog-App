import { User, Calendar, Hash } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils/date"
import type { Book } from "@/types"

interface BookMetadataProps {
  book: Book
  showYear?: boolean
  showIsbn?: boolean
  showDateAdded?: boolean
  className?: string
}

export function BookMetadata({ 
  book, 
  showYear = true, 
  showIsbn = true, 
  showDateAdded = true,
  className = "" 
}: BookMetadataProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {/* Author */}
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <User className="h-3 w-3" />
        {book.author}
      </div>

      {/* Genre */}
      <Badge variant="secondary" className="text-xs">
        {book.genre}
      </Badge>

      {/* Published Year */}
      {showYear && book.publishedYear && (
        <div className="text-sm text-muted-foreground">
          Published: {book.publishedYear}
        </div>
      )}

      {/* ISBN */}
      {showIsbn && book.isbn && (
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Hash className="h-3 w-3" />
          {book.isbn}
        </div>
      )}

      {/* Date Added */}
      {showDateAdded && (
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Calendar className="h-3 w-3" />
          Added: {formatDate(book.dateAdded)}
        </div>
      )}
    </div>
  )
}
