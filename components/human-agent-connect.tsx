"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, MessageSquare, Phone } from "lucide-react"

export function HumanAgentConnect() {
  const [connecting, setConnecting] = useState(false)
  const [connected, setConnected] = useState(false)
  const [connectionType, setConnectionType] = useState<"chat" | "call" | null>(null)

  const handleConnect = (type: "chat" | "call") => {
    setConnectionType(type)
    setConnecting(true)

    // Simulate connection delay
    setTimeout(() => {
      setConnecting(false)
      setConnected(true)
    }, 3000)
  }

  if (connected) {
    return (
      <div className="p-4 bg-green-50 rounded-md text-green-800">
        <h3 className="font-medium mb-2">
          {connectionType === "chat" ? "Chat with Human Agent" : "Call with Human Agent"}
        </h3>
        <p className="text-sm">
          {connectionType === "chat"
            ? "You are now connected with Priya from our support team. Please describe your issue in detail."
            : "You will receive a call from our support team within 2 minutes. Please keep your phone handy."}
        </p>
      </div>
    )
  }

  if (connecting) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <Loader2 className="h-8 w-8 text-orange-500 animate-spin mb-2" />
        <p className="text-sm font-medium">
          {connectionType === "chat" ? "Connecting you to the next available agent..." : "Setting up your call..."}
        </p>
        <p className="text-xs text-gray-500 mt-1">Estimated wait time: 2 minutes</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="mb-4 bg-yellow-50 p-3 rounded-md text-xs text-yellow-800 flex items-start gap-2">
        <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium mt-0.5">
          Human Support
        </div>
        <p>
          You're being connected to human support because this issue requires specialized attention. Most routine issues
          like order cancellations, refunds, and payment problems are handled automatically by me without human
          intervention.
        </p>
      </div>
      <h3 className="text-sm font-medium">Connect with a human agent</h3>
      <p className="text-sm text-gray-500">
        If you'd prefer to speak with a human agent, you can choose one of the options below:
      </p>

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          className="flex flex-col items-center justify-center h-20 border-gray-300 hover:bg-orange-50 hover:border-orange-300"
          onClick={() => handleConnect("chat")}
        >
          <MessageSquare className="h-6 w-6 mb-1 text-orange-500" />
          <span className="text-sm">Live Chat</span>
        </Button>

        <Button
          variant="outline"
          className="flex flex-col items-center justify-center h-20 border-gray-300 hover:bg-orange-50 hover:border-orange-300"
          onClick={() => handleConnect("call")}
        >
          <Phone className="h-6 w-6 mb-1 text-orange-500" />
          <span className="text-sm">Phone Call</span>
        </Button>
      </div>
    </div>
  )
}
