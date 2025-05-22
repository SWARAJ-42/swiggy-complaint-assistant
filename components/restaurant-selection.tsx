"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const restaurants = [
  {
    id: 1,
    name: "Biryani House",
    cuisine: "Indian",
    rating: 4.2,
    deliveryTime: "30-35 min",
  },
  {
    id: 2,
    name: "Pizza Paradise",
    cuisine: "Italian",
    rating: 4.5,
    deliveryTime: "25-30 min",
  },
  {
    id: 3,
    name: "Burger Barn",
    cuisine: "American",
    rating: 4.0,
    deliveryTime: "35-40 min",
  },
  {
    id: 4,
    name: "Sushi Spot",
    cuisine: "Japanese",
    rating: 4.7,
    deliveryTime: "40-45 min",
  },
]

export function RestaurantSelection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selected, setSelected] = useState<number | null>(null)

  const filteredRestaurants = restaurants.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search restaurants..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>

      <div className="space-y-2">
        {filteredRestaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className={`p-3 rounded-md border cursor-pointer transition-colors ${
              selected === restaurant.id ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:bg-gray-50"
            }`}
            onClick={() => setSelected(restaurant.id)}
          >
            <div className="flex justify-between">
              <h3 className="font-medium">{restaurant.name}</h3>
              <span className="text-sm bg-green-100 text-green-800 px-1.5 py-0.5 rounded">{restaurant.rating} ★</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>{restaurant.cuisine}</span>
              <span>{restaurant.deliveryTime}</span>
            </div>
          </div>
        ))}

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-4 text-gray-500">No restaurants found matching "{searchQuery}"</div>
        )}
      </div>

      <Button className="w-full bg-orange-500 hover:bg-orange-600" disabled={selected === null}>
        Select Restaurant
      </Button>
    </div>
  )
}
