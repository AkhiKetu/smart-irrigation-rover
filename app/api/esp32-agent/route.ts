import Groq from "groq-sdk";
import { NextResponse } from "next/server";
import { PROJECT_CONTEXT } from "@/lib/project-knowledge";

export const runtime = "nodejs";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

function makeShortCompleteBanglaReply(text: string) {
  let reply = text
    .replace(/\s+/g, " ")
    .replace(/["“”]/g, "")
    .trim();

  // Take only the first complete Bengali sentence
  const dandaIndex = reply.indexOf("।");
  const questionIndex = reply.indexOf("?");
  const exclamationIndex = reply.indexOf("!");

  const stops = [dandaIndex, questionIndex, exclamationIndex].filter(
    (index) => index >= 0
  );

  if (stops.length > 0) {
    const firstStop = Math.min(...stops);
    reply = reply.slice(0, firstStop + 1).trim();
  }

  // If no full stop exists, keep it short but complete with danda
  if (!reply.endsWith("।") && !reply.endsWith("?") && !reply.endsWith("!")) {
    reply += "।";
  }

  // Final safety: if still too long, use a fixed project reply
  if (reply.length > 95) {
    reply = "কৃষি রোভার মাটি ও পরিবেশ পর্যবেক্ষণ করে সেচের সিদ্ধান্তে সাহায্য করে।";
  }

  return reply;
}

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
      temperature: 0.2,
      max_tokens: 60,
      messages: [
        {
          role: "system",
          content: `
তোমার নাম "সেচবন্ধু"।

তুমি Krishi Rover project-এর বাংলা ভয়েস AI assistant।

কঠোর নিয়ম:
- শুধুমাত্র বাংলা ভাষায় উত্তর দেবে।
- উত্তর অবশ্যই ১টি ছোট সম্পূর্ণ বাক্যে দেবে।
- সর্বোচ্চ ১৫ শব্দ ব্যবহার করবে।
- বাক্য অসম্পূর্ণ রাখবে না।
- Banglish ব্যবহার করবে না।
- Project সম্পর্কে প্রশ্ন করলে নিচের context থেকে উত্তর দেবে।
- কিছু জানা না থাকলে বানিয়ে বলবে না।
- ESP32 control এখনো future integration, তাই command execute হয়েছে এমন বলবে না।

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

    const aiReply =
      completion.choices[0]?.message?.content?.trim() ||
      "দুঃখিত, আমি এখন উত্তর তৈরি করতে পারছি না।";

    const reply = makeShortCompleteBanglaReply(aiReply);

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