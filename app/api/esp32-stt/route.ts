import Groq from "groq-sdk";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "ESP32 STT API is working",
  });
}

export async function POST(req: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is missing" },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const audio = formData.get("audio");

    if (!audio || !(audio instanceof File)) {
      return NextResponse.json(
        { error: "Audio file is required" },
        { status: 400 }
      );
    }

    const transcription = await groq.audio.transcriptions.create({
      file: audio,
      model: "whisper-large-v3-turbo",
      language: "bn",
      response_format: "json",
    });

    const text = transcription.text?.trim() || "";

    return NextResponse.json({
      text,
    });
  } catch (error) {
    console.warn("ESP32 STT API error:", error);

    return NextResponse.json(
      { error: "Speech transcription failed" },
      { status: 500 }
    );
  }
}