import { GameCards } from '@/components/game-cards'
import { EnhancedTreeStyleBracket } from '@/components/ui/enhanced-tree-style-bracket'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen mt-20" style={{ backgroundColor: '#000000' }}>
      <div className="relative h-[600px] w-full">
        <Image
          src="/esports/valo-banner.jpg"
          alt="Esports Hero"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-[0_0_8px_#0FF0FC]">
            Welcome to SAKEC Esports
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Join the competitive gaming revolution and showcase your skills in our tournaments
          </p>
        </div>
      </div>
      
      <section className="container mx-auto py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#FF073A] drop-shadow-[0_0_8px_#FF073A]">
          ESPORTS Games
        </h2>
        <GameCards />
      </section>

      <section className="container mx-auto py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#FF073A] drop-shadow-[0_0_8px_#FF073A]">
          Tournament Brackets
        </h2>
        <div className="space-y-16">
          <div>
            <EnhancedTreeStyleBracket />
          </div>
        </div>
      </section>
      <section className="container mx-auto py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#FF073A] drop-shadow-[0_0_8px_#FF073A]">
          Event Roadmap
        </h2>
        <div className="relative w-full max-w-4xl mx-auto">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-02%20at%2000.19.57_aac9e254.jpg-ujwq7HLtBTcq6jlJqDN1FXxqf1lWZt.jpeg"
            alt="Tournament Roadmap"
            width={1200}
            height={800}
            className="rounded-lg shadow-2xl"
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <div className="bg-black/50 p-6 rounded-lg border border-yellow-500/30 backdrop-blur">
              <h3 className="text-2xl font-bold mb-4 text-yellow-500">Round 1 - Qualifiers</h3>
              <ul className="space-y-2">
                <li>54 Teams</li>
                <li>3 Groups</li>
                <li>Top 8 Qualifies for Next Round</li>
              </ul>
            </div>
            <div className="bg-black/50 p-6 rounded-lg border border-yellow-500/30 backdrop-blur">
              <h3 className="text-2xl font-bold mb-4 text-yellow-500">Round 2 - Semi Finals</h3>
              <ul className="space-y-2">
                <li>32 Teams</li>
                <li>2 Groups</li>
                <li>Top 7 Qualifies for Next Round</li>
              </ul>
            </div>
            <div className="bg-black/50 p-6 rounded-lg border border-yellow-500/30 backdrop-blur">
              <h3 className="text-2xl font-bold mb-4 text-yellow-500">Round 3 - Grand Finals</h3>
              <ul className="space-y-2">
                <li>18 Teams</li>
                <li>Single Group</li>
                <li>Top 6 Teams Will Be Rewarded</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto py-16">
        <h2 className="text-4xl font-bold text-center mb-6 text-[#FF073A] drop-shadow-[0_0_8px_#FF073A]">
          BGMI Tournament Brackets/Leaderboards
        </h2>
        <p className="text-2xl text-center text-white/80 animate-pulse">
          Coming Soon...
        </p>
      </section>
    </main>
  )
}

