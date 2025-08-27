"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { useAuthNextAuth } from "@/hooks/use-auth-nextauth"
import { useRegistration } from "@/hooks/use-registration"
import { AuthHeader } from "./auth-header"
import { AuthFields } from "./auth-fields"
import { AuthActions } from "./auth-actions"
import { AuthToggle } from "./auth-toggle"
import { SuccessMessage } from "./success-message"

export function AuthForm() {
  const { login, loginWithGoogle } = useAuthNextAuth()
  const { register } = useRegistration()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRegisterMode, setIsRegisterMode] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode)
    setErrors({})
    setFormData({ name: "", email: "", password: "", confirmPassword: "" })
    setRegistrationSuccess(false)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (isRegisterMode) {
      if (!formData.name.trim()) {
        newErrors.name = "Name is required"
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (isRegisterMode && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      if (isRegisterMode) {
        const result = await register({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
        })

        if (result.success) {
          setRegistrationSuccess(true)
          setTimeout(() => {
            setIsRegisterMode(false)
            setFormData({ name: "", email: "", password: "", confirmPassword: "" })
            setRegistrationSuccess(false)
          }, 2000)
        }
      } else {
        const result = await login(formData.email.trim(), formData.password)

        if (result?.ok) {
          router.replace("/dashboard")
        } else {
          setErrors({ password: "Invalid email or password" })
        }
      }
    } catch (error) {
      console.error("Auth error:", error)
      setErrors({ password: "An error occurred. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsSubmitting(true)
    try {
      await loginWithGoogle()
    } catch (error) {
      console.error("Google login error:", error)
      setErrors({ password: "Google login failed. Please try again." })
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <Card className="w-full max-w-md shadow-xl border-0 bg-card/50 backdrop-blur-sm">
      <AuthHeader isRegisterMode={isRegisterMode} />
      
      <CardContent className="space-y-6">
        {registrationSuccess ? (
          <SuccessMessage />
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              <AuthFields
                isRegisterMode={isRegisterMode}
                formData={formData}
                errors={errors}
                onInputChange={handleInputChange}
              />
            </form>

            <AuthActions
              isRegisterMode={isRegisterMode}
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit}
              onGoogleLogin={handleGoogleLogin}
            />

            <AuthToggle isRegisterMode={isRegisterMode} onToggle={toggleMode} />
          </>
        )}
      </CardContent>
    </Card>
  )
}
