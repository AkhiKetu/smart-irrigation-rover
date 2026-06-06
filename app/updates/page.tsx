'use client';

import { useMemo, useState } from 'react';

type FilterType = 'all' | 'lecture' | 'research' | 'papers';

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
    title: 'Update Later',
    status: 'Upcoming',
    description:
      'Coming Soon',
  },
  {
    id: 5,
    date: '2026-06-17',
    displayDate: '17 June 2026',
    time: 'Wednesday • 6:30 PM - 9:30 PM',
    title: 'Update Later',
    status: 'Upcoming',
    description:
      'Coming Soon',
  },
  {
    id: 6,
    date: '2026-06-24',
    displayDate: '24 June 2026',
    time: 'Wednesday • 6:30 PM - 9:30 PM',
    title: 'Update Later',
    status: 'Upcoming',
    description:
      'Coming Soon',
  },
  {
    id: 7,
    date: '2026-07-01',
    displayDate: '01 July 2026',
    time: 'Wednesday • 6:30 PM - 9:30 PM',
    title: 'Update Later',
    status: 'Upcoming',
    description:
      'Coming Soon',
  },
  {
    id: 8,
    date: '2026-07-08',
    displayDate: '08 July 2026',
    time: 'Wednesday • 6:30 PM - 9:30 PM',
    title: 'Update Later',
    status: 'Upcoming',
    description:
      'Coming Soon',
  },
  {
    id: 9,
    date: '2026-07-15',
    displayDate: '15 July 2026',
    time: 'Wednesday • 6:30 PM - 9:30 PM',
    title: 'Update Later',
    status: 'Upcoming',
    description:
      'Coming Soon',
  },
  {
    id: 10,
    date: '2026-07-22',
    displayDate: '22 July 2026',
    time: 'Wednesday • 6:30 PM - 9:30 PM',
    title: 'Update Later',
    status: 'Upcoming',
    description:
      'Coming Soon',
  },
  {
    id: 11,
    date: '2026-07-29',
    displayDate: '29 July 2026',
    time: 'Wednesday • 6:30 PM - 9:30 PM',
    title: 'Update Later',
    status: 'Upcoming',
    description:
      'Coming Soon',
  },
  {
    id: 12,
    date: '2026-08-05',
    displayDate: '05 August 2026',
    time: 'Wednesday • 6:30 PM - 9:30 PM',
    title: 'Update Later',
    status: 'Upcoming',
    description:
      'Coming Soon',
  },
  {
    id: 13,
    date: '2026-08-12',
    displayDate: '12 August 2026',
    time: 'Wednesday • 6:30 PM - 9:30 PM',
    title: 'Update Later',
    status: 'Upcoming',
    description:
      'Coming Soon',
  },
];

const papers = [
  {
    title: 'An Overview of Smart Irrigation Systems Using IoT',
    year: '2022',
    source: 'Energy Nexus',
    link: 'https://openaccess.city.ac.uk/id/eprint/28838/1/1-s2.0-S2772427122000791-main.pdf',
  },
  {
    title: 'IoT-Enabled Smart Agriculture: Architecture, Applications, and Challenges',
    year: '2022',
    source: 'Applied Sciences',
    link: 'https://www.mdpi.com/2076-3417/12/7/3396/pdf',
  },
  {
    title: 'Evaluation of IoT Based Smart Drip Irrigation and ETc Based System for Sweet Corn',
    year: '2023',
    source: 'Smart Agricultural Technology',
    link: 'https://www.sciencedirect.com/science/article/pii/S2772375523000783',
  },
  {
    title: 'IoT-Enabled Smart Agriculture for Improving Water Management',
    year: '2025',
    source: 'Results in Engineering',
    link: 'https://www.sciencedirect.com/science/article/pii/S2468227624004691',
  },
  {
    title: 'Visual Navigation and Obstacle Avoidance Control for Agricultural Robots',
    year: '2023',
    source: 'Remote Sensing',
    link: 'https://www.mdpi.com/2072-4292/15/22/5402/pdf',
  },
  {
    title: 'Comparative Analysis of Soil Moisture- and Weather-Based Irrigation Scheduling',
    year: '2025',
    source: 'Sensors',
    link: 'https://www.mdpi.com/1424-8220/25/5/1568/pdf',
  },
  {
    title: 'A Comprehensive Review of Obstacle Avoidance for Autonomous Agricultural Machinery',
    year: '2025',
    source: 'Artificial Intelligence in Agriculture',
    link: 'https://www.sciencedirect.com/science/article/pii/S2589721725000819',
  },
  {
    title: 'Low Cost AI-Driven Autonomous Rescue Bot for Water-Based Life-Saving Missions',
    year: '2025',
    source: 'Faculty Related Paper',
    link: 'https://www.researchgate.net/publication/398519420_Low_Cost_AI-Driven_Autonomous_Rescue_Bot_for_Water-Based_Life-Saving_Missions',
  },
  {
    title: 'IoT Based Fruit Quality Inspection and Lifespan Detection System',
    year: '2024',
    source: 'Faculty Related Paper',
    link: 'https://www.researchgate.net/publication/374807886_IoT_based_Fruit_Quality_Inspection_and_Lifespan_Detection_System',
  },
  {
    title: 'Smart Floor Cleaning Robot',
    year: '2023',
    source: 'Faculty Related Paper',
    link: 'https://www.researchgate.net/publication/373709780_Smart_Floor_Cleaning_Robot',
  },
];

