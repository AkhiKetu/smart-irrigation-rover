"use client";

import { useState } from "react";

type FilterType = "all" | "lecture" | "team" | "related";

const lectures = [
  {
    id: 1,
    date: "2026-05-20",
    displayDate: "20 May 2026",
    time: "Wednesday • 6:30 PM - 9:30 PM",
    title: "Course Introduction & Group Formation",
    status: "Completed",
    description:
      "Basic course formatting, project group formation, initial project discussion, and overview of robotics project requirements.",
  },
  {
    id: 2,
    date: "2026-05-27",
    displayDate: "27 May 2026",
    time: "Wednesday • 6:30 PM - 9:30 PM",
    title: "Class Closed - Eid Vacation",
    status: "Closed",
    description:
      "No class was held due to Eid vacation. Project discussion continued informally among team members.",
  },
  {
    id: 3,
    date: "2026-06-03",
    displayDate: "03 June 2026",
    time: "Wednesday • 6:30 PM - 9:30 PM",
    title: "Basic Introduction to Robotics",
    status: "Completed",
    description:
      "Covered basic robotics ideas, robot types, autonomous systems, sensors, actuators, and how robotics connects to our Smart Irrigation Rover.",
  },
  {
    id: 4,
    date: "2026-06-10",
    displayDate: "10 June 2026",
    time: "Wednesday • 6:30 PM - 9:30 PM",
    title: "Update Soon",
    status: "Upcoming",
    description: "No Data",
  },
  {
    id: 5,
    date: "2026-06-17",
    displayDate: "17 June 2026",
    time: "Wednesday • 6:30 PM - 9:30 PM",
    title: "Update Soon",
    status: "Upcoming",
    description: "No Data",
  },
  {
    id: 6,
    date: "2026-06-24",
    displayDate: "24 June 2026",
    time: "Wednesday • 6:30 PM - 9:30 PM",
    title: "Update Soon",
    status: "Upcoming",
    description: "No Data",
  },
  {
    id: 7,
    date: "2026-07-01",
    displayDate: "01 July 2026",
    time: "Wednesday • 6:30 PM - 9:30 PM",
    title: "Update Soon",
    status: "Mid Week",
    description: "No Data",
  },
  {
    id: 8,
    date: "2026-07-08",
    displayDate: "08 July 2026",
    time: "Wednesday • 6:30 PM - 9:30 PM",
    title: "Update Soon",
    status: "Upcoming",
    description: "No Data",
  },
  {
    id: 9,
    date: "2026-07-15",
    displayDate: "15 July 2026",
    time: "Wednesday • 6:30 PM - 9:30 PM",
    title: "Update Soon",
    status: "Upcoming",
    description: "No Data",
  },
  {
    id: 10,
    date: "2026-07-22",
    displayDate: "22 July 2026",
    time: "Wednesday • 6:30 PM - 9:30 PM",
    title: "Update Soon",
    status: "Upcoming",
    description: "No Data",
  },
  {
    id: 11,
    date: "2026-07-29",
    displayDate: "29 July 2026",
    time: "Wednesday • 6:30 PM - 9:30 PM",
    title: "Update Soon",
    status: "Upcoming",
    description: "No Data",
  },
  {
    id: 12,
    date: "2026-08-05",
    displayDate: "05 August 2026",
    time: "Wednesday • 6:30 PM - 9:30 PM",
    title: "Update Soon",
    status: "Upcoming",
    description: "No Data",
  },
  {
    id: 13,
    date: "2026-08-12",
    displayDate: "12 August 2026",
    time: "Wednesday • 6:30 PM - 9:30 PM",
    title: "Update Soon",
    status: "Upcoming",
    description: "No Data",
  },
];

