"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useBooks } from "@/hooks/use-books"
import { Upload, CheckCircle } from "lucide-react"
import { CURRENT_YEAR } from "@/lib/constants"
import { validateBookForm, isFormValid, type ValidationErrors, type BookFormData } from "@/lib/utils/validation"
import {
  TitleField,
  AuthorField,
  DescriptionField,
  GenreField,
  PublishedYearField,
  IsbnField,
  RatingField,
  CoverUrlField,
} from "./form-fields"
import { FormSection } from "./form-section"
import { FormActions } from "./form-actions"

interface AddBookFormProps {
  onSuccess?: () => void
}

export function AddBookForm({ onSuccess }: AddBookFormProps) {
  const { addBook } = useBooks()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState<BookFormData>({
    title: "",
    author: "",
    description: "",
    coverUrl: "",
    genre: "",
    publishedYear: CURRENT_YEAR,
    isbn: "",
    rating: 0,
  })

  const [errors, setErrors] = useState<ValidationErrors>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationErrors = validateBookForm(formData)
    setErrors(validationErrors)

    if (!isFormValid(validationErrors)) {
      return
    }

    setLoading(true)

    try {
      await addBook({
        ...formData,
        publishedYear: formData.publishedYear || undefined,
        isbn: formData.isbn || undefined,
        coverUrl: formData.coverUrl || undefined,
        rating: formData.rating || undefined,
      })

      setSuccess(true)
      setFormData({
        title: "",
        author: "",
        description: "",
        coverUrl: "",
        genre: "",
        publishedYear: CURRENT_YEAR,
        isbn: "",
        rating: 0,
      })
      setErrors({})

      setTimeout(() => {
        setSuccess(false)
        onSuccess?.()
      }, 2000)
    } catch (error) {
      console.error("Error adding book:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFormData({
      title: "",
      author: "",
      description: "",
      coverUrl: "",
      genre: "",
      publishedYear: CURRENT_YEAR,
      isbn: "",
      rating: 0,
    })
    setErrors({})
  }

  if (success) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">Book Added Successfully!</h3>
          <p className="text-muted-foreground text-center">
            Your book has been added to your library. Redirecting...
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Add New Book
        </CardTitle>
        <CardDescription>
          Fill in the details below to add a new book to your library.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormSection title="Basic Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TitleField errors={errors} formData={formData} setFormData={setFormData} />
              <AuthorField errors={errors} formData={formData} setFormData={setFormData} />
            </div>
            <DescriptionField errors={errors} formData={formData} setFormData={setFormData} />
          </FormSection>

          <FormSection title="Classification">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GenreField errors={errors} formData={formData} setFormData={setFormData} />
              <PublishedYearField errors={errors} formData={formData} setFormData={setFormData} />
            </div>
          </FormSection>

          <FormSection title="Additional Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <IsbnField errors={errors} formData={formData} setFormData={setFormData} />
              <RatingField errors={errors} formData={formData} setFormData={setFormData} />
            </div>
            <CoverUrlField errors={errors} formData={formData} setFormData={setFormData} />
          </FormSection>

          <FormActions
            loading={loading}
            onReset={handleReset}
            submitText="Add Book"
            resetText="Reset"
          />
        </form>
      </CardContent>
    </Card>
  )
}
