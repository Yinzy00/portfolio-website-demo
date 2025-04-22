import Link from "next/link"

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/admin/personal-info"
          className="block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-colors hover:border-primary hover:shadow-md"
        >
          <h2 className="mb-2 text-xl font-bold">Personal Information</h2>
          <p className="text-foreground/70">Update your personal details</p>
        </Link>

        <Link
          href="/admin/languages"
          className="block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-colors hover:border-primary hover:shadow-md"
        >
          <h2 className="mb-2 text-xl font-bold">Languages</h2>
          <p className="text-foreground/70">Manage your language proficiencies</p>
        </Link>

        <Link
          href="/admin/skills"
          className="block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-colors hover:border-primary hover:shadow-md"
        >
          <h2 className="mb-2 text-xl font-bold">Skills</h2>
          <p className="text-foreground/70">Update your professional skills</p>
        </Link>

        <Link
          href="/admin/experience"
          className="block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-colors hover:border-primary hover:shadow-md"
        >
          <h2 className="mb-2 text-xl font-bold">Work Experience</h2>
          <p className="text-foreground/70">Manage your work history</p>
        </Link>

        <Link
          href="/admin/education"
          className="block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-colors hover:border-primary hover:shadow-md"
        >
          <h2 className="mb-2 text-xl font-bold">Education</h2>
          <p className="text-foreground/70">Update your educational background</p>
        </Link>
      </div>
    </div>
  )
}
