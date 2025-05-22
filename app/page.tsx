import { ChatInterface } from "@/components/chat-interface"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <main className="flex flex-col h-screen bg-gray-50">
      <Header />
      <div className="flex-1 flex flex-col overflow-hidden">
        <ChatInterface />
      </div>
    </main>
  )
}
