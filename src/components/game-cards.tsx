'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import EventRegistration from '@/components/event-registration'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import Image from 'next/image' // Import Image from next/image

const games = [
  {
    id: 'bgmi',
    title: 'BGMI',
    price: 200,
    image: '/placeholder.svg?height=300&width=300'
  },
  {
    id: 'valorant',
    title: 'Valorant',
    price: 200,
    image: '/esports/valo-profile.png'
  },
  {
    id: 'fifa',
    title: 'FIFA',
    price: 200,
    image: '/placeholder.svg?height=300&width=300'
  }
]

export function GameCards() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {games.map((game) => (
          <Card key={game.id} className="overflow-hidden">
            <CardContent className="p-0">
              <Image
                src={game.image}
                alt={game.title}
                width={300}
                height={300}
                className="w-full aspect-square object-cover bg-muted"
              />
              <div className="p-4 space-y-4">
                <h3 className="text-2xl font-bold text-center">{game.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">${game.price}</span>
                  <Button onClick={() => setSelectedGame(game.id)}>
                    Register
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedGame} onOpenChange={() => setSelectedGame(null)}>
        <DialogContent className="max-w-4xl">
          <EventRegistration gameId={selectedGame} />
        </DialogContent>
      </Dialog>
    </>
  )
}

