import { type CoreMessage, streamText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json()

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: "Kamu adalah asisten AI yang membantu dalam bahasa Indonesia.",
    messages,
  })

  return result.toDataStreamResponse()
}

