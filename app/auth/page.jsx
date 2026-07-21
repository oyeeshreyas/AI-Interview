"use client"

import { Button } from "@/components/ui/button"
import { supabase } from "@/services/supabaseClient"
import { Headphones } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)

  const signInWithGoogle = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      })

      if (error) {
        toast.error(error.message)
        console.error("Error:", error.message)
      }
    } catch (error) {
      console.error("Unexpected error:", error)
      toast.error("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white border rounded-2xl p-8 shadow-sm">
          <div className="flex flex-col items-center mb-8">
            <Link href="/" className="flex items-center gap-2 mb-8">
              <Headphones className="h-8 w-8 text-primary" />
              <span className="font-bold text-2xl">Skillora</span>
            </Link>

            <Image
              src="/placeholder.svg?height=300&width=500"
              alt="AI Interview Illustration"
              width={500}
              height={300}
              className="w-full max-w-[400px] h-auto rounded-xl mb-6"
            />

            <h2 className="text-2xl font-bold text-center">Welcome to Skillora</h2>
            <p className="text-gray-500 text-center mt-2">The AI-powered interview platform for modern recruiters</p>
          </div>

          <Button
            className="w-full flex items-center justify-center gap-2 h-12 text-base"
            onClick={signInWithGoogle}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Image
                  src="/placeholder.svg?height=20&width=20"
                  alt="Google"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                Sign in with Google
              </>
            )}
          </Button>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              By signing in, you agree to our{" "}
              <Link href="#" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Contact sales
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
