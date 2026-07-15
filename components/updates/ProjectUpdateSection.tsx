interface ProjectMedia {
  id: number;
  type: "image" | "video";
  source: string;
  caption: string;
  alt: string;
}

const projectMedia: ProjectMedia[] = [
  {
    id: 1,
    type: "image",
    source: "/Project Updates/runningMotorAndDriver.jpeg",
    alt: "Krishi Rover chassis assembly",
    caption:
      "Fig. 1: Initial assembly of the 4WD Krishi Rover chassis with motors, wheels, motor driver, ESP32, battery, and connecting wires.",
  },
  {
    id: 2,
    type: "image",
    source: "/Project Updates/TestUltraAndMicrophone.jpeg",
    alt: "Testing the three Ultrasonic sensors and the microphone sensor on the Krishi Rover",
    caption:
      "Fig. 2: Testing the three Ultrasonic sensors and the microphone sensor on the Krishi Rover for obstacle detection and sound detection.",
  },
  {
    id: 3,
    type: "image",
    source: "/Project Updates/TestUltrasonic-1.jpeg",
    alt: "Testing the ultrasonic and obstacle detection.",
    caption:
      "Fig. 3: Testing the ultrasonic and obstacle detection and the motor movement",
  },
  {
    id: 4,
    type: "video",
    source: "/Project Updates/TestingL,R,F-Ultrasonic.mp4",
    alt: "Testing the assmbled ultrasonic sensors and the motor movement of the Krishi Rover",
    caption:
      "Fig. 4: Testing the assembled ultrasonic sensors and the motor movement of the Krishi Rover.",
  },
    {
    id: 5,
    type: "video",
    source: "/Project Updates/TestingTheMotor.mp4",
    alt: "Testing the motors and the movement of the Krishi Rover",
    caption:
      "Fig. 5: Testing the motors and the movement of the Krishi Rover.",
  },
      {
    id: 6,
    type: "image",
    source: "/Project Updates/Agent-Work.png",
    alt: "Diagram of how Ai Agent-Bangla voice works with the Krishi Rover",
    caption:
      "Fig. 6: Diagram showing the integration of the AI Agent-Bangla voice with the Krishi Rover.",
  },
      {
    id: 7,
    type: "video",
    source: "/Project Updates/Ai-Agent.mp4",
    alt: "Ai-Agent-Bangla voice working with the Krishi Rover",
    caption:
      "Fig. 7: Video demonstrating the Ai-Agent-Bangla voice working with the Krishi Rover.",
  },
  // Future video example:
  // {
  //   id: 5,
  //   type: "video",
  //   source: "/Project-Updates/rover-testing.mp4",
  //   alt: "Krishi Rover movement test",
  //   caption:
  //     "Fig. 5: Testing the movement, obstacle detection, and automatic navigation functions of the Krishi Rover.",
  // },
];

export function ProjectUpdateSection() {
  return (
    <section className="bg-background px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
            Development Progress
          </p>

          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Project Updates
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Images and videos showing the assembly, development, and testing of
            the Krishi Rover.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {projectMedia.map((media) => (
            <figure key={media.id} className="w-full">
              <div className="overflow-hidden ">
                {media.type === "image" ? (
                  <img
                    src={media.source}
                    alt={media.alt}
                    className="h-auto max-h-[520px] w-full object-contain"
                    loading="lazy"
                  />
                ) : (
                  <video
                    controls
                    preload="metadata"
                    className="h-auto max-h-[520px] w-full object-contain"
                    aria-label={media.alt}
                  >
                    <source src={media.source} type="video/mp4" />
                    Your browser does not support video playback.
                  </video>
                )}
              </div>

              <figcaption className="mt-3 text-justify text-sm leading-6 text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {media.caption.split(":")[0]}:
                </span>
                {media.caption.substring(media.caption.indexOf(":") + 1)}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}