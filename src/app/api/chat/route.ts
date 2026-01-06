import { streamText, UIMessage, convertToModelMessages } from "ai";
import { groq } from "@ai-sdk/groq";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { messages }: { messages: UIMessage[] } = await request.json();
    try {
        const result = streamText({
            model: groq("llama-3.1-8b-instant"),
            messages: await convertToModelMessages(messages),
        });
    
        return result.toUIMessageStreamResponse();
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error generating text:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }
}   