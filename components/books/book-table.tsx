import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Book } from "@/types"
import { BookTableRow } from "./book-table-row"

interface BookTableProps {
  books: Book[]
  onDeleteBook: (id: string) => void
}

export function BookTable({ books, onDeleteBook }: BookTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Book</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Genre</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Added</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books.map((book) => (
          <BookTableRow key={book.id} book={book} onDelete={onDeleteBook} />
        ))}
      </TableBody>
    </Table>
  )
}
