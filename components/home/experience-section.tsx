import type { WorkExperience } from "@/lib/types"

interface ExperienceSectionProps {
  experiences: WorkExperience[]
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  // Function to format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Present"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }

  // Function to get color based on index
  const getColor = (index: number) => {
    const colors = ["primary", "secondary", "accent"]
    return colors[index % colors.length]
  }

  return (
    <section id="experience" className="py-16">
      <h2 className="mb-12 text-4xl font-bold">My Work Experience</h2>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[7.5rem] top-0 h-full w-0.5 bg-gray-200 md:left-1/4"></div>

        {/* Experience items */}
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative grid md:grid-cols-4">
              <div className="mb-4 pr-8 md:mb-0">
                <h3 className="text-xl font-bold">{exp.client}</h3>
                <p className="text-sm text-foreground/70">
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </p>
              </div>

              {/* Timeline dot */}
              <div
                className={`absolute left-[7.5rem] top-1.5 h-4 w-4 rounded-full bg-${getColor(index)} md:left-1/4 md:-ml-2`}
              ></div>

              <div className="md:col-span-3 md:pl-8">
                <h3 className="text-xl font-bold">{exp.function}</h3>
                <p className="mt-2">{exp.description}</p>
                <p className="mt-2 text-sm font-medium">Technologies: {exp.technologies}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
