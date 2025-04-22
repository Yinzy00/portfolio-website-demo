import type { Language } from "@/lib/types"

interface LanguagesSectionProps {
  languages: Language[]
}

export default function LanguagesSection({ languages }: LanguagesSectionProps) {
  return (
    <section className="py-16">
      <h2 className="mb-8 text-3xl font-bold">Languages</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {languages.map((language) => (
          <div key={language.id} className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-xl font-medium">{language.name}</h3>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-full rounded ${i < language.proficiency ? "bg-primary" : "bg-gray-200"}`}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
