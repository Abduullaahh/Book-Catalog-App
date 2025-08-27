"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import type { Book } from "@/types"
import { BookOpen } from "lucide-react"
import { SearchBar } from "@/components/ui/search-bar"
import { ViewToggle } from "@/components/ui/view-toggle"
import { ResultsCount } from "@/components/ui/results-count"
import { PaginationControls } from "@/components/ui/pagination-controls"
import { BookGrid } from "./book-grid"
import { BookTable } from "./book-table"

interface BooksGridProps {
  books: Book[]
  onDeleteBook: (id: string) => void
}

type ViewMode = "grid" | "table"

export function BooksGrid({ books, onDeleteBook }: BooksGridProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.genre.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedBooks = filteredBooks.slice(startIndex, startIndex + itemsPerPage)

  if (books.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <BookOpen className="h-10 w-10 text-primary/70" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">No books yet</h3>
          <p className="text-muted-foreground max-w-sm leading-relaxed">
            Start building your library by adding your first book. Click &quot;Add Book&quot; to get started.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search and View Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search books..."
        />
        <ViewToggle
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
      </div>

      {/* Results Count */}
      <ResultsCount
        count={filteredBooks.length}
        searchTerm={searchTerm}
        itemName="book"
      />

      {/* Grid View */}
      {viewMode === "grid" && (
        <BookGrid books={paginatedBooks} onDeleteBook={onDeleteBook} />
      )}

      {/* Table View */}
      {viewMode === "table" && (
        <BookTable books={paginatedBooks} onDeleteBook={onDeleteBook} />
      )}

      {/* Pagination */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}
