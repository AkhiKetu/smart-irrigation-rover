import Groq from "groq-sdk";
import { NextResponse } from "next/server";
import { PROJECT_CONTEXT } from "@/lib/project-knowledge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

type RoverData = {
  soilValue: number;
  soilStatus: "DRY" | "WET";
  temperature: number | null;
  humidity: number | null;
  pumpStatus: "ON" | "OFF";
  redLed: "ON" | "OFF";
  greenLed: "ON" | "OFF";
  frontDistance: number | null;
  leftDistance: number | null;
  rightDistance: number | null;
  roverStatus: string;
  updatedAt: string;
  currentZone?: string;
  zoneDirection?: string;
  missionComplete?: boolean;
};

const globalStore = globalThis as typeof globalThis & {
  latestRoverData?: RoverData | null;
};

function makeTtsUrl(req: Request, reply: string) {
  const origin = new URL(req.url).origin;
  const ttsText = "শুনুন। " + reply;
  return `${origin}/api/bangla-tts?text=${encodeURIComponent(ttsText)}`;
}

function hasAny(q: string, words: string[]) {
  return words.some((word) => q.includes(word));
}

function isDetailedQuestion(message: string) {
  const q = message.toLowerCase();

  return hasAny(q, [
    "বিস্তারিত",
    "ব্যাখ্যা",
    "explain",
    "details",
    "elaborate",
    "কীভাবে",
    "কিভাবে",
    "how",
    "কেন",
    "why",
    "innovation",
    "ইনোভেশন",
    "কাজ করে",
    "working",
    "process",
    "প্রসেস",
  ]);
}

