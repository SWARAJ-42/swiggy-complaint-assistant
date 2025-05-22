import Image from "next/image"
import { Bell, HelpCircle, Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-24">
              <Image src="/swiggy-logo-orange.png" alt="Swiggy" fill className="object-contain" />
            </div>
            <div className="hidden md:flex items-center gap-6 ml-8">
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-orange-500">
                Home
              </a>
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-orange-500">
                Orders
              </a>
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-orange-500">
                Offers
              </a>
              <a href="#" className="text-sm font-medium text-orange-500 font-semibold">
                Help
              </a>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <HelpCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
