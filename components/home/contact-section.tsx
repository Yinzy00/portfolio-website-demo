import type { PersonalInfo } from "@/lib/types"
import Link from "next/link"

interface ContactSectionProps {
  personalInfo: PersonalInfo
}

export default function ContactSection({ personalInfo }: ContactSectionProps) {
  return (
    <section id="contact" className="py-16">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="mb-6 text-4xl font-bold">Let's make something amazing together.</h2>
          <p className="mb-8 text-2xl">
            Start by <span className="text-secondary">saying hi</span>
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-2xl font-bold">Information</h3>
          <ul className="space-y-2">
            <li>
              Email:{" "}
              <Link href={`mailto:${personalInfo.email}`} className="text-primary">
                {personalInfo.email}
              </Link>
            </li>
            {personalInfo.phoneNumber && (
              <li>
                Phone:{" "}
                <Link href={`tel:${personalInfo.phoneNumber}`} className="text-primary">
                  {personalInfo.phoneNumber}
                </Link>
              </li>
            )}
            <li>Nationality: {personalInfo.nationality}</li>
          </ul>

          <div className="mt-8">
            <div className="flex space-x-4">
              <Link href="#services" className="text-sm uppercase tracking-wider hover:text-primary">
                Services
              </Link>
              <Link href="#works" className="text-sm uppercase tracking-wider hover:text-primary">
                Works
              </Link>
              <Link href="#notes" className="text-sm uppercase tracking-wider hover:text-primary">
                Notes
              </Link>
              <Link href="#experience" className="text-sm uppercase tracking-wider hover:text-primary">
                Experience
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
