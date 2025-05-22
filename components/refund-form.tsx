"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface RefundFormProps {
  order: {
    id: string
    items: Array<{
      name: string
      quantity: number
      price: number
    }>
  }
}

export function RefundForm({ order }: RefundFormProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [comments, setComments] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleItemToggle = (itemName: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemName) ? prev.filter((item) => item !== itemName) : [...prev, itemName],
    )
  }

  const handleSubmit = () => {
    if (selectedItems.length === 0) return
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="p-4 bg-green-50 rounded-md text-green-800">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">AI-Processed</span>
          <h3 className="font-medium">Refund Request Submitted</h3>
        </div>
        <p className="text-sm">
          Your refund request for order #{order.id} has been submitted. I'll automatically verify and process your
          refund within 6 hours. No human review is needed for standard refund requests.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Select items for refund:</h3>

      <div className="space-y-2">
        {order.items.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Checkbox
              id={`item-${index}`}
              checked={selectedItems.includes(item.name)}
              onCheckedChange={() => handleItemToggle(item.name)}
            />
            <Label htmlFor={`item-${index}`} className="text-sm flex-1">
              {item.name} x{item.quantity}
            </Label>
            <span className="text-sm font-medium">₹{item.price}</span>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="comments" className="text-sm">
          Additional comments
        </Label>
        <Textarea
          id="comments"
          placeholder="Please provide details about the issue..."
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          className="h-20"
        />
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm">
          <span className="font-medium">Total refund: </span>
          <span className="text-green-600 font-medium">
            ₹
            {order.items.filter((item) => selectedItems.includes(item.name)).reduce((sum, item) => sum + item.price, 0)}
          </span>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={selectedItems.length === 0}
          className="bg-orange-500 hover:bg-orange-600"
        >
          Request Refund
        </Button>
      </div>
    </div>
  )
}
