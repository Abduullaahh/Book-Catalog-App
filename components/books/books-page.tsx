"use client"

import { useState } from "react"
import { useBooks } from "@/hooks/use-books"
import { BooksGrid } from "./books-grid"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, BookOpen } from "lucide-react"

export function BooksPage() {
  const { books, loading, deleteBook } = useBooks()
  const [searchTerm, setSearchTerm] = useState("")
  const [genreFilter, setGenreFilter] = useState("all")

  // Get unique genres for filter
  const genres = Array.from(new Set(books.map((book) => book.genre))).sort()

  // Filter books based on search and genre
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGenre = genreFilter === "all" || book.genre === genreFilter

    return matchesSearch && matchesGenre
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center py-[35vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your books...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Books</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary" className="text-sm">
              {books.length} {books.length === 1 ? "book" : "books"}
            </Badge>
            {genreFilter !== "all" && (
              <Badge variant="outline" className="text-sm">
                {genreFilter}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      {books.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-4 bg-card/30 p-4 rounded-xl border backdrop-blur-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search books by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background/50 border-0 shadow-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={genreFilter} onValueChange={setGenreFilter}>
              <SelectTrigger className="w-48 bg-background/50 border-0 shadow-sm">
                <SelectValue placeholder="Filter by genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Books Grid */}
      <BooksGrid books={filteredBooks} onDeleteBook={deleteBook} />

      {/* No results message */}
      {books.length > 0 && filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted/50 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Search className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">No books found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  )
}
