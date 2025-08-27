export interface ValidationErrors {
  [key: string]: string
}

export interface BookFormData {
  title: string
  author: string
  description: string
  coverUrl: string
  genre: string
  publishedYear: number
  isbn: string
  rating: number
}

export const validateBookForm = (formData: BookFormData): ValidationErrors => {
  const errors: ValidationErrors = {}

  if (!formData.title.trim()) {
    errors.title = "Title is required"
  }

  if (!formData.author.trim()) {
    errors.author = "Author is required"
  }

  if (!formData.description.trim()) {
    errors.description = "Description is required"
  }

  if (!formData.genre) {
    errors.genre = "Genre is required"
  }

  if (formData.publishedYear < 1000 || formData.publishedYear > new Date().getFullYear() + 1) {
    errors.publishedYear = "Please enter a valid year"
  }

  if (formData.rating < 0 || formData.rating > 5) {
    errors.rating = "Rating must be between 0 and 5"
  }

  return errors
}

export const isFormValid = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length === 0
}
