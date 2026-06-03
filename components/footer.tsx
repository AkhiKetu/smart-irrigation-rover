export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SIR</span>
              </div>
              <span className="font-bold text-foreground">Smart Irrigation Rover</span>
            </div>
            <p className="text-sm text-muted-foreground">
              An intelligent robotic solution for adaptive garden irrigation through advanced soil sensing and autonomous navigation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/" className="hover:text-emerald-600 transition-colors">Home</a></li>
              <li><a href="/team" className="hover:text-emerald-600 transition-colors">Team</a></li>
              <li><a href="/vision" className="hover:text-emerald-600 transition-colors">Vision & Goals</a></li>
              <li><a href="/updates" className="hover:text-emerald-600 transition-colors">Updates</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Project Info</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Robotics Course Project</li>
              <li>Semester: Spring 2024</li>
              <li>5-Member Development Team</li>
              <li>Advanced Autonomous Systems</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} Smart Irrigation Rover Team. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
