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
    price: 1000,
    originalPrice: 1500,
    image: '/esports/bgmi.webp'
  },
  {
    id: 'valorant',
    title: 'Valorant',
    price: 1000,
    originalPrice: 1500,
    image: '/esports/valo.webp'
  }
]

export function GameCards() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 max-w-5xl mx-auto">
        {games.map((game) => (
          <Card key={game.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="w-full aspect-[4/5] relative bg-muted">
                <Image
                  src={game.image}
                  alt={game.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 space-y-4">
                <h3 className="text-2xl font-bold text-center">{game.title}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold">₹{game.price}</span>
                    {(game.id === 'bgmi' || game.id === 'valorant') && (
                      <span className="text-gray-500 line-through">₹{game.originalPrice}</span>
                    )}
                  </div>
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

