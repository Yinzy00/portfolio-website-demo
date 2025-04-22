"use client"

import type { ChangeEvent } from "react"

interface TextInputProps {
  id: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: string
  required?: boolean
}

export default function TextInput({
  id,
  value,
  onChange,
  placeholder = "",
  type = "text",
  required = false,
}: TextInputProps) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
    />
  )
}
