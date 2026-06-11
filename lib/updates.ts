// ─── Types ────────────────────────────────────────────────────────────────────

export type LectureStatus = "Completed" | "Closed" | "Upcoming" | "Mid Week";
export type FilterType = "all" | "lecture" | "team" | "related";

export interface Lecture {
  id: number;
  date: string;
  displayDate: string;
  time: string;
  title: string;
  status: LectureStatus;
  description: string;
}

export interface Paper {
  title: string;
  year: string;
  source: string;
  link: string;
  summary: string;
  PDF?: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  topic: string;
  status: "Completed" | "In Progress";
  papers: Paper[];
}

export interface ResearchItem {
  title: string;
  status: string;
  summary: string;
  details: string[];
  hasSurveyLink?: boolean;
  hasDocuments?: boolean;
}
export interface DocumentLink {
  title: string;
  href: string;
  type: "PDF" | "Slide" | "Document";
}

export interface Lecture {
  id: number;
  date: string;
  displayDate: string;
  time: string;
  title: string;
  status: LectureStatus;
  description: string;
  materials?: DocumentLink[];
}

export interface Paper {
  title: string;
  year: string;
  source: string;
  link: string; // external paper/source link
  pdf?: string; // local PDF from public folder
  summary: string;
}

// ─── Lectures ─────────────────────────────────────────────────────────────────

export const lectures: Lecture[] = [
  {
    id: 1,
    date: "2026-05-20",
    displayDate: "20 May 2026",
    time: "Wednesday • 6:30 PM – 9:30 PM",
    title: "Course Introduction & Group Formation",
    status: "Completed",
    description:
      "Basic course formatting, project group formation, initial project discussion, and overview of robotics project requirements.",
    materials: [
      {
        title: "Short Summary",
        href: "dfdfdf",
        type: "PDF",
      },
    ],
  },
  {
    id: 2,
    date: "2026-05-27",
    displayDate: "27 May 2026",
    time: "Wednesday • 6:30 PM – 9:30 PM",
    title: "Class Closed — Eid Vacation",
    status: "Closed",
    description:
      "No class was held due to Eid vacation. Project discussion continued informally among team members.",
  },
  {
    id: 3,
    date: "2026-06-03",
    displayDate: "03 June 2026",
    time: "Wednesday • 6:30 PM – 9:30 PM",
    title: "Basic Introduction to Robotics",
    status: "Completed",
    description:
      "Covered basic robotics ideas, robot types, autonomous systems, sensors, actuators, and how robotics connects to our Smart Irrigation Rover.",
  },
  {
    id: 4,
    date: "2026-06-10",
    displayDate: "10 June 2026",
    time: "Wednesday • 6:30 PM – 9:30 PM",
    title: "Presentation of Research Proposals",
    status: "Completed",
    description: "Each team presented their research proposal, including project goals, planned approach, and expected challenges. Feedback was provided to help refine the project direction.",
    materials: [
      {
        title: "Short Summary",
        href: "dfdfdf",
        type: "PDF",
      },
    ],
  },
  {
    id: 5,
    date: "2026-06-17",
    displayDate: "17 June 2026",
    time: "Wednesday • 6:30 PM – 9:30 PM",
    title: "Update Soon",
    status: "Upcoming",
    description: "No Data",
  },
  {
    id: 6,
    date: "2026-06-24",
    displayDate: "24 June 2026",
    time: "Wednesday • 6:30 PM – 9:30 PM",
    title: "Update Soon",
    status: "Upcoming",
    description: "No Data",
  },
  {
    id: 7,
    date: "2026-07-01",
    displayDate: "01 July 2026",
    time: "Wednesday • 6:30 PM – 9:30 PM",
    title: "Update Soon",
    status: "Mid Week",
    description: "No Data",
  },
  {
    id: 8,
    date: "2026-07-08",
    displayDate: "08 July 2026",
    time: "Wednesday • 6:30 PM – 9:30 PM",
    title: "Update Soon",
    status: "Upcoming",
    description: "No Data",
  },
  {
    id: 9,
    date: "2026-07-15",
    displayDate: "15 July 2026",
    time: "Wednesday • 6:30 PM – 9:30 PM",
    title: "Update Soon",
    status: "Upcoming",
    description: "No Data",
  },
  {
    id: 10,
    date: "2026-07-22",
    displayDate: "22 July 2026",
    time: "Wednesday • 6:30 PM – 9:30 PM",
    title: "Update Soon",
    status: "Upcoming",
    description: "No Data",
  },
  {
    id: 11,
    date: "2026-07-29",
    displayDate: "29 July 2026",
    time: "Wednesday • 6:30 PM – 9:30 PM",
    title: "Update Soon",
    status: "Upcoming",
    description: "No Data",
  },
  {
    id: 12,
    date: "2026-08-05",
    displayDate: "05 August 2026",
    time: "Wednesday • 6:30 PM – 9:30 PM",
    title: "Update Soon",
    status: "Upcoming",
    description: "No Data",
  },
  {
    id: 13,
    date: "2026-08-12",
    displayDate: "12 August 2026",
    time: "Wednesday • 6:30 PM – 9:30 PM",
    title: "Update Soon",
    status: "Upcoming",
    description: "No Data",
  },
];

