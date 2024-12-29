import { Leaderboard } from '@/components/Leaderboardaurum'
import { Events } from '@/components/Events'
// import { Hackathon } from '@/components/Hackathon'
import '../globals.css'

export default function AurumPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <header className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold">Aurum: Tech Fest Extravaganza</h1>
        </div>
      </header> */}
      <main className="space-y-12 py-12">
        <Leaderboard />
        <Events />
        {/* <Hackathon /> */}
      </main>
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Aurum Tech Fest. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