const akhiPapers = [
  {
    title: "An Overview of Smart Irrigation Systems Using IoT",
    year: "2022",
    source: "Energy Nexus",
    link: "https://openaccess.city.ac.uk/id/eprint/28838/1/1-s2.0-S2772427122000791-main.pdf",
    summary:
      "This paper supports the IoT-based irrigation concept of our rover by explaining smart irrigation architecture, sensing, and water-saving methods.",
  },
  {
    title:
      "IoT-Enabled Smart Agriculture: Architecture, Applications, and Challenges",
    year: "2022",
    source: "Applied Sciences",
    link: "https://www.mdpi.com/2076-3417/12/7/3396/pdf",
    summary:
      "This paper connects with our ESP32-based IoT monitoring system and explains how smart agriculture systems collect, process, and monitor field data.",
  },
  {
    title:
      "Evaluation of IoT Based Smart Drip Irrigation and ETc Based System for Sweet Corn",
    year: "2023",
    source: "Smart Agricultural Technology",
    link: "https://www.sciencedirect.com/science/article/pii/S2772375523000783",
    summary:
      "This paper supports efficient irrigation decision-making and helps justify watering only when needed instead of wasting water.",
  },
  {
    title: "IoT-Enabled Smart Agriculture for Improving Water Management",
    year: "2025",
    source: "Results in Engineering",
    link: "https://www.sciencedirect.com/science/article/pii/S2468227624004691",
    summary:
      "This paper is related to water management in agriculture and supports our adaptive spot-watering system.",
  },
  {
    title:
      "Visual Navigation and Obstacle Avoidance Control for Agricultural Robots",
    year: "2023",
    source: "Remote Sensing",
    link: "https://www.mdpi.com/2072-4292/15/22/5402/pdf",
    summary:
      "This paper connects with autonomous agricultural robot movement and obstacle avoidance, which is important for our rover navigation.",
  },
  {
    title:
      "Comparative Analysis of Soil Moisture- and Weather-Based Irrigation Scheduling",
    year: "2025",
    source: "Sensors",
    link: "https://www.mdpi.com/1424-8220/25/5/1568/pdf",
    summary:
      "This paper supports soil moisture-based irrigation scheduling, directly matching our moisture sensor-based watering logic.",
  },
  {
    title:
      "A Comprehensive Review of Obstacle Avoidance for Autonomous Agricultural Machinery",
    year: "2025",
    source: "Artificial Intelligence in Agriculture",
    link: "https://www.sciencedirect.com/science/article/pii/S2589721725000819",
    summary:
      "This paper supports the autonomous navigation and obstacle detection research background of our agricultural rover.",
  },
  {
    title:
      "Low Cost AI-Driven Autonomous Rescue Bot for Water-Based Life-Saving Missions",
    year: "2025",
    source: "Faculty Related Paper",
    link: "https://www.researchgate.net/publication/398519420_Low_Cost_AI-Driven_Autonomous_Rescue_Bot_for_Water-Based_Life-Saving_Missions",
    summary:
      "This faculty-related paper connects with low-cost autonomous robot development and decision-making logic.",
  },
  {
    title: "IoT Based Fruit Quality Inspection and Lifespan Detection System",
    year: "2024",
    source: "Faculty Related Paper",
    link: "https://www.researchgate.net/publication/374807886_IoT_based_Fruit_Quality_Inspection_and_Lifespan_Detection_System",
    summary:
      "This paper supports IoT-based agricultural monitoring and sensor-based decision-making.",
  },
  {
    title: "Smart Floor Cleaning Robot",
    year: "2023",
    source: "Faculty Related Paper",
    link: "https://www.researchgate.net/publication/373709780_Smart_Floor_Cleaning_Robot",
    summary:
      "This paper connects with mobile robotics, motor control, obstacle handling, and autonomous movement concepts.",
  },
];
const zawadPapers = [
  {
    title: "An Overview of Smart Irrigation Systems Using IoT",
    year: "2022",
    source: "Energy Nexus",
    link: "https://www.sciencedirect.com/science/article/pii/S2589721722000010",
    summary:
      "This paper reviews modern IoT-based smart irrigation systems that use soil moisture sensors, wireless communication, and cloud monitoring. It directly supports our Smart Irrigation Rover by explaining how sensor data can automate watering decisions and improve water-use efficiency.",
  },

  {
    title: "Artificial Intelligence and IoT for Sustainable Agriculture",
    year: "2024",
    source: "Ain Shams Engineering Journal",
    link: "https://www.sciencedirect.com/science/article/pii/S1658077X24000110",
    summary:
      "The study discusses how AI and IoT technologies work together in agriculture to improve productivity, resource management, and sustainability. It provides useful concepts for integrating intelligent decision-making into irrigation systems.",
  },

  {
    title: "IoT Based Smart Agriculture Monitoring System",
    year: "2022",
    source: "IEEE",
    link: "https://ieeexplore.ieee.org/abstract/document/9716089",
    summary:
      "This research presents a real-time agriculture monitoring platform using IoT sensors and cloud communication. The paper demonstrates methods for collecting environmental data and remotely monitoring field conditions.",
  },

  {
    title: "Integrating AI and IoT for Smart Agriculture",
    year: "2025",
    source: "ResearchGate",
    link: "https://www.researchgate.net/publication/391578231_Integrating_AI_and_IOT_for_Smart_Agriculture_Machine_Learning_Models_for_Precision_Irrigation",
    summary:
      "The paper explores machine learning models for precision irrigation. It shows how AI algorithms can analyze soil and environmental data to predict irrigation needs and optimize water distribution.",
  },

  {
    title: "AI-Driven Precision Agriculture and Smart Irrigation",
    year: "2025",
    source: "Smart Agricultural Technology",
    link: "https://www.sciencedirect.com/science/article/pii/S2772375525008603",
    summary:
      "This study highlights recent advances in AI-powered irrigation systems and precision agriculture technologies. It provides insights into intelligent resource management and adaptive watering strategies.",
  },

  {
    title: "Internet of Things Applications in Smart Farming",
    year: "2022",
    source: "Smart Agricultural Technology",
    link: "https://www.sciencedirect.com/science/article/pii/S2352484722013543",
    summary:
      "The paper reviews IoT applications in agriculture, including irrigation, crop monitoring, and environmental sensing. It supports the rover project by explaining sensor integration and remote monitoring architectures.",
  },

  {
    title: "Machine Learning Techniques for Irrigation Management",
    year: "2022",
    source: "Measurement",
    link: "https://www.sciencedirect.com/science/article/pii/S0263224121011404",
    summary:
      "This research investigates machine learning approaches for irrigation scheduling and water management. The findings help understand how intelligent algorithms can improve irrigation efficiency and reduce water waste.",
  },
];
const abdulPapers = [
  {
    title:
      "Wireless Sensor Networks for Agriculture: The State-of-the-Art in Practice and Future Challenges",
    year: "2015",
    source: "Computers and Electronics in Agriculture",
    link: "https://www.sciencedirect.com/science/article/abs/pii/S0168169915002379",
    summary:
      "This paper supports the sensor-network foundation of our rover by explaining how agricultural sensors can monitor field conditions and support automation.",
  },
  {
    title:
      "Energy-Efficient Wireless Sensor Networks for Agricultural Monitoring",
    year: "2023",
    source: "Computers and Electrical Engineering",
    link: "https://www.sciencedirect.com/science/article/abs/pii/S0045790623004767",
    summary:
      "This paper connects with low-power agricultural monitoring, which is useful for designing reliable sensor-based rover systems.",
  },
  {
    title:
      "Wireless Sensor Networks in Agriculture Through Machine Learning: A Survey",
    year: "2022",
    source: "Computers and Electronics in Agriculture",
    link: "https://www.sciencedirect.com/science/article/abs/pii/S0168169922002459",
    summary:
      "This survey supports the idea of using sensor data and intelligent models for agriculture-related decision-making.",
  },
  {
    title: "Autonomous Navigation and Smart Agriculture Robot System",
    year: "2024",
    source: "IEEE",
    link: "https://ieeexplore.ieee.org/abstract/document/10677594",
    summary:
      "This paper connects with autonomous movement, navigation logic, and robotic control for agricultural environments.",
  },
  {
    title: "Smart Agricultural Technology for Automated Farming Systems",
    year: "2023",
    source: "Smart Agricultural Technology",
    link: "https://www.sciencedirect.com/science/article/pii/S277237552300045X?via%3Dihub",
    summary:
      "This paper supports smart farming automation and helps relate our rover to real agricultural technology applications.",
  },
  {
    title: "Robotics and Automation in Agriculture",
    year: "2023",
    source: "MDPI Robotics",
    link: "https://www.mdpi.com/2624-831X/4/3/12",
    summary:
      "This paper supports the robotics side of the project by discussing how robots can be applied to farming, monitoring, and automation.",
  },
  {
    title: "IoT and Embedded System Based Smart Agriculture Application",
    year: "2023",
    source: "Journal of Innovative Electrical and Electronics Engineering",
    link: "https://jieee.a2zjournals.com/index.php/ieee/article/view/96",
    summary:
      "This paper connects with embedded system design, IoT monitoring, and smart agriculture implementation.",
  },
];
const ashifPapers = [
  {
    title: "AI-Based Smart Agriculture and Autonomous Farming System",
    year: "2025",
    source: "arXiv",
    link: "https://arxiv.org/abs/2507.12716",
    summary:
      "This paper supports our project by connecting AI-based decision-making with smart agriculture and autonomous farming applications.",
  },
  {
    title: "Advanced Smart Farming Technologies for Agricultural Automation",
    year: "2025",
    source: "Computers and Electronics in Agriculture",
    link: "https://www.sciencedirect.com/science/article/pii/S0168169925010385",
    summary:
      "This paper relates to agricultural automation and supports the development of smart systems for monitoring and irrigation management.",
  },
  {
    title: "Intelligent Agricultural Monitoring and Automation System",
    year: "2025",
    source: "Computers and Electronics in Agriculture",
    link: "https://www.sciencedirect.com/science/article/pii/S0168169925010853?via%3Dihub",
    summary:
      "This study supports the monitoring side of our rover by showing how intelligent systems can collect field data and improve farming decisions.",
  },
  {
    title: "Machine Learning and AI Applications in Precision Agriculture",
    year: "2025",
    source: "arXiv",
    link: "https://arxiv.org/abs/2504.18284",
    summary:
      "This paper connects with precision agriculture by explaining how AI and machine learning can improve crop monitoring, prediction, and resource management.",
  },
  {
    title: "AI-Driven Automation for Smart Agriculture",
    year: "2025",
    source: "arXiv",
    link: "https://arxiv.org/abs/2508.08607",
    summary:
      "This paper supports future research directions for our rover by showing how AI can improve automation, decision-making, and agricultural productivity.",
  },
  {
    title: "Digital Agriculture and Smart Farming Review",
    year: "2020",
    source: "PubMed",
    link: "https://pubmed.ncbi.nlm.nih.gov/31906284/",
    summary:
      "This paper provides background on digital agriculture and smart farming, supporting the theoretical foundation of our project.",
  },
  {
    title: "Smart Agriculture and Intelligent Farming Technologies",
    year: "2024",
    source: "Springer",
    link: "https://link.springer.com/article/10.1007/s44279-024-00113-3",
    summary:
      "This paper supports the use of intelligent technologies in agriculture and connects with our project’s automation and monitoring goals.",
  },
];
const sojibPapers = [
  {
    title: "AI and IoT-Based Smart Agriculture System",
    year: "2025",
    source: "Springer",
    link: "https://link.springer.com/article/10.1007/s44279-025-00430-1",
    summary:
      "This paper supports the software and IoT side of the rover by connecting smart agriculture with intelligent monitoring and automated decision-making.",
  },
  {
    title:
      "Smart IoT-Driven Precision Agriculture: Land Mapping, Crop Prediction, and Irrigation System",
    year: "2025",
    source: "PLOS ONE",
    link: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0319268",
    summary:
      "This paper presents an IoT-based precision agriculture system with land mapping, crop prediction, and irrigation support. It directly connects with our rover’s monitoring and irrigation logic.",
  },
  {
    title: "The IoT and AI in Agriculture: The Time Is Now—A Systematic Review",
    year: "2025",
    source: "PMC / PubMed Central",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12196926/",
    summary:
      "This review explains how IoT and AI are transforming agriculture through sensing, real-time monitoring, and data-driven decisions. It supports our smart farming and IoT dashboard concept.",
  },
  {
    title: "Deep Learning for Intelligent Irrigation Decision-Making",
    year: "2025",
    source: "Agricultural Water Management",
    link: "https://www.sciencedirect.com/science/article/pii/S0378377425005505",
    summary:
      "This paper discusses deep learning for irrigation decisions and supports future improvement of our rover by showing how data can make watering more accurate.",
  },
  {
    title: "Smart Agriculture and Digital Irrigation Technologies",
    year: "2025",
    source: "Taylor & Francis",
    link: "https://www.tandfonline.com/doi/full/10.1080/27525783.2025.2562418",
    summary:
      "This paper connects with digital agriculture and supports the use of software-based monitoring and decision support in smart irrigation systems.",
  },
  {
    title: "Smart Agricultural Technology for IoT-Based Farming Systems",
    year: "2025",
    source: "Smart Agricultural Technology",
    link: "https://www.sciencedirect.com/science/article/pii/S2772375525008962",
    summary:
      "This paper supports IoT-based farming systems and connects with the sensor communication and monitoring part of our rover.",
  },
  {
    title:
      "Smart Agricultural Technology for Intelligent Crop and Irrigation Management",
    year: "2025",
    source: "Smart Agricultural Technology",
    link: "https://www.sciencedirect.com/science/article/pii/S2772375525008925",
    summary:
      "This paper supports intelligent agriculture and irrigation management, which relates to our adaptive watering and software control logic.",
  },
];

