'use client';

import { useState } from 'react';

const robotTypes = [
  {
    id: 'industrial',
    title: 'Industrial Robots',
    image: '/Robotics/IndustrialRobot-KUKA.jpg',
    company: 'Universal Robots, ABB, FANUC, KUKA',
    example: 'Universal Robots UR cobots, FANUC robotic arms',
    short: 'Factory robots used for welding, assembly, packaging, and production.',
    description:
      'Industrial robots are designed for high-speed, accurate, and repetitive work in manufacturing environments. They are commonly used in car factories, electronics production, welding, painting, palletizing, and material handling.',
    howMade:
      'They are built using robotic arms, servo motors, joints, end-effectors, controllers, sensors, safety systems, and programming interfaces. Modern industrial robots also include vision systems and AI-based quality inspection.',
    trend:
      'The latest trend is collaborative robots, also called cobots, which can safely work beside humans without traditional safety cages.',
    relation:
      'Our rover is not an industrial arm, but it uses the same automation idea: sensors collect data, the controller decides, and actuators perform the task.',
  },
  {
    id: 'service',
    title: 'Service Robots',
    image: '/Robotics/ServiceRobot.jpg',
    company: 'iRobot, SoftBank Robotics, Relay Robotics',
    example: 'iRobot Roomba, hospital delivery robots, hotel service robots',
    short: 'Robots that assist people in homes, hospitals, hotels, and public spaces.',
    description:
      'Service robots are designed to help humans in daily life and professional environments. They may clean floors, deliver items, guide visitors, support healthcare staff, or assist elderly people.',
    howMade:
      'They are usually built with wheels, sensors, cameras, batteries, navigation software, obstacle detection, and user-friendly interfaces such as apps or touchscreens.',
    trend:
      'Service robots are becoming more common in hospitals, smart homes, delivery systems, and cleaning automation.',
    relation:
      'Our rover is similar to a service robot because it performs a useful task for humans: monitoring soil and watering plants automatically.',
  },
  {
    id: 'social',
    title: 'Social Robots',
    image: '/Robotics/SocialRobot.jpg',
    company: 'SoftBank Robotics, Hanson Robotics, Furhat Robotics',
    example: 'Pepper, NAO, Sophia, Furhat',
    short: 'Robots designed to communicate and interact naturally with humans.',
    description:
      'Social robots are built for communication, education, therapy, customer interaction, and companionship. They can use speech, facial expressions, gestures, and AI-based conversation.',
    howMade:
      'They include microphones, speakers, cameras, face or display units, emotion recognition, natural language processing, and motion control.',
    trend:
      'The newest direction is combining large language models with social robots so they can hold more natural and helpful conversations.',
    relation:
      'Our rover does not talk like a social robot, but a future version could include voice alerts or chatbot-based farm monitoring.',
  },
  {
    id: 'mobile',
    title: 'Mobile Robots',
    image: '/Robotics/MobileRobot.jpg',
    company: 'Boston Dynamics, Amazon Robotics, Starship Technologies',
    example: 'Spot, warehouse AMRs, delivery robots',
    short: 'Robots that move through an environment using wheels, tracks, or legs.',
    description:
      'Mobile robots can travel from one place to another while sensing their surroundings. They are used in warehouses, hospitals, agriculture, inspection, delivery, and exploration.',
    howMade:
      'They are made with a chassis, motors, wheels or legs, motor drivers, batteries, sensors, controllers, and navigation software.',
    trend:
      'Autonomous mobile robots are now widely used in logistics, smart warehouses, agriculture, inspection, and delivery.',
    relation:
      'Our Smart Irrigation Rover is directly a mobile robot because it moves across a field to check soil moisture and water dry spots.',
  },
  {
    id: 'autonomous',
    title: 'Autonomous Robots',
    image: '/Robotics/AutonomousRobots.jpeg',
    company: 'Tesla, Waymo, Boston Dynamics, DJI',
    example: 'Self-driving cars, autonomous drones, autonomous rovers',
    short: 'Robots that can make decisions using sensors and software.',
    description:
      'Autonomous robots can operate with limited human control. They sense the environment, process data, plan actions, and execute tasks through motors or actuators.',
    howMade:
      'They use sensors, cameras, GPS, controllers, AI algorithms, path planning, obstacle avoidance, and feedback control systems.',
    trend:
      'The major trends are AI decision-making, computer vision, SLAM mapping, edge computing, and autonomous navigation.',
    relation:
      'Our rover uses autonomy when it checks soil condition, detects obstacles, and activates the pump based on sensor readings.',
  },
  {
    id: 'humanoid',
    title: 'Humanoid Robots',
    image: '/Robotics/HumanoidRobot.jpg',
    company: 'Boston Dynamics, Tesla, Agility Robotics, Honda',
    example: 'Atlas, Tesla Optimus, Digit, ASIMO',
    short: 'Robots shaped like humans for movement, interaction, and human-like tasks.',
    description:
      'Humanoid robots are designed with a human-like body structure. They can walk, balance, carry objects, and work in environments built for humans.',
    howMade:
      'They require many motors, joints, balance sensors, cameras, AI control systems, batteries, and advanced motion planning.',
    trend:
      'Humanoid robotics is moving toward industrial assistance, warehouse labor, manufacturing support, and AI-powered human-like interaction.',
    relation:
      'Our rover does not need a humanoid body because farming movement is better handled with wheels and a stable chassis.',
  },
  {
    id: 'surgical',
    title: 'Surgical Robots',
    image: '/Robotics/SurgicalRobots.jpg',
    company: 'Intuitive Surgical, Medtronic, CMR Surgical',
    example: 'da Vinci surgical system',
    short: 'Medical robots that support precise and minimally invasive surgery.',
    description:
      'Surgical robots help doctors perform operations with improved precision, stability, vision, and control. They are usually controlled by surgeons through a console.',
    howMade:
      'They include robotic arms, surgical instruments, high-resolution cameras, surgeon consoles, software control, and safety monitoring systems.',
    trend:
      'The future of surgical robotics includes remote surgery, AI-assisted planning, enhanced vision, and safer minimally invasive procedures.',
    relation:
      'Our rover is not medical, but both systems show how robotics can improve accuracy and reduce manual effort.',
  },
  {
    id: 'rescue',
    title: 'Rescue Robots',
    image: '/Robotics/RescueRobots.jpg',
    company: 'iRobot, Boston Dynamics, Shark Robotics',
    example: 'PackBot, Spot for inspection, disaster response robots',
    short: 'Robots used in dangerous places where humans may be at risk.',
    description:
      'Rescue robots are used in disaster zones, fire areas, collapsed buildings, military inspection, and hazardous environments. They help search, inspect, and send information back to humans.',
    howMade:
      'They are built with rugged bodies, cameras, thermal sensors, tracks or wheels, wireless communication, batteries, and obstacle-crossing mechanisms.',
    trend:
      'Rescue robotics is advancing with AI navigation, stronger mobility, thermal imaging, drone coordination, and remote operation.',
    relation:
      'Our rover uses a safer and simpler version of this idea by detecting obstacles and moving through outdoor terrain.',
  },
];

