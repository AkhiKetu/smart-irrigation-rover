'use client';

import { useState } from 'react';

type FilterType = 'all' | 'lecture' | 'team' | 'related';

const lectures = [
  {
    id: 1,
    date: '2026-05-20',
    displayDate: '20 May 2026',
    time: 'Wednesday • 6:30 PM - 9:30 PM',
    title: 'Course Introduction & Group Formation',
    status: 'Completed',
    description:
      'Basic course formatting, project group formation, initial project discussion, and overview of robotics project requirements.',
  },
  {
    id: 2,
    date: '2026-05-27',
    displayDate: '27 May 2026',
    time: 'Wednesday • 6:30 PM - 9:30 PM',
    title: 'Class Closed - Eid Vacation',
    status: 'Closed',
    description:
      'No class was held due to Eid vacation. Project discussion continued informally among team members.',
  },
  {
    id: 3,
    date: '2026-06-03',
    displayDate: '03 June 2026',
    time: 'Wednesday • 6:30 PM - 9:30 PM',
    title: 'Basic Introduction to Robotics',
    status: 'Completed',
    description:
      'Covered basic robotics ideas, robot types, autonomous systems, sensors, actuators, and how robotics connects to our Smart Irrigation Rover.',
  },
  {
    id: 4,
    date: '2026-06-10',
    displayDate: '10 June 2026',
    time: 'Wednesday • 6:30 PM - 9:30 PM',
    title: 'Update Soon',
    status: 'Upcoming',
    description:
      'No Data',
  },
  {
    id: 5,
    date: '2026-06-17',
    displayDate: '17 June 2026',
    time: 'Wednesday • 6:30 PM - 9:30 PM',
    title: 'Update Soon',
    status: 'Upcoming',
    description:
      'No Data',
  },
  {
    id: 6,
    date: '2026-06-24',
    displayDate: '24 June 2026',
    time: 'Wednesday • 6:30 PM - 9:30 PM',
    title: 'Update Soon',
    status: 'Upcoming',
    description:
      'No Data',
  },
  {
    id: 7,
    date: '2026-07-01',
    displayDate: '01 July 2026',
    time: 'Wednesday • 6:30 PM - 9:30 PM',
    title: 'Update Soon',
    status: 'Mid Week',
    description:
      'No Data',
  },
  {
    id: 8,
    date: '2026-07-08',
    displayDate: '08 July 2026',
    time: 'Wednesday • 6:30 PM - 9:30 PM',
    title: 'Update Soon',
    status: 'Upcoming',
    description:
      'No Data',
  },
  {
    id: 9,
    date: '2026-07-15',
    displayDate: '15 July 2026',
    time: 'Wednesday • 6:30 PM - 9:30 PM',
    title: 'Update Soon',
    status: 'Upcoming',
    description:
      'No Data',
  },
  {
    id: 10,
    date: '2026-07-22',
    displayDate: '22 July 2026',
    time: 'Wednesday • 6:30 PM - 9:30 PM',
    title: 'Update Soon',
    status: 'Upcoming',
    description:
      'No Data',
  },
  {
    id: 11,
    date: '2026-07-29',
    displayDate: '29 July 2026',
    time: 'Wednesday • 6:30 PM - 9:30 PM',
    title: 'Update Soon',
    status: 'Upcoming',
    description:
      'No Data',
  },
  {
    id: 12,
    date: '2026-08-05',
    displayDate: '05 August 2026',
    time: 'Wednesday • 6:30 PM - 9:30 PM',
    title: 'Update Soon',
    status: 'Upcoming',
    description:
      'No Data',
  },
  {
    id: 13,
    date: '2026-08-12',
    displayDate: '12 August 2026',
    time: 'Wednesday • 6:30 PM - 9:30 PM',
    title: 'Update Soon',
    status: 'Upcoming',
    description:
      'No Data',
  },
];

