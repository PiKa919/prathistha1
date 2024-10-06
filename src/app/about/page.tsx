"use client";

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Sponsor {
  id: number
  name: string
  logo: string
  description: string
}

const sponsors: Sponsor[] = [
  { id: 1, name: "TechCorp", logo: "/placeholder.svg?height=80&width=80", description: "Leading technology solutions provider" },
  { id: 2, name: "EduLearn", logo: "/placeholder.svg?height=80&width=80", description: "Innovative educational platform" },
  { id: 3, name: "GreenEnergy", logo: "/placeholder.svg?height=80&width=80", description: "Sustainable energy solutions" },
  { id: 4, name: "HealthPlus", logo: "/placeholder.svg?height=80&width=80", description: "Advanced healthcare services" },
  { id: 5, name: "FoodDelight", logo: "/placeholder.svg?height=80&width=80", description: "Gourmet food and catering" },
  { id: 6, name: "SportsFit", logo: "/placeholder.svg?height=80&width=80", description: "Sports equipment and fitness gear" },
  { id: 7, name: "MediaMax", logo: "/placeholder.svg?height=80&width=80", description: "Multimedia production services" },
  { id: 8, name: "TravelWise", logo: "/placeholder.svg?height=80&width=80", description: "Travel and tourism experts" },
]

export default function SponsorShowcase() {
  const [gridPositions, setGridPositions] = useState<{ row: number; col: number }[]>([])

  useEffect(() => {
    const rows = 4
    const cols = 4
    const positions = sponsors.map(() => ({
      row: Math.floor(Math.random() * rows),
      col: Math.floor(Math.random() * cols)
    }))
    setGridPositions(positions)
  }, [])

  return (
    <section className="relative w-full h-screen bg-gradient-to-br from-purple-100 to-indigo-200 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-4xl font-bold text-gray-800 opacity-10">Our Sponsors</h2>
      </div>
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
        {sponsors.map((sponsor, index) => (
          <div
            key={sponsor.id}
            className="relative flex items-center justify-center"
            style={{
              gridRow: gridPositions[index]?.row + 1,
              gridColumn: gridPositions[index]?.col + 1,
            }}
          >
            <div className="relative group">
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={80}
                height={80}
                className="rounded-full bg-white p-2 shadow-lg transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white rounded-lg shadow-xl p-4 w-48 -left-20 top-20 z-20">
                <h3 className="font-semibold text-lg mb-2">{sponsor.name}</h3>
                <p className="text-sm text-gray-600">{sponsor.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}