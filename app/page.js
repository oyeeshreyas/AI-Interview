"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Clock, Headphones, MessageSquare, Mic, Phone, Video } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import "@fontsource/audiowide"

export default function Home() {
  return (
    
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            
          <img 
    src="Screenshot 2025-06-10 at 8.30.28 PM.png" 
    alt="Skillora Logo" 
    className="h-7 w-32" 
  />
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              How it works
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link href="/auth">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary"
              >
                Revolutionizing Recruitment
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold tracking-tight"
              >
                AI-Driven Voice Interviews for Modern Recruiters
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-gray-600"
              >
                Automate candidate screening with intelligent voice agents. Save time, reduce bias, and make better
                hiring decisions with Skillora.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/login">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start for free <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#demo">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Watch demo
                  </Button>
                </Link>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border">
                <Image
                  src="https://img.freepik.com/premium-photo/new-folderman-ai-robot-waiting-job-interview-ai-vs-human-competition_1072857-2398.jpg?uid=R198165383&ga=GA1.1.1102705785.1745963156&semt=ais_hybrid&w=740"
                  width={800}
                  height={600}
                  alt="AI Interview Platform"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">85%</p>
              <p className="text-sm text-gray-600 mt-1">Time Saved</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">3,500+</p>
              <p className="text-sm text-gray-600 mt-1">Interviews Conducted</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">92%</p>
              <p className="text-sm text-gray-600 mt-1">Candidate Satisfaction</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">500+</p>
              <p className="text-sm text-gray-600 mt-1">Companies</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features for Modern Recruiters</h2>
            <p className="text-gray-600">
              Our AI-driven platform streamlines your interview process from start to finish
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Mic className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI Voice Agents</h3>
              <p className="text-gray-600">
                Natural-sounding AI interviewers that adapt to candidate responses in real-time.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Video className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Custom Interview Flows</h3>
              <p className="text-gray-600">
                Create job-specific interview scripts with branching logic based on responses.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Automated Scheduling</h3>
              <p className="text-gray-600">
                Send interview links to candidates and let them complete at their convenience.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Response Analysis</h3>
              <p className="text-gray-600">
                AI-powered insights on candidate responses with sentiment and keyword analysis.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Time Efficiency</h3>
              <p className="text-gray-600">
                Screen hundreds of candidates simultaneously without scheduling conflicts.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Bias Reduction</h3>
              <p className="text-gray-600">
                Standardized interviews ensure all candidates are evaluated on the same criteria.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">How Skillora Works</h2>
            <p className="text-gray-600">A simple three-step process to transform your hiring workflow</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border relative">
              <div className="absolute -top-5 -left-5 h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h3 className="text-xl font-bold mb-4">Create Interview</h3>
              <p className="text-gray-600 mb-4">
                Design your interview flow with custom questions and response criteria for specific job roles.
              </p>
              <Image
                src="/placeholder.svg?height=200&width=300"
                width={300}
                height={200}
                alt="Create Interview"
                className="rounded-lg w-full"
              />
            </div>

            <div className="bg-white p-8 rounded-xl border relative">
              <div className="absolute -top-5 -left-5 h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h3 className="text-xl font-bold mb-4">Share with Candidates</h3>
              <p className="text-gray-600 mb-4">
                Send interview links to candidates via email. They can complete the interview on their own schedule.
              </p>
              <Image
                src="/placeholder.svg?height=200&width=300"
                width={300}
                height={200}
                alt="Share with Candidates"
                className="rounded-lg w-full"
              />
            </div>

            <div className="bg-white p-8 rounded-xl border relative">
              <div className="absolute -top-5 -left-5 h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h3 className="text-xl font-bold mb-4">Review Results</h3>
              <p className="text-gray-600 mb-4">
                Analyze candidate responses with AI-generated insights and make data-driven hiring decisions.
              </p>
              <Image
                src="/placeholder.svg?height=200&width=300"
                width={300}
                height={200}
                alt="Review Results"
                className="rounded-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Hiring Process?</h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Join hundreds of companies already using Skillora to streamline their recruitment and find the best talent
              faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Get Started for Free
                </Button>
              </Link>
              <Link href="#contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary"
                >
                  Request Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Headphones className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl">Skillora</span>
              </div>
              <p className="text-slate-400">AI-powered interview platform for modern recruiters.</p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>© {new Date().getFullYear()} Skillora. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>

  )
}
