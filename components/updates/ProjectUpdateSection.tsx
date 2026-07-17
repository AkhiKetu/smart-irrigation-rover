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
    alt: "Testing the ultrasonic sensors and microphone",
    caption:
      "Fig. 2: Testing the three ultrasonic sensors and microphone for obstacle and sound detection.",
  },
  {
    id: 3,
    type: "image",
    source: "/Project Updates/TestUltrasonic-1.jpeg",
    alt: "Testing ultrasonic sensors and obstacle detection",
    caption:
      "Fig. 3: Testing the ultrasonic sensors, obstacle detection system, and motor movement.",
  },
  {
    id: 4,
    type: "video",
    source: "/Project Updates/TestingL,R,F-Ultrasonic.mp4",
    alt: "Testing the assembled ultrasonic sensors",
    caption:
      "Fig. 4: Testing the assembled left, right, and front ultrasonic sensors with rover movement.",
  },
  {
    id: 5,
    type: "video",
    source: "/Project Updates/TestingTheMotor.mp4",
    alt: "Testing the motors and rover movement",
    caption:
      "Fig. 5: Testing the motors and movement system of the Krishi Rover.",
  },
  {
    id: 6,
    type: "image",
    source: "/Project Updates/Map-Planning.png",
    alt: "Visualize map how it works",
    caption:
      "Fig. 6: Visual representation of how the mapping and navigation system works for the Krishi Rover.",
  },
  {
    id: 7,
    type: "video",
    source: "/Project Updates/Ai-Agent.mp4",
    alt: "Bangla AI voice agent working with the rover",
    caption:
      "Fig. 7: Demonstration of the Bangla AI voice agent working with the Krishi Rover.",
  },
  {
    id: 8,
    type: "image",
    source: "/Project Updates/Base-Model.jpeg",
    alt: "Base model of the Krishi Rover",
    caption:
      "Fig. 8: Initial base model used for the development of the Krishi Rover.",
  },
  {
    id: 9,
    type: "image",
    source: "/Project Updates/Custom-Local-Ui-Robot-Talk.jpeg",
    alt: "Custom local user interface for robot communication",
    caption:
      "Fig. 9: Custom local user interface developed for voice communication with the robot.",
  },
  {
    id: 10,
    type: "image",
    source: "/Project Updates/Components-Sensor.jpeg",
    alt: "Components and sensors of the Krishi Rover",
    caption:
      "Fig. 10: Hardware components and sensors selected for the Krishi Rover.",
  },
  {
    id: 11,
    type: "image",
    source: "/Project Updates/working-Type-2.jpeg",
    alt: "Working on the Krishi Rover",
    caption:
      "Fig. 11: Hardware assembly and connection work being performed on the Krishi Rover.",
  },
  {
    id: 12,
    type: "image",
    source: "/Project Updates/working-Type.jpeg",
    alt: "Working on the Krishi Rover hardware",
    caption:
      "Fig. 12: Testing and configuring the hardware components of the Krishi Rover.",
  },
  {
    id: 13,
    type: "image",
    source: "/Project Updates/Robot with IoT and Microphone.jpeg",
    alt: "Krishi Rover with IoT and microphone",
    caption:
      "Fig. 13: Krishi Rover integrated with IoT monitoring and a microphone for voice interaction.",
  },
  {
    id: 14,
    type: "video",
    source: "/Project Updates/Motor-Test.mp4",
    alt: "Water pump test of the Krishi Rover",
    caption:
      "Fig. 14: Testing the water pump system used for adaptive spot watering.",
  },
  {
    id: 15,
    type: "video",
    source: "/Project Updates/Relay-Test.mp4",
    alt: "Relay module test of the Krishi Rover",
    caption:
      "Fig. 15: Testing the relay module used to control the rover's water pump.",
  },
  {
    id: 16,
    type: "video",
    source: "/Project Updates/Testing pump with light.mp4",
    alt: "Testing the pump with an indicator light",
    caption:
      "Fig. 16: Testing the water pump with an indicator light and relay control.",
  },
  {
    id: 17,
    type: "video",
    source: "/Project Updates/Robot-Working-Vedio-Voice.mp4",
    alt: "Testing the complete rover with voice interaction",
    caption:
      "Fig. 17: Testing the complete rover system with Bangla voice interaction and troubleshooting.",
  },
  {
    id: 18,
    type: "image",
    source: "/Project Updates/Assembled Robot-1.jpeg",
    alt: "Front view of the assembled Krishi Rover",
    caption:
      "Fig. 18: Front view of the assembled Krishi Rover with its major hardware components.",
  },
  {
    id: 19,
    type: "image",
    source: "/Project Updates/Assembled Robot-2.jpeg",
    alt: "Side view of the assembled Krishi Rover",
    caption:
      "Fig. 19: Side view of the assembled Krishi Rover with sensors and wiring.",
  },
  {
    id: 20,
    type: "image",
    source: "/Project Updates/Assembled-3.jpeg",
    alt: "Complete assembled Krishi Rover",
    caption:
      "Fig. 20: Complete assembled model of the Krishi Rover with all major components.",
  },
  {
    id: 21,
    type: "image",
    source: "/Project Updates/Ai-Assistant-Architecture.png",
    alt: "AI Assistant Architecture for Krishi Rover",
    caption:
      "Fig. 21: AI Assistant Architecture for the Krishi Rover with integration points.",
  },
  {
    id: 22,
    type: "image",
    source: "/Project Updates/How It Works.png",
    alt: "How the Rover  Works",
    caption: "Fig. 22: How the Rover Works with the Krishi Rover.",
  },
  {
    id: 23,
    type: "image",
    source: "/Project Updates/Pin-Connection.png",
    alt: "Pin Connection Diagram for the Krishi Rover",
    caption: "Fig. 23: Pin Connection Diagram for the Krishi Rover.",
  },
  {
    id: 24,
    type: "image",
    source: "/Project Updates/Full-Process-Rover.png",
    alt: "Full Process Diagram for the Krishi Rover",
    caption: "Fig. 24: Full Process Diagram for the Krishi Rover.",
  },
];

export function ProjectUpdateSection() {
  return (
    <section className="bg-background px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
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

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {projectMedia.map((media) => {
            const figureLabel = media.caption.split(":")[0];
            const figureDescription = media.caption.substring(
              media.caption.indexOf(":") + 1,
            );

            return (
              <figure key={media.id} className="flex w-full flex-col">
                <div className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl border border-border bg-white shadow-sm">
                  {media.type === "image" ? (
                    <img
                      src={media.source}
                      alt={media.alt}
                      loading="lazy"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <video
                      controls
                      preload="metadata"
                      aria-label={media.alt}
                      className="h-full w-full object-contain"
                    >
                      <source src={media.source} type="video/mp4" />
                      Your browser does not support video playback.
                    </video>
                  )}
                </div>

                <figcaption className="mt-3 text-justify text-sm leading-6 text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    {figureLabel}:
                  </span>
                  {figureDescription}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
