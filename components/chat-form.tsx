"use client"

import { cn } from "@/lib/utils"
import { useChat } from "ai/react"
import { ArrowUpIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AutoResizeTextarea } from "./autoresize-textarea"

export function ChatForm({ className, ...props }: React.ComponentProps<"form">) {
  const { messages, input, setInput, append, isLoading } = useChat({
    api: "/api/chat",
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim()) {
      void append({ content: input, role: "user" })
      setInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
    }
  }

  const header = (
    <header className="flex flex-col items-center justify-center space-y-4 py-8 text-center font-poppins">
      <div className="space-y-2">
        <h1 className="text-black text-5xl font-extrabold tracking-tight">
          PaunGPT
        </h1>
        <p className="text-gray-800 max-w-[600px] text-base sm:text-lg font-medium">
          Halo! Selamat datang di <span className="text-black font-semibold">PaunGPT</span>. Ini adalah website ChatBot AI ujicoba dari gua.
        </p>
      </div>
    </header>
  )

  const messageList = (
    <div className="flex flex-col space-y-4 py-4 font-poppins">
      {messages.map((message, index) => (
        <div
          key={index}
          className={cn("flex w-full items-center", message.role === "user" ? "justify-end" : "justify-start")}
        >
          <div
            className={cn(
              "rounded-2xl px-4 py-2 max-w-[85%] sm:max-w-[75%] text-gray-900",
              message.role === "user" ? "bg-blue-200 text-black" : "bg-gray-200 text-gray-900",
            )}
          >
            <p className="leading-relaxed">{message.content}</p>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 font-poppins">
      <div className="flex-1 overflow-y-auto px-4">{messages.length > 0 ? messageList : header}</div>
      <div className="border-t bg-white p-4">
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-2xl items-center space-x-2">
          <div className="relative flex-1">
            <AutoResizeTextarea
              placeholder="Ketik pesan Anda..."
              value={input}
              onChange={(value) => setInput(value)}
              onKeyDown={handleKeyDown}
              className="block w-full resize-none rounded-xl border bg-white p-4 pr-12 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 font-poppins"
              disabled={isLoading}
            />
            <div className="absolute bottom-3 right-3">
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                <ArrowUpIcon className="h-4 w-4 text-indigo-600" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}
