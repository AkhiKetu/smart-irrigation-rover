"use client";

import { useState } from "react";

export default function RobotVoicePage() {
  const [listening, setListening] = useState(false);
  const [question, setQuestion] = useState("");
  const [reply, setReply] = useState("");
  const [status, setStatus] = useState("Ready");

  function fixTtsUrlForBrowser(url: string) {
    return url
      .replace("http://0.0.0.0:3000", "http://localhost:3000")
      .replace("https://0.0.0.0:3000", "http://localhost:3000")
      .replace("http://172.20.10.3:3000", "http://localhost:3000")
      .replace("https://172.20.10.3:3000", "http://localhost:3000");
  }

  async function sendToRobot(text: string) {
    const cleanText = text.trim();

    if (!cleanText) {
      setStatus("No question found.");
      return;
    }

    try {
      setStatus("Thinking...");
      setQuestion(cleanText);

      const aiRes = await fetch("/api/esp32-agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: cleanText,
        }),
      });

      const aiData = await aiRes.json();

      if (!aiRes.ok || !aiData.reply || !aiData.ttsUrl) {
        setStatus("AI failed.");
        return;
      }

      setReply(aiData.reply);

      const browserTtsUrl = fixTtsUrlForBrowser(aiData.ttsUrl);

      console.log("Original TTS URL:", aiData.ttsUrl);
      console.log("Browser TTS URL:", browserTtsUrl);

      setStatus("Preparing robot voice...");

      const warmupRes = await fetch(browserTtsUrl, {
        method: "GET",
        cache: "no-store",
      });

      if (!warmupRes.ok) {
        console.warn("TTS warmup failed:", warmupRes.status);
      }

      // Important: send original ttsUrl to ESP32.
      // ESP32 will convert 0.0.0.0/localhost to 172.20.10.3 itself.
      setStatus("Sending reply to ESP32 speaker...");

      const robotRes = await fetch("/api/robot-speak", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: cleanText,
          reply: aiData.reply,
          ttsUrl: aiData.ttsUrl,
        }),
      });

      const robotData = await robotRes.json();

      if (!robotRes.ok || !robotData.ok) {
        setStatus("Failed to send to ESP32.");
        return;
      }

      setStatus("Sent to ESP32. Robot should speak now.");
    } catch (error) {
      console.error(error);
      setStatus("Error. Check local server.");
    }
  }

  function startListening() {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setStatus("Speech recognition not supported. Use Chrome or Edge.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "bn-BD";
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListening(true);
      setStatus("Listening... Speak now.");
    };

    recognition.onerror = (event: any) => {
      console.error(event);
      setListening(false);
      setStatus("Mic error. Allow microphone permission.");
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onresult = async (event: any) => {
      const text = event.results?.[0]?.[0]?.transcript || "";

      setListening(false);
      setStatus("Heard: " + text);

      await sendToRobot(text);
    };

    recognition.start();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-700 p-6 shadow-2xl">
        <h1 className="text-3xl font-bold mb-2">Krishi Rover Voice Control</h1>

        <p className="text-slate-300 mb-6">
          Speak using laptop microphone. ESP32 robot speaker will reply.
        </p>

        <button
          onClick={startListening}
          disabled={listening}
          className="w-full rounded-2xl bg-green-500 hover:bg-green-600 disabled:bg-slate-600 text-black font-bold py-4 text-xl transition"
        >
          {listening ? "Listening..." : "Speak to Robot"}
        </button>

        <div className="mt-6">
          <label className="block text-sm text-slate-400 mb-2">
            Or type a question
          </label>

          <div className="flex gap-2">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="তোমাদের প্রজেক্ট কী করে?"
              className="flex-1 rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 outline-none"
            />

            <button
              onClick={() => sendToRobot(question)}
              className="rounded-xl bg-blue-500 hover:bg-blue-600 px-5 font-bold"
            >
              Send
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-slate-800 p-4">
          <p className="text-sm text-slate-400">Status</p>
          <p className="text-lg">{status}</p>
        </div>

        <div className="mt-4 rounded-2xl bg-slate-800 p-4">
          <p className="text-sm text-slate-400">Question</p>
          <p className="text-lg">{question || "No question yet"}</p>
        </div>

        <div className="mt-4 rounded-2xl bg-slate-800 p-4">
          <p className="text-sm text-slate-400">AI Reply</p>
          <p className="text-lg">{reply || "No reply yet"}</p>
        </div>

        <p className="mt-6 text-sm text-yellow-300">
          Open this page from laptop browser using localhost for microphone
          permission: http://localhost:3000/robot-voice
        </p>
      </div>
    </main>
  );
}