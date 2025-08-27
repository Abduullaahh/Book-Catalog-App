"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import type { Book } from "@/types"
import { Star, Trash2, Calendar, BookOpen, Eye, User, Hash } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface BookCardProps {
  book: Book
  onDelete: (id: string) => void
}

export function BookCard({ book, onDelete }: BookCardProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const handleDelete = async () => {
    try {
      await onDelete(book.id)
    } catch (error) {
      console.error("Error deleting book:", error)
    }
  }

  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-shrink-0">
            <div className="w-16 h-22 bg-muted rounded-lg overflow-hidden shadow-sm relative">
              {!imageError ? (
                <>
                  {imageLoading && (
                    <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-muted-foreground/50" />
                    </div>
                  )}
                  <img
                    src={book.coverUrl || "/placeholder.svg"}
                    alt={`${book.title} cover`}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      imageLoading ? "opacity-0" : "opacity-100"
                    }`}
                    onLoad={() => setImageLoading(false)}
                    onError={() => {
                      setImageError(true)
                      setImageLoading(false)
                    }}
                  />
                </>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-muted-foreground/70" />
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <CardTitle className="text-base leading-tight line-clamp-2 text-balance">{book.title}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <User className="h-3 w-3" />
              {book.author}
            </CardDescription>
          </div>

          <CardAction>
            <div className="flex gap-1">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-all duration-200 text-muted-foreground hover:text-primary hover:bg-primary/10 w-8 h-8"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      {book.title}
                    </DialogTitle>
                    <DialogDescription className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      by {book.author}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-6 py-4">
                    <div className="flex gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-32 h-44 bg-muted rounded-lg overflow-hidden shadow-md">
                          <img
                            src={book.coverUrl || "/placeholder.svg"}
                            alt={`${book.title} cover`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">{book.genre}</Badge>
                          <Badge variant="outline">{book.publishedYear}</Badge>
                          {book.rating && (
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              {book.rating}/5
                            </Badge>
                          )}
                        </div>
                        {book.isbn && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Hash className="h-3 w-3" />
                            <span>ISBN: {book.isbn}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>Added {formatDate(book.dateAdded)}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Description</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{book.description}</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-all duration-200 text-muted-foreground hover:text-destructive hover:bg-destructive/10 w-8 h-8"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Book</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{book.title}"? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardAction>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs px-2 py-1">
              {book.genre}
            </Badge>
            <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">{book.publishedYear}</span>
            {book.rating && (
              <div className="flex items-center gap-1 ml-auto">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-muted-foreground font-medium">{book.rating}/5</span>
              </div>
            )}
          </div>

          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{book.description}</p>

          <div className="flex items-center gap-1 text-xs text-muted-foreground pt-1">
            <Calendar className="h-3 w-3" />
            <span>Added {formatDate(book.dateAdded)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