function fixedReply(
  message: string,
  roverData: RoverData | null | undefined,
) {
  const q = message.toLowerCase();
  const detailed = isDetailedQuestion(message);

  // Creator
  if (
    hasAny(q, [
      "তোমাকে কে বানিয়েছে",
      "তোমাকে কে বানিয়েছে",
      "কে বানিয়েছে",
      "কে বানিয়েছে",
      "কে তৈরি করেছে",
      "creator",
      "who made you",
      "who created you",
      "বানিয়েছে",
      "বানিয়েছে",
      "তৈরি করেছে",
    ])
  ) {
    return "আমাকে তৈরি করেছেন আখি কেতু চাকমা। আমি কৃষি রোভার প্রজেক্টের বাংলা AI সহকারী। আমি রোভার, সেন্সর ডাটা এবং সেচ ব্যবস্থা সম্পর্কে বাংলায় উত্তর দিই।";
  }

  // Greeting
  if (hasAny(q, ["হ্যালো", "hello", "কেমন", "কেমন আছো"])) {
    return "আমি ভালো আছি। আমি সেচবন্ধু, কৃষি রোভার প্রজেক্টের বাংলা AI সহকারী। আপনি চাইলে আমাকে তাপমাত্রা, আর্দ্রতা, মাটি বা পাম্প status জিজ্ঞেস করতে পারেন।";
  }

  // Temperature
  if (
    hasAny(q, [
      "তাপমাত্রা",
      "টেম্পারেচার",
      "temperature",
      "temp",
      "tapmatra",
      "tapmattra",
      "তাপমাত্রা কত",
      "কত ডিগ্রি",
    ])
  ) {
    if (!roverData || roverData.temperature === null) {
      return "তাপমাত্রার live data এখনো পাওয়া যায়নি। ESP32 থেকে IoT dashboard-এ data আসছে কিনা চেক করুন। Data আসলে আমি সরাসরি temperature বলে দিতে পারব।";
    }

    return `বর্তমান তাপমাত্রা ${roverData.temperature.toFixed(
      1,
    )} ডিগ্রি সেলসিয়াস। এই তথ্যটি DHT11 sensor থেকে ESP32 পড়ে IoT dashboard-এ পাঠিয়েছে। তাই dashboard-এর data আর আমার উত্তর একই হবে।`;
  }

  // Humidity
  if (
    hasAny(q, [
      "আর্দ্রতা",
      "হিউমিডিটি",
      "humidity",
      "humid",
      "ardrota",
      "ardrata",
      "আর্দ্রতা কত",
    ])
  ) {
    if (!roverData || roverData.humidity === null) {
      return "আর্দ্রতার live data এখনো পাওয়া যায়নি। ESP32 থেকে IoT dashboard-এ data আসছে কিনা দেখুন। Data আসলে আমি live humidity value বলব।";
    }

    return `বর্তমান আর্দ্রতা ${roverData.humidity.toFixed(
      1,
    )} শতাংশ। এই মানটি DHT11 sensor থেকে নেওয়া হয়েছে। IoT dashboard-এও একই humidity value দেখা যাবে।`;
  }

  // Soil
  if (
    hasAny(q, [
      "মাটি",
      "soil",
      "শুকনা",
      "ভেজা",
      "dry",
      "wet",
      "moisture",
      "মাটির অবস্থা",
      "soil status",
    ])
  ) {
    if (!roverData) {
      return "মাটির live data এখনো পাওয়া যায়নি। ESP32 থেকে IoT dashboard-এ data আসছে কিনা চেক করুন। Data এলে আমি soil value এবং dry/wet status বলতে পারব।";
    }

    if (roverData.soilStatus === "DRY") {
      return `মাটি এখন শুকনা, sensor value ${roverData.soilValue}। তাই rover এটাকে dry zone হিসেবে ধরেছে। Dry zone হলে red LED চালু হয় এবং pump ৩ সেকেন্ড পানি দেয়।`;
    }

    return `মাটি এখন ভেজা বা ঠিক আছে, sensor value ${roverData.soilValue}। তাই pump বন্ধ আছে। Wet condition হলে green LED চালু থাকে।`;
  }

  // Pump
  if (
    hasAny(q, [
      "পাম্প",
      "pump",
      "সেচ",
      "irrigation",
      "water",
      "watering",
      "পানি",
      "পাম্প চালু",
    ])
  ) {
    if (!roverData) {
      return "পাম্পের live data এখনো পাওয়া যায়নি। ESP32 থেকে IoT dashboard-এ data আসছে কিনা দেখুন। Data এলে আমি pump on/off status বলতে পারব।";
    }

    if (roverData.pumpStatus === "ON") {
      return "পাম্প এখন চালু আছে এবং শুকনা মাটিতে পানি দিচ্ছে। এটি continuous চলবে না। ESP32 ৩ সেকেন্ড পরে pump automatically বন্ধ করে দেবে।";
    }

    return "পাম্প এখন বন্ধ আছে। মাটি শুকনা হলে rover থেমে pump ৩ সেকেন্ডের জন্য চালু করবে। মাটি ভেজা থাকলে pump বন্ধ থাকবে।";
  }

  // Sensor summary
  if (
    hasAny(q, [
      "ডাটা",
      "data",
      "সেন্সর",
      "sensor",
      "সব",
      "summary",
      "রিডিং",
      "reading",
      "status",
      "স্ট্যাটাস",
      "সব সেন্সর",
    ])
  ) {
    if (!roverData) {
      return "Live sensor data এখনো পাওয়া যায়নি। ESP32 WiFi এবং IoT dashboard connection চেক করুন। Connection ঠিক হলে soil, temperature, humidity, pump এবং distance data দেখাবে।";
    }

    return `Live data অনুযায়ী মাটি ${
      roverData.soilStatus === "DRY" ? "শুকনা" : "ভেজা"
    }, soil value ${roverData.soilValue}। Temperature ${roverData.temperature?.toFixed(
      1,
    )} ডিগ্রি এবং humidity ${roverData.humidity?.toFixed(
      1,
    )} শতাংশ। Pump এখন ${
      roverData.pumpStatus === "ON" ? "চালু" : "বন্ধ"
    }, আর rover status হলো ${roverData.roverStatus}।`;
  }

  // Distance
  if (
    hasAny(q, [
      "দূরত্ব",
      "distance",
      "obstacle",
      "বাধা",
      "সামনে",
      "front",
      "left",
      "right",
      "রোভার কী দেখছে",
    ])
  ) {
    if (!roverData) {
      return "Distance data এখনো পাওয়া যায়নি। ESP32 থেকে IoT dashboard-এ ultrasonic data আসছে কিনা দেখুন। Data এলে আমি সামনে, বাম এবং ডান দিকের distance বলতে পারব।";
    }

    return `সামনে ${roverData.frontDistance} সেন্টিমিটার, বামে ${roverData.leftDistance} সেন্টিমিটার এবং ডানে ${roverData.rightDistance} সেন্টিমিটার distance আছে। এই values ultrasonic sensor থেকে এসেছে। Rover status এখন ${roverData.roverStatus}।`;
  }

  // Zone
  if (
    hasAny(q, [
      "zone",
      "জোন",
      "এখন কোথায়",
      "এখন কোথায়",
      "কোথায়",
      "কোন জোন",
      "current zone",
      "বর্তমান জোন",
    ])
  ) {
    if (!roverData) {
      return "Current zone data এখনো পাওয়া যায়নি। ESP32 dashboard-এ data পাঠালে আমি rover কোন zone-এ আছে সেটা বলতে পারব।";
    }

    return `রোভার এখন ${roverData.currentZone || "অজানা"} zone-এর data পাঠাচ্ছে। Direction হলো ${
      roverData.zoneDirection || "অজানা"
    }। Rover status এখন ${roverData.roverStatus}।`;
  }

  // Team
  if (hasAny(q, ["টিম", "team", "মেম্বার", "সদস্য", "নাম"])) {
    return "আমাদের টিমে আছেন আখি, জাওয়াদ, সজিব, আসিফ এবং ফাহিম। আমরা কৃষির জন্য smart farming rover তৈরি করেছি। Rover soil, temperature, humidity, obstacle এবং pump status live dashboard-এ পাঠায়।";
  }

  // Project
  if (
    hasAny(q, [
      "প্রজেক্ট",
      "project",
      "কী করে",
      "কি করে",
      "idea",
      "আইডিয়া",
      "innovation",
      "ইনোভেশন",
    ])
  ) {
    if (detailed) {
      return "কৃষি রোভার একটি smart farming rover, যা autonomousভাবে zone ধরে চলতে পারে। এটি soil moisture, temperature, humidity এবং obstacle distance collect করে IoT dashboard-এ পাঠায়। কোনো zone শুকনা হলে rover থামে, red LED চালু করে এবং pump ৩ সেকেন্ড পানি দেয়। Bangla AI assistant live sensor data পড়ে কৃষকের ভাষায় উত্তর দিতে পারে।";
    }

    return "কৃষি রোভার মাটি, তাপমাত্রা, আর্দ্রতা এবং obstacle পর্যবেক্ষণ করে। শুকনা মাটি পেলে এটি থেমে ৩ সেকেন্ড সেচ দেয়। একই live data IoT dashboard এবং Bangla AI assistant ব্যবহার করে।";
  }

  return null;
}

