"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useBooks } from "@/hooks/use-books"
import { BookOpen, Upload, Star, Loader2, CheckCircle, AlertCircle } from "lucide-react"

interface AddBookFormProps {
  onSuccess?: () => void
}

const GENRES = [
  "Classic Literature",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Romance",
  "Thriller",
  "Non-Fiction",
  "Biography",
  "History",
  "Self-Help",
  "Business",
  "Technology",
  "Health",
  "Travel",
  "Poetry",
  "Drama",
  "Horror",
  "Adventure",
  "Young Adult",
  "Children's",
]

export function AddBookForm({ onSuccess }: AddBookFormProps) {
  const { addBook } = useBooks()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    coverUrl: "",
    genre: "",
    publishedYear: new Date().getFullYear(),
    isbn: "",
    rating: 0,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.author.trim()) {
      newErrors.author = "Author is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    if (!formData.genre) {
      newErrors.genre = "Genre is required"
    }

    if (formData.publishedYear < 1000 || formData.publishedYear > new Date().getFullYear() + 1) {
      newErrors.publishedYear = "Please enter a valid year"
    }

    if (formData.rating < 0 || formData.rating > 5) {
      newErrors.rating = "Rating must be between 0 and 5"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      await addBook({
        title: formData.title.trim(),
        author: formData.author.trim(),
        description: formData.description.trim(),
        coverUrl:
          formData.coverUrl.trim() ||
          `/placeholder.svg?height=400&width=300&query=${encodeURIComponent(formData.title + " book cover")}`,
        genre: formData.genre,
        publishedYear: formData.publishedYear,
        isbn: formData.isbn.trim() || undefined,
        rating: formData.rating || undefined,
      })

      setSuccess(true)

      // Reset form after delay
      setTimeout(() => {
        setFormData({
          title: "",
          author: "",
          description: "",
          coverUrl: "",
          genre: "",
          publishedYear: new Date().getFullYear(),
          isbn: "",
          rating: 0,
        })
        setSuccess(false)
        onSuccess?.()
      }, 2000)
    } catch (error) {
      console.error("Error adding book:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="h-full flex flex-col">
      <Card className="flex-1 shadow-xl border-0 bg-card/50 backdrop-blur-sm flex flex-col">
        <CardHeader className="pb-6 flex-shrink-0">
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm transition-colors duration-300 ${
                success ? "bg-green-500" : "bg-primary"
              }`}
            >
              {success ? (
                <CheckCircle className="h-6 w-6 text-white" />
              ) : (
                <BookOpen className="h-6 w-6 text-primary-foreground" />
              )}
            </div>
            <div>
              <CardTitle className="text-2xl">{success ? "Book Added Successfully!" : "Add New Book"}</CardTitle>
              <CardDescription className="text-base">
                {success ? "Your book has been added to the library" : "Add a book to your personal library"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 space-y-6 overflow-auto">
          {success ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-muted-foreground">
                  "{formData.title}" by {formData.author} has been successfully added to your library.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10"> 
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium flex items-center gap-2">
                    Title <span className="text-destructive">*</span>
                    {errors.title && <AlertCircle className="h-3 w-3 text-destructive" />}
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter book title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className={`transition-all duration-200 ${errors.title ? "border-destructive focus:border-destructive" : "focus:border-primary"}`}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.title}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author" className="text-sm font-medium flex items-center gap-2">
                    Author <span className="text-destructive">*</span>
                    {errors.author && <AlertCircle className="h-3 w-3 text-destructive" />}
                  </Label>
                  <Input
                    id="author"
                    placeholder="Enter author name"
                    value={formData.author}
                    onChange={(e) => handleInputChange("author", e.target.value)}
                    className={`transition-all duration-200 ${errors.author ? "border-destructive focus:border-destructive" : "focus:border-primary"}`}
                  />
                  {errors.author && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.author}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Enter a brief description of the book"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className={`min-h-20 ${errors.description ? "border-destructive" : ""}`}
                />
                {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="genre" className="text-sm font-medium flex items-center gap-2">
                    Genre <span className="text-destructive">*</span>
                    {errors.genre && <AlertCircle className="h-3 w-3 text-destructive" />}
                  </Label>
                  <Select value={formData.genre} onValueChange={(value) => handleInputChange("genre", value)}>
                    <SelectTrigger className={errors.genre ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select a genre" />
                    </SelectTrigger>
                    <SelectContent>
                      {GENRES.map((genre) => (
                        <SelectItem key={genre} value={genre}>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {genre}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.genre && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.genre}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="publishedYear" className="text-sm font-medium">
                    Published Year
                  </Label>
                  <Input
                    id="publishedYear"
                    type="number"
                    min="1000"
                    max={new Date().getFullYear() + 1}
                    placeholder="e.g., 2023"
                    value={formData.publishedYear}
                    onChange={(e) =>
                      handleInputChange("publishedYear", Number.parseInt(e.target.value) || new Date().getFullYear())
                    }
                    className={errors.publishedYear ? "border-destructive" : ""}
                  />
                  {errors.publishedYear && <p className="text-sm text-destructive">{errors.publishedYear}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="coverUrl" className="text-sm font-medium">
                    Cover Image URL
                  </Label>
                  <div className="relative">
                    <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="coverUrl"
                      placeholder="https://example.com/cover.jpg"
                      value={formData.coverUrl}
                      onChange={(e) => handleInputChange("coverUrl", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Leave empty to auto-generate a placeholder</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="isbn" className="text-sm font-medium">
                    ISBN (Optional)
                  </Label>
                  <Input
                    id="isbn"
                    placeholder="978-0-123456-78-9"
                    value={formData.isbn}
                    onChange={(e) => handleInputChange("isbn", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating" className="text-sm font-medium">
                  Rating (Optional)
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    placeholder="0.0"
                    value={formData.rating || ""}
                    onChange={(e) => handleInputChange("rating", Number.parseFloat(e.target.value) || 0)}
                    className={`w-24 ${errors.rating ? "border-destructive" : ""}`}
                  />
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm text-muted-foreground">out of 5</span>
                  </div>
                </div>
                {errors.rating && <p className="text-sm text-destructive">{errors.rating}</p>}
              </div>

              <div className="flex-1"></div>
              <div className="flex gap-3 pt-6">
                <Button type="submit" disabled={loading} className="flex-1 h-11 text-base shadow-sm">
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Adding Book...
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-4 h-4 mr-2" />
                      Add Book
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