// ─── Papers ───────────────────────────────────────────────────────────────────

const akhiPapers: Paper[] = [
  {
    title: "An Overview of Smart Irrigation Systems Using IoT",
    year: "2022",
    source: "Energy Nexus",
    link: "https://openaccess.city.ac.uk/id/eprint/28838/1/1-s2.0-S2772427122000791-main.pdf",
    pdf:"hh",
    summary:
      "Supports the IoT-based irrigation concept by explaining smart irrigation architecture, sensing, and water-saving methods.",
  },
  {
    title: "IoT-Enabled Smart Agriculture: Architecture, Applications, and Challenges",
    year: "2022",
    source: "Applied Sciences",
    link: "https://www.mdpi.com/2076-3417/12/7/3396/pdf",
    summary:
      "Connects with the ESP32-based IoT monitoring system and explains how smart agriculture systems collect, process, and monitor field data.",
  },
  {
    title: "Evaluation of IoT Based Smart Drip Irrigation and ETc Based System for Sweet Corn",
    year: "2023",
    source: "Smart Agricultural Technology",
    link: "https://www.sciencedirect.com/science/article/pii/S2772375523000783",
    summary:
      "Supports efficient irrigation decision-making and helps justify watering only when needed.",
  },
  {
    title: "IoT-Enabled Smart Agriculture for Improving Water Management",
    year: "2025",
    source: "Results in Engineering",
    link: "https://www.sciencedirect.com/science/article/pii/S2468227624004691",
    summary:
      "Related to water management in agriculture and supports the adaptive spot-watering system.",
  },
  {
    title: "Visual Navigation and Obstacle Avoidance Control for Agricultural Robots",
    year: "2023",
    source: "Remote Sensing",
    link: "https://www.mdpi.com/2072-4292/15/22/5402/pdf",
    summary:
      "Connects with autonomous agricultural robot movement and obstacle avoidance for rover navigation.",
  },
  {
    title: "Comparative Analysis of Soil Moisture- and Weather-Based Irrigation Scheduling",
    year: "2025",
    source: "Sensors",
    link: "https://www.mdpi.com/1424-8220/25/5/1568/pdf",
    summary:
      "Supports soil moisture-based irrigation scheduling, directly matching the moisture sensor-based watering logic.",
  },
  {
    title: "A Comprehensive Review of Obstacle Avoidance for Autonomous Agricultural Machinery",
    year: "2025",
    source: "Artificial Intelligence in Agriculture",
    link: "https://www.sciencedirect.com/science/article/pii/S2589721725000819",
    summary:
      "Supports autonomous navigation and obstacle detection research background.",
  },
  {
    title: "Low Cost AI-Driven Autonomous Rescue Bot for Water-Based Life-Saving Missions",
    year: "2025",
    source: "Faculty Related Paper",
    link: "https://www.researchgate.net/publication/398519420_Low_Cost_AI-Driven_Autonomous_Rescue_Bot_for_Water-Based_Life-Saving_Missions",
    summary:
      "Connects with low-cost autonomous robot development and decision-making logic.",
  },
  {
    title: "IoT Based Fruit Quality Inspection and Lifespan Detection System",
    year: "2024",
    source: "Faculty Related Paper",
    link: "https://www.researchgate.net/publication/374807886_IoT_based_Fruit_Quality_Inspection_and_Lifespan_Detection_System",
    summary:
      "Supports IoT-based agricultural monitoring and sensor-based decision-making.",
  },
  {
    title: "Smart Floor Cleaning Robot",
    year: "2023",
    source: "Faculty Related Paper",
    link: "https://www.researchgate.net/publication/373709780_Smart_Floor_Cleaning_Robot",
    summary:
      "Connects with mobile robotics, motor control, obstacle handling, and autonomous movement.",
  },
];

