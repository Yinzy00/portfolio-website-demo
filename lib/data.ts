import type { PortfolioData } from "./types"

// This is a mock data service that would be replaced with API calls in the future
export const getPortfolioData = (): PortfolioData => {
  return {
    personalInfo: {
      fullName: "John Doe",
      email: "john.doe@example.com",
      birthDate: "1990-01-01",
      nationality: "American",
      profileSketch: "I design beautifully simple things. And I love what I do.",
      phoneNumber: "+001 (313) 345 678",
    },
    languages: [
      { id: "1", name: "English", proficiency: 5 },
      { id: "2", name: "Spanish", proficiency: 3 },
      { id: "3", name: "French", proficiency: 2 },
    ],
    skills: [
      { id: "1", name: "UI/UX Design" },
      { id: "2", name: "Web Development" },
      { id: "3", name: "Mobile App Development" },
      { id: "4", name: "Brand Identity" },
    ],
    workExperiences: [
      {
        id: "1",
        startDate: "2020-01-01",
        endDate: "2022-06-30",
        projectName: "E-commerce Platform",
        function: "Senior Developer",
        description: "Developed a full-featured e-commerce platform with payment integration and inventory management.",
        technologies: "React, Node.js, MongoDB",
        client: "RetailCorp Inc.",
      },
      {
        id: "2",
        startDate: "2018-03-15",
        endDate: "2019-12-31",
        projectName: "Mobile Banking App",
        function: "Frontend Developer",
        description:
          "Created a responsive mobile banking application with secure authentication and transaction features.",
        technologies: "React Native, Firebase",
        client: "FinTech Solutions",
      },
      {
        id: "3",
        startDate: "2016-06-01",
        endDate: undefined,
        projectName: "Portfolio Website",
        function: "UI/UX Designer",
        description: "Designing and developing portfolio websites for creative professionals.",
        technologies: "Next.js, Tailwind CSS",
        client: "Various Clients",
      },
    ],
    educations: [
      { id: "1", name: "Bachelor of Computer Science, MIT" },
      { id: "2", name: "UI/UX Design Certification, Design Academy" },
      { id: "3", name: "Full Stack Web Development, Coding Bootcamp" },
    ],
  }
}
