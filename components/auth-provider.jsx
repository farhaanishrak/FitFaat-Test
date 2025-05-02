"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { supabase } from "@/lib/supabase-client"

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState(null)
  const router = useRouter()
  const pathname = usePathname()

  // Create a mock user for development when auth fails
  const createMockUser = () => {
    return {
      id: "mock-user-id",
      email: "demo@example.com",
      name: "Demo User",
      avatar_url: null,
    }
  }

  useEffect(() => {
    let mounted = true

    // Set up Supabase auth state listener
    let subscription
    try {
      const { data } = supabase.auth.onAuthStateChange((event, session) => {
        if (!mounted) return

        if (session) {
          setUser({
            ...session.user,
            name: session.user.user_metadata?.name || session.user.email,
          })
        } else {
          // For development, use a mock user if needed
          // setUser(createMockUser())
          setUser(null)
        }
        setLoading(false)
      })

      subscription = data.subscription
    } catch (error) {
      console.error("Auth state listener error:", error)
      setAuthError(error.message)
      // Use mock user for development
      setUser(createMockUser())
      setLoading(false)
    }

    // Check current session
    try {
      supabase.auth.getSession().then(({ data: { session }, error }) => {
        if (!mounted) return

        if (error) {
          console.error("Get session error:", error)
          setAuthError(error.message)
          // Use mock user for development
          setUser(createMockUser())
        } else if (session) {
          setUser({
            ...session.user,
            name: session.user.user_metadata?.name || session.user.email,
          })
        } else {
          // For development, use a mock user if needed
          // setUser(createMockUser())
          setUser(null)
        }
        setLoading(false)
      })
    } catch (error) {
      console.error("Get session exception:", error)
      setAuthError(error.message)
      // Use mock user for development
      setUser(createMockUser())
      setLoading(false)
    }

    return () => {
      mounted = false
      if (subscription) {
        try {
          subscription.unsubscribe()
        } catch (error) {
          console.error("Unsubscribe error:", error)
        }
      }
    }
  }, [])

  useEffect(() => {
    if (!loading && !user && pathname !== "/login" && pathname !== "/signup") {
      router.push("/login")
    }
  }, [user, loading, pathname, router])

  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error("Login error:", error.message)
        return { success: false, error: error.message }
      }

      router.push("/")
      return { success: true }
    } catch (error) {
      console.error("Login exception:", error.message)

      // For development, allow login with mock user
      if (process.env.NODE_ENV === "development") {
        setUser(createMockUser())
        router.push("/")
        return { success: true }
      }

      return { success: false, error: error.message }
    }
  }

  const signup = async (email, password, userData) => {
    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return { success: false, error: "Please enter a valid email address" }
      }

      // Validate password
      if (password.length < 6) {
        return { success: false, error: "Password must be at least 6 characters long" }
      }

      // Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: userData.name,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (authError) {
        console.error("Signup auth error:", authError.message)

        // For development, allow signup with mock user
        if (process.env.NODE_ENV === "development") {
          setUser(createMockUser())
          router.push("/")
          return { success: true }
        }

        return { success: false, error: authError.message }
      }

      // Check if user was created but needs email verification
      if (authData?.user && authData?.session === null) {
        return {
          success: true,
          message: "Please check your email to verify your account before logging in.",
        }
      }

      // Add user profile data to profiles table if session is available
      if (authData?.user && authData?.session) {
        try {
          const { error: profileError } = await supabase
            .from("profiles")
            .upsert(
              {
                id: authData.user.id,
                name: userData.name,
                avatar_url: userData.avatar_url || null,
                weight: userData.weight || null,
                height: userData.height || null,
                goal: userData.goal || null,
              },
              { onConflict: "id" },
            )
            .select()

          if (profileError) {
            console.error("Profile creation error:", profileError.message)
            // Continue anyway as the user was created
          }
        } catch (profileError) {
          console.error("Profile creation exception:", profileError)
          // Continue anyway as the user was created
        }
      }

      // Only redirect if we have a session (user is already confirmed)
      if (authData?.session) {
        router.push("/")
      }

      return {
        success: true,
        message: authData?.session
          ? "Account created successfully!"
          : "Please check your email to verify your account.",
      }
    } catch (error) {
      console.error("Signup exception:", error.message)

      // For development, allow signup with mock user
      if (process.env.NODE_ENV === "development") {
        setUser(createMockUser())
        router.push("/")
        return { success: true }
      }

      return { success: false, error: error.message || "An unexpected error occurred" }
    }
  }

  const logout = async () => {
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error("Logout error:", error)
    }
    setUser(null)
    router.push("/login")
  }

  const value = {
    user,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    authError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
