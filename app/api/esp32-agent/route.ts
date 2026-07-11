import Groq from "groq-sdk";
import { NextResponse } from "next/server";
import { PROJECT_CONTEXT } from "@/lib/project-knowledge";

export const runtime = "nodejs";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "ESP32 Agent API is working",
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

    const body = await req.json();

    const message =
      typeof body.message === "string" ? body.message.trim() : "";

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const completion = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
      temperature: 0.35,
      max_tokens: 120,
      messages: [
        {
          role: "system",
          content: `
তোমার নাম "সেচবন্ধু"।

তুমি Krishi Rover project-এর একজন খাঁটি বাংলা ভয়েস AI assistant।

কঠোর নিয়ম:
- সবসময় শুধুমাত্র বাংলা ভাষায় উত্তর দেবে।
- Banglish ব্যবহার করবে না।
- উত্তর ছোট, স্পষ্ট এবং মানুষের মতো স্বাভাবিক বাংলায় দেবে।
- ESP32 speaker-এর জন্য উত্তর ১ থেকে ২ বাক্যের মধ্যে রাখবে।
- ভয়েসে পড়ার জন্য সহজ বাংলা বাক্য ব্যবহার করবে।
- Project সম্পর্কে প্রশ্ন করলে নিচের context থেকে উত্তর দেবে।
- কিছু জানা না থাকলে বানিয়ে বলবে না।
- যদি কোনো তথ্য project context-এ না থাকে, বলবে: "এই তথ্যটি এখনো আমার প্রকল্প জ্ঞানে যোগ করা হয়নি।"
- ESP32 control এখনো future integration, তাই বাস্তবে command execute হয়েছে এমন বলবে না।

Project Context:
${PROJECT_CONTEXT}
          `,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply =
      completion.choices[0]?.message?.content?.trim() ||
      "দুঃখিত, আমি এখন উত্তর তৈরি করতে পারছি না।";

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://smart-irrigation-rover.vercel.app";

    const ttsUrl =
      `${baseUrl}/api/bangla-tts?text=${encodeURIComponent(reply)}`;

    return NextResponse.json({
      reply,
      ttsUrl,
    });
  } catch (error) {
    console.warn("ESP32 Agent API error:", error);

    return NextResponse.json(
      { error: "ESP32 AI response failed" },
      { status: 500 }
    );
  }
}