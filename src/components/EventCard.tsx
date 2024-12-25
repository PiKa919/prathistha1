'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from 'next/image'

type EventProps = {
  title: string;
  description: string;
  time: string;
  place: string;
  videoUrl: string;
  imageUrl: string;
}

export function EventCard({ title, description, time, place, videoUrl, imageUrl }: EventProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div 
      className="w-64 h-96 perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onFocus={() => setIsFlipped(true)}
      onBlur={() => setIsFlipped(false)}
      tabIndex={0}
      role="button"
      aria-pressed={isFlipped}
    >
      <div className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        <Card className="absolute w-full h-full backface-hidden">
          <CardContent className="p-0 flex flex-col justify-between h-full">
            <div className="relative w-full h-48">
              <Image
                src={imageUrl}
                alt={title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
            <div className="p-4 flex-grow">
              <h3 className="font-bold mb-2">{title}</h3>
              <p className="text-sm text-gray-600 mb-1">Time: {time}</p>
              <p className="text-sm text-gray-600">Place: {place}</p>
            </div>
            <Button className="w-full rounded-t-none">More Info</Button>
          </CardContent>
        </Card>
        <Card className="absolute w-full h-full backface-hidden rotate-y-180">
          <CardContent className="p-4 flex flex-col justify-between h-full">
            <div>
              <h3 className="font-bold mb-2">{title}</h3>
              <p className="text-sm mb-2">{description}</p>
              <p className="text-sm font-semibold">Time: {time}</p>
              <p className="text-sm font-semibold">Place: {place}</p>
            </div>
            <Button className="w-full mt-4" onClick={() => window.open(videoUrl, '_blank')}>Watch Preview</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

