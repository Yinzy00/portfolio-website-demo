import type React from "react"
import Container from "@/components/ui/container"
import Navigation from "@/components/ui/navigation"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Container>
        <Navigation isAdmin={true} />
        <main className="py-8">{children}</main>
      </Container>
    </div>
  )
}
