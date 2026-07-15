import { NextRequest, NextResponse } from "next/server";
import { getAllAudioUrls, getAudioUrl } from "google-tts-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type TTSResult = {
  shortText: string;
  url: string;
};

const audioCache = new Map<string, Buffer>();

function audioResponse(audioBuffer: Buffer) {
  return new NextResponse(new Uint8Array(audioBuffer), {
    status: 200,
    headers: {
      "Content-Type": "audio/mpeg",
      "Content-Length": String(audioBuffer.length),
      "Cache-Control": "no-store",
    },
  });
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const text = searchParams.get("text");

    if (!text) {
      return NextResponse.json({
        ok: true,
        message: "Bangla TTS API is working",
      });
    }

    const cleanText = text.replace(/\s+/g, " ").trim().slice(0, 160);

    if (!cleanText) {
      return NextResponse.json(
        { error: "Text is required." },
        { status: 400 }
      );
    }

    if (audioCache.has(cleanText)) {
      const cachedAudio = audioCache.get(cleanText)!;
      return audioResponse(cachedAudio);
    }

    const googleAudioUrl = getAudioUrl(cleanText, {
      lang: "bn",
      slow: false,
      host: "https://translate.google.com",
    });

    const audioResponseFromGoogle = await fetch(googleAudioUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
      },
      cache: "no-store",
    });

    if (!audioResponseFromGoogle.ok) {
      return NextResponse.json(
        { error: "Failed to fetch Bangla audio." },
        { status: 500 }
      );
    }

    const arrayBuffer = await audioResponseFromGoogle.arrayBuffer();
    const audioBuffer = Buffer.from(arrayBuffer);

    if (audioCache.size > 30) {
      audioCache.clear();
    }

    audioCache.set(cleanText, audioBuffer);

    return audioResponse(audioBuffer);
  } catch (error) {
    console.warn("Bangla TTS GET error:", error);

    return NextResponse.json(
      { error: "Bangla audio stream failed." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const text = typeof body.text === "string" ? body.text.trim() : "";

    if (!text) {
      return NextResponse.json(
        { error: "Text is required." },
        { status: 400 }
      );
    }

    const cleanText = text.replace(/\s+/g, " ").trim().slice(0, 1200);

    const results = getAllAudioUrls(cleanText, {
      lang: "bn",
      slow: false,
      host: "https://translate.google.com",
      splitPunct: "।,!?;:\n",
    }) as TTSResult[];

    const urls = results
      .map((item) => item.shortText?.trim())
      .filter(Boolean)
      .map((shortText) => {
        return `/api/bangla-tts?text=${encodeURIComponent(shortText)}`;
      });

    if (!urls.length) {
      return NextResponse.json(
        { error: "No audio URL generated." },
        { status: 500 }
      );
    }

    return NextResponse.json({ urls });
  } catch (error) {
    console.warn("Bangla TTS POST error:", error);

    return NextResponse.json(
      { error: "Bangla TTS failed." },
      { status: 500 }
    );
  }
}