import Link from 'next/link'

export default function SponsorsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 mt-20">
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-center space-x-4">
          <Link href="/sponsors/2023" className="text-blue-600 hover:text-blue-800">2023</Link>
          <Link href="/sponsors/2024" className="text-blue-600 hover:text-blue-800">2024</Link>
          <Link href="/sponsors/2025" className="text-blue-600 hover:text-blue-800">2025</Link>
        </div>
      </nav>
      <main className="container mx-auto py-8 px-4">
        {children}
      </main>
    </div>
  )
}