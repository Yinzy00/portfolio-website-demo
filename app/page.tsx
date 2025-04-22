import Container from "@/components/ui/container"
import Navigation from "@/components/ui/navigation"
import HeroSection from "@/components/home/hero-section"
import SkillsSection from "@/components/home/skills-section"
import ExperienceSection from "@/components/home/experience-section"
import LanguagesSection from "@/components/home/languages-section"
import EducationSection from "@/components/home/education-section"
import ContactSection from "@/components/home/contact-section"
import Footer from "@/components/home/footer"
import { getPortfolioData } from "@/lib/data"

export default function Home() {
  const portfolioData = getPortfolioData()

  return (
    <main className="min-h-screen">
      <Container>
        <Navigation />
        <HeroSection personalInfo={portfolioData.personalInfo} />
        <SkillsSection skills={portfolioData.skills} />
        <ExperienceSection experiences={portfolioData.workExperiences} />
        <LanguagesSection languages={portfolioData.languages} />
        <EducationSection educations={portfolioData.educations} />
        <ContactSection personalInfo={portfolioData.personalInfo} />
        <Footer />
      </Container>
    </main>
  )
}
