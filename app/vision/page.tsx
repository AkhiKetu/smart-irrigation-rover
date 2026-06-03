import { projectVision, projectGoals } from '@/lib/data';

export const metadata = {
  title: 'Vision & Goals | Smart Irrigation Rover',
  description: 'Our project vision and key strategic goals for the Smart Irrigation Rover',
};

export default function VisionPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">Vision & Goals</h1>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our strategic direction and key objectives for the Smart Irrigation Rover project
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-foreground">Project Vision</h2>
          <div className="bg-gradient-to-br from-emerald-500/10 to-teal-600/10 border border-emerald-500/30 rounded-xl p-8 sm:p-12">
            <p className="text-xl text-foreground leading-relaxed text-balance">
              {projectVision}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">💧</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Water Efficiency</h3>
              <p className="text-sm text-muted-foreground">Minimize water waste through precision targeting</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">🤖</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Autonomous Operation</h3>
              <p className="text-sm text-muted-foreground">Hands-free intelligent irrigation management</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">🌿</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Plant Health</h3>
              <p className="text-sm text-muted-foreground">Optimal watering for thriving gardens</p>
            </div>
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-foreground">Key Project Goals</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projectGoals.map((goal, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-8 hover:shadow-lg hover:border-emerald-500/50 transition-all"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{index + 1}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-3">{goal.title}</h3>
                    <p className="text-foreground leading-relaxed">{goal.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Roadmap */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Implementation Roadmap</h2>

          <div className="space-y-6">
            {[
              { phase: 'Phase 1', title: 'Foundation & Planning', description: 'Requirements analysis, component selection, and initial design' },
              { phase: 'Phase 2', title: 'Development', description: 'Hardware assembly, software architecture, and sensor integration' },
              { phase: 'Phase 3', title: 'Integration & Testing', description: 'System integration, calibration, and field testing' },
              { phase: 'Phase 4', title: 'Optimization & Finalization', description: 'Performance tuning, documentation, and final deployment' },
            ].map((item, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-600/20 border border-emerald-500/30">
                  <span className="text-lg font-bold text-emerald-600">{index + 1}</span>
                </div>
                <div className="flex-1 bg-card border border-border rounded-lg p-6">
                  <div className="text-sm font-medium text-emerald-600 mb-1">{item.phase}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden lg:block absolute left-[calc(50%-32px)] w-1 h-12 bg-gradient-to-b from-emerald-500/50 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Success Metrics</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Technical Performance</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Soil moisture detection accuracy {'>'} 95%</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Autonomous navigation reliability {'>'} 90%</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Water delivery precision within 5cm</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Battery operation duration {'>'} 4 hours</span>
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Project Outcomes</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Fully functional prototype delivery</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Complete documentation package</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Field testing success on real garden</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Team presentation and demonstration</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
