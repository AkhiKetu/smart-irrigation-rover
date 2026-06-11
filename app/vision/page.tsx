"use client";

import { useState } from "react";
import { projectVision, projectGoals } from "@/lib/data";

const components = [
  {
    name: "ESP32 Development Board",
    image: "/Components/Esp32.png",
    detail:
      "Main controller for sensor reading, motor control, pump control, and IoT communication.",
  },
  {
    name: "Soil Moisture Sensor",
    image: "/Components/SoilSensor.jpg",
    detail:
      "Measures soil dryness and helps the rover identify where watering is needed.",
  },
  {
    name: "DHT11 Sensor",
    image: "/Components/DHT11.jpg",
    detail:
      "Collects temperature and humidity data for environmental monitoring.",
  },
  {
    name: "Ultrasonic Sensor",
    image: "/Components/Ultrasonic.jpg",
    detail: "Detects obstacles in front of the rover during movement.",
  },
  {
    name: "L298N Motor Driver",
    image: "/Components/L298N.jpg",
    detail: "Controls the 4WD DC motors of the rover.",
  },
  {
    name: "Water Pump",
    image: "/Components/WaterPump.jpg",
    detail: "Supplies water to dry soil spots identified by the system.",
  },
  {
    name: "Relay Module",
    image: "/Components/RelayModule.jpg",
    detail: "Switches the water pump ON and OFF safely.",
  },
  {
    name: "4WD Chassis",
    image: "/Components/CarChassis.jpg",
    detail: "Provides the rover body, wheels, and movement platform.",
  },
];

const roadmap = [
  {
    phase: "June Week 1 - Week 4",
    title: "Literature Review",
    description:
      "Study recent research papers, smart irrigation systems, IoT applications, robotics technologies, and autonomous agricultural solutions.",
  },
  {
    phase: "June Week 2 - Week 4",
    title: "Survey & Requirement Analysis",
    description:
      "Conduct surveys, collect requirements, analyze irrigation challenges, and define project objectives.",
  },
  {
    phase: "June Week 3 - Week 4",
    title: "Component Selection",
    description:
      "Select ESP32, sensors, motor driver, relay module, water pump, and 4WD chassis based on project needs.",
  },
  {
    phase: "July Week 1 - Week 2",
    title: "Hardware Development",
    description:
      "Assemble the chassis, install sensors, connect motor driver, relay module, ESP32, and irrigation system.",
  },
  {
    phase: "July Week 1 - Week 3",
    title: "Software Development",
    description:
      "Develop obstacle detection, soil moisture logic, pump control, autonomous movement, and IoT communication.",
  },
  {
    phase: "July Week 3 - Week 4",
    title: "Testing & Integration",
    description:
      "Integrate hardware and software, calibrate sensors, validate watering, and test rover movement.",
  },
  {
    phase: "July Week 1 - August Week 1",
    title: "Research Paper Writing",
    description:
      "Prepare literature review, methodology, implementation details, testing results, and documentation.",
  },
  {
    phase: "August Week 2",
    title: "Final Presentation",
    description:
      "Demonstrate the Smart Irrigation Rover, present results, submit documentation, and complete evaluation.",
  },
];

const mainCards = [
  {
    id: "vision",
    title: "Project Vision",
    subtitle: "Purpose and future direction",
    image: "/Bots/Rover-1.png",
  },
  {
    id: "goals",
    title: "Key Goals",
    subtitle: "Main project objectives",
    icon: "",
    image: "/VisionAndGoals/KeyGoal.jpg",
  },
  {
    id: "components",
    title: "Components",
    subtitle: "Hardware used in the rover",
    icon: "",
    image: "/VisionAndGoals/components.png",
  },
  {
    id: "roadmap",
    title: "Roadmap",
    subtitle: "Development and testing plan",
    icon: "",
    image: "/VisionAndGoals/roadmap.png",
  },
];

