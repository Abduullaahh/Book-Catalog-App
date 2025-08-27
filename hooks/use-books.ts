"use client"

import { useState, useEffect } from "react"
import { Book } from "@/types"
import { CreateBookInput } from "@/types"

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBooks = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/books")
      
      if (!response.ok) {
        throw new Error("Failed to fetch books")
      }
      
      const data = await response.json()
      setBooks(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const addBook = async (bookData: CreateBookInput) => {
    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      })

      if (!response.ok) {
        throw new Error("Failed to add book")
      }

      const newBook = await response.json()
      setBooks((prev) => [newBook, ...prev])
      return newBook
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add book")
      throw err
    }
  }

  const deleteBook = async (id: string) => {
    try {
      const response = await fetch(`/api/books/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete book")
      }

      setBooks((prev) => prev.filter((book) => book.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete book")
      throw err
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  return {
    books,
    loading,
    error,
    addBook,
    deleteBook,
    refetch: fetchBooks,
  }
}
