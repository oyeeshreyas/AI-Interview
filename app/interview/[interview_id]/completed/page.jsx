import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Headphones } from "lucide-react"
import Link from "next/link"

export default function InterviewComplete() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="container max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Headphones className="h-8 w-8 text-primary mr-2" />
          <span className="font-bold text-2xl">Skillora</span>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Thank You!</CardTitle>
            <CardDescription>Your interview has been successfully submitted</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="space-y-4">
              <p>
                Your responses have been recorded and will be reviewed by the hiring team. You'll be contacted if you're
                selected to move forward in the process.
              </p>
              <p className="text-sm text-gray-500">
                If you have any questions about the interview or the position, please contact the hiring team directly.
              </p>
            </div>

            <Link href="/">
              <Button className="w-full">Return to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
