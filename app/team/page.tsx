import { TeamCard } from '@/components/team-card';
import { teamMembers } from '@/lib/data';

export const metadata = {
  title: 'Meet Our Team | Smart Irrigation Rover',
  description: '5-member development team leading the Smart Irrigation Rover project',
};

export default function TeamPage() {
  return (
    <div className="bg-background border-border text-foreground">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">Meet Our Team</h1>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Five dedicated engineers working together to bring the Smart Irrigation Rover to life through innovation, collaboration, and technical excellence.
          </p>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">5</div>
              <p className="text-muted-foreground">Team Members</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">3</div>
              <p className="text-muted-foreground">Core Technologies</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">100%</div>
              <p className="text-muted-foreground">Dedicated to Success</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-foreground">Our Core Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
      
              <h3 className="text-lg font-semibold text-foreground mb-2">Innovation</h3>
              <p className="text-sm text-muted-foreground">Pushing boundaries with creative solutions</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              
              <h3 className="text-lg font-semibold text-foreground mb-2">Collaboration</h3>
              <p className="text-sm text-muted-foreground">Working together towards shared goals</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              
              <h3 className="text-lg font-semibold text-foreground mb-2">Excellence</h3>
              <p className="text-sm text-muted-foreground">Delivering quality in everything we do</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              
              <h3 className="text-lg font-semibold text-foreground mb-2">Sustainability</h3>
              <p className="text-sm text-muted-foreground">Building solutions for a better future</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