const zawadPapers: Paper[] = [
  {
    title: "An Overview of Smart Irrigation Systems Using IoT",
    year: "2022",
    source: "Energy Nexus",
    link: "https://www.sciencedirect.com/science/article/pii/S2589721722000010",
    summary:
      "Reviews IoT-based smart irrigation systems using soil moisture sensors, wireless communication, and cloud monitoring.",
  },
  {
    title: "Artificial Intelligence and IoT for Sustainable Agriculture",
    year: "2024",
    source: "Ain Shams Engineering Journal",
    link: "https://www.sciencedirect.com/science/article/pii/S1658077X24000110",
    summary:
      "Discusses how AI and IoT technologies work together in agriculture to improve productivity and resource management.",
  },
  {
    title: "IoT Based Smart Agriculture Monitoring System",
    year: "2022",
    source: "IEEE",
    link: "https://ieeexplore.ieee.org/abstract/document/9716089",
    summary:
      "Presents a real-time agriculture monitoring platform using IoT sensors and cloud communication.",
  },
  {
    title: "Integrating AI and IoT for Smart Agriculture",
    year: "2025",
    source: "ResearchGate",
    link: "https://www.researchgate.net/publication/391578231_Integrating_AI_and_IOT_for_Smart_Agriculture_Machine_Learning_Models_for_Precision_Irrigation",
    summary:
      "Explores machine learning models for precision irrigation, showing how AI algorithms can predict irrigation needs.",
  },
  {
    title: "AI-Driven Precision Agriculture and Smart Irrigation",
    year: "2025",
    source: "Smart Agricultural Technology",
    link: "https://www.sciencedirect.com/science/article/pii/S2772375525008603",
    summary:
      "Highlights recent advances in AI-powered irrigation systems and precision agriculture technologies.",
  },
  {
    title: "Internet of Things Applications in Smart Farming",
    year: "2022",
    source: "Smart Agricultural Technology",
    link: "https://www.sciencedirect.com/science/article/pii/S2352484722013543",
    summary:
      "Reviews IoT applications in agriculture including irrigation, crop monitoring, and environmental sensing.",
  },
  {
    title: "Machine Learning Techniques for Irrigation Management",
    year: "2022",
    source: "Measurement",
    link: "https://www.sciencedirect.com/science/article/pii/S0263224121011404",
    summary:
      "Investigates machine learning approaches for irrigation scheduling and water management.",
  },
  {
    title: "Low Cost AI-Driven Autonomous Rescue Bot for Water-Based Life-Saving Missions",
    year: "2025",
    source: "IEEE Conference",
    link: "https://ieeexplore.ieee.org/document/10661094",
    summary:
      "Shows how affordable robotic systems can combine sensing, autonomy, and decision-making for real-world field operation.",
  },
  {
    title: "IoT Based Fruit Quality Inspection and Lifespan Detection System",
    year: "2024",
    source: "IEEE Conference",
    link: "https://ieeexplore.ieee.org/document/10660792",
    summary:
      "Focuses on IoT-based monitoring and automated quality inspection using sensor data.",
  },
  {
    title: "Smart Floor Cleaning Robot",
    year: "2023",
    source: "IEEE TENSYMP",
    link: "https://ieeexplore.ieee.org/document/10660714",
    summary:
      "Describes an autonomous cleaning robot with movement control and obstacle-aware operation.",
  },
];

