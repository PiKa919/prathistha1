'use client'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { EventModal } from './EventModal'

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
}

export function EventCard({ title, description, time, place, videoUrl, imageUrl, price, ranking }: EventCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image src={imageUrl} alt={title} width={300} height={200} className="w-full object-cover h-48" />
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2">{title}</h3>
        <p className="text-gray-600 mb-2">{time}</p>
        <p className="text-gray-600 mb-2">{place}</p>
        <p className="text-gray-800 font-semibold mb-4">{price}</p>
        <Button onClick={() => setIsModalOpen(true)}
        style={{ width: '100%' }}  
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

