import Groq from "groq-sdk";
import { NextResponse } from "next/server";
import { PROJECT_CONTEXT } from "@/lib/project-knowledge";

export const runtime = "nodejs";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

function fixedProjectReply(message: string) {
  const q = message.toLowerCase();

  if (
    q.includes("প্রজেক্ট") ||
    q.includes("project") ||
    q.includes("কী করে") ||
    q.includes("কি করে") ||
    q.includes("তোমাদের")
  ) {
    return "কৃষি রোভার মাটি ও পরিবেশ পর্যবেক্ষণ করে সেচের সিদ্ধান্তে সাহায্য করে।";
  }

  if (
    q.includes("মাটি") ||
    q.includes("soil") ||
    q.includes("moisture") ||
    q.includes("শুকনা") ||
    q.includes("শুকিয়ে")
  ) {
    return "মাটি শুকনা হলে কৃষি রোভার সেচের প্রয়োজন বুঝতে সাহায্য করে।";
  }

  if (
    q.includes("পানি") ||
    q.includes("সেচ") ||
    q.includes("water") ||
    q.includes("irrigation")
  ) {
    return "কৃষি রোভার সঠিক সময়ে সেচ দিতে সাহায্য করে পানি অপচয় কমায়।";
  }

  if (
    q.includes("সেন্সর") ||
    q.includes("sensor") ||
    q.includes("temperature") ||
    q.includes("humidity")
  ) {
    return "কৃষি রোভার সেন্সর দিয়ে মাটি, তাপমাত্রা ও আর্দ্রতার তথ্য সংগ্রহ করে।";
  }

  return null;
}

function cleanBanglaReply(text: string) {
  let reply = text
    .replace(/\s+/g, " ")
    .replace(/["“”]/g, "")
    .trim();

  // Keep first complete sentence only
  const stopPositions = ["।", "?", "!"]
    .map((mark) => reply.indexOf(mark))
    .filter((index) => index >= 0);

  if (stopPositions.length > 0) {
    const firstStop = Math.min(...stopPositions);
    reply = reply.slice(0, firstStop + 1).trim();
  }

  // If AI gives broken/too long answer, use safe answer
  if (
    reply.length > 100 ||
    reply.includes("পর্যবেক") ||
    reply.includes("অসম্পূর্ণ") ||
    reply.length < 5
  ) {
    reply = "কৃষি রোভার মাটি ও পরিবেশ পর্যবেক্ষণ করে সেচের সিদ্ধান্তে সাহায্য করে।";
  }

  if (!reply.endsWith("।") && !reply.endsWith("?") && !reply.endsWith("!")) {
    reply += "।";
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

    const fixedReply = fixedProjectReply(message);

    let reply = "";

    if (fixedReply) {
      reply = fixedReply;
    } else {
      const completion = await groq.chat.completions.create({
        model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
        temperature: 0.15,
        max_tokens: 50,
        messages: [
          {
            role: "system",
            content: `
তোমার নাম "সেচবন্ধু"।

তুমি Krishi Rover project-এর বাংলা ভয়েস AI assistant।

নিয়ম:
- শুধুমাত্র বাংলা ভাষায় উত্তর দেবে।
- মাত্র ১টি ছোট সম্পূর্ণ বাক্যে উত্তর দেবে।
- সর্বোচ্চ ১৫ শব্দ ব্যবহার করবে।
- বাক্য অসম্পূর্ণ রাখবে না।
- Banglish ব্যবহার করবে না।
- Project সম্পর্কে প্রশ্ন করলে context থেকে উত্তর দেবে।
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

      const aiReply =
        completion.choices[0]?.message?.content?.trim() ||
        "দুঃখিত, আমি এখন উত্তর তৈরি করতে পারছি না।";

      reply = cleanBanglaReply(aiReply);
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