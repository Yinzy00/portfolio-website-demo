"use client"

import type React from "react"

import Link from "next/link"

interface NavigationProps {
  isAdmin?: boolean
}

export default function Navigation({ isAdmin = false }: NavigationProps) {
  // Function to handle smooth scrolling for hash links
  const handleHashLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      // Smooth scroll to the element
      targetElement.scrollIntoView({ behavior: "smooth" })

      // Update URL without causing a page reload
      window.history.pushState(null, "", `/#${targetId}`)
    }
  }

  return (
    <nav className="flex items-center justify-between py-6">
      <div className="text-2xl font-bold italic">
        <Link href="/">Portfolio</Link>
      </div>

      {isAdmin ? (
        <div className="flex space-x-6">
          <Link href="/admin" className="hover:text-primary">
            Dashboard
          </Link>
          <Link href="/admin/personal-info" className="hover:text-primary">
            Personal Info
          </Link>
          <Link href="/admin/languages" className="hover:text-primary">
            Languages
          </Link>
          <Link href="/admin/skills" className="hover:text-primary">
            Skills
          </Link>
          <Link href="/admin/experience" className="hover:text-primary">
            Experience
          </Link>
          <Link href="/admin/education" className="hover:text-primary">
            Education
          </Link>
        </div>
      ) : (
        <div className="flex space-x-6">
          <Link href="/#services" className="hover:text-primary" onClick={(e) => handleHashLinkClick(e, "services")}>
            Services
          </Link>
          <Link href="/#works" className="hover:text-primary" onClick={(e) => handleHashLinkClick(e, "works")}>
            Works
          </Link>
          <Link href="/#notes" className="hover:text-primary" onClick={(e) => handleHashLinkClick(e, "notes")}>
            Notes
          </Link>
          <Link
            href="/#experience"
            className="hover:text-primary"
            onClick={(e) => handleHashLinkClick(e, "experience")}
          >
            Experience
          </Link>
          <div className="ml-6 flex items-center">
            <Link href="/#contact" className="text-primary" onClick={(e) => handleHashLinkClick(e, "contact")}>
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