const teamResearch = [
  {
    id: 1,
    name: "Akhi Ketu Chakma",
    role: "Research Contributor",
    topic:
      "Covered smart irrigation, IoT agriculture, autonomous rover movement, obstacle avoidance, sensor-based decision-making, and faculty-related robotics papers.",
    status: "Completed",
    papers: akhiPapers,
  },
  {
    id: 2,
    name: "Zawad Abdullah",
    role: "Hardware Research",
    topic:
      "Assigned topic: component selection, circuit design, power system, sensors, motor driver, relay module, and hardware reliability.",
    status: "3 Remains",
    papers: zawadPapers,
  },
  {
    id: 3,
    name: "Muhammad Shajalal Sojib",
    role: "Software & IoT Research",
    topic:
      "Assigned topic: ESP32 programming, IoT dashboard, sensor data processing, pump control logic, and real-time monitoring.",
    status: "3 papers remain",
    papers: sojibPapers,
  },
  {
    id: 4,
    name: "Abdul Gaffar",
    role: "Robotics & Testing Research",
    topic:
      "Assigned topic: rover movement, obstacle avoidance, chassis testing, navigation logic, and system integration.",
    status: "3 Remains",
    papers: abdulPapers,
  },
  {
    id: 5,
    name: "Ashibul Islam Ashif",
    role: "Documentation & Presentation Research",
    topic:
      "Assigned topic: documentation, research summary, presentation support, testing records, and final report preparation.",
    status: "3 Remains",
    papers: ashifPapers,
  },
];

