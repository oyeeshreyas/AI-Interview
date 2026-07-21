"use client"

import { Video } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

function CreateOptions() {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div className="w-full">
      <Link
        href="/dashboard/create-interview"
        className="group relative block w-full overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-300"
        style={{
          boxShadow: isHovering ? "0 15px 30px rgba(0, 0, 0, 0.08)" : "0 2px 10px rgba(0, 0, 0, 0.03)",
          transform: isHovering ? "translateY(-2px)" : "translateY(0)",
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="relative z-10 flex items-center gap-8 p-8">
          {/* Left side with icon */}
          <div
            className="flex h-20 w-20 items-center justify-center rounded-lg bg-slate-900 transition-all duration-300"
            style={{
              boxShadow: isHovering ? "0 10px 20px rgba(0, 0, 0, 0.1)" : "none",
            }}
          >
            <Video className="h-10 w-10 text-white" />
          </div>

          {/* Right side with content */}
          <div className="flex-1">
            <div className="flex items-center">
              <div className="h-0.5 w-10 bg-slate-900"></div>
              <span className="ml-3 text-xs font-medium uppercase tracking-wider text-gray-500">New</span>
            </div>
            <h2 className="mt-2 text-2xl font-bold text-gray-800">Create New Interview</h2>
            <p className="mt-2 max-w-2xl text-gray-600">
              Design AI-powered interviews and schedule them with candidates. Streamline your recruitment process with
              automated screening.
            </p>

            {/* Action indicator */}
            <div className="mt-4 inline-flex items-center gap-2">
              <span className="font-medium text-slate-900">Get Started</span>
              <div
                className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-900 transition-all duration-300 group-hover:bg-slate-900 group-hover:text-white"
                style={{
                  transform: isHovering ? "translateX(4px)" : "translateX(0)",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div
          className="absolute bottom-0 right-0 h-32 w-32 translate-x-16 translate-y-16 rounded-full border-8 border-slate-50 opacity-10"
          style={{
            transform: isHovering ? "translate(60px, 60px) scale(1.2)" : "translate(60px, 60px) scale(1)",
            transition: "transform 0.5s ease-out",
          }}
        ></div>
        <div
          className="absolute right-20 top-0 h-16 w-16 -translate-y-8 rounded-full border-4 border-slate-50 opacity-10"
          style={{
            transform: isHovering ? "translate(0, -30px) scale(1.1)" : "translate(0, -30px) scale(1)",
            transition: "transform 0.5s ease-out",
          }}
        ></div>
      </Link>
    </div>
  )
}

export default CreateOptions
