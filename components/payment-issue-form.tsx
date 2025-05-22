"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

export function PaymentIssueForm() {
  const [issueType, setIssueType] = useState<string | null>(null)
  const [transactionId, setTransactionId] = useState("")
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
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">AI-Processed</span>
          <h3 className="font-medium">Payment Issue Reported</h3>
        </div>
        <p className="text-sm">
          I've received your payment issue report. I'll automatically analyze and resolve standard issues like double
          charges or missing refunds within 24 hours. No human intervention is required for most payment cases.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Report Payment Issue</h3>

      <RadioGroup value={issueType || ""} onValueChange={setIssueType}>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="double-charge" id="double-charge" />
            <Label htmlFor="double-charge" className="text-sm">
              Double charged for order
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="charged-not-delivered" id="charged-not-delivered" />
            <Label htmlFor="charged-not-delivered" className="text-sm">
              Charged but order not delivered
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="wrong-amount" id="wrong-amount" />
            <Label htmlFor="wrong-amount" className="text-sm">
              Charged incorrect amount
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="refund-not-received" id="refund-not-received" />
            <Label htmlFor="refund-not-received" className="text-sm">
              Refund not received
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="other" />
            <Label htmlFor="other" className="text-sm">
              Other payment issue
            </Label>
          </div>
        </div>
      </RadioGroup>

      <div className="space-y-2">
        <Label htmlFor="transaction-id" className="text-sm">
          Transaction ID (if available)
        </Label>
        <Input
          id="transaction-id"
          placeholder="e.g., TXN123456789"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm">
          Describe the issue
        </Label>
        <Textarea
          id="description"
          placeholder="Please provide details about the payment issue..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="h-20"
        />
      </div>

      <div className="bg-blue-50 p-3 rounded-md text-xs text-blue-800 flex items-start gap-2">
        <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium mt-0.5">AI-Powered</div>
        <p>
          I can automatically handle most payment issues without human intervention, including double charges, refund
          processing, and payment verification.
        </p>
      </div>

      <Button onClick={handleSubmit} disabled={!issueType} className="w-full bg-orange-500 hover:bg-orange-600">
        Submit Report
      </Button>
    </div>
  )
}