const researchUpdates = [
  {
    id: 1,
    date: '2026-06-01',
    title: 'Research Paper Collection Started',
    description:
      'Started collecting recent papers from 2022 to 2025 related to smart irrigation, IoT agriculture, autonomous robots, and obstacle avoidance.',
  },
  {
    id: 2,
    date: '2026-06-03',
    title: 'Final 10 Papers Selected',
    description:
      'Selected 7 Q1/Q2 papers and 3 faculty-related papers connected to robotics, IoT, sensors, and autonomous systems.',
  },
];

export default function UpdatesPage() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [openLecture, setOpenLecture] = useState<number | null>(1);
  const [openPaper, setOpenPaper] = useState<number | null>(null);

  const lectureCount = lectures.length;
  const completedLectures = lectures.filter((lecture) => lecture.status === 'Completed').length;

  const visibleSections = useMemo(() => {
    return {
      lectures: filter === 'all' || filter === 'lecture',
      research: filter === 'all' || filter === 'research',
      papers: filter === 'all' || filter === 'papers',
    };
  }, [filter]);

  return (
    <div className="bg-background text-foreground overflow-hidden">
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-500/10 via-background to-teal-500/10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-teal-500/20 blur-3xl animate-pulse" />

        <div className="relative max-w-6xl mx-auto text-center">
          <span className="inline-block mb-5 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-sm font-semibold">
            Course Updates
          </span>

          <h1 className="text-4xl sm:text-6xl font-bold mb-5">Project Updates</h1>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Lecture schedule, research progress, and selected papers for the Smart Irrigation Rover project.
          </p>
        </div>
      </section>

      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-background border-b border-border sticky top-16 z-40">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-3 justify-center">
          {[
            ['all', 'All Updates'],
            ['lecture', 'Lectures'],
            ['research', 'Research'],
            ['papers', 'Papers'],
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

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5">
          <StatCard value={lectureCount} label="Wednesday Classes" />
          <StatCard value={completedLectures} label="Completed Classes" />
          <StatCard value="10" label="Selected Papers" />
          <StatCard value="6:30-9:30" label="Class Time" />
        </div>
      </section>

      {visibleSections.lectures && (
        <section className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10 text-center">
              <span className="text-sm font-bold text-emerald-600 uppercase tracking-wide">
                20 May - 13 August
              </span>
              <h2 className="text-3xl font-bold mt-3">Lecture Timeline</h2>
              <p className="text-muted-foreground mt-3">
                Every Wednesday from 6:30 PM to 9:30 PM.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {lectures.map((lecture) => (
                <button
                  key={lecture.id}
                  onClick={() => setOpenLecture(openLecture === lecture.id ? null : lecture.id)}
                  className={`text-left rounded-2xl border p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all ${
                    lecture.status === 'Closed'
                      ? 'bg-red-500/5 border-red-500/30'
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

      {visibleSections.research && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-sm font-bold text-emerald-600 uppercase tracking-wide">
                Research Progress
              </span>
              <h2 className="text-3xl font-bold mt-3">Research Updates</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {researchUpdates.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl bg-card border border-border p-7 shadow-sm hover:shadow-xl transition-all"
                >
                  <p className="text-sm font-bold text-emerald-600">{item.date}</p>
                  <h3 className="text-xl font-bold mt-2 mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-8 text-justify">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {visibleSections.papers && (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-sm font-bold text-emerald-600 uppercase tracking-wide">
                Literature Review
              </span>
              <h2 className="text-3xl font-bold mt-3">Selected 10 Research Papers</h2>
              <p className="text-muted-foreground mt-3">
                Click a paper card to view source and open the paper link.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {papers.map((paper, index) => (
                <div
                  key={paper.title}
                  className="rounded-3xl bg-card border border-border p-6 shadow-sm hover:shadow-xl hover:border-emerald-500/50 transition-all"
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
                        <p className="text-sm text-muted-foreground mt-2">{paper.source}</p>
                      </div>

                      <span className="shrink-0 w-9 h-9 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                        {openPaper === index ? '−' : '+'}
                      </span>
                    </div>
                  </button>

                  {openPaper === index && (
                    <div className="mt-5 pt-5 border-t border-border">
                      <p className="text-sm text-muted-foreground leading-7 text-justify mb-4">
                        This paper supports our project by connecting smart irrigation, IoT sensing,
                        autonomous robotics, or obstacle avoidance with the Smart Irrigation Rover concept.
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
          </div>
        </section>
      )}
    </div>
  );
}

function StatCard({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
      <div className="text-3xl font-bold text-emerald-600 mb-2">{value}</div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}