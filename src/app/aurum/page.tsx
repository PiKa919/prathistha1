// import { Leaderboard } from '@/components/Leaderboardaurum'
import { Events } from '@/components/Events'
// import { Hackathon } from '@/components/Hackathon'
import '../globals.css'

export default function AurumPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* <header className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold">Aurum: Tech Fest Extravaganza</h1>
        </div>
      </header> */}
      <main className="space-y-12 py-20 px-4">
        {/* <Leaderboard /> */}
        <Events />
        {/* <Hackathon /> */}
      </main>
    </div>
  )
}