const akhiPapers = [
  {
    title: 'An Overview of Smart Irrigation Systems Using IoT',
    year: '2022',
    source: 'Energy Nexus',
    link: 'https://openaccess.city.ac.uk/id/eprint/28838/1/1-s2.0-S2772427122000791-main.pdf',
    summary:
      'This paper supports the IoT-based irrigation concept of our rover by explaining smart irrigation architecture, sensing, and water-saving methods.',
  },
  {
    title: 'IoT-Enabled Smart Agriculture: Architecture, Applications, and Challenges',
    year: '2022',
    source: 'Applied Sciences',
    link: 'https://www.mdpi.com/2076-3417/12/7/3396/pdf',
    summary:
      'This paper connects with our ESP32-based IoT monitoring system and explains how smart agriculture systems collect, process, and monitor field data.',
  },
  {
    title: 'Evaluation of IoT Based Smart Drip Irrigation and ETc Based System for Sweet Corn',
    year: '2023',
    source: 'Smart Agricultural Technology',
    link: 'https://www.sciencedirect.com/science/article/pii/S2772375523000783',
    summary:
      'This paper supports efficient irrigation decision-making and helps justify watering only when needed instead of wasting water.',
  },
  {
    title: 'IoT-Enabled Smart Agriculture for Improving Water Management',
    year: '2025',
    source: 'Results in Engineering',
    link: 'https://www.sciencedirect.com/science/article/pii/S2468227624004691',
    summary:
      'This paper is related to water management in agriculture and supports our adaptive spot-watering system.',
  },
  {
    title: 'Visual Navigation and Obstacle Avoidance Control for Agricultural Robots',
    year: '2023',
    source: 'Remote Sensing',
    link: 'https://www.mdpi.com/2072-4292/15/22/5402/pdf',
    summary:
      'This paper connects with autonomous agricultural robot movement and obstacle avoidance, which is important for our rover navigation.',
  },
  {
    title: 'Comparative Analysis of Soil Moisture- and Weather-Based Irrigation Scheduling',
    year: '2025',
    source: 'Sensors',
    link: 'https://www.mdpi.com/1424-8220/25/5/1568/pdf',
    summary:
      'This paper supports soil moisture-based irrigation scheduling, directly matching our moisture sensor-based watering logic.',
  },
  {
    title: 'A Comprehensive Review of Obstacle Avoidance for Autonomous Agricultural Machinery',
    year: '2025',
    source: 'Artificial Intelligence in Agriculture',
    link: 'https://www.sciencedirect.com/science/article/pii/S2589721725000819',
    summary:
      'This paper supports the autonomous navigation and obstacle detection research background of our agricultural rover.',
  },
  {
    title: 'Low Cost AI-Driven Autonomous Rescue Bot for Water-Based Life-Saving Missions',
    year: '2025',
    source: 'Faculty Related Paper',
    link: 'https://www.researchgate.net/publication/398519420_Low_Cost_AI-Driven_Autonomous_Rescue_Bot_for_Water-Based_Life-Saving_Missions',
    summary:
      'This faculty-related paper connects with low-cost autonomous robot development and decision-making logic.',
  },
  {
    title: 'IoT Based Fruit Quality Inspection and Lifespan Detection System',
    year: '2024',
    source: 'Faculty Related Paper',
    link: 'https://www.researchgate.net/publication/374807886_IoT_based_Fruit_Quality_Inspection_and_Lifespan_Detection_System',
    summary:
      'This paper supports IoT-based agricultural monitoring and sensor-based decision-making.',
  },
  {
    title: 'Smart Floor Cleaning Robot',
    year: '2023',
    source: 'Faculty Related Paper',
    link: 'https://www.researchgate.net/publication/373709780_Smart_Floor_Cleaning_Robot',
    summary:
      'This paper connects with mobile robotics, motor control, obstacle handling, and autonomous movement concepts.',
  },
];

const teamResearch = [
  {
    id: 1,
    name: 'Akhi Ketu Chakma',
    role: 'Research Contributor',
    topic:
      'Covered smart irrigation, IoT agriculture, autonomous rover movement, obstacle avoidance, sensor-based decision-making, and faculty-related robotics papers.',
    status: 'Completed',
    papers: akhiPapers,
  },
  {
    id: 2,
    name: 'Zawad Abdullah',
    role: 'Hardware Research',
    topic:
      'Assigned topic: component selection, circuit design, power system, sensors, motor driver, relay module, and hardware reliability.',
    status: 'Pending',
    papers: [],
  },
  {
    id: 3,
    name: 'Muhammad Shajalal Sojib',
    role: 'Software & IoT Research',
    topic:
      'Assigned topic: ESP32 programming, IoT dashboard, sensor data processing, pump control logic, and real-time monitoring.',
    status: 'Pending',
    papers: [],
  },
  {
    id: 4,
    name: 'Abdul Gaffar',
    role: 'Robotics & Testing Research',
    topic:
      'Assigned topic: rover movement, obstacle avoidance, chassis testing, navigation logic, and system integration.',
    status: 'Pending',
    papers: [],
  },
  {
    id: 5,
    name: 'Ashibul Islam Ashif',
    role: 'Documentation & Presentation Research',
    topic:
      'Assigned topic: documentation, research summary, presentation support, testing records, and final report preparation.',
    status: 'Pending',
    papers: [],
  },
];

const researchRelated = [
  {
    title: 'Methodology',
    status: 'Draft',
    description:
      'This section will explain the complete working process of the Smart Irrigation Rover, including sensor data collection, decision logic, rover movement, obstacle detection, pump control, and IoT monitoring.',
  },
  {
    title: 'Research Questions',
    status: 'Draft',
    description:
      'This section will include the major research questions, such as how adaptive spot watering can reduce water waste and how autonomous navigation can support smart farming.',
  },
  {
    title: 'Survey Questions',
    status: 'Draft',
    description:
      'This section will include survey questions related to water usage, farming challenges, smart irrigation awareness, cost expectations, and acceptance of agricultural robots.',
  },
  {
    title: 'Expected Outcomes',
    status: 'Draft',
    description:
      'This section will describe the expected results, including improved irrigation efficiency, reduced manual labor, better soil monitoring, and practical use of robotics in agriculture.',
  },
];