const abdulPapers: Paper[] = [
  {
    title: "Wireless Sensor Networks for Agriculture: The State-of-the-Art in Practice and Future Challenges",
    year: "2015",
    source: "Computers and Electronics in Agriculture",
    link: "https://www.sciencedirect.com/science/article/abs/pii/S0168169915002379",
    summary:
      "Explains how agricultural sensors can monitor field conditions and support automation.",
  },
  {
    title: "Energy-Efficient Wireless Sensor Networks for Agricultural Monitoring",
    year: "2023",
    source: "Computers and Electrical Engineering",
    link: "https://www.sciencedirect.com/science/article/abs/pii/S0045790623004767",
    summary:
      "Connects with low-power agricultural monitoring for reliable sensor-based rover systems.",
  },
  {
    title: "Wireless Sensor Networks in Agriculture Through Machine Learning: A Survey",
    year: "2022",
    source: "Computers and Electronics in Agriculture",
    link: "https://www.sciencedirect.com/science/article/abs/pii/S0168169922002459",
    summary:
      "Supports the idea of using sensor data and intelligent models for agriculture-related decision-making.",
  },
  {
    title: "Autonomous Navigation and Smart Agriculture Robot System",
    year: "2024",
    source: "IEEE",
    link: "https://ieeexplore.ieee.org/abstract/document/10677594",
    summary:
      "Connects with autonomous movement, navigation logic, and robotic control for agricultural environments.",
  },
  {
    title: "Smart Agricultural Technology for Automated Farming Systems",
    year: "2023",
    source: "Smart Agricultural Technology",
    link: "https://www.sciencedirect.com/science/article/pii/S277237552300045X",
    summary:
      "Supports smart farming automation and relates the rover to real agricultural technology applications.",
  },
  {
    title: "Robotics and Automation in Agriculture",
    year: "2023",
    source: "MDPI Robotics",
    link: "https://www.mdpi.com/2624-831X/4/3/12",
    summary:
      "Discusses how robots can be applied to farming, monitoring, and automation.",
  },
  {
    title: "IoT and Embedded System Based Smart Agriculture Application",
    year: "2023",
    source: "Journal of Innovative Electrical and Electronics Engineering",
    link: "https://jieee.a2zjournals.com/index.php/ieee/article/view/96",
    summary:
      "Connects with embedded system design, IoT monitoring, and smart agriculture implementation.",
  },
];

const ashifPapers: Paper[] = [
  {
    title: "AI-Based Smart Agriculture and Autonomous Farming System",
    year: "2025",
    source: "arXiv",
    link: "https://arxiv.org/abs/2507.12716",
    summary:
      "Connects AI-based decision-making with smart agriculture and autonomous farming applications.",
  },
  {
    title: "Advanced Smart Farming Technologies for Agricultural Automation",
    year: "2025",
    source: "Computers and Electronics in Agriculture",
    link: "https://www.sciencedirect.com/science/article/pii/S0168169925010385",
    summary:
      "Relates to agricultural automation and supports smart systems for monitoring and irrigation management.",
  },
  {
    title: "Intelligent Agricultural Monitoring and Automation System",
    year: "2025",
    source: "Computers and Electronics in Agriculture",
    link: "https://www.sciencedirect.com/science/article/pii/S0168169925010853",
    summary:
      "Supports the monitoring side of the rover by showing how intelligent systems collect field data.",
  },
  {
    title: "Machine Learning and AI Applications in Precision Agriculture",
    year: "2025",
    source: "arXiv",
    link: "https://arxiv.org/abs/2504.18284",
    summary:
      "Explains how AI and machine learning can improve crop monitoring, prediction, and resource management.",
  },
  {
    title: "AI-Driven Automation for Smart Agriculture",
    year: "2025",
    source: "arXiv",
    link: "https://arxiv.org/abs/2508.08607",
    summary:
      "Shows how AI can improve automation, decision-making, and agricultural productivity.",
  },
  {
    title: "Digital Agriculture and Smart Farming Review",
    year: "2020",
    source: "PubMed",
    link: "https://pubmed.ncbi.nlm.nih.gov/31906284/",
    summary:
      "Provides background on digital agriculture and smart farming to support the theoretical foundation.",
  },
  {
    title: "Smart Agriculture and Intelligent Farming Technologies",
    year: "2024",
    source: "Springer",
    link: "https://link.springer.com/article/10.1007/s44279-024-00113-3",
    summary:
      "Supports intelligent technologies in agriculture and connects with automation and monitoring goals.",
  },
];

