"use client";

import { useEffect, useRef, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((event: any) => void) | null;
  onresult: ((event: any) => void) | null;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

export default function VoiceAgent() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "আসসালামু আলাইকুম। আমি সেচবন্ধু। আমি স্মার্ট ইরিগেশন রোভার প্রকল্পের বাংলা ভয়েস সহকারী। আমাকে প্রকল্প সম্পর্কে প্রশ্ন করুন।",
    },
  ]);

  const [finalTranscript, setFinalTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState("");

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const shouldKeepListeningRef = useRef(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioPlayIdRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const Recognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!Recognition) {
      setError(
        "আপনার ব্রাউজার লাইভ ভয়েস রিকগনিশন সাপোর্ট করছে না। Chrome অথবা Edge ব্যবহার করুন।"
      );
      return;
    }

    const recognition = new Recognition();

    recognition.lang = "bn-BD";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
      setError("");
    };

    recognition.onend = () => {
      setIsListening(false);

      if (shouldKeepListeningRef.current) {
        try {
          recognition.start();
        } catch {
          // Browser may block quick restart.
        }
      }
    };

    recognition.onerror = (event: any) => {
      const errorType = event?.error || "unknown";

      console.warn("Speech recognition warning:", {
        error: errorType,
        message: event?.message || "",
      });

      shouldKeepListeningRef.current = false;
      setIsListening(false);

      if (errorType === "not-allowed" || errorType === "service-not-allowed") {
        setError(
          "মাইক্রোফোন পারমিশন বন্ধ আছে। ব্রাউজারের address bar-এর lock icon থেকে microphone allow করুন।"
        );
        return;
      }

      if (errorType === "no-speech") {
        setError("কোনো কথা পাওয়া যায়নি। একটু পরিষ্কারভাবে আবার বলুন।");
        return;
      }

      if (errorType === "audio-capture") {
        setError("মাইক্রোফোন পাওয়া যায়নি। আপনার microphone device check করুন।");
        return;
      }

      if (errorType === "network") {
        setError(
          "Speech recognition network problem হয়েছে। Internet connection check করুন।"
        );
        return;
      }

      if (errorType === "aborted") {
        setError("");
        return;
      }

      setError(`Speech recognition failed: ${errorType}`);
    };

    recognition.onresult = (event: any) => {
      let interim = "";
      let finalText = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalText += transcript + " ";
        } else {
          interim += transcript;
        }
      }

      if (finalText.trim()) {
        setFinalTranscript((prev) => `${prev} ${finalText}`.trim());
      }

      setInterimTranscript(interim);
    };

    recognitionRef.current = recognition;

    return () => {
      shouldKeepListeningRef.current = false;
      recognition.abort();
      stopSpeaking();
    };
  }, []);

  const startListening = async () => {
    if (!recognitionRef.current) {
      setError("Speech recognition পাওয়া যায়নি। Chrome অথবা Edge ব্যবহার করুন।");
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      setError("আপনার ব্রাউজারে microphone API পাওয়া যায়নি।");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
    } catch {
      setError(
        "মাইক্রোফোন পারমিশন বন্ধ আছে। Browser address bar-এর lock icon থেকে microphone allow করুন।"
      );
      return;
    }

    stopSpeaking();

    setError("");
    setFinalTranscript("");
    setInterimTranscript("");
    shouldKeepListeningRef.current = true;

    try {
      recognitionRef.current.start();
    } catch {
      console.warn("Speech recognition already started.");
    }
  };

  const stopListening = () => {
    shouldKeepListeningRef.current = false;
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const stopSpeaking = () => {
    audioPlayIdRef.current += 1;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    setIsSpeaking(false);
  };

  const playAudioUrls = async (urls: string[]) => {
  if (!urls.length) return;

  const currentPlayId = audioPlayIdRef.current;

  setIsSpeaking(true);

  try {
    for (const url of urls) {
      if (currentPlayId !== audioPlayIdRef.current) break;

      await new Promise<void>((resolve, reject) => {
        const audio = new Audio(url);
        audioRef.current = audio;

        audio.preload = "auto";

        audio.onended = () => resolve();

        audio.onerror = () => {
          reject(new Error(`Audio playback failed for: ${url}`));
        };

        audio.play().catch((err) => {
          reject(err);
        });
      });
    }
  } catch (err) {
    console.warn("Bangla audio playback warning:", err);
    setError(
      "Audio play হয়নি। Browser refresh করুন, তারপর আবার Test Real Bangla Voice চাপুন।"
    );
  } finally {
    if (currentPlayId === audioPlayIdRef.current) {
      setIsSpeaking(false);
      audioRef.current = null;
    }
  }
};

  const speakBangla = async (text: string) => {
    const cleanText = text.trim();

    if (!cleanText) return;

    stopSpeaking();
    setError("");

    try {
      const res = await fetch("/api/bangla-tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: cleanText,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Bangla TTS failed.");
      }

      const urls: string[] = Array.isArray(data.urls) ? data.urls : [];

      if (!urls.length) {
        throw new Error("No Bangla audio generated.");
      }

      await playAudioUrls(urls);
    } catch (err) {
      console.warn(err);
      setError(
        "বাংলা ভয়েস তৈরি করা যায়নি। Internet connection check করুন অথবা আবার চেষ্টা করুন।"
      );
    }
  };

  const testBanglaVoice = () => {
    void speakBangla(
      "আসসালামু আলাইকুম। আমি সেচবন্ধু। এখন আমি সত্যিকারের বাংলা ভয়েসে কথা বলছি।"
    );
  };

  const askAgent = async () => {
    const userText = `${finalTranscript} ${interimTranscript}`.trim();

    if (!userText) {
      setError("প্রথমে কথা বলুন, তারপর Ask AI চাপুন।");
      return;
    }

    stopListening();
    stopSpeaking();

    setIsThinking(true);
    setError("");

    const nextMessages: ChatMessage[] = [
      ...messages,
      {
        role: "user",
        content: userText,
      },
    ];

    setMessages(nextMessages);
    setFinalTranscript("");
    setInterimTranscript("");

    try {
      const res = await fetch("/api/robot-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: nextMessages,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "AI request failed.");
      }

      const assistantReply =
        data.reply || "দুঃখিত, আমি এখন উত্তর দিতে পারছি না।";

      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: assistantReply,
        },
      ]);

      void speakBangla(assistantReply);
    } catch (err) {
      console.warn(err);
      setError("AI response failed. Groq API key এবং terminal check করুন।");
    } finally {
      setIsThinking(false);
    }
  };

  const liveText = `${finalTranscript} ${interimTranscript}`.trim();

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-3xl border border-emerald-500/20 bg-card/70 p-6 shadow-lg backdrop-blur md:p-8">
        <div className="mb-6 text-center">
          <div className="mb-3 inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-600">
            বাংলা ভয়েস এআই এজেন্ট
          </div>

          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            কথা বলুন{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              সেচবন্ধুর
            </span>{" "}
            সাথে
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            মাইক্রোফোন ব্যবহার করে বাংলায় প্রশ্ন করুন। সেচবন্ধু আপনার কথা live
            দেখাবে এবং বাংলায় উত্তর দেবে।
          </p>
        </div>

        <div className="mb-6 rounded-2xl border border-border bg-background/80 p-4">
          <p className="mb-2 text-sm font-semibold text-muted-foreground">
            লাইভ ট্রান্সক্রিপ্ট
          </p>

          <div className="min-h-24 rounded-xl bg-muted/50 p-4 text-lg leading-8">
            {liveText ? (
              <>
                <span>{finalTranscript}</span>{" "}
                <span className="text-emerald-600">{interimTranscript}</span>
              </>
            ) : (
              <span className="text-muted-foreground">
                মাইক্রোফোন চালু করুন, তারপর বাংলায় কথা বলুন...
              </span>
            )}
          </div>
        </div>

        <div className="mb-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
          <p className="mb-2 text-sm font-semibold text-emerald-700">
            Real Bangla Voice Mode
          </p>

          <p className="text-sm leading-7 text-muted-foreground">
            এখন browser-এর English voice ব্যবহার করা হচ্ছে না। AI উত্তরকে আলাদা
            Bangla audio হিসেবে play করা হবে।
          </p>

          <button
            onClick={testBanglaVoice}
            disabled={isSpeaking}
            className="mt-4 rounded-full border border-emerald-500/30 px-5 py-2 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-500/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSpeaking ? "Playing..." : "Test Real Bangla Voice"}
          </button>
        </div>

        <div className="mb-6 flex flex-wrap justify-center gap-3">
          {!isListening ? (
            <button
              onClick={startListening}
              disabled={isThinking}
              className="rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Start Mic
            </button>
          ) : (
            <button
              onClick={stopListening}
              className="rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Stop Mic
            </button>
          )}

          <button
            onClick={askAgent}
            disabled={isThinking || !liveText}
            className="rounded-full bg-teal-600 px-6 py-3 font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isThinking ? "Thinking..." : "Ask AI"}
          </button>

          <button
            onClick={stopSpeaking}
            disabled={!isSpeaking}
            className="rounded-full border border-border px-6 py-3 font-semibold transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
          >
            Stop Voice
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`rounded-2xl p-4 ${
                msg.role === "user"
                  ? "ml-auto max-w-[85%] bg-emerald-600 text-white"
                  : "mr-auto max-w-[85%] border border-border bg-background"
              }`}
            >
              <p className="mb-1 text-xs font-semibold opacity-70">
                {msg.role === "user" ? "আপনি" : "সেচবন্ধু"}
              </p>
              <p className="whitespace-pre-wrap leading-7">{msg.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}