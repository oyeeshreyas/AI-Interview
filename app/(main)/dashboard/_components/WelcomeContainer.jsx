"use client"

import { useUser } from "@/app/provider"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Sparkles, ArrowRight, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

function WelcomeContainer() {
  const { user } = useUser()
  const [mounted, setMounted] = useState(false)
  const [timeOfDay, setTimeOfDay] = useState("")

  useEffect(() => {
    // Determine time of day for greeting
    const hour = new Date().getHours()
    if (hour < 12) setTimeOfDay("Morning")
    else if (hour < 18) setTimeOfDay("Afternoon")
    else setTimeOfDay("Evening")

    // Trigger mount animation
    setMounted(true)
  }, [])

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-gray-200 transition-all duration-700 ease-out ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
    >
      {/* Decorative background elements */}
      

      {/* Decorative pattern */}
      
      {/* Main content */}
      <div className="relative flex items-center justify-between p-6">
        <div className="max-w-[70%]">
          <div className="mb-1 flex items-center">
            
            <span className="text-xs font-medium uppercase tracking-wider text-blue-500">Good {timeOfDay}</span>
          </div>

          <h2 className="text-xl font-bold text-gray-800 md:text-2xl">
            Welcome Back,{" "}
            <span className="">
              {user?.name || "User"}
            </span>
          </h2>

          <p className="mt-1 text-sm text-gray-600 md:text-base">AI-Driven Interviews, Hassle-Free Hiring</p>

          <div className="mt-4 flex items-center gap-3">
            <Button className="group h-9  px-4 text-xs shadow-md transition-all hover:shadow-lg md:text-sm">
              <span>Create Interview</span>
              <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>

            <Button variant="outline" className="h-9 border-gray-200 px-4 text-xs text-gray-700 md:text-sm">
              <Bell className="mr-2 h-3.5 w-3.5 text-blue-500" />
              <span>Notifications</span>
            </Button>
          </div>
        </div>

        {/* User avatar with decorative ring */}
        <div className="relative flex-shrink-0">
          <div className="absolute -inset-1 animate-spin-slow rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-70 blur-sm"></div>
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-30"></div>
          {user && (
            <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-white bg-white shadow-lg md:h-20 md:w-20">
              <Image
                src={user.picture || "/placeholder.svg"}
                alt="User Avatar"
                fill
                className="object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
          )}
          {!user && (
            <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-gradient-to-br from-blue-100 to-purple-100 shadow-lg md:h-20 md:w-20">
              <span className="text-xl font-bold text-blue-500">U</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom accent line */}
      
    </div>
  )
}

export default WelcomeContainer
