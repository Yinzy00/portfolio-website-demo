import type React from "react"
interface FormSectionProps {
  title: string
  description?: string
  children: React.ReactNode
}

export default function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-2 text-xl font-bold">{title}</h2>
      {description && <p className="mb-4 text-sm text-foreground/70">{description}</p>}
      {children}
    </div>
  )
}