function cleanReply(text: string, detailed: boolean) {
  let reply = text.replace(/\s+/g, " ").replace(/["“”]/g, "").trim();

  // Old stable length for ESP32 speaker
  const maxLength = detailed ? 300 : 230;

  if (reply.length > maxLength) {
    reply = reply.slice(0, maxLength).trim();

    const lastStop = Math.max(
      reply.lastIndexOf("।"),
      reply.lastIndexOf("?"),
      reply.lastIndexOf("!"),
    );

    if (lastStop > 80) {
      reply = reply.slice(0, lastStop + 1).trim();
    }
  }

  if (!reply.endsWith("।") && !reply.endsWith("?") && !reply.endsWith("!")) {
    reply += "।";
  }

  return reply;
}

function formatTimeAgo(updatedAt?: string) {
  if (!updatedAt) return "সময় পাওয়া যায়নি";

  const diff = Math.floor((Date.now() - new Date(updatedAt).getTime()) / 1000);

  if (Number.isNaN(diff)) return "সময় পাওয়া যায়নি";
  if (diff < 5) return "এইমাত্র";
  if (diff < 60) return `${diff} সেকেন্ড আগে`;

  return `${Math.floor(diff / 60)} মিনিট আগে`;
}

export async function GET(req: Request) {
  return NextResponse.json({
    ok: true,
    message: "ESP32 Bangla Agent API is working",
    origin: new URL(req.url).origin,
    latestRoverData: globalStore.latestRoverData || null,
  });
}

export async function POST(req: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is missing" },
        { status: 500 },
      );
    }

    const body = await req.json();
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    const detailed = isDetailedQuestion(message);
    const roverData = globalStore.latestRoverData || null;

    let reply = fixedReply(message, roverData);

    if (!reply) {
      const roverDataText = roverData
        ? `
Live Rover Data:
- Soil value: ${roverData.soilValue}
- Soil status: ${roverData.soilStatus}
- Temperature: ${roverData.temperature}
- Humidity: ${roverData.humidity}
- Pump: ${roverData.pumpStatus}
- Red LED: ${roverData.redLed}
- Green LED: ${roverData.greenLed}
- Front distance: ${roverData.frontDistance}
- Left distance: ${roverData.leftDistance}
- Right distance: ${roverData.rightDistance}
- Current zone: ${roverData.currentZone || "Unknown"}
- Zone direction: ${roverData.zoneDirection || "Unknown"}
- Rover status: ${roverData.roverStatus}
- Last updated: ${formatTimeAgo(roverData.updatedAt)}
`
        : "Live Rover Data: Not available yet.";

      const completion = await groq.chat.completions.create({
        model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
        temperature: 0.25,
        max_tokens: detailed ? 160 : 100,
        messages: [
          {
            role: "system",
            content: `
তোমার নাম "সেচবন্ধু"।

তুমি Krishi Rover project-এর বাংলা voice AI assistant।

নিয়ম:
- শুধুমাত্র বাংলা ভাষায় উত্তর দেবে।
- Banglish ব্যবহার করবে না।
- সাধারণ প্রশ্নে ২ থেকে ৩ বাক্যে উত্তর দেবে।
- বিস্তারিত/explain/কেন/কীভাবে/innovation type প্রশ্নে ৩ থেকে ৪ বাক্যে উত্তর দেবে।
- Sensor data জানতে চাইলে অবশ্যই Live Rover Data থেকে উত্তর দেবে।
- Sensor data না থাকলে বলবে live data পাওয়া যাচ্ছে না।
- বানিয়ে কোনো sensor value বলবে না।
- উত্তর natural এবং presentation-friendly হবে।
- ESP32 speaker-এর জন্য বেশি বড় করবে না।

Creator rule:
- কেউ যদি জিজ্ঞেস করে তোমাকে কে বানিয়েছে, উত্তর দেবে: আমাকে তৈরি করেছেন আখি কেতু চাকমা।

Project Context:
${PROJECT_CONTEXT}

${roverDataText}
            `,
          },
          { role: "user", content: message },
        ],
      });

      reply =
        completion.choices[0]?.message?.content?.trim() ||
        "দুঃখিত, আমি এখন উত্তর দিতে পারছি না। আবার প্রশ্ন করুন।";
    }

    reply = cleanReply(reply, detailed);

    return NextResponse.json({
      reply,
      ttsUrl: makeTtsUrl(req, reply),
      roverData,
    });
  } catch (error) {
    console.warn("ESP32 Agent API error:", error);

    return NextResponse.json(
      { error: "ESP32 AI response failed" },
      { status: 500 },
    );
  }
}