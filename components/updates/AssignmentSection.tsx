const assignments = [
  {
    id: 1,
    title: "Assignment on Micro-controller Boards",
    description:
      "This assignment covers the basic concepts of microprocessors and microcontrollers, their detailed differences with examples, freehand pin diagrams of Arduino UNO, Arduino Mega, and Raspberry Pi 5, and an explanation of the microcontroller board selected for the lab project.",
    date: "16 June 2026",
    file: "/Assignments/Robotics Assignment-1.pdf",
  },
  {
    id: 2,
    title: "Mid-Term Assignment",
    description:
      "This midterm assignment covers robot classifications, sensors, motors, Arduino and Raspberry Pi comparison, social robots, project innovation, HRI concepts, SPA and subsumption models, anthropomorphism, Uncanny Valley, user-centered design, participatory design, and nonverbal interaction also icludes project related.",
    date: "10 July 2026",
    file: "/Assignments/Robotics-Mid-Assignment.pdf",
  },

  {
    id: 3,
    title: "Assignment 3",
    description:
      "Final Assignment for the robotics course, which includes the final project submission and report. The assignment covers the design, implementation, and testing of the Krishi Rover, including its hardware and software components, as well as the final presentation and demonstration of the project.",
    date: "August 2026",
    file: "/Assignments/Robotics-Final-Assignment-2210952.pdf",
  },
];

export function AssignmentSection() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
            Course Submissions
          </p>

          <h2 className="text-3xl font-bold text-black sm:text-4xl">
            Assignments
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            View the robotics course assignments and project-related submissions
            completed by the Krishi Rover team.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {assignments.map((assignment) => (
            <article
              key={assignment.id}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl"
            >
              <div className="flex h-44 items-center justify-center bg-linear-to-br from-emerald-50 to-teal-50">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-md">
                  <svg
                    className="h-10 w-10 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M7 3h7l5 5v13H7V3Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M14 3v6h6"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M9.5 14h5M9.5 17h5"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                    PDF
                  </span>

                  <span className="text-sm text-gray-500">
                    {assignment.date}
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  {assignment.title}
                </h3>

                <p className="mb-6 flex-1 text-justify [text-align-last:justify] text-sm leading-6 text-gray-600">
                  {assignment.description}
                </p>

                <div className="flex gap-3">
                  <a
                    href={assignment.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
                  >
                    View PDF
                  </a>

                  <a
                    href={assignment.file}
                    download
                    className="flex items-center justify-center rounded-xl border border-gray-300 px-4 py-3 text-sm font-bold text-gray-700 transition-colors hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    Download
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
