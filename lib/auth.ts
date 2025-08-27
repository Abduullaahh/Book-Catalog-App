export interface User {
  id: string
  email: string
  name: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

// Simple authentication using localStorage
export const authService = {
  login: async (email: string, password: string): Promise<User | null> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simple validation - in real app, this would be server-side
    if (email && password.length >= 6) {
      const user: User = {
        id: Date.now().toString(),
        email,
        name: email.split("@")[0],
      }

      localStorage.setItem("user", JSON.stringify(user))
      return user
    }

    throw new Error("Invalid credentials")
  },

  register: async (email: string, password: string, name: string): Promise<User | null> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email && password.length >= 6 && name) {
      const user: User = {
        id: Date.now().toString(),
        email,
        name,
      }

      localStorage.setItem("user", JSON.stringify(user))
      return user
    }

    throw new Error("Invalid registration data")
  },

  logout: () => {
    localStorage.removeItem("user")
  },

  getCurrentUser: (): User | null => {
    if (typeof window === "undefined") return null

    const userStr = localStorage.getItem("user")
    return userStr ? JSON.parse(userStr) : null
  },
}
