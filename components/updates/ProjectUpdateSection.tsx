interface ProjectUpdate {
  id: number;
  title: string;
  description: string;
  date: string;
  image?: string;
  video?: string;
}

const projectUpdates: ProjectUpdate[] = [
  {
    id: 1,
    title: "Rover Chassis Assembly",
    description:
      "The 4WD rover chassis was assembled by installing the motors, wheels, battery holder, and supporting frame.",
    date: "July 2026",
    image: "/Project-Updates/rover-assembly.jpg",
  },
  {
    id: 2,
    title: "Motor Driver Connection",
    description:
      "The DC motors were connected to the L298N motor driver, allowing the ESP32 to control the rover's movement and direction.",
    date: "July 2026",
    image: "/Project-Updates/motor-connection.jpg",
  },
  {
    id: 3,
    title: "Sensor Installation",
    description:
      "Ultrasonic, soil-moisture, temperature, and humidity sensors were installed for obstacle detection and agricultural monitoring.",
    date: "July 2026",
    image: "/Project-Updates/sensor-installation.jpg",
  },
  {
    id: 4,
    title: "Hardware Testing",
    description:
      "The assembled hardware was tested to verify motor movement, sensor readings, irrigation control, and ESP32 communication.",
    date: "July 2026",
    image: "/Project-Updates/hardware-testing.jpg",
  },

  // Future video example:
  // {
  //   id: 5,
  //   title: "Rover Movement Test",
  //   description:
  //     "This video demonstrates the rover's movement, obstacle detection, and automatic navigation.",
  //   date: "August 2026",
  //   video: "/Project-Updates/rover-testing.mp4",
  // },
];

export function ProjectUpdateSection() {
  return (
    <section className="bg-muted/40 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
            Development Progress
          </p>

          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Project Updates
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Images, explanations, and videos showing the hardware assembly,
            testing process, and development progress of the Krishi Rover.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projectUpdates.map((update) => (
            <article
              key={update.id}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-xl"
            >
              <div className="relative aspect-video overflow-hidden bg-muted">
                {update.image && (
                  <img
                    src={update.image}
                    alt={update.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}

                {update.video && (
                  <video
                    controls
                    preload="metadata"
                    className="h-full w-full object-cover"
                  >
                    <source src={update.video} type="video/mp4" />
                    Your browser does not support video playback.
                  </video>
                )}
              </div>

              <div className="p-6">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700">
                    {update.video ? "VIDEO UPDATE" : "HARDWARE UPDATE"}
                  </span>

                  <span className="text-sm text-muted-foreground">
                    {update.date}
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-bold text-foreground">
                  {update.title}
                </h3>

                <p className="text-justify text-sm leading-6 text-muted-foreground">
                  {update.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}