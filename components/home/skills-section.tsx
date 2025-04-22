import type { Skill } from "@/lib/types"
import { Briefcase, Smartphone, PenTool } from "lucide-react"

interface SkillsSectionProps {
  skills: Skill[]
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  // Function to get icon based on skill name
  const getIcon = (skillName: string) => {
    const name = skillName.toLowerCase()
    if (name.includes("web") || name.includes("development")) {
      return <Briefcase className="h-8 w-8" />
    } else if (name.includes("mobile") || name.includes("app")) {
      return <Smartphone className="h-8 w-8" />
    } else {
      return <PenTool className="h-8 w-8" />
    }
  }

  return (
    <section id="services" className="py-16">
      <h2 className="mb-12 text-4xl font-bold">What do I help?</h2>
      <div className="mb-8 max-w-2xl">
        <p className="text-lg">
          I will help you with finding a solution and solve your problems. We use process design to create digital
          products. Besides that also help their business.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {skills.slice(0, 3).map((skill) => (
          <div key={skill.id} className="flex items-start space-x-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              {getIcon(skill.name)}
            </div>
            <div>
              <h3 className="mb-1 text-xl font-bold">{skill.name}</h3>
              <p className="text-sm text-foreground/70">Projects</p>
            </div>
          </div>
        ))}
      </div>

      {/* Statistics section removed as it's not in our data model */}
    </section>
  )
}
