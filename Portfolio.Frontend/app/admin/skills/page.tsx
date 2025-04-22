"use client"

import { useState, type FormEvent } from "react"
import { getPortfolioData } from "@/lib/data"
import type { Skill } from "@/lib/types"
import FormSection from "@/components/admin/form-section"
import FormField from "@/components/admin/form-field"
import TextInput from "@/components/admin/text-input"
import Button from "@/components/admin/button"
import ItemList from "@/components/admin/item-list"

export default function SkillsPage() {
  const portfolioData = getPortfolioData()
  const [skills, setSkills] = useState<Skill[]>(portfolioData.skills)
  const [currentSkill, setCurrentSkill] = useState<Skill>({
    id: "",
    name: "",
  })
  const [isEditing, setIsEditing] = useState(false)

  // Maximum number of skills allowed
  const MAX_SKILLS = 3

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (isEditing) {
      // Update existing skill
      setSkills(skills.map((skill) => (skill.id === currentSkill.id ? currentSkill : skill)))
    } else {
      // Check if we've reached the maximum number of skills
      if (skills.length >= MAX_SKILLS) {
        alert(`You can only add up to ${MAX_SKILLS} skills. Please delete an existing skill first.`)
        return
      }

      // Add new skill
      const newSkill = {
        ...currentSkill,
        id: Date.now().toString(),
      }
      setSkills([...skills, newSkill])
    }

    // Reset form
    setCurrentSkill({ id: "", name: "" })
    setIsEditing(false)
  }

  const handleEdit = (skill: Skill) => {
    setCurrentSkill(skill)
    setIsEditing(true)
  }

  const handleDelete = (id: string) => {
    setSkills(skills.filter((skill) => skill.id !== id))
  }

  const handleSaveAll = () => {
    // TODO: Save all skills to an API
    console.log("Saving skills:", skills)
    alert("Skills saved successfully!")
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Skills</h1>

      {skills.length < MAX_SKILLS ? (
        <FormSection title="Add/Edit Skill">
          <form onSubmit={handleSubmit}>
            <FormField label="Skill Name" htmlFor="skillName">
              <TextInput
                id="skillName"
                value={currentSkill.name}
                onChange={(e) => setCurrentSkill({ ...currentSkill, name: e.target.value })}
                required
              />
            </FormField>

            <div className="mt-4">
              <Button type="submit" variant="primary">
                {isEditing ? "Update" : "Add"} Skill
              </Button>
              {isEditing && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setCurrentSkill({ id: "", name: "" })
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
      ) : (
        <FormSection title="Maximum Skills Reached">
          <p className="text-amber-600">
            You have reached the maximum limit of {MAX_SKILLS} skills. Please delete an existing skill before adding a
            new one.
          </p>
        </FormSection>
      )}

      <FormSection title={`Your Skills (${skills.length}/${MAX_SKILLS})`} className="mt-8">
        <ItemList
          items={skills}
          renderItem={(skill) => <div className="font-medium">{skill.name}</div>}
          onEdit={handleEdit}
          onDelete={handleDelete}
          emptyMessage="No skills added yet"
        />

        {skills.length > 0 && (
          <div className="mt-6 flex justify-end">
            <Button onClick={handleSaveAll}>Save All Changes</Button>
          </div>
        )}
      </FormSection>
    </div>
  )
}
