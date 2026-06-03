import Link from 'next/link';
import { projectVision, projectGoals } from '@/lib/data';

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/10 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
            <span className="text-sm font-medium text-emerald-600">Robotics Course Project</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-balance">
            Smart Irrigation <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">Rover</span>
          </h1>

          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 text-balance leading-relaxed">
            An intelligent autonomous system that combines advanced robotics, AI-powered soil sensing, and precision irrigation to deliver water exactly where plants need it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/team"
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl"
            >
              Meet the Team
            </Link>
            <Link
              href="/updates"
              className="px-8 py-3 rounded-lg bg-muted text-foreground font-semibold hover:bg-muted/80 transition-all border border-border"
            >
              View Updates
            </Link>
          </div>

          <div className="relative h-64 sm:h-80 bg-muted rounded-xl border border-border/50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 via-transparent to-transparent" />
            <svg
              className="w-full h-full text-muted-foreground/30"
              fill="none"
              viewBox="0 0 400 300"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Simple rover illustration */}
              <rect x="120" y="120" width="160" height="80" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="150" cy="200" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="250" cy="200" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
              <rect x="140" y="100" width="120" height="25" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="200" cy="90" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">Our Vision</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 mx-auto mb-6" />
          </div>

          <div className="bg-card border border-border rounded-xl p-8 sm:p-12 shadow-lg">
            <p className="text-lg sm:text-xl text-foreground leading-relaxed text-balance">
              {projectVision}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Goals Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">Key Project Goals</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectGoals.slice(0, 3).map((goal, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-emerald-500/50 transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-600/20 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-emerald-600">{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{goal.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{goal.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/vision"
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
            >
              View All Goals
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="text-3xl font-bold text-emerald-600 mb-2">5</div>
              <p className="text-sm text-muted-foreground">Team Members</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="text-3xl font-bold text-emerald-600 mb-2">15+</div>
              <p className="text-sm text-muted-foreground">Weeks Duration</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="text-3xl font-bold text-emerald-600 mb-2">5</div>
              <p className="text-sm text-muted-foreground">Key Goals</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="text-3xl font-bold text-emerald-600 mb-2">100%</div>
              <p className="text-sm text-muted-foreground">Autonomous</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
