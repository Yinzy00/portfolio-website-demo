export interface PersonalInfo {
  fullName: string
  email: string
  birthDate: string
  nationality: string
  profileSketch: string
  phoneNumber?: string
}

export interface Language {
  id: string
  name: string
  proficiency: number // 1-5
}

export interface Skill {
  id: string
  name: string
}

export interface WorkExperience {
  id: string
  startDate: string
  endDate?: string // Optional for currently running projects
  projectName: string
  function: string
  description: string
  technologies: string
  client: string
}

export interface Education {
  id: string
  name: string
}

export interface PortfolioData {
  personalInfo: PersonalInfo
  languages: Language[]
  skills: Skill[]
  workExperiences: WorkExperience[]
  educations: Education[]
}
