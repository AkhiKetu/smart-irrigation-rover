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
    message: "ESP32 Bangla Agent API is working",
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
      temperature: 0.25,
      max_tokens: 80,
      messages: [
        {
          role: "system",
          content: `
তোমার নাম "সেচবন্ধু"।

তুমি Krishi Rover project-এর বাংলা ভয়েস AI assistant।

কঠোর নিয়ম:
- শুধুমাত্র বাংলা ভাষায় উত্তর দেবে।
- উত্তর অবশ্যই ১টি ছোট সম্পূর্ণ বাক্যে দেবে।
- সর্বোচ্চ ২০ শব্দ ব্যবহার করবে।
- বাক্য কখনো অসম্পূর্ণ রাখবে না।
- Banglish ব্যবহার করবে না।
- English শব্দ ব্যবহার করবে না, যদি একেবারে প্রয়োজন না হয়।
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

    let reply =
      completion.choices[0]?.message?.content?.trim() ||
      "দুঃখিত, আমি এখন উত্তর তৈরি করতে পারছি না।";

    // Clean reply for ESP32 and Bangla TTS
    reply = reply
      .replace(/\s+/g, " ")
      .replace(/["“”]/g, "")
      .trim();

    // Make sure reply ends properly
    if (
      reply &&
      !reply.endsWith("।") &&
      !reply.endsWith("?") &&
      !reply.endsWith("!") &&
      !reply.endsWith("ঃ")
    ) {
      reply += "।";
    }

    // Extra safety: keep TTS short, but do not cut awkwardly if possible
    if (reply.length > 120) {
      const shortReply = reply.slice(0, 115);
      const lastStop = Math.max(
        shortReply.lastIndexOf("।"),
        shortReply.lastIndexOf("?"),
        shortReply.lastIndexOf("!")
      );

      if (lastStop > 20) {
        reply = shortReply.slice(0, lastStop + 1).trim();
      } else {
        reply = shortReply.trim();

        if (!reply.endsWith("।")) {
          reply += "।";
        }
      }
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://smart-irrigation-rover.vercel.app";

    const ttsUrl = `${baseUrl}/api/bangla-tts?text=${encodeURIComponent(
      reply
    )}`;

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