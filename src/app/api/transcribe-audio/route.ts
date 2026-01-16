import { NextResponse } from "next/server";
import { groq } from "@ai-sdk/groq";
import { experimental_transcribe as transcribe } from "ai";

export async function POST(request: Request) {
    const formData = await request.formData();
    const audio = formData.get("audio") as File;

    if (!audio) {
        return NextResponse.json({ error: "Audio file is required" }, { status: 400 });
    }

    const arraybuffer = await audio.arrayBuffer();
    const uint8array = new Uint8Array(arraybuffer);

    try {
        const transcription = await transcribe({
            model: groq.transcription("whisper-large-v3-turbo"),
            audio: uint8array,
        });

        return NextResponse.json({ transcription });
        
    } catch (error) {
        console.error("Error transcribing audio:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}