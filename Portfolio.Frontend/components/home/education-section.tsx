import type { Education } from "@/lib/types"

interface EducationSectionProps {
  educations: Education[]
}

export default function EducationSection({ educations }: EducationSectionProps) {
  return (
    <section className="py-16">
      <h2 className="mb-8 text-3xl font-bold">Education</h2>

      <div className="space-y-6">
        {educations.map((education) => (
          <div key={education.id} className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-xl font-medium">{education.name}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}
