import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { Leaderboard } from "@/components/leaderboard"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />
      <Hero />
      <Stats />
      <Leaderboard />
    </main>
  )
}

