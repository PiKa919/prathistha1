'use client'
import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar, Link } from "lucide-react"
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

interface EventModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
  time: string
  place: string
  videoUrl: string
  price: string
  imageUrl: string
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
      <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-md text-sm font-semibold flex items-center space-x-1">
        <Calendar className="w-4 h-4" />
        <span>{date}</span>
      </div>
      <Image
        src={imageUrl || "/placeholder.svg"}
        alt={title}
        width={300}
        height={200}
        className="w-full object-cover h-48"
      />
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


