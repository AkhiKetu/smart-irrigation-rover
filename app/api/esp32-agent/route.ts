import Groq from "groq-sdk";
import { NextResponse } from "next/server";
import { PROJECT_CONTEXT } from "@/lib/project-knowledge";

export const runtime = "nodejs";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

function fixedReply(message: string) {
  const q = message.toLowerCase();

  if (
    q.includes("টিম") ||
    q.includes("team") ||
    q.includes("মেম্বার") ||
    q.includes("সদস্য") ||
    q.includes("নাম")
  ) {
    return "আমাদের টিমে আছেন আখি কেতু চাকমা, মোঃ জাওয়াদ আব্দুল্লাহ, সজিব, আসিফ এবং ফাহিম। আখি কেতু চাকমা তিনি প্রজেক্ট লিড ও ফুল স্ট্যাক কন্ট্রিবিউটর। ";
  }

  if (
    q.includes("প্রজেক্ট") ||
    q.includes("project") ||
    q.includes("কী করে") ||
    q.includes("কি করে") ||
    q.includes("idea") ||
    q.includes("আইডিয়া")
  ) {
    return "কৃষি রোভার মাটি ও পরিবেশ পর্যবেক্ষণ করে সেচের সিদ্ধান্তে সাহায্য করে। এটি কৃষকদের সময় ও পানি বাঁচাতে সহায়তা করে।";
  }

  if (
    q.includes("মাটি") ||
    q.includes("soil") ||
    q.includes("moisture") ||
    q.includes("শুকনা")
  ) {
    return "মাটি শুকনা হলে কৃষি রোভার সেন্সরের তথ্য দেখে সেচের প্রয়োজন বুঝতে সাহায্য করে।";
  }

  if (
    q.includes("পানি") ||
    q.includes("সেচ") ||
    q.includes("water") ||
    q.includes("irrigation")
  ) {
    return "কৃষি রোভার সঠিক সময়ে সেচ দিতে সাহায্য করে, তাই পানি অপচয় কমে।";
  }

  if (
    q.includes("সেন্সর") ||
    q.includes("sensor") ||
    q.includes("temperature") ||
    q.includes("humidity")
  ) {
    return "কৃষি রোভার সেন্সর দিয়ে মাটি, তাপমাত্রা এবং আর্দ্রতার তথ্য সংগ্রহ করে।";
  }

  return null;
}

function cleanReply(text: string) {
  let reply = text
    .replace(/\s+/g, " ")
    .replace(/["“”]/g, "")
    .trim();

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
        temperature: 0.25,
        max_tokens: 120,
        messages: [
          {
            role: "system",
            content: `
তোমার নাম "সেচবন্ধু"।

তুমি Krishi Rover project-এর বাংলা ভয়েস AI assistant।

নিয়ম:
- শুধুমাত্র বাংলা ভাষায় উত্তর দেবে।
- Banglish ব্যবহার করবে না।
- উত্তর ছোট ও পরিষ্কার রাখবে।
- ১ থেকে ২টি বাক্যে উত্তর দেবে।
- বাক্য অসম্পূর্ণ রাখবে না।
- Project সম্পর্কে প্রশ্ন করলে নিচের context থেকে উত্তর দেবে।
- কিছু জানা না থাকলে বানিয়ে বলবে না।
- যদি কোনো তথ্য project context-এ না থাকে, বলবে: "এই তথ্যটি এখনো আমার প্রকল্প জ্ঞানে যোগ করা হয়নি।"

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
        "দুঃখিত, আমি এখন উত্তর তৈরি করতে পারছি না।";
    }

    reply = cleanReply(reply);

    const origin = new URL(req.url).origin;

    // Important fix:
    // Add small sound/pause before real reply so ESP32 speaker does not cut first words.
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