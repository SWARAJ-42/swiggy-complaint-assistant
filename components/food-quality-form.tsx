"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Camera } from "lucide-react"

interface FoodQualityFormProps {
  order: {
    id: string
    restaurant: string
  }
}

export function FoodQualityForm({ order }: FoodQualityFormProps) {
  const [issueType, setIssueType] = useState<string | null>(null)
  const [description, setDescription] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!issueType) return
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="p-4 bg-green-50 rounded-md text-green-800">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">AI-Analyzed</span>
          <h3 className="font-medium">Quality Issue Reported</h3>
        </div>
        <p className="text-sm">
          I've analyzed your food quality report for {order.restaurant}. Standard quality issues will be automatically
          processed with a refund within 6 hours. Complex cases will be escalated to a human agent for review.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Report Food Quality Issue</h3>

      <RadioGroup value={issueType || ""} onValueChange={setIssueType}>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cold" id="cold" />
            <Label htmlFor="cold" className="text-sm">
              Food was cold/not fresh
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="taste" id="taste" />
            <Label htmlFor="taste" className="text-sm">
              Poor taste/flavor
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="undercooked" id="undercooked" />
            <Label htmlFor="undercooked" className="text-sm">
              Undercooked/raw food
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="foreign" id="foreign" />
            <Label htmlFor="foreign" className="text-sm">
              Foreign object in food
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="other" />
            <Label htmlFor="other" className="text-sm">
              Other issue
            </Label>
          </div>
        </div>
      </RadioGroup>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm">
          Describe the issue
        </Label>
        <Textarea
          id="description"
          placeholder="Please provide details about the quality issue..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="h-20"
        />
      </div>

      <div className="border border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center">
        <Camera className="h-6 w-6 text-gray-400 mb-2" />
        <p className="text-sm text-gray-500">Add photos of the food (optional)</p>
        <p className="text-xs text-gray-400 mt-1">Tap to upload</p>
      </div>

      <div className="bg-blue-50 p-3 rounded-md text-xs text-blue-800 flex items-start gap-2">
        <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium mt-0.5">AI-Powered</div>
        <p>
          I analyze food quality reports using image recognition and pattern matching to automatically process refunds
          for common issues like cold food or incorrect items.
        </p>
      </div>

      <Button onClick={handleSubmit} disabled={!issueType} className="w-full bg-orange-500 hover:bg-orange-600">
        Submit Report
      </Button>
    </div>
  )
}
