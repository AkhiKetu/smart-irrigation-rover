import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = body.message || "";

    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
      return new Response("Groq API key missing.", { status: 500 });
    }

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content:
              "You are Krishi Rover, a smart farming robot assistant. Reply very shortly for ESP32 speaker. Use simple English or romanized Bangla only. Do not use Bengali script. Keep answer under 20 words.",
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.5,
        max_tokens: 60,
      }),
    });

    const data = await groqRes.json();

    const reply =
      data?.choices?.[0]?.message?.content ||
      "Sorry, I could not answer.";

    return new Response(reply, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    return new Response("Server error.", { status: 500 });
  }
}