const researchItems = [
  {
    title: "Research Methodology",
    status: "Completed",
    summary:
      "Mixed-method research combining literature review and Google Form survey analysis to identify project needs, feasibility, and design direction.",
    details: [
      "Restated the irrigation problem and project scope",
      "Reviewed smart irrigation, IoT agriculture, soil sensing, and agricultural robotics papers",
      "Collected primary feedback through Google Forms",
      "Analyzed user needs, research gaps, and project feasibility",
    ],
  },
  {
    title: "Research Questions",
    status: "Completed",
    summary:
      "Key research questions were developed to guide the Smart Irrigation Rover project.",
    details: [
      "How can soil moisture sensing identify areas that require irrigation?",
      "How can a mobile rover improve flexibility compared to fixed irrigation systems?",
      "How useful is IoT monitoring for observing soil and environmental data?",
      "How can obstacle detection support safer autonomous movement?",
      "How can adaptive spot watering reduce unnecessary water usage?",
      "What are the challenges of developing a low-cost smart irrigation rover?",
    ],
  },
  {
    title: "Survey Questionnaire",
    status: "Completed",
    summary:
      "A Google Form survey was prepared to understand opinions about irrigation, soil monitoring, automation, and smart farming.",
    details: [
      "Collected 21 responses",
      "Included demographic, technical, and opinion-based questions",
      "Focused on manual irrigation, water wastage, soil monitoring, and automation",
      "Survey results supported the need for smart irrigation and low-cost automation",
    ],
  },
  {
    title: "Data Analysis",
    status: "Completed",
    summary:
      "Survey responses, literature findings, and component cost estimation were analyzed to evaluate project relevance and feasibility.",
    details: [
      "Literature review showed a gap in mobile adaptive irrigation systems",
      "Survey responses supported interest in automated irrigation",
      "Component cost analysis showed the prototype is financially feasible",
      "Analysis supports the development of a low-cost Smart Irrigation Rover",
    ],
  },
  {
    title: "Project Documents",
    status: "Available",
    summary:
      "Official project proposal and project overview documents are available here for viewing.",
    details: [
      "CSE 426 Project Proposal Form",
      "Smart Irrigation Rover Project Overview",
    ],
  },
];

