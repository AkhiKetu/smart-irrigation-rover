import Groq from "groq-sdk";
import { NextResponse } from "next/server";
import { PROJECT_CONTEXT } from "@/lib/project-knowledge";

export const runtime = "nodejs";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Robot AI API is working",
  });
}

export async function POST(req: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is missing in .env.local" },
        { status: 500 }
      );
    }

    const body = await req.json();

    const messages: ChatMessage[] = Array.isArray(body.messages)
      ? body.messages
      : [];

    const cleanMessages = messages
      .filter(
        (msg) =>
          (msg.role === "user" || msg.role === "assistant") &&
          typeof msg.content === "string" &&
          msg.content.trim().length > 0
      )
      .slice(-12);

    const completion = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
      temperature: 0.35,
      max_tokens: 650,
      messages: [
        {
          role: "system",
          content: `
তোমার নাম "সেচবন্ধু"।

তুমি Smart Irrigation Rover project-এর একজন খাঁটি বাংলা ভয়েস AI assistant।

কঠোর নিয়ম:
- সবসময় শুধুমাত্র বাংলা ভাষায় উত্তর দেবে।
- English শব্দ ব্যবহার করবে না, যদি একেবারে প্রয়োজন না হয়।
- Banglish ব্যবহার করবে না।
- উত্তর ছোট, স্পষ্ট এবং মানুষের মতো স্বাভাবিক বাংলায় দেবে।
- ভয়েসে পড়ার জন্য ছোট, সহজ এবং পরিষ্কার বাংলা বাক্য ব্যবহার করবে।
- উত্তর যেন অনুবাদের মতো না শোনায়।
- Project সম্পর্কে প্রশ্ন করলে নিচের context থেকে উত্তর দেবে।
- কিছু জানা না থাকলে বানিয়ে বলবে না।
- যদি কোনো তথ্য project context-এ না থাকে, বলবে: "এই তথ্যটি এখনো আমার প্রকল্প জ্ঞানে যোগ করা হয়নি।"
- ESP32 control এখনো future integration, তাই বাস্তবে command execute হয়েছে এমন বলবে না।

Project Context:
${PROJECT_CONTEXT}
          `,
        },
        ...cleanMessages,
      ],
    });

    const reply =
      completion.choices[0]?.message?.content?.trim() ||
      "দুঃখিত, আমি এখন উত্তর তৈরি করতে পারছি না।";

    return NextResponse.json({ reply });
  } catch (error) {
    console.warn("Robot AI API error:", error);

    return NextResponse.json(
      { error: "AI response failed. Check terminal for details." },
      { status: 500 }
    );
  }
}