export default function UpdatesPage() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [openLecture, setOpenLecture] = useState<number | null>(1);
  const [selectedMember, setSelectedMember] = useState(teamResearch[0]);
  const [openPaper, setOpenPaper] = useState<number | null>(null);
  const [openRelated, setOpenRelated] = useState<number | null>(0);

  const showLecture = filter === 'all' || filter === 'lecture';
  const showTeam = filter === 'all' || filter === 'team';
  const showRelated = filter === 'all' || filter === 'related';

  return (
    <div className="bg-background text-foreground overflow-hidden">
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-500/10 via-background to-teal-500/10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-teal-500/20 blur-3xl animate-pulse" />

        <div className="relative max-w-6xl mx-auto text-center">
          <span className="inline-block mb-5 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-sm font-semibold">
            Course & Research Updates
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold mb-5">Project Updates</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Lecture timeline, team research papers, and research-related project planning for the Smart Irrigation Rover.
          </p>
        </div>
      </section>

      <section className="py-5 px-4 sm:px-6 lg:px-8 bg-background border-b border-border sticky top-16 z-40">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-3 justify-center">
          {[
            ['all', 'All Updates'],
            ['lecture', 'Lecture Timeline'],
            ['team', 'Team Papers'],
            ['related', 'Research Related'],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key as FilterType)}
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${
                filter === key
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                  : 'bg-muted text-foreground hover:bg-muted/80 border border-border'
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
              <p className="text-muted-foreground mt-3">Every Wednesday • 6:30 PM - 9:30 PM</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {lectures.map((lecture) => (
                <button
                  key={lecture.id}
                  onClick={() => setOpenLecture(openLecture === lecture.id ? null : lecture.id)}
                  className={`text-left rounded-2xl border p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all ${
                    lecture.status === 'Closed'
                      ? 'bg-red-500/5 border-red-500/40'
                      : lecture.status === 'Mid Week'
                      ? 'bg-amber-500/10 border-amber-500/60 shadow-lg'
                      : lecture.status === 'Upcoming'
                      ? 'bg-blue-500/5 border-blue-500/30'
                      : openLecture === lecture.id
                      ? 'bg-emerald-500/10 border-emerald-500'
                      : 'bg-card border-border'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-emerald-600">{lecture.displayDate}</p>
                      <h3 className="text-xl font-bold mt-2">{lecture.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{lecture.time}</p>
                    </div>

                    <span
                      className={`shrink-0 px-3 py-1 rounded-full text-xs font-bold ${
                        lecture.status === 'Closed'
                          ? 'bg-red-500/10 text-red-600'
                          : lecture.status === 'Mid Week'
                          ? 'bg-amber-500/10 text-amber-700'
                          : lecture.status === 'Completed'
                          ? 'bg-emerald-500/10 text-emerald-600'
                          : 'bg-blue-500/10 text-blue-600'
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
                Click a team member to view their assigned research topic and selected papers.
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
                        ? 'border-emerald-500 bg-emerald-500/10'
                        : 'border-border bg-card'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold">{member.name}</h3>
                        <p className="text-sm font-semibold text-emerald-600 mt-1">{member.role}</p>
                        <p className="text-sm text-muted-foreground mt-2 leading-6 text-justify">
                          {member.topic}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 px-3 py-1 rounded-full text-xs font-bold ${
                          member.status === 'Completed'
                            ? 'bg-emerald-500/10 text-emerald-600'
                            : 'bg-amber-500/10 text-amber-700'
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
                <h2 className="text-3xl font-bold mt-2">{selectedMember.name}</h2>
                <p className="text-muted-foreground mt-3 leading-8 text-justify">
                  {selectedMember.topic}
                </p>

                <div className="mt-7">
                  {selectedMember.papers.length === 0 ? (
                    <div className="rounded-2xl bg-muted/50 border border-border p-6 text-center">
                      <h3 className="text-xl font-bold mb-2">Papers will be updated later</h3>
                      <p className="text-muted-foreground">
                        This member’s papers will be added after collecting the final summaries and links.
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
                            onClick={() => setOpenPaper(openPaper === index ? null : index)}
                            className="w-full text-left"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <p className="text-sm font-bold text-emerald-600">
                                  Paper {index + 1} • {paper.year}
                                </p>
                                <h3 className="text-lg font-bold mt-2">{paper.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{paper.source}</p>
                              </div>

                              <span className="shrink-0 w-9 h-9 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                                {openPaper === index ? '−' : '+'}
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
                These sections will be updated later with final project methodology, questions, and survey details.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {researchRelated.map((item, index) => (
                <button
                  key={item.title}
                  onClick={() => setOpenRelated(openRelated === index ? null : index)}
                  className={`text-left rounded-3xl border p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all ${
                    openRelated === index
                      ? 'border-emerald-500 bg-emerald-500/10'
                      : 'border-border bg-card'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-emerald-600">{item.status}</p>
                      <h3 className="text-xl font-bold mt-2">{item.title}</h3>
                    </div>
                    <span className="shrink-0 w-9 h-9 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                      {openRelated === index ? '−' : '+'}
                    </span>
                  </div>

                  {openRelated === index && (
                    <p className="mt-5 text-muted-foreground leading-8 text-justify">
                      {item.description}
                    </p>
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