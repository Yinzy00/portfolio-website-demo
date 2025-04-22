"use client"

import type { ChangeEvent } from "react"

interface TextAreaProps {
  id: string
  value: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  rows?: number
  required?: boolean
}

export default function TextArea({ id, value, onChange, placeholder = "", rows = 4, required = false }: TextAreaProps) {
  return (
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      required={required}
      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
    />
  )
}
