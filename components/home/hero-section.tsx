import type { PersonalInfo } from "@/lib/types"
import Link from "next/link"

interface HeroSectionProps {
  personalInfo: PersonalInfo
}

export default function HeroSection({ personalInfo }: HeroSectionProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <div className="flex flex-col justify-center">
          <h1 className="mb-4 text-5xl font-bold leading-tight md:text-6xl">
            Hey There,
            <br />
            I'm {personalInfo.fullName.split(" ")[0]}
          </h1>
          <div className="mb-6 text-primary">
            <Link href={`mailto:${personalInfo.email}`}>{personalInfo.email}</Link>
          </div>
          <p className="mb-8 text-lg">{personalInfo.profileSketch}</p>
          {/* Experience section removed as it's not in our data model */}
        </div>
        <div className="relative">
          <div className="absolute -z-10 h-full w-full translate-x-4 translate-y-4 rounded-lg bg-primary/20"></div>
          <div className="relative h-[400px] w-full overflow-hidden rounded-lg bg-primary">
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <span className="text-lg font-medium">Profile Image</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
