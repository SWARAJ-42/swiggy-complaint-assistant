import { Clock, MapPin } from "lucide-react"

interface OrderDetailsProps {
  order: {
    id: string
    restaurant: string
    items: Array<{
      name: string
      quantity: number
      price: number
    }>
    total: number
    status: string
    deliveryTime: string
  }
}

export function OrderDetails({ order }: OrderDetailsProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Order #{order.id}</h3>
        <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">{order.status}</span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span>{order.restaurant}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-gray-500" />
          <span>{order.deliveryTime}</span>
        </div>
      </div>

      <div className="border-t border-b py-3 space-y-2">
        <h4 className="text-sm font-medium">Order Items</h4>
        {order.items.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span>
              {item.name} x{item.quantity}
            </span>
            <span>₹{item.price}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between font-medium">
        <span>Total</span>
        <span>₹{order.total}</span>
      </div>
    </div>
  )
}