export default function UpdatesPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [openLecture, setOpenLecture] = useState<number | null>(1);
  const [selectedMember, setSelectedMember] = useState(teamResearch[0]);
  const [openPaper, setOpenPaper] = useState<number | null>(null);
  const [openRelated, setOpenRelated] = useState<number | null>(0);

  const showLecture = filter === "all" || filter === "lecture";
  const showTeam = filter === "all" || filter === "team";
  const showRelated = filter === "all" || filter === "related";

  return (
    <div className="bg-background text-foreground overflow-hidden">
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-500/10 via-background to-teal-500/10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-teal-500/20 blur-3xl animate-pulse" />

        <div className="relative max-w-6xl mx-auto text-center">
          <span className="inline-block mb-5 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-sm font-semibold">
            Course & Research Updates
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold mb-5">
            Project Updates
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Lecture timeline, team research papers, and research-related project
            planning for the Smart Irrigation Rover.
          </p>
        </div>
      </section>

      <section className="py-5 px-4 sm:px-6 lg:px-8 bg-background border-b border-border sticky top-16 z-40">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-3 justify-center">
          {[
            ["all", "All Updates"],
            ["lecture", "Lecture Timeline"],
            ["team", "Team Papers"],
            ["related", "Research Related"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key as FilterType)}
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${
                filter === key
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
                  : "bg-muted text-foreground hover:bg-muted/80 border border-border"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      {showLecture && (
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-sm font-bold text-emerald-600 uppercase tracking-wide">
                20 May - 13 August
              </span>
              <h2 className="text-3xl font-bold mt-3">Lecture Timeline</h2>
              <p className="text-muted-foreground mt-3">
                Every Wednesday • 6:30 PM - 9:30 PM
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {lectures.map((lecture) => (
                <button
                  key={lecture.id}
                  onClick={() =>
                    setOpenLecture(
                      openLecture === lecture.id ? null : lecture.id,
                    )
                  }
                  className={`text-left rounded-2xl border p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all ${
                    lecture.status === "Closed"
                      ? "bg-red-500/5 border-red-500/40"
                      : lecture.status === "Mid Week"
                        ? "bg-amber-500/10 border-amber-500/60 shadow-lg"
                        : lecture.status === "Upcoming"
                          ? "bg-blue-500/5 border-blue-500/30"
                          : openLecture === lecture.id
                            ? "bg-emerald-500/10 border-emerald-500"
                            : "bg-card border-border"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-emerald-600">
                        {lecture.displayDate}
                      </p>
                      <h3 className="text-xl font-bold mt-2">
                        {lecture.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {lecture.time}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 px-3 py-1 rounded-full text-xs font-bold ${
                        lecture.status === "Closed"
                          ? "bg-red-500/10 text-red-600"
                          : lecture.status === "Mid Week"
                            ? "bg-amber-500/10 text-amber-700"
                            : lecture.status === "Completed"
                              ? "bg-emerald-500/10 text-emerald-600"
                              : "bg-blue-500/10 text-blue-600"
                      }`}
                    >
                      {lecture.status}
                    </span>
                  </div>

                  {openLecture === lecture.id && (
                    <p className="mt-5 text-muted-foreground leading-8 text-justify">
                      {lecture.description}
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {showTeam && (
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-muted/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-sm font-bold text-emerald-600 uppercase tracking-wide">
                Literature Review
              </span>
              <h2 className="text-3xl font-bold mt-3">Team Research Papers</h2>
              <p className="text-muted-foreground mt-3">
                Click a team member to view their assigned research topic and
                selected papers.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8">
              <div className="grid grid-cols-1 gap-4">
                {teamResearch.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => {
                      setSelectedMember(member);
                      setOpenPaper(null);
                    }}
                    className={`text-left rounded-2xl border p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all ${
                      selectedMember.id === member.id
                        ? "border-emerald-500 bg-emerald-500/10"
                        : "border-border bg-card"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold">{member.name}</h3>
                        <p className="text-sm font-semibold text-emerald-600 mt-1">
                          {member.role}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2 leading-6 text-justify">
                          {member.topic}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 px-3 py-1 rounded-full text-xs font-bold ${
                          member.status === "Completed"
                            ? "bg-emerald-500/10 text-emerald-600"
                            : "bg-amber-500/10 text-amber-700"
                        }`}
                      >
                        {member.status}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="rounded-3xl bg-card border border-border p-7 shadow-xl h-fit">
                <p className="text-sm font-bold text-emerald-600 uppercase tracking-wide">
                  Selected Member
                </p>
                <h2 className="text-3xl font-bold mt-2">
                  {selectedMember.name}
                </h2>
                <p className="text-muted-foreground mt-3 leading-8 text-justify">
                  {selectedMember.topic}
                </p>

                <div className="mt-7">
                  {selectedMember.papers.length === 0 ? (
                    <div className="rounded-2xl bg-muted/50 border border-border p-6 text-center">
                      <h3 className="text-xl font-bold mb-2">
                        Papers will be updated later
                      </h3>
                      <p className="text-muted-foreground">
                        This member’s papers will be added after collecting the
                        final summaries and links.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-5">
                      {selectedMember.papers.map((paper, index) => (
                        <div
                          key={paper.title}
                          className="rounded-2xl bg-muted/50 border border-border p-5 hover:border-emerald-500/50 transition-all"
                        >
                          <button
                            onClick={() =>
                              setOpenPaper(openPaper === index ? null : index)
                            }
                            className="w-full text-left"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <p className="text-sm font-bold text-emerald-600">
                                  Paper {index + 1} • {paper.year}
                                </p>
                                <h3 className="text-lg font-bold mt-2">
                                  {paper.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {paper.source}
                                </p>
                              </div>

                              <span className="shrink-0 w-9 h-9 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                                {openPaper === index ? "−" : "+"}
                              </span>
                            </div>
                          </button>

                          {openPaper === index && (
                            <div className="mt-5 pt-5 border-t border-border">
                              <p className="text-sm text-muted-foreground leading-7 text-justify mb-4">
                                {paper.summary}
                              </p>

                              <a
                                href={paper.link}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all"
                              >
                                Open Paper
                              </a>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {showRelated && (
        <section className="py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-sm font-bold text-emerald-600 uppercase tracking-wide">
                Research Planning
              </span>
              <h2 className="text-3xl font-bold mt-3">Research Related</h2>
              <p className="text-muted-foreground mt-3">
                These sections will be updated later with final project
                methodology, questions, and survey details.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {researchItems.map((item, index) => (
                <button
                  key={item.title}
                  onClick={() =>
                    setOpenRelated(openRelated === index ? null : index)
                  }
                  className={`text-left rounded-3xl border p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all ${
                    openRelated === index
                      ? "border-emerald-500 bg-emerald-500/10"
                      : "border-border bg-card"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-emerald-600">
                        {item.status}
                      </p>
                      <h3 className="text-xl font-bold mt-2">{item.title}</h3>
                    </div>
                    <span className="shrink-0 w-9 h-9 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                      {openRelated === index ? "−" : "+"}
                    </span>
                  </div>

                  {openRelated === index && (
                    <div className="mt-5">
                      <p className="text-muted-foreground leading-8 text-justify">
                        {item.summary}
                      </p>

                      {item.title === "Project Documents" ? (
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <a
                            href="/Documents/IUB_CSE 426_Project Proposal Form.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-2xl border border-border bg-background p-5 hover:border-emerald-500/60 hover:shadow-md transition-all"
                          >
                            <p className="text-sm font-semibold text-emerald-600 mb-2">
                              PDF Document
                            </p>
                            <h3 className="text-lg font-bold mb-2">
                              Project Proposal Form
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Survey, goals, block diagram, timeline,
                              references, and team details.
                            </p>
                            <span className="inline-flex mt-4 text-sm font-semibold text-emerald-600">
                              Open PDF →
                            </span>
                          </a>

                          <a
                            href="/Documents/Team-02-Project Overview.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-2xl border border-border bg-background p-5 hover:border-emerald-500/60 hover:shadow-md transition-all"
                          >
                            <p className="text-sm font-semibold text-emerald-600 mb-2">
                              PDF Document
                            </p>
                            <h3 className="text-lg font-bold mb-2">
                              Project Overview
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Methodology, research questions, cost estimation,
                              classification, and data analysis.
                            </p>
                            <span className="inline-flex mt-4 text-sm font-semibold text-emerald-600">
                              Open PDF →
                            </span>
                          </a>
                        </div>
                      ) : (
                        <>
                          <ul className="mt-5 space-y-3">
                            {item.details.map((detail, detailIndex) => (
                              <li
                                key={detailIndex}
                                className="flex gap-3 text-sm text-muted-foreground leading-relaxed"
                              >
                                <span className="mt-1.5 h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>

                          {item.title === "Survey Questionnaire" && (
                            <a
                              href="https://docs.google.com/forms/d/e/1FAIpQLSctAt3ngjfl3uGf-DIGq8hnoRspJsDFtkcciusU30_ddB2sug/viewform?usp=header"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex mt-5 px-5 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all shadow-md"
                            >
                              Open Survey Form
                            </a>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
