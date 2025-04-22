export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 py-8">
      <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
        <div className="text-xl font-bold italic">Portfolio</div>
        <div className="text-sm text-foreground/70">&copy;{currentYear}. All Rights Reserved</div>
        <div className="text-sm text-foreground/70">Design by Creative Agency</div>
      </div>
    </footer>
  )
}
