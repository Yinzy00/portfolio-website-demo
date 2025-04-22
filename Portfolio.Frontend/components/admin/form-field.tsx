import type React from "react"
interface FormFieldProps {
  label: string
  htmlFor: string
  error?: string
  children: React.ReactNode
}

export default function FormField({ label, htmlFor, error, children }: FormFieldProps) {
  return (
    <div className="mb-4">
      <label htmlFor={htmlFor} className="mb-1 block font-medium">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}
