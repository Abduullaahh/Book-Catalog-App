"use client"

import { useSession, signIn, signOut } from "next-auth/react"

export function useAuthNextAuth() {
  const { data: session, status } = useSession()

  const login = async (email: string, password: string) => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
    return result
  }

  const loginWithGoogle = async () => {
    const result = await signIn("google", {
      redirect: false,
    })
    return result
  }

  const logout = async () => {
    await signOut({ redirect: false })
  }

  return {
    user: session?.user,
    isAuthenticated: !!session,
    loading: status === "loading",
    login,
    loginWithGoogle,
    logout,
  }
}
