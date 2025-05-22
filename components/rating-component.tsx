"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function RatingComponent() {
  const [rating, setRating] = useState<number | null>(null)
  const [hover, setHover] = useState<number | null>(null)
  const [feedback, setFeedback] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (rating === null) return
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="p-4 bg-green-50 rounded-md text-green-800">
        <h3 className="font-medium mb-2">Thank You for Your Feedback</h3>
        <p className="text-sm">Your rating and feedback help us improve our service.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center">
        <h3 className="text-sm font-medium mb-2">How would you rate your experience?</h3>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(null)}
              className="focus:outline-none"
            >
              <Star
                className={`h-8 w-8 ${
                  (hover !== null ? hover >= star : rating !== null && rating >= star)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
        <p className="text-sm mt-2">
          {rating === 1 && "Poor"}
          {rating === 2 && "Fair"}
          {rating === 3 && "Good"}
          {rating === 4 && "Very Good"}
          {rating === 5 && "Excellent"}
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Additional feedback (optional)</h3>
        <Textarea
          placeholder="Tell us more about your experience..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="h-20"
        />
      </div>

      <Button onClick={handleSubmit} disabled={rating === null} className="w-full bg-orange-500 hover:bg-orange-600">
        Submit Feedback
      </Button>
    </div>
  )
}
