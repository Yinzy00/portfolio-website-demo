"use client"

import { useState, type FormEvent } from "react"
import { getPortfolioData } from "@/lib/data"
import FormSection from "@/components/admin/form-section"
import FormField from "@/components/admin/form-field"
import TextInput from "@/components/admin/text-input"
import TextArea from "@/components/admin/text-area"
import DateInput from "@/components/admin/date-input"
import Button from "@/components/admin/button"

export default function PersonalInfoPage() {
  const portfolioData = getPortfolioData()
  const [formData, setFormData] = useState(portfolioData.personalInfo)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // TODO: Save the data to an API
    console.log("Saving personal info:", formData)
    alert("Personal information saved successfully!")
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Personal Information</h1>

      <form onSubmit={handleSubmit}>
        <FormSection title="Basic Information" description="Update your personal details">
          <FormField label="Full Name" htmlFor="fullName">
            <TextInput
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />
          </FormField>

          <FormField label="Email" htmlFor="email">
            <TextInput
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </FormField>

          <FormField label="Phone Number" htmlFor="phoneNumber">
            <TextInput
              id="phoneNumber"
              value={formData.phoneNumber || ""}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            />
          </FormField>

          <FormField label="Birth Date" htmlFor="birthDate">
            <DateInput
              id="birthDate"
              value={formData.birthDate}
              onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
              required
            />
          </FormField>

          <FormField label="Nationality" htmlFor="nationality">
            <TextInput
              id="nationality"
              value={formData.nationality}
              onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
              required
            />
          </FormField>

          <FormField label="Profile Sketch" htmlFor="profileSketch">
            <TextArea
              id="profileSketch"
              value={formData.profileSketch}
              onChange={(e) => setFormData({ ...formData, profileSketch: e.target.value })}
              rows={6}
              required
            />
          </FormField>
        </FormSection>

        <div className="mt-6 flex justify-end">
          <Button type="submit" variant="primary">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}
