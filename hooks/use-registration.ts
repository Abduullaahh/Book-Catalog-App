"use client"

import { useState } from "react"

interface RegistrationData {
  name: string
  email: string
  password: string
}

interface RegistrationResponse {
  success: boolean
  message?: string
  error?: string
}

export function useRegistration() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const register = async (data: RegistrationData): Promise<RegistrationResponse> => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Registration failed")
      }

      return {
        success: true,
        message: result.message,
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Registration failed"
      setError(errorMessage)
      return {
        success: false,
        error: errorMessage,
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    register,
    loading,
    error,
  }
}
