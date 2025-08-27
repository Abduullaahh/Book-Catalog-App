import { Book, User } from "@prisma/client"

export type { Book, User }

export type BookWithUser = Book & {
  user: User
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

export type UpdateBookInput = Partial<CreateBookInput>

export type ApiResponse<T = any> = {
  data?: T
  error?: string
  message?: string
}
