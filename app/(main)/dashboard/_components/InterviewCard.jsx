"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Copy, Send, Clock, Calendar, Users } from "lucide-react"
import moment from "moment"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"

function InterviewCard({ interview, viewDetail = false }) {
  const [isHovering, setIsHovering] = useState(false)
  const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interview?.interview_id
  const candidateCount = interview?.["interview-feedback"]?.length || 0

  // Generate a professional color based on the job position name for visual variety
  const getAccentColor = () => {
    const position = interview?.jobPosition || "Interview"
    const charCode = position.charCodeAt(0) % 5

    const colors = [
      { bg: "bg-slate-900", text: "text-slate-900", hover: "group-hover:bg-slate-900" },
      { bg: "bg-emerald-700", text: "text-emerald-700", hover: "group-hover:bg-emerald-700" },
      { bg: "bg-amber-700", text: "text-amber-700", hover: "group-hover:bg-amber-700" },
      { bg: "bg-rose-700", text: "text-rose-700", hover: "group-hover:bg-rose-700" },
      { bg: "bg-violet-700", text: "text-violet-700", hover: "group-hover:bg-violet-700" },
    ]

    return colors[charCode]
  }

  const accentColor = getAccentColor()

  const copyLink = () => {
    navigator.clipboard.writeText(url)
    toast.success("Link copied to clipboard!")
  }

  const onSend = () => {
    const subject = encodeURIComponent("Your AI Interview Invitation")

    const body = encodeURIComponent(
      `Dear Candidate,
      
      You have been invited to complete an AI-powered interview hosted on Skillora.
      
      Please click the link below to start your interview:
      ${url}
      
      This interview was scheduled by the hiring team and is part of the recruitment process.
      
      Make sure you are in a quiet space with a stable internet connection and follow the instructions carefully.
      
      If you experience any issues, feel free to reply to this email.
      
      Best regards,  
      Skillora Interview System`,
    )

    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }

  return (
    <div
      className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-300"
      style={{
        boxShadow: isHovering ? "0 8px 30px rgba(0, 0, 0, 0.08)" : "0 2px 10px rgba(0, 0, 0, 0.03)",
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="p-6">
        {/* Header with position and icon */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${accentColor.bg}`}></div>
              <span className="text-xs font-medium uppercase tracking-wider text-gray-500">Interview</span>
            </div>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-gray-800">
              {interview?.jobPosition || "Untitled Interview"}
            </h2>
          </div>
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full ${
              isHovering ? accentColor.bg : "bg-gray-100"
            } transition-colors duration-300`}
          >
            <span className={`text-lg font-bold ${isHovering ? "text-white" : accentColor.text}`}>
              {interview?.jobPosition?.charAt(0) || "I"}
            </span>
          </div>
        </div>

        {/* Date and duration */}
        <div className="mt-4 flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>{moment(interview?.created_at).format("MMM DD, YYYY")}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4 text-gray-400" />
            <span>{interview?.duration || "15 min"}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">{candidateCount} Candidates</span>
            </div>
            <div className="text-sm font-medium text-gray-700">
              {candidateCount > 0 ? Math.min(candidateCount * 10, 100) : 0}% Complete
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className={`h-full rounded-full ${accentColor.bg} transition-all duration-500`}
              style={{ width: `${candidateCount > 0 ? Math.min(candidateCount * 10, 100) : 0}%` }}
            ></div>
          </div>
        </div>

        {/* Action buttons */}
        {!viewDetail ? (
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-10 border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              onClick={copyLink}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Link
            </Button>

            <Button className={`h-10 ${accentColor.bg} hover:opacity-90`} onClick={onSend}>
              <Send className="mr-2 h-4 w-4" />
              Send
            </Button>
          </div>
        ) : (
          <Link href={"/scheduled-interview/" + interview?.interview_id + "/details"}>
            <Button className={`mt-6 h-10 w-full justify-between ${accentColor.bg} hover:opacity-90`}>
              <span>View Details</span>
              <ArrowRight
                className={`h-4 w-4 transition-transform duration-300 ${isHovering ? "translate-x-1" : ""}`}
              />
            </Button>
          </Link>
        )}
      </div>

      {/* Bottom accent line */}
      <div
        className={`absolute bottom-0 left-0 h-1 w-full ${accentColor.bg} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
      ></div>
    </div>
  )
}

export default InterviewCard
