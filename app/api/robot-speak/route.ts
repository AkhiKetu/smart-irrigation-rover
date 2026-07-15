import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RobotSpeakData = {
  id: number;
  question: string;
  reply: string;
  ttsUrl: string;
  createdAt: string;
};

declare global {
  // eslint-disable-next-line no-var
  var robotSpeakLatest: RobotSpeakData | null | undefined;

  // eslint-disable-next-line no-var
  var robotSpeakCounter: number | undefined;
}

if (!global.robotSpeakLatest) {
  global.robotSpeakLatest = null;
}

if (!global.robotSpeakCounter) {
  global.robotSpeakCounter = 0;
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    data: global.robotSpeakLatest,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const question =
      typeof body.question === "string" ? body.question.trim() : "";

    const reply =
      typeof body.reply === "string" ? body.reply.trim() : "";

    const ttsUrl =
      typeof body.ttsUrl === "string" ? body.ttsUrl.trim() : "";

    if (!reply || !ttsUrl) {
      return NextResponse.json(
        { ok: false, error: "reply and ttsUrl are required" },
        { status: 400 }
      );
    }

    // Small ID for ESP32. No overflow problem.
    global.robotSpeakCounter = (global.robotSpeakCounter || 0) + 1;

    const data: RobotSpeakData = {
      id: global.robotSpeakCounter,
      question,
      reply,
      ttsUrl,
      createdAt: new Date().toISOString(),
    };

    global.robotSpeakLatest = data;

    return NextResponse.json({
      ok: true,
      data,
    });
  } catch (error) {
    console.warn("robot-speak POST error:", error);

    return NextResponse.json(
      { ok: false, error: "Failed to save robot speech" },
      { status: 500 }
    );
  }
}