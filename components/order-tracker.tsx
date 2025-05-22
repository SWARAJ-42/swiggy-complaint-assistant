import { CheckCircle2, Clock, MapPin, Truck } from "lucide-react"

interface OrderTrackerProps {
  order: {
    id: string
    restaurant: string
    status: string
    deliveryTime: string
    deliveryPartner: string
  }
}

export function OrderTracker({ order }: OrderTrackerProps) {
  const getStatusStep = () => {
    switch (order.status) {
      case "Confirmed":
        return 1
      case "Preparing":
        return 2
      case "On the way":
        return 3
      case "Delivered":
        return 4
      default:
        return 1
    }
  }

  const statusStep = getStatusStep()

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Order #{order.id}</h3>
        <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">{order.status}</span>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 h-full w-0.5 bg-gray-200 z-0"></div>

        <div className="relative z-10 space-y-6">
          <div className="flex items-start gap-3">
            <div
              className={`h-5 w-5 rounded-full flex items-center justify-center ${statusStep >= 1 ? "bg-green-500" : "bg-gray-300"}`}
            >
              <CheckCircle2 className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium">Order Confirmed</p>
              <p className="text-xs text-gray-500">Your order has been received by {order.restaurant}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div
              className={`h-5 w-5 rounded-full flex items-center justify-center ${statusStep >= 2 ? "bg-green-500" : "bg-gray-300"}`}
            >
              <Clock className="h-3 w-3 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium">Preparing Your Food</p>
              <p className="text-xs text-gray-500">The restaurant is preparing your order</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div
              className={`h-5 w-5 rounded-full flex items-center justify-center ${statusStep >= 3 ? "bg-green-500" : "bg-gray-300"}`}
            >
              <Truck className="h-3 w-3 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium">On the Way</p>
              <p className="text-xs text-gray-500">{order.deliveryPartner} is delivering your order</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div
              className={`h-5 w-5 rounded-full flex items-center justify-center ${statusStep >= 4 ? "bg-green-500" : "bg-gray-300"}`}
            >
              <MapPin className="h-3 w-3 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium">Delivered</p>
              <p className="text-xs text-gray-500">{order.deliveryTime}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-orange-50 p-3 rounded-md text-sm">
        <p className="font-medium text-orange-800">Delivery ETA: {order.deliveryTime}</p>
      </div>

      {order.status !== "Delivered" && (
        <div className="mt-4 bg-blue-50 p-3 rounded-md text-xs text-blue-800 flex items-start gap-2">
          <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium mt-0.5">AI-Managed</div>
          <p>
            I fully manage order tracking and updates. Delivery time estimates are automatically adjusted based on
            real-time conditions and delivery partner location.
          </p>
        </div>
      )}
    </div>
  )
}
