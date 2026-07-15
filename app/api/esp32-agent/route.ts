import Groq from "groq-sdk";
import { NextResponse } from "next/server";
import { PROJECT_CONTEXT } from "@/lib/project-knowledge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

function fixedReply(message: string) {
  const q = message.toLowerCase();

  if (
    q.includes("হ্যালো") ||
    q.includes("hello") ||
    q.includes("কেমন")
  ) {
    return "আমি ভালো আছি। আমি সেচবন্ধু।";
  }

  if (
    q.includes("টিম") ||
    q.includes("team") ||
    q.includes("মেম্বার") ||
    q.includes("সদস্য") ||
    q.includes("নাম")
  ) {
    return "আমাদের টিমে আছেন আখি, জাওয়াদ, সজিব, আসিফ এবং ফাহিম।";
  }

  if (
    q.includes("প্রজেক্ট") ||
    q.includes("project") ||
    q.includes("কী করে") ||
    q.includes("কি করে") ||
    q.includes("idea") ||
    q.includes("আইডিয়া")
  ) {
    return "কৃষি রোভার মাটি ও পরিবেশ পর্যবেক্ষণ করে সেচে সাহায্য করে।";
  }

  if (
    q.includes("মাটি") ||
    q.includes("soil") ||
    q.includes("moisture") ||
    q.includes("শুকনা")
  ) {
    return "মাটি শুকনা হলে কৃষি রোভার সেচের প্রয়োজন বুঝতে সাহায্য করে।";
  }

  if (
    q.includes("পানি") ||
    q.includes("সেচ") ||
    q.includes("water") ||
    q.includes("irrigation")
  ) {
    return "কৃষি রোভার সঠিক সময়ে সেচ দিতে সাহায্য করে।";
  }

  if (
    q.includes("সেন্সর") ||
    q.includes("sensor") ||
    q.includes("temperature") ||
    q.includes("humidity")
  ) {
    return "কৃষি রোভার মাটি, তাপমাত্রা এবং আর্দ্রতার তথ্য সংগ্রহ করে।";
  }

  if (
    q.includes("মাইক্রোফোন") ||
    q.includes("microphone") ||
    q.includes("mic")
  ) {
    return "অনবোর্ড মাইক ঠিকভাবে কাজ না করায় আমরা ল্যাপটপ মাইক ব্যবহার করেছি।";
  }

  return null;
}

function cleanReply(text: string) {
  let reply = text
    .replace(/\s+/g, " ")
    .replace(/["“”]/g, "")
    .trim();

  // Keep ESP32 answer short
  if (reply.length > 85) {
    reply = reply.slice(0, 85).trim();
  }

  // Remove broken ending words if needed
  reply = reply.replace(/আমি ক$/, "আমি সাহায্য করি");
  reply = reply.replace(/আমি আপ$/, "আমি সাহায্য করি");

  if (!reply.endsWith("।") && !reply.endsWith("?") && !reply.endsWith("!")) {
    reply += "।";
  }

  return reply;
}

export async function GET(req: Request) {
  return NextResponse.json({
    ok: true,
    message: "ESP32 Bangla Agent API is working",
    origin: new URL(req.url).origin,
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

    let reply = fixedReply(message);

    if (!reply) {
      const completion = await groq.chat.completions.create({
        model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
        temperature: 0.2,
        max_tokens: 50,
        messages: [
          {
            role: "system",
            content: `
তোমার নাম "সেচবন্ধু"।

তুমি Krishi Rover project-এর বাংলা ভয়েস AI assistant।

নিয়ম:
- শুধুমাত্র বাংলা ভাষায় উত্তর দেবে।
- Banglish ব্যবহার করবে না।
- ESP32 speaker-এর জন্য খুব ছোট উত্তর দেবে।
- সর্বোচ্চ ১টি ছোট বাক্যে উত্তর দেবে।
- উত্তর ৮০ অক্ষরের বেশি হবে না।
- অসম্পূর্ণ বাক্য দেবে না।
- কিছু জানা না থাকলে বানিয়ে বলবে না।

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

      reply =
        completion.choices[0]?.message?.content?.trim() ||
        "দুঃখিত, আমি এখন উত্তর দিতে পারছি না।";
    }

    reply = cleanReply(reply);

    const origin = new URL(req.url).origin;

    // Warm-up word prevents first word cut on ESP32 speaker
    const ttsText = "শুনুন। " + reply;

    const ttsUrl = `${origin}/api/bangla-tts?text=${encodeURIComponent(
      ttsText
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