const coreIdeas = [
  {
    title: 'Perception',
    subtitle: 'Understanding the environment',
    text:
      'Robots use sensors such as cameras, ultrasonic sensors, moisture sensors, temperature sensors, LiDAR, and GPS to collect information from the environment.',
    roverUse:
      'Our rover uses soil moisture sensing, DHT11, and ultrasonic sensing to understand field conditions.',
  },
  {
    title: 'Control System',
    subtitle: 'Turning decisions into actions',
    text:
      'The control system processes sensor data and sends commands to motors, pumps, servos, or robotic arms.',
    roverUse:
      'ESP32 works as the brain of the rover and controls motors, relay module, and pump activity.',
  },
  {
    title: 'Navigation',
    subtitle: 'Moving safely and efficiently',
    text:
      'Navigation allows mobile robots to move from one place to another while avoiding obstacles and following a path.',
    roverUse:
      'The rover uses obstacle detection and motor control to move safely in a small field environment.',
  },
  {
    title: 'Automation Logic',
    subtitle: 'Making the robot useful',
    text:
      'Automation logic defines when the robot should act, stop, repeat a task, or respond to changing conditions.',
    roverUse:
      'The rover waters only when the soil is dry, which makes irrigation adaptive instead of manual.',
  },
];

const trends = [
  'AI-powered decision making',
  'Collaborative robots in factories',
  'Autonomous mobile robots in warehouses',
  'Agricultural robots for precision farming',
  'Humanoid robots for industrial assistance',
  'Robotic surgery and healthcare automation',
];

