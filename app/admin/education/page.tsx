"use client"

import { useState, type FormEvent } from "react"
import { getPortfolioData } from "@/lib/data"
import type { Education } from "@/lib/types"
import FormSection from "@/components/admin/form-section"
import FormField from "@/components/admin/form-field"
import TextInput from "@/components/admin/text-input"
import Button from "@/components/admin/button"
import ItemList from "@/components/admin/item-list"

export default function EducationPage() {
  const portfolioData = getPortfolioData()
  const [educations, setEducations] = useState<Education[]>(portfolioData.educations)
  const [currentEducation, setCurrentEducation] = useState<Education>({
    id: "",
    name: "",
  })
  const [isEditing, setIsEditing] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (isEditing) {
      // Update existing education
      setEducations(educations.map((edu) => (edu.id === currentEducation.id ? currentEducation : edu)))
    } else {
      // Add new education
      const newEducation = {
        ...currentEducation,
        id: Date.now().toString(),
      }
      setEducations([...educations, newEducation])
    }

    // Reset form
    setCurrentEducation({ id: "", name: "" })
    setIsEditing(false)
  }

  const handleEdit = (education: Education) => {
    setCurrentEducation(education)
    setIsEditing(true)
  }

  const handleDelete = (id: string) => {
    setEducations(educations.filter((edu) => edu.id !== id))
  }

  const handleSaveAll = () => {
    // TODO: Save all educations to an API
    console.log("Saving educations:", educations)
    alert("Education entries saved successfully!")
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Education</h1>

      <FormSection title="Add/Edit Education">
        <form onSubmit={handleSubmit}>
          <FormField label="Education Name" htmlFor="educationName">
            <TextInput
              id="educationName"
              value={currentEducation.name}
              onChange={(e) => setCurrentEducation({ ...currentEducation, name: e.target.value })}
              required
            />
          </FormField>

          <div className="mt-4">
            <Button type="submit" variant="primary">
              {isEditing ? "Update" : "Add"} Education
            </Button>
            {isEditing && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setCurrentEducation({ id: "", name: "" })
                  setIsEditing(false)
                }}
                className="ml-2"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </FormSection>

      <FormSection title="Your Education" className="mt-8">
        <ItemList
          items={educations}
          renderItem={(education) => <div className="font-medium">{education.name}</div>}
          onEdit={handleEdit}
          onDelete={handleDelete}
          emptyMessage="No education entries added yet"
        />

        {educations.length > 0 && (
          <div className="mt-6 flex justify-end">
            <Button onClick={handleSaveAll}>Save All Changes</Button>
          </div>
        )}
      </FormSection>
    </div>
  )
}
