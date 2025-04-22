"use client"

import type { ChangeEvent } from "react"

interface DateInputProps {
  id: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}

export default function DateInput({ id, value, onChange, required = false }: DateInputProps) {
  return (
    <input
      id={id}
      type="date"
      value={value}
      onChange={onChange}
      required={required}
      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
    />
  )
}
