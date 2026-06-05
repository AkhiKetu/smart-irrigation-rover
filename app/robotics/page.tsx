'use client';

import { useState } from 'react';
import Link from 'next/link';

const robotTypes = [
  {
    id: 'industrial',
    title: 'Industrial Robots',
    image: '/robotics/industrial.jpg',
    short: 'Used in factories for welding, assembly, painting, and manufacturing.',
    description:
      'Industrial robots are commonly used in production lines where speed, accuracy, and repeatability are important. They are widely used in automobile factories, electronics manufacturing, welding, material handling, and packaging.',
    howMade:
      'They are usually made with robotic arms, servo motors, strong joints, end-effectors, controllers, sensors, and safety systems.',
    example: 'Factory robotic arms used for car assembly and welding.',
    trend: 'Modern industrial robots are becoming collaborative, meaning they can safely work near humans as cobots.',
  },
  {
    id: 'service',
    title: 'Service Robots',
    image: '/robotics/service.jpg',
    short: 'Assist humans in healthcare, homes, cleaning, and daily services.',
    description:
      'Service robots perform helpful tasks outside traditional factories. They can support hospitals, homes, offices, hotels, and public spaces.',
    howMade:
      'They are built with sensors, wheels or arms, cameras, processors, batteries, and user interaction systems.',
    example: 'Hospital assistant robots and robotic vacuum cleaners.',
    trend: 'Service robots are growing in healthcare, elderly care, delivery, and smart home automation.',
  },
  {
    id: 'social',
    title: 'Social Robots',
    image: '/robotics/social.jpg',
    short: 'Interact with people using speech, emotion, and human-like behavior.',
    description:
      'Social robots are designed to communicate and interact with humans. They may be used in education, therapy, customer service, and companionship.',
    howMade:
      'They include microphones, speakers, cameras, facial displays, AI dialogue systems, and movement mechanisms.',
    example: 'Educational robots, companion robots, and therapy robots.',
    trend: 'AI chat and emotion recognition are making social robots more natural and personalized.',
  },
  {
    id: 'mobile',
    title: 'Mobile Robots',
    image: '/robotics/mobile.jpg',
    short: 'Move through an environment using wheels, tracks, or legs.',
    description:
      'Mobile robots can travel from one place to another while sensing their surroundings. Our Smart Irrigation Rover belongs to this category.',
    howMade:
      'They are made with a chassis, motors, wheels, motor driver, battery, sensors, and a controller such as ESP32 or Arduino.',
    example: 'Smart irrigation rover, warehouse robots, and delivery robots.',
    trend: 'Mobile robots are increasingly used in agriculture, logistics, delivery, and inspection.',
  },
  {
    id: 'autonomous',
    title: 'Autonomous Robots',
    image: '/robotics/autonomous.jpg',
    short: 'Make decisions using sensors, algorithms, and control logic.',
    description:
      'Autonomous robots operate with minimal human control. They sense the environment, plan actions, and execute tasks.',
    howMade:
      'They require sensors, control algorithms, mapping or navigation logic, actuators, and decision-making software.',
    example: 'Self-driving cars, autonomous drones, and agricultural rovers.',
    trend: 'Autonomous systems are advancing through AI, computer vision, SLAM, and edge computing.',
  },
  {
    id: 'humanoid',
    title: 'Humanoid Robots',
    image: '/robotics/humanoid.jpg',
    short: 'Robots designed with human-like body structure and movement.',
    description:
      'Humanoid robots are designed to resemble humans and may walk, talk, carry objects, or interact socially.',
    howMade:
      'They use many motors, joints, balance sensors, cameras, microphones, speakers, and AI-based control systems.',
    example: 'ASIMO, NAO, Atlas, and other human-like robots.',
    trend: 'Humanoid robots are improving in balance, mobility, language understanding, and human interaction.',
  },
  {
    id: 'surgical',
    title: 'Surgical Robots',
    image: '/robotics/surgical.jpg',
    short: 'Support doctors in precise medical operations.',
    description:
      'Surgical robots assist surgeons by providing high precision, stability, and minimally invasive operation support.',
    howMade:
      'They are built with robotic arms, precision tools, cameras, control consoles, and safety monitoring systems.',
    example: 'Robotic surgical systems used in hospitals.',
    trend: 'Medical robotics is moving toward remote surgery, AI-assisted diagnosis, and high-precision automation.',
  },
  {
    id: 'rescue',
    title: 'Rescue Robots',
    image: '/robotics/rescue.jpg',
    short: 'Help in dangerous environments like disasters and search operations.',
    description:
      'Rescue robots are used in hazardous places where humans may be at risk, such as collapsed buildings, fire zones, or disaster areas.',
    howMade:
      'They use rugged bodies, cameras, thermal sensors, tracks or wheels, wireless control, and obstacle-crossing mechanisms.',
    example: 'Search-and-rescue robots used after earthquakes or industrial accidents.',
    trend: 'Future rescue robots will use AI navigation, swarm coordination, and stronger terrain mobility.',
  },
];

