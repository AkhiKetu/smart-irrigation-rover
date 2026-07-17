import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

if (globalStore.latestRoverData === undefined) {
  globalStore.latestRoverData = null;
}

function numberOrNull(value: unknown) {
  if (value === null || value === undefined || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function booleanValue(value: unknown) {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value.toLowerCase() === "true";
  return false;
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    data: globalStore.latestRoverData,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const data: RoverData = {
      soilValue: Number(body.soilValue ?? 0),
      soilStatus: body.soilStatus === "DRY" ? "DRY" : "WET",

      temperature: numberOrNull(body.temperature),
      humidity: numberOrNull(body.humidity),

      pumpStatus: body.pumpStatus === "ON" ? "ON" : "OFF",

      redLed: body.redLed === "ON" ? "ON" : "OFF",
      greenLed: body.greenLed === "ON" ? "ON" : "OFF",

      frontDistance: numberOrNull(body.frontDistance),
      leftDistance: numberOrNull(body.leftDistance),
      rightDistance: numberOrNull(body.rightDistance),

      currentZone:
        typeof body.currentZone === "string" ? body.currentZone : undefined,

      zoneDirection:
        typeof body.zoneDirection === "string" ? body.zoneDirection : undefined,

      missionComplete: booleanValue(body.missionComplete),

      roverStatus: String(body.roverStatus || "Running"),

      updatedAt: new Date().toISOString(),
    };

    globalStore.latestRoverData = data;

    return NextResponse.json({
      ok: true,
      data,
    });
  } catch (error) {
    console.warn("Rover data POST error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Failed to save rover data",
      },
      { status: 500 },
    );
  }
}