const sojibPapers: Paper[] = [
  {
    title: "Smart Drip Irrigation Systems Using IoT: A Review of Architectures, Machine Learning",
    year: "2025",
    source: "Springer",
    link: "https://link.springer.com/article/10.1007/s44279-025-00430-1",
    summary:
      "Systematic review evaluating three-layer architectures and ML models for soil moisture prediction. Identifies edge computing and solar-powered nodes as key emerging trends.",
  },
  {
    title: "Smart IoT-Driven Precision Agriculture: Land Mapping, Crop Prediction, and Irrigation System",
    year: "2025",
    source: "PLOS ONE",
    link: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0319268",
    summary:
      "Presents an IoT-based precision agriculture system with land mapping, crop prediction, and irrigation support.",
  },
  {
    title: "The IoT and AI in Agriculture: The Time Is Now — A Systematic Review",
    year: "2025",
    source: "PMC / PubMed Central",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12196926/",
    summary:
      "Explains how IoT and AI are transforming agriculture through sensing, real-time monitoring, and data-driven decisions.",
  },
  {
    title: "Deep Learning for Intelligent Irrigation Decision-Making",
    year: "2025",
    source: "Agricultural Water Management",
    link: "https://www.sciencedirect.com/science/article/pii/S0378377425005505",
    summary:
      "Discusses deep learning for irrigation decisions and supports future improvement by showing how data can make watering more accurate.",
  },
  {
    title: "Machine Learning and Digital Twins in Smart Irrigation",
    year: "2025",
    source: "Taylor & Francis",
    link: "https://www.tandfonline.com/doi/full/10.1080/27525783.2025.2562418",
    summary:
      "First systematic review merging ML with Digital Twin technology for smart irrigation. DT-powered systems reduced water use by 25–40%.",
  },
  {
    title: "AI-Driven Solar Smart Irrigation for Sustainable Agriculture",
    year: "2025",
    source: "Smart Agricultural Technology",
    link: "https://www.sciencedirect.com/science/article/pii/S2772375525008962",
    summary:
      "Systematic review integrating AI, solar PV energy, and UN SDG alignment for smart irrigation systems.",
  },
  {
    title: "Innovative Applications of IoT and Machine Learning in Sustainable Agricultural Irrigation Management",
    year: "2025",
    source: "Smart Agricultural Technology",
    link: "https://www.sciencedirect.com/science/article/pii/S2772375525008925",
    summary:
      "Examines IoT sensor networks and ML algorithms for optimizing irrigation water use. Reports 20–35% water reduction and 10–18% yield increase.",
  },
  {
    title: "Smart Irrigation System Using IoT and Machine Learning Methods",
    year: "2023",
    source: "IEEE InC4 Conference",
    link: "https://ieeexplore.ieee.org/abstract/document/10296736",
    summary:
      "Proposes a data-driven smart irrigation system combining IoT sensors with ML classifiers. Random Forest achieved >90% accuracy in irrigation trigger prediction.",
  },
  {
    title: "Smart Irrigation: Revolutionizing Water Management in Agriculture",
    year: "2024",
    source: "IEEE ICACIS Conference",
    link: "https://ieeexplore.ieee.org/document/10480750/",
    summary:
      "Presents a smart irrigation framework integrating soil moisture sensors, IoT automation, cloud analytics, and mobile app for remote monitoring.",
  },
  {
    title: "An IoT-Based Smart Irrigation System Using Arduino and Raspberry Pi",
    year: "2024",
    source: "IEEE ICAAIC Conference",
    link: "https://ieeexplore.ieee.org/abstract/document/10438787",
    summary:
      "Designs a low-cost IoT irrigation system with threshold-based automation and SQLite data logging targeting smallholder farmers.",
  },
];

// ─── Team Research ────────────────────────────────────────────────────────────

export const teamResearch: TeamMember[] = [
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
    name: "Md. Jawad Abdullah",
    role: "Hardware Research",
    topic:
      "Assigned topic: component selection, circuit design, power system, sensors, motor driver, relay module, and hardware reliability.",
    status: "Completed",
    papers: zawadPapers,
  },
  {
    id: 3,
    name: "Shajalal Sojib",
    role: "Software & IoT Research",
    topic:
      "Assigned topic: ESP32 programming, IoT dashboard, sensor data processing, pump control logic, and real-time monitoring.",
    status: "Completed",
    papers: sojibPapers,
  },
  {
    id: 4,
    name: "Abdul Gaffar",
    role: "Robotics & Testing Research",
    topic:
      "Assigned topic: rover movement, obstacle avoidance, chassis testing, navigation logic, and system integration.",
    status: "Completed",
    papers: abdulPapers,
  },
  {
    id: 5,
    name: "Ashibul Islam Ashif",
    role: "Documentation & Presentation Research",
    topic:
      "Assigned topic: documentation, research summary, presentation support, testing records, and final report preparation.",
    status: "Completed",
    papers: ashifPapers,
  },
];

// ─── Research Items ───────────────────────────────────────────────────────────

export const researchItems: ResearchItem[] = [
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
    hasSurveyLink: true,
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
    hasDocuments: true,
  },
];
