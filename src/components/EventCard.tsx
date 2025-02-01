'use client'
import { useState } from "react"
import Image from "next/image"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import { EventModal } from "@/components/EventModal"

interface EventCardProps {
  title: string
  description: string
  time: string
  place: string
  videoUrl: string
  imageUrl: string
  price: string
  ranking: {
    first: string
    second: string
    third: string
  }
  date: string
}


export function EventCard({
  title,
  description,
  time,
  place,
  videoUrl,
  imageUrl,
  price,
  ranking,
  date,
}: EventCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden relative">
      {/* Image container */}
      <div className="relative">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          width={300}
          height={200}
          className="w-full object-cover h-48"
        />
        {/* Date overlay */}
        <div className="absolute top-3 right-3 bg-white text-black px-3 py-1 rounded-md text-sm font-semibold shadow-lg text-center">
          <span className="block text-xs font-medium">
            {new Date(date).toLocaleString('en-US', { month: 'short' }).toUpperCase()}
          </span>
          <span className="block text-lg font-bold">{date.split("-")[2]}</span>
        </div>
      </div>

      {/* Event details */}
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2 text-white">{title}</h3>
        <p className="text-gray-400 mb-2">{time}</p>
        <p className="text-gray-400 mb-2">{place}</p>
        <p className="text-gray-200 font-semibold mb-4">{price}</p>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          More Info
        </Button>
      </div>

      {/* Modal for event details */}
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        description={description}
        time={time}
        place={place}
        videoUrl={videoUrl}
        price={price}
        imageUrl={imageUrl}
        ranking={ranking}
      />
    </div>
  )
}



