import VoiceAgent from '@/components/voice-agent';

export default function AiAgentPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-4 inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-600">
            Smart Irrigation Rover AI
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Ai-Agent{' '}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              সেচবন্ধু
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
            বাংলায় কথা বলুন, আপনার প্রশ্ন লাইভ দেখুন, এবং Smart Irrigation
            Rover project সম্পর্কে সেচবন্ধুর কাছ থেকে বাংলা উত্তর শুনুন।
          </p>
        </div>
      </section>

      <VoiceAgent />
    </main>
  );
}