export default function VisionPage() {
  const [openCard, setOpenCard] = useState<string | null>("vision");

  return (
    <div className="bg-background text-foreground">
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-500/10 via-background to-teal-500/10">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-block mb-5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-sm font-semibold">
            Smart Irrigation Rover
          </span>

          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Vision & Goals
          </h1>

          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 mx-auto mb-6" />

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the project vision, goals, components, and development plan
            through interactive cards.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {mainCards.map((card) => (
              <button
                key={card.id}
                onClick={() =>
                  setOpenCard(openCard === card.id ? null : card.id)
                }
                className={`group text-left overflow-hidden rounded-3xl border shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                  openCard === card.id
                    ? "border-emerald-500 bg-emerald-500/10"
                    : "border-border bg-card"
                }`}
              >
                <div className="h-36 bg-muted/50 relative overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-contain p-5 transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute left-5 bottom-4 text-4xl">
                    {card.icon}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold mb-2">{card.title}</h2>
                      <p className="text-sm text-muted-foreground">
                        {card.subtitle}
                      </p>
                    </div>
                    <span className="shrink-0 w-9 h-9 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-xl font-bold">
                      {openCard === card.id ? "−" : "+"}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8">
            {openCard === "vision" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 rounded-3xl bg-card border border-border p-8 shadow-lg">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Project Vision</h2>
                  <p className="text-muted-foreground leading-8 text-lg text-justify">
                    {projectVision}
                  </p>
                </div>

                <div className="rounded-2xl p-6 flex items-center justify-center">
                  <img
                    src="/Bots/Rover-1.png"
                    alt="Smart Irrigation Rover"
                    className="max-h-72 w-full object-contain"
                  />
                </div>
              </div>
            )}

            {openCard === "goals" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 rounded-3xl bg-card border border-border p-8 shadow-lg">
                {projectGoals.map((goal, index) => (
                  <div
                    key={index}
                    className="rounded-2xl bg-muted/50 border border-border p-6 hover:border-emerald-500/50 transition-all"
                  >
                    <h3 className="font-semibold text-lg mb-2">{goal.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {goal.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {openCard === "components" && (
              <div className="rounded-3xl bg-card border border-border p-8 shadow-lg">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">
                    Project Components
                  </h2>
                  <p className="text-muted-foreground">
                    The rover is built using a variety of hardware components
                    that work together to achieve smart irrigation. Each
                    component plays a crucial role in sensing, control, and
                    actuation to ensure efficient watering of plants based on
                    soil conditions and environmental factors.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {components.map((component) => (
                    <div
                      key={component.name}
                      className="grid grid-cols-[160px_1fr] gap-6 rounded-3xl  border border-border p-6 hover:shadow-lg hover:scale-102 transition-all"
                    >
                      <div className="h-36 w-36 rounded-xl bg-white  flex items-center justify-center overflow-hidden">
                        <img
                          src={component.image}
                          alt={component.name}
                          className="h-full w-full object-contain p-3"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                        <span className="text-0.5xl"></span>
                      </div>

                      <div>
                        <h3 className="font-semibold text-lg mb-2">
                          {component.name}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {component.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {openCard === "roadmap" && (
              <div className="rounded-3xl bg-card border border-border p-8 shadow-xl">
                <div className="mb-10 text-center">
                  <h1 className="text-3xl font-bold mt-3">
                    Implementation Roadmap
                  </h1>
                  <p className="text-muted-foreground mt-3">
                    Project timeline from literature review to final
                    presentation.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {roadmap.map((item) => (
                    <div
                      key={item.phase}
                      className="group rounded-2xl bg-muted/50 border border-border p-6 hover:border-emerald-500/60 hover:shadow-xl hover:-translate-y-1 transition-all"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-3 w-3 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform" />
                        <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">
                          {item.phase}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold mb-3">{item.title}</h3>

                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>

                      <div className="mt-5 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                        <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
