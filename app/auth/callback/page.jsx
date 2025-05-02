"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase-client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export default function AuthCallbackPage() {
  const [message, setMessage] = useState("Processing authentication...")
  const [error, setError] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { error } = await supabase.auth.getSession()

        if (error) {
          setError(error.message)
          return
        }

        // Successful authentication
        setMessage("Authentication successful! Redirecting...")

        // Redirect after a short delay
        setTimeout(() => {
          router.push("/")
        }, 2000)
      } catch (err) {
        console.error("Auth callback error:", err)
        setError("Authentication failed. Please try again.")
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Authentication</CardTitle>
          <CardDescription>Verifying your account</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          {error ? (
            <div className="text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={() => router.push("/login")}>Return to Login</Button>
            </div>
          ) : (
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p>{message}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
