"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import type { Book } from "@/types"
import { BookCover } from "./book-cover"
import { RatingDisplay } from "./rating-display"
import { BookMetadata } from "./book-metadata"

interface BookDialogProps {
  book: Book
  trigger?: React.ReactNode
}

export function BookDialog({ book, trigger }: BookDialogProps) {
  const defaultTrigger = (
    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
      <Eye className="h-4 w-4" />
    </Button>
  )

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">{book.title}</DialogTitle>
          <DialogDescription>Book details and information</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <BookCover
              src={book.coverUrl}
              alt={`${book.title} cover`}
              width={128}
              height={176}
              className="w-32 h-44 mx-auto"
            />
          </div>
          <div className="md:col-span-2 space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">{book.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{book.description}</p>
            </div>
            <BookMetadata book={book} />
            <RatingDisplay rating={book.rating} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
