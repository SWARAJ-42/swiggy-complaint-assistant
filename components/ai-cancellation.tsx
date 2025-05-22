"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Clock, Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface AICancellationProps {
  order: {
    id: string
    restaurant: string
    status: string
    total: number
  }
}

export function AICancellation({ order }: AICancellationProps) {
  const [processing, setProcessing] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [refundAmount, setRefundAmount] = useState(0)

  const steps = [
    "Verifying order status",
    "Checking restaurant preparation status",
    "Calculating refund amount",
    "Processing cancellation",
    "Issuing refund",
  ]

  const handleCancel = () => {
    setProcessing(true)
    setProgress(0)
    setCurrentStep(0)

    // Simulate AI processing steps with progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setCompleted(true)
          // Calculate a refund amount (in this case 85% of the total)
          setRefundAmount(Math.round(order.total * 0.85))
          return 100
        }

        // Update current step based on progress
        const newProgress = prev + 5
        if (newProgress >= 20 && currentStep < 1) setCurrentStep(1)
        if (newProgress >= 40 && currentStep < 2) setCurrentStep(2)
        if (newProgress >= 60 && currentStep < 3) setCurrentStep(3)
        if (newProgress >= 80 && currentStep < 4) setCurrentStep(4)

        return newProgress
      })
    }, 200)
  }

  if (completed) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <h3 className="text-sm font-medium text-green-800">Order Successfully Cancelled</h3>
        </div>

        <div className="bg-green-50 p-4 rounded-md">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">AI-Processed</span>
            <p className="text-sm font-medium">Automatic Refund Issued</p>
          </div>
          <p className="text-sm mb-2">
            I've automatically processed a refund of ₹{refundAmount} to your original payment method.
          </p>
          <p className="text-xs text-green-700">Refund ID: RF{Math.floor(Math.random() * 1000000000)}</p>
          <p className="text-xs text-green-700">Expected processing time: 24-48 hours</p>
        </div>

        <div className="text-xs text-gray-500">
          This cancellation was processed entirely by me without human intervention.
        </div>
      </div>
    )
  }

  if (processing) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="h-4 w-4 text-blue-500" />
          <h3 className="text-sm font-medium">AI Processing Cancellation</h3>
        </div>

        <Progress value={progress} className="h-2 w-full" />

        <div className="space-y-2">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-2">
              {currentStep > index ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : currentStep === index ? (
                <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />
              ) : (
                <div className="h-4 w-4 rounded-full border border-gray-300" />
              )}
              <span className={`text-sm ${currentStep >= index ? "text-gray-900" : "text-gray-400"}`}>{step}</span>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 p-3 rounded-md text-xs text-blue-800">
          I'm analyzing your order status and calculating the appropriate refund amount. This process is fully automated
          and requires no human intervention.
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 p-3 rounded-md text-xs text-blue-800 flex items-start gap-2">
        <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium mt-0.5">AI-Powered</div>
        <p>
          I can automatically process your cancellation request without human review. The refund amount will be
          calculated based on order status and preparation stage.
        </p>
      </div>

      <div className="p-3 border border-gray-200 rounded-md">
        <h4 className="text-sm font-medium mb-2">Order #{order.id}</h4>
        <p className="text-sm text-gray-500 mb-2">Restaurant: {order.restaurant}</p>
        <p className="text-sm text-gray-500">Current Status: {order.status}</p>
      </div>

      <Button onClick={handleCancel} className="w-full bg-orange-500 hover:bg-orange-600">
        Process AI Cancellation
      </Button>

      <p className="text-xs text-gray-500 text-center">By proceeding, you agree to our automated cancellation policy</p>
    </div>
  )
}