export default function RoboticsPage() {
  const [activeRobot, setActiveRobot] = useState(robotTypes[3]);
  const [activeIdea, setActiveIdea] = useState(coreIdeas[0]);

  return (
    <div className="bg-background text-foreground overflow-hidden">
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-500/10 via-background to-teal-500/10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-teal-500/20 blur-3xl animate-pulse" />

        <div className="relative max-w-6xl mx-auto text-center">
          <span className="inline-block mb-5 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-sm font-semibold">
            Robotics Learning Hub
          </span>

          <h1 className="text-4xl sm:text-6xl font-bold mb-6">
            Robotics, Automation & Smart Machines
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Robotics combines mechanical design, electronics, sensors, programming, control systems,
            and artificial intelligence to build machines that can sense, decide, move, and perform
            useful tasks.
          </p>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {['Sense', 'Plan', 'Act', 'Improve'].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-border bg-card/80 backdrop-blur p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <p className="font-bold text-emerald-600">{item}</p>
                <p className="text-xs text-muted-foreground mt-1">Robot workflow</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-sm font-bold text-emerald-600">ROBOTICS IN OUR PROJECT</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-5">
              How Robotics Connects to Smart Irrigation
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5 text-justify">
              The Smart Irrigation Rover is a mobile agricultural robot. It senses soil moisture,
              checks environmental conditions, avoids obstacles, moves using a 4WD platform, and
              activates a water pump only when irrigation is needed.
            </p>
            <p className="text-muted-foreground leading-relaxed text-justify">
              This follows the robotics workflow: collect data from sensors, process it using a
              controller, make a decision, and perform an action through motors and actuators.
            </p>
          </div>

          <div className="relative rounded-3xl border border-border bg-card p-6 shadow-2xl">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10" />
            <img
              src="/Bots/Rover-1.png"
              alt="Smart Irrigation Rover"
              className="relative w-full h-[360px] object-contain"
            />
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-bold text-emerald-600">INTERACTIVE SECTION</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">Types of Robots</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select any robot type to view details, construction idea, real-world examples,
              companies, and current trends.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.1fr] gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {robotTypes.map((robot) => (
                <button
                  key={robot.id}
                  onClick={() => setActiveRobot(robot)}
                  className={`group text-left rounded-3xl border overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                    activeRobot.id === robot.id
                      ? 'border-emerald-500 bg-emerald-500/10'
                      : 'border-border bg-card'
                  }`}
                >
                  <div className="h-40 bg-white relative overflow-hidden">
                    <img
                      src={robot.image}
                      alt={robot.title}
                      className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2">{robot.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{robot.short}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="rounded-3xl bg-card border border-border p-7 shadow-2xl h-fit sticky top-24">
              <div className="rounded-2xl bg-white border border-border h-72 flex items-center justify-center mb-6 overflow-hidden">
                <img
                  src={activeRobot.image}
                  alt={activeRobot.title}
                  className="h-full w-full object-contain p-4"
                />
              </div>

              <h2 className="text-3xl font-bold mb-2">{activeRobot.title}</h2>
              <p className="text-emerald-600 font-semibold mb-5">{activeRobot.company}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoBox title="Description" text={activeRobot.description} />
                <InfoBox title="How It Is Made" text={activeRobot.howMade} />
                <InfoBox title="Real Example" text={activeRobot.example} />
                <InfoBox title="New Trend" text={activeRobot.trend} />
              </div>

              <div className="mt-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-5">
                <h3 className="font-bold text-emerald-700 mb-2">Connection to Our Rover</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{activeRobot.relation}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-bold text-emerald-600">ROBOTICS FOUNDATION</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">Core Robotics Ideas</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These concepts are the building blocks of modern robots and also explain how the Smart
              Irrigation Rover works.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8">
            <div className="space-y-4">
              {coreIdeas.map((idea) => (
                <button
                  key={idea.title}
                  onClick={() => setActiveIdea(idea)}
                  className={`w-full text-left rounded-2xl border p-5 transition-all hover:shadow-lg ${
                    activeIdea.title === idea.title
                      ? 'border-emerald-500 bg-emerald-500/10'
                      : 'border-border bg-card'
                  }`}
                >
                  <h3 className="font-bold text-lg">{idea.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{idea.subtitle}</p>
                </button>
              ))}
            </div>

            <div className="rounded-3xl border border-border bg-card p-8 shadow-xl">
              <div className="mb-6 h-2 w-full rounded-full bg-muted overflow-hidden">
                <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600" />
              </div>

              <h3 className="text-3xl font-bold mb-3">{activeIdea.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-5">{activeIdea.text}</p>

              <div className="rounded-2xl bg-muted/50 border border-border p-6">
                <h4 className="font-bold text-emerald-600 mb-2">Use in Smart Irrigation Rover</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{activeIdea.roverUse}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-500/10 via-background to-teal-500/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-bold text-emerald-600">WHAT IS NEW</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">New Trends in Robotics</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Robotics is moving toward smarter, safer, and more autonomous systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {trends.map((trend) => (
              <div
                key={trend}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="h-1.5 w-16 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 mb-5" />
                <h3 className="font-bold text-lg">{trend}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoBox({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl bg-muted/50 border border-border p-5">
      <h3 className="font-bold text-emerald-600 mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">{text}</p>
    </div>
  );
}