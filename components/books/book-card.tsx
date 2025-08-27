"use client"

import { Card } from "@/components/ui/card"
import type { Book } from "@/types"
import { BookCardHeader } from "./book-card-header"
import { BookCardContent } from "./book-card-content"

interface BookCardProps {
  book: Book
  onDelete: (id: string) => void
}

export function BookCard({ book, onDelete }: BookCardProps) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md bg-card/50 backdrop-blur-sm">
      <BookCardHeader book={book} onDelete={onDelete} />
      <BookCardContent book={book} />
    </Card>
  )
}
