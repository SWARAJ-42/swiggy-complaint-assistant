"use client"

import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { OrderTracker } from "@/components/order-tracker"
import { RefundForm } from "@/components/refund-form"
import { RatingComponent } from "@/components/rating-component"
import { OrderDetails } from "@/components/order-details"
import { RestaurantSelection } from "@/components/restaurant-selection"
import { HumanAgentConnect } from "@/components/human-agent-connect"
import { FoodQualityForm } from "@/components/food-quality-form"
import { PaymentIssueForm } from "@/components/payment-issue-form"
import { AICancellation } from "@/components/ai-cancellation"

// Define message types
type MessageType = "text" | "component"
type ComponentType =
  | "order-tracker"
  | "refund-form"
  | "rating"
  | "order-details"
  | "restaurant-selection"
  | "human-agent"
  | "food-quality-form"
  | "payment-issue-form"
  | "ai-cancellation"

interface Message {
  id: string
  sender: "user" | "bot"
  type: MessageType
  content: string
  component?: ComponentType
  timestamp: Date
  orderDetails?: any
}

// Sample order data
const sampleOrders = [
  {
    id: "OD123456789",
    restaurant: "Biryani House",
    items: [
      { name: "Chicken Biryani", quantity: 1, price: 249 },
      { name: "Butter Naan", quantity: 2, price: 60 },
    ],
    total: 309,
    status: "Delivered",
    deliveryTime: "Today, 7:45 PM",
    deliveryPartner: "Rahul S.",
  },
  {
    id: "OD987654321",
    restaurant: "Pizza Paradise",
    items: [
      { name: "Margherita Pizza", quantity: 1, price: 299 },
      { name: "Garlic Bread", quantity: 1, price: 129 },
    ],
    total: 428,
    status: "On the way",
    deliveryTime: "ETA: 15 mins",
    deliveryPartner: "Amit K.",
  },
]

