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

function getBangladeshTimeText() {
  const now = new Date();

  const time = new Intl.DateTimeFormat("bn-BD", {
    timeZone: "Asia/Dhaka",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  }).format(now);

  const date = new Intl.DateTimeFormat("bn-BD", {
    timeZone: "Asia/Dhaka",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(now);

  return `বাংলাদেশ সময় এখন ${time}। আজ ${date}।`;
}

function formatTimeAgo(updatedAt?: string) {
  if (!updatedAt) return "সময় পাওয়া যায়নি";

  const diff = Math.floor((Date.now() - new Date(updatedAt).getTime()) / 1000);

  if (Number.isNaN(diff)) return "সময় পাওয়া যায়নি";
  if (diff < 5) return "এইমাত্র";
  if (diff < 60) return `${diff} সেকেন্ড আগে`;

  return `${Math.floor(diff / 60)} মিনিট আগে`;
}

function isDetailedQuestion(message: string) {
  const q = message.toLowerCase();

  return hasAny(q, [
    "বিস্তারিত",
    "bistarito",
    "details",
    "detail",
    "explain",
    "elaborate",
    "ব্যাখ্যা",
    "কীভাবে",
    "কিভাবে",
    "how",
    "কেন",
    "why",
    "innovation",
    "ইনোভেশন",
    "পুরো",
    "সম্পূর্ণ",
    "full",
  ]);
}

function isSearchQuestion(message: string) {
  const q = message.toLowerCase();

  return hasAny(q, [
    "search",
    "সার্চ",
    "খুঁজে",
    "খুজে",
    "খোঁজ",
    "খোজ",
    "google",
    "গুগল",
    "latest",
    "বর্তমান খবর",
    "আজকের খবর",
    "news",
    "ওয়েব",
    "web",
  ]);
}

async function getSimpleWebContext(query: string) {
  try {
    const url =
      "https://api.duckduckgo.com/?q=" +
      encodeURIComponent(query) +
      "&format=json&no_html=1&skip_disambig=1";

    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        "User-Agent": "KrishiRoverDemo/1.0",
      },
    });

    if (!res.ok) return "";

    const data = await res.json();

    const abstractText =
      typeof data.AbstractText === "string" ? data.AbstractText.trim() : "";

    const heading =
      typeof data.Heading === "string" ? data.Heading.trim() : "";

    if (abstractText) {
      return `Web result title: ${heading}\nWeb result summary: ${abstractText}`;
    }

    return "";
  } catch {
    return "";
  }
}

