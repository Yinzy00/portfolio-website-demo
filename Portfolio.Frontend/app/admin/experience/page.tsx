"use client"

import { useState, type FormEvent } from "react"
import { getPortfolioData } from "@/lib/data"
import type { WorkExperience } from "@/lib/types"
import FormSection from "@/components/admin/form-section"
import FormField from "@/components/admin/form-field"
import TextInput from "@/components/admin/text-input"
import TextArea from "@/components/admin/text-area"
import DateInput from "@/components/admin/date-input"
import Button from "@/components/admin/button"
import ItemList from "@/components/admin/item-list"

export default function ExperiencePage() {
  const portfolioData = getPortfolioData()
  const [experiences, setExperiences] = useState<WorkExperience[]>(portfolioData.workExperiences)
  const [currentExperience, setCurrentExperience] = useState<WorkExperience>({
    id: "",
    startDate: "",
    endDate: "",
    projectName: "",
    function: "",
    description: "",
    technologies: "",
    client: "",
  })
  const [isEditing, setIsEditing] = useState(false)
  const [currentlyWorking, setCurrentlyWorking] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const experienceToSave = {
      ...currentExperience,
      endDate: currentlyWorking ? undefined : currentExperience.endDate,
    }

    if (isEditing) {
      // Update existing experience
      setExperiences(experiences.map((exp) => (exp.id === currentExperience.id ? experienceToSave : exp)))
    } else {
      // Add new experience
      const newExperience = {
        ...experienceToSave,
        id: Date.now().toString(),
      }
      setExperiences([...experiences, newExperience])
    }

    // Reset form
    setCurrentExperience({
      id: "",
      startDate: "",
      endDate: "",
      projectName: "",
      function: "",
      description: "",
      technologies: "",
      client: "",
    })
    setIsEditing(false)
    setCurrentlyWorking(false)
  }

  const handleEdit = (experience: WorkExperience) => {
    setCurrentExperience(experience)
    setCurrentlyWorking(!experience.endDate)
    setIsEditing(true)
  }

  const handleDelete = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id))
  }

  const handleSaveAll = () => {
    // TODO: Save all experiences to an API
    console.log("Saving experiences:", experiences)
    alert("Work experiences saved successfully!")
  }

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Present"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Work Experience</h1>

      <FormSection title="Add/Edit Work Experience">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Project Name" htmlFor="projectName">
              <TextInput
                id="projectName"
                value={currentExperience.projectName}
                onChange={(e) => setCurrentExperience({ ...currentExperience, projectName: e.target.value })}
                required
              />
            </FormField>

            <FormField label="Client" htmlFor="client">
              <TextInput
                id="client"
                value={currentExperience.client}
                onChange={(e) => setCurrentExperience({ ...currentExperience, client: e.target.value })}
                required
              />
            </FormField>

            <FormField label="Function/Role" htmlFor="function">
              <TextInput
                id="function"
                value={currentExperience.function}
                onChange={(e) => setCurrentExperience({ ...currentExperience, function: e.target.value })}
                required
              />
            </FormField>

            <FormField label="Technologies Used" htmlFor="technologies">
              <TextInput
                id="technologies"
                value={currentExperience.technologies}
                onChange={(e) => setCurrentExperience({ ...currentExperience, technologies: e.target.value })}
                required
              />
            </FormField>

            <FormField label="Start Date" htmlFor="startDate">
              <DateInput
                id="startDate"
                value={currentExperience.startDate}
                onChange={(e) => setCurrentExperience({ ...currentExperience, startDate: e.target.value })}
                required
              />
            </FormField>

            <div>
              <FormField label="End Date" htmlFor="endDate">
                <DateInput
                  id="endDate"
                  value={currentExperience.endDate || ""}
                  onChange={(e) => setCurrentExperience({ ...currentExperience, endDate: e.target.value })}
                  required={!currentlyWorking}
                  disabled={currentlyWorking}
                />
              </FormField>

              <div className="mt-2 flex items-center">
                <input
                  id="currentlyWorking"
                  type="checkbox"
                  checked={currentlyWorking}
                  onChange={(e) => setCurrentlyWorking(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="currentlyWorking" className="ml-2 text-sm">
                  I am currently working on this project
                </label>
              </div>
            </div>
          </div>

          <FormField label="Description" htmlFor="description" className="mt-4">
            <TextArea
              id="description"
              value={currentExperience.description}
              onChange={(e) => setCurrentExperience({ ...currentExperience, description: e.target.value })}
              rows={4}
              required
            />
          </FormField>

          <div className="mt-4">
            <Button type="submit" variant="primary">
              {isEditing ? "Update" : "Add"} Experience
            </Button>
            {isEditing && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setCurrentExperience({
                    id: "",
                    startDate: "",
                    endDate: "",
                    projectName: "",
                    function: "",
                    description: "",
                    technologies: "",
                    client: "",
                  })
                  setIsEditing(false)
                  setCurrentlyWorking(false)
                }}
                className="ml-2"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </FormSection>

      <FormSection title="Your Work Experience" className="mt-8">
        <ItemList
          items={experiences}
          renderItem={(experience) => (
            <div>
              <div className="font-medium">
                {experience.projectName} - {experience.function}
              </div>
              <div className="mt-1 text-sm text-foreground/70">
                {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
              </div>
              <div className="mt-1 text-sm">Client: {experience.client}</div>
              <div className="mt-1 text-sm">Technologies: {experience.technologies}</div>
            </div>
          )}
          onEdit={handleEdit}
          onDelete={handleDelete}
          emptyMessage="No work experiences added yet"
        />

        {experiences.length > 0 && (
          <div className="mt-6 flex justify-end">
            <Button onClick={handleSaveAll}>Save All Changes</Button>
          </div>
        )}
      </FormSection>
    </div>
  )
}
