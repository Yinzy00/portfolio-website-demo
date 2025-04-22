interface SectionHeadingProps {
  title: string
  subtitle?: string
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-12 text-center">
      <h2 className="mb-3 text-4xl font-bold text-foreground md:text-5xl">{title}</h2>
      {subtitle && <p className="text-lg text-foreground/70">{subtitle}</p>}
    </div>
  )
}