function fixedFieldReply(
  message: string,
  roverData: RoverData | null | undefined,
) {
  const q = message.toLowerCase();
  const detailed = isDetailedQuestion(message);

  if (
    hasAny(q, [
      "সময়",
      "time",
      "কয়টা বাজে",
      "কয়টা বাজে",
      "date",
      "তারিখ",
      "আজ কী বার",
      "আজ কি বার",
    ])
  ) {
    return getBangladeshTimeText();
  }

  if (
    hasAny(q, [
      "তোমার নাম",
      "tomar nam",
      "nam ki",
      "name ki",
      "your name",
      "নাম কী",
      "নাম কি",
    ])
  ) {
    return detailed
      ? "আমার নাম সেচবন্ধু। আমি কৃষি রোভার প্রজেক্টের বাংলা AI voice assistant। মাঠে রোভার চলার সময় আমি live sensor data দেখে মাটি, সেচ, তাপমাত্রা, আর্দ্রতা এবং বাধা সম্পর্কে উত্তর দিতে পারি।"
      : "আমার নাম সেচবন্ধু।";
  }

  if (
    hasAny(q, [
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
    return detailed
      ? "আমাকে তৈরি করেছেন আখি কেতু চাকমা। আমি কৃষি রোভার প্রজেক্টের real-life field assistant হিসেবে কাজ করি। আমার কাজ হলো rover-এর live condition বুঝে কৃষককে সহজ বাংলায় সাহায্য করা।"
      : "আমাকে তৈরি করেছেন আখি কেতু চাকমা।";
  }

  if (hasAny(q, ["হ্যালো", "hello", "কেমন", "কেমন আছো", "how are you"])) {
    return detailed
      ? "আমি ভালো আছি। আমি সেচবন্ধু, আপনার কৃষি রোভারের বাংলা সহকারী। আপনি মাঠে হাঁটার সময় আমাকে মাটি, পানি, তাপমাত্রা, বাধা, current zone বা rover status জিজ্ঞেস করতে পারেন।"
      : "আমি ভালো আছি। আমি সেচবন্ধু।";
  }

  if (
    hasAny(q, [
      "গান",
      "song",
      "sing",
      "গাও",
      "গাইতে",
      "একটা গান",
      "gaan",
    ])
  ) {
    if (detailed) {
      return "আমি copyrighted গান গাইতে পারি না, তবে কৃষি রোভার নিয়ে একটি ছোট original গান গাইছি। সবুজ মাঠে রোভার চলে, মাটির খবর আনে। শুকনা মাটিতে পানি দেয়, ফসল হাসি টানে। সেচবন্ধু পাশে থাকে, কৃষকের কথা জানে।";
    }

    return "সবুজ মাঠে রোভার চলে, মাটির খবর আনে। শুকনা মাটিতে পানি দিয়ে, ফসল হাসি টানে।";
  }

  if (!roverData) {
    if (
      hasAny(q, [
        "মাঠ",
        "field",
        "status",
        "স্ট্যাটাস",
        "কি অবস্থা",
        "কী অবস্থা",
        "মাটি",
        "পানি",
        "পাম্প",
        "সেচ",
        "তাপমাত্রা",
        "আর্দ্রতা",
        "বাধা",
        "obstacle",
      ])
    ) {
      return "রোভার থেকে live data এখনো পাওয়া যায়নি। ESP32 WiFi এবং IoT dashboard connection চেক করুন।";
    }

    return null;
  }

  const zoneText = roverData.currentZone
    ? `রোভার এখন ${roverData.currentZone} zone-এ আছে`
    : "রোভার এখন field monitoring করছে";

  const soilText =
    roverData.soilStatus === "DRY"
      ? `মাটি শুকনা, soil value ${roverData.soilValue}`
      : `মাটি ভেজা আছে, soil value ${roverData.soilValue}`;

  const pumpText =
    roverData.pumpStatus === "ON"
      ? "পাম্প এখন চালু আছে"
      : "পাম্প এখন বন্ধ আছে";

  const tempText =
    roverData.temperature !== null
      ? `তাপমাত্রা ${roverData.temperature.toFixed(1)} ডিগ্রি সেলসিয়াস`
      : "তাপমাত্রার data নেই";

  const humidityText =
    roverData.humidity !== null
      ? `আর্দ্রতা ${roverData.humidity.toFixed(1)} শতাংশ`
      : "আর্দ্রতার data নেই";

  const front =
    roverData.frontDistance === null ? 999 : roverData.frontDistance;
  const left = roverData.leftDistance === null ? 999 : roverData.leftDistance;
  const right = roverData.rightDistance === null ? 999 : roverData.rightDistance;

  const obstacleText =
    front <= 20
      ? `সামনে ${front} সেন্টিমিটার দূরে বাধা আছে`
      : front <= 35
        ? `সামনে ${front} সেন্টিমিটার দূরে কিছু আছে, রোভার সতর্কভাবে চলবে`
        : "সামনের রাস্তা আপাতত পরিষ্কার";

  if (
    hasAny(q, [
      "আমি মাঠে",
      "ami mathe",
      "field",
      "মাঠে হাঁটছি",
      "হাঁটছি",
      "walking",
      "কি দেখছো",
      "কী দেখছো",
      "কি অবস্থা",
      "কী অবস্থা",
      "সামনে কী",
      "সামনে কি",
      "চলতে পারবে",
      "safe",
      "নিরাপদ",
    ])
  ) {
    return detailed
      ? `${zoneText}। ${obstacleText}। ${soilText}। ${pumpText}। ${tempText} এবং ${humidityText}। এই অবস্থায় রোভার প্রয়োজন অনুযায়ী চলবে এবং dry zone হলে শুধু ২ সেকেন্ড সেচ দেবে।`
      : `${zoneText}। ${obstacleText}। ${soilText}।`;
  }

  if (
    hasAny(q, [
      "পানি লাগবে",
      "পানি দিতে হবে",
      "সেচ লাগবে",
      "সেচ দরকার",
      "water needed",
      "irrigation needed",
      "পাম্প চালাও",
      "pump",
      "পাম্প",
      "সেচ",
      "পানি",
    ])
  ) {
    if (roverData.soilStatus === "DRY") {
      return detailed
        ? `এই zone-এ পানি দরকার, কারণ ${soilText}। রোভার dry condition detect করলে থামে, red LED চালু করে এবং pump ২ সেকেন্ডের জন্য চালু করে। এরপর pump বন্ধ হয়ে rover আবার চলা শুরু করে।`
        : "এই zone-এ পানি দরকার। মাটি শুকনা, তাই পাম্প ২ সেকেন্ড চলবে।";
    }

    return detailed
      ? `এই zone-এ এখন পানি দরকার নেই, কারণ ${soilText}। Wet condition হলে green LED চালু থাকে এবং pump বন্ধ থাকে। এতে অপ্রয়োজনীয় পানি নষ্ট হয় না।`
      : "এখন পানি দরকার নেই। মাটি ভেজা আছে।";
  }

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
    ])
  ) {
    if (roverData.soilStatus === "DRY") {
      return detailed
        ? `${soilText}। এই value threshold-এর উপরে, তাই rover এটাকে dry zone হিসেবে ধরেছে। Dry হলে pump ২ সেকেন্ড পানি দেয় এবং red LED চালু হয়।`
        : `মাটি শুকনা। Soil value ${roverData.soilValue}।`;
    }

    return detailed
      ? `${soilText}। এই value threshold-এর নিচে, তাই rover এটাকে wet zone হিসেবে ধরেছে। Wet হলে pump বন্ধ থাকে এবং green LED চালু থাকে।`
      : `মাটি ভেজা আছে। Soil value ${roverData.soilValue}।`;
  }

  if (
    hasAny(q, [
      "তাপমাত্রা",
      "temperature",
      "temp",
      "tapmatra",
      "কত ডিগ্রি",
    ])
  ) {
    return detailed
      ? `বর্তমান ${tempText}। এই data DHT11 sensor থেকে ESP32 পড়ে IoT dashboard-এ পাঠিয়েছে। আমি সেই live rover data থেকেই উত্তর দিচ্ছি।`
      : `বর্তমান ${tempText}।`;
  }

  if (
    hasAny(q, [
      "আর্দ্রতা",
      "humidity",
      "humid",
      "ardrota",
      "ardrata",
      "হিউমিডিটি",
    ])
  ) {
    return detailed
      ? `বর্তমান ${humidityText}। এই data DHT11 sensor থেকে নেওয়া হয়েছে এবং IoT dashboard-এ live update হচ্ছে।`
      : `বর্তমান ${humidityText}।`;
  }

  if (
    hasAny(q, [
      "বাধা",
      "obstacle",
      "সামনে",
      "front",
      "দূরত্ব",
      "distance",
      "রাস্তা",
      "path",
      "ডানে",
      "বামে",
      "left",
      "right",
    ])
  ) {
    return detailed
      ? `সামনে ${front} সেন্টিমিটার, বামে ${left} সেন্টিমিটার এবং ডানে ${right} সেন্টিমিটার distance আছে। ${obstacleText}। রোভার obstacle পেলে থামে, পাশে ঘুরে, তারপর আবার চলতে থাকে।`
      : `${obstacleText}।`;
  }

  if (
    hasAny(q, [
      "zone",
      "জোন",
      "কোন জোন",
      "কোথায়",
      "কোথায়",
      "current",
      "status",
      "স্ট্যাটাস",
      "rover status",
      "এখন কী করছে",
      "এখন কি করছে",
    ])
  ) {
    return detailed
      ? `${zoneText}। Direction হলো ${roverData.zoneDirection || "unknown"}। Rover status হলো ${roverData.roverStatus}। শেষ data update হয়েছে ${formatTimeAgo(roverData.updatedAt)}।`
      : `${zoneText}। ${roverData.roverStatus}।`;
  }

  if (
    hasAny(q, [
      "সব data",
      "সব ডাটা",
      "summary",
      "সারাংশ",
      "সব বলো",
      "সব দেখাও",
      "field summary",
      "পুরো অবস্থা",
    ])
  ) {
    return detailed
      ? `${zoneText}। ${soilText}। ${tempText} এবং ${humidityText}। ${pumpText}। ${obstacleText}।`
      : `${soilText}। ${tempText}, ${humidityText}। ${pumpText}।`;
  }

  if (hasAny(q, ["টিম", "team", "মেম্বার", "সদস্য", "team member"])) {
    return detailed
      ? "আমাদের টিমে আছেন আখি, জাওয়াদ, সজিব, আসিফ এবং ফাহিম। আমরা কৃষির জন্য smart farming rover তৈরি করেছি, যা field monitoring, smart irrigation, IoT dashboard এবং Bangla voice interaction একসাথে করে।"
      : "আমাদের টিমে আছেন আখি, জাওয়াদ, সজিব, আসিফ এবং ফাহিম।";
  }

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
    return detailed
      ? "কৃষি রোভার একটি real-life smart farming rover prototype। এটি মাঠে zone ধরে চলে, obstacle detect করে, soil moisture check করে এবং মাটি শুকনা হলে শুধু ২ সেকেন্ড পানি দেয়। একই সাথে live data IoT dashboard-এ দেখায় এবং Bangla AI assistant কৃষকের সাথে field interaction করতে পারে।"
      : "কৃষি রোভার মাঠে soil monitoring, smart irrigation, obstacle avoidance এবং Bangla voice interaction করতে পারে।";
  }

  return null;
}

