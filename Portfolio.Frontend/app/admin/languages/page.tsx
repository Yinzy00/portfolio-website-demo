"use client"

import { useState, type FormEvent } from "react"
import { getPortfolioData } from "@/lib/data"
import type { Language } from "@/lib/types"
import FormSection from "@/components/admin/form-section"
import FormField from "@/components/admin/form-field"
import TextInput from "@/components/admin/text-input"
import Button from "@/components/admin/button"
import ItemList from "@/components/admin/item-list"

export default function LanguagesPage() {
  const portfolioData = getPortfolioData()
  const [languages, setLanguages] = useState<Language[]>(portfolioData.languages)
  const [currentLanguage, setCurrentLanguage] = useState<Language>({
    id: "",
    name: "",
    proficiency: 1,
  })
  const [isEditing, setIsEditing] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (isEditing) {
      // Update existing language
      setLanguages(languages.map((lang) => (lang.id === currentLanguage.id ? currentLanguage : lang)))
    } else {
      // Add new language
      const newLanguage = {
        ...currentLanguage,
        id: Date.now().toString(),
      }
      setLanguages([...languages, newLanguage])
    }

    // Reset form
    setCurrentLanguage({ id: "", name: "", proficiency: 1 })
    setIsEditing(false)
  }

  const handleEdit = (language: Language) => {
    setCurrentLanguage(language)
    setIsEditing(true)
  }

  const handleDelete = (id: string) => {
    setLanguages(languages.filter((lang) => lang.id !== id))
  }

  const handleSaveAll = () => {
    // TODO: Save all languages to an API
    console.log("Saving languages:", languages)
    alert("Languages saved successfully!")
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Languages</h1>

      <FormSection title="Add/Edit Language">
        <form onSubmit={handleSubmit}>
          <FormField label="Language Name" htmlFor="languageName">
            <TextInput
              id="languageName"
              value={currentLanguage.name}
              onChange={(e) => setCurrentLanguage({ ...currentLanguage, name: e.target.value })}
              required
            />
          </FormField>

          <FormField label="Proficiency (1-5)" htmlFor="proficiency">
            <div className="flex items-center">
              <input
                id="proficiency"
                type="range"
                min="1"
                max="5"
                value={currentLanguage.proficiency}
                onChange={(e) =>
                  setCurrentLanguage({
                    ...currentLanguage,
                    proficiency: Number.parseInt(e.target.value),
                  })
                }
                className="w-full"
              />
              <span className="ml-2 w-8 text-center">{currentLanguage.proficiency}</span>
            </div>
          </FormField>

          <div className="mt-4">
            <Button type="submit" variant="primary">
              {isEditing ? "Update" : "Add"} Language
            </Button>
            {isEditing && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setCurrentLanguage({ id: "", name: "", proficiency: 1 })
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

      <FormSection title="Your Languages" className="mt-8">
        <ItemList
          items={languages}
          renderItem={(language) => (
            <div>
              <div className="font-medium">{language.name}</div>
              <div className="mt-1 flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-6 rounded ${i < language.proficiency ? "bg-primary" : "bg-gray-200"}`}
                  ></div>
                ))}
              </div>
            </div>
          )}
          onEdit={handleEdit}
          onDelete={handleDelete}
          emptyMessage="No languages added yet"
        />

        {languages.length > 0 && (
          <div className="mt-6 flex justify-end">
            <Button onClick={handleSaveAll}>Save All Changes</Button>
          </div>
        )}
      </FormSection>
    </div>
  )
}