const concepts = [
  {
    title: 'Sense-Plan-Act Paradigm',
    icon: '🧭',
    text: 'A robot senses the environment, plans a decision, and acts through motors or actuators. Our rover senses soil moisture, decides if watering is needed, and activates the pump.',
  },
  {
    title: 'Asimov’s Laws',
    icon: '⚖️',
    text: 'These laws describe robot safety and responsibility: avoid harming humans, obey human instructions, and protect itself without violating safety.',
  },
  {
    title: 'Artificial Intelligence',
    icon: '🧠',
    text: 'AI helps robots learn, solve problems, act rationally, and make decisions from sensor data.',
  },
];

export default function RoboticsPage() {
  const [activeRobot, setActiveRobot] = useState(robotTypes[0]);

  return (
    <div className="bg-background text-foreground">
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-500/10 via-background to-teal-500/10">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-block mb-5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-sm font-semibold">
            Robotics Learning
          </span>

          <h1 className="text-4xl sm:text-5xl font-bold mb-4">About Robotics</h1>

          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 mx-auto mb-6" />

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Robotics is the field of designing intelligent machines that can sense, plan, move,
            interact, and perform useful tasks. Our Smart Irrigation Rover applies robotics in
            precision agriculture through sensing, mobility, automation, and IoT monitoring.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-5">Robotics in Our Project</h2>
            <p className="text-muted-foreground leading-relaxed mb-5">
              A robot usually contains sensors, a controller, actuators, a power system, and decision
              logic. In our rover, sensors collect soil and obstacle data, ESP32 processes the input,
              motors move the rover, and the pump delivers water only to dry spots.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This follows the basic robotics idea: sense the environment, plan the action, and execute
              the task safely.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-xl">
            <img
              src="/Bots/Rover-1.png"
              alt="Smart Irrigation Rover"
              className="w-full h-[360px] object-contain"
            />
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Types of Robots</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Click any robot type to view its description, how it is made, examples, and current trends.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {robotTypes.map((robot) => (
                <button
                  key={robot.id}
                  onClick={() => setActiveRobot(robot)}
                  className={`text-left rounded-2xl border overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all ${
                    activeRobot.id === robot.id
                      ? 'border-emerald-500 bg-emerald-500/10'
                      : 'border-border bg-card'
                  }`}
                >
                  <div className="h-36 bg-white flex items-center justify-center">
                    <img
                      src={robot.image}
                      alt={robot.title}
                      className="h-full w-full object-contain p-3"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2">{robot.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{robot.short}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="bg-card border border-border rounded-3xl p-7 shadow-xl sticky top-24 h-fit">
              <div className="rounded-2xl bg-white border border-border h-72 flex items-center justify-center mb-6 overflow-hidden">
                <img
                  src={activeRobot.image}
                  alt={activeRobot.title}
                  className="h-full w-full object-contain p-4"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              <h2 className="text-2xl font-bold mb-3">{activeRobot.title}</h2>

              <div className="space-y-5">
                <div>
                  <h3 className="font-semibold text-emerald-600 mb-1">Description</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {activeRobot.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-emerald-600 mb-1">How It Is Made</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {activeRobot.howMade}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-emerald-600 mb-1">Example</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {activeRobot.example}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-emerald-600 mb-1">New Trend</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {activeRobot.trend}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Later, add real images inside <b>public/robotics</b> using names like
            industrial.jpg, service.jpg, mobile.jpg, humanoid.jpg, etc.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Core Robotics Ideas</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These ideas connect general robotics theory with our Smart Irrigation Rover.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {concepts.map((concept) => (
              <div
                key={concept.title}
                className="bg-card border border-border rounded-2xl p-7 shadow-sm hover:shadow-xl hover:border-emerald-500/50 transition-all"
              >
                <div className="text-5xl mb-4">{concept.icon}</div>
                <h3 className="text-xl font-bold mb-3">{concept.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{concept.text}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}