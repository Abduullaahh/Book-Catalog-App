"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle } from "lucide-react"
import { GENRES, RATING_OPTIONS, CURRENT_YEAR } from "@/lib/constants"
import type { ValidationErrors } from "@/lib/utils/validation"

interface FormFieldProps {
  errors: ValidationErrors
  formData: any
  setFormData: (data: any) => void
}

export function TitleField({ errors, formData, setFormData }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="title">Title *</Label>
      <Input
        id="title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Enter book title"
        className={errors.title ? "border-destructive" : ""}
      />
      {errors.title && (
        <div className="flex items-center gap-1 text-sm text-destructive">
          <AlertCircle className="h-3 w-3" />
          {errors.title}
        </div>
      )}
    </div>
  )
}

export function AuthorField({ errors, formData, setFormData }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="author">Author *</Label>
      <Input
        id="author"
        value={formData.author}
        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        placeholder="Enter author name"
        className={errors.author ? "border-destructive" : ""}
      />
      {errors.author && (
        <div className="flex items-center gap-1 text-sm text-destructive">
          <AlertCircle className="h-3 w-3" />
          {errors.author}
        </div>
      )}
    </div>
  )
}

export function DescriptionField({ errors, formData, setFormData }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="description">Description *</Label>
      <Textarea
        id="description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        placeholder="Enter book description"
        rows={4}
        className={errors.description ? "border-destructive" : ""}
      />
      {errors.description && (
        <div className="flex items-center gap-1 text-sm text-destructive">
          <AlertCircle className="h-3 w-3" />
          {errors.description}
        </div>
      )}
    </div>
  )
}

export function GenreField({ errors, formData, setFormData }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="genre">Genre *</Label>
      <Select value={formData.genre} onValueChange={(value) => setFormData({ ...formData, genre: value })}>
        <SelectTrigger className={errors.genre ? "border-destructive" : ""}>
          <SelectValue placeholder="Select a genre" />
        </SelectTrigger>
        <SelectContent>
          {GENRES.map((genre) => (
            <SelectItem key={genre} value={genre}>
              {genre}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors.genre && (
        <div className="flex items-center gap-1 text-sm text-destructive">
          <AlertCircle className="h-3 w-3" />
          {errors.genre}
        </div>
      )}
    </div>
  )
}

export function PublishedYearField({ errors, formData, setFormData }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="publishedYear">Published Year</Label>
      <Input
        id="publishedYear"
        type="number"
        value={formData.publishedYear}
        onChange={(e) => setFormData({ ...formData, publishedYear: parseInt(e.target.value) || CURRENT_YEAR })}
        min="1000"
        max={CURRENT_YEAR + 1}
        className={errors.publishedYear ? "border-destructive" : ""}
      />
      {errors.publishedYear && (
        <div className="flex items-center gap-1 text-sm text-destructive">
          <AlertCircle className="h-3 w-3" />
          {errors.publishedYear}
        </div>
      )}
    </div>
  )
}

export function IsbnField({ errors, formData, setFormData }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="isbn">ISBN</Label>
      <Input
        id="isbn"
        value={formData.isbn}
        onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
        placeholder="Enter ISBN (optional)"
      />
    </div>
  )
}

export function RatingField({ errors, formData, setFormData }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="rating">Rating</Label>
      <Select value={formData.rating.toString()} onValueChange={(value) => setFormData({ ...formData, rating: parseInt(value) })}>
        <SelectTrigger className={errors.rating ? "border-destructive" : ""}>
          <SelectValue placeholder="Select rating" />
        </SelectTrigger>
        <SelectContent>
          {RATING_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value.toString()}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors.rating && (
        <div className="flex items-center gap-1 text-sm text-destructive">
          <AlertCircle className="h-3 w-3" />
          {errors.rating}
        </div>
      )}
    </div>
  )
}

export function CoverUrlField({ errors, formData, setFormData }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="coverUrl">Cover Image URL</Label>
      <Input
        id="coverUrl"
        value={formData.coverUrl}
        onChange={(e) => setFormData({ ...formData, coverUrl: e.target.value })}
        placeholder="Enter cover image URL (optional)"
      />
    </div>
  )
}