// Predefined bot responses for different scenarios
const scenarios = [
  {
    trigger: "late delivery",
    responses: [
      {
        type: "text",
        content: "I'm sorry to hear that your order is delayed. Let me check the status of your order right away.",
      },
      {
        type: "component",
        component: "order-tracker",
        content: "Here's the current status of your order:",
      },
      {
        type: "text",
        content:
          "I can see that your order is running about 15 minutes behind schedule due to high demand. Would you like me to contact the delivery partner for an update?",
      },
    ],
  },
  {
    trigger: "wrong order",
    responses: [
      {
        type: "text",
        content: "I'm really sorry to hear that you received the wrong order. That must be frustrating.",
      },
      {
        type: "component",
        component: "order-details",
        content: "Let me confirm the details of your order:",
      },
      {
        type: "text",
        content: "Could you please tell me what items were incorrect or missing from your order?",
      },
      {
        type: "component",
        component: "refund-form",
        content: "You can request a refund for the incorrect items. I'll process this automatically:",
      },
    ],
  },
  {
    trigger: "missing item",
    responses: [
      {
        type: "text",
        content: "I apologize for the missing items in your order. Let's get this sorted out quickly.",
      },
      {
        type: "component",
        component: "order-details",
        content: "Here are the details of your order:",
      },
      {
        type: "text",
        content: "Please let me know which items are missing from your delivery.",
      },
      {
        type: "component",
        component: "refund-form",
        content: "You can request a refund for the missing items. I'll verify and process this automatically:",
      },
    ],
  },
  {
    trigger: "food quality",
    responses: [
      {
        type: "text",
        content: "I'm sorry to hear about the quality issue with your food. Your satisfaction is important to us.",
      },
      {
        type: "component",
        component: "food-quality-form",
        content: "Please provide more details about the quality issue. I'll analyze your report:",
      },
      {
        type: "text",
        content:
          "Based on your feedback, I'll automatically process a refund if the issue meets our criteria. For complex cases, a human agent will review your report within 24 hours.",
      },
      {
        type: "component",
        component: "rating",
        content: "Would you mind rating your overall experience?",
      },
    ],
  },
  {
    trigger: "payment issue",
    responses: [
      {
        type: "text",
        content: "I understand you're having an issue with payment. I can help you resolve this.",
      },
      {
        type: "component",
        component: "payment-issue-form",
        content: "Please provide details about the payment issue. I'll analyze your case:",
      },
      {
        type: "text",
        content:
          "For standard payment issues like double charges or pending refunds, I'll automatically resolve this within 24 hours. Complex cases will be escalated to our payment team.",
      },
    ],
  },
  {
    trigger: "delivery partner",
    responses: [
      {
        type: "text",
        content:
          "I'm sorry to hear about your experience with our delivery partner. We take these matters very seriously.",
      },
      {
        type: "text",
        content: "Could you please provide more details about what happened during the delivery?",
      },
      {
        type: "component",
        component: "rating",
        content: "Please rate your delivery experience:",
      },
      {
        type: "text",
        content:
          "Thank you for your feedback. This will be reviewed by our delivery partner operations team. Serious issues are always handled by human agents to ensure appropriate action is taken.",
      },
    ],
  },
  {
    trigger: "app issue",
    responses: [
      {
        type: "text",
        content: "I'm sorry you're experiencing technical issues with the Swiggy app. Let's try to resolve this.",
      },
      {
        type: "text",
        content:
          "Could you please tell me what specific issue you're facing with the app? For example, is it crashing, not loading, or showing errors?",
      },
      {
        type: "text",
        content:
          "In the meantime, you might want to try updating the app to the latest version or reinstalling it. This often resolves common technical issues.",
      },
      {
        type: "component",
        component: "human-agent",
        content: "If the issue persists, I can connect you with our technical support team:",
      },
    ],
  },
  {
    trigger: "cancel order",
    responses: [
      {
        type: "text",
        content: "I understand you want to cancel your order. I can handle this automatically for you.",
      },
      {
        type: "component",
        component: "order-tracker",
        content: "Here's the current status of your order:",
      },
      {
        type: "component",
        component: "ai-cancellation",
        content: "I can process your cancellation automatically:",
      },
    ],
  },
]

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      type: "text",
      content: "Hi there! I'm Swiggy's support assistant. How can I help you today?",
      timestamp: new Date(),
    },
    {
      id: "2",
      sender: "bot",
      type: "text",
      content: "You can ask me about order issues, refunds, delivery status, or any other concerns you might have.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [currentScenario, setCurrentScenario] = useState<number | null>(null)
  const [responseIndex, setResponseIndex] = useState(0)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      type: "text",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Find matching scenario
    const matchedScenarioIndex = scenarios.findIndex((scenario) => input.toLowerCase().includes(scenario.trigger))

    if (matchedScenarioIndex !== -1) {
      setCurrentScenario(matchedScenarioIndex)
      setResponseIndex(0)
    } else {
      // Generic response if no scenario matches
      setTimeout(() => {
        const genericResponse: Message = {
          id: Date.now().toString(),
          sender: "bot",
          type: "text",
          content:
            "I'm not sure I understand your specific issue. Could you please provide more details about your order problem? For example, is it related to delivery, food quality, or something else?",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, genericResponse])
        setIsTyping(false)
      }, 1000)
    }
  }

  // Handle scenario responses
  useEffect(() => {
    if (currentScenario !== null && responseIndex < scenarios[currentScenario].responses.length) {
      const response = scenarios[currentScenario].responses[responseIndex]

      setTimeout(() => {
        const botMessage: Message = {
          id: Date.now().toString(),
          sender: "bot",
          type: response.type as MessageType,
          content: response.content,
          component: response.component as ComponentType,
          timestamp: new Date(),
          orderDetails: sampleOrders[0],
        }

        setMessages((prev) => [...prev, botMessage])
        setResponseIndex((prev) => prev + 1)
      }, 1000)
    } else if (currentScenario !== null && responseIndex >= scenarios[currentScenario].responses.length) {
      setIsTyping(false)
      setCurrentScenario(null)
      setResponseIndex(0)
    }
  }, [currentScenario, responseIndex])

  // Render component based on type
  const renderComponent = (component: ComponentType, orderDetails: any) => {
    switch (component) {
      case "order-tracker":
        return <OrderTracker order={orderDetails} />
      case "refund-form":
        return <RefundForm order={orderDetails} />
      case "rating":
        return <RatingComponent />
      case "order-details":
        return <OrderDetails order={orderDetails} />
      case "restaurant-selection":
        return <RestaurantSelection />
      case "human-agent":
        return <HumanAgentConnect />
      case "food-quality-form":
        return <FoodQualityForm order={orderDetails} />
      case "payment-issue-form":
        return <PaymentIssueForm />
      case "ai-cancellation":
        return <AICancellation order={orderDetails} />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white p-4 border-b">
        <h1 className="text-xl font-bold text-gray-900">Swiggy Customer Support</h1>
        <p className="text-gray-500 text-sm">
          I'm here to help with your order issues. Feel free to describe your problem.
        </p>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex gap-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                  <Avatar className={`h-8 w-8 ${message.sender === "user" ? "bg-blue-500" : "bg-orange-500"}`}>
                    <div className="text-xs font-medium text-white">{message.sender === "user" ? "You" : "S"}</div>
                  </Avatar>
                  <div
                    className={`rounded-lg p-4 ${
                      message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {message.type === "text" ? (
                      <p>{message.content}</p>
                    ) : (
                      <div className="space-y-2">
                        <p>{message.content}</p>
                        <div className="mt-2 bg-white rounded-md p-3 border border-gray-200">
                          {message.component && renderComponent(message.component, message.orderDetails)}
                        </div>
                      </div>
                    )}
                    <div className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-200" : "text-gray-500"}`}>
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8 bg-orange-500">
                    <div className="text-xs font-medium text-white">S</div>
                  </Avatar>
                  <div className="rounded-lg p-4 bg-gray-100 text-gray-800">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="border-t p-4 bg-white">
          <div className="flex gap-2 max-w-4xl mx-auto">
            <Input
              placeholder="Type your message here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage()
                }
              }}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} className="bg-orange-500 hover:bg-orange-600">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
