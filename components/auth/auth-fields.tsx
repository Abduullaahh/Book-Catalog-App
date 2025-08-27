"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Lock, Mail, Eye, EyeOff, AlertCircle } from "lucide-react"

interface AuthFieldsProps {
  isRegisterMode: boolean
  formData: {
    name: string
    email: string
    password: string
    confirmPassword: string
  }
  errors: Record<string, string>
  onInputChange: (field: string, value: string) => void
}

export function AuthFields({ isRegisterMode, formData, errors, onInputChange }: AuthFieldsProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className="space-y-4">
      {isRegisterMode && (
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
            <User className="h-4 w-4" />
            Full Name
            {errors.name && <AlertCircle className="h-3 w-3 text-destructive" />}
          </Label>
          <Input
            id="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => onInputChange("name", e.target.value)}
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.name}
            </p>
          )}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Email
          {errors.email && <AlertCircle className="h-3 w-3 text-destructive" />}
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => onInputChange("email", e.target.value)}
          className={errors.email ? "border-destructive" : ""}
        />
        {errors.email && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {errors.email}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
          <Lock className="h-4 w-4" />
          Password
          {errors.password && <AlertCircle className="h-3 w-3 text-destructive" />}
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => onInputChange("password", e.target.value)}
            className={`pr-10 ${errors.password ? "border-destructive" : ""}`}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
        {errors.password && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {errors.password}
          </p>
        )}
      </div>

      {isRegisterMode && (
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Confirm Password
            {errors.confirmPassword && <AlertCircle className="h-3 w-3 text-destructive" />}
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => onInputChange("confirmPassword", e.target.value)}
              className={`pr-10 ${errors.confirmPassword ? "border-destructive" : ""}`}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.confirmPassword}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
