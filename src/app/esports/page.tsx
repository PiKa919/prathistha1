import { GameCards } from '@/components/game-cards'
import { EnhancedTreeStyleBracket } from '@/components/ui/enhanced-tree-style-bracket'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen mt-20">
      <div className="relative h-[600px] w-full">
        <Image
          src="/esports/valo-banner.jpg"
          alt="Esports Hero"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h1 className="text-6xl font-bold text-white mb-4">Welcome to Esports</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Join the competitive gaming revolution and showcase your skills in our tournaments
          </p>
        </div>
      </div>
      
      <section className="container mx-auto py-16">
        <h2 className="text-4xl font-bold text-center mb-12">ESPORTS Games</h2>
        <GameCards />
      </section>

      <section className="container mx-auto py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Tournament Brackets</h2>
        <div className="space-y-16">
          <div>
            <EnhancedTreeStyleBracket />
          </div>
        </div>
      </section>
    </main>
  )
}

