import { TableCell, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import type { Book } from "@/types"
import { BookCover } from "./book-cover"
import { RatingDisplay } from "./rating-display"
import { formatDate } from "@/lib/utils/date"

interface BookTableRowProps {
  book: Book
  onDelete: (id: string) => void
}

export function BookTableRow({ book, onDelete }: BookTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="w-10 h-14 bg-muted rounded overflow-hidden flex-shrink-0">
            <BookCover
              src={book.coverUrl}
              alt={`${book.title} cover`}
              width={40}
              height={56}
              className="w-full h-full"
            />
          </div>
          <div>
            <div className="font-medium line-clamp-1">{book.title}</div>
            <div className="text-sm text-muted-foreground line-clamp-1">{book.description}</div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <span className="text-sm">{book.author}</span>
        </div>
      </TableCell>
      <TableCell>
        <span className="text-xs bg-secondary px-2 py-1 rounded">{book.genre}</span>
      </TableCell>
      <TableCell>{book.publishedYear}</TableCell>
      <TableCell>
        <RatingDisplay rating={book.rating} showLabel={false} />
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <span>{formatDate(book.dateAdded)}</span>
        </div>
      </TableCell>
      <TableCell>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(book.id)}
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  )
}
