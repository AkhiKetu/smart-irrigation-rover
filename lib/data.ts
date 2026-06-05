export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface Update {
  id: number;
  title: string;
  description: string;
  category: 'lecture' | 'research';
  date: string;
  week: number;
  content: string;
}

export const teamMembers: TeamMember[] = [
{
  id: 1,
  name: 'Akhi Ketu Chakma',
  role: 'Project Lead & Research',
  bio: 'Works on project planning, research papers, proposal writing, and overall project coordination.',
  image: '/Team/AkhiKetu-1.png',
},
{
  id: 2,
  name: 'Zawad Abdullah',
  role: 'Hardware & Circuit Design',
  bio: 'Works on component selection, circuit connection, ESP32 setup, sensors, motor driver, and power system.',
  image: '/Team/Zawad.jpg',
},
{
  id: 3,
  name: 'Muhammad Shajalal Sojib',
  role: 'Software & IoT Dashboard',
  bio: 'Works on ESP32 programming, IoT dashboard, sensor data processing, and pump control logic.',
  image: '/Team/Sojib.jpg',
},
{
  id: 4,
  name: 'Abdul Gaffar',
  role: 'Robotics & Testing',
  bio: 'Works on rover movement, obstacle avoidance, motor testing, chassis setup, and system integration.',
  image: '/Team/Gaffar.jpg',
},
{
  id: 5,
  name: 'Ashibul Islam Ashif',
  role: 'Documentation & Presentation',
  bio: 'Works on documentation, presentation slides, website content, testing records, and final report support.',
  image: '/Team/Asif.jpg',
},
];

export const updates: Update[] = [
  {
    id: 1,
    title: 'Course Introduction & Project Overview',
    description: 'Introduction to robotics course and Smart Irrigation Rover project kickoff',
    category: 'lecture',
    date: '2024-01-15',
    week: 1,
    content: 'Today we introduced the Smart Irrigation Rover project to the class. The project aims to create an autonomous rover capable of detecting soil moisture levels and delivering adaptive irrigation to specific areas of a garden.',
  },
  {
    id: 2,
    title: 'Initial Requirements Analysis',
    description: 'Research on soil moisture sensors and irrigation technologies',
    category: 'research',
    date: '2024-01-17',
    week: 1,
    content: 'We conducted a comprehensive analysis of available soil moisture sensors. We found that capacitive sensors provide the best balance between accuracy and cost. We also researched drip irrigation systems and water pump specifications.',
  },
  {
    id: 3,
    title: 'Robotics Fundamentals & Motion Planning',
    description: 'Core lecture on kinematics, propulsion systems, and navigation',
    category: 'lecture',
    date: '2024-01-22',
    week: 2,
    content: 'Covered fundamental robotics concepts including forward/inverse kinematics, different wheeled platform configurations, and basic motion planning algorithms. Discussed how these apply to our rover design.',
  },
  {
    id: 4,
    title: 'Hardware Component Selection & Testing',
    description: 'Research and testing of motors, wheels, and chassis materials',
    category: 'research',
    date: '2024-01-24',
    week: 2,
    content: 'Completed initial testing of three different motor options. Selected brushless motors with 100:1 gearbox ratio for optimal torque. Tested lightweight aluminum chassis material and evaluated wheel designs for various terrain.',
  },
  {
    id: 5,
    title: 'Sensors & Data Acquisition Systems',
    description: 'Deep dive into sensor integration and microcontroller programming',
    category: 'lecture',
    date: '2024-01-29',
    week: 3,
    content: 'Detailed lecture on sensor interfaces (analog, I2C, SPI), data acquisition principles, and real-time data processing. Covered sensor calibration and noise filtering techniques.',
  },
  {
    id: 6,
    title: 'Soil Moisture Detection Algorithm Development',
    description: 'Research on adaptive calibration and threshold detection',
    category: 'research',
    date: '2024-01-31',
    week: 3,
    content: 'Developed an adaptive soil moisture detection algorithm that learns soil characteristics. Implemented multi-point calibration to account for different soil types and humidity conditions.',
  },
  {
    id: 7,
    title: 'Control Systems & Feedback Loops',
    description: 'Lecture on PID controllers and closed-loop systems',
    category: 'lecture',
    date: '2024-02-05',
    week: 4,
    content: 'Comprehensive coverage of PID control systems, including tuning methods and applications to motor speed control and position tracking. Discussed stability analysis and real-world implementation challenges.',
  },
  {
    id: 8,
    title: 'Prototype Assembly & Initial Testing',
    description: 'First full integration of mechanical and electrical components',
    category: 'research',
    date: '2024-02-07',
    week: 4,
    content: 'Successfully assembled the first prototype. Conducted initial motor tests and verified sensor readings. Identified and fixed calibration issues with moisture sensors. Rover can now move autonomously.',
  },
  {
    id: 9,
    title: 'Autonomous Navigation & Path Planning',
    description: 'Algorithms for autonomous watering coverage',
    category: 'lecture',
    date: '2024-02-12',
    week: 5,
    content: 'Covered grid-based and graph-based path planning algorithms. Discussed coverage algorithms for systematic garden watering. Analyzed optimal routes for energy efficiency.',
  },
  {
    id: 10,
    title: 'Field Testing & Calibration',
    description: 'Real-world testing in controlled garden environment',
    category: 'research',
    date: '2024-02-14',
    week: 5,
    content: 'Conducted field tests in a controlled garden plot. Rover successfully navigated 50x50 meter area and identified dry patches. Fine-tuned moisture threshold values based on actual plant requirements.',
  },
];

export const projectVision =
  'Our vision is to build a low-cost smart irrigation rover that can support farmers by making watering more accurate, automatic, and efficient. Instead of watering the whole field, the rover checks soil moisture at different spots and supplies water only where the soil is dry. By combining sensors, ESP32 control, obstacle detection, IoT monitoring, and adaptive decision logic, this project shows how robotics can be used in precision agriculture to reduce water waste, save time, and make irrigation smarter for the future.';
export const projectGoals = [
  {
    title: 'Autonomous Navigation',
    description: 'Develop a rover capable of navigating garden terrain independently without human intervention',
  },
  {
    title: 'Adaptive Soil Sensing',
    description: 'Implement accurate soil moisture detection that adapts to different soil types and environmental conditions',
  },
  {
    title: 'Precise Water Delivery',
    description: 'Create a controlled irrigation system capable of delivering water to specific plant locations with minimal waste',
  },
  {
    title: 'Energy Efficiency',
    description: 'Optimize power consumption to enable extended operation on battery power',
  },
  {
    title: 'Data Logging & Analytics',
    description: 'Record environmental data and create reports on watering patterns and plant health metrics',
  },
];
