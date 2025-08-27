export type Book = {
  id: string
  title: string
  author: string
  description: string
  genre: string
  coverUrl?: string | null
  publishedYear?: number | null
  isbn?: string | null
  rating?: number | null
  userId: string
  dateAdded: Date
  updatedAt: Date
}

export type User = {
  id: string
  name?: string | null
  email: string
  password?: string | null
  image?: string | null
  createdAt: Date
  updatedAt: Date
}

export type CreateBookInput = {
  title: string
  author: string
  description: string
  genre: string
  coverUrl?: string
  publishedYear?: number
  isbn?: string
  rating?: number
}