function cleanReply(text: string, detailed: boolean) {
  let reply = text.replace(/\s+/g, " ").replace(/["“”]/g, "").trim();

  const maxLength = detailed ? 520 : 320;

  const sentences = reply.match(/[^।!?]+[।!?]+/g);

  if (sentences && sentences.length > 0) {
    let finalText = "";

    for (const sentence of sentences) {
      if ((finalText + " " + sentence).trim().length <= maxLength) {
        finalText = (finalText + " " + sentence).trim();
      } else {
        break;
      }
    }

    if (finalText.length > 0) {
      reply = finalText;
    }
  }

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

export async function GET(req: Request) {
  return NextResponse.json({
    ok: true,
    message: "Real-life field AI agent is working",
    origin: new URL(req.url).origin,
    currentTime: getBangladeshTimeText(),
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

    let webContext = "";

    if (isSearchQuestion(message)) {
      webContext = await getSimpleWebContext(message);
    }

    let reply = fixedFieldReply(message, roverData);

    if (!reply) {
      const roverDataText = roverData
        ? `
Live Rover Field Data:
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
        : "Live Rover Field Data: Not available yet.";

      const webText = webContext
        ? `
Web Search Context:
${webContext}
`
        : "Web Search Context: No useful live web result found for this query.";

      const completion = await groq.chat.completions.create({
        model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
        temperature: 0.35,
        max_tokens: detailed ? 260 : 180,
        messages: [
          {
            role: "system",
            content: `
তোমার নাম "সেচবন্ধু"।

তুমি Krishi Rover-এর real-life Bangla AI field assistant।

Current time:
${getBangladeshTimeText()}

তোমার কাজ:
- কৃষক মাঠে হাঁটলে তার সাথে naturally কথা বলা।
- Rover live data দেখে field situation বোঝানো।
- Fixed Q/A এর মতো উত্তর দেবে না; real-life assistant এর মতো উত্তর দেবে।
- সাধারণ প্রশ্নে ২ থেকে ৪টি complete sentence দেবে।
- "বিস্তারিত", "bistarito", "explain", "কীভাবে", "কেন" থাকলে ৪ থেকে ৬টি complete sentence দেবে।
- Sentence কখনো মাঝখানে কেটে দেবে না।
- Sensor value বানিয়ে বলবে না।
- Live data না থাকলে বলবে live data পাওয়া যাচ্ছে না।
- Current time জানতে চাইলে উপরের Current time ব্যবহার করবে।
- User গান গাইতে বললে copyrighted গান গাইবে না; Krishi Rover বা farming নিয়ে ছোট original বাংলা গান গাইবে।
- Web search context থাকলে সেটা ব্যবহার করবে; না থাকলে বলবে live web result পাওয়া যায়নি।
- উত্তর অবশ্যই বাংলায় হবে।
- ESP32 speaker-এর জন্য উত্তর clear, natural, complete এবং human-like হবে।

Project Context:
${PROJECT_CONTEXT}

${roverDataText}

${webText}
            `,
          },
          { role: "user", content: message },
        ],
      });

      reply =
        completion.choices[0]?.message?.content?.trim() ||
        "দুঃখিত, আমি এখন উত্তর দিতে পারছি না।";
    }

    reply = cleanReply(reply, detailed);

    return NextResponse.json({
      reply,
      ttsUrl: makeTtsUrl(req, reply),
      roverData,
      currentTime: getBangladeshTimeText(),
      webContext: webContext || null,
    });
  } catch (error) {
    console.warn("ESP32 Agent API error:", error);

    return NextResponse.json(
      { error: "ESP32 AI response failed" },
      { status: 500 },
    );
  }
}