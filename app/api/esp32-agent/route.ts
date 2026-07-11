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
    return "আমাদের টিমে আছেন আখি কেতু চাকমা। তিনি প্রজেক্ট লিড ও ফুল স্ট্যাক কন্ট্রিবিউটর। আরো আছেন মোঃ জাওয়াদ আব্দুল্লাহ। তিনি সফটওয়্যার ডেভেলপমেন্ট ও আইওটি ইন্টিগ্রেশনে কাজ করেছেন।";
  }

  if (
    q.includes("প্রজেক্ট") ||
    q.includes("project") ||
    q.includes("কী করে") ||
    q.includes("কি করে") ||
    q.includes("idea") ||
    q.includes("আইডিয়া")
  ) {
    return "কৃষি রোভার মাটি ও পরিবেশ পর্যবেক্ষণ করে। এটি সেচের সিদ্ধান্তে সাহায্য করে। এর লক্ষ্য কৃষকদের সময় ও পানি বাঁচানো।";
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
    return "কৃষি রোভার সঠিক সময়ে সেচ দিতে সাহায্য করে। এতে পানি অপচয় কমে।";
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

function chunkForTTS(text: string) {
  const clean = cleanReply(text);

  const sentences = clean
    .split(/(?<=[।?!])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const chunks: string[] = [];

  for (const sentence of sentences) {
    if (sentence.length <= 65) {
      chunks.push(sentence);
      continue;
    }

    const words = sentence.split(" ");
    let part = "";

    for (const word of words) {
      const test = (part + " " + word).trim();

      if (test.length <= 65) {
        part = test;
      } else {
        if (part) {
          if (!part.endsWith("।") && !part.endsWith("?") && !part.endsWith("!")) {
            part += "।";
          }
          chunks.push(part);
        }
        part = word;
      }
    }

    if (part) {
      if (!part.endsWith("।") && !part.endsWith("?") && !part.endsWith("!")) {
        part += "।";
      }
      chunks.push(part);
    }
  }

  return chunks.slice(0, 8);
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
        max_tokens: 180,
        messages: [
          {
            role: "system",
            content: `
তোমার নাম "সেচবন্ধু"।

তুমি Krishi Rover project-এর খাঁটি বাংলা ভয়েস AI assistant।

নিয়ম:
- শুধুমাত্র বাংলা ভাষায় উত্তর দেবে।
- Banglish ব্যবহার করবে না।
- উত্তর মানুষের মতো স্বাভাবিক বাংলায় দেবে।
- ESP32 speaker-এর জন্য ২ থেকে ৩টি ছোট বাক্যে উত্তর দেবে।
- প্রতিটি বাক্য সম্পূর্ণ করবে।
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
    const chunks = chunkForTTS(reply);

    const ttsUrls = chunks.map(
      (text) => `${origin}/api/bangla-tts?text=${encodeURIComponent(text)}`
    );

    return NextResponse.json({
      reply,
      chunks,
      ttsUrls,
      ttsUrl: ttsUrls[0],
    });
  } catch (error) {
    console.warn("ESP32 Agent API error:", error);

    return NextResponse.json(
      { error: "ESP32 AI response failed" },
      { status: 500 }
    );
  